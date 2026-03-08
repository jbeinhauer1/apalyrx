"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  const router = useRouter();
  const partnerId = params.id as string;

  const [org, setOrg] = useState<Org | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [unmasked, setUnmasked] = useState<string | null>(null);
  const [unmasking, setUnmasking] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  function showMsg(text: string, type: "success" | "error" = "success") {
    setMessage(text);
    setMessageType(type);
  }

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

    showMsg(error ? error.message : "Saved.", error ? "error" : "success");
    setSaving(false);
  }

  async function partnerAction(action: string, reason?: string) {
    if (!org) return;
    setActionLoading(true);
    setMessage("");

    const res = await fetch("/partners/api/admin/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, partnerId: org.id, reason }),
    });
    const data = await res.json();

    if (!res.ok) {
      showMsg(data.error || "Action failed.", "error");
      setActionLoading(false);
      return;
    }

    if (data.deleted) {
      showMsg("Partner deleted.", "success");
      setTimeout(() => router.push("/partners/admin/partners"), 1500);
    } else if (data.status) {
      setOrg({ ...org, status: data.status });
      showMsg(`Status updated to ${data.status}.`, "success");
    }
    setActionLoading(false);
  }

  async function handleApprove() {
    if (!confirm("Approve this partner? They will be notified by email.")) return;
    await partnerAction("approve");
  }

  async function handleDeny() {
    const reason = prompt("Reason for denial (optional):");
    if (reason === null) return; // cancelled
    await partnerAction("deny", reason);
  }

  async function handleSuspend() {
    if (!confirm("Suspend this partner? They will lose access to the portal but their data will be preserved.")) return;
    await partnerAction("suspend");
  }

  async function handleActivate() {
    if (!confirm("Activate this partner account?")) return;
    await partnerAction("activate");
  }

  async function handleDelete() {
    if (!org || deleteConfirm !== org.company_name) return;
    setShowDeleteDialog(false);
    setDeleteConfirm("");
    await partnerAction("delete");
  }

  async function unmaskAccount() {
    if (!confirm("This action will be recorded in the audit log. Continue?")) return;
    setUnmasking(true);
    const res = await fetch(`/partners/api/banking/unmask?orgId=${partnerId}`);
    if (res.ok) {
      const data = await res.json();
      setUnmasked(data.accountNumber);
      setTimeout(() => setUnmasked(null), 60000);
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
          org.status === "denied" ? "bg-orange-100 text-orange-800" :
          "bg-red-100 text-red-800"
        }`}>
          {org.status}
        </span>
      </div>

      {message && (
        <div className={`rounded-lg p-3 text-sm ${
          messageType === "error"
            ? "bg-red-50 border border-red-200 text-red-700"
            : "bg-green-50 border border-green-200 text-green-700"
        }`}>{message}</div>
      )}

      {/* Status Control */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-bold text-[#102a4c] mb-3">Status Control</h3>
        <div className="flex flex-wrap gap-2">
          {org.status === "pending" && (
            <>
              <button onClick={handleApprove} disabled={actionLoading} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 disabled:opacity-50">
                Approve
              </button>
              <button onClick={handleDeny} disabled={actionLoading} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-50">
                Deny
              </button>
            </>
          )}
          {org.status === "active" && (
            <>
              <button onClick={handleSuspend} disabled={actionLoading} className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-50">
                Suspend
              </button>
              <button onClick={() => setShowDeleteDialog(true)} disabled={actionLoading} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-50">
                Delete
              </button>
            </>
          )}
          {(org.status === "suspended" || org.status === "denied") && (
            <>
              <button onClick={handleActivate} disabled={actionLoading} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 disabled:opacity-50">
                Activate
              </button>
              <button onClick={() => setShowDeleteDialog(true)} disabled={actionLoading} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-50">
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-5">
          <h3 className="font-bold text-red-800 mb-2">Delete Partner</h3>
          <p className="text-sm text-red-700 mb-3">
            This will permanently delete the partner organization, all user accounts, and their Supabase auth accounts. This cannot be undone.
          </p>
          <p className="text-sm text-red-700 mb-3">
            Type <strong>{org.company_name}</strong> to confirm:
          </p>
          <input
            type="text"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            className="w-full px-3 py-2 border border-red-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder={org.company_name}
          />
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={deleteConfirm !== org.company_name || actionLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {actionLoading ? "Deleting..." : "Confirm Delete"}
            </button>
            <button
              onClick={() => { setShowDeleteDialog(false); setDeleteConfirm(""); }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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
