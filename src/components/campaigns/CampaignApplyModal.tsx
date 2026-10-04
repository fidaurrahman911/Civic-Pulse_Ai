import React, { useState } from 'react';
import { ActiveCampaign } from '../../data/activeCampaignsData';
import { useCivicStore } from '../../store/useCivicStore';
import {
  X,
  CheckCircle2,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CampaignApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: ActiveCampaign | null;
  onSuccessJoin: (campaignId: string, role: string) => void;
}

export const CampaignApplyModal: React.FC<CampaignApplyModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onSuccessJoin,
}) => {
  const { currentProfile } = useCivicStore();

  const [role, setRole] = useState('General Field Volunteer');
  const [availability, setAvailability] = useState('Weekend Morning Shift (Full Session)');
  const [phone, setPhone] = useState('+92 345 9210084');
  const [note, setNote] = useState('');
  const [hasTools, setHasTools] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !campaign) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (_e) {}

      onSuccessJoin(campaign.id, role);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-xl border border-[#E3E8E6] shadow-2xl overflow-hidden my-auto animate-in zoom-in-95">
        {/* Top Header */}
        <div className="bg-[#0F1B2D] text-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Citizen Volunteer Application
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1.5 leading-snug">
                Join {campaign.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#E8F2EC] text-[#1F6B43] flex items-center justify-center mx-auto border-2 border-[#1F6B43]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#0F1B2D]">Application Confirmed!</h4>
            <p className="text-xs text-[#4B5A6B] max-w-sm mx-auto leading-relaxed">
              You are now an officially registered volunteer with campaign lead{' '}
              <strong>{campaign.lead.name}</strong>. See you at the upcoming assembly!
            </p>
            <div className="p-3 bg-[#F6F8F7] rounded-lg border border-[#E3E8E6] text-xs font-medium text-[#1F6B43]">
              📅 {campaign.nextSession.date} • 📍 {campaign.nextSession.meetingPoint}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
            {/* Applicant Profile Card */}
            <div className="p-3 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#4B5A6B] block">Applying as Citizen:</span>
                <span className="font-bold text-[#0F1B2D] text-sm">{currentProfile.fullName}</span>
                <span className="text-[11px] text-[#4B5A6B] block">{currentProfile.locationName}</span>
              </div>
              <span className="text-[10px] font-bold text-[#174F32] bg-[#E8F2EC] px-2 py-0.5 rounded border border-[#1F6B43]/30">
                Verified Citizen
              </span>
            </div>

            {/* Campaign Lead Assurance */}
            <div className="p-3 rounded-lg bg-[#FAF0E1] border border-[#B7791F]/30 text-[11px] text-[#8B5B16] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B7791F] shrink-0 mt-0.5" />
              <div>
                Campaign Lead <strong>{campaign.lead.name}</strong> provides all heavy safety equipment,
                gloves, and coordination on site.
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-[11px] font-bold text-[#0F1B2D] mb-1">
                Preferred Volunteer Role:
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] bg-white text-xs text-[#0F1B2D] focus:border-[#1F6B43] focus:outline-none"
              >
                <option value="General Field Volunteer">General Field Volunteer (Sweeping, Digging, Hauling)</option>
                <option value="Safety & Traffic Spotter">Safety & Traffic Spotter (Vehicle Safety & Cones)</option>
                <option value="Sorting & Recycling Specialist">Sorting & Recycling Specialist (Plastic Segregation)</option>
                <option value="Logistics & Hydration Coordinator">Logistics & Hydration Coordinator</option>
                <option value="First Aid & Emergency Support">First Aid & Emergency Support</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-[11px] font-bold text-[#0F1B2D] mb-1">
                Your Availability:
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] bg-white text-xs text-[#0F1B2D] focus:border-[#1F6B43] focus:outline-none"
              >
                <option value="Weekend Morning Shift (Full Session)">Weekend Morning Shift (Full Session)</option>
                <option value="Early 2-Hour Window">Early 2-Hour Window</option>
                <option value="Afternoon Cleanup & Stacking">Afternoon Cleanup & Stacking</option>
                <option value="Flexible / On-Call as Needed">Flexible / On-Call as Needed</option>
              </select>
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-[11px] font-bold text-[#0F1B2D] mb-1">
                WhatsApp / Phone Number for Session Updates:
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 345 0000000"
                className="w-full p-2 rounded-[6px] border border-[#E3E8E6] bg-white text-xs font-mono text-[#0F1B2D]"
              />
            </div>

            {/* Checkbox: Bringing Tools */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="hasTools"
                checked={hasTools}
                onChange={(e) => setHasTools(e.target.checked)}
                className="w-4 h-4 rounded border-[#E3E8E6] text-[#1F6B43] focus:ring-[#1F6B43]"
              />
              <label htmlFor="hasTools" className="text-[11px] text-[#4B5A6B] cursor-pointer">
                I can bring my own tools (shovel / rake / wheelbarrow / broom)
              </label>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-semibold text-[#4B5A6B] mb-1">
                Message to Campaign Lead (Optional):
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Bringing two university classmates with me"
                className="w-full p-2 rounded-[6px] border border-[#E3E8E6] bg-white text-xs text-[#0F1B2D]"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E3E8E6]">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-[6px] text-xs font-medium text-[#4B5A6B] hover:text-[#0F1B2D] bg-[#F6F8F7] hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>{isSubmitting ? 'Confirming...' : 'Confirm & Join Campaign'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
