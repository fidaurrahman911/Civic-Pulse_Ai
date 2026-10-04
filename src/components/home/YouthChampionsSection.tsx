import React from 'react';
import { useCivicStore } from '../../store/useCivicStore';
import { Avatar } from '../civic/Avatar';
import { Award, ArrowRight, ShieldCheck, TreePine, MapPin, Sparkles } from 'lucide-react';

interface YouthChampionsSectionProps {
  navigate: (path: string) => void;
}

export const YouthChampionsSection: React.FC<YouthChampionsSectionProps> = ({ navigate }) => {
  const { profiles, civicScores } = useCivicStore();

  // Top 4 champions
  const champions = profiles.slice(0, 4);

  return (
    <section className="bg-[#F6F8F7] py-16 border-t border-[#E3E8E6]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/20 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#1F6B43]" />
              <span>Chitral Youth Hall of Fame</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1B2D]">
              Leading <span className="text-[#1F6B43]">Civic Champions</span> of Lower Chitral
            </h2>
            <p className="text-sm text-[#4B5A6B] max-w-2xl">
              Meet the community leaders, students, and volunteers driving tree plantations, flood defense, and civic accountability in Drosh and surrounding valleys.
            </p>
          </div>

          <button
            onClick={() => navigate('/leaderboard')}
            className="px-5 py-2.5 rounded-lg bg-white border border-[#E3E8E6] hover:border-[#1F6B43] text-[#0F1B2D] font-bold text-xs shadow-xs hover:shadow transition-all flex items-center gap-2 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>View Full Leaderboard (30+ Champions)</span>
            <ArrowRight className="w-4 h-4 text-[#1F6B43]" />
          </button>
        </div>

        {/* 4 Champion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {champions.map((profile, i) => {
            const score = civicScores[profile.userId]?.total || 900;
            const rank = i + 1;

            return (
              <div
                key={profile.userId}
                className="bg-white rounded-xl border border-[#E3E8E6] p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Rank Badge */}
                <div className="absolute top-4 right-4 text-xs font-black px-2 py-0.5 rounded-full bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/30">
                  #{rank} in Chitral
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={profile.fullName} size="lg" className="border-2 border-[#1F6B43]" />
                    <div>
                      <h3 className="font-bold text-base text-[#0F1B2D] group-hover:text-[#1F6B43] transition-colors">
                        {profile.fullName}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#4B5A6B]">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{profile.locationName}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#4B5A6B] line-clamp-2 leading-relaxed">
                    {profile.bio}
                  </p>

                  <div className="p-3 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Civic Score</div>
                      <div className="text-lg font-black text-[#1F6B43]">{score} pts</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Reputation Tier</div>
                      <div className="text-xs font-bold text-[#0F1B2D]">{profile.level || 'Active Citizen'}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E3E8E6]">
                  <button
                    onClick={() => navigate(`/profile/${profile.userId}`)}
                    className="w-full py-2 rounded-lg bg-[#F6F8F7] group-hover:bg-[#1F6B43] text-[#0F1B2D] group-hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Verified Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
