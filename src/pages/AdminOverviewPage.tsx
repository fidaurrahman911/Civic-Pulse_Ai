import React from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { StatusBadge } from '../components/civic/StatusBadge';
import { SeverityBadge } from '../components/civic/SeverityBadge';
import { DemoAiBadge } from '../components/civic/DemoAiBadge';
import { DistrictAssistant } from '../components/ai/DistrictAssistant';
import { formatNumber, formatTimeAgo } from '../lib/format';
import {
  Users,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface AdminOverviewPageProps {
  navigate: (path: string) => void;
}

export const AdminOverviewPage: React.FC<AdminOverviewPageProps> = ({ navigate }) => {
  const { complaints, aiInsight } = useCivicStore();

  const totalComplaints = 1247;
  const resolvedComplaints = 983 + (complaints.filter((c) => c.status === 'resolved').length - 3);
  const pendingComplaints = totalComplaints - resolvedComplaints;

  const emergencyComplaints = complaints.filter((c) => c.isEmergency);
  const recentComplaints = complaints.slice(0, 8);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8E6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F5FA8] bg-[#E6EFF9] px-2 py-0.5 rounded">
              Administration Portal
            </span>
            <span className="text-[11px] text-[#4B5A6B]">Lower Chitral District Desk</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F1B2D] mt-1">
            District Civic Administration Overview
          </h1>
          <p className="text-xs text-[#4B5A6B] mt-0.5">
            Operational dashboard tracking municipal dispatch pipelines, verified community impact, and field resolution audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/admin/complaints')}
            className="px-3.5 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] text-white hover:bg-[#174F32] transition-colors shadow-xs"
          >
            Manage Complaint Cases
          </button>
          <button
            onClick={() => navigate('/admin/map')}
            className="px-3.5 py-2 rounded-[6px] text-xs font-semibold bg-white border border-[#E3E8E6] text-[#0F1B2D] hover:bg-[#F6F8F7]"
          >
            View Civic Heatmap
          </button>
        </div>
      </div>

      {/* STATS STRIP (Section 10.1 figures) */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] font-medium text-[#4B5A6B] block">Registered Citizens</span>
          <span className="text-xl font-bold font-tabular text-[#0F1B2D] mt-1 block">
            {formatNumber(18492)}
          </span>
          <span className="text-[10px] text-[#4B5A6B] block mt-0.5">Demo data</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] font-medium text-[#4B5A6B] block">Active Volunteers</span>
          <span className="text-xl font-bold font-tabular text-[#1F6B43] mt-1 block">
            {formatNumber(3821)}
          </span>
          <span className="text-[10px] text-[#4B5A6B] block mt-0.5">Tehsils Lower Chitral</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] font-medium text-[#4B5A6B] block">Verified Activities</span>
          <span className="text-xl font-bold font-tabular text-[#0F1B2D] mt-1 block">
            {formatNumber(8294)}
          </span>
          <span className="text-[10px] text-[#4B5A6B] block mt-0.5">Audit complete</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] font-medium text-[#4B5A6B] block">Problems Reported</span>
          <span className="text-xl font-bold font-tabular text-[#0F1B2D] mt-1 block">
            {formatNumber(totalComplaints)}
          </span>
          <span className="text-[10px] text-[#4B5A6B] block mt-0.5">Total caseload</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] font-medium text-[#4B5A6B] block">Resolved Work Orders</span>
          <span className="text-xl font-bold font-tabular text-[#1F6B43] mt-1 block">
            {formatNumber(resolvedComplaints)}
          </span>
          <span className="text-[10px] text-[#174F32] font-semibold block mt-0.5">
            {Math.round((resolvedComplaints / totalComplaints) * 100)}% resolution rate
          </span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] font-medium text-[#4B5A6B] block">Pending Attention</span>
          <span className="text-xl font-bold font-tabular text-[#B7791F] mt-1 block">
            {formatNumber(pendingComplaints)}
          </span>
          <span className="text-[10px] text-[#8B5B16] font-semibold block mt-0.5">Active backlog</span>
        </div>
      </div>

      {/* AI DISTRICT INSIGHT PANEL (Section 10.1) */}
      <div className="p-5 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#1F5FA8]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
              Automated AI District Operations Insight
            </h3>
          </div>
          <DemoAiBadge customText="AI-generated demo insight, not live government data" />
        </div>

        <p className="text-sm font-semibold text-[#0F1B2D] leading-relaxed">
          "{aiInsight.text}"
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E3E8E6] text-xs text-[#4B5A6B]">
          <span className="text-[11px]">
            <strong>Basis:</strong> {aiInsight.basis}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#0F1B2D]">Pinned Hotspots:</span>
            {aiInsight.locations.map((loc) => (
              <button
                key={loc}
                onClick={() => navigate('/admin/map')}
                className="text-[11px] font-medium text-[#1F5FA8] hover:underline flex items-center gap-0.5"
              >
                <MapPin className="w-3 h-3" />
                <span>{loc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* EMERGENCY REPORTS STRIP (Pinned Above Normal Caseload, Red Only Here) */}
      {emergencyComplaints.length > 0 && (
        <div className="p-5 rounded-lg bg-[#FCEBEA] border-2 border-[#B3261E] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#B3261E]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8A1D17]">
                Active Emergency Hazards ({emergencyComplaints.length} Immediate Dispatch Pinned)
              </h3>
            </div>
            <span className="text-xs font-bold text-white bg-[#B3261E] px-2 py-0.5 rounded">
              High Priority Dispatch
            </span>
          </div>

          <div className="divide-y divide-[#B3261E]/20">
            {emergencyComplaints.map((em) => (
              <div
                key={em.id}
                onClick={() => navigate(`/admin/complaints/${em.id}`)}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer hover:bg-white/40 p-2 rounded transition-colors text-xs text-[#8A1D17]"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-tabular">{em.trackingId}</span>
                    <span className="font-semibold">{em.title}</span>
                  </div>
                  <p className="text-[11px] text-[#8A1D17]/80 mt-0.5">
                    📍 {em.locationName} • Dispatched to {em.departmentName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs bg-white text-[#B3261E] px-2 py-0.5 rounded border border-[#B3261E]/30">
                    Open Case File →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TWO COLUMN GRID: RECENT COMPLAINTS TABLE & AI DISTRICT ASSISTANT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Complaints (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E6]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D]">
              Recent Municipal Complaints Queue
            </h3>
            <button
              onClick={() => navigate('/admin/complaints')}
              className="text-xs font-semibold text-[#1F5FA8] hover:underline flex items-center gap-1"
            >
              <span>View All ({complaints.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-[#E3E8E6] bg-white rounded-lg border border-[#E3E8E6] overflow-hidden shadow-xs text-xs">
            {recentComplaints.map((comp) => (
              <div
                key={comp.id}
                onClick={() => navigate(`/admin/complaints/${comp.id}`)}
                className="p-3.5 hover:bg-[#F6F8F7] cursor-pointer transition-colors flex items-center justify-between gap-3"
              >
                <div className="truncate space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-tabular text-[#0F1B2D]">
                      {comp.trackingId}
                    </span>
                    <StatusBadge status={comp.status} />
                    <SeverityBadge severity={comp.severity} isEmergency={comp.isEmergency} />
                  </div>
                  <p className="font-semibold text-[#0F1B2D] truncate">{comp.title}</p>
                  <p className="text-[11px] text-[#4B5A6B] truncate">
                    📍 {comp.locationName} • {comp.departmentName}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-[#4B5A6B] block">
                    {formatTimeAgo(comp.createdAt)}
                  </span>
                  <span className="text-xs font-medium text-[#1F5FA8]">Case File →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Embedded AI District Assistant (5 cols) */}
        <div className="lg:col-span-5">
          <DistrictAssistant />
        </div>
      </div>
    </div>
  );
};
