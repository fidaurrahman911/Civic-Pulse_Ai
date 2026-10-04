import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { StatusBadge } from '../components/civic/StatusBadge';
import { SeverityBadge } from '../components/civic/SeverityBadge';
import { Avatar } from '../components/civic/Avatar';
import { formatDate, formatTimeAgo } from '../lib/format';
import { Search, Filter, AlertTriangle, ArrowUpDown, ChevronRight } from 'lucide-react';

interface AdminComplaintsPageProps {
  navigate: (path: string) => void;
}

export const AdminComplaintsPage: React.FC<AdminComplaintsPageProps> = ({ navigate }) => {
  const { complaints } = useCivicStore();
  const [filterTab, setFilterTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Cases', count: complaints.length },
    { id: 'pending', label: 'Pending', count: complaints.filter((c) => c.status === 'submitted' || c.status === 'under_review').length },
    { id: 'assigned', label: 'Assigned', count: complaints.filter((c) => c.status === 'assigned').length },
    { id: 'in_progress', label: 'In Progress', count: complaints.filter((c) => c.status === 'in_progress').length },
    { id: 'resolved', label: 'Resolved', count: complaints.filter((c) => c.status === 'resolved').length },
    { id: 'critical', label: 'High / Critical', count: complaints.filter((c) => c.severity === 'high' || c.severity === 'critical' || c.isEmergency).length },
  ];

  const filtered = complaints.filter((c) => {
    if (filterTab === 'pending' && c.status !== 'submitted' && c.status !== 'under_review') return false;
    if (filterTab === 'assigned' && c.status !== 'assigned') return false;
    if (filterTab === 'in_progress' && c.status !== 'in_progress') return false;
    if (filterTab === 'resolved' && c.status !== 'resolved') return false;
    if (filterTab === 'critical' && c.severity !== 'high' && c.severity !== 'critical' && !c.isEmergency) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.trackingId.toLowerCase().includes(q) ||
        c.citizenName.toLowerCase().includes(q) ||
        c.locationName.toLowerCase().includes(q) ||
        c.departmentName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8E6]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F5FA8] bg-[#E6EFF9] px-2 py-0.5 rounded">
            Municipal Case Management
          </span>
          <h1 className="text-2xl font-bold text-[#0F1B2D] mt-1">
            Complaints & Dispatch Work Orders
          </h1>
          <p className="text-xs text-[#4B5A6B] mt-0.5">
            Audit, reassign, update status, and perform before/after resolution verification.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/map')}
          className="px-3.5 py-2 rounded-[6px] text-xs font-semibold bg-white border border-[#E3E8E6] text-[#0F1B2D] hover:bg-[#F6F8F7]"
        >
          View on Heatmap
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-[#E3E8E6] pb-2 text-xs">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`px-3 py-1.5 rounded-[6px] font-medium transition-colors ${
                filterTab === tab.id
                  ? 'bg-[#0F1B2D] text-white font-semibold shadow-2xs'
                  : 'bg-[#F6F8F7] text-[#4B5A6B] hover:bg-[#E3E8E6]'
              }`}
            >
              {tab.label} <span className="font-tabular ml-1 opacity-80 font-bold">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#4B5A6B] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, citizen, road, or department..."
            className="w-full pl-9 pr-3.5 py-2 rounded-[6px] border border-[#E3E8E6] text-xs text-[#0F1B2D] bg-white focus:outline-none focus:border-[#1F6B43]"
          />
        </div>
      </div>

      {/* Complaints Data Table */}
      <div className="bg-white rounded-lg border border-[#E3E8E6] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-[#E3E8E6]">
            <thead className="bg-[#F6F8F7] text-[#4B5A6B] font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Tracking ID</th>
                <th className="px-4 py-3">Citizen</th>
                <th className="px-4 py-3">Issue Title & Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E6] text-[#0F1B2D]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-[#4B5A6B]">
                    <AlertTriangle className="w-6 h-6 text-[#B7791F] mx-auto mb-1.5" />
                    <p className="font-semibold text-[#0F1B2D]">No complaints match current filters</p>
                    <button
                      onClick={() => {
                        setFilterTab('all');
                        setSearchQuery('');
                      }}
                      className="mt-2 text-xs font-semibold text-[#1F6B43] hover:underline"
                    >
                      Clear Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map((comp) => (
                  <tr
                    key={comp.id}
                    onClick={() => navigate(`/admin/complaints/${comp.id}`)}
                    className="hover:bg-[#F6F8F7] cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-bold font-tabular whitespace-nowrap text-[#0F1B2D]">
                      {comp.trackingId}
                      {comp.isEmergency && (
                        <span className="block text-[9px] font-bold text-[#B3261E] uppercase">
                          Emergency
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Avatar name={comp.citizenName} size="xs" />
                        <span className="font-medium text-[#0F1B2D] truncate max-w-[120px]">
                          {comp.citizenName}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 max-w-[240px]">
                      <p className="font-semibold truncate text-[#0F1B2D]">{comp.title}</p>
                      <p className="text-[10px] text-[#4B5A6B] truncate">{comp.category}</p>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap text-[#4B5A6B]">
                      {comp.locationName}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <SeverityBadge severity={comp.severity} isEmergency={comp.isEmergency} />
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap font-medium text-[#1F5FA8]">
                      {comp.departmentName}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={comp.status} />
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap text-right font-semibold text-[#1F6B43]">
                      <span className="inline-flex items-center gap-1">
                        Review <ChevronRight className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
