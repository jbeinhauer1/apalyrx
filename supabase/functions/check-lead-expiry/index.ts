// Run daily at 9am ET (configure in Supabase dashboard under Edge Functions → Schedules)
// Cron: 0 14 * * * (14:00 UTC = 9:00 AM ET)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

async function sendEmail(to: string, subject: string, html: string) {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "ApalyRx <noreply@apalyrx.com>",
      to: [to],
      subject,
      html,
    }),
  });
}

Deno.serve(async () => {
  const now = new Date();

  // 1. Send expiry warning emails at 30, 14, and 7 days
  const { data: qualifiedLeads } = await supabase
    .from("leads")
    .select("id, prospect_company_name, acceptance_deadline, organization_id")
    .eq("status", "qualified")
    .not("acceptance_deadline", "is", null);

  for (const lead of qualifiedLeads || []) {
    const deadline = new Date(lead.acceptance_deadline);
    const daysLeft = Math.ceil(
      (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if ([30, 14, 7].includes(daysLeft)) {
      const { data: org } = await supabase
        .from("partner_organizations")
        .select("notification_email, company_name")
        .eq("id", lead.organization_id)
        .single();

      if (org?.notification_email) {
        const deadlineStr = deadline.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        await sendEmail(
          org.notification_email,
          `⚠️ Lead Expiring in ${daysLeft} Days — ${lead.prospect_company_name}`,
          `<p>Hi ${org.company_name},</p>
           <p><strong>${lead.prospect_company_name}</strong> has <strong>${daysLeft} days remaining</strong> in the acceptance window.</p>
           <p><strong>Deadline:</strong> ${deadlineStr}</p>
           <p>If the prospect does not become a customer before this date, the lead will expire.</p>
           <p><a href="https://www.apalyrx.com/partners/leads/${lead.id}">View Lead</a></p>`
        );
      }
    }
  }

  // 2. Expire leads past deadline
  const { data: expiredLeads } = await supabase
    .from("leads")
    .select("id")
    .eq("status", "qualified")
    .lt("acceptance_deadline", now.toISOString());

  for (const lead of expiredLeads || []) {
    await supabase
      .from("leads")
      .update({
        status: "expired",
        expired_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq("id", lead.id);

    await supabase.from("lead_activity").insert({
      lead_id: lead.id,
      author_type: "apaly_team",
      content: "Lead expired — 150-day acceptance window has closed.",
      activity_type: "status_change",
    });

    await supabase.from("audit_log").insert({
      action: "LEAD_EXPIRED",
      target_type: "lead",
      target_id: lead.id,
      metadata: { via: "scheduled_job" },
    });
  }

  return new Response(
    JSON.stringify({
      warnings_sent: qualifiedLeads?.length || 0,
      expired: expiredLeads?.length || 0,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
});
