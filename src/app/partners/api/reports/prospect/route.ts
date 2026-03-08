import { NextRequest, NextResponse } from "next/server";
import { createPartnerServerClient } from "@/lib/partners/supabase/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { logAudit } from "@/lib/partners/audit";

export async function GET(request: NextRequest) {
  const leadId = request.nextUrl.searchParams.get("leadId");
  if (!leadId) return NextResponse.json({ error: "leadId required" }, { status: 400 });

  const supabase = createPartnerServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: pu } = await supabase
    .from("partner_users")
    .select("id, email, is_apaly_team, organization_id, role")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (!pu) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const admin = createPartnerAdminClient();

  // Fetch lead
  const { data: lead } = await admin
    .from("leads")
    .select("id, prospect_company_name, prospect_estimated_lives, organization_id, status")
    .eq("id", leadId)
    .single();

  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  if (!["qualified", "customer"].includes(lead.status)) {
    return NextResponse.json({ error: "Lead must be qualified or customer" }, { status: 400 });
  }

  // Access check: partner can only see their own org's leads
  if (!pu.is_apaly_team && lead.organization_id !== pu.organization_id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Check partner org is active
  if (!pu.is_apaly_team) {
    const { data: org } = await admin
      .from("partner_organizations")
      .select("status")
      .eq("id", pu.organization_id)
      .maybeSingle();
    if (org?.status !== "active") {
      return NextResponse.json({ error: "Partner organization must be active" }, { status: 403 });
    }
  }

  // Fetch default fee schedule tiers
  const { data: defaultFs } = await admin
    .from("fee_schedules")
    .select("id, fee_schedule_tiers(*)")
    .eq("is_default", true)
    .maybeSingle();

  // Fetch active drugs with disease associations
  const { data: drugs } = await admin
    .from("drugs")
    .select("id, brand_name, generic_name, is_biosimilar, wac_price, avg_pbm_post_rebate, apalyrx_net_price, scripts_per_member_month, drug_diseases(disease_id)")
    .eq("status", "active");

  // Fetch active diseases
  const { data: diseases } = await admin
    .from("diseases")
    .select("id, name, prevalence_per_1000")
    .eq("status", "active")
    .order("name");

  return NextResponse.json({
    lead: {
      id: lead.id,
      prospectCompanyName: lead.prospect_company_name,
      estimatedLives: lead.prospect_estimated_lives,
    },
    drugs: (drugs || []).map(d => ({
      id: d.id,
      brandName: d.brand_name,
      genericName: d.generic_name,
      isBiosimilar: d.is_biosimilar,
      wacPrice: Number(d.wac_price) || 0,
      avgPbmPostRebate: Number(d.avg_pbm_post_rebate) || 0,
      apalyrxNetPrice: Number(d.apalyrx_net_price),
      scriptsPerMemberMonth: Number(d.scripts_per_member_month),
      diseaseIds: d.drug_diseases?.map((dd: { disease_id: string }) => dd.disease_id) || [],
    })),
    diseases: (diseases || []).map(d => ({
      id: d.id,
      name: d.name,
      prevalence: Number(d.prevalence_per_1000),
    })),
    tiers: (defaultFs?.fee_schedule_tiers || []).map((t: { net_cost_min: number; net_cost_max: number | null; flat_fee: number; percent_fee: number; vbp_cap: number | null }) => ({
      net_cost_min: Number(t.net_cost_min),
      net_cost_max: t.net_cost_max ? Number(t.net_cost_max) : null,
      flat_fee: Number(t.flat_fee),
      percent_fee: Number(t.percent_fee),
      vbp_cap: t.vbp_cap ? Number(t.vbp_cap) : null,
    })),
  });
}

export async function POST(request: NextRequest) {
  const supabase = createPartnerServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: pu } = await supabase
    .from("partner_users")
    .select("id, email")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (!pu) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { leadId, coveredLives } = await request.json();

  await logAudit({
    actorId: pu.id,
    actorEmail: pu.email,
    action: "GENERATE_PROSPECT_REPORT",
    targetType: "lead",
    targetId: leadId,
    metadata: { coveredLives },
  });

  return NextResponse.json({ success: true });
}
