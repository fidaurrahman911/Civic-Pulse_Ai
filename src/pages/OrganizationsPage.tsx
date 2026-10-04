import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { REGIONAL_IMAGES } from '../data/images';
import { Building2, PlusCircle, CheckCircle2, MapPin, Calendar, Users, FileCheck, X } from 'lucide-react';

interface OrganizationsPageProps {
  navigate: (path: string) => void;
  isDashboardView?: boolean;
}

export const OrganizationsPage: React.FC<OrganizationsPageProps> = ({
  navigate,
  isDashboardView = false,
}) => {
  const { organizations, campaigns, createCampaign } = useCivicStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Campaign Form State
  const [campTitle, setCampTitle] = useState('');
  const [campCategory, setCampCategory] = useState('Environment');
  const [campLocation, setCampLocation] = useState('Shishi Koh Valley, Drosh');
  const [campDate, setCampDate] = useState('2026-10-25');
  const [campVolunteersNeeded, setCampVolunteersNeeded] = useState(50);
  const [campDesc, setCampDesc] = useState('');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campTitle.trim()) return;

    createCampaign({
      orgId: 'org-rso',
      orgName: 'Regional Support Organization (RSO)',
      title: campTitle,
      category: campCategory,
      locationId: 'loc-drosh',
      locationName: campLocation,
      date: campDate,
      volunteersNeeded: Number(campVolunteersNeeded),
      description: campDesc,
    });

    setIsModalOpen(false);
    setCampTitle('');
    setCampDesc('');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8E6]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
            {isDashboardView ? 'Organization Leadership Desk' : 'Verified Community Partners'}
          </span>
          <h1 className="text-2xl font-bold text-[#0F1B2D] mt-1">
            Civil Society & Partner Organizations
          </h1>
          <p className="text-xs text-[#4B5A6B] mt-0.5">
            Regional organizations driving verifiable youth mobilization, environmental conservation, and social welfare in Lower Chitral.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] text-white hover:bg-[#174F32] flex items-center gap-1.5 shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Launch New Campaign</span>
        </button>
      </div>

      {/* FEATURED CAMPAIGN: RSO Tree Plantation Campaign (Drosh, 87 volunteers, 420 trees planted, 13 September 2026) */}
      <div className="p-6 rounded-lg bg-white border border-[#E3E8E6] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2.5 py-0.5 rounded">
            Featured Partner Campaign Showcase
          </span>
          <span className="text-xs text-[#4B5A6B]">Completed & Verified</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 items-center">
          <div className="md:col-span-4 rounded-[6px] overflow-hidden border border-[#E3E8E6] aspect-video">
            <img
              src={REGIONAL_IMAGES.treePlantationDrive.src}
              alt="Tree plantation campaign"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-8 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#0F1B2D]">
                Regional Support Organization (RSO)
              </span>
              <span className="text-[10px] text-[#1F6B43] font-semibold bg-[#E8F2EC] px-1.5 py-0.2 rounded">
                Verified NGO
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#0F1B2D]">
              Tree Plantation Campaign, Drosh
            </h2>
            <p className="text-[#4B5A6B] leading-relaxed">
              Mobilized 87 verified youth volunteers planting 420 native deodar and pine saplings across vulnerable riverbed buffer zones in Shishi Koh Valley with local forestry division alignment.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-2.5 rounded bg-[#F6F8F7] border border-[#E3E8E6]">
                <span className="text-[#4B5A6B] block text-[11px]">Volunteers Mobilized</span>
                <span className="font-bold text-[#0F1B2D] text-sm">87 Volunteers</span>
              </div>
              <div className="p-2.5 rounded bg-[#F6F8F7] border border-[#E3E8E6]">
                <span className="text-[#4B5A6B] block text-[11px]">Environmental Metric</span>
                <span className="font-bold text-[#1F6B43] text-sm">420 Trees Planted</span>
              </div>
              <div className="p-2.5 rounded bg-[#F6F8F7] border border-[#E3E8E6]">
                <span className="text-[#4B5A6B] block text-[11px]">Execution Date</span>
                <span className="font-bold text-[#0F1B2D] text-sm">13 September 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organizations Directory */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D]">
          Registered Civic Organizations ({organizations.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="p-5 rounded-lg bg-white border border-[#E3E8E6] shadow-xs flex flex-col justify-between space-y-3 text-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#1F5FA8]" />
                    <h4 className="font-bold text-sm text-[#0F1B2D]">{org.name}</h4>
                  </div>
                  {org.verified && (
                    <span className="text-[10px] font-semibold text-[#174F32] bg-[#E8F2EC] px-2 py-0.5 rounded">
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#1F5FA8] font-medium mt-0.5">{org.category}</p>
                <p className="text-[#4B5A6B] mt-2 leading-relaxed">{org.description}</p>
              </div>

              <div className="pt-3 border-t border-[#E3E8E6] flex items-center justify-between text-[11px] text-[#4B5A6B]">
                <span>📍 {org.location}</span>
                <span>👥 {org.totalVolunteersEngaged} Volunteers Engaged</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CAMPAIGN CREATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-[#E3E8E6] shadow-xl p-6 w-full max-w-lg text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
              <h3 className="text-sm font-bold text-[#0F1B2D]">
                Launch Volunteer Campaign as RSO
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#4B5A6B] font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  value={campTitle}
                  onChange={(e) => setCampTitle(e.target.value)}
                  placeholder="e.g. Autumn Clean Stream Action"
                  className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] text-xs bg-white text-[#0F1B2D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                    Category *
                  </label>
                  <select
                    value={campCategory}
                    onChange={(e) => setCampCategory(e.target.value)}
                    className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] text-xs bg-white text-[#0F1B2D]"
                  >
                    <option value="Environment">Environment</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Disaster Response">Disaster Response</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                    Volunteers Needed *
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={500}
                    value={campVolunteersNeeded}
                    onChange={(e) => setCampVolunteersNeeded(Number(e.target.value))}
                    className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] text-xs bg-white text-[#0F1B2D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                  Location in Tehsil *
                </label>
                <input
                  type="text"
                  required
                  value={campLocation}
                  onChange={(e) => setCampLocation(e.target.value)}
                  placeholder="e.g. Shishi Koh Valley, Drosh"
                  className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] text-xs bg-white text-[#0F1B2D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F1B2D] mb-1">
                  Description & Impact Target *
                </label>
                <textarea
                  rows={3}
                  required
                  value={campDesc}
                  onChange={(e) => setCampDesc(e.target.value)}
                  placeholder="Describe activities, equipment provided, and meeting landmark..."
                  className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] text-xs bg-white text-[#0F1B2D]"
                />
              </div>

              <div className="pt-3 border-t border-[#E3E8E6] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-[6px] text-xs font-semibold text-[#4B5A6B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] text-white hover:bg-[#174F32]"
                >
                  Publish Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
