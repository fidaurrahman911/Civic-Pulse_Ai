import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { civicAi } from '../lib/ai';
import { ComplaintSeverity, EvidenceItem, ComplaintAnalysis } from '../types';
import { REGIONAL_IMAGES } from '../data/images';
import { DemoAiBadge } from '../components/civic/DemoAiBadge';
import { ConfidenceMeter } from '../components/civic/ConfidenceMeter';
import {
  AlertTriangle,
  Sparkles,
  Upload,
  MapPin,
  CheckCircle2,
  Copy,
  ArrowRight,
  ShieldAlert,
  Building2,
  FileCheck,
  X
} from 'lucide-react';

interface ReportProblemPageProps {
  navigate: (path: string) => void;
}

export const ReportProblemPage: React.FC<ReportProblemPageProps> = ({ navigate }) => {
  const { submitComplaint, departments } = useCivicStore();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Infrastructure');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('Drosh Main Bazaar Link Road');
  const [departmentPref, setDepartmentPref] = useState('auto'); // auto or specific dept
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);

  // Workflow: 'form' | 'analyzing' | 'success'
  const [stage, setStage] = useState<'form' | 'analyzing' | 'success'>('form');
  const [stepLabel, setStepLabel] = useState('Auditing complaint metadata...');
  const [aiAnalysis, setAiAnalysis] = useState<ComplaintAnalysis | null>(null);
  const [createdComplaintId, setCreatedComplaintId] = useState<string | null>(null);
  const [createdTrackingId, setCreatedTrackingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = [
    'Infrastructure',
    'Sanitation',
    'Health',
    'Education',
    'Environment',
    'Public Safety',
    'Utilities',
    'Other',
  ];

  // Quick Demo Helper for Journey B
  const handleFillExample = () => {
    setTitle('Broken Road and Deep Potholes Near Main Bazaar');
    setCategory('Infrastructure');
    setDescription(
      'Deep potholes and asphalt breakdown on the main bazaar link road causing severe vehicle traffic congestion and dust hazards. Commercial trucks and passenger rickshaws frequently get damaged.'
    );
    setLocationName('Drosh Main Bazaar Link Road (GPS: 35.5630, 71.7950)');
    setDepartmentPref('auto');
    setEvidenceList([
      {
        id: `ev-comp-${Date.now()}`,
        kind: 'photo',
        name: 'drosh_potholes_before.jpg',
        sizeKb: 2150,
        url: REGIONAL_IMAGES.droshRoadRepairBefore.src,
        hash: 'hash_road_potholes_01',
      },
    ]);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setEvidenceList((prev) => [
          ...prev,
          {
            id: `ev-${Date.now()}`,
            kind: 'photo',
            name: file.name,
            sizeKb: Math.round(file.size / 1024),
            url: dataUrl,
            hash: `hash_${file.name}_${file.size}`,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const finalEvidence =
      evidenceList.length > 0
        ? evidenceList
        : [
            {
              id: `ev-${Date.now()}`,
              kind: 'photo' as const,
              name: 'broken_road_evidence.jpg',
              sizeKb: 2150,
              url: REGIONAL_IMAGES.droshRoadRepairBefore.src,
              hash: 'hash_comp_road_01',
            },
          ];

    setStage('analyzing');

    try {
      // Step 1: AI Complaint Analysis
      const analysis = await civicAi.analyzeComplaint(
        {
          title,
          category,
          description,
          locationName,
          evidence: finalEvidence,
        },
        (_, label) => setStepLabel(label)
      );

      setAiAnalysis(analysis);

      // Step 2: Determine department and severity
      const selectedDeptId =
        departmentPref !== 'auto' ? departmentPref : analysis.recommendedDepartmentId;

      // Step 3: Commit Complaint to store
      const complaint = submitComplaint({
        title,
        category: analysis.category,
        subcategory: analysis.subcategory,
        description,
        locationName,
        coordinates: { lat: 35.5630, lng: 71.7950 },
        evidence: finalEvidence,
        severity: analysis.severity,
        departmentId: selectedDeptId,
      });

      setCreatedComplaintId(complaint.id);
      setCreatedTrackingId(complaint.trackingId);
      setStage('success');
    } catch (err) {
      console.error(err);
      setStage('form');
    }
  };

  const copyTrackingId = () => {
    if (createdTrackingId) {
      navigator.clipboard.writeText(createdTrackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E6] mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5A6B]">
            Civic Accountability • Journey B
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F1B2D] mt-0.5">
            Report a Civic Problem
          </h1>
        </div>

        <button
          type="button"
          onClick={handleFillExample}
          className="px-2.5 py-1.5 rounded-[6px] text-xs font-semibold bg-[#E8F2EC] text-[#174F32] hover:bg-[#d5e7dc] border border-[#1F6B43]/30 transition-colors flex items-center gap-1.5"
          title="Auto-fill with Drosh Road Damage example"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#1F6B43]" />
          <span>Fill Demo Example</span>
        </button>
      </div>

      {/* FORM STAGE */}
      {stage === 'form' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informational banner */}
          <div className="p-3.5 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] text-xs text-[#4B5A6B] flex items-center justify-between">
            <p>
              Your report generates a unique tracking ID and is routed through automated AI severity classification before department assignment.
            </p>
            <DemoAiBadge />
          </div>

          {/* Problem Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Problem Title <span className="text-[#B3261E]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken Road Near Main Bazaar"
              className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] focus:outline-none focus:border-[#1F6B43] text-sm text-[#0F1B2D] bg-white shadow-xs"
            />
          </div>

          {/* Category & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                Category <span className="text-[#B3261E]">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] focus:outline-none focus:border-[#1F6B43] text-sm text-[#0F1B2D] bg-white shadow-xs"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                Responsible Department
              </label>
              <select
                value={departmentPref}
                onChange={(e) => setDepartmentPref(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] focus:outline-none focus:border-[#1F6B43] text-sm text-[#0F1B2D] bg-white shadow-xs"
              >
                <option value="auto">✨ Not sure, let AI suggest</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Specific Location / Landmark <span className="text-[#B3261E]">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#4B5A6B]" />
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. Drosh Main Bazaar Link Road"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] focus:outline-none focus:border-[#1F6B43] text-sm text-[#0F1B2D] bg-white shadow-xs"
              />
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Description of Hazard / Defect <span className="text-[#B3261E]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the nature of the issue, severity, duration, and impact on local residents..."
              className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] focus:outline-none focus:border-[#1F6B43] text-sm text-[#0F1B2D] bg-white shadow-xs"
            />
          </div>

          {/* Visual Evidence Uploader */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Attach Photographic Evidence
            </label>
            <div className="border-2 border-dashed border-[#E3E8E6] hover:border-[#1F6B43] rounded-lg p-5 text-center bg-[#F6F8F7]/50">
              <Upload className="w-7 h-7 text-[#4B5A6B] mx-auto mb-1.5" />
              <p className="text-xs font-medium text-[#0F1B2D]">
                Upload clear photos showing the scale of the defect
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleSimulateUpload}
                className="mt-2 text-xs text-[#4B5A6B] file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#1F6B43] file:text-white cursor-pointer"
              />
            </div>

            {evidenceList.length > 0 && (
              <div className="mt-3 flex gap-2">
                {evidenceList.map((ev) => (
                  <div
                    key={ev.id}
                    className="relative w-24 h-24 rounded border border-[#E3E8E6] overflow-hidden"
                  >
                    <img src={ev.url} alt={ev.name} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setEvidenceList([])}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#E3E8E6] flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-xs font-medium text-[#4B5A6B] hover:text-[#0F1B2D]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-[6px] text-sm font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-xs transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      )}

      {/* ANALYZING STAGE */}
      {stage === 'analyzing' && (
        <div className="p-8 rounded-lg border border-[#E3E8E6] bg-white text-center shadow-xs space-y-5 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-[#E6EFF9] text-[#1F5FA8] flex items-center justify-center mx-auto animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F1B2D]">AI Complaint Analysis</h3>
            <p className="text-xs text-[#4B5A6B] mt-1">{stepLabel}</p>
          </div>
          <div className="max-w-xs mx-auto text-xs text-[#4B5A6B] space-y-1 text-left">
            <p className="flex items-center gap-1.5">✓ Visual hazard detection</p>
            <p className="flex items-center gap-1.5">✓ Severity level indexing</p>
            <p className="flex items-center gap-1.5">✓ Departmental jurisdiction routing</p>
          </div>
          <DemoAiBadge />
        </div>
      )}

      {/* SUCCESS STAGE */}
      {stage === 'success' && aiAnalysis && createdTrackingId && (
        <div className="space-y-6 animate-in fade-in">
          {/* Success Hero Card */}
          <div className="p-6 rounded-lg bg-white border border-[#E3E8E6] shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E8F2EC] text-[#1F6B43] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6B43]">
                  Report Registered Successfully
                </span>
                <h2 className="text-lg font-bold text-[#0F1B2D] mt-0.5">
                  Complaint Filed in Municipal Dispatch Queue
                </h2>
                <p className="text-xs text-[#4B5A6B] mt-1">
                  Your report has been logged and assigned an immutable tracking identification.
                </p>

                {/* Tracking ID Callout */}
                <div className="mt-4 p-3.5 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#4B5A6B]">
                      Official Tracking ID
                    </span>
                    <div className="text-xl font-bold font-tabular text-[#0F1B2D]">
                      {createdTrackingId}
                    </div>
                  </div>

                  <button
                    onClick={copyTrackingId}
                    className="px-3 py-1.5 rounded-[6px] text-xs font-semibold bg-white border border-[#E3E8E6] hover:bg-[#E3E8E6] text-[#0F1B2D] flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy Tracking ID'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* AI Classification Summary Card */}
            <div className="mt-6 pt-5 border-t border-[#E3E8E6]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#1F5FA8]" />
                  AI Automated Triaging Summary
                </h4>
                <DemoAiBadge />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs bg-[#F6F8F7] p-3.5 rounded-lg border border-[#E3E8E6]">
                <div>
                  <span className="text-[#4B5A6B] block text-[11px]">Identified Category</span>
                  <span className="font-semibold text-[#0F1B2D]">{aiAnalysis.category}</span>
                </div>
                <div>
                  <span className="text-[#4B5A6B] block text-[11px]">Subcategory</span>
                  <span className="font-semibold text-[#0F1B2D]">{aiAnalysis.subcategory}</span>
                </div>
                <div>
                  <span className="text-[#4B5A6B] block text-[11px]">Priority Severity</span>
                  <span className="font-semibold text-[#B7791F] uppercase">{aiAnalysis.severity}</span>
                </div>
                <div>
                  <span className="text-[#4B5A6B] block text-[11px]">Recommended Dept</span>
                  <span className="font-semibold text-[#1F5FA8]">{aiAnalysis.recommendedDepartmentName}</span>
                </div>
                <div>
                  <span className="text-[#4B5A6B] block text-[11px]">Civic Impact Score</span>
                  <span className="font-semibold text-[#1F6B43]">{aiAnalysis.civicImpactScore || 75}/100</span>
                </div>
                <div>
                  <span className="text-[#4B5A6B] block text-[11px]">Model Confidence</span>
                  <span className="font-semibold text-[#0F1B2D]">{aiAnalysis.confidence}%</span>
                </div>
              </div>

              <p className="text-xs text-[#4B5A6B] mt-2.5">
                {aiAnalysis.summary}
              </p>
            </div>

            {/* SMS / Email Confirmation Preview */}
            <div className="mt-4 p-3 rounded-[6px] bg-[#E8F2EC]/50 border border-[#1F6B43]/20 text-xs text-[#174F32]">
              <span className="font-semibold block">📱 SMS & Email Notification Sent:</span>
              <p className="mt-0.5 text-[11px]">
                "CivicPulse: Complaint {createdTrackingId} registered for {locationName}. Triaged to {aiAnalysis.recommendedDepartmentName}. Track live status at civicpulse.pk/complaints/{createdTrackingId}"
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6]">
            <button
              onClick={() => navigate(`/complaints/${createdTrackingId}`)}
              className="px-4 py-2.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] text-white hover:bg-[#174F32] flex items-center gap-1.5"
            >
              <span>Track Complaint Lifecycle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigate('/admin/complaints')}
              className="px-4 py-2 rounded-[6px] text-xs font-medium text-[#1F5FA8] bg-white border border-[#E3E8E6] hover:bg-[#E3E8E6]"
            >
              View in Admin Dispatch Desk →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
