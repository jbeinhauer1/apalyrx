import { NextRequest, NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";

export async function POST(request: NextRequest) {
  const { ein } = await request.json();
  if (!ein || typeof ein !== "string") {
    return NextResponse.json({ error: "EIN required" }, { status: 400 });
  }

  const supabase = createPartnerAdminClient();
  const { count } = await supabase
    .from("partner_organizations")
    .select("id", { count: "exact", head: true })
    .eq("ein", ein.trim());

  return NextResponse.json({ available: (count || 0) === 0 });
}
