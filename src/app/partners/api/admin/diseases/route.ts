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
  const { data: diseases } = await admin
    .from("diseases")
    .select("*, drug_diseases(drug_id)")
    .order("name");

  return NextResponse.json({ diseases: diseases || [] });
}

export async function POST(request: NextRequest) {
  const pu = await checkApalyTeam();
  if (!pu) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { name, prevalence_per_1000 } = await request.json();
  if (!name || prevalence_per_1000 == null) {
    return NextResponse.json({ error: "Name and prevalence required" }, { status: 400 });
  }

  const admin = createPartnerAdminClient();
  const { data, error } = await admin
    .from("diseases")
    .insert({ name, prevalence_per_1000 })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ disease: data });
}

export async function PUT(request: NextRequest) {
  const pu = await checkApalyTeam();
  if (!pu) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, ...updates } = await request.json();
  if (!id) return NextResponse.json({ error: "Disease ID required" }, { status: 400 });

  const admin = createPartnerAdminClient();
  updates.updated_at = new Date().toISOString();
  const { error } = await admin.from("diseases").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
