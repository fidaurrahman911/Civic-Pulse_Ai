import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { Avatar } from '../components/civic/Avatar';
import { StatusBadge } from '../components/civic/StatusBadge';
import { DemoAiBadge } from '../components/civic/DemoAiBadge';
import { formatNumber, formatDate } from '../lib/format';
import { getCitizenManagedDrives } from '../data/citizenWorkData';
import {
  Share2,
  FileDown,
  Award,
  CheckCircle2,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Check,
  Lightbulb,
  Wrench,
  Trash2,
  ArrowRight
} from 'lucide-react';

interface PublicProfilePageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const PublicProfilePage: React.FC<PublicProfilePageProps> = ({ slug, navigate }) => {
  const { profiles, civicScores, activities, achievements } = useCivicStore();
  const [copied, setCopied] = useState(false);

  const profile = profiles.find((p) => p.slug === slug) || profiles[0];
  const score = civicScores[profile.userId]?.total || 1020;
  const userActivities = activities.filter((a) => a.userId === profile.userId);
  const managedDrives = getCitizenManagedDrives(profile.userId, profile.fullName, profile.locationName);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Profile Header Hero */}
      <div className="p-6 md:p-8 rounded-lg bg-white border border-[#E3E8E6] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E3E8E6]">
          <div className="flex items-center gap-4">
            <Avatar name={profile.fullName} size="xl" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#0F1B2D]">{profile.fullName}</h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/30">
                  {profile.level}
                </span>
              </div>
              <p className="text-xs text-[#4B5A6B] mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1F6B43]" />
                <span>{profile.locationName}</span>
                <span>• Joined {formatDate(profile.joinedAt)}</span>
              </p>
            </div>
          </div>

          {/* Right Actions & Score */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 bg-[#F6F8F7] rounded-lg border border-[#E3E8E6] text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B5A6B] block">
                Total Civic Score
              </span>
              <span className="text-2xl font-bold font-tabular text-[#0F1B2D]">
                {formatNumber(score)} pts
              </span>
            </div>

            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 rounded-[6px] text-xs font-semibold bg-white border border-[#E3E8E6] hover:bg-[#F6F8F7] text-[#0F1B2D] flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#1F6B43]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share Profile'}</span>
            </button>

            <button
              onClick={() => navigate('/impact-report')}
              className="px-4 py-2.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Civic Impact Report</span>
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-[#4B5A6B] leading-relaxed mt-4 max-w-3xl">
          {profile.bio}
        </p>

        {/* Public Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-[#E3E8E6] text-xs">
          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Drives Managed</span>
            <span className="text-lg font-bold font-tabular text-[#0F1B2D]">
              {managedDrives.length} Campaigns
            </span>
          </div>
          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Verified Activities</span>
            <span className="text-lg font-bold font-tabular text-[#1F6B43]">
              {userActivities.length || managedDrives.length * 3} Verified
            </span>
          </div>
          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Volunteer Mobilization</span>
            <span className="text-lg font-bold font-tabular text-[#0F1B2D]">
              {managedDrives.reduce((acc, d) => acc + d.volunteersMobilized, 0) || 120}+ People
            </span>
          </div>
          <div>
            <span className="text-[#4B5A6B] block text-[11px]">Verification Attestation</span>
            <span className="text-xs font-bold text-[#174F32] flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1F6B43]" />
              AI & TMA Field Audit
            </span>
          </div>
        </div>
      </div>

      {/* Community Drives & Cleanliness Campaigns Section */}
      <div className="p-6 md:p-8 rounded-lg bg-white border border-[#E3E8E6] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E8E6] gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
              Civic Leadership Portfolio
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0F1B2D] mt-1">
              Community Drives & Cleanliness Campaigns Managed
            </h3>
            <p className="text-xs text-[#4B5A6B] mt-0.5">
              Documented volunteer drives, work methodologies, and actionable blueprints to replicate these civic models.
            </p>
          </div>

          <button
            onClick={() => navigate('/impact/new')}
            className="px-3.5 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white flex items-center gap-1.5 self-start sm:self-center transition-colors cursor-pointer"
          >
            <span>+ Organize Similar Drive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-6 divide-y divide-[#E3E8E6]">
          {managedDrives.map((drive, idx) => (
            <div key={drive.id} className={`${idx > 0 ? 'pt-6' : ''} space-y-4 text-xs`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[10px] uppercase text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
                      {drive.category}
                    </span>
                    <span className="text-[11px] font-semibold text-[#4B5A6B]">
                      Role: {drive.role}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#0F1B2D]">{drive.title}</h4>
                  <p className="text-xs text-[#4B5A6B]">
                    📍 {drive.location} • 📅 {drive.dateCompleted} • 👥 {drive.volunteersMobilized} Volunteers Mobilized
                  </p>
                </div>

                {drive.imageUrl && (
                  <img
                    src={drive.imageUrl}
                    alt={drive.title}
                    className="w-full sm:w-40 h-24 rounded-lg object-cover border border-[#E3E8E6] shrink-0"
                  />
                )}
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {drive.impactMetrics.map((metric, mIdx) => (
                  <div key={mIdx} className="p-2.5 rounded bg-[#F6F8F7] border border-[#E3E8E6]">
                    <span className="text-[10px] text-[#4B5A6B] uppercase font-semibold block">
                      {metric.label}
                    </span>
                    <span className="font-bold text-[#0F1B2D] text-xs mt-0.5 block font-tabular">
                      {metric.metric}
                    </span>
                  </div>
                ))}
              </div>

              {/* Work Done Narrative */}
              <div className="p-3.5 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] space-y-1.5">
                <span className="font-bold text-[#0F1B2D] block">
                  Detailed Work Conducted:
                </span>
                <p className="text-[#4B5A6B] leading-relaxed">
                  {drive.whatHeDid || drive.summary}
                </p>

                {drive.howToReplicate?.toolsRequired && (
                  <div className="pt-2 border-t border-[#E3E8E6] flex flex-wrap items-center gap-1 text-[10px]">
                    <span className="font-semibold text-[#4B5A6B] mr-1">Tools & Equipment:</span>
                    {drive.howToReplicate.toolsRequired.map((tool, tIdx) => (
                      <span key={tIdx} className="bg-white px-2 py-0.5 rounded border border-[#E3E8E6] text-[#0F1B2D]">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* How to Replicate Box */}
              {drive.howToReplicate && (
                <div className="p-4 rounded-lg bg-[#FAF0E1] border border-[#B7791F]/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B5B16]">
                    <Lightbulb className="w-4 h-4 text-[#B7791F]" />
                    <span>How You Can Replicate This Drive:</span>
                  </div>
                  <div className="space-y-2 text-xs text-[#6B470F]">
                    {drive.howToReplicate.steps?.map((step) => (
                      <div key={step.stepNumber} className="space-y-0.5">
                        <span className="font-bold text-[#3A2606]">Step {step.stepNumber}: {step.title}</span>
                        <p className="text-[11px] text-[#6B470F] pl-3 leading-relaxed">{step.description}</p>
                        {step.practicalTip && (
                          <p className="text-[10px] text-[#8B5B16] font-medium pl-3">💡 Tip: {step.practicalTip}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Verified Activity Timeline */}
      <div className="p-6 md:p-8 rounded-lg bg-white border border-[#E3E8E6] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D]">
              Verified Civic Contribution Record
            </h3>
            <p className="text-xs text-[#4B5A6B] mt-0.5">
              Official timestamped activity logs attested by municipal officers.
            </p>
          </div>
          <DemoAiBadge customText="Verified by CivicPulse (demo)" />
        </div>

        <div className="divide-y divide-[#E3E8E6]">
          {userActivities.length === 0 ? (
            <div className="py-6 text-xs text-[#4B5A6B]">
              Detailed activity records verified through field logs.
            </div>
          ) : (
            userActivities.map((act) => (
              <div key={act.id} className="py-4 space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#0F1B2D]">{act.title}</h4>
                      <span className="text-[10px] font-semibold text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded">
                        +{act.points} pts
                      </span>
                      <span className="text-[10px] text-[#4B5A6B] border border-[#E3E8E6] px-1.5 py-0.2 rounded">
                        {act.category}
                      </span>
                    </div>
                    <p className="text-[#4B5A6B] mt-1 leading-relaxed">{act.description}</p>
                  </div>
                </div>

                {act.evidence && act.evidence.length > 0 && (
                  <div className="flex gap-2 pt-1">
                    {act.evidence.map((ev) => (
                      <img
                        key={ev.id}
                        src={ev.url}
                        alt={ev.name}
                        className="w-20 h-16 rounded object-cover border border-[#E3E8E6]"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-[11px] text-[#4B5A6B] pt-1">
                  <span>📍 {act.locationName}</span>
                  <span>👥 {act.participants} volunteers verified</span>
                  <span>📅 {formatDate(act.date)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
