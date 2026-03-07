import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { logAudit } from "@/lib/partners/audit";

function verifySignature(body: string, signature: string): boolean {
  const secret = process.env.PARTNER_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-apaly-signature") || "";

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const {
      customer_ein,
      period_month,
      program_admin_fee,
      value_based_fee,
    } = JSON.parse(rawBody);

    if (!customer_ein || !period_month) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createPartnerAdminClient();

    // Find lead by EIN
    const { data: lead } = await supabase
      .from("leads")
      .select("id, organization_id")
      .eq("prospect_ein", customer_ein)
      .eq("status", "customer")
      .single();

    if (!lead) {
      return NextResponse.json(
        { error: "Customer not found by EIN" },
        { status: 404 }
      );
    }

    // Get partner commission rate
    const { data: org } = await supabase
      .from("partner_organizations")
      .select("commission_rate")
      .eq("id", lead.organization_id)
      .single();

    const rate = Number(org?.commission_rate || 0);
    const total = Number(program_admin_fee || 0) + Number(value_based_fee || 0);
    const commission = total * (rate / 100);

    const { data: entry } = await supabase
      .from("commission_entries")
      .insert({
        lead_id: lead.id,
        organization_id: lead.organization_id,
        period_month,
        program_admin_fee: program_admin_fee || 0,
        value_based_fee: value_based_fee || 0,
        commission_rate_applied: rate,
        commission_amount: commission,
        import_source: "webhook",
      })
      .select("id")
      .single();

    await logAudit({
      action: "WEBHOOK_RECEIVED",
      targetType: "commission_entries",
      targetId: entry?.id,
      metadata: { customer_ein, period_month },
    });

    return NextResponse.json({
      success: true,
      commission_id: entry?.id,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
