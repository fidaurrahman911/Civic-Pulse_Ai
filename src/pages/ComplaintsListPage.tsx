import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { StatusBadge } from '../components/civic/StatusBadge';
import { SeverityBadge } from '../components/civic/SeverityBadge';
import { formatDateTime, formatTimeAgo } from '../lib/format';
import { PlusCircle, Search, Filter, AlertCircle, ArrowRight } from 'lucide-react';

interface ComplaintsListPageProps {
  navigate: (path: string) => void;
}

export const ComplaintsListPage: React.FC<ComplaintsListPageProps> = ({ navigate }) => {
  const { complaints } = useCivicStore();
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lookupId, setLookupId] = useState('');

  const filtered = complaints.filter((c) => {
    if (filterStatus === 'active' && c.status === 'resolved') return false;
    if (filterStatus === 'resolved' && c.status !== 'resolved') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.trackingId.toLowerCase().includes(q) ||
        c.locationName.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupId.trim()) {
      navigate(`/complaints/${lookupId.trim()}`);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8E6]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5A6B]">
            Civic Accountability Directory
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F1B2D] mt-0.5">
            Public Complaints & Tracking
          </h1>
          <p className="text-xs text-[#4B5A6B] mt-1">
            Track reported municipal hazards across Lower Chitral from submission to verified resolution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/report')}
            className="px-4 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report a Problem</span>
          </button>
        </div>
      </div>

      {/* Lookup Bar & Filter Row */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3.5 rounded-lg border border-[#E3E8E6] shadow-2xs">
        {/* Quick Tracking ID direct jump */}
        <form onSubmit={handleLookup} className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
            placeholder="Enter Tracking ID (e.g. CP-2026-008420)"
            className="text-xs px-3 py-1.5 rounded-[6px] border border-[#E3E8E6] focus:border-[#1F6B43] focus:outline-none w-full sm:w-64"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-[6px] text-xs font-semibold bg-[#0F1B2D] text-white shrink-0 hover:bg-[#1F2B3E]"
          >
            Track
          </button>
        </form>

        {/* Search & Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#4B5A6B] absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search complaints..."
              className="text-xs pl-8 pr-3 py-1.5 rounded-[6px] border border-[#E3E8E6] focus:border-[#1F6B43] focus:outline-none w-full"
            />
          </div>

          <div className="flex rounded-[6px] border border-[#E3E8E6] p-0.5 bg-[#F6F8F7] text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-[4px] font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-white text-[#0F1B2D] shadow-2xs font-semibold'
                  : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
              }`}
            >
              All ({complaints.length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-3 py-1 rounded-[4px] font-medium transition-colors ${
                filterStatus === 'active'
                  ? 'bg-white text-[#0F1B2D] shadow-2xs font-semibold'
                  : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
              }`}
            >
              Pending / In Progress ({complaints.filter((c) => c.status !== 'resolved').length})
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              className={`px-3 py-1 rounded-[4px] font-medium transition-colors ${
                filterStatus === 'resolved'
                  ? 'bg-white text-[#0F1B2D] shadow-2xs font-semibold'
                  : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
              }`}
            >
              Resolved ({complaints.filter((c) => c.status === 'resolved').length})
            </button>
          </div>
        </div>
      </div>

      {/* Complaints List Table / Grid */}
      <div className="mt-6 divide-y divide-[#E3E8E6] bg-white rounded-lg border border-[#E3E8E6] overflow-hidden shadow-xs">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#4B5A6B]">
            <AlertCircle className="w-8 h-8 text-[#B7791F] mx-auto mb-2" />
            <p className="font-semibold text-[#0F1B2D]">No complaints found</p>
            <p className="mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          filtered.map((comp) => (
            <div
              key={comp.id}
              onClick={() => navigate(`/complaints/${comp.trackingId}`)}
              className="p-4 hover:bg-[#F6F8F7] cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold font-tabular text-[#0F1B2D]">
                    {comp.trackingId}
                  </span>
                  <StatusBadge status={comp.status} />
                  <SeverityBadge severity={comp.severity} isEmergency={comp.isEmergency} />
                  <span className="text-[#4B5A6B] font-medium">• {comp.category}</span>
                </div>

                <h3 className="text-sm font-semibold text-[#0F1B2D] leading-snug">
                  {comp.title}
                </h3>

                <p className="text-[#4B5A6B] line-clamp-1">
                  {comp.description}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[#4B5A6B] pt-0.5">
                  <span>📍 {comp.locationName}</span>
                  <span>🏛️ {comp.departmentName}</span>
                  <span>🕒 {formatTimeAgo(comp.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className="text-xs font-semibold text-[#1F6B43] flex items-center gap-1">
                  Track Progress <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
