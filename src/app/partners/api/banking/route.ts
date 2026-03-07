import { NextRequest, NextResponse } from "next/server";
import { createPartnerServerClient } from "@/lib/partners/supabase/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { encryptBankAccount } from "@/lib/partners/encryption";
import { logAudit } from "@/lib/partners/audit";

export async function POST(request: NextRequest) {
  try {
    const supabase = createPartnerServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: pu } = await supabase
      .from("partner_users")
      .select("id, organization_id, email")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (!pu) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { bankName, routingNumber, accountNumber } = body;

    if (!bankName || !routingNumber || !accountNumber) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const encrypted = encryptBankAccount(accountNumber);
    const last4 = accountNumber.slice(-4);

    const admin = createPartnerAdminClient();
    await admin
      .from("partner_organizations")
      .update({
        bank_name: bankName,
        routing_number: routingNumber,
        account_number_encrypted: encrypted,
        account_number_last4: last4,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pu.organization_id);

    await logAudit({
      actorId: pu.id,
      actorEmail: pu.email,
      action: "EDIT_BANK_INFO",
      targetType: "partner_organization",
      targetId: pu.organization_id,
      ipAddress: request.headers.get("x-forwarded-for") || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Banking update error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
