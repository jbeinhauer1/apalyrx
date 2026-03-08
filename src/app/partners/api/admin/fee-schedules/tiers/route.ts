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

export async function POST(request: NextRequest) {
  const pu = await checkApalyTeam();
  if (!pu) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { fee_schedule_id, net_cost_min, net_cost_max, flat_fee, percent_fee, vbp_cap, sort_order } = body;

  if (!fee_schedule_id || net_cost_min == null || flat_fee == null || percent_fee == null) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  const admin = createPartnerAdminClient();
  const { data, error } = await admin
    .from("fee_schedule_tiers")
    .insert({
      fee_schedule_id, net_cost_min,
      net_cost_max: net_cost_max ?? null,
      flat_fee, percent_fee,
      vbp_cap: vbp_cap ?? null,
      sort_order: sort_order || 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tier: data });
}

export async function PUT(request: NextRequest) {
  const pu = await checkApalyTeam();
  if (!pu) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, ...updates } = await request.json();
  if (!id) return NextResponse.json({ error: "Tier ID required" }, { status: 400 });

  const admin = createPartnerAdminClient();
  const { error } = await admin.from("fee_schedule_tiers").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const pu = await checkApalyTeam();
  if (!pu) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Tier ID required" }, { status: 400 });

  const admin = createPartnerAdminClient();
  const { error } = await admin.from("fee_schedule_tiers").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
