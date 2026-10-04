import React from 'react';
import { ActiveCampaign } from '../../data/activeCampaignsData';
import { Avatar } from '../civic/Avatar';
import { formatNumber } from '../../lib/format';
import {
  X,
  Users,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Wrench,
  Lightbulb,
  ArrowRight,
  UserCheck,
  ChevronRight,
  Phone,
  Flame,
  Award,
  Share2
} from 'lucide-react';

interface CampaignDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: ActiveCampaign | null;
  onOpenApply: (campaign: ActiveCampaign) => void;
  onLeaveCampaign: (campaignId: string) => void;
  navigate: (path: string) => void;
}

export const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onOpenApply,
  onLeaveCampaign,
  navigate,
}) => {
  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-xl border border-[#E3E8E6] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Banner */}
        <div className="bg-[#0F1B2D] text-white p-5 sm:p-6 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-emerald-400" />
                  Active Citizen Campaign
                </span>
                <span className="text-[10px] font-semibold text-slate-300 bg-white/10 px-2 py-0.5 rounded border border-white/10">
                  {campaign.categoryLabel}
                </span>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30">
                  ⚡ 100% Community-Led (Independent)
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {campaign.title}
              </h2>

              <p className="text-xs text-slate-300 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{campaign.location}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Independence & Self-Reliance Banner */}
        <div className="bg-[#FAF0E1] px-5 sm:px-6 py-3 border-b border-[#B7791F]/20 text-xs text-[#8B5B16] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B7791F] shrink-0" />
            <span>
              <strong>Citizen Self-Reliance:</strong> This campaign is organized, funded, and executed
              directly by local volunteers without waiting for government bureaucracy or municipal budget delays.
            </span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs text-[#0F1B2D]">
          {/* 1. Campaign Lead Profile Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#F6F8F7] border border-[#E3E8E6] space-y-3">
            <div className="flex items-center justify-between border-b border-[#E3E8E6] pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B5A6B]">
                Campaign Leadership & Organizer
              </span>
              <button
                onClick={() => {
                  onClose();
                  navigate(`/profile/${campaign.lead.userId === 'user-mz' ? 'muhammad-zulkaif' : 'ahmad-khan'}`);
                }}
                className="text-[11px] text-[#1F5FA8] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Civic Profile</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <Avatar name={campaign.lead.name} size="lg" className="border-2 border-white shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-[#0F1B2D]">
                      {campaign.lead.name}
                    </h3>
                    <span className="text-[10px] font-bold text-white bg-[#1F6B43] px-1.5 py-0.2 rounded">
                      Rank #{campaign.lead.rank}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#1F6B43] font-semibold">{campaign.lead.role}</p>
                  <p className="text-[11px] text-[#4B5A6B] mt-0.5">{campaign.lead.bio}</p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-[#E3E8E6] flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-[#4B5A6B] block">Civic Points</span>
                  <span className="text-sm font-bold text-[#0F1B2D] font-tabular">
                    {formatNumber(campaign.lead.score)} pts
                  </span>
                </div>
                <div className="w-px h-6 bg-[#E3E8E6]" />
                <a
                  href={`tel:${campaign.lead.phone}`}
                  className="inline-flex items-center gap-1 text-[11px] text-[#1F5FA8] font-semibold hover:underline"
                >
                  <Phone className="w-3 h-3" />
                  <span>Contact Lead</span>
                </a>
              </div>
            </div>
          </div>

          {/* 2. Work Completed So Far (Metrics & Overview) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1F6B43]" />
                  <span>Work Completed So Far by Volunteers:</span>
                </h4>
                <p className="text-[11px] text-[#4B5A6B] mt-0.5">
                  Verified tangible results achieved without municipal machinery assistance.
                </p>
              </div>

              {/* Progress Bar Badge */}
              <div className="text-right">
                <span className="text-xs font-bold text-[#1F6B43] font-tabular">
                  {campaign.progressPercent}% Target Completed
                </span>
                <div className="w-28 sm:w-36 h-2 bg-[#E3E8E6] rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-[#1F6B43] rounded-full transition-all"
                    style={{ width: `${campaign.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 4 Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {campaign.workCompleted.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#E8F2EC]/50 border border-[#1F6B43]/20">
                  <span className="text-sm sm:text-base font-extrabold text-[#174F32] block font-tabular">
                    {item.metric}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#1F6B43] block mt-0.5">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-[#4B5A6B] mt-1 block leading-tight">
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Detailed Sessions History */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#4B5A6B]">
              Field Work History & Completed Sessions:
            </h4>
            <div className="space-y-2.5">
              {campaign.sessionsHistory.map((sess) => (
                <div
                  key={sess.id}
                  className="p-3.5 rounded-lg border border-[#E3E8E6] bg-white flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
                        📅 {sess.date}
                      </span>
                      <span className="text-[11px] font-semibold text-[#0F1B2D]">
                        {sess.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#4B5A6B] leading-relaxed">{sess.description}</p>
                    <div className="pt-1 flex items-center gap-3 text-[10px] text-[#1F6B43] font-semibold">
                      <span>👥 {sess.volunteersCount} Volunteers Active</span>
                      <span>•</span>
                      <span>✓ {sess.workMetric}</span>
                    </div>
                  </div>

                  {sess.imageUrl && (
                    <img
                      src={sess.imageUrl}
                      alt={sess.title}
                      className="w-full sm:w-28 h-20 rounded-md object-cover border border-[#E3E8E6] shrink-0"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Upcoming Volunteer Session Assembly */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#E8F2EC] border border-[#1F6B43]/30 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1F6B43]/20 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174F32] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#1F6B43]" />
                Next Volunteer Assembly Details
              </span>
              <span className="text-[10px] font-bold bg-[#1F6B43] text-white px-2 py-0.5 rounded">
                Upcoming Phase
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-[#4B5A6B] block">Date & Time:</span>
                <span className="font-bold text-[#0F1B2D] text-sm block">
                  {campaign.nextSession.date}
                </span>
                <span className="text-[11px] text-[#1F6B43] font-semibold">
                  ⏰ {campaign.nextSession.time}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#4B5A6B] block">Assembly Point:</span>
                <span className="font-semibold text-[#0F1B2D] flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1F6B43] shrink-0 mt-0.5" />
                  <span>{campaign.nextSession.meetingPoint}</span>
                </span>
              </div>
            </div>

            {/* Tasks for Volunteers */}
            <div className="pt-2 border-t border-[#1F6B43]/20 space-y-1.5">
              <span className="text-[11px] font-bold text-[#174F32] block">
                What Volunteers Will Do on This Session:
              </span>
              <ul className="space-y-1 text-[11px] text-[#4B5A6B] list-disc list-inside">
                {campaign.nextSession.tasksForVolunteers.map((task, tIdx) => (
                  <li key={tIdx}>{task}</li>
                ))}
              </ul>
            </div>

            {/* Tools provided & What to bring */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] border-t border-[#1F6B43]/20">
              <div>
                <span className="font-bold text-[#0F1B2D] flex items-center gap-1 mb-1">
                  <Wrench className="w-3 h-3 text-[#1F6B43]" /> Tools Provided on Site:
                </span>
                <p className="text-[#4B5A6B]">{campaign.toolsProvided.join(', ')}</p>
              </div>
              <div>
                <span className="font-bold text-[#0F1B2D] flex items-center gap-1 mb-1">
                  🎒 What to Bring:
                </span>
                <p className="text-[#4B5A6B]">{campaign.nextSession.whatToBring.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-5 bg-[#F6F8F7] border-t border-[#E3E8E6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#4B5A6B]">
            <Users className="w-4 h-4 text-[#1F6B43]" />
            <span>
              <strong>{campaign.volunteersJoined} citizens</strong> already joined •{' '}
              {campaign.volunteersNeeded - campaign.volunteersJoined} slots open
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {campaign.isJoined ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-2 rounded-[6px] text-xs font-semibold bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F6B43]" />
                  <span>Enrolled Volunteer</span>
                </span>
                <button
                  onClick={() => onLeaveCampaign(campaign.id)}
                  className="px-3 py-2 rounded-[6px] text-xs font-medium text-[#B3261E] hover:bg-[#FCEBEA] border border-[#B3261E]/30 transition-colors cursor-pointer"
                >
                  Leave Campaign
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenApply(campaign)}
                className="px-5 py-2.5 rounded-[6px] text-xs font-bold bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Apply & Join This Campaign</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-[6px] text-xs font-medium text-[#4B5A6B] hover:text-[#0F1B2D] bg-white border border-[#E3E8E6]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
