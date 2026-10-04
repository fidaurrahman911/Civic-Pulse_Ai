import React from 'react';
import { Megaphone, ArrowRight, ShieldCheck, Flame, Bell } from 'lucide-react';

interface AnnouncementTickerProps {
  navigate: (path: string) => void;
}

export const AnnouncementTicker: React.FC<AnnouncementTickerProps> = ({ navigate }) => {
  return (
    <div className="bg-[#0F1B2D] text-white border-b border-slate-800 text-xs py-2.5 px-4 sm:px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1F6B43] text-white font-bold text-[11px] shrink-0 tracking-wide uppercase">
            <Bell className="w-3.5 h-3.5" />
            <span>District Notice</span>
          </div>

          <div className="text-slate-300 font-medium truncate text-xs">
            <span className="text-emerald-400 font-semibold">Drosh Spring Campaign:</span> 850+ saplings verified this week. Deputy Commissioner Office invites youth volunteers for the Tehsil Advisory Board.
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 self-end md:self-auto text-[11px] text-slate-400">
          <button
            onClick={() => navigate('/transparency')}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-semibold"
          >
            <span>Live Resolution Stats</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => navigate('/report/emergency')}
            className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-bold"
          >
            <span>Emergency Hazard Desk</span>
          </button>
        </div>
      </div>
    </div>
  );
};
