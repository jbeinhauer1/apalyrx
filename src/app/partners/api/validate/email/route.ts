import { NextRequest, NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const supabase = createPartnerAdminClient();
  const { count } = await supabase
    .from("partner_users")
    .select("id", { count: "exact", head: true })
    .eq("email", email.toLowerCase().trim());

  return NextResponse.json({ available: (count || 0) === 0 });
}
