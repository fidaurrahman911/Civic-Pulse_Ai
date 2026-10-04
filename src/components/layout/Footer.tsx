import React from 'react';
import { useCivicStore } from '../../store/useCivicStore';
import { Shield, Sparkles, RotateCcw } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { resetDemoData, openAdminAuthModal } = useCivicStore();

  return (
    <footer className="w-full bg-[#F6F8F7] border-t border-[#E3E8E6] mt-20 pt-12 pb-24 md:pb-12 text-xs text-[#4B5A6B]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#E3E8E6]">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-[4px] bg-[#1F6B43] flex items-center justify-center text-white font-bold text-xs">
                CP
              </div>
              <span className="font-bold text-sm tracking-tight text-[#0F1B2D]">
                CivicPulse <span className="text-[#1F6B43]">AI</span>
              </span>
            </div>
            <p className="text-xs text-[#4B5A6B] max-w-md leading-relaxed">
              Designed as a civic technology platform for citizens and administration.
              A digital accountability layer connecting verified community impact with transparent municipal problem resolution in Khyber Pakhtunkhwa.
            </p>
            <p className="text-[11px] font-medium text-[#174F32] bg-[#E8F2EC] inline-block px-2.5 py-1 rounded border border-[#1F6B43]/20">
              Tagline: Do Good. Prove It. Get Recognized. Improve Your Community.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#0F1B2D] block mb-3">
              Civic Platform
            </span>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate('/discover')} className="hover:text-[#0F1B2D]">
                  Discover Activities
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/leaderboard')} className="hover:text-[#0F1B2D]">
                  District Leaderboard
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/map')} className="hover:text-[#0F1B2D]">
                  Civic Map & Heatmap
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/opportunities')} className="hover:text-[#0F1B2D]">
                  Volunteer Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/transparency')} className="hover:text-[#0F1B2D]">
                  Public District Transparency
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Civic Tools & Transparency */}
          <div>
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#0F1B2D] block mb-3">
              Civic Tools & Resources
            </span>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate('/transparency')} className="hover:text-[#0F1B2D]">
                  District Transparency & KPIs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/map')} className="hover:text-[#0F1B2D]">
                  Public GIS Heatmap
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/report')} className="hover:text-[#0F1B2D]">
                  Citizen Grievance Submission
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/report/emergency')} className="text-[#8A1D17] hover:underline font-medium">
                  Emergency Disaster Dispatch
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => {
                    if (confirm('Reset all demo data back to initial state?')) {
                      resetDemoData();
                      window.location.reload();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#B3261E] hover:underline font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Demo State
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Subtle Administrative Portal Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#4B5A6B]">
          <p>
            © 2026 CivicPulse AI. Designed for citizens, youth volunteers, and transparent municipal accountability.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Lower Chitral & Tehsil Drosh</span>
            <span className="border-l border-[#E3E8E6] pl-4">
              Official Access:{' '}
              <button
                type="button"
                onClick={() => openAdminAuthModal()}
                className="text-[#4B5A6B] hover:text-[#0F1B2D] underline font-medium cursor-pointer"
              >
                Administrative Portal
              </button>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
