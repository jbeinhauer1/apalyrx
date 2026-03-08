"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { calculateApalyFee } from "@/lib/partners/utils/feeCalculator";
import {
  Plus, Pencil, ToggleLeft, ToggleRight, X, Pill, Activity, DollarSign,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────
interface Disease {
  id: string;
  name: string;
  prevalence_per_1000: number;
  status: string;
  drug_diseases?: { drug_id: string }[];
}

interface Drug {
  id: string;
  ndc: string;
  brand_name: string;
  generic_name: string;
  is_biosimilar: boolean;
  reference_drug_id: string | null;
  scripts_per_member_month: number;
  wac_price: number | null;
  avg_pbm_post_rebate: number | null;
  apalyrx_net_price: number;
  status: string;
  drug_diseases?: { disease_id: string }[];
}

interface FeeSchedule {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  status: string;
  fee_schedule_tiers?: Tier[];
}

interface Tier {
  net_cost_min: number;
  net_cost_max: number | null;
  flat_fee: number;
  percent_fee: number;
  vbp_cap: number | null;
}

type Tab = "drugs" | "diseases" | "fees";

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e00]/50 focus:border-[#ff5e00]";

export default function ProgramSettingsPage() {
  const [tab, setTab] = useState<Tab>("drugs");
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [feeSchedules, setFeeSchedules] = useState<FeeSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [standardTiers, setStandardTiers] = useState<Tier[]>([]);

  // ─── Drug form state ──────────────────────────────
  const [showDrugModal, setShowDrugModal] = useState(false);
  const [editingDrug, setEditingDrug] = useState<Drug | null>(null);
  const [drugForm, setDrugForm] = useState({
    ndc: "", brand_name: "", generic_name: "", is_biosimilar: false,
    reference_drug_id: "", scripts_per_member_month: "1.0",
    wac_price: "", avg_pbm_post_rebate: "", apalyrx_net_price: "",
    status: "active", disease_ids: [] as string[],
  });
  const [drugError, setDrugError] = useState("");
  const [drugSaving, setDrugSaving] = useState(false);

  // ─── Disease form state ───────────────────────────
  const [showDiseaseModal, setShowDiseaseModal] = useState(false);
  const [editingDisease, setEditingDisease] = useState<Disease | null>(null);
  const [diseaseForm, setDiseaseForm] = useState({ name: "", prevalence_per_1000: "" });
  const [diseaseError, setDiseaseError] = useState("");
  const [diseaseSaving, setDiseaseSaving] = useState(false);

  // ─── Fee schedule form state ──────────────────────
  const [showFsModal, setShowFsModal] = useState(false);
  const [fsForm, setFsForm] = useState({ name: "", description: "", clone_from_id: "" });
  const [fsError, setFsError] = useState("");
  const [fsSaving, setFsSaving] = useState(false);

  // ─── Data loading ─────────────────────────────────
  const loadData = useCallback(async () => {
    const [drugRes, diseaseRes, fsRes] = await Promise.all([
      fetch("/partners/api/admin/drugs"),
      fetch("/partners/api/admin/diseases"),
      fetch("/partners/api/admin/fee-schedules"),
    ]);
    const [drugData, diseaseData, fsData] = await Promise.all([
      drugRes.json(), diseaseRes.json(), fsRes.json(),
    ]);
    setDrugs(drugData.drugs || []);
    setDiseases(diseaseData.diseases || []);
    setFeeSchedules(fsData.feeSchedules || []);

    const defaultFs = (fsData.feeSchedules || []).find((f: FeeSchedule) => f.is_default);
    if (defaultFs?.fee_schedule_tiers) setStandardTiers(defaultFs.fee_schedule_tiers);

    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // ─── Fee preview ──────────────────────────────────
  const feePreview = drugForm.apalyrx_net_price && standardTiers.length > 0
    ? calculateApalyFee(parseFloat(drugForm.apalyrx_net_price), standardTiers)
    : null;

  // ─── Drug CRUD ────────────────────────────────────
  function openDrugModal(drug?: Drug) {
    if (drug) {
      setEditingDrug(drug);
      setDrugForm({
        ndc: drug.ndc, brand_name: drug.brand_name, generic_name: drug.generic_name,
        is_biosimilar: drug.is_biosimilar,
        reference_drug_id: drug.reference_drug_id || "",
        scripts_per_member_month: String(drug.scripts_per_member_month),
        wac_price: drug.wac_price != null ? String(drug.wac_price) : "",
        avg_pbm_post_rebate: drug.avg_pbm_post_rebate != null ? String(drug.avg_pbm_post_rebate) : "",
        apalyrx_net_price: String(drug.apalyrx_net_price),
        status: drug.status,
        disease_ids: drug.drug_diseases?.map(d => d.disease_id) || [],
      });
    } else {
      setEditingDrug(null);
      setDrugForm({
        ndc: "", brand_name: "", generic_name: "", is_biosimilar: false,
        reference_drug_id: "", scripts_per_member_month: "1.0",
        wac_price: "", avg_pbm_post_rebate: "", apalyrx_net_price: "",
        status: "active", disease_ids: [],
      });
    }
    setDrugError("");
    setShowDrugModal(true);
  }

  async function saveDrug() {
    setDrugSaving(true);
    setDrugError("");
    const payload = {
      ...(editingDrug ? { id: editingDrug.id } : {}),
      ndc: drugForm.ndc,
      brand_name: drugForm.brand_name,
      generic_name: drugForm.generic_name,
      is_biosimilar: drugForm.is_biosimilar,
      reference_drug_id: drugForm.reference_drug_id || null,
      scripts_per_member_month: parseFloat(drugForm.scripts_per_member_month) || 1.0,
      wac_price: drugForm.wac_price ? parseFloat(drugForm.wac_price) : null,
      avg_pbm_post_rebate: drugForm.avg_pbm_post_rebate ? parseFloat(drugForm.avg_pbm_post_rebate) : null,
      apalyrx_net_price: parseFloat(drugForm.apalyrx_net_price),
      status: drugForm.status,
      disease_ids: drugForm.disease_ids,
    };
    const res = await fetch("/partners/api/admin/drugs", {
      method: editingDrug ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) { setDrugError(data.error); setDrugSaving(false); return; }
    setShowDrugModal(false);
    setDrugSaving(false);
    loadData();
  }

  async function toggleDrugStatus(drug: Drug) {
    await fetch("/partners/api/admin/drugs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: drug.id, status: drug.status === "active" ? "inactive" : "active" }),
    });
    loadData();
  }

  // ─── Disease CRUD ─────────────────────────────────
  function openDiseaseModal(disease?: Disease) {
    if (disease) {
      setEditingDisease(disease);
      setDiseaseForm({ name: disease.name, prevalence_per_1000: String(disease.prevalence_per_1000) });
    } else {
      setEditingDisease(null);
      setDiseaseForm({ name: "", prevalence_per_1000: "" });
    }
    setDiseaseError("");
    setShowDiseaseModal(true);
  }

  async function saveDisease() {
    setDiseaseSaving(true);
    setDiseaseError("");
    const payload = {
      ...(editingDisease ? { id: editingDisease.id } : {}),
      name: diseaseForm.name,
      prevalence_per_1000: parseFloat(diseaseForm.prevalence_per_1000),
    };
    const res = await fetch("/partners/api/admin/diseases", {
      method: editingDisease ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) { setDiseaseError(data.error); setDiseaseSaving(false); return; }
    setShowDiseaseModal(false);
    setDiseaseSaving(false);
    loadData();
  }

  async function toggleDiseaseStatus(disease: Disease) {
    await fetch("/partners/api/admin/diseases", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: disease.id, status: disease.status === "active" ? "inactive" : "active" }),
    });
    loadData();
  }

  // ─── Fee Schedule CRUD ────────────────────────────
  async function createFeeSchedule() {
    setFsSaving(true);
    setFsError("");
    const res = await fetch("/partners/api/admin/fee-schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fsForm),
    });
    const data = await res.json();
    if (!res.ok) { setFsError(data.error); setFsSaving(false); return; }
    setShowFsModal(false);
    setFsSaving(false);
    loadData();
  }

  async function setDefaultFs(id: string) {
    await fetch("/partners/api/admin/fee-schedules", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, set_default: true }),
    });
    loadData();
  }

  async function archiveFs(id: string) {
    if (!confirm("Archive this fee schedule?")) return;
    await fetch("/partners/api/admin/fee-schedules", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "archived" }),
    });
    loadData();
  }

  // ─── Render helpers ───────────────────────────────
  const activeDiseases = diseases.filter(d => d.status === "active");
  const brandDrugs = drugs.filter(d => !d.is_biosimilar && d.status === "active");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#ff5e00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-[#102a4c]">Program Settings</h1>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {([
          { key: "drugs" as Tab, label: "Drug Formulary", icon: Pill },
          { key: "diseases" as Tab, label: "Disease Categories", icon: Activity },
          { key: "fees" as Tab, label: "Fee Schedules", icon: DollarSign },
        ]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === key
                ? "border-[#ff5e00] text-[#ff5e00]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* ═══ TAB 1: DRUG FORMULARY ═══ */}
      {tab === "drugs" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => openDrugModal()} className="flex items-center gap-2 px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-medium hover:bg-[#ff5e00]/90">
              <Plus className="w-4 h-4" /> Add Drug
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">NDC</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Brand Name</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Generic Name</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Bio?</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-500">ApalyRx Net</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {drugs.length === 0 ? (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No drugs yet.</td></tr>
                  ) : drugs.map(drug => (
                    <tr key={drug.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs">{drug.ndc}</td>
                      <td className="px-4 py-3 font-medium text-[#102a4c]">{drug.brand_name}</td>
                      <td className="px-4 py-3 text-gray-600">{drug.generic_name}</td>
                      <td className="px-4 py-3">{drug.is_biosimilar ? <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Yes</span> : "-"}</td>
                      <td className="px-4 py-3 text-right">${Number(drug.apalyrx_net_price).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${
                          drug.status === "active" ? "bg-green-100 text-green-800" : drug.status === "inactive" ? "bg-gray-100 text-gray-600" : "bg-yellow-100 text-yellow-800"
                        }`}>{drug.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openDrugModal(drug)} className="text-[#ff5e00] hover:underline text-xs flex items-center gap-1">
                            <Pencil className="w-3 h-3" /> Edit
                          </button>
                          <button onClick={() => toggleDrugStatus(drug)} className="text-xs text-gray-500 hover:text-gray-700">
                            {drug.status === "active" ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB 2: DISEASE CATEGORIES ═══ */}
      {tab === "diseases" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => openDiseaseModal()} className="flex items-center gap-2 px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-medium hover:bg-[#ff5e00]/90">
              <Plus className="w-4 h-4" /> Add Disease
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500">Prevalence / 1,000</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500">Linked Drugs</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {diseases.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No diseases yet.</td></tr>
                ) : diseases.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-[#102a4c]">{d.name}</td>
                    <td className="px-4 py-3 text-right">{Number(d.prevalence_per_1000).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">{d.drug_diseases?.length || 0}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${
                        d.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                      }`}>{d.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openDiseaseModal(d)} className="text-[#ff5e00] hover:underline text-xs flex items-center gap-1">
                          <Pencil className="w-3 h-3" /> Edit
                        </button>
                        <button onClick={() => toggleDiseaseStatus(d)} className="text-xs text-gray-500 hover:text-gray-700">
                          {d.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══ TAB 3: FEE SCHEDULES ═══ */}
      {tab === "fees" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => { setFsForm({ name: "", description: "", clone_from_id: "" }); setFsError(""); setShowFsModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-medium hover:bg-[#ff5e00]/90">
              <Plus className="w-4 h-4" /> Create Fee Schedule
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Description</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Default</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500">Tiers</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {feeSchedules.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No fee schedules yet.</td></tr>
                ) : feeSchedules.map(fs => (
                  <tr key={fs.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-[#102a4c]">{fs.name}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{fs.description || "-"}</td>
                    <td className="px-4 py-3">
                      {fs.is_default ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">Default</span>
                      ) : (
                        <button onClick={() => setDefaultFs(fs.id)} className="text-xs text-gray-400 hover:text-[#ff5e00]">Set default</button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${
                        fs.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                      }`}>{fs.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right">{fs.fee_schedule_tiers?.length || 0}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/partners/admin/program-settings/fee-schedules/${fs.id}`} className="text-[#ff5e00] hover:underline text-xs">
                          Edit Tiers
                        </Link>
                        {!fs.is_default && fs.status === "active" && (
                          <button onClick={() => archiveFs(fs.id)} className="text-xs text-gray-500 hover:text-red-600">Archive</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══ DRUG MODAL ═══ */}
      {showDrugModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-8">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#102a4c]">{editingDrug ? "Edit Drug" : "Add Drug"}</h3>
              <button onClick={() => setShowDrugModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            {drugError && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-4">{drugError}</div>}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">NDC *</label>
                <input value={drugForm.ndc} onChange={e => setDrugForm(p => ({ ...p, ndc: e.target.value.replace(/\D/g, "").slice(0, 11) }))} className={inputClass} placeholder="11-digit NDC" maxLength={11} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Brand Name *</label>
                  <input value={drugForm.brand_name} onChange={e => setDrugForm(p => ({ ...p, brand_name: e.target.value }))} className={inputClass} /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Generic Name *</label>
                  <input value={drugForm.generic_name} onChange={e => setDrugForm(p => ({ ...p, generic_name: e.target.value }))} className={inputClass} /></div>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-gray-700">Biosimilar?</label>
                <button onClick={() => setDrugForm(p => ({ ...p, is_biosimilar: !p.is_biosimilar }))} className="text-gray-600">
                  {drugForm.is_biosimilar ? <ToggleRight className="w-6 h-6 text-[#ff5e00]" /> : <ToggleLeft className="w-6 h-6" />}
                </button>
              </div>
              {drugForm.is_biosimilar && (
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Reference Drug</label>
                  <select value={drugForm.reference_drug_id} onChange={e => setDrugForm(p => ({ ...p, reference_drug_id: e.target.value }))} className={inputClass}>
                    <option value="">None</option>
                    {brandDrugs.map(d => <option key={d.id} value={d.id}>{d.brand_name}</option>)}
                  </select>
                </div>
              )}
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Disease Associations</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {activeDiseases.map(d => {
                    const selected = drugForm.disease_ids.includes(d.id);
                    return (
                      <button key={d.id} onClick={() => setDrugForm(p => ({
                        ...p, disease_ids: selected ? p.disease_ids.filter(x => x !== d.id) : [...p.disease_ids, d.id]
                      }))} className={`px-2 py-1 rounded text-xs font-medium border ${selected ? "bg-[#ff5e00]/10 border-[#ff5e00] text-[#ff5e00]" : "border-gray-300 text-gray-500"}`}>
                        {d.name}
                      </button>
                    );
                  })}
                  {activeDiseases.length === 0 && <span className="text-xs text-gray-400">Add diseases first</span>}
                </div>
              </div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Scripts per Member per Month *</label>
                <input type="number" step="0.001" value={drugForm.scripts_per_member_month} onChange={e => setDrugForm(p => ({ ...p, scripts_per_member_month: e.target.value }))} className={inputClass} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-xs font-medium text-gray-700 mb-1">WAC/Retail</label>
                  <input type="number" step="0.01" value={drugForm.wac_price} onChange={e => setDrugForm(p => ({ ...p, wac_price: e.target.value }))} className={inputClass} placeholder="$" /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">Avg PBM Post-Rebate</label>
                  <input type="number" step="0.01" value={drugForm.avg_pbm_post_rebate} onChange={e => setDrugForm(p => ({ ...p, avg_pbm_post_rebate: e.target.value }))} className={inputClass} placeholder="$" /></div>
                <div><label className="block text-xs font-medium text-gray-700 mb-1">ApalyRx Net *</label>
                  <input type="number" step="0.01" value={drugForm.apalyrx_net_price} onChange={e => setDrugForm(p => ({ ...p, apalyrx_net_price: e.target.value }))} className={inputClass} placeholder="$" /></div>
              </div>
              {feePreview !== null && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                  <span className="text-blue-700 font-medium">Est. Admin Fee (Standard):</span>{" "}
                  <span className="text-blue-900 font-bold">${feePreview.toFixed(2)}</span>
                </div>
              )}
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select value={drugForm.status} onChange={e => setDrugForm(p => ({ ...p, status: e.target.value }))} className={inputClass}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-4">
              <button onClick={() => setShowDrugModal(false)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
              <button onClick={saveDrug} disabled={drugSaving || !drugForm.ndc || !drugForm.brand_name || !drugForm.generic_name || !drugForm.apalyrx_net_price}
                className="px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-medium hover:bg-[#ff5e00]/90 disabled:opacity-50">
                {drugSaving ? "Saving..." : editingDrug ? "Save Changes" : "Add Drug"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DISEASE MODAL ═══ */}
      {showDiseaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#102a4c]">{editingDisease ? "Edit Disease" : "Add Disease"}</h3>
              <button onClick={() => setShowDiseaseModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            {diseaseError && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-4">{diseaseError}</div>}
            <div className="space-y-3">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Disease Name *</label>
                <input value={diseaseForm.name} onChange={e => setDiseaseForm(p => ({ ...p, name: e.target.value }))} className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Prevalence per 1,000 *</label>
                <input type="number" step="0.0001" value={diseaseForm.prevalence_per_1000} onChange={e => setDiseaseForm(p => ({ ...p, prevalence_per_1000: e.target.value }))} className={inputClass} /></div>
            </div>
            <div className="flex gap-3 justify-end mt-4">
              <button onClick={() => setShowDiseaseModal(false)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
              <button onClick={saveDisease} disabled={diseaseSaving || !diseaseForm.name || !diseaseForm.prevalence_per_1000}
                className="px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-medium hover:bg-[#ff5e00]/90 disabled:opacity-50">
                {diseaseSaving ? "Saving..." : editingDisease ? "Save Changes" : "Add Disease"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ FEE SCHEDULE CREATE MODAL ═══ */}
      {showFsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#102a4c]">Create Fee Schedule</h3>
              <button onClick={() => setShowFsModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            {fsError && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-4">{fsError}</div>}
            <div className="space-y-3">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                <input value={fsForm.name} onChange={e => setFsForm(p => ({ ...p, name: e.target.value }))} className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <input value={fsForm.description} onChange={e => setFsForm(p => ({ ...p, description: e.target.value }))} className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Clone from existing</label>
                <select value={fsForm.clone_from_id} onChange={e => setFsForm(p => ({ ...p, clone_from_id: e.target.value }))} className={inputClass}>
                  <option value="">Start empty</option>
                  {feeSchedules.filter(f => f.status === "active").map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-4">
              <button onClick={() => setShowFsModal(false)} className="px-4 py-2 text-sm text-gray-600">Cancel</button>
              <button onClick={createFeeSchedule} disabled={fsSaving || !fsForm.name}
                className="px-4 py-2 bg-[#ff5e00] text-white rounded-lg text-sm font-medium hover:bg-[#ff5e00]/90 disabled:opacity-50">
                {fsSaving ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
