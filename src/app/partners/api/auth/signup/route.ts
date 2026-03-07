import { NextRequest, NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { generateUniquePartnerCode } from "@/lib/partners/partner-code";
import { sendEmail, getNotificationEmails } from "@/lib/partners/emails/send";
import { newPartnerSignupEmail } from "@/lib/partners/emails/templates";

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

    // Create auth user
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: false,
      });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

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
      user_id: authData.user.id,
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
