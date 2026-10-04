import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { REGIONAL_IMAGES } from '../data/images';
import { StatusBadge } from '../components/civic/StatusBadge';
import { ConfidenceMeter } from '../components/civic/ConfidenceMeter';
import { DemoAiBadge } from '../components/civic/DemoAiBadge';
import { Avatar } from '../components/civic/Avatar';
import { CivicMap } from '../components/map/CivicMap';
import { formatNumber } from '../lib/format';

// Bano Qabil Inspired High-Impact Home Components
import { AnnouncementTicker } from '../components/home/AnnouncementTicker';
import { BanoQabilHeroSlider } from '../components/home/BanoQabilHeroSlider';
import { DistrictImpactCounters } from '../components/home/DistrictImpactCounters';
import { ProgramGateways } from '../components/home/ProgramGateways';
import { ResolutionShowcase } from '../components/home/ResolutionShowcase';
import { ActiveCampaignsSection } from '../components/home/ActiveCampaignsSection';
import { YouthChampionsSection } from '../components/home/YouthChampionsSection';
import { DistrictPartnersBar } from '../components/home/DistrictPartnersBar';
import { CitizenWorkModal } from '../components/civic/CitizenWorkModal';
import { getCitizenWorkProfile, CitizenWorkProfile } from '../data/citizenWorkData';

