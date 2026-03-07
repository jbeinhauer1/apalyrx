import { NextRequest, NextResponse } from "next/server";
import { createPartnerServerClient } from "@/lib/partners/supabase/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { decryptBankAccount } from "@/lib/partners/encryption";
import { logAudit } from "@/lib/partners/audit";

export async function GET(request: NextRequest) {
  const orgId = request.nextUrl.searchParams.get("orgId");
  if (!orgId) {
    return NextResponse.json({ error: "Missing orgId" }, { status: 400 });
  }

  const supabase = createPartnerServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify admin
  const { data: pu } = await supabase
    .from("partner_users")
    .select("id, email, is_apaly_team, role")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (!pu?.is_apaly_team || pu.role !== "super_admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const admin = createPartnerAdminClient();
  const { data: org } = await admin
    .from("partner_organizations")
    .select("account_number_encrypted")
    .eq("id", orgId)
    .single();

  if (!org?.account_number_encrypted) {
    return NextResponse.json({ error: "No encrypted account" }, { status: 404 });
  }

  // Audit log BEFORE returning
  await logAudit({
    actorId: pu.id,
    actorEmail: pu.email,
    action: "UNMASK_BANK",
    targetType: "partner_organization",
    targetId: orgId,
    ipAddress: request.headers.get("x-forwarded-for") || undefined,
  });

  const accountNumber = decryptBankAccount(org.account_number_encrypted);
  return NextResponse.json({ accountNumber });
}
