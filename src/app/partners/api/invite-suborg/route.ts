import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { createPartnerServerClient } from "@/lib/partners/supabase/server";
import { generateUniquePartnerCode } from "@/lib/partners/partner-code";
import { sendEmail } from "@/lib/partners/emails/send";
import { subOrgInviteEmail } from "@/lib/partners/emails/templates";

// GET: Validate an invite token and return parent org info
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const supabase = createPartnerAdminClient();

  const { data: org } = await supabase
    .from("partner_organizations")
    .select("id, company_name, status, invite_token_expires_at, parent_organization_id")
    .eq("invite_token", token)
    .eq("status", "invited")
    .maybeSingle();

  if (!org) {
    return NextResponse.json({ error: "Invalid or expired invite" }, { status: 404 });
  }

  if (org.invite_token_expires_at && new Date(org.invite_token_expires_at) < new Date()) {
    return NextResponse.json({ error: "Invite has expired" }, { status: 410 });
  }

  // Get parent org name
  let parentCompanyName = "";
  if (org.parent_organization_id) {
    const { data: parent } = await supabase
      .from("partner_organizations")
      .select("company_name")
      .eq("id", org.parent_organization_id)
      .maybeSingle();
    parentCompanyName = parent?.company_name || "";
  }

  return NextResponse.json({
    valid: true,
    parentCompanyName,
    placeholderOrgId: org.id,
  });
}

// POST: Create a sub-org invite (partner_admin of active org)
export async function POST(request: NextRequest) {
  try {
    const serverSupabase = await createPartnerServerClient();
    const { data: { session } } = await serverSupabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createPartnerAdminClient();

    // Verify caller is partner_admin of an active org
    const { data: callerUser } = await supabase
      .from("partner_users")
      .select("organization_id, role, first_name, last_name")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (!callerUser || callerUser.role !== "partner_admin") {
      return NextResponse.json({ error: "Only partner admins can invite sub-organizations" }, { status: 403 });
    }

    const { data: callerOrg } = await supabase
      .from("partner_organizations")
      .select("id, company_name, partner_code, status")
      .eq("id", callerUser.organization_id)
      .maybeSingle();

    if (!callerOrg || callerOrg.status !== "active") {
      return NextResponse.json({ error: "Your organization must be active to invite sub-organizations" }, { status: 403 });
    }

    const body = await request.json();
    const { email, companyName } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate invite token
    const inviteToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = new Date();
    tokenExpires.setDate(tokenExpires.getDate() + 30); // 30-day expiry

    // Generate a placeholder partner code
    const placeholderCode = await generateUniquePartnerCode(companyName || `sub-${callerOrg.partner_code}`);

    // Create placeholder org
    const { data: newOrg, error: orgError } = await supabase
      .from("partner_organizations")
      .insert({
        partner_code: placeholderCode,
        company_name: companyName || `Invited by ${callerOrg.company_name}`,
        status: "invited",
        parent_organization_id: callerOrg.id,
        invited_by_organization_id: callerOrg.id,
        invite_token: inviteToken,
        invite_token_expires_at: tokenExpires.toISOString(),
      })
      .select("id")
      .single();

    if (orgError) {
      return NextResponse.json({ error: orgError.message }, { status: 500 });
    }

    // Send invite email
    const inviteUrl = `https://www.apalyrx.com/partners/signup?invite=${inviteToken}`;
    const emailContent = subOrgInviteEmail({
      parentCompanyName: callerOrg.company_name,
      inviterName: `${callerUser.first_name} ${callerUser.last_name}`,
      inviteUrl,
    });
    await sendEmail({ to: email, subject: emailContent.subject, html: emailContent.html });

    return NextResponse.json({
      success: true,
      inviteUrl,
      orgId: newOrg.id,
    });
  } catch (err) {
    console.error("Invite sub-org error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
