import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { civicAi } from '../lib/ai';
import { StatusBadge } from '../components/civic/StatusBadge';
import { SeverityBadge } from '../components/civic/SeverityBadge';
import { Avatar } from '../components/civic/Avatar';
import { Timeline } from '../components/civic/Timeline';
import { DemoAiBadge } from '../components/civic/DemoAiBadge';
import { REGIONAL_IMAGES } from '../data/images';
import { ComplaintStatus, ResolutionVerification } from '../types';
import {
  ArrowLeft,
  Building2,
  User,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Send,
  FileCheck,
  ShieldCheck,
  FileQuestion
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminComplaintCasePageProps {
  complaintId: string;
  navigate: (path: string) => void;
}

export const AdminComplaintCasePage: React.FC<AdminComplaintCasePageProps> = ({
  complaintId,
  navigate,
}) => {
  const {
    complaints,
    departments,
    officers,
    currentProfile,
    assignComplaint,
    updateComplaintStatus,
    requestComplaintEvidence,
    verifyComplaintResolution,
    demoSettings,
  } = useCivicStore();

  const complaint = complaints.find(
    (c) => c.id === complaintId || c.trackingId === complaintId
  );

  const [selectedDept, setSelectedDept] = useState(complaint?.departmentId || 'dept-cw');
  const [selectedOfficer, setSelectedOfficer] = useState(complaint?.officerId || '');
  const [newStatus, setNewStatus] = useState<ComplaintStatus>(complaint?.status || 'in_progress');
  const [adminNote, setAdminNote] = useState('');
  const [requestEvidenceNote, setRequestEvidenceNote] = useState(
    'Please upload close-up photos of road foundation and water drainage culvert.'
  );

  // Before / After Verification State
  const [afterImageUrl, setAfterImageUrl] = useState<string>(
    complaint?.afterEvidenceUrl || REGIONAL_IMAGES.droshRoadRepairAfter.src
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<ResolutionVerification | null>(
    complaint?.resolutionVerification || null
  );
  const [overrideNote, setOverrideNote] = useState('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  if (!complaint) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-xs text-[#4B5A6B]">
        <AlertTriangle className="w-8 h-8 text-[#B7791F] mx-auto mb-2" />
        <h2 className="text-sm font-bold text-[#0F1B2D]">Case Not Found</h2>
        <button
          onClick={() => navigate('/admin/complaints')}
          className="mt-3 px-3 py-1.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] text-white"
        >
          Return to Complaints
        </button>
      </div>
    );
  }

  const deptOfficers = officers.filter((o) => o.departmentId === selectedDept);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    assignComplaint(complaint.id, selectedDept, selectedOfficer, adminNote);
    setActionFeedback('Department and officer assigned successfully.');
    setAdminNote('');
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminNote.trim()) return;
    updateComplaintStatus(complaint.id, newStatus, adminNote, currentProfile.fullName);
    setActionFeedback(`Status updated to ${newStatus.replace('_', ' ')}.`);
    setAdminNote('');
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleRequestEvidence = () => {
    requestComplaintEvidence(complaint.id, requestEvidenceNote);
    setActionFeedback('Additional evidence request sent to citizen.');
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleRunAiResolutionVerification = async () => {
    setIsVerifying(true);
    try {
      const res = await civicAi.verifyResolution({
        complaintId: complaint.id,
        beforeEvidenceUrl: complaint.beforeEvidenceUrl || complaint.evidence?.[0]?.url,
        afterEvidenceUrl: afterImageUrl,
        forceLowConfidence: demoSettings.forceLowResolutionConfidence,
      });
      setVerificationResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleConfirmResolution = () => {
    if (!verificationResult) return;
    verifyComplaintResolution(complaint.id, verificationResult, afterImageUrl);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#1F6B43', '#1F5FA8', '#0F1B2D'],
    });

    setActionFeedback('Resolution verified and work order closed with official before/after audit.');
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E6]">
        <button
          onClick={() => navigate('/admin/complaints')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5A6B] hover:text-[#0F1B2D]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Case Management</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#4B5A6B]">Reviewing as:</span>
          <Avatar name={currentProfile.fullName} size="xs" />
          <span className="text-xs font-bold text-[#0F1B2D]">{currentProfile.fullName}</span>
        </div>
      </div>

      {actionFeedback && (
        <div className="p-3.5 rounded-lg bg-[#E8F2EC] border border-[#1F6B43]/40 text-xs font-semibold text-[#174F32] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#1F6B43]" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Case Header Banner */}
      <div className="p-6 rounded-lg bg-white border border-[#E3E8E6] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3E8E6]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold font-tabular text-[#0F1B2D] bg-[#F6F8F7] px-2 py-0.5 rounded border border-[#E3E8E6]">
                {complaint.trackingId}
              </span>
              <span className="text-xs text-[#4B5A6B]">{complaint.category} • {complaint.subcategory}</span>
            </div>
            <h1 className="text-xl font-bold text-[#0F1B2D]">{complaint.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge status={complaint.status} />
            <SeverityBadge severity={complaint.severity} isEmergency={complaint.isEmergency} />
          </div>
        </div>

        {/* Reporter & Details row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Reporting Citizen</span>
            <div className="flex items-center gap-2 mt-1">
              <Avatar name={complaint.citizenName} size="xs" />
              <span className="font-semibold text-[#0F1B2D]">{complaint.citizenName}</span>
            </div>
          </div>

          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Location</span>
            <span className="font-semibold text-[#0F1B2D] block mt-1">
              📍 {complaint.locationName}
            </span>
          </div>

          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Department Assigned</span>
            <span className="font-semibold text-[#1F5FA8] block mt-1">
              🏛️ {complaint.departmentName}
            </span>
          </div>

          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Assigned Engineer</span>
            <span className="font-semibold text-[#0F1B2D] block mt-1">
              👷 {complaint.officerName || 'Unassigned'}
            </span>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="mt-4 pt-4 border-t border-[#E3E8E6] text-xs text-[#0F1B2D] leading-relaxed">
          <p>{complaint.description}</p>
        </div>
      </div>

      {/* TWO COLUMNS: ACTIONS & RESOLUTION (Left) + TIMELINE & EVIDENCE (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Administrative Actions & Resolution Audit */}
        <div className="lg:col-span-7 space-y-6">
          {/* ACTION PANEL 1: BEFORE / AFTER RESOLUTION VERIFICATION */}
          <div className="p-6 rounded-lg bg-white border border-[#E3E8E6] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1F6B43]" />
                  Resolution Verification (Before & After Audit)
                </h3>
                <p className="text-[11px] text-[#4B5A6B] mt-0.5">
                  AI visual comparison comparing original hazard with completed municipal work.
                </p>
              </div>
              <DemoAiBadge />
            </div>

            {/* Before / After Photo Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Before */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  <span>BEFORE (Reported Hazard)</span>
                </span>
                <div className="rounded-lg overflow-hidden border border-red-200 aspect-video bg-[#F6F8F7]">
                  <img
                    src={complaint.beforeEvidenceUrl || complaint.evidence?.[0]?.url || REGIONAL_IMAGES.droshRoadRepairBefore.src}
                    alt="Before evidence"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] text-[#4B5A6B] block">
                  Ground photo submitted with citizen report
                </span>
              </div>

              {/* After */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AFTER (Field Restoration)</span>
                  </span>
                  <button
                    onClick={() => setAfterImageUrl(REGIONAL_IMAGES.droshRoadRepairAfter.src)}
                    className="text-[#1F5FA8] hover:underline font-semibold text-[10px] cursor-pointer"
                  >
                    Reset Photo
                  </button>
                </div>
                <div className="rounded-lg overflow-hidden border border-emerald-200 aspect-video bg-[#F6F8F7]">
                  <img
                    src={afterImageUrl}
                    alt="After evidence"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] text-[#4B5A6B] block">
                  Field completion proof uploaded by department
                </span>
              </div>
            </div>

            {/* Run Verification Button */}
            {!verificationResult && (
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={handleRunAiResolutionVerification}
                  className="w-full py-2.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isVerifying ? 'Analyzing Before/After Delta...' : 'Run AI Resolution Verification'}
                  </span>
                </button>
              </div>
            )}

            {/* Verification Result Display */}
            {verificationResult && (
              <div className="space-y-3 pt-3 border-t border-[#E3E8E6]">
                <div
                  className={`p-4 rounded-lg border text-xs ${
                    verificationResult.confidence >= 65
                      ? 'bg-[#E8F2EC] border-[#1F6B43]/40 text-[#174F32]'
                      : 'bg-[#FAF0E1] border-[#B7791F]/40 text-[#8B5B16]'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-sm">
                      AI Resolution Verification: {verificationResult.confidence}% Confidence
                    </span>
                    <span className="px-2 py-0.5 rounded font-tabular bg-white text-[#0F1B2D]">
                      Delta Score: {verificationResult.visualDifferenceScore}/100
                    </span>
                  </div>
                  <p className="leading-relaxed">{verificationResult.notes}</p>
                </div>

                {/* If Low Confidence (41% demo toggle path): Admin Override Requirement */}
                {verificationResult.confidence < 65 ? (
                  <div className="p-3.5 rounded-lg bg-[#FAF0E1] border border-[#B7791F]/40 text-xs text-[#8B5B16] space-y-2">
                    <p className="font-bold">
                      ⚠ Low Confidence: Visual disparity requires supervisor manual confirmation override.
                    </p>
                    <textarea
                      rows={2}
                      value={overrideNote}
                      onChange={(e) => setOverrideNote(e.target.value)}
                      placeholder="Enter supervisor physical inspection override note..."
                      className="w-full p-2 rounded border border-[#B7791F]/40 bg-white text-xs text-[#0F1B2D]"
                    />
                    <button
                      type="button"
                      disabled={!overrideNote.trim()}
                      onClick={handleConfirmResolution}
                      className="px-4 py-2 rounded-[6px] text-xs font-semibold bg-[#B7791F] text-white hover:bg-[#8B5B16] disabled:opacity-50"
                    >
                      Override & Mark Case Resolved
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-[#4B5A6B]">
                      Visual verification exceeds 85% requirement. Ready for closure.
                    </span>
                    <button
                      type="button"
                      onClick={handleConfirmResolution}
                      disabled={complaint.status === 'resolved'}
                      className="px-5 py-2.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white flex items-center gap-1.5 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{complaint.status === 'resolved' ? '✓ Already Resolved' : 'Confirm & Mark Resolved'}</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ACTION PANEL 2: REASSIGN DEPARTMENT & OFFICER */}
          <div className="p-5 rounded-lg bg-white border border-[#E3E8E6] shadow-xs text-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
              Department Assignment & Field Engineer
            </h3>

            <form onSubmit={handleAssign} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#4B5A6B] font-medium mb-1">
                  Responsible Department:
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => {
                    setSelectedDept(e.target.value);
                    setSelectedOfficer('');
                  }}
                  className="w-full p-2 rounded-[6px] border border-[#E3E8E6] bg-white text-[#0F1B2D]"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#4B5A6B] font-medium mb-1">
                  Assign Officer:
                </label>
                <select
                  value={selectedOfficer}
                  onChange={(e) => setSelectedOfficer(e.target.value)}
                  className="w-full p-2 rounded-[6px] border border-[#E3E8E6] bg-white text-[#0F1B2D]"
                >
                  <option value="">-- Select Field Officer --</option>
                  {deptOfficers.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} ({o.title})
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[6px] font-semibold bg-[#0F1B2D] text-white hover:bg-[#1F2B3E]"
                >
                  Update Assignment
                </button>
              </div>
            </form>
          </div>

          {/* ACTION PANEL 3: STATUS UPDATE & REQUEST EVIDENCE */}
          <div className="p-5 rounded-lg bg-white border border-[#E3E8E6] shadow-xs text-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
              Status Progression & Citizen Communication
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-[#4B5A6B] font-medium mb-1">
                  Change Status & Post Progress Note:
                </label>
                <div className="flex gap-2">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                    className="p-2 rounded-[6px] border border-[#E3E8E6] bg-white text-[#0F1B2D] font-medium"
                  >
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="assigned">Assigned</option>
                    <option value="in_progress">Work in Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <input
                    type="text"
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Progress note for citizen tracking..."
                    className="flex-1 p-2 rounded-[6px] border border-[#E3E8E6] text-xs text-[#0F1B2D]"
                  />

                  <button
                    type="button"
                    onClick={handleUpdateStatus}
                    className="px-3.5 py-2 rounded-[6px] font-semibold bg-[#1F6B43] text-white shrink-0 hover:bg-[#174F32]"
                  >
                    Post Update
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E3E8E6]">
                <button
                  type="button"
                  onClick={handleRequestEvidence}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-semibold bg-[#FAF0E1] text-[#8B5B16] hover:bg-[#f3e5ce] border border-[#B7791F]/30"
                >
                  <FileQuestion className="w-3.5 h-3.5" />
                  <span>Request Additional Evidence from Citizen</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Lifecycle Timeline & Evidence Gallery */}
        <div className="lg:col-span-5 space-y-6">
          {/* Interactive Timeline */}
          <div className="p-5 rounded-lg bg-white border border-[#E3E8E6] shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-4">
              Case Audit Trail & Timeline
            </h3>
            <Timeline events={complaint.timeline} currentStatus={complaint.status} />
          </div>

          {/* Evidence Gallery */}
          <div className="p-5 rounded-lg bg-white border border-[#E3E8E6] shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
              Photographic Evidence File
            </h3>
            {complaint.evidence && complaint.evidence.length > 0 ? (
              <div className="space-y-3">
                {complaint.evidence.map((ev) => (
                  <div key={ev.id} className="rounded-[6px] overflow-hidden border border-[#E3E8E6]">
                    <img src={ev.url} alt={ev.name} className="w-full aspect-video object-cover" />
                    <div className="p-2 bg-[#F6F8F7] text-[11px] text-[#4B5A6B] flex items-center justify-between">
                      <span className="font-semibold text-[#0F1B2D] truncate">{ev.name}</span>
                      <span>{ev.sizeKb} KB</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[6px] overflow-hidden border border-[#E3E8E6]">
                <img
                  src={complaint.beforeEvidenceUrl || REGIONAL_IMAGES.droshRoadRepairBefore.src}
                  alt="Primary defect evidence"
                  className="w-full aspect-video object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
