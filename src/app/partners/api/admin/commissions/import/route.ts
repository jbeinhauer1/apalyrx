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
  const errors: Array<{ partnerCode: string; error: string }> = [];

  // Pre-fetch orgs by partner_code
  const partnerCodes = Array.from(new Set(rows.map((r: { partnerCode: string }) => r.partnerCode))) as string[];
  const { data: orgs } = await admin
    .from("partner_organizations")
    .select("id, partner_code, commission_rate")
    .in("partner_code", partnerCodes);
  const orgByCode = Object.fromEntries((orgs || []).map(o => [o.partner_code, o]));

  for (const row of rows) {
    try {
      const org = orgByCode[row.partnerCode];
      if (!org) {
        errors.push({ partnerCode: row.partnerCode, error: "Partner code not found" });
        errorCount++;
        continue;
      }

      // Try to find lead by EIN + org for linking
      let leadId: string | null = null;
      if (row.customerEin) {
        const { data: lead } = await admin
          .from("leads")
          .select("id")
          .eq("prospect_ein", row.customerEin)
          .eq("organization_id", org.id)
          .eq("status", "customer")
          .maybeSingle();
        leadId = lead?.id || null;
      }

      await admin.from("commission_entries").insert({
        lead_id: leadId,
        organization_id: org.id,
        period_month: row.periodMonth,
        program_admin_fee: row.apalyrxFee,
        value_based_fee: 0,
        commission_rate_applied: row.commissionRate,
        commission_amount: row.commissionAmount,
        import_source: "csv",
        import_batch_id: batchId,
        created_by: pu.id,
        partner_code: row.partnerCode,
        customer_name: row.customerName || null,
        script_id: row.scriptId || null,
        drug_ndc: row.drugNdc || null,
        drug_brand_name: row.drugBrandName || null,
        drug_generic_name: row.drugGenericName || null,
        fulfillment_date: row.fulfillmentDate || null,
        apalyrx_fee: row.apalyrxFee,
        commission_rate_snapshot: row.commissionRate,
      });

      successCount++;
    } catch (err) {
      errors.push({ partnerCode: row.partnerCode, error: String(err) });
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
