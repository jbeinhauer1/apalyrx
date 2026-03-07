"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import {
  FileText,
  MessageSquare,
  CheckCircle,
  Mail,
  Clock,
  Send,
} from "lucide-react";

interface Lead {
  id: string;
  prospect_company_name: string;
  prospect_ein: string;
  prospect_contact_name: string;
  prospect_contact_email: string;
  prospect_phone: string;
  prospect_estimated_lives: string;
  prospect_notes: string;
  submission_source: string;
  status: string;
  submitted_at: string;
  qualified_at: string | null;
  acceptance_deadline: string | null;
  customer_since: string | null;
  commission_start_date: string | null;
  commission_end_date: string | null;
  denial_reason: string | null;
}

interface Activity {
  id: string;
  author_type: string;
  content: string;
  activity_type: string;
  created_at: string;
  author?: { first_name: string; last_name: string } | null;
}

interface Commission {
  id: string;
  period_month: string;
  program_admin_fee: number;
  value_based_fee: number;
  total_commissionable: number;
  commission_rate_applied: number;
  commission_amount: number;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  qualified: "bg-blue-100 text-blue-800",
  customer: "bg-green-100 text-green-800",
  expired: "bg-gray-100 text-gray-600",
  denied: "bg-red-100 text-red-800",
};

const ACTIVITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  note: MessageSquare,
  status_change: FileText,
  email_sent: Mail,
  approval: CheckCircle,
};

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [submittingNote, setSubmittingNote] = useState(false);
  async function loadData() {
    const supabase = createPartnerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const [leadRes, actRes, commRes] = await Promise.all([
      supabase.from("leads").select("*").eq("id", leadId).single(),
      supabase
        .from("lead_activity")
        .select("*, author:partner_users(first_name, last_name)")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: true }),
      supabase
        .from("commission_entries")
        .select("*")
        .eq("lead_id", leadId)
        .order("period_month", { ascending: false }),
    ]);

    setLead(leadRes.data);
    setActivities(actRes.data || []);
    setCommissions(commRes.data || []);
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadData(); }, [leadId]);

  async function addNote() {
    if (!newNote.trim()) return;
    setSubmittingNote(true);
    const supabase = createPartnerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: pu } = await supabase
      .from("partner_users")
      .select("id, is_apaly_team")
      .eq("user_id", session.user.id)
      .maybeSingle();

    await supabase.from("lead_activity").insert({
      lead_id: leadId,
      author_id: pu?.id,
      author_type: pu?.is_apaly_team ? "apaly_team" : "partner",
      content: newNote,
      activity_type: "note",
    });

    setNewNote("");
    setSubmittingNote(false);
    loadData();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!lead) return <div className="text-gray-500">Lead not found.</div>;

  const daysLeft = lead.acceptance_deadline
    ? Math.ceil((new Date(lead.acceptance_deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#102a4c]">
            {lead.prospect_company_name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${STATUS_COLORS[lead.status]}`}>
              {lead.status}
            </span>
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
              lead.submission_source === "referral_link" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
            }`}>
              {lead.submission_source === "referral_link" ? "Referral" : "Manual"}
            </span>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {lead.prospect_ein && (
            <div><span className="text-gray-500">EIN:</span> <span className="text-[#102a4c] font-medium">{lead.prospect_ein}</span></div>
          )}
          <div><span className="text-gray-500">Contact:</span> <span className="text-[#102a4c] font-medium">{lead.prospect_contact_name}</span></div>
          <div><span className="text-gray-500">Email:</span> <span className="text-[#102a4c] font-medium">{lead.prospect_contact_email}</span></div>
          {lead.prospect_phone && (
            <div><span className="text-gray-500">Phone:</span> <span className="text-[#102a4c] font-medium">{lead.prospect_phone}</span></div>
          )}
          {lead.prospect_estimated_lives && (
            <div><span className="text-gray-500">Est. Lives:</span> <span className="text-[#102a4c] font-medium">{lead.prospect_estimated_lives}</span></div>
          )}
          <div><span className="text-gray-500">Submitted:</span> <span className="text-[#102a4c] font-medium">{new Date(lead.submitted_at).toLocaleDateString()}</span></div>
          {lead.prospect_notes && (
            <div className="sm:col-span-2"><span className="text-gray-500">Notes:</span> <span className="text-[#102a4c]">{lead.prospect_notes}</span></div>
          )}
        </div>
      </div>

      {/* 150-day countdown */}
      {lead.status === "qualified" && daysLeft !== null && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-[#ff5e00]" />
            <h3 className="font-bold text-[#102a4c]">Acceptance Window</h3>
          </div>
          <div className={`text-4xl font-bold mb-2 ${
            daysLeft > 30 ? "text-green-600" : daysLeft > 14 ? "text-orange-500" : "text-red-600"
          }`}>
            {Math.max(0, daysLeft)} days remaining
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full ${
                daysLeft > 30 ? "bg-green-500" : daysLeft > 14 ? "bg-orange-500" : "bg-red-500"
              }`}
              style={{ width: `${Math.max(0, Math.min(100, ((150 - daysLeft) / 150) * 100))}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            Deadline: {new Date(lead.acceptance_deadline!).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      )}

      {/* Denial reason */}
      {lead.status === "denied" && lead.denial_reason && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-800"><strong>Denial Reason:</strong> {lead.denial_reason}</p>
        </div>
      )}

      {/* Commission summary for customer leads */}
      {lead.status === "customer" && commissions.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-bold text-[#102a4c] mb-3">Commission Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 font-medium text-gray-500">Month</th>
                  <th className="text-right px-3 py-2 font-medium text-gray-500">Admin Fee</th>
                  <th className="text-right px-3 py-2 font-medium text-gray-500">Value-Based</th>
                  <th className="text-right px-3 py-2 font-medium text-gray-500">Rate</th>
                  <th className="text-right px-3 py-2 font-medium text-gray-500">Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {commissions.map((c) => (
                  <tr key={c.id}>
                    <td className="px-3 py-2">{c.period_month}</td>
                    <td className="px-3 py-2 text-right">${Number(c.program_admin_fee).toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">${Number(c.value_based_fee).toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">{Number(c.commission_rate_applied).toFixed(1)}%</td>
                    <td className="px-3 py-2 text-right font-medium">${Number(c.commission_amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 font-medium">
                <tr>
                  <td colSpan={4} className="px-3 py-2 text-right">Total Earned:</td>
                  <td className="px-3 py-2 text-right">
                    ${commissions.reduce((s, c) => s + Number(c.commission_amount), 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-bold text-[#102a4c] mb-4">Activity</h3>

        <div className="space-y-4 mb-4">
          {activities.map((a) => {
            const Icon = ACTIVITY_ICONS[a.activity_type] || MessageSquare;
            return (
              <div key={a.id} className="flex gap-3">
                <div className="mt-0.5">
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="font-medium text-gray-600">
                      {a.author ? `${a.author.first_name} ${a.author.last_name}` : "System"}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      a.author_type === "apaly_team"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {a.author_type === "apaly_team" ? "ApalyRx Team" : "Partner"}
                    </span>
                    <span>{new Date(a.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{a.content}</p>
                </div>
              </div>
            );
          })}
          {activities.length === 0 && (
            <p className="text-sm text-gray-400">No activity yet.</p>
          )}
        </div>

        {/* Add Note */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50"
          />
          <button
            onClick={addNote}
            disabled={submittingNote || !newNote.trim()}
            className="px-4 py-2 bg-[#102a4c] text-white rounded-lg text-sm hover:bg-[#102a4c]/90 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
