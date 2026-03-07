import { NextRequest, NextResponse } from "next/server";
import { createPartnerServerClient } from "@/lib/partners/supabase/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { logAudit } from "@/lib/partners/audit";

export async function POST(request: NextRequest) {
  const supabase = createPartnerServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: pu } = await supabase
    .from("partner_users")
    .select("id, email, is_apaly_team")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (!pu?.is_apaly_team) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { rows } = await request.json();
  const admin = createPartnerAdminClient();
  const batchId = crypto.randomUUID();

  let successCount = 0;
  let errorCount = 0;
  const errors: Array<{ ein: string; error: string }> = [];

  for (const row of rows) {
    try {
      // Find lead by EIN
      const { data: lead } = await admin
        .from("leads")
        .select("id, organization_id")
        .eq("prospect_ein", row.ein)
        .eq("status", "customer")
        .single();

      if (!lead) {
        errors.push({ ein: row.ein, error: "Customer not found" });
        errorCount++;
        continue;
      }

      // Get partner's commission rate
      const { data: org } = await admin
        .from("partner_organizations")
        .select("commission_rate")
        .eq("id", lead.organization_id)
        .single();

      const rate = Number(org?.commission_rate || 0);
      const total = Number(row.programAdminFee) + Number(row.valueBased);
      const commission = total * (rate / 100);

      await admin.from("commission_entries").insert({
        lead_id: lead.id,
        organization_id: lead.organization_id,
        period_month: row.periodMonth,
        program_admin_fee: row.programAdminFee,
        value_based_fee: row.valueBased,
        commission_rate_applied: rate,
        commission_amount: commission,
        import_source: "csv",
        import_batch_id: batchId,
        created_by: pu.id,
      });

      successCount++;
    } catch (err) {
      errors.push({ ein: row.ein, error: String(err) });
      errorCount++;
    }
  }

  // Log import
  await admin.from("commission_imports").insert({
    import_source: "csv",
    row_count: rows.length,
    success_count: successCount,
    error_count: errorCount,
    errors: errors.length > 0 ? errors : null,
    imported_by: pu.id,
  });

  await logAudit({
    actorId: pu.id,
    actorEmail: pu.email,
    action: "CSV_IMPORT",
    targetType: "commission_entries",
    metadata: { batchId, successCount, errorCount },
  });

  return NextResponse.json({ successCount, errorCount, errors });
}
