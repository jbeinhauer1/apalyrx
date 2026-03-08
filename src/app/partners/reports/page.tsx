"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPartnerClient } from "@/lib/partners/supabase/client";
import { FileText } from "lucide-react";

interface Lead {
  id: string;
  prospect_company_name: string;
  prospect_estimated_lives: string;
  status: string;
  submitted_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  qualified: "bg-blue-100 text-blue-800",
  customer: "bg-green-100 text-green-800",
};

export default function ReportsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createPartnerClient();
      const { data } = await supabase
        .from("leads")
        .select("id, prospect_company_name, prospect_estimated_lives, status, submitted_at")
        .in("status", ["qualified", "customer"])
        .order("submitted_at", { ascending: false });
      setLeads(data || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-[#102a4c]">Prospect Reports</h1>
      <p className="text-sm text-gray-600">
        Generate savings reports for qualified and customer leads.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Company</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Est. Lives</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Submitted</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No eligible leads found.</td></tr>
            ) : leads.map(lead => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-[#102a4c]">{lead.prospect_company_name}</td>
                <td className="px-4 py-3 text-gray-500">{lead.prospect_estimated_lives || "-"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${STATUS_COLORS[lead.status] || ""}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(lead.submitted_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Link href={`/partners/reports/prospect/${lead.id}`}
                    className="flex items-center gap-1 text-[#ff5e00] hover:underline text-xs font-medium">
                    <FileText className="w-3.5 h-3.5" /> Generate Report
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
