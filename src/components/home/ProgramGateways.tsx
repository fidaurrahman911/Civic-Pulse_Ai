import React from 'react';
import { useCivicStore } from '../../store/useCivicStore';
import {
  Users,
  AlertTriangle,
  MapPin,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  FileText
} from 'lucide-react';

interface ProgramGatewaysProps {
  navigate: (path: string) => void;
}

export const ProgramGateways: React.FC<ProgramGatewaysProps> = ({ navigate }) => {
  const { currentUser } = useCivicStore();
  const isAdmin = currentUser.role === 'admin';

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/20 text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#1F6B43]" />
          <span>Core Civic Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1B2D] tracking-tight">
          One Unified Platform for All of <span className="text-[#1F6B43]">Chitral</span>
        </h2>
        <p className="text-sm sm:text-base text-[#4B5A6B] leading-relaxed">
          Designed after Pakistan’s modern empowerment portals: giving citizens a voice, recognizing youth volunteers, and providing district authorities with verified municipal telemetry.
        </p>
      </div>

      {/* 4 Cards Grid with Bano Qabil-like visual weight and bold hover accents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Citizen & Volunteer Empowerment */}
        <div className="group relative rounded-xl border border-[#E3E8E6] bg-white p-6 shadow-sm hover:shadow-xl hover:border-[#1F6B43] transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#E8F2EC] text-[#1F6B43] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6B43]">
                Pillar 01 · Youth & Citizens
              </span>
              <h3 className="text-lg font-bold text-[#0F1B2D] group-hover:text-[#1F6B43] transition-colors">
                Citizen Volunteer Network
              </h3>
              <p className="text-xs text-[#4B5A6B] leading-relaxed">
                Log community service, tree plantations, and emergency relief. Earn verified Civic Points, reputation tiers, and digital certificates.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-[#4B5A6B] pt-2 border-t border-[#E3E8E6]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F6B43] shrink-0" />
                <span>AI Photo Evidence Verification</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F6B43] shrink-0" />
                <span>Tehsil Drosh & Chitral Leaderboards</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-4 border-t border-[#E3E8E6]">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-2.5 px-4 rounded-lg bg-[#F6F8F7] group-hover:bg-[#1F6B43] text-[#0F1B2D] group-hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Access Citizen Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: Public Grievance Redressal (CMS) */}
        <div className="group relative rounded-xl border border-[#E3E8E6] bg-white p-6 shadow-sm hover:shadow-xl hover:border-[#1F5FA8] transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#1F5FA8] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F5FA8]">
                Pillar 02 · Grievance Redressal
              </span>
              <h3 className="text-lg font-bold text-[#0F1B2D] group-hover:text-[#1F5FA8] transition-colors">
                Problem & Repair Reporting
              </h3>
              <p className="text-xs text-[#4B5A6B] leading-relaxed">
                Report broken roads, sewage leaks, or water line breaches. Automatic department dispatch with sequential tracking IDs (e.g. CP-2026-008421).
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-[#4B5A6B] pt-2 border-t border-[#E3E8E6]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5FA8] shrink-0" />
                <span>Before & After Restoration Audit</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5FA8] shrink-0" />
                <span>Direct SLA & Department Escalation</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-4 border-t border-[#E3E8E6]">
            <button
              onClick={() => navigate('/report')}
              className="w-full py-2.5 px-4 rounded-lg bg-[#F6F8F7] group-hover:bg-[#1F5FA8] text-[#0F1B2D] group-hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Problem Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 3: Tehsil Geographic GIS */}
        <div className="group relative rounded-xl border border-[#E3E8E6] bg-white p-6 shadow-sm hover:shadow-xl hover:border-emerald-600 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Pillar 03 · Geographic GIS
              </span>
              <h3 className="text-lg font-bold text-[#0F1B2D] group-hover:text-emerald-700 transition-colors">
                Interactive Tehsil GIS Map
              </h3>
              <p className="text-xs text-[#4B5A6B] leading-relaxed">
                Live OpenStreetMap spatial view of Lower Chitral and Drosh. Filter by infrastructure issues, active tree plantations, and emergency hazard zones.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-[#4B5A6B] pt-2 border-t border-[#E3E8E6]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>GPS Pinpoint Accuracy</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Layers: Works, Volunteers, Hazards</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-4 border-t border-[#E3E8E6]">
            <button
              onClick={() => navigate('/map')}
              className="w-full py-2.5 px-4 rounded-lg bg-[#F6F8F7] group-hover:bg-emerald-700 text-[#0F1B2D] group-hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore District Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 4: District Transparency & Public Accountability */}
        <div className="group relative rounded-xl border border-[#E3E8E6] bg-white p-6 shadow-sm hover:shadow-xl hover:border-[#1F6B43] transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-[#E8F2EC] text-[#1F6B43] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6B43]">
                Pillar 04 · Transparency & Open Data
              </span>
              <h3 className="text-lg font-bold text-[#0F1B2D] group-hover:text-[#1F6B43] transition-colors">
                Public Transparency Portal
              </h3>
              <p className="text-xs text-[#4B5A6B] leading-relaxed">
                Open governance metrics for Lower Chitral. Monitor department resolution speeds, active budget allocation, and verified civic audits in real time.
              </p>
            </div>

            <ul className="space-y-1.5 text-xs text-[#4B5A6B] pt-2 border-t border-[#E3E8E6]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F6B43] shrink-0" />
                <span>Department SLA Performance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F6B43] shrink-0" />
                <span>Verified Before / After Evidence</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-4 border-t border-[#E3E8E6]">
            <button
              onClick={() => navigate('/transparency')}
              className="w-full py-2.5 px-4 rounded-lg bg-[#F6F8F7] group-hover:bg-[#1F6B43] text-[#0F1B2D] group-hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Transparency KPIs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
