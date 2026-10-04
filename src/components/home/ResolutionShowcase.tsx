import React, { useState } from 'react';
import { BEFORE_AFTER_SHOWCASE_CASES, BeforeAfterCase } from '../../data/images';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  MapPin,
  Sliders,
  Columns,
  Split,
  Calendar,
  Layers,
  Wrench
} from 'lucide-react';

interface ResolutionShowcaseProps {
  navigate: (path: string) => void;
}

export const ResolutionShowcase: React.FC<ResolutionShowcaseProps> = ({ navigate }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');

  const activeCase: BeforeAfterCase =
    BEFORE_AFTER_SHOWCASE_CASES[activeCaseIndex] || BEFORE_AFTER_SHOWCASE_CASES[0];

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1F5FA8] border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Accountability In Action</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1B2D] tracking-tight">
            Before & After <span className="text-[#1F6B43]">Impact Verification</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4B5A6B] max-w-2xl leading-relaxed">
            Every municipal repair in Lower Chitral is verified with authentic timestamped ground photography. Civic AI inspects pre-existing defects against completed field works to confirm real community problem resolution.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-[#F6F8F7] rounded-lg border border-[#E3E8E6] text-xs self-start md:self-end">
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] font-semibold transition-all cursor-pointer ${
              viewMode === 'slider'
                ? 'bg-white text-[#0F1B2D] shadow-2xs font-bold border border-[#E3E8E6]'
                : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
            }`}
          >
            <Split className="w-3.5 h-3.5 text-[#1F6B43]" />
            <span>Split Slider</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] font-semibold transition-all cursor-pointer ${
              viewMode === 'side-by-side'
                ? 'bg-white text-[#0F1B2D] shadow-2xs font-bold border border-[#E3E8E6]'
                : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
            }`}
          >
            <Columns className="w-3.5 h-3.5 text-[#1F5FA8]" />
            <span>Side-by-Side</span>
          </button>
        </div>
      </div>

      {/* Case Studies Selector Tabs */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-[#E3E8E6] mb-8">
        {BEFORE_AFTER_SHOWCASE_CASES.map((c, idx) => {
          const isActive = idx === activeCaseIndex;
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPos(50);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#0F1B2D] text-white shadow-xs'
                  : 'bg-[#F6F8F7] text-[#4B5A6B] hover:bg-slate-200 hover:text-[#0F1B2D] border border-[#E3E8E6]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-slate-400'}`} />
              <span>{c.category}</span>
              <span className={`text-[10px] opacity-75 hidden sm:inline`}>({c.caseId})</span>
            </button>
          );
        })}
      </div>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Case Details & Ground Audit Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E3E8E6] rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F6B43]">
                  Verified Public Case
                </span>
                <h3 className="font-mono font-bold text-sm text-[#0F1B2D]">
                  {activeCase.caseId}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Resolved</span>
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-base text-[#0F1B2D] leading-snug">
                {activeCase.title}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-[#4B5A6B]">
                <MapPin className="w-3.5 h-3.5 text-[#1F6B43] shrink-0" />
                <span>{activeCase.location}</span>
              </div>
            </div>

            {/* Audit Specifications */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] text-xs">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-semibold">Executing Agency</span>
                <span className="font-semibold text-[#0F1B2D]">{activeCase.department}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-semibold">Verification Date</span>
                <span className="font-semibold text-[#0F1B2D]">{activeCase.verifiedDate}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-semibold">Category</span>
                <span className="font-semibold text-[#0F1B2D]">{activeCase.category}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-semibold">Resolution Delta</span>
                <span className="font-bold text-[#1F6B43]">{activeCase.matchScore}</span>
              </div>
            </div>

            {/* Problem & Solution Breakdown */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-red-50/70 border border-red-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-red-900 text-[11px] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  <span>Reported Defect:</span>
                </div>
                <p className="text-red-950 leading-relaxed text-[11px]">
                  {activeCase.before.detail}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-[11px] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Physical Restoration:</span>
                </div>
                <p className="text-emerald-950 leading-relaxed text-[11px]">
                  {activeCase.after.detail}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/complaints')}
              className="px-5 py-2.5 rounded-lg text-xs font-bold bg-[#0F1B2D] text-white hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Explore Public Cases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/report')}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#1F6B43] hover:bg-[#E8F2EC] border border-[#1F6B43]/30 transition-colors cursor-pointer"
            >
              Report a Problem →
            </button>
          </div>
        </div>

        {/* Right Column: Visual Before & After Showcase (7 cols) */}
        <div className="lg:col-span-7">
          {viewMode === 'slider' ? (
            /* SLIDER VIEW MODE */
            <div className="relative rounded-2xl overflow-hidden border border-[#E3E8E6] shadow-xl bg-slate-900 select-none">
              {/* Image Frame */}
              <div className="relative h-[340px] sm:h-[430px] w-full overflow-hidden bg-slate-950">
                {/* AFTER IMAGE (Base Layer) */}
                <img
                  src={activeCase.after.src}
                  alt={activeCase.after.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Subtle AFTER Badge (Green Accent) */}
                <div className="absolute top-4 right-4 z-10 bg-emerald-50/95 backdrop-blur-md border border-emerald-300 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AFTER</span>
                </div>

                {/* BEFORE IMAGE (Clipped Overlay Layer) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={activeCase.before.src}
                    alt={activeCase.before.alt}
                    className="absolute inset-y-0 left-0 h-full w-[800px] max-w-none object-cover object-center"
                    style={{ width: '100%', height: '100%' }}
                  />

                  {/* Subtle BEFORE Badge (Red Accent) */}
                  <div className="absolute top-4 left-4 z-10 bg-red-50/95 backdrop-blur-md border border-red-300 text-red-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span>BEFORE</span>
                  </div>
                </div>

                {/* Split Divider Line with Drag Indicator */}
                <div
                  className="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] z-20 cursor-ew-resize flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center font-bold text-xs -ml-0.5 border border-slate-300">
                    ↔
                  </div>
                </div>
              </div>

              {/* Slider Controls Footer */}
              <div className="bg-[#0F1B2D] p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Drag slider to inspect restoration difference:</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSliderPos(100)}
                      className="px-2 py-0.5 rounded text-[11px] bg-red-950/80 text-red-300 hover:bg-red-900 border border-red-700/50 cursor-pointer"
                    >
                      Before
                    </button>
                    <button
                      type="button"
                      onClick={() => setSliderPos(50)}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600 cursor-pointer"
                    >
                      50 / 50
                    </button>
                    <button
                      type="button"
                      onClick={() => setSliderPos(0)}
                      className="px-2 py-0.5 rounded text-[11px] bg-emerald-950/80 text-emerald-300 hover:bg-emerald-900 border border-emerald-700/50 cursor-pointer"
                    >
                      After
                    </button>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="w-full sm:w-36 accent-emerald-500 cursor-pointer"
                    aria-label="Comparison slider"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* SIDE-BY-SIDE DUAL CARDS MODE */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* BEFORE CARD */}
              <div className="bg-white rounded-xl border border-red-200 overflow-hidden shadow-xs space-y-3">
                <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={activeCase.before.src}
                    alt={activeCase.before.alt}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 left-3 bg-red-50/95 backdrop-blur-md border border-red-300 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span>BEFORE</span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider block">
                    Initial Defect Report
                  </span>
                  <p className="text-xs text-[#4B5A6B] leading-relaxed">
                    {activeCase.before.detail}
                  </p>
                </div>
              </div>

              {/* AFTER CARD */}
              <div className="bg-white rounded-xl border border-emerald-200 overflow-hidden shadow-xs space-y-3">
                <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={activeCase.after.src}
                    alt={activeCase.after.alt}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 right-3 bg-emerald-50/95 backdrop-blur-md border border-emerald-300 text-emerald-800 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AFTER</span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    Completed Municipal Work
                  </span>
                  <p className="text-xs text-[#4B5A6B] leading-relaxed">
                    {activeCase.after.detail}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Verification Audit Caption */}
          <div className="mt-4 p-3 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] text-[11px] text-[#4B5A6B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1F6B43]" />
              <span>Real-world photographic evidence verified with sequential tracking ID on public ledger.</span>
            </div>
            <span className="font-semibold text-[#0F1B2D] hidden sm:inline">District Audit Standards</span>
          </div>
        </div>
      </div>
    </section>
  );
};
