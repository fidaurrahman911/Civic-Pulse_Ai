import React, { useState } from 'react';
import { Avatar } from './Avatar';
import { CitizenWorkProfile, CitizenManagedDrive } from '../../data/citizenWorkData';
import { formatNumber } from '../../lib/format';
import {
  X,
  Sparkles,
  MapPin,
  Trophy,
  CheckCircle2,
  Calendar,
  Users,
  Wrench,
  Lightbulb,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Flame,
  Award,
  Layers,
  Clock
} from 'lucide-react';

interface CitizenWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CitizenWorkProfile | null;
  navigate: (path: string) => void;
}

export const CitizenWorkModal: React.FC<CitizenWorkModalProps> = ({
  isOpen,
  onClose,
  profile,
  navigate,
}) => {
  const [activeTab, setActiveTab] = useState<'drives' | 'replicate' | 'activities'>('drives');
  const [selectedDriveId, setSelectedDriveId] = useState<string | null>(null);

  if (!isOpen || !profile) return null;

  const currentDrive =
    profile.managedDrives.find((d) => d.id === selectedDriveId) || profile.managedDrives[0];

  const profileSlug =
    profile.citizenId === 'user-mz'
      ? 'muhammad-zulkaif'
      : profile.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-xl border border-[#E3E8E6] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Citizen Header Bar */}
        <div className="bg-[#0F1B2D] text-white p-5 sm:p-6 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar name={profile.name} size="lg" className="border-2 border-white/20 shrink-0" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    District Contributor Rank #{profile.rank}
                  </span>
                  <span className="text-[10px] text-slate-300 font-medium">
                    {profile.level}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {profile.name}
                </h2>

                <p className="text-xs text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{profile.location}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-emerald-400 font-semibold font-tabular">
                    {formatNumber(profile.score)} Civic Points
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-3 pt-3 border-t border-slate-700/60 leading-relaxed">
            {profile.bio}
          </p>

          {/* Quick Aggregate Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-slate-800 text-xs">
            <div className="bg-slate-800/60 rounded p-2">
              <span className="text-[10px] text-slate-400 block">Drives Led</span>
              <span className="text-sm font-bold text-white font-tabular">
                {profile.totalDrivesOrganized} Campaigns
              </span>
            </div>
            <div className="bg-slate-800/60 rounded p-2">
              <span className="text-[10px] text-slate-400 block">Volunteers Mobilized</span>
              <span className="text-sm font-bold text-white font-tabular">
                {profile.volunteersMobilizedTotal} Citizens
              </span>
            </div>
            <div className="bg-slate-800/60 rounded p-2">
              <span className="text-[10px] text-slate-400 block">Waste Cleared</span>
              <span className="text-sm font-bold text-emerald-400 font-tabular">
                {formatNumber(profile.wasteClearedTotalKg)} Kg
              </span>
            </div>
            <div className="bg-slate-800/60 rounded p-2">
              <span className="text-[10px] text-slate-400 block">Trees Planted</span>
              <span className="text-sm font-bold text-emerald-400 font-tabular">
                {profile.treesPlantedTotal} Saplings
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-[#E3E8E6] bg-[#F6F8F7] px-4 sm:px-6 shrink-0">
          <button
            onClick={() => setActiveTab('drives')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'drives'
                ? 'border-[#1F6B43] text-[#1F6B43]'
                : 'border-transparent text-[#4B5A6B] hover:text-[#0F1B2D]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Community Drives Managed ({profile.managedDrives.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('replicate')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'replicate'
                ? 'border-[#1F6B43] text-[#1F6B43]'
                : 'border-transparent text-[#4B5A6B] hover:text-[#0F1B2D]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>How to Work Similarly (Action Guide)</span>
          </button>

          <button
            onClick={() => setActiveTab('activities')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'activities'
                ? 'border-[#1F6B43] text-[#1F6B43]'
                : 'border-transparent text-[#4B5A6B] hover:text-[#0F1B2D]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Impact Logs ({profile.recentActivities.length})</span>
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs text-[#0F1B2D]">
          {/* TAB 1: DRIVES MANAGED */}
          {activeTab === 'drives' && (
            <div className="space-y-5">
              {/* Drive selector if multiple */}
              {profile.managedDrives.length > 1 && (
                <div className="flex flex-wrap gap-2 pb-2 border-b border-[#E3E8E6]">
                  {profile.managedDrives.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDriveId(d.id)}
                      className={`px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors cursor-pointer ${
                        currentDrive.id === d.id
                          ? 'bg-[#1F6B43] text-white shadow-2xs font-bold'
                          : 'bg-[#F6F8F7] text-[#4B5A6B] hover:text-[#0F1B2D] border border-[#E3E8E6]'
                      }`}
                    >
                      {d.title}
                    </button>
                  ))}
                </div>
              )}

              {/* Current Drive Card */}
              {currentDrive && (
                <div className="space-y-4">
                  <div className="p-4 sm:p-5 rounded-xl border border-[#E3E8E6] bg-[#F6F8F7]/60 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
                            {currentDrive.category}
                          </span>
                          <span className="text-[11px] text-[#4B5A6B]">
                            Completed: {currentDrive.dateCompleted}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#0F1B2D]">
                          {currentDrive.title}
                        </h3>
                        <p className="text-xs text-[#1F6B43] font-semibold mt-0.5">
                          Role: {currentDrive.role}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#0F1B2D] block">
                          👥 {currentDrive.volunteersMobilized} Volunteers
                        </span>
                        <span className="text-[11px] text-[#4B5A6B] block">
                          ⏱ {currentDrive.hoursDedicated} Field Hours
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#4B5A6B] leading-relaxed">
                      {currentDrive.summary}
                    </p>

                    {/* Impact Metrics Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {currentDrive.impactMetrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-2.5 rounded bg-white border border-[#E3E8E6]">
                          <span className="text-xs sm:text-sm font-bold text-[#174F32] block font-tabular">
                            {m.metric}
                          </span>
                          <span className="text-[10px] text-[#4B5A6B] block mt-0.5">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* What he did breakdown */}
                    <div className="p-3.5 rounded-lg bg-white border border-[#E3E8E6] space-y-2">
                      <span className="text-[11px] font-bold text-[#0F1B2D] uppercase tracking-wider block">
                        Detailed Work Breakdown & Execution:
                      </span>
                      <p className="text-xs text-[#4B5A6B] leading-relaxed">
                        {currentDrive.whatHeDid}
                      </p>
                    </div>

                    {/* Challenges overcome */}
                    <div className="p-3.5 rounded-lg bg-[#FAF0E1] border border-[#B7791F]/30 space-y-1">
                      <span className="text-[11px] font-bold text-[#8B5B16] uppercase tracking-wider block">
                        Obstacle & How He Resolved It:
                      </span>
                      <p className="text-xs text-[#8B5B16] leading-relaxed">
                        {currentDrive.challengesFaced}
                      </p>
                    </div>
                  </div>

                  {/* Switch to replicate CTA */}
                  <div className="p-4 rounded-xl bg-[#E8F2EC] border border-[#1F6B43]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-xs text-[#174F32] block">
                        Want to lead a drive like this in your own street or village?
                      </span>
                      <span className="text-[11px] text-[#4B5A6B]">
                        Inspect the step-by-step action guide and launch your initiative.
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab('replicate')}
                      className="px-3.5 py-2 rounded-[6px] text-xs font-bold bg-[#1F6B43] hover:bg-[#174F32] text-white transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      <span>Read Replication Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: HOW TO REPLICATE & WORK SIMILARLY */}
          {activeTab === 'replicate' && currentDrive && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#F6F8F7] border border-[#E3E8E6] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
                  Action Guide & Field Blueprint
                </span>
                <h3 className="text-base font-bold text-[#0F1B2D]">
                  How to replicate "{currentDrive.title}" in your community
                </h3>
                <p className="text-xs text-[#4B5A6B] leading-relaxed">
                  {currentDrive.howToReplicate.overview}
                </p>
              </div>

              {/* Budget & Tools Header */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg border border-[#E3E8E6] bg-white space-y-1">
                  <span className="text-[10px] font-bold text-[#4B5A6B] uppercase tracking-wider block">
                    Estimated Grassroots Budget:
                  </span>
                  <span className="text-xs font-bold text-[#174F32] block">
                    {currentDrive.howToReplicate.estimatedBudget}
                  </span>
                  <p className="text-[10px] text-[#4B5A6B]">
                    Can easily be collected from small neighborhood contributions or local shopkeepers.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-[#E3E8E6] bg-white space-y-1">
                  <span className="text-[10px] font-bold text-[#4B5A6B] uppercase tracking-wider block">
                    Tools & Equipment Needed:
                  </span>
                  <ul className="text-[11px] text-[#4B5A6B] space-y-0.5 list-disc list-inside">
                    {currentDrive.howToReplicate.toolsRequired.map((t, tIdx) => (
                      <li key={tIdx} className="truncate">{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] block">
                  Step-by-Step Implementation Sequence:
                </span>

                <div className="space-y-3">
                  {currentDrive.howToReplicate.steps.map((s) => (
                    <div
                      key={s.stepNumber}
                      className="p-4 rounded-lg border border-[#E3E8E6] bg-white space-y-2 hover:border-[#1F6B43]/50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#1F6B43] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {s.stepNumber}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-[#0F1B2D]">
                          {s.title}
                        </h4>
                      </div>

                      <p className="text-xs text-[#4B5A6B] pl-8 leading-relaxed">
                        {s.description}
                      </p>

                      <div className="ml-8 p-2.5 rounded bg-[#E8F2EC]/60 border border-[#1F6B43]/20 text-[11px] text-[#174F32] flex items-start gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-[#1F6B43] shrink-0 mt-0.5" />
                        <div>
                          <strong>Field Pro Tip:</strong> {s.practicalTip}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ready to Launch Action Box */}
              <div className="p-5 rounded-xl bg-[#1F6B43] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">Ready to start this drive in your area?</h4>
                  <p className="text-xs text-emerald-100">
                    Submit your planned cleanup or drive on CivicPulse AI to organize volunteers and earn verified recognition.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/impact/new');
                  }}
                  className="px-4 py-2.5 rounded-[6px] text-xs font-bold bg-white text-[#174F32] hover:bg-slate-100 transition-colors shrink-0 shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>+ Launch Drive Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: VERIFIED ACTIVITIES LOG */}
          {activeTab === 'activities' && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4B5A6B] block">
                Official Municipal & Field Verification Records:
              </span>

              <div className="space-y-2.5">
                {profile.recentActivities.map((act) => (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-lg border border-[#E3E8E6] bg-white space-y-1.5 hover:shadow-2xs transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
                          {act.category}
                        </span>
                        <h4 className="font-bold text-xs text-[#0F1B2D]">
                          {act.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold text-[#1F6B43] font-tabular">
                        +{act.points} pts verified
                      </span>
                    </div>

                    <p className="text-xs text-[#4B5A6B] leading-relaxed">
                      {act.summary}
                    </p>

                    <div className="pt-2 border-t border-[#E3E8E6] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#4B5A6B]">
                      <span>📍 {act.location} • 📅 {act.date} • 👥 {act.participants} Participants</span>
                      <span className="font-semibold text-[#174F32] flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#1F6B43]" />
                        Verified by: {act.verifiedBy}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F6F8F7] border-t border-[#E3E8E6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              onClose();
              navigate(`/profile/${profileSlug}`);
            }}
            className="text-xs text-[#1F5FA8] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View Complete Public Profile & Badges</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => {
                onClose();
                navigate('/impact/new');
              }}
              className="px-4 py-2 rounded-[6px] text-xs font-bold bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-2xs transition-colors cursor-pointer"
            >
              + Submit Work / Drive
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-[6px] text-xs font-medium text-[#4B5A6B] hover:text-[#0F1B2D] bg-white border border-[#E3E8E6]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