import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  AlertTriangle,
  Building2,
  FileCheck,
  Award,
  Sparkles,
  MapPin,
  TrendingUp,
  Layers,
  Wrench,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { complaints, activities, locations, civicScores, openGateway } = useCivicStore();
  const [selectedProfile, setSelectedProfile] = useState<CitizenWorkProfile | null>(null);

  const zulkaifScore = civicScores['user-mz']?.total || 1020;

  return (
    <div className="space-y-0 pb-16 bg-white text-[#0F1B2D]">
      {/* 1. TOP OFFICIAL ANNOUNCEMENT TICKER (Bano Qabil style) */}
      <AnnouncementTicker navigate={navigate} />

      {/* 2. DYNAMIC REAL-IMAGE CHITRAL HERO SLIDER (Bano Qabil style sliding carousel with bold typography & visible text) */}
      <BanoQabilHeroSlider navigate={navigate} />

      {/* 3. REAL-TIME DISTRICT IMPACT COUNTERS (Big bold numbers) */}
      <DistrictImpactCounters />

      {/* 4. THE 4 PILLARS & PROGRAM GATEWAYS (Bano Qabil style interactive visual cards) */}
      <ProgramGateways navigate={navigate} />

      {/* 5. INTERACTIVE BEFORE & AFTER RESOLUTION SHOWCASE */}
      <ResolutionShowcase navigate={navigate} />

      {/* 6. ACTIVE CITIZEN COMMUNITY CAMPAIGNS (Independent citizen action, road cleaning & apply flows) */}
      <ActiveCampaignsSection navigate={navigate} />

      {/* 7. YOUTH CIVIC CHAMPIONS & VOLUNTEERS OF CHITRAL */}
      <YouthChampionsSection navigate={navigate} />

      {/* 7. LIVE CIVIC MAP & DISTRICT LEADERBOARD SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#1F6B43] border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Real-Time Municipal Telemetry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1B2D]">
              Geographic & Community Pulse
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4B5A6B] max-w-md">
            Track active municipal works, verified volunteer saplings, and open cases across Lower Chitral and Drosh.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Civic Map Preview (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#E3E8E6] shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
                <h3 className="text-base font-bold text-[#0F1B2D] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1F6B43]" />
                  <span>Tehsil Drosh & Lower Chitral GIS Map</span>
                </h3>
                <button
                  onClick={() => navigate('/map')}
                  className="text-xs font-bold text-[#1F6B43] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-4 rounded-xl overflow-hidden border border-[#E3E8E6]">
                <CivicMap
                  complaints={complaints.slice(0, 10)}
                  activities={activities.slice(0, 5)}
                  locations={locations}
                  height="360px"
                  onSelectComplaint={(c) => navigate(`/complaints/${c.trackingId}`)}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#4B5A6B]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1F6B43]" /> Verified Activities
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1F5FA8]" /> Potholes & Infrastructure
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B3261E]" /> Emergency Hazards
              </span>
            </div>
          </div>

          {/* Leaderboard Preview (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#E3E8E6] shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
                <h3 className="text-base font-bold text-[#0F1B2D] flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Top District Contributors</span>
                </h3>
                <span className="text-xs text-[#1F6B43] font-bold">Lower Chitral</span>
              </div>

              <div className="divide-y divide-[#E3E8E6] text-xs mt-3">
                {/* 1. Ahmad Khan */}
                <div
                  onClick={() => setSelectedProfile(getCitizenWorkProfile('user-extra-1'))}
                  className="py-3 flex items-center justify-between cursor-pointer hover:bg-[#F6F8F7] -mx-2 px-2 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base font-extrabold font-tabular text-[#4B5A6B] w-5">01</span>
                    <Avatar name="Ahmad Khan" size="sm" />
                    <div>
                      <span className="font-bold text-[#0F1B2D] group-hover:text-[#1F6B43] transition-colors">Ahmad Khan</span>
                      <span className="text-[11px] text-[#4B5A6B] block">Drosh, Lower Chitral</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black font-tabular text-[#0F1B2D] block">1,284 pts</span>
                    <span className="text-[10px] text-[#1F6B43] font-semibold">Inspect Work →</span>
                  </div>
                </div>

                {/* 2. Muhammad Zulkaif */}
                <div
                  onClick={() => setSelectedProfile(getCitizenWorkProfile('user-mz'))}
                  className="py-3 flex items-center justify-between bg-[#E8F2EC]/60 -mx-2 px-2 rounded-lg border border-[#1F6B43]/30 cursor-pointer hover:bg-[#E8F2EC] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base font-extrabold font-tabular text-[#1F6B43] w-5">02</span>
                    <Avatar name="Muhammad Zulkaif" size="sm" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#0F1B2D] group-hover:text-[#1F6B43] transition-colors">Muhammad Zulkaif</span>
                        <span className="text-[9px] font-black bg-[#1F6B43] text-white px-1.5 py-0.5 rounded">
                          YOU
                        </span>
                      </div>
                      <span className="text-[11px] text-[#4B5A6B] block">Drosh, Lower Chitral</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black font-tabular text-[#1F6B43] block">
                      {formatNumber(zulkaifScore)} pts
                    </span>
                    <span className="text-[10px] text-[#174F32] font-semibold">Inspect Work →</span>
                  </div>
                </div>

                {/* 3. Ali Ahmad */}
                <div
                  onClick={() => setSelectedProfile(getCitizenWorkProfile('user-extra-2'))}
                  className="py-3 flex items-center justify-between cursor-pointer hover:bg-[#F6F8F7] -mx-2 px-2 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base font-extrabold font-tabular text-[#4B5A6B] w-5">03</span>
                    <Avatar name="Ali Ahmad" size="sm" />
                    <div>
                      <span className="font-bold text-[#0F1B2D] group-hover:text-[#1F6B43] transition-colors">Ali Ahmad</span>
                      <span className="text-[11px] text-[#4B5A6B] block">Chitral Town</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black font-tabular text-[#0F1B2D] block">987 pts</span>
                    <span className="text-[10px] text-[#1F6B43] font-semibold">Inspect Work →</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/leaderboard')}
              className="w-full py-3 rounded-lg text-xs font-bold bg-[#F6F8F7] hover:bg-[#E3E8E6] text-[#0F1B2D] border border-[#E3E8E6] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Explore Full Leaderboard (30 Contributors)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. HOW IT WORKS: THE 7 STEPS WORKFLOW */}
      <section className="bg-[#F6F8F7] py-16 border-y border-[#E3E8E6]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1F6B43] mb-1">
                Transparent Standard Operating Procedure
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1B2D]">
                How CivicPulse AI Operates in 7 Steps
              </h2>
            </div>
            <DemoAiBadge />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-xs">
            {[
              { num: '01', title: 'Citizens Contribute', desc: 'Mobilize local cleanups or tree plantings.' },
              { num: '02', title: 'AI Verifies Evidence', desc: 'Audits photos, EXIF, and participants.' },
              { num: '03', title: 'Civic Score Awarded', desc: 'Points added to public leaderboard.' },
              { num: '04', title: 'Problems Reported', desc: 'Log infrastructure hazards with GPS.' },
              { num: '05', title: 'AI Classifies Hazard', desc: 'Triages urgency & assigns department.' },
              { num: '06', title: 'Admin Dispatches', desc: 'C&W or TMA mobilizes repair team.' },
              { num: '07', title: 'Resolution Verified', desc: 'Before & after AI audit confirms closure.' },
            ].map((step) => (
              <div
                key={step.num}
                className="p-4 rounded-xl bg-white border border-[#E3E8E6] space-y-2 shadow-xs hover:border-[#1F6B43] transition-all"
              >
                <span className="text-lg font-black font-tabular text-[#1F6B43]">
                  {step.num}
                </span>
                <h4 className="font-bold text-[#0F1B2D] leading-snug">{step.title}</h4>
                <p className="text-[11px] text-[#4B5A6B] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BIG IMPACT CTA BANNER (Like Bano Qabil admission / registration callout) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F1B2D] via-[#174F32] to-[#0F1B2D] text-white p-8 sm:p-14 text-center shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join the Movement in Lower Chitral</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Make Your Community Contribution Visible.
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Whether you are a student planting trees in Shishi Koh, a shopkeeper reporting a broken water main in Drosh, or an official reviewing municipal work — CivicPulse AI is your platform.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openGateway()}
                className="px-7 py-3.5 rounded-xl text-sm font-bold bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-xl hover:shadow-emerald-900/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>Register as Citizen / Volunteer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/report')}
                className="px-6 py-3.5 rounded-xl text-sm font-bold bg-white text-[#0F1B2D] hover:bg-slate-100 transition-all shadow-md cursor-pointer"
              >
                Report a Municipal Problem
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. OFFICIAL DISTRICT PARTNERS & ENDORSEMENT BAR */}
      <DistrictPartnersBar />

      {/* Citizen Work & Cleanliness Drives Modal */}
      <CitizenWorkModal
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        profile={selectedProfile}
        navigate={navigate}
      />
    </div>
  );
};
