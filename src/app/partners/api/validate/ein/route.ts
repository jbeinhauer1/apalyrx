import { NextRequest, NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";

export async function POST(request: NextRequest) {
  const { ein } = await request.json();
  if (!ein || typeof ein !== "string") {
    return NextResponse.json({ error: "EIN required" }, { status: 400 });
  }

  const supabase = createPartnerAdminClient();
  const trimmed = ein.trim();

  const [orgRes, leadRes] = await Promise.all([
    supabase.from("partner_organizations").select("id", { count: "exact", head: true }).eq("ein", trimmed),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("prospect_ein", trimmed),
  ]);

  const found = (orgRes.count || 0) > 0 || (leadRes.count || 0) > 0;
  return NextResponse.json({ available: !found });
}
