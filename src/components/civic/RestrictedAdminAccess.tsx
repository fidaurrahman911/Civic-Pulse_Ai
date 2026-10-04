import React from 'react';
import { useCivicStore } from '../../store/useCivicStore';
import { Lock, ShieldAlert, ArrowLeft, ShieldCheck, Users } from 'lucide-react';

interface RestrictedAdminAccessProps {
  navigate: (path: string) => void;
}

export const RestrictedAdminAccess: React.FC<RestrictedAdminAccessProps> = ({ navigate }) => {
  const { openAdminAuthModal } = useCivicStore();

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6 animate-in fade-in">
      <div className="w-16 h-16 rounded-full bg-[#FCEBEA] text-[#B3261E] flex items-center justify-center mx-auto border-2 border-[#B3261E]/40">
        <Lock className="w-8 h-8 text-[#B3261E]" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#B3261E] bg-[#FCEBEA] px-2.5 py-0.5 rounded">
          Access Restricted
        </span>
        <h1 className="text-2xl font-bold text-[#0F1B2D]">
          District Administration Desk Only
        </h1>
        <p className="text-xs text-[#4B5A6B] max-w-md mx-auto leading-relaxed">
          This section contains municipal dispatch systems, work order assignments, and resolution audits. Citizen and volunteer accounts do not possess administrative clearance.
        </p>
      </div>

      <div className="p-4 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] text-xs text-[#4B5A6B] text-left space-y-2">
        <span className="font-semibold text-[#0F1B2D] block">
          Authorized Municipal Personnel Only:
        </span>
        <p className="text-[11px] leading-relaxed">
          If you are an authorized officer from the Deputy Commissioner Office, C&W, or TMA Lower Chitral, please verify your official administrative clearance.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => openAdminAuthModal()}
          className="px-5 py-2.5 rounded-[6px] text-xs font-semibold bg-[#0F1B2D] hover:bg-[#1F2B3E] text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verify Official DC Authorization</span>
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="px-5 py-2.5 rounded-[6px] text-xs font-semibold bg-white border border-[#E3E8E6] hover:bg-[#F6F8F7] text-[#0F1B2D] flex items-center gap-1.5"
        >
          <Users className="w-4 h-4 text-[#1F6B43]" />
          <span>Return to Citizen Dashboard</span>
        </button>
      </div>
    </div>
  );
};
