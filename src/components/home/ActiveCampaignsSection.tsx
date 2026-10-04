import React, { useState } from 'react';
import { useCivicStore } from '../../store/useCivicStore';
import { ActiveCampaign } from '../../data/activeCampaignsData';
import { Avatar } from '../civic/Avatar';
import { CampaignDetailModal } from '../campaigns/CampaignDetailModal';
import { CampaignApplyModal } from '../campaigns/CampaignApplyModal';
import {
  Flame,
  Users,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface ActiveCampaignsSectionProps {
  navigate: (path: string) => void;
}

export const ActiveCampaignsSection: React.FC<ActiveCampaignsSectionProps> = ({ navigate }) => {
  const { activeCampaigns, joinActiveCampaign, leaveActiveCampaign } = useCivicStore();

  const [selectedCampaign, setSelectedCampaign] = useState<ActiveCampaign | null>(null);
  const [applyingCampaign, setApplyingCampaign] = useState<ActiveCampaign | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenDetail = (campaign: ActiveCampaign) => {
    setSelectedCampaign(campaign);
  };

  const handleOpenApply = (campaign: ActiveCampaign) => {
    setApplyingCampaign(campaign);
  };

  const handleSuccessJoin = (campaignId: string, role: string) => {
    joinActiveCampaign(campaignId, { role, availability: 'Weekend Shift' });
    setToastMessage('Successfully enrolled in campaign! You are now part of the citizen team.');
    setTimeout(() => setToastMessage(null), 4000);

    // Update selectedCampaign reference if open
    if (selectedCampaign && selectedCampaign.id === campaignId) {
      setSelectedCampaign({
        ...selectedCampaign,
        isJoined: true,
        volunteersJoined: selectedCampaign.volunteersJoined + 1,
      });
    }
  };

  const handleLeaveCampaign = (campaignId: string) => {
    leaveActiveCampaign(campaignId);
    setToastMessage('Left campaign roster.');
    setTimeout(() => setToastMessage(null), 3000);

    if (selectedCampaign && selectedCampaign.id === campaignId) {
      setSelectedCampaign({
        ...selectedCampaign,
        isJoined: false,
        volunteersJoined: Math.max(0, selectedCampaign.volunteersJoined - 1),
      });
    }
  };

  return (
    <section className="bg-[#F6F8F7] border-y border-[#E3E8E6] py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/20 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-[#1F6B43]" />
              <span>Independent Civic Action · Citizen Self-Reliance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1B2D] tracking-tight">
              Active Community Campaigns: <span className="text-[#1F6B43]">Citizens Taking Charge</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#4B5A6B] leading-relaxed">
              Don’t wait for government bureaucracy or delayed tenders. Local citizen leaders and volunteers take direct ownership to clean roads, restore waterlines, and safeguard our tehsils. Explore active campaigns below, see how much work has been done, and apply to be part of the movement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/impact/new')}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-white border border-[#E3E8E6] text-[#0F1B2D] hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <span>+ Propose Community Campaign</span>
            </button>
            <button
              onClick={() => navigate('/opportunities')}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>View All Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-3.5 rounded-lg bg-[#E8F2EC] border border-[#1F6B43]/40 text-xs font-semibold text-[#174F32] flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1F6B43]" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-[#174F32] hover:text-[#0F1B2D]">
              ✕
            </button>
          </div>
        )}

        {/* 4 Active Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeCampaigns.map((camp) => (
            <div
              key={camp.id}
              className={`bg-white rounded-xl border transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                camp.isJoined
                  ? 'border-[#1F6B43] ring-1 ring-[#1F6B43]'
                  : 'border-[#E3E8E6] hover:border-[#1F6B43]/60'
              }`}
            >
              {/* Campaign Top Image with Status Badge */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={camp.imageUrl}
                  alt={camp.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#0F1B2D] px-2 py-0.5 rounded shadow-xs">
                    {camp.categoryLabel}
                  </span>

                  {camp.isJoined && (
                    <span className="text-[10px] font-bold bg-[#1F6B43] text-white px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Enrolled</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] flex items-center gap-1 text-slate-200">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{camp.location}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3
                    onClick={() => handleOpenDetail(camp)}
                    className="text-base font-bold text-[#0F1B2D] hover:text-[#1F6B43] transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {camp.title}
                  </h3>

                  <p className="text-xs text-[#4B5A6B] line-clamp-2 leading-relaxed">
                    {camp.tagline}
                  </p>

                  {/* Campaign Lead Mini Card */}
                  <div className="pt-2 border-t border-[#E3E8E6] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar name={camp.lead.name} size="sm" />
                      <div>
                        <span className="text-[10px] text-[#4B5A6B] block">Campaign Lead:</span>
                        <span className="font-bold text-xs text-[#0F1B2D] block leading-tight">
                          {camp.lead.name}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#1F6B43] bg-[#E8F2EC] px-1.5 py-0.5 rounded">
                      Rank #{camp.lead.rank}
                    </span>
                  </div>

                  {/* Progress Bar & Volunteers */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#4B5A6B]">Work Progress</span>
                      <span className="font-bold text-[#1F6B43] font-tabular">
                        {camp.progressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E3E8E6] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1F6B43] rounded-full transition-all"
                        style={{ width: `${camp.progressPercent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#4B5A6B]">
                      <span className="flex items-center gap-1 font-semibold text-[#0F1B2D]">
                        <Users className="w-3 h-3 text-[#1F6B43]" />
                        {camp.volunteersJoined} joined
                      </span>
                      <span>Target: {camp.volunteersNeeded}</span>
                    </div>
                  </div>

                  {/* Work Completed Highlight Chip */}
                  <div className="p-2 rounded bg-[#E8F2EC]/60 border border-[#1F6B43]/20 text-[11px] text-[#174F32] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1F6B43] shrink-0" />
                    <span className="font-semibold truncate">
                      {camp.workCompleted[0].metric} {camp.workCompleted[0].label}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#E3E8E6] space-y-2">
                  <div className="text-[10px] text-[#4B5A6B] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#1F6B43] shrink-0" />
                    <span className="truncate">Next: {camp.nextSession.date}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleOpenDetail(camp)}
                      className="w-full py-2 px-2 rounded-[6px] text-[11px] font-semibold text-[#0F1B2D] bg-[#F6F8F7] hover:bg-[#E3E8E6] transition-colors text-center cursor-pointer"
                    >
                      View Work
                    </button>

                    {camp.isJoined ? (
                      <button
                        onClick={() => handleLeaveCampaign(camp.id)}
                        className="w-full py-2 px-2 rounded-[6px] text-[11px] font-semibold text-[#8A1D17] bg-[#FCEBEA] hover:bg-[#F8D7D5] transition-colors text-center cursor-pointer"
                      >
                        Enrolled ✕
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenApply(camp)}
                        className="w-full py-2 px-2 rounded-[6px] text-[11px] font-bold text-white bg-[#1F6B43] hover:bg-[#174F32] transition-colors text-center cursor-pointer shadow-2xs"
                      >
                        Apply / Join
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Detail Modal */}
      <CampaignDetailModal
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        campaign={selectedCampaign}
        onOpenApply={(camp) => {
          setSelectedCampaign(null);
          setApplyingCampaign(camp);
        }}
        onLeaveCampaign={handleLeaveCampaign}
        navigate={navigate}
      />

      {/* Campaign Apply Modal */}
      <CampaignApplyModal
        isOpen={!!applyingCampaign}
        onClose={() => setApplyingCampaign(null)}
        campaign={applyingCampaign}
        onSuccessJoin={handleSuccessJoin}
      />
    </section>
  );
};
