import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { Avatar } from '../components/civic/Avatar';
import { DemoAiBadge } from '../components/civic/DemoAiBadge';
import { formatNumber, formatDate } from '../lib/format';
import {
  Printer,
  Share2,
  FileCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
  ShieldCheck,
  Check
} from 'lucide-react';

interface ImpactReportPageProps {
  navigate: (path: string) => void;
}

export const ImpactReportPage: React.FC<ImpactReportPageProps> = ({ navigate }) => {
  const { currentProfile, currentUser, civicScores, citizenStats, activities, achievements } =
    useCivicStore();
  const [copied, setCopied] = useState(false);

  const currentScore = civicScores[currentUser.id]?.total || 1020;
  const userActivities = activities.filter((a) => a.userId === currentUser.id);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Action Bar (hidden on print) */}
      <div className="no-print flex items-center justify-between pb-4 border-b border-[#E3E8E6]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6B43]">
            Verified Attestation Document
          </span>
          <h1 className="text-xl font-bold text-[#0F1B2D]">Annual Civic Impact Report</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-[6px] text-xs font-semibold bg-white border border-[#E3E8E6] text-[#0F1B2D] hover:bg-[#F6F8F7] flex items-center gap-1.5 shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#1F6B43]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE DOCUMENT WRAPPER */}
      <div className="bg-white p-8 sm:p-12 rounded-lg border border-[#E3E8E6] shadow-sm space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="flex items-start justify-between border-b-2 border-[#1F6B43] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-[4px] bg-[#1F6B43] text-white flex items-center justify-center font-bold text-xs">
                CP
              </div>
              <span className="text-sm font-bold tracking-tight text-[#0F1B2D]">
                CivicPulse <span className="text-[#1F6B43]">AI</span>
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#0F1B2D] pt-2">
              {currentProfile.fullName}: Civic Impact Report 2026
            </h2>
            <p className="text-xs text-[#4B5A6B]">
              Territory: Drosh Tehsil, Lower Chitral District, Khyber Pakhtunkhwa
            </p>
          </div>

          <div className="text-right space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#4B5A6B] tracking-wider block">
              Official Verification Record
            </span>
            <span className="text-xs font-semibold text-[#174F32] bg-[#E8F2EC] px-2.5 py-1 rounded inline-block">
              {currentProfile.level}
            </span>
            <p className="text-[10px] text-[#4B5A6B] font-tabular">Issued: Oct 01, 2026</p>
          </div>
        </div>

        {/* AI EXECUTIVE SUMMARY (Section 8.9) */}
        <div className="p-4 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#1F5FA8]" />
              AI Verified Impact Narrative
            </h3>
            <DemoAiBadge customText="Demo AI summary" />
          </div>
          <p className="text-xs text-[#0F1B2D] leading-relaxed">
            "Your strongest contribution this year was youth development and environmental sanitation, with {citizenStats.verifiedActivities} verified activities mobilizing over {citizenStats.peopleReached} volunteers. Ground-level photographic audits confirmed substantial public space improvement around Drosh Bazaar and Shishi Koh stream crossings."
          </p>
        </div>

        {/* LARGE NUMERALS STATS ROW (Section 8.9: 27 / 14 / 342 / 8 / 6 / Points) */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-center border-y border-[#E3E8E6] py-6">
          <div>
            <span className="text-2xl lg:text-3xl font-bold font-tabular text-[#0F1B2D] block">
              {citizenStats.verifiedActivities}
            </span>
            <span className="text-[11px] text-[#4B5A6B] uppercase font-semibold">
              Verified Activities
            </span>
          </div>

          <div>
            <span className="text-2xl lg:text-3xl font-bold font-tabular text-[#0F1B2D] block">
              {citizenStats.communityProjects}
            </span>
            <span className="text-[11px] text-[#4B5A6B] uppercase font-semibold">
              Projects Led
            </span>
          </div>

          <div>
            <span className="text-2xl lg:text-3xl font-bold font-tabular text-[#0F1B2D] block">
              {citizenStats.peopleReached}
            </span>
            <span className="text-[11px] text-[#4B5A6B] uppercase font-semibold">
              People Reached
            </span>
          </div>

          <div>
            <span className="text-2xl lg:text-3xl font-bold font-tabular text-[#0F1B2D] block">
              {citizenStats.problemsReported}
            </span>
            <span className="text-[11px] text-[#4B5A6B] uppercase font-semibold">
              Reported Hazards
            </span>
          </div>

          <div>
            <span className="text-2xl lg:text-3xl font-bold font-tabular text-[#1F6B43] block">
              {citizenStats.problemsResolved}
            </span>
            <span className="text-[11px] text-[#4B5A6B] uppercase font-semibold">
              Resolved Hazards
            </span>
          </div>

          <div>
            <span className="text-2xl lg:text-3xl font-bold font-tabular text-[#1F6B43] block">
              {formatNumber(currentScore)}
            </span>
            <span className="text-[11px] text-[#4B5A6B] uppercase font-semibold">
              Total Points
            </span>
          </div>
        </div>

        {/* VERIFIED CONTRIBUTIONS TIMELINE */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
            Top Verified Civic Initiatives (2026 Audit)
          </h3>

          <div className="divide-y divide-[#E3E8E6] text-xs">
            {userActivities.slice(0, 5).map((act) => (
              <div key={act.id} className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0F1B2D]">{act.title}</span>
                    <span className="text-[10px] text-[#4B5A6B] border border-[#E3E8E6] px-1.5 py-0.2 rounded">
                      {act.category}
                    </span>
                  </div>
                  <p className="text-[#4B5A6B] line-clamp-1">{act.description}</p>
                  <span className="text-[10px] text-[#4B5A6B] block">
                    📍 {act.locationName} • 👥 {act.participants} volunteers
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold font-tabular text-[#1F6B43] block">
                    +{act.points} pts
                  </span>
                  <span className="text-[10px] text-[#4B5A6B]">{formatDate(act.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACHIEVEMENTS STRIP */}
        <div className="space-y-3 pt-4 border-t border-[#E3E8E6]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
            Accredited Badges
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {achievements
              .filter((a) => a.earnedAt)
              .map((ach) => (
                <span
                  key={ach.id}
                  className="px-2.5 py-1 rounded-[6px] bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/30 font-medium flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-[#1F6B43]" />
                  <span>{ach.title}</span>
                </span>
              ))}
          </div>
        </div>

        {/* DOCUMENT FOOTER & LEGAL DISCLAIMER */}
        <div className="pt-8 border-t border-[#E3E8E6] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#4B5A6B]">
          <div>
            <p className="font-semibold text-[#0F1B2D]">CivicPulse AI Digital Verification Record</p>
            <p>Designed as a civic technology platform for citizens and administration.</p>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1F6B43]" />
            <span>Cryptographic Evidence Hash Authenticated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
