import React from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { CivicMap } from '../components/map/CivicMap';
import { Layers, ShieldAlert, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

interface AdminMapPageProps {
  navigate: (path: string) => void;
  isAdmin?: boolean;
}

export const AdminMapPage: React.FC<AdminMapPageProps> = ({ navigate, isAdmin = false }) => {
  const { complaints, activities, locations } = useCivicStore();

  const handleSelectComplaint = (comp: any) => {
    if (isAdmin) {
      navigate(`/admin/complaints/${comp.id}`);
    } else {
      navigate(`/complaints/${comp.trackingId}`);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8E6]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
            {isAdmin ? 'District Administration Heatmap' : 'Public Civic Geographic Map'}
          </span>
          <h1 className="text-2xl font-bold text-[#0F1B2D] mt-1">
            Chitral & Drosh Civic Activity & Incident Heatmap
          </h1>
          <p className="text-xs text-[#4B5A6B] mt-0.5">
            Geographic distribution of community volunteer efforts, open municipal complaints, and emergency road blockages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin ? (
            <button
              onClick={() => navigate('/admin')}
              className="px-3 py-1.5 rounded-[6px] text-xs font-semibold bg-white border border-[#E3E8E6] text-[#0F1B2D]"
            >
              Back to District Overview
            </button>
          ) : (
            <button
              onClick={() => navigate('/report')}
              className="px-3.5 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] text-white"
            >
              Report a Problem on Map
            </button>
          )}
        </div>
      </div>

      {/* Map Component */}
      <CivicMap
        complaints={complaints}
        activities={activities}
        locations={locations}
        onSelectComplaint={handleSelectComplaint}
        height="560px"
      />

      {/* Legend & Guide */}
      <div className="p-4 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] text-xs">
        <h4 className="font-bold text-[#0F1B2D] uppercase tracking-wider text-[11px] mb-2">
          Map Legend & Severity Semantics
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-[#4B5A6B]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#1F6B43] border border-white shrink-0" />
            <span>Green: Verified Citizen Activity / Resolved Work</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#B7791F] border border-white shrink-0" />
            <span>Yellow: Moderate Pending Civic Complaint</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#B3261E] border border-white shrink-0" />
            <span>Red: High Priority Municipal Hazard</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-[#B3261E] border border-white shrink-0" />
            <span>Red Square (⚠): Active Emergency Disaster Pinned</span>
          </div>
        </div>
      </div>
    </div>
  );
};
