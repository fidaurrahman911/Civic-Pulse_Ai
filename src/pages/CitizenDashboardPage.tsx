import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { REGIONAL_IMAGES } from '../data/images';
import { ScoreRing } from '../components/civic/ScoreRing';
import { StatusBadge } from '../components/civic/StatusBadge';
import { Avatar } from '../components/civic/Avatar';
import { formatNumber, formatDate, formatTimeAgo } from '../lib/format';
import {
  PlusCircle,
  AlertTriangle,
  Compass,
  Award,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Users,
  ShieldCheck,
  FileCheck,
  Leaf,
  Clock,
  ChevronRight,
  TrendingUp,
  Download,
  Share2,
  Wrench
} from 'lucide-react';

interface CitizenDashboardPageProps {
  navigate: (path: string) => void;
}

export const CitizenDashboardPage: React.FC<CitizenDashboardPageProps> = ({ navigate }) => {
  const {
    currentUser,
    currentProfile,
    civicScores,
    activities,
    complaints,
    opportunities,
    achievements,
    citizenStats,
    joinOpportunity,
    leaveOpportunity,
  } = useCivicStore();

  const [activeTab, setActiveTab] = useState<'activities' | 'complaints' | 'achievements' | 'opportunities'>('activities');

  const userScore = civicScores[currentUser.id]?.total || 1020;
  const userActivities = activities.filter((a) => a.userId === currentUser.id);
  const userComplaints = complaints.filter((c) => c.citizenId === currentUser.id);

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-[#F6F8F7] pb-16">
      {/* 1. HEROIC CITIZEN IDENTITY BANNER (Bano Qabil Inspired Visual Header) */}
      <div className="relative overflow-hidden bg-[#0A192F] text-white">
        {/* Background Image with Dark Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={REGIONAL_IMAGES.heroChitralValley.src}
            alt="Chitral Mountains"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#0A192F]/90 to-[#0A192F]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* User Profile Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <Avatar
                  name={currentProfile.fullName}
                  size="xl"
                  className="w-20 h-20 sm:w-24 sm:h-24 text-2xl font-black ring-4 ring-emerald-500/50 shadow-2xl"
                />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#1F6B43] border-2 border-[#0A192F] flex items-center justify-center text-white" title="Verified Citizen Profile">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    {currentProfile.level || 'Community Leader'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-medium">
                    Top 2% in Lower Chitral
                  </span>
                  <span className="text-xs text-slate-400">
                    ID: <strong className="font-mono text-slate-200">MZ-8421</strong>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {greeting}, {currentProfile.fullName}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentProfile.locationName}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Active since September 2026</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/impact/new')}
                className="px-5 py-3 rounded-lg text-xs sm:text-sm font-bold bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-lg hover:shadow-emerald-900/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Verified Work</span>
              </button>

              <button
                onClick={() => navigate('/report')}
                className="px-4 py-3 rounded-lg text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Report Grievance</span>
              </button>

              <button
                onClick={() => navigate('/impact-report')}
                className="px-3.5 py-3 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Download Official PDF Certificate"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Impact Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        {/* 2. STATS & CIVIC SCORE OVERVIEW (Visual Cards Strip) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Civic Score Progress Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E3E8E6] p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F1B2D]">
                  Civic Reputation Score
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#1F6B43] bg-[#E8F2EC] px-2.5 py-0.5 rounded-full">
                Tier 5 Leader
              </span>
            </div>

            <div className="py-2">
              <ScoreRing score={userScore} highlightAddition={userScore > 1020 ? userScore - 1020 : null} />
            </div>

            <div className="pt-3 border-t border-[#E3E8E6] flex items-center justify-between text-xs">
              <span className="text-[#4B5A6B]">
                Next Rank: <strong className="text-[#0F1B2D]">Civic Champion (2,500 pts)</strong>
              </span>
              <button
                onClick={() => navigate('/leaderboard')}
                className="font-bold text-[#1F6B43] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Tehsil Rank #2</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4 Metric Counter Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Stat 1: Verified Activities */}
            <div className="bg-white rounded-2xl border border-[#E3E8E6] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#1F6B43] flex items-center justify-center border border-emerald-100">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-3xl font-black text-[#0F1B2D] tracking-tight">
                  {citizenStats.verifiedActivities}
                </div>
                <div className="text-xs font-bold text-[#0F1B2D] mt-0.5">
                  Verified Works
                </div>
                <div className="text-[11px] text-[#4B5A6B]">
                  100% AI Audited
                </div>
              </div>
            </div>

            {/* Stat 2: Community Projects */}
            <div className="bg-white rounded-2xl border border-[#E3E8E6] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1F5FA8] flex items-center justify-center border border-blue-100">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <div className="text-3xl font-black text-[#0F1B2D] tracking-tight">
                  {citizenStats.communityProjects}
                </div>
                <div className="text-xs font-bold text-[#0F1B2D] mt-0.5">
                  Projects Led
                </div>
                <div className="text-[11px] text-[#4B5A6B]">
                  Cleanliness & Water
                </div>
              </div>
            </div>

            {/* Stat 3: People Reached */}
            <div className="bg-white rounded-2xl border border-[#E3E8E6] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-3xl font-black text-[#0F1B2D] tracking-tight">
                  {citizenStats.peopleReached}
                </div>
                <div className="text-xs font-bold text-[#0F1B2D] mt-0.5">
                  People Reached
                </div>
                <div className="text-[11px] text-[#4B5A6B]">
                  In Drosh Tehsil
                </div>
              </div>
            </div>

            {/* Stat 4: Problems Resolved */}
            <div className="bg-white rounded-2xl border border-[#E3E8E6] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-3xl font-black text-[#0F1B2D] tracking-tight">
                  {citizenStats.problemsResolved} <span className="text-base text-slate-400 font-normal">/ {citizenStats.problemsReported}</span>
                </div>
                <div className="text-xs font-bold text-[#0F1B2D] mt-0.5">
                  Cases Resolved
                </div>
                <div className="text-[11px] text-[#174F32] font-semibold">
                  75% Resolution Rate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. MODERN TABBED CONSOLE */}
        <div className="bg-white rounded-2xl border border-[#E3E8E6] shadow-sm overflow-hidden">
          {/* Tab Navigation Bar */}
          <div className="border-b border-[#E3E8E6] px-6 pt-4 bg-[#F6F8F7]/50 flex flex-wrap items-center gap-2">
            {[
              { id: 'activities', label: 'My Verified Activities', count: userActivities.length, icon: Leaf },
              { id: 'complaints', label: 'Reported Grievances', count: userComplaints.length, icon: AlertTriangle },
              { id: 'achievements', label: 'Badges & Milestones', count: achievements.filter(a => a.earnedAt).length, icon: Award },
              { id: 'opportunities', label: 'Volunteer Campaigns', count: opportunities.length, icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3.5 px-4 font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#1F6B43] text-[#1F6B43]'
                      : 'border-transparent text-[#4B5A6B] hover:text-[#0F1B2D]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-[#1F6B43] text-white' : 'bg-[#E3E8E6] text-[#4B5A6B]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: MY VERIFIED ACTIVITIES */}
          {activeTab === 'activities' && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E3E8E6]">
                <div>
                  <h3 className="text-base font-bold text-[#0F1B2D]">
                    Verified Grassroots Actions
                  </h3>
                  <p className="text-xs text-[#4B5A6B]">
                    Every activity is verified with EXIF GPS matching, computer vision evidence audit, and participant counting.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/impact/new')}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-[#1F6B43] hover:bg-[#174F32] text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Submit New Activity</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userActivities.map((act) => (
                  <div
                    key={act.id}
                    className="group rounded-xl border border-[#E3E8E6] overflow-hidden bg-white hover:border-[#1F6B43] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo Header */}
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                        <img
                          src={act.evidence?.[0]?.url || REGIONAL_IMAGES.droshCleanlinessDrive.src}
                          alt={act.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                            {act.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-full bg-[#1F6B43] text-white text-[11px] font-black shadow">
                            +{act.points} pts
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-[11px] text-[#4B5A6B]">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{act.locationName}</span>
                          </span>
                          <span>•</span>
                          <span>{formatDate(act.date)}</span>
                        </div>

                        <h4 className="font-bold text-sm text-[#0F1B2D] group-hover:text-[#1F6B43] transition-colors line-clamp-1">
                          {act.title}
                        </h4>

                        <p className="text-xs text-[#4B5A6B] line-clamp-2 leading-relaxed">
                          {act.description}
                        </p>

                        <div className="pt-2 flex items-center justify-between text-[11px] border-t border-[#E3E8E6]">
                          <span className="text-[#4B5A6B]">
                            👥 <strong>{act.participants}</strong> Volunteers Mobilized
                          </span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>AI Verified</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        onClick={() => navigate(`/profile/muhammad-zulkaif`)}
                        className="w-full py-2 rounded-lg bg-[#F6F8F7] hover:bg-[#E8F2EC] text-[#0F1B2D] hover:text-[#1F6B43] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>View Verified Record</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MY REPORTED GRIEVANCES */}
          {activeTab === 'complaints' && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E3E8E6]">
                <div>
                  <h3 className="text-base font-bold text-[#0F1B2D]">
                    Public Problem Redressal & Works
                  </h3>
                  <p className="text-xs text-[#4B5A6B]">
                    Track municipal repair work orders filed with TMA Drosh and C&W Department.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/report')}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-[#1F5FA8] hover:bg-blue-800 text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Report New Defect</span>
                </button>
              </div>

              <div className="divide-y divide-[#E3E8E6] border border-[#E3E8E6] rounded-xl overflow-hidden bg-white">
                {userComplaints.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 hover:bg-[#F6F8F7] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#0F1B2D] bg-[#F6F8F7] px-2 py-0.5 rounded border border-[#E3E8E6]">
                          {c.trackingId}
                        </span>
                        <StatusBadge status={c.status} />
                        <span className="text-[11px] font-semibold text-[#4B5A6B]">
                          {c.category}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-[#0F1B2D]">
                        {c.title}
                      </h4>

                      <p className="text-xs text-[#4B5A6B] line-clamp-1">
                        {c.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#4B5A6B]">
                        <span>📍 {c.locationName}</span>
                        <span>•</span>
                        <span>Department: <strong>{c.departmentName || 'TMA Drosh'}</strong></span>
                        <span>•</span>
                        <span>Submitted: {formatDate(c.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => navigate(`/complaints/${c.trackingId}`)}
                        className="px-4 py-2 rounded-lg bg-[#0F1B2D] hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Live Timeline</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BADGES & MILESTONES */}
          {activeTab === 'achievements' && (
            <div className="p-6 space-y-6">
              <div className="pb-4 border-b border-[#E3E8E6]">
                <h3 className="text-base font-bold text-[#0F1B2D]">
                  Civic Badges & Earned Recognition
                </h3>
                <p className="text-xs text-[#4B5A6B]">
                  Recognizing leadership across environmental conservation, disaster response, and infrastructure advocacy.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {achievements.map((ach) => {
                  const isEarned = !!ach.earnedAt;
                  return (
                    <div
                      key={ach.id}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        isEarned
                          ? 'bg-gradient-to-b from-[#E8F2EC]/60 to-white border-[#1F6B43]/40 shadow-xs'
                          : 'bg-[#F6F8F7] border-[#E3E8E6] opacity-50'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-xs ${
                          isEarned ? 'bg-[#1F6B43] text-white' : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        <Award className="w-6 h-6" />
                      </div>
                      <h4 className="text-xs font-bold text-[#0F1B2D]">{ach.title}</h4>
                      <p className="text-[11px] text-[#4B5A6B] line-clamp-2 mt-1 leading-tight">
                        {ach.description}
                      </p>
                      <span className="text-[10px] font-bold block mt-2 uppercase tracking-wider text-[#174F32]">
                        {isEarned ? '✓ Earned' : 'Locked'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: VOLUNTEER CAMPAIGNS */}
          {activeTab === 'opportunities' && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E3E8E6]">
                <div>
                  <h3 className="text-base font-bold text-[#0F1B2D]">
                    Active Community Volunteer Drives
                  </h3>
                  <p className="text-xs text-[#4B5A6B]">
                    Join local Tehsil initiatives to earn bonus civic points and support community welfare.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/opportunities')}
                  className="text-xs font-bold text-[#1F6B43] hover:underline"
                >
                  View All Regional Drives →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-5 rounded-xl border border-[#E3E8E6] bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
                          {opp.category}
                        </span>
                        <span className="text-xs font-bold text-[#4B5A6B]">
                          {opp.filled} / {opp.volunteersNeeded} Volunteers
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-[#0F1B2D]">
                        {opp.title}
                      </h4>

                      <p className="text-xs text-[#4B5A6B] line-clamp-2">
                        {opp.description}
                      </p>

                      <div className="text-[11px] text-[#4B5A6B] pt-1">
                        📍 {opp.locationName}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        opp.isJoined ? leaveOpportunity(opp.id) : joinOpportunity(opp.id)
                      }
                      className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        opp.isJoined
                          ? 'bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/40'
                          : 'bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-xs'
                      }`}
                    >
                      {opp.isJoined ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#1F6B43]" />
                          <span>Joined Successfully</span>
                        </>
                      ) : (
                        <span>Join Volunteer Campaign</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
