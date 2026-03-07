"use client";

import { useEffect, useState } from "react";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { Save, Plus, Trash2, Lock } from "lucide-react";

type Tab = "profile" | "banking" | "team";

interface OrgData {
  id: string;
  partner_code: string;
  company_name: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  website: string;
  notification_email: string;
  routing_number: string;
  account_number_last4: string;
  bank_name: string;
}

interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  last_login: string | null;
}

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("profile");
  const [org, setOrg] = useState<OrgData | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Banking form
  const [bankForm, setBankForm] = useState({
    bankName: "",
    routingNumber: "",
    accountNumber: "",
    confirmAccountNumber: "",
  });
  const [showBankForm, setShowBankForm] = useState(false);

  // Invite form
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("partner_user");

  useEffect(() => {
    async function load() {
      const supabase = createPartnerClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: pu } = await supabase
        .from("partner_users")
        .select("organization_id, role")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!pu) { setLoading(false); return; }
      setIsAdmin(pu.role === "partner_admin");

      const { data: orgData } = await supabase
        .from("partner_organizations")
        .select("*")
        .eq("id", pu.organization_id)
        .maybeSingle();

      if (orgData) setOrg(orgData);

      const { data: teamData } = await supabase
        .from("partner_users")
        .select("id, first_name, last_name, email, role, last_login")
        .eq("organization_id", pu.organization_id)
        .order("created_at");

      setTeam(teamData || []);
      setLoading(false);
    }
    load();
  }, []);

  async function saveProfile() {
    if (!org) return;
    setSaving(true);
    setMessage("");
    const supabase = createPartnerClient();
    await supabase
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
        updated_at: new Date().toISOString(),
      })
      .eq("id", org.id);

    setMessage("Profile saved.");
    setSaving(false);
  }

  async function saveBanking() {
    if (bankForm.accountNumber !== bankForm.confirmAccountNumber) {
      setMessage("Account numbers do not match.");
      return;
    }
    setSaving(true);
    setMessage("");

    const res = await fetch("/partners/api/banking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bankName: bankForm.bankName,
        routingNumber: bankForm.routingNumber,
        accountNumber: bankForm.accountNumber,
      }),
    });

    if (res.ok) {
      setMessage("Banking info updated.");
      setShowBankForm(false);
      // Refresh org data
      const supabase = createPartnerClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: pu } = await supabase
          .from("partner_users")
          .select("organization_id")
          .eq("user_id", session.user.id)
          .maybeSingle();
        if (pu) {
          const { data: orgData } = await supabase
            .from("partner_organizations")
            .select("*")
            .eq("id", pu.organization_id)
            .maybeSingle();
          if (orgData) setOrg(orgData);
        }
      }
    } else {
      const data = await res.json();
      setMessage(data.error || "Failed to save banking info.");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!org) return null;

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50 focus:border-[#ff5e00]";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#102a4c]">Organization Profile</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        {(["profile", "banking", "team"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setMessage(""); }}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              tab === t ? "bg-white text-[#102a4c] shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {message && (
        <div className={`rounded-lg p-3 text-sm ${message.includes("fail") || message.includes("match") ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
          {message}
        </div>
      )}

      {/* Profile Tab */}
      {tab === "profile" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Partner Code</label>
            <div className="flex items-center gap-2">
              <input type="text" value={org.partner_code} disabled className={`${inputClass} bg-gray-50`} />
              <span className="text-xs text-gray-400 whitespace-nowrap">Contact ApalyRx to change</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input type="text" value={org.company_name} onChange={(e) => setOrg({ ...org, company_name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">EIN</label>
            <input type="text" value={org.ein || ""} onChange={(e) => setOrg({ ...org, ein: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" value={org.address || ""} onChange={(e) => setOrg({ ...org, address: e.target.value })} className={inputClass} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" value={org.city || ""} onChange={(e) => setOrg({ ...org, city: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" value={org.state || ""} onChange={(e) => setOrg({ ...org, state: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip</label>
              <input type="text" value={org.zip || ""} onChange={(e) => setOrg({ ...org, zip: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input type="url" value={org.website || ""} onChange={(e) => setOrg({ ...org, website: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notification Email</label>
            <input type="email" value={org.notification_email || ""} onChange={(e) => setOrg({ ...org, notification_email: e.target.value })} className={inputClass} />
          </div>
          <button onClick={saveProfile} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 disabled:opacity-50 text-sm">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      )}

      {/* Banking Tab */}
      {tab === "banking" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          {org.account_number_last4 ? (
            <>
              <div className="space-y-3 text-sm">
                <div><span className="text-gray-500">Bank Name:</span> <span className="font-medium">{org.bank_name}</span></div>
                <div><span className="text-gray-500">Routing Number:</span> <span className="font-medium">{org.routing_number}</span></div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Account Number:</span>
                  <span className="font-medium flex items-center gap-1"><Lock className="w-3 h-3" /> ••••••••{org.account_number_last4}</span>
                </div>
              </div>
              <button onClick={() => setShowBankForm(true)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                Update Banking Info
              </button>
            </>
          ) : (
            <div className="text-center py-6">
              <Lock className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-4">No banking information on file. Add your ACH details to receive commission payments.</p>
              <button onClick={() => setShowBankForm(true)} className="px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-semibold hover:bg-[#ff5e00]/90">
                Add Banking Info
              </button>
            </div>
          )}

          {showBankForm && (
            <div className="mt-4 border-t border-gray-200 pt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <input type="text" value={bankForm.bankName} onChange={(e) => setBankForm(p => ({ ...p, bankName: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                <input type="text" value={bankForm.routingNumber} onChange={(e) => setBankForm(p => ({ ...p, routingNumber: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <input type="password" value={bankForm.accountNumber} onChange={(e) => setBankForm(p => ({ ...p, accountNumber: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Account Number</label>
                <input type="password" value={bankForm.confirmAccountNumber} onChange={(e) => setBankForm(p => ({ ...p, confirmAccountNumber: e.target.value }))} className={inputClass} />
              </div>
              <div className="flex gap-2">
                <button onClick={saveBanking} disabled={saving} className="px-6 py-2.5 bg-[#ff5e00] text-white font-semibold rounded-lg hover:bg-[#ff5e00]/90 disabled:opacity-50 text-sm">
                  {saving ? "Saving..." : "Save Banking Info"}
                </button>
                <button onClick={() => setShowBankForm(false)} className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Team Tab */}
      {tab === "team" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 font-medium text-gray-500">Name</th>
                  <th className="text-left px-3 py-2 font-medium text-gray-500">Email</th>
                  <th className="text-left px-3 py-2 font-medium text-gray-500">Role</th>
                  <th className="text-left px-3 py-2 font-medium text-gray-500">Last Login</th>
                  {isAdmin && <th className="text-left px-3 py-2 font-medium text-gray-500"></th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {team.map((m) => (
                  <tr key={m.id}>
                    <td className="px-3 py-2">{m.first_name} {m.last_name}</td>
                    <td className="px-3 py-2 text-gray-500">{m.email}</td>
                    <td className="px-3 py-2">
                      <span className="capitalize text-xs px-2 py-0.5 bg-gray-100 rounded">{m.role.replace("_", " ")}</span>
                    </td>
                    <td className="px-3 py-2 text-gray-400 text-xs">
                      {m.last_login ? new Date(m.last_login).toLocaleDateString() : "Never"}
                    </td>
                    {isAdmin && (
                      <td className="px-3 py-2">
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isAdmin && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Invite Team Member</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Email address"
                  className={`flex-1 ${inputClass}`}
                />
                <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm">
                  <option value="partner_user">User</option>
                  <option value="partner_admin">Admin</option>
                </select>
                <button className="flex items-center gap-1 px-4 py-2.5 bg-[#102a4c] text-white rounded-lg text-sm hover:bg-[#102a4c]/90">
                  <Plus className="w-4 h-4" />
                  Invite
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
