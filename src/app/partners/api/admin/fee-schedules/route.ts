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
  const { data } = await admin
    .from("fee_schedules")
    .select("*, fee_schedule_tiers(*)")
    .order("created_at");

  return NextResponse.json({ feeSchedules: data || [] });
}

export async function POST(request: NextRequest) {
  const pu = await checkApalyTeam();
  if (!pu) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { name, description, clone_from_id } = await request.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const admin = createPartnerAdminClient();
  const { data: fs, error } = await admin
    .from("fee_schedules")
    .insert({ name, description: description || null })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (clone_from_id) {
    const { data: sourceTiers } = await admin
      .from("fee_schedule_tiers")
      .select("net_cost_min, net_cost_max, flat_fee, percent_fee, vbp_cap, sort_order")
      .eq("fee_schedule_id", clone_from_id)
      .order("sort_order");

    if (sourceTiers?.length) {
      await admin.from("fee_schedule_tiers").insert(
        sourceTiers.map((t) => ({ ...t, fee_schedule_id: fs.id }))
      );
    }
  }

  return NextResponse.json({ feeSchedule: fs });
}

export async function PUT(request: NextRequest) {
  const pu = await checkApalyTeam();
  if (!pu) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, set_default, ...updates } = await request.json();
  if (!id) return NextResponse.json({ error: "Fee schedule ID required" }, { status: 400 });

  const admin = createPartnerAdminClient();

  if (set_default) {
    await admin.from("fee_schedules").update({ is_default: false }).eq("is_default", true);
    await admin.from("fee_schedules").update({ is_default: true }).eq("id", id);
    return NextResponse.json({ success: true });
  }

  updates.updated_at = new Date().toISOString();
  const { error } = await admin.from("fee_schedules").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
