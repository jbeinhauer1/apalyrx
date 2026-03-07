"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const LIVES_OPTIONS = [
  "Under 500",
  "500-2,500",
  "2,500-10,000",
  "10,000+",
];

export default function NewLeadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orgActive, setOrgActive] = useState<boolean | null>(null);
  const [partnerCode, setPartnerCode] = useState("");
  const [einStatus, setEinStatus] = useState<"idle" | "checking" | "unique" | "duplicate">("idle");

  const [form, setForm] = useState({
    companyName: "",
    ein: "",
    contactName: "",
    contactEmail: "",
    phone: "",
    estimatedLives: "",
    notes: "",
  });

  useEffect(() => {
    async function checkStatus() {
      const supabase = createPartnerClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: pu } = await supabase
        .from("partner_users")
        .select("organization_id")
        .eq("user_id", session.user.id)
        .single();
      if (!pu) return;
      const { data: org } = await supabase
        .from("partner_organizations")
        .select("status, partner_code")
        .eq("id", pu.organization_id)
        .single();
      setOrgActive(org?.status === "active");
      setPartnerCode(org?.partner_code || "");
    }
    checkStatus();
  }, []);

  function formatEin(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    if (digits.length > 2) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return digits;
  }

  const checkEin = useCallback(async (ein: string) => {
    if (!ein || ein.replace(/\D/g, "").length < 9) {
      setEinStatus("idle");
      return;
    }
    setEinStatus("checking");
    const supabase = createPartnerClient();
    const { data } = await supabase
      .from("leads")
      .select("id")
      .eq("prospect_ein", ein)
      .limit(1);
    setEinStatus(data && data.length > 0 ? "duplicate" : "unique");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => checkEin(form.ein), 500);
    return () => clearTimeout(timer);
  }, [form.ein, checkEin]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/partners/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, partnerCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      router.push("/partners/leads");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  if (orgActive === false) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-[#102a4c] mb-2">
            Account Not Active
          </h2>
          <p className="text-sm text-gray-600">
            Your account must be active before you can submit leads. Please
            complete your account setup.
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50 focus:border-[#ff5e00]";

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-[#102a4c] mb-6">Submit a Lead</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input type="text" required value={form.companyName} onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">EIN *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={form.ein}
                onChange={(e) => setForm((p) => ({ ...p, ein: formatEin(e.target.value) }))}
                className={inputClass}
                placeholder="XX-XXXXXXX"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {einStatus === "checking" && <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />}
                {einStatus === "unique" && <CheckCircle className="w-4 h-4 text-green-500" />}
                {einStatus === "duplicate" && <AlertCircle className="w-4 h-4 text-red-500" />}
              </div>
            </div>
            {einStatus === "duplicate" && (
              <p className="text-xs text-red-600 mt-1">
                This company is already registered in the ApalyRx system.
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
            <input type="text" required value={form.contactName} onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
            <input type="email" required value={form.contactEmail} onChange={(e) => setForm((p) => ({ ...p, contactEmail: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Covered Lives</label>
            <select value={form.estimatedLives} onChange={(e) => setForm((p) => ({ ...p, estimatedLives: e.target.value }))} className={inputClass}>
              <option value="">Select...</option>
              {LIVES_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea rows={3} value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} className={inputClass} />
          </div>
          <button
            type="submit"
            disabled={loading || einStatus === "duplicate"}
            className="w-full py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Lead"}
          </button>
        </form>
      </div>
    </div>
  );
}
