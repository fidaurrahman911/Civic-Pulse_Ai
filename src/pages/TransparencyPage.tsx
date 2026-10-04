import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { SEED_TRANSPARENCY_KPIS, SEED_MONTHLY_TREND } from '../data/seedData';
import { DemoAiBadge } from '../components/civic/DemoAiBadge';
import { formatNumber } from '../lib/format';
import {
  BarChart3,
  TrendingUp,
  Table as TableIcon,
  CheckCircle2,
  Clock,
  Building2,
  ShieldCheck
} from 'lucide-react';

interface TransparencyPageProps {
  navigate: (path: string) => void;
}

export const TransparencyPage: React.FC<TransparencyPageProps> = ({ navigate }) => {
  const { departments, complaints } = useCivicStore();
  const [viewMode, setViewMode] = useState<'visual' | 'table'>('visual');

  const kpis = SEED_TRANSPARENCY_KPIS;
  const trend = SEED_MONTHLY_TREND;

  // Compute category distribution from store complaints
  const catMap: Record<string, number> = {};
  complaints.forEach((c) => {
    catMap[c.category] = (catMap[c.category] || 0) + 1;
  });
  const categoriesList = Object.entries(catMap).map(([category, count]) => ({
    category,
    count,
  }));

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8E6]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
            Public Civic Accountability Desk
          </span>
          <h1 className="text-2xl font-bold text-[#0F1B2D] mt-1">
            District Civic Transparency Dashboard
          </h1>
          <p className="text-xs text-[#4B5A6B] mt-0.5">
            Transparent public audit of municipal response times, complaint resolution metrics, and citizen project completion rates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DemoAiBadge />
          {/* Toggle View Mode (Section 8.8: Data table alternative) */}
          <div className="flex rounded-[6px] border border-[#E3E8E6] p-0.5 bg-[#F6F8F7] text-xs">
            <button
              onClick={() => setViewMode('visual')}
              className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors ${
                viewMode === 'visual'
                  ? 'bg-white text-[#0F1B2D] shadow-2xs font-semibold'
                  : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
              }`}
            >
              Visual Analytics
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-[#0F1B2D] shadow-2xs font-semibold'
                  : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
              }`}
            >
              Data Tables
            </button>
          </div>
        </div>
      </div>

      {/* KPIS GRID (Section 8.8) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] text-[#4B5A6B] block">Projects Reported</span>
          <span className="text-xl font-bold font-tabular text-[#0F1B2D] mt-1 block">
            {formatNumber(kpis.projectsReported)}
          </span>
          <span className="text-[10px] text-[#4B5A6B]">Demo data</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] text-[#4B5A6B] block">Projects Completed</span>
          <span className="text-xl font-bold font-tabular text-[#1F6B43] mt-1 block">
            {formatNumber(kpis.projectsCompleted)}
          </span>
          <span className="text-[10px] text-[#174F32] font-semibold">82% Verified</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] text-[#4B5A6B] block">Projects Pending</span>
          <span className="text-xl font-bold font-tabular text-[#B7791F] mt-1 block">
            {formatNumber(kpis.projectsPending)}
          </span>
          <span className="text-[10px] text-[#8B5B16]">Underway</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] text-[#4B5A6B] block">Total Complaints</span>
          <span className="text-xl font-bold font-tabular text-[#0F1B2D] mt-1 block">
            {formatNumber(kpis.complaintsTotal)}
          </span>
          <span className="text-[10px] text-[#4B5A6B]">Citizen submissions</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] text-[#4B5A6B] block">Complaints Resolved</span>
          <span className="text-xl font-bold font-tabular text-[#1F6B43] mt-1 block">
            {formatNumber(kpis.complaintsResolved)}
          </span>
          <span className="text-[10px] text-[#174F32] font-semibold">Audit verified</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] text-[#4B5A6B] block">Complaints Pending</span>
          <span className="text-xl font-bold font-tabular text-[#B7791F] mt-1 block">
            {formatNumber(kpis.complaintsPending)}
          </span>
          <span className="text-[10px] text-[#8B5B16]">Dispatch queue</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[11px] text-[#4B5A6B] block">Avg Resolution Time</span>
          <span className="text-xl font-bold font-tabular text-[#1F5FA8] mt-1 block">
            {kpis.averageResolutionDays} Days
          </span>
          <span className="text-[10px] text-[#1F5FA8] font-semibold">Tehsil standard</span>
        </div>
      </div>

      {/* SECTION 1: 12-MONTH REPORTED VS RESOLVED TREND */}
      <div className="p-6 rounded-lg bg-white border border-[#E3E8E6] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D]">
              12-Month Municipal Complaint Resolution Efficiency
            </h3>
            <p className="text-xs text-[#4B5A6B] mt-0.5">
              Comparison between incoming citizen complaint filings and completed engineering resolutions.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#1F6B43] flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> 78.8% Overall District Clearance
          </span>
        </div>

        {viewMode === 'visual' ? (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 h-48 items-end pt-6 border-b border-[#E3E8E6]">
              {trend.map((t, idx) => {
                const maxVal = 135;
                const reportedHeight = Math.round((t.reported / maxVal) * 100);
                const resolvedHeight = Math.round((t.resolved / maxVal) * 100);

                return (
                  <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      {/* Reported Bar */}
                      <div
                        style={{ height: `${reportedHeight}%` }}
                        className="w-2.5 sm:w-3.5 bg-[#4B5A6B]/30 hover:bg-[#4B5A6B] rounded-t transition-all"
                        title={`Reported: ${t.reported}`}
                      />
                      {/* Resolved Bar */}
                      <div
                        style={{ height: `${resolvedHeight}%` }}
                        className="w-2.5 sm:w-3.5 bg-[#1F6B43] hover:bg-[#174F32] rounded-t transition-all"
                        title={`Resolved: ${t.resolved}`}
                      />
                    </div>
                    <span className="text-[10px] text-[#4B5A6B] font-tabular truncate w-full text-center">
                      {t.month.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-6 text-xs text-[#4B5A6B]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#4B5A6B]/40" />
                <span>Monthly Complaints Reported</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#1F6B43]" />
                <span>Verified Field Resolutions</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left divide-y divide-[#E3E8E6]">
              <thead className="bg-[#F6F8F7] text-[10px] uppercase font-bold text-[#4B5A6B]">
                <tr>
                  <th className="px-3 py-2">Month</th>
                  <th className="px-3 py-2">Reported Hazards</th>
                  <th className="px-3 py-2">Verified Resolutions</th>
                  <th className="px-3 py-2">Resolution Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8E6]">
                {trend.map((t, idx) => (
                  <tr key={idx} className="hover:bg-[#F6F8F7]">
                    <td className="px-3 py-2 font-medium text-[#0F1B2D]">{t.month}</td>
                    <td className="px-3 py-2 font-tabular">{t.reported}</td>
                    <td className="px-3 py-2 font-tabular text-[#1F6B43] font-semibold">{t.resolved}</td>
                    <td className="px-3 py-2 font-tabular">
                      {Math.round((t.resolved / t.reported) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 2: CATEGORY & DEPARTMENT BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="p-6 rounded-lg bg-white border border-[#E3E8E6] shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D]">
            Complaints by Infrastructure Category
          </h3>

          <div className="space-y-3 pt-2">
            {categoriesList.map((cat) => {
              const pct = Math.round((cat.count / complaints.length) * 100);
              return (
                <div key={cat.category} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#0F1B2D]">{cat.category}</span>
                    <span className="font-tabular text-[#4B5A6B]">
                      {cat.count} cases ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#E3E8E6] rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-full bg-[#1F5FA8] rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Resolution Times */}
        <div className="p-6 rounded-lg bg-white border border-[#E3E8E6] shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D]">
            Department Response & Average Days
          </h3>

          <div className="divide-y divide-[#E3E8E6] text-xs">
            {departments.map((dept) => {
              const deptComplaints = complaints.filter((c) => c.departmentId === dept.id);
              const resolvedCount = deptComplaints.filter((c) => c.status === 'resolved').length;

              return (
                <div key={dept.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#0F1B2D]">{dept.name}</h4>
                    <p className="text-[11px] text-[#4B5A6B]">
                      {deptComplaints.length} active assignments • {resolvedCount} completed
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-tabular text-[#0F1B2D] block">
                      3.8 Days
                    </span>
                    <span className="text-[10px] text-[#1F6B43]">Avg closure</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
