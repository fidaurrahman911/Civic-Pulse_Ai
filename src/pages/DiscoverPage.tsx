import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { StatusBadge } from '../components/civic/StatusBadge';
import { DemoAiBadge } from '../components/civic/DemoAiBadge';
import { formatDate } from '../lib/format';
import { REGIONAL_IMAGES } from '../data/images';
import { Search, Filter, MapPin, Users, PlusCircle, ArrowRight } from 'lucide-react';

interface DiscoverPageProps {
  navigate: (path: string) => void;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({ navigate }) => {
  const { activities } = useCivicStore();
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');

  const categories = [
    'all',
    'Environment',
    'Education',
    'Disaster Response',
    'Infrastructure',
    'Health',
  ];

  const filtered = activities.filter((act) => {
    if (selectedCat !== 'all' && act.category !== selectedCat) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        act.title.toLowerCase().includes(q) ||
        act.description.toLowerCase().includes(q) ||
        act.locationName.toLowerCase().includes(q) ||
        act.userName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8E6]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
            Verified Community Stories
          </span>
          <h1 className="text-2xl font-bold text-[#0F1B2D] mt-1">
            Discover Civic Initiatives in Lower Chitral
          </h1>
          <p className="text-xs text-[#4B5A6B] mt-0.5">
            Explore community cleanup drives, tree plantations, student literacy camps, and disaster mitigation projects.
          </p>
        </div>

        <button
          onClick={() => navigate('/impact/new')}
          className="px-4 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white flex items-center gap-1.5 shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit Your Impact</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white rounded-lg border border-[#E3E8E6] text-xs shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-[#4B5A6B] mr-1">Category:</span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-2.5 py-1 rounded-[4px] border font-medium transition-colors ${
                selectedCat === c
                  ? 'bg-[#1F6B43] text-white border-[#1F6B43]'
                  : 'bg-white text-[#4B5A6B] border-[#E3E8E6] hover:bg-[#F6F8F7]'
              }`}
            >
              {c === 'all' ? 'All Activities' : c}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-[#4B5A6B] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activities..."
            className="w-full pl-8 pr-3 py-1.5 rounded-[4px] border border-[#E3E8E6] text-xs bg-white focus:outline-none focus:border-[#1F6B43]"
          />
        </div>
      </div>

      {/* Activity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((act) => (
          <div
            key={act.id}
            className="bg-white rounded-lg border border-[#E3E8E6] overflow-hidden shadow-xs flex flex-col justify-between"
          >
            {/* Image Preview */}
            <div className="relative aspect-video bg-[#F6F8F7] border-b border-[#E3E8E6] overflow-hidden">
              <img
                src={act.evidence?.[0]?.url || REGIONAL_IMAGES.treePlantationDrive.src}
                alt={act.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5">
                <StatusBadge status={act.status} />
              </div>
              <div className="absolute top-2.5 right-2.5 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                +{act.points} pts
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#1F6B43] tracking-wider">
                  {act.category}
                </span>
                <h3 className="text-base font-bold text-[#0F1B2D] leading-snug mt-0.5">
                  {act.title}
                </h3>
                <p className="text-xs text-[#4B5A6B] leading-relaxed line-clamp-3 mt-1.5">
                  {act.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E3E8E6] space-y-1.5 text-xs text-[#4B5A6B]">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#0F1B2D]">By {act.userName}</span>
                  <span>{formatDate(act.date)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>📍 {act.locationName}</span>
                  <span>👥 {act.participants} volunteers</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
