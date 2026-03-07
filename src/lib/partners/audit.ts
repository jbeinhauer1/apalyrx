import { createPartnerAdminClient } from "./supabase/admin";

export async function logAudit({
  actorId,
  actorEmail,
  action,
  targetType,
  targetId,
  metadata,
  ipAddress,
}: {
  actorId?: string;
  actorEmail?: string;
  action: string;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
}) {
  const supabase = createPartnerAdminClient();
  await supabase.from("audit_log").insert({
    actor_id: actorId,
    actor_email: actorEmail,
    action,
    target_type: targetType,
    target_id: targetId,
    metadata,
    ip_address: ipAddress,
  });
}
