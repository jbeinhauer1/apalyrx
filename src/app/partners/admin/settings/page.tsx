"use client";

import { useEffect, useState } from "react";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { Save, Plus, X, Search } from "lucide-react";

interface NotificationSetting {
  id: string;
  event_type: string;
  email_list: string[];
  enabled: boolean;
}

interface AuditEntry {
  id: string;
  actor_email: string;
  action: string;
  target_type: string;
  target_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

interface PortalSetting {
  key: string;
  value: string;
}

type Tab = "notifications" | "calculator" | "audit";

const EVENT_LABELS: Record<string, string> = {
  new_partner_signup: "New Partner Signup",
  new_lead: "New Lead (Referral or Manual)",
  lead_approved: "Lead Approved",
  lead_denied: "Lead Denied",
};

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<Tab>("notifications");
  const [notifications, setNotifications] = useState<NotificationSetting[]>([]);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [portalSettings, setPortalSettings] = useState<PortalSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [newEmails, setNewEmails] = useState<Record<string, string>>({});
  const [auditFilter, setAuditFilter] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createPartnerClient();
      const [notifRes, auditRes, settingsRes] = await Promise.all([
        supabase.from("admin_notification_settings").select("*").order("event_type"),
        supabase.from("audit_log").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("portal_settings").select("*"),
      ]);
      setNotifications(notifRes.data || []);
      setAuditLog(auditRes.data || []);
      setPortalSettings(settingsRes.data || []);
      setLoading(false);
    }
    load();
  }, []);

  function addEmail(eventId: string) {
    const email = newEmails[eventId]?.trim();
    if (!email) return;
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === eventId
          ? { ...n, email_list: [...(n.email_list || []), email] }
          : n
      )
    );
    setNewEmails((p) => ({ ...p, [eventId]: "" }));
  }

  function removeEmail(eventId: string, email: string) {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === eventId
          ? { ...n, email_list: n.email_list.filter((e) => e !== email) }
          : n
      )
    );
  }

  async function saveNotifications() {
    setSaving(true);
    const supabase = createPartnerClient();
    for (const n of notifications) {
      await supabase
        .from("admin_notification_settings")
        .update({ email_list: n.email_list, enabled: n.enabled })
        .eq("id", n.id);
    }
    setMessage("Notification settings saved.");
    setSaving(false);
  }

  async function saveCalculatorDefaults() {
    setSaving(true);
    const supabase = createPartnerClient();
    for (const s of portalSettings) {
      await supabase
        .from("portal_settings")
        .update({ value: s.value, updated_at: new Date().toISOString() })
        .eq("key", s.key);
    }
    setMessage("Calculator defaults saved.");
    setSaving(false);
  }

  function updateSetting(key: string, value: string) {
    setPortalSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value } : s))
    );
  }

  const filteredAudit = auditFilter
    ? auditLog.filter(
        (a) =>
          a.action.toLowerCase().includes(auditFilter.toLowerCase()) ||
          a.actor_email?.toLowerCase().includes(auditFilter.toLowerCase())
      )
    : auditLog;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#102a4c]">Settings</h1>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(["notifications", "calculator", "audit"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setMessage(""); }}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
              tab === t ? "bg-white shadow-sm text-[#102a4c]" : "text-gray-500"
            }`}
          >
            {t === "audit" ? "Audit Log" : t === "calculator" ? "Calculator Defaults" : t}
          </button>
        ))}
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">{message}</div>
      )}

      {/* Notifications Tab */}
      {tab === "notifications" && (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div key={n.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-[#102a4c]">
                  {EVENT_LABELS[n.event_type] || n.event_type}
                </h3>
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={n.enabled}
                    onChange={(e) =>
                      setNotifications((prev) =>
                        prev.map((x) =>
                          x.id === n.id ? { ...x, enabled: e.target.checked } : x
                        )
                      )
                    }
                    className="accent-[#ff5e00]"
                  />
                  Enabled
                </label>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {(n.email_list || []).map((email) => (
                  <span key={email} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {email}
                    <button onClick={() => removeEmail(n.id, email)}>
                      <X className="w-3 h-3 text-gray-400 hover:text-red-500" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newEmails[n.id] || ""}
                  onChange={(e) => setNewEmails((p) => ({ ...p, [n.id]: e.target.value }))}
                  placeholder="Add email"
                  onKeyDown={(e) => e.key === "Enter" && addEmail(n.id)}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                />
                <button onClick={() => addEmail(n.id)} className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs hover:bg-gray-200">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={saveNotifications}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 disabled:opacity-50 text-sm"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Notification Settings"}
          </button>
        </div>
      )}

      {/* Calculator Defaults Tab */}
      {tab === "calculator" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          {portalSettings.map((s) => (
            <div key={s.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {s.key === "avg_commissionable_fee_per_life"
                  ? "Average Commissionable Fee Per Covered Life Per Month ($)"
                  : "Default Commission Duration for New Partners (months)"}
              </label>
              <input
                type="number"
                step={s.key.includes("fee") ? "0.01" : "1"}
                value={s.value}
                onChange={(e) => updateSetting(s.key, e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50"
              />
            </div>
          ))}
          <button
            onClick={saveCalculatorDefaults}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 disabled:opacity-50 text-sm"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Calculator Defaults"}
          </button>
        </div>
      )}

      {/* Audit Log Tab */}
      {tab === "audit" && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={auditFilter}
              onChange={(e) => setAuditFilter(e.target.value)}
              placeholder="Filter by action or email..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Timestamp</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Actor</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Action</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Target</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAudit.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                        No audit entries found.
                      </td>
                    </tr>
                  ) : (
                    filteredAudit.map((a) => (
                      <tr key={a.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                          {new Date(a.created_at).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-xs">{a.actor_email || "-"}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded">{a.action}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {a.target_type ? `${a.target_type}` : "-"}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400 max-w-xs truncate">
                          {a.metadata ? JSON.stringify(a.metadata) : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
