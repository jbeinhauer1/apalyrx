import { Resend } from "resend";
import { createPartnerAdminClient } from "../supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "ApalyRx <noreply@apalyrx.com>";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  const toList = Array.isArray(to) ? to : [to];
  await resend.emails.send({
    from: FROM,
    to: toList,
    subject,
    html,
  });
}

export async function getNotificationEmails(
  eventType: string
): Promise<string[]> {
  const supabase = createPartnerAdminClient();
  const { data } = await supabase
    .from("admin_notification_settings")
    .select("email_list, enabled")
    .eq("event_type", eventType)
    .single();

  if (!data?.enabled || !data.email_list?.length) return [];
  return data.email_list;
}
