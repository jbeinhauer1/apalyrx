import { NextRequest, NextResponse } from "next/server";
import { createPartnerServerClient } from "@/lib/partners/supabase/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";

async function checkApalyTeam() {
  const supabase = createPartnerServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  const { data: pu } = await supabase
    .from("partner_users")
    .select("id, is_apaly_team")
    .eq("user_id", session.user.id)
    .maybeSingle();
  return pu?.is_apaly_team ? pu : null;
}

export async function GET() {
  const pu = await checkApalyTeam();
  if (!pu) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const admin = createPartnerAdminClient();
  const { data: drugs } = await admin
    .from("drugs")
    .select("*, drug_diseases(disease_id)")
    .order("brand_name");

  return NextResponse.json({ drugs: drugs || [] });
}

export async function POST(request: NextRequest) {
  const pu = await checkApalyTeam();
  if (!pu) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const {
    ndc, brand_name, generic_name, is_biosimilar, reference_drug_id,
    scripts_per_member_month, wac_price, avg_pbm_post_rebate,
    apalyrx_net_price, status, disease_ids,
  } = body;

  if (!ndc || !brand_name || !generic_name || apalyrx_net_price == null) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  const admin = createPartnerAdminClient();

  const { data: drug, error } = await admin
    .from("drugs")
    .insert({
      ndc, brand_name, generic_name, is_biosimilar: is_biosimilar || false,
      reference_drug_id: reference_drug_id || null,
      scripts_per_member_month: scripts_per_member_month || 1.0,
      wac_price: wac_price || null,
      avg_pbm_post_rebate: avg_pbm_post_rebate || null,
      apalyrx_net_price, status: status || "active",
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") return NextResponse.json({ error: "NDC already exists" }, { status: 409 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (disease_ids?.length > 0) {
    await admin.from("drug_diseases").insert(
      disease_ids.map((did: string) => ({ drug_id: drug.id, disease_id: did }))
    );
  }

  return NextResponse.json({ drug });
}

export async function PUT(request: NextRequest) {
  const pu = await checkApalyTeam();
  if (!pu) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { id, disease_ids, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Drug ID required" }, { status: 400 });

  const admin = createPartnerAdminClient();
  updates.updated_at = new Date().toISOString();

  const { error } = await admin.from("drugs").update(updates).eq("id", id);
  if (error) {
    if (error.code === "23505") return NextResponse.json({ error: "NDC already exists" }, { status: 409 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (disease_ids !== undefined) {
    await admin.from("drug_diseases").delete().eq("drug_id", id);
    if (disease_ids.length > 0) {
      await admin.from("drug_diseases").insert(
        disease_ids.map((did: string) => ({ drug_id: id, disease_id: did }))
      );
    }
  }

  return NextResponse.json({ success: true });
}
