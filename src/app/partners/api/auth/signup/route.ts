import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { generateUniquePartnerCode } from "@/lib/partners/partner-code";
import { sendEmail, getNotificationEmails } from "@/lib/partners/emails/send";
import {
  newPartnerSignupEmail,
  emailConfirmationEmail,
} from "@/lib/partners/emails/templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      companyName,
      ein,
      address,
      city,
      state,
      zip,
      website,
      notificationEmail,
      inviteToken,
      ref,
    } = body;

    if (!firstName || !lastName || !email || !password || !companyName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createPartnerAdminClient();

    // Check for duplicate email
    const { count: emailCount } = await supabase
      .from("partner_users")
      .select("id", { count: "exact", head: true })
      .eq("email", email);

    if ((emailCount || 0) > 0) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please sign in or contact partners@apalyrx.com for help." },
        { status: 409 }
      );
    }

    // Check for duplicate EIN across both tables
    // Skip EIN check for invite flow (placeholder org already exists)
    if (ein && !inviteToken) {
      const [orgRes, leadRes] = await Promise.all([
        supabase.from("partner_organizations").select("id", { count: "exact", head: true }).eq("ein", ein),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("prospect_ein", ein),
      ]);

      if ((orgRes.count || 0) > 0 || (leadRes.count || 0) > 0) {
        return NextResponse.json(
          { error: "This EIN is already registered in the ApalyRx system. Contact partners@apalyrx.com for assistance." },
          { status: 409 }
        );
      }
    }

    // Create auth user and generate email confirmation link in one step.
    const { data: linkData, error: linkError } =
      await supabase.auth.admin.generateLink({
        type: "signup",
        email,
        password,
        options: {
          redirectTo:
            "https://www.apalyrx.com/partners/api/auth/callback",
        },
      });

    if (linkError) {
      return NextResponse.json({ error: linkError.message }, { status: 400 });
    }

    const userId = linkData.user.id;
    const confirmationUrl = linkData.properties.action_link;

    let orgId: string;
    let partnerCode: string;

    // ── Invite Token Flow: update existing placeholder org ──
    if (inviteToken) {
      const { data: invitedOrg } = await supabase
        .from("partner_organizations")
        .select("id, partner_code, invite_token_expires_at, parent_organization_id")
        .eq("invite_token", inviteToken)
        .eq("status", "invited")
        .maybeSingle();

      if (!invitedOrg) {
        return NextResponse.json({ error: "Invalid or expired invite token" }, { status: 400 });
      }

      if (invitedOrg.invite_token_expires_at && new Date(invitedOrg.invite_token_expires_at) < new Date()) {
        return NextResponse.json({ error: "Invite token has expired" }, { status: 410 });
      }

      // Re-generate partner code from actual company name
      partnerCode = await generateUniquePartnerCode(companyName);

      const approvalToken = crypto.randomBytes(32).toString("hex");
      const tokenExpires = new Date();
      tokenExpires.setDate(tokenExpires.getDate() + 7);

      const { error: updateError } = await supabase
        .from("partner_organizations")
        .update({
          partner_code: partnerCode,
          company_name: companyName,
          ein: ein || null,
          address: address || null,
          city: city || null,
          state: state || null,
          zip: zip || null,
          website: website || null,
          notification_email: notificationEmail || email,
          status: "pending",
          invite_token: null,
          invite_token_expires_at: null,
          approval_token: approvalToken,
          approval_token_expires_at: tokenExpires.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", invitedOrg.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      orgId = invitedOrg.id;

      // Create partner user
      const { error: userError } = await supabase.from("partner_users").insert({
        user_id: userId,
        organization_id: orgId,
        role: "partner_admin",
        first_name: firstName,
        last_name: lastName,
        email,
        is_apaly_team: false,
      });
      if (userError) {
        return NextResponse.json({ error: userError.message }, { status: 500 });
      }

      // Send confirmation email
      const confirmEmail = emailConfirmationEmail({ contactName: firstName, confirmationUrl });
      await sendEmail({ to: email, subject: confirmEmail.subject, html: confirmEmail.html });

      // Get parent org name for notification
      let parentName = "";
      if (invitedOrg.parent_organization_id) {
        const { data: parentOrg } = await supabase
          .from("partner_organizations")
          .select("company_name")
          .eq("id", invitedOrg.parent_organization_id)
          .maybeSingle();
        parentName = parentOrg?.company_name || "";
      }

      // Send notification to ApalyRx team
      const notifyEmails = await getNotificationEmails("new_partner_signup");
      if (notifyEmails.length > 0) {
        const emailContent = newPartnerSignupEmail({
          companyName: `${companyName}${parentName ? ` (sub-org of ${parentName})` : ""}`,
          contactName: `${firstName} ${lastName}`,
          email,
          ein,
          partnerId: orgId,
          registeredAt: new Date().toISOString(),
          approveUrl: `https://www.apalyrx.com/partners/api/approve-partner/${approvalToken}`,
          denyUrl: `https://www.apalyrx.com/partners/api/deny-partner/${approvalToken}`,
        });
        await sendEmail({ to: notifyEmails, subject: emailContent.subject, html: emailContent.html });
      }

      return NextResponse.json({ success: true, partnerCode });
    }

    // ── Standard Flow (with optional ref) ──
    partnerCode = await generateUniquePartnerCode(companyName);
    const approvalToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = new Date();
    tokenExpires.setDate(tokenExpires.getDate() + 7);

    // If ref param, look up referring org for parent link
    let parentOrgId: string | null = null;
    let parentName = "";
    if (ref) {
      const { data: refOrg } = await supabase
        .from("partner_organizations")
        .select("id, company_name")
        .eq("partner_code", ref)
        .eq("status", "active")
        .maybeSingle();
      if (refOrg) {
        parentOrgId = refOrg.id;
        parentName = refOrg.company_name;
      }
    }

    // Create partner organization
    const { data: org, error: orgError } = await supabase
      .from("partner_organizations")
      .insert({
        partner_code: partnerCode,
        company_name: companyName,
        ein: ein || null,
        address: address || null,
        city: city || null,
        state: state || null,
        zip: zip || null,
        website: website || null,
        notification_email: notificationEmail || email,
        status: "pending",
        approval_token: approvalToken,
        approval_token_expires_at: tokenExpires.toISOString(),
        ...(parentOrgId ? { parent_organization_id: parentOrgId, invited_by_organization_id: parentOrgId } : {}),
      })
      .select("id")
      .single();

    if (orgError) {
      return NextResponse.json({ error: orgError.message }, { status: 500 });
    }

    orgId = org.id;

    // Create partner user
    const { error: userError } = await supabase.from("partner_users").insert({
      user_id: userId,
      organization_id: orgId,
      role: "partner_admin",
      first_name: firstName,
      last_name: lastName,
      email,
      is_apaly_team: false,
    });

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    // Send confirmation email to the new partner
    const confirmEmail = emailConfirmationEmail({
      contactName: firstName,
      confirmationUrl,
    });
    await sendEmail({
      to: email,
      subject: confirmEmail.subject,
      html: confirmEmail.html,
    });

    // Send notification to ApalyRx team with one-click approve/deny
    const notifyEmails = await getNotificationEmails("new_partner_signup");
    if (notifyEmails.length > 0) {
      const emailContent = newPartnerSignupEmail({
        companyName: `${companyName}${parentName ? ` (sub-org of ${parentName})` : ""}`,
        contactName: `${firstName} ${lastName}`,
        email,
        ein,
        partnerId: orgId,
        registeredAt: new Date().toISOString(),
        approveUrl: `https://www.apalyrx.com/partners/api/approve-partner/${approvalToken}`,
        denyUrl: `https://www.apalyrx.com/partners/api/deny-partner/${approvalToken}`,
      });
      await sendEmail({
        to: notifyEmails,
        subject: emailContent.subject,
        html: emailContent.html,
      });
    }

    return NextResponse.json({ success: true, partnerCode });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
