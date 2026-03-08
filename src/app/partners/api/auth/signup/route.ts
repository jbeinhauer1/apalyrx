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
    } = body;

    if (!firstName || !lastName || !email || !password || !companyName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createPartnerAdminClient();

    // Create auth user and generate email confirmation link in one step.
    // generateLink creates the user AND returns an action_link we control.
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

    // Generate unique partner code
    const partnerCode = await generateUniquePartnerCode();

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
      })
      .select("id")
      .single();

    if (orgError) {
      return NextResponse.json({ error: orgError.message }, { status: 500 });
    }

    // Create partner user
    const { error: userError } = await supabase.from("partner_users").insert({
      user_id: userId,
      organization_id: org.id,
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

    // Send notification to ApalyRx team
    const notifyEmails = await getNotificationEmails("new_partner_signup");
    if (notifyEmails.length > 0) {
      const emailContent = newPartnerSignupEmail({
        companyName,
        contactName: `${firstName} ${lastName}`,
        email,
        ein,
        partnerId: org.id,
        appliedAt: new Date().toISOString(),
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
