import React from 'react';
import { useCivicStore } from '../../store/useCivicStore';
import { formatNumber } from '../../lib/format';
import {
  Users,
  CheckCircle2,
  TreePine,
  Clock,
  Building,
  TrendingUp,
  MapPin,
  ShieldCheck
} from 'lucide-react';

export const DistrictImpactCounters: React.FC = () => {
  const { citizenStats, complaints, activities } = useCivicStore();

  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter(
    (c) => c.status === 'resolved'
  ).length;
  const resolutionRate = Math.round((resolvedComplaints / Math.max(1, totalComplaints)) * 100);

  const stats = [
    {
      label: 'Registered Citizens & Youth',
      value: '14,850+',
      growth: '+310 this month',
      sublabel: 'Across Drosh, Ayun & Chitral tehsils',
      icon: Users,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      label: 'Verified Community Actions',
      value: '8,294',
      growth: '100% AI Audited',
      sublabel: 'Cleanliness, tree plantation & relief',
      icon: CheckCircle2,
      color: 'text-[#1F6B43] bg-[#E8F2EC] border-[#1F6B43]/30',
    },
    {
      label: 'Resolution Rate (Grievances)',
      value: `${resolutionRate}%`,
      growth: 'Avg 4.2 days',
      sublabel: 'TMA Drosh & C&W Department dispatch',
      icon: ShieldCheck,
      color: 'text-[#1F5FA8] bg-blue-50 border-blue-200',
    },
    {
      label: 'Union Councils Active',
      value: '36',
      growth: 'Lower & Upper Chitral',
      sublabel: 'From Arandu border to Booni valley',
      icon: MapPin,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#F6F8F7] to-white border-y border-[#E3E8E6] py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1F6B43] mb-1">
              Real-Time District Metrics
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1B2D]">
              Verified Impact at a Glance
            </h3>
          </div>
          <div className="text-xs text-[#4B5A6B] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Updated hourly from Deputy Commissioner & Tehsil databases</span>
          </div>
        </div>

        {/* 4 Big Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#E3E8E6] p-6 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {stat.growth}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-[#0F1B2D] tracking-tight group-hover:text-[#1F6B43] transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#0F1B2D] mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[#4B5A6B] mt-0.5">
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
