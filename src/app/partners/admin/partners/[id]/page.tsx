"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { Save, Eye, EyeOff, Lock } from "lucide-react";

interface Org {
  id: string;
  partner_code: string;
  company_name: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  website: string;
  status: string;
  commission_rate: number | null;
  commission_duration_months: number;
  notification_email: string;
  routing_number: string;
  account_number_last4: string;
  bank_name: string;
}

export default function AdminPartnerDetailPage() {
  const params = useParams();
  const partnerId = params.id as string;

  const [org, setOrg] = useState<Org | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [unmasked, setUnmasked] = useState<string | null>(null);
  const [unmasking, setUnmasking] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createPartnerClient();
      const { data } = await supabase
        .from("partner_organizations")
        .select("*")
        .eq("id", partnerId)
        .single();
      if (data) setOrg(data);
      setLoading(false);
    }
    load();
  }, [partnerId]);

  async function saveChanges() {
    if (!org) return;
    setSaving(true);
    setMessage("");
    const supabase = createPartnerClient();
    const { error } = await supabase
      .from("partner_organizations")
      .update({
        company_name: org.company_name,
        ein: org.ein,
        address: org.address,
        city: org.city,
        state: org.state,
        zip: org.zip,
        website: org.website,
        notification_email: org.notification_email,
        commission_rate: org.commission_rate,
        commission_duration_months: org.commission_duration_months,
        partner_code: org.partner_code,
        updated_at: new Date().toISOString(),
      })
      .eq("id", org.id);

    setMessage(error ? error.message : "Saved.");
    setSaving(false);
  }

  async function updateStatus(newStatus: string) {
    if (!org) return;
    const supabase = createPartnerClient();
    await supabase
      .from("partner_organizations")
      .update({
        status: newStatus,
        ...(newStatus === "active" ? { approved_at: new Date().toISOString() } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq("id", org.id);

    setOrg({ ...org, status: newStatus });
    setMessage(`Status updated to ${newStatus}.`);
  }

  async function unmaskAccount() {
    if (!confirm("This action will be recorded in the audit log. Continue?")) return;
    setUnmasking(true);
    const res = await fetch(`/partners/api/banking/unmask?orgId=${partnerId}`);
    if (res.ok) {
      const data = await res.json();
      setUnmasked(data.accountNumber);
      setTimeout(() => setUnmasked(null), 60000); // auto-remask after 60s
    }
    setUnmasking(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!org) return <div>Partner not found.</div>;

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#102a4c]">
          {org.company_name}
        </h1>
        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
          org.status === "active" ? "bg-green-100 text-green-800" :
          org.status === "pending" ? "bg-yellow-100 text-yellow-800" :
          "bg-red-100 text-red-800"
        }`}>
          {org.status}
        </span>
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">{message}</div>
      )}

      {/* Status Control */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-bold text-[#102a4c] mb-3">Status Control</h3>
        <div className="flex gap-2">
          {org.status === "pending" && (
            <button onClick={() => updateStatus("active")} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700">
              Approve Partner
            </button>
          )}
          {org.status !== "active" && org.status !== "pending" && (
            <button onClick={() => updateStatus("active")} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700">
              Activate
            </button>
          )}
          {org.status === "active" && (
            <button onClick={() => updateStatus("suspended")} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">
              Suspend
            </button>
          )}
        </div>
      </div>

      {/* Org Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <h3 className="font-bold text-[#102a4c]">Organization Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Partner Code</label>
            <input type="text" value={org.partner_code} onChange={(e) => setOrg({ ...org, partner_code: e.target.value.toUpperCase() })} className={inputClass} maxLength={4} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Company Name</label>
            <input type="text" value={org.company_name} onChange={(e) => setOrg({ ...org, company_name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">EIN</label>
            <input type="text" value={org.ein || ""} onChange={(e) => setOrg({ ...org, ein: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Notification Email</label>
            <input type="email" value={org.notification_email || ""} onChange={(e) => setOrg({ ...org, notification_email: e.target.value })} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Commission Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <h3 className="font-bold text-[#102a4c]">Commission Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Commission Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={org.commission_rate ?? ""}
              onChange={(e) => setOrg({ ...org, commission_rate: e.target.value ? Number(e.target.value) : null })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Duration (months)</label>
            <input
              type="number"
              value={org.commission_duration_months}
              onChange={(e) => setOrg({ ...org, commission_duration_months: Number(e.target.value) })}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Banking */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
        <h3 className="font-bold text-[#102a4c]">Banking Info</h3>
        {org.account_number_last4 ? (
          <div className="text-sm space-y-2">
            <div><span className="text-gray-500">Bank:</span> {org.bank_name}</div>
            <div><span className="text-gray-500">Routing:</span> {org.routing_number}</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Account:</span>
              {unmasked ? (
                <span className="font-mono">{unmasked}</span>
              ) : (
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" /> ••••••••{org.account_number_last4}
                </span>
              )}
              <button
                onClick={unmasked ? () => setUnmasked(null) : unmaskAccount}
                disabled={unmasking}
                className="ml-2 text-xs text-[#ff5e00] hover:underline flex items-center gap-1"
              >
                {unmasked ? <><EyeOff className="w-3 h-3" /> Mask</> : <><Eye className="w-3 h-3" /> Unmask</>}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No banking info on file.</p>
        )}
      </div>

      <button
        onClick={saveChanges}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 disabled:opacity-50 text-sm"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saving..." : "Save All Changes"}
      </button>
    </div>
  );
}
