import { NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { calculateApalyFee } from "@/lib/partners/utils/feeCalculator";

export async function GET() {
  const admin = createPartnerAdminClient();

  // Fetch default fee schedule tiers
  const { data: defaultFs } = await admin
    .from("fee_schedules")
    .select("id, fee_schedule_tiers(*)")
    .eq("is_default", true)
    .maybeSingle();

  const tiers = defaultFs?.fee_schedule_tiers || [];

  // Fetch active diseases
  const { data: diseases } = await admin
    .from("diseases")
    .select("id, name, prevalence_per_1000")
    .eq("status", "active")
    .order("name");

  // Fetch active drugs with disease associations
  const { data: allDrugs } = await admin
    .from("drugs")
    .select("id, brand_name, generic_name, is_biosimilar, reference_drug_id, scripts_per_member_month, apalyrx_net_price, drug_diseases(disease_id)")
    .eq("status", "active");

  // Filter: show biosimilars and brand drugs that have no biosimilar replacement
  const biosimilarRefIds = new Set(
    (allDrugs || []).filter(d => d.is_biosimilar && d.reference_drug_id).map(d => d.reference_drug_id)
  );
  const visibleDrugs = (allDrugs || []).filter(
    d => d.is_biosimilar || !biosimilarRefIds.has(d.id)
  );

  // Build response grouped by disease — only expose what's needed for commission calc
  // Do NOT expose apalyrx_net_price or fee amounts directly
  const drugsByDisease: Record<string, {
    disease: { name: string; prevalence_per_1000: number };
    drugs: { id: string; name: string; scriptsPerMemberMonth: number; feePerScript: number }[];
  }> = {};

  for (const disease of (diseases || [])) {
    const diseaseDrugs = visibleDrugs.filter(d =>
      d.drug_diseases?.some((dd: { disease_id: string }) => dd.disease_id === disease.id)
    );
    if (diseaseDrugs.length === 0) continue;

    drugsByDisease[disease.id] = {
      disease: { name: disease.name, prevalence_per_1000: Number(disease.prevalence_per_1000) },
      drugs: diseaseDrugs.map(d => ({
        id: d.id,
        name: d.is_biosimilar ? `${d.brand_name} (${d.generic_name})` : d.brand_name,
        scriptsPerMemberMonth: Number(d.scripts_per_member_month),
        // Only expose the calculated fee, not the net price
        feePerScript: calculateApalyFee(Number(d.apalyrx_net_price), tiers),
      })),
    };
  }

  return NextResponse.json({ diseaseGroups: drugsByDisease });
}
