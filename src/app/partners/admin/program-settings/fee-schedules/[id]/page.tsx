"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { calculateApalyFee } from "@/lib/partners/utils/feeCalculator";

interface Tier {
  id: string;
  net_cost_min: number;
  net_cost_max: number | null;
  flat_fee: number;
  percent_fee: number;
  vbp_cap: number | null;
  sort_order: number;
}

interface FeeSchedule {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  status: string;
  fee_schedule_tiers: Tier[];
}

const inputClass =
  "w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#ff5e00]/50";

export default function FeeScheduleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const fsId = params.id as string;

  const [fs, setFs] = useState<FeeSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const loadFs = useCallback(async () => {
    const res = await fetch("/partners/api/admin/fee-schedules");
    const data = await res.json();
    const found = (data.feeSchedules || []).find((f: FeeSchedule) => f.id === fsId);
    if (found) {
      setFs(found);
      setName(found.name);
      setDescription(found.description || "");
      found.fee_schedule_tiers.sort((a: Tier, b: Tier) => a.sort_order - b.sort_order);
    }
    setLoading(false);
  }, [fsId]);

  useEffect(() => { loadFs(); }, [loadFs]);

  async function saveMeta() {
    setSaving(true);
    await fetch("/partners/api/admin/fee-schedules", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: fsId, name, description }),
    });
    setSaving(false);
    loadFs();
  }

  async function addTier() {
    const maxSort = fs?.fee_schedule_tiers.reduce((m, t) => Math.max(m, t.sort_order), 0) || 0;
    await fetch("/partners/api/admin/fee-schedules/tiers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fee_schedule_id: fsId, net_cost_min: 0, net_cost_max: null,
        flat_fee: 0, percent_fee: 0, vbp_cap: null, sort_order: maxSort + 1,
      }),
    });
    loadFs();
  }

  async function updateTier(tierId: string, updates: Partial<Tier>) {
    await fetch("/partners/api/admin/fee-schedules/tiers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: tierId, ...updates }),
    });
    loadFs();
  }

  async function deleteTier(tierId: string) {
    if (!confirm("Delete this tier?")) return;
    await fetch("/partners/api/admin/fee-schedules/tiers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: tierId }),
    });
    loadFs();
  }

  async function setDefault() {
    await fetch("/partners/api/admin/fee-schedules", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: fsId, set_default: true }),
    });
    loadFs();
  }

  async function archive() {
    if (!confirm("Archive this fee schedule? It cannot be assigned to new customers.")) return;
    await fetch("/partners/api/admin/fee-schedules", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: fsId, status: "archived" }),
    });
    router.push("/partners/admin/program-settings");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!fs) return <div className="text-gray-500">Fee schedule not found.</div>;

  const tiers = fs.fee_schedule_tiers;

  // Preview table: show fee for sample prices
  const samplePrices = [50, 150, 500, 1000, 3000, 10000, 30000];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link href="/partners/admin/program-settings" className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#ff5e00]">
        <ArrowLeft className="w-4 h-4" /> Back to Program Settings
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#102a4c]">Fee Schedule: {fs.name}</h1>
        <div className="flex gap-2">
          {!fs.is_default && fs.status === "active" && (
            <button onClick={setDefault} className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
              Set as Default
            </button>
          )}
          {!fs.is_default && fs.status === "active" && (
            <button onClick={archive} className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100">
              Archive
            </button>
          )}
        </div>
      </div>

      {/* Meta editing */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <input value={description} onChange={e => setDescription(e.target.value)} className={inputClass} />
          </div>
        </div>
        <button onClick={saveMeta} disabled={saving} className="px-4 py-1.5 bg-[#102a4c] text-white rounded-lg text-sm hover:bg-[#102a4c]/90 disabled:opacity-50">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Tiers table */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#102a4c]">Fee Tiers</h3>
          <button onClick={addTier} className="flex items-center gap-1 px-3 py-1.5 bg-[#ff5e00] text-white rounded-lg text-xs font-medium hover:bg-[#ff5e00]/90">
            <Plus className="w-3.5 h-3.5" /> Add Tier
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-gray-500">Net Cost Min</th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">Net Cost Max</th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">Flat Fee</th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">% Fee</th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">VBP Cap</th>
                <th className="text-left px-3 py-2 font-medium text-gray-500">Order</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tiers.map(tier => (
                <tr key={tier.id}>
                  <td className="px-3 py-2">
                    <input type="number" step="0.01" defaultValue={tier.net_cost_min}
                      onBlur={e => updateTier(tier.id, { net_cost_min: parseFloat(e.target.value) })}
                      className="w-24 px-2 py-1 border rounded text-sm" />
                  </td>
                  <td className="px-3 py-2">
                    <input type="number" step="0.01" defaultValue={tier.net_cost_max ?? ""}
                      placeholder="No cap"
                      onBlur={e => updateTier(tier.id, { net_cost_max: e.target.value ? parseFloat(e.target.value) : null })}
                      className="w-24 px-2 py-1 border rounded text-sm" />
                  </td>
                  <td className="px-3 py-2">
                    <input type="number" step="0.01" defaultValue={tier.flat_fee}
                      onBlur={e => updateTier(tier.id, { flat_fee: parseFloat(e.target.value) })}
                      className="w-20 px-2 py-1 border rounded text-sm" />
                  </td>
                  <td className="px-3 py-2">
                    <input type="number" step="0.0001" defaultValue={tier.percent_fee}
                      onBlur={e => updateTier(tier.id, { percent_fee: parseFloat(e.target.value) })}
                      className="w-20 px-2 py-1 border rounded text-sm" />
                  </td>
                  <td className="px-3 py-2">
                    <input type="number" step="0.01" defaultValue={tier.vbp_cap ?? ""}
                      placeholder="None"
                      onBlur={e => updateTier(tier.id, { vbp_cap: e.target.value ? parseFloat(e.target.value) : null })}
                      className="w-24 px-2 py-1 border rounded text-sm" />
                  </td>
                  <td className="px-3 py-2">
                    <input type="number" defaultValue={tier.sort_order}
                      onBlur={e => updateTier(tier.id, { sort_order: parseInt(e.target.value) })}
                      className="w-16 px-2 py-1 border rounded text-sm" />
                  </td>
                  <td className="px-3 py-2">
                    <button onClick={() => deleteTier(tier.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {tiers.length === 0 && (
                <tr><td colSpan={7} className="px-3 py-6 text-center text-gray-400 text-sm">No tiers. Click &quot;Add Tier&quot; to get started.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live preview */}
      {tiers.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-bold text-[#102a4c] mb-3">Fee Preview</h3>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-gray-500">Net Drug Price</th>
                <th className="text-right px-3 py-2 font-medium text-gray-500">Flat Fee</th>
                <th className="text-right px-3 py-2 font-medium text-gray-500">Value-Based</th>
                <th className="text-right px-3 py-2 font-medium text-gray-500">Total Admin Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {samplePrices.map(price => {
                const fee = calculateApalyFee(price, tiers);
                const tier = tiers.find(t => price >= t.net_cost_min && (t.net_cost_max === null || price <= t.net_cost_max));
                const vb = tier ? price * tier.percent_fee : 0;
                const cappedVb = tier?.vbp_cap ? Math.min(vb, tier.vbp_cap) : vb;
                return (
                  <tr key={price}>
                    <td className="px-3 py-2">${price.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right">${tier?.flat_fee.toFixed(2) || "0.00"}</td>
                    <td className="px-3 py-2 text-right">${cappedVb.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right font-medium">${fee.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
