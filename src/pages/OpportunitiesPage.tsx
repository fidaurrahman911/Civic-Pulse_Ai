import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { ActivityCategory } from '../types';
import { ActiveCampaign } from '../data/activeCampaignsData';
import { CampaignDetailModal } from '../components/campaigns/CampaignDetailModal';
import { CampaignApplyModal } from '../components/campaigns/CampaignApplyModal';
import { Avatar } from '../components/civic/Avatar';
import {
  MapPin,
  Calendar,
  Users,
  Filter,
  CheckCircle2,
  Building2,
  Flame,
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface OpportunitiesPageProps {
  navigate: (path: string) => void;
}

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({ navigate }) => {
  const {
    opportunities,
    activeCampaigns,
    joinOpportunity,
    leaveOpportunity,
    joinActiveCampaign,
    leaveActiveCampaign,
  } = useCivicStore();

  const [activeTab, setActiveTab] = useState<'citizen-campaigns' | 'partner-opportunities'>('citizen-campaigns');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [selectedCampaign, setSelectedCampaign] = useState<ActiveCampaign | null>(null);
  const [applyingCampaign, setApplyingCampaign] = useState<ActiveCampaign | null>(null);

  const categories = ['all', 'Environment', 'Education', 'Health', 'Disaster Response', 'Sports'];
  const locations = ['all', 'Drosh', 'Chitral', 'Ayun', 'Shishi Koh'];

  const filtered = opportunities.filter((opp) => {
    if (selectedCategory !== 'all' && opp.category !== selectedCategory) return false;
    if (selectedLocation !== 'all' && !opp.locationName.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleToggleJoin = (id: string, isJoined: boolean) => {
    if (isJoined) {
      leaveOpportunity(id);
      setToastMessage('Cancelled campaign participation.');
    } else {
      joinOpportunity(id);
      setToastMessage('Successfully registered for campaign! Your dashboard has been updated.');
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSuccessCampaignJoin = (campaignId: string, role: string) => {
    joinActiveCampaign(campaignId, { role });
    setToastMessage('Successfully joined citizen campaign! Lead has been notified.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLeaveActiveCampaign = (campaignId: string) => {
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
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8E6]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
            Citizen Self-Reliance & Mobilization
          </span>
          <h1 className="text-2xl font-bold text-[#0F1B2D] mt-1">
            Community Campaigns & Volunteer Drives
          </h1>
          <p className="text-xs text-[#4B5A6B] mt-0.5">
            Join self-reliant citizen initiatives to clean roads and restore infrastructure without waiting for government bureaucracy.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex rounded-[6px] border border-[#E3E8E6] p-0.5 bg-[#F6F8F7] text-xs">
          <button
            onClick={() => setActiveTab('citizen-campaigns')}
            className={`px-3 py-1.5 rounded-[4px] font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'citizen-campaigns'
                ? 'bg-white text-[#1F6B43] shadow-2xs'
                : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Active Citizen Campaigns (4)</span>
          </button>
          <button
            onClick={() => setActiveTab('partner-opportunities')}
            className={`px-3 py-1.5 rounded-[4px] font-semibold transition-colors ${
              activeTab === 'partner-opportunities'
                ? 'bg-white text-[#0F1B2D] shadow-2xs'
                : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
            }`}
          >
            Volunteer Opportunities ({opportunities.length})
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-lg bg-[#E8F2EC] border border-[#1F6B43]/40 text-xs font-semibold text-[#174F32] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#1F6B43]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TAB 1: ACTIVE CITIZEN CAMPAIGNS (Independent Community Action) */}
      {activeTab === 'citizen-campaigns' ? (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#FAF0E1] border border-[#B7791F]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#8B5B16]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#B7791F] shrink-0" />
              <div>
                <strong>Independent Citizen Initiatives:</strong> These campaigns are managed and executed
                directly by local citizen leads (such as Drosh Link Road Cleaning and Shishi Koh Waterline Repair).
                Click on any campaign to see how much work has been done and apply to participate!
              </div>
            </div>
            <button
              onClick={() => navigate('/impact/new')}
              className="px-3.5 py-1.5 rounded-[6px] text-xs font-bold bg-[#B7791F] text-white hover:bg-[#8B5B16] shrink-0 self-start sm:self-center transition-colors cursor-pointer"
            >
              + Start a New Campaign
            </button>
          </div>

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
                {/* Top Image */}
                <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
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

                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
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
                      onClick={() => setSelectedCampaign(camp)}
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
                        onClick={() => setSelectedCampaign(camp)}
                        className="w-full py-2 px-2 rounded-[6px] text-[11px] font-semibold text-[#0F1B2D] bg-[#F6F8F7] hover:bg-[#E3E8E6] transition-colors text-center cursor-pointer"
                      >
                        View Work
                      </button>

                      {camp.isJoined ? (
                        <button
                          onClick={() => handleLeaveActiveCampaign(camp.id)}
                          className="w-full py-2 px-2 rounded-[6px] text-[11px] font-semibold text-[#8A1D17] bg-[#FCEBEA] hover:bg-[#F8D7D5] transition-colors text-center cursor-pointer"
                        >
                          Enrolled ✕
                        </button>
                      ) : (
                        <button
                          onClick={() => setApplyingCampaign(camp)}
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
      ) : (
        /* TAB 2: PARTNER VOLUNTEER OPPORTUNITIES */
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white rounded-lg border border-[#E3E8E6] text-xs shadow-2xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#4B5A6B]">Category:</span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-2.5 py-1 rounded-[4px] border font-medium transition-colors ${
                    selectedCategory === c
                      ? 'bg-[#1F6B43] text-white border-[#1F6B43]'
                      : 'bg-white text-[#4B5A6B] border-[#E3E8E6] hover:bg-[#F6F8F7]'
                  }`}
                >
                  {c === 'all' ? 'All Categories' : c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#4B5A6B]">Area:</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="p-1.5 rounded-[4px] border border-[#E3E8E6] bg-white text-xs text-[#0F1B2D]"
              >
                <option value="all">All Locations</option>
                {locations.filter((l) => l !== 'all').map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Opportunities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((opp) => {
              const isFull = opp.filled >= opp.volunteersNeeded;

              return (
                <div
                  key={opp.id}
                  className="p-5 rounded-lg bg-white border border-[#E3E8E6] shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
                        {opp.category}
                      </span>
                      <span className="text-xs font-semibold text-[#4B5A6B]">
                        {opp.filled} / {opp.volunteersNeeded} Volunteers
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0F1B2D] leading-snug">{opp.title}</h3>
                    <p className="text-xs text-[#4B5A6B] leading-relaxed line-clamp-3">
                      {opp.description}
                    </p>

                    <div className="pt-2 border-t border-[#E3E8E6] space-y-1.5 text-xs text-[#4B5A6B]">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#1F5FA8]" />
                        <span className="font-medium text-[#0F1B2D]">{opp.orgName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#4B5A6B]" />
                        <span>{opp.datetime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#1F6B43]" />
                        <span>{opp.locationName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E3E8E6] flex items-center justify-between">
                    <span className="text-[11px] text-[#4B5A6B]">
                      {isFull ? 'Campaign at capacity' : `${opp.volunteersNeeded - opp.filled} slots left`}
                    </span>

                    <button
                      type="button"
                      disabled={isFull && !opp.isJoined}
                      onClick={() => handleToggleJoin(opp.id, !!opp.isJoined)}
                      className={`px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors ${
                        opp.isJoined
                          ? 'bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/40'
                          : isFull
                          ? 'bg-[#E3E8E6] text-[#4B5A6B] cursor-not-allowed'
                          : 'bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-xs'
                      }`}
                    >
                      {opp.isJoined ? 'Joined (Click to Cancel)' : isFull ? 'Campaign Full' : 'Join Campaign'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Campaign Detail Modal */}
      <CampaignDetailModal
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        campaign={selectedCampaign}
        onOpenApply={(camp) => {
          setSelectedCampaign(null);
          setApplyingCampaign(camp);
        }}
        onLeaveCampaign={handleLeaveActiveCampaign}
        navigate={navigate}
      />

      {/* Campaign Apply Modal */}
      <CampaignApplyModal
        isOpen={!!applyingCampaign}
        onClose={() => setApplyingCampaign(null)}
        campaign={applyingCampaign}
        onSuccessJoin={handleSuccessCampaignJoin}
      />
    </div>
  );
};
