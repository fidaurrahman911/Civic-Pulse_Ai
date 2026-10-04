import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { StatusBadge } from '../components/civic/StatusBadge';
import { SeverityBadge } from '../components/civic/SeverityBadge';
import { Timeline } from '../components/civic/Timeline';
import { DemoAiBadge } from '../components/civic/DemoAiBadge';
import { formatDateTime, formatDate } from '../lib/format';
import { REGIONAL_IMAGES } from '../data/images';
import {
  MapPin,
  Building2,
  Calendar,
  User,
  ArrowLeft,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Upload,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface ComplaintDetailPageProps {
  trackingId: string;
  navigate: (path: string) => void;
}

export const ComplaintDetailPage: React.FC<ComplaintDetailPageProps> = ({
  trackingId,
  navigate,
}) => {
  const { complaints, updateComplaintStatus } = useCivicStore();
  const [copied, setCopied] = useState(false);
  const [extraEvidenceUploaded, setExtraEvidenceUploaded] = useState(false);

  const complaint = complaints.find(
    (c) => c.trackingId === trackingId || c.id === trackingId
  );

  if (!complaint) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-xs text-[#4B5A6B]">
        <AlertTriangle className="w-10 h-10 text-[#B7791F] mx-auto mb-3" />
        <h2 className="text-base font-bold text-[#0F1B2D]">Complaint Record Not Found</h2>
        <p className="mt-1">
          No record matches tracking reference <strong>"{trackingId}"</strong>.
        </p>
        <button
          onClick={() => navigate('/complaints')}
          className="mt-4 px-4 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] text-white"
        >
          View All Complaints
        </button>
      </div>
    );
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(complaint.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProvideEvidence = () => {
    updateComplaintStatus(
      complaint.id,
      'under_review',
      'Citizen submitted additional photographic verification requested by field inspector.'
    );
    setExtraEvidenceUploaded(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/complaints')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5A6B] hover:text-[#0F1B2D]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Complaint Directory</span>
        </button>
      </div>

      {/* Case Header Card */}
      <div className="p-6 rounded-lg bg-white border border-[#E3E8E6] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3E8E6]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold font-tabular text-[#0F1B2D] bg-[#F6F8F7] px-2.5 py-1 rounded border border-[#E3E8E6]">
                {complaint.trackingId}
              </span>
              <button
                onClick={handleCopyId}
                className="text-[11px] text-[#4B5A6B] hover:text-[#0F1B2D] flex items-center gap-1"
                title="Copy tracking reference"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <h1 className="text-xl font-bold text-[#0F1B2D] leading-snug">
              {complaint.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={complaint.status} />
            <SeverityBadge severity={complaint.severity} isEmergency={complaint.isEmergency} />
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Location</span>
            <span className="font-semibold text-[#0F1B2D] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#1F6B43]" />
              {complaint.locationName}
            </span>
          </div>

          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Responsible Department</span>
            <span className="font-semibold text-[#0F1B2D] flex items-center gap-1 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-[#1F5FA8]" />
              {complaint.departmentName}
            </span>
          </div>

          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Assigned Officer</span>
            <span className="font-semibold text-[#0F1B2D] flex items-center gap-1 mt-0.5">
              <User className="w-3.5 h-3.5 text-[#4B5A6B]" />
              {complaint.officerName || 'Awaiting Officer Dispatch'}
            </span>
          </div>

          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Date Registered</span>
            <span className="font-semibold text-[#0F1B2D] flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-[#4B5A6B]" />
              {formatDate(complaint.createdAt)}
            </span>
          </div>
        </div>

        {/* Detailed Narrative */}
        <div className="mt-4 pt-4 border-t border-[#E3E8E6] text-xs text-[#0F1B2D] leading-relaxed">
          <p>{complaint.description}</p>
        </div>
      </div>

      {/* Needs Evidence Notice (if in needs_evidence status) */}
      {complaint.status === 'needs_evidence' && !extraEvidenceUploaded && (
        <div className="p-4 rounded-lg bg-[#FAF0E1] border border-[#B7791F]/40 text-xs text-[#8B5B16] space-y-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-[#B7791F] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold">Additional Evidence Requested by Department Inspector</h4>
              <p className="mt-0.5">
                The assigned engineer has requested additional clear photographs or landmark markers to verify road base conditions before dispatching equipment.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleProvideEvidence}
              className="px-3.5 py-1.5 rounded-[6px] font-semibold bg-[#B7791F] text-white hover:bg-[#8B5B16] flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Supplementary Photos (Simulate)</span>
            </button>
          </div>
        </div>
      )}

      {/* BEFORE & AFTER EVIDENCE PANELS (If Resolved) */}
      {(complaint.status === 'resolved' || complaint.afterEvidenceUrl) && (
        <div className="p-6 rounded-lg bg-white border border-[#E3E8E6] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1F6B43]" />
              Verified Resolution Comparison
            </h3>
            <DemoAiBadge />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before */}
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-xs font-bold text-red-800 uppercase tracking-wider bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  <span>BEFORE (Reported Defect)</span>
                </span>
              </div>
              <div className="rounded-lg overflow-hidden border border-red-200 aspect-video bg-[#F6F8F7]">
                <img
                  src={complaint.beforeEvidenceUrl || complaint.evidence?.[0]?.url || REGIONAL_IMAGES.droshRoadRepairBefore.src}
                  alt="Before repair"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* After */}
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AFTER (Verified Work Completed)</span>
                </span>
              </div>
              <div className="rounded-lg overflow-hidden border border-emerald-200 aspect-video bg-[#F6F8F7]">
                <img
                  src={complaint.afterEvidenceUrl || REGIONAL_IMAGES.droshRoadRepairAfter.src}
                  alt="After restoration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* AI Resolution Verification Callout */}
          <div className="p-4 rounded-lg bg-[#E8F2EC] border border-[#1F6B43]/30 text-xs text-[#174F32] flex items-center justify-between">
            <div>
              <span className="font-bold text-sm block">
                AI Resolution Verification: 87% Match
              </span>
              <p className="mt-0.5">
                Visual comparison indicates substantial change between submitted before and after evidence. Defect cleared and verified.
              </p>
            </div>
            <span className="font-bold text-lg font-tabular px-2.5 py-1 bg-white rounded border border-[#1F6B43]/30 text-[#1F6B43]">
              ✓ Verified
            </span>
          </div>
        </div>
      )}

      {/* Lifecycle Progress Timeline */}
      <div className="p-6 rounded-lg bg-white border border-[#E3E8E6] shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] mb-4">
          Lifecycle Progression & Audit Trail
        </h3>
        <Timeline events={complaint.timeline} currentStatus={complaint.status} />
      </div>

      {/* Admin Quick Link */}
      <div className="p-4 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] flex items-center justify-between text-xs">
        <span className="text-[#4B5A6B]">
          Are you a municipal engineer or district administrator?
        </span>
        <button
          onClick={() => navigate(`/admin/complaints`)}
          className="font-semibold text-[#1F5FA8] hover:underline flex items-center gap-1"
        >
          <span>Open Administration Case Desk</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
