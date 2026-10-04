import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { Avatar } from '../components/civic/Avatar';
import { SEED_DISTRICT_STATS, SEED_LEADERBOARD_ENTRIES } from '../data/seedData';
import { formatNumber } from '../lib/format';
import { Search, Trophy, Medal, Award, Filter, ArrowUpRight, Sparkles, Lightbulb } from 'lucide-react';
import { CitizenWorkModal } from '../components/civic/CitizenWorkModal';
import { getCitizenWorkProfile, CitizenWorkProfile } from '../data/citizenWorkData';

interface LeaderboardPageProps {
  navigate: (path: string) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ navigate }) => {
  const { currentUser, civicScores, currentProfile } = useCivicStore();
  const [scope, setScope] = useState<'area' | 'district' | 'province'>('district');
  const [search, setSearch] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<CitizenWorkProfile | null>(null);

  const handleSelectCitizen = (userId: string, name: string) => {
    const p = getCitizenWorkProfile(userId || name);
    setSelectedProfile(p);
  };

  const currentZulkaifScore = civicScores['user-mz']?.total || 1020;

  // Build dynamic leaderboard with live score for Zulkaif
  const entries = SEED_LEADERBOARD_ENTRIES.map((entry) => {
    if (entry.userId === 'user-mz') {
      return {
        ...entry,
        score: currentZulkaifScore,
      };
    }
    return entry;
  })
    .sort((a, b) => b.score - a.score)
    .map((e, idx) => ({ ...e, rank: idx + 1 }));

  const filtered = entries.filter((e) => {
    if (search) {
      const q = search.toLowerCase();
      return e.name.toLowerCase().includes(q) || e.location.toLowerCase().includes(q);
    }
    return true;
  });

  const top3 = filtered.slice(0, 3);
  const remaining = filtered.slice(3);

  const stats = SEED_DISTRICT_STATS[scope];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8E6]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
            Civic Merit & Recognition
          </span>
          <h1 className="text-2xl font-bold text-[#0F1B2D] mt-1">
            Top Civic Contributors & Community Leaders
          </h1>
          <p className="text-xs text-[#4B5A6B] mt-0.5">
            Public leaderboard acknowledging verified volunteer engagement, problem reporting, and grassroots impact.
          </p>
        </div>

        {/* Scope Filter Tabs (Section 8.6) */}
        <div className="flex rounded-[6px] border border-[#E3E8E6] p-0.5 bg-[#F6F8F7] text-xs">
          <button
            onClick={() => setScope('area')}
            className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors ${
              scope === 'area'
                ? 'bg-white text-[#0F1B2D] shadow-2xs font-semibold'
                : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
            }`}
          >
            My Area (Drosh)
          </button>
          <button
            onClick={() => setScope('district')}
            className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors ${
              scope === 'district'
                ? 'bg-white text-[#0F1B2D] shadow-2xs font-semibold'
                : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
            }`}
          >
            My District (Lower Chitral)
          </button>
          <button
            onClick={() => setScope('province')}
            className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors ${
              scope === 'province'
                ? 'bg-white text-[#0F1B2D] shadow-2xs font-semibold'
                : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
            }`}
          >
            My Province (KP)
          </button>
        </div>
      </div>

      {/* Scoped Statistics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] text-[#4B5A6B] block">Registered Citizens</span>
          <span className="text-xl font-bold font-tabular text-[#0F1B2D] mt-0.5 block">
            {formatNumber(stats.registeredCitizens)}
          </span>
          <span className="text-[10px] text-[#4B5A6B]">{stats.scope}</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] text-[#4B5A6B] block">Verified Activities</span>
          <span className="text-xl font-bold font-tabular text-[#0F1B2D] mt-0.5 block">
            {formatNumber(stats.verifiedActivities)}
          </span>
          <span className="text-[10px] text-[#4B5A6B]">{stats.scope}</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] text-[#4B5A6B] block">Problems Reported</span>
          <span className="text-xl font-bold font-tabular text-[#0F1B2D] mt-0.5 block">
            {formatNumber(stats.problemsReported)}
          </span>
          <span className="text-[10px] text-[#4B5A6B]">{stats.scope}</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#E3E8E6] shadow-2xs">
          <span className="text-[11px] text-[#4B5A6B] block">Problems Resolved</span>
          <span className="text-xl font-bold font-tabular text-[#1F6B43] mt-0.5 block">
            {formatNumber(stats.problemsResolved)}
          </span>
          <span className="text-[10px] text-[#174F32] font-medium">
            {Math.round((stats.problemsResolved / stats.problemsReported) * 100)}% resolution rate
          </span>
        </div>
      </div>

      {/* Helpful Hint on Inspecting Citizen Work & Cleanliness Drives */}
      <div className="p-3.5 rounded-lg bg-[#E8F2EC]/60 border border-[#1F6B43]/20 flex items-center justify-between gap-3 text-xs text-[#174F32]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#1F6B43] shrink-0" />
          <span>
            <strong>Inspect Community Work & Cleanliness Drives:</strong> Click on any citizen below to see their verified work, what kind of cleanliness drives they managed, and get step-by-step action guides so you can replicate their impact in your area.
          </span>
        </div>
      </div>

      {/* TOP THREE PODIUM TREATMENT (Section 8.6: Large numerals 01/02/03) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {top3.map((entry, index) => {
          const isZulkaif = entry.userId === 'user-mz';
          const numerals = ['01', '02', '03'];

          return (
            <div
              key={entry.userId}
              onClick={() => handleSelectCitizen(entry.userId, entry.name)}
              className={`p-6 rounded-lg border text-center relative transition-all cursor-pointer hover:shadow-md hover:border-[#1F6B43]/60 group ${
                isZulkaif
                  ? 'bg-[#E8F2EC]/40 border-[#1F6B43] shadow-xs ring-1 ring-[#1F6B43]'
                  : 'bg-white border-[#E3E8E6] shadow-2xs'
              }`}
            >
              <div className="text-3xl font-extrabold font-tabular text-[#4B5A6B]/30 mb-2">
                {numerals[index]}
              </div>

              <Avatar name={entry.name} size="lg" className="mx-auto mb-3" />

              <h3 className="text-base font-bold text-[#0F1B2D] flex items-center justify-center gap-1.5 group-hover:text-[#1F6B43] transition-colors">
                <span>{entry.name}</span>
                {isZulkaif && (
                  <span className="text-[10px] font-bold text-white bg-[#1F6B43] px-1.5 py-0.2 rounded">
                    YOU
                  </span>
                )}
              </h3>

              <p className="text-xs text-[#4B5A6B] mt-0.5">{entry.location}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F6F8F7] text-[#0F1B2D] border border-[#E3E8E6]">
                {entry.level}
              </span>

              <div className="mt-4 pt-4 border-t border-[#E3E8E6]">
                <span className="text-2xl font-bold font-tabular text-[#0F1B2D]">
                  {formatNumber(entry.score)}
                </span>
                <span className="text-xs text-[#4B5A6B] ml-1">Civic Points</span>
              </div>

              <div className="mt-3 text-[11px] text-[#1F6B43] font-semibold flex items-center justify-center gap-1 group-hover:underline">
                <span>Inspect Work & Drives</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* SEARCH & RANKED LIST */}
      <div className="bg-white rounded-lg border border-[#E3E8E6] overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E3E8E6] flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-[#4B5A6B] absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ranked contributors..."
              className="w-full pl-9 pr-3 py-1.5 rounded-[6px] border border-[#E3E8E6] text-xs focus:outline-none focus:border-[#1F6B43]"
            />
          </div>
          <span className="text-xs text-[#4B5A6B] font-medium">
            Showing top {filtered.length} contributors • Click any to view work
          </span>
        </div>

        <div className="divide-y divide-[#E3E8E6] text-xs">
          {remaining.map((entry) => {
            const isUser = entry.userId === currentUser.id;

            return (
              <div
                key={entry.userId}
                onClick={() => handleSelectCitizen(entry.userId, entry.name)}
                className={`p-3.5 flex items-center justify-between gap-4 transition-colors cursor-pointer group ${
                  isUser ? 'bg-[#E8F2EC]/50 font-semibold' : 'hover:bg-[#F6F8F7]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-bold font-tabular text-[#4B5A6B]">
                    {entry.rank}
                  </span>
                  <Avatar name={entry.name} size="sm" />
                  <div>
                    <span className="font-bold text-[#0F1B2D] group-hover:text-[#1F6B43] transition-colors">
                      {entry.name}
                    </span>
                    <span className="text-[11px] text-[#4B5A6B] block">{entry.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="text-[11px] text-[#4B5A6B] hidden sm:inline">
                    {entry.level}
                  </span>
                  <div className="text-right">
                    <span className="font-bold font-tabular text-[#0F1B2D] block">
                      {formatNumber(entry.score)}
                    </span>
                    <span className="text-[10px] text-[#4B5A6B]">points</span>
                  </div>
                  <div className="text-[11px] text-[#1F6B43] font-medium hidden sm:flex items-center gap-0.5 group-hover:underline">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
