"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPartnerClient } from "@/lib/partners/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      const supabase = createPartnerClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/partners");
        return;
      }

      const { data: pu } = await supabase
        .from("partner_users")
        .select("is_apaly_team")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!pu?.is_apaly_team) {
        router.push("/partners/dashboard");
        return;
      }

      setAuthorized(true);
      setLoading(false);
    }
    check();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}
