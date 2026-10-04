import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { civicAi } from '../lib/ai';
import { ActivityCategory, EvidenceItem, ImpactVerification } from '../types';
import { REGIONAL_IMAGES } from '../data/images';
import { ConfidenceMeter } from '../components/civic/ConfidenceMeter';
import { IntegrityChecklist } from '../components/civic/IntegrityChecklist';
import { DemoAiBadge } from '../components/civic/DemoAiBadge';
import {
  Upload,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  FileCheck,
  Award,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  X,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ImpactNewPageProps {
  navigate: (path: string) => void;
}

export const ImpactNewPage: React.FC<ImpactNewPageProps> = ({ navigate }) => {
  const {
    currentUser,
    currentProfile,
    submitImpactActivity,
    demoSettings,
    civicScores,
  } = useCivicStore();

  const currentScore = civicScores[currentUser.id]?.total || 1020;

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ActivityCategory>('Environment');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('Drosh Main Bazaar, Lower Chitral');
  const [date, setDate] = useState('2026-09-24');
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Workflow State: 'form' | 'analyzing' | 'result'
  const [stage, setStage] = useState<'form' | 'analyzing' | 'result'>('form');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStepLabel, setCurrentStepLabel] = useState('Preparing evidence payload...');
  const [verificationResult, setVerificationResult] = useState<ImpactVerification | null>(null);
  const [submissionSummary, setSubmissionSummary] = useState<{
    pointsAdded: number;
    newTotal: number;
    unlockedAchievement?: any;
  } | null>(null);

  const categories: ActivityCategory[] = [
    'Environment',
    'Education',
    'Health',
    'Technology',
    'Sports',
    'Infrastructure',
    'Social Welfare',
    'Disaster Response',
    'Youth Development',
    'Other',
  ];

  // Quick Demo Helpers
  const handleFillExample = () => {
    setTitle('Cleanliness Campaign at Drosh Bazaar');
    setCategory('Environment');
    setDescription(
      'Organized a cleanliness campaign with 25 volunteers around the main bazaar. Collected and segregated over 1.2 tons of plastic waste with Tehsil Municipal Administration coordination.'
    );
    setLocationName('Drosh Main Bazaar, Lower Chitral');
    setDate('2026-09-24');
    setEvidenceList([
      {
        id: `ev-${Date.now()}-1`,
        kind: 'photo',
        name: 'drosh_bazaar_cleanup_squad.jpg',
        sizeKb: 1420,
        url: REGIONAL_IMAGES.droshCleanlinessDrive.src,
        hash: 'hash_drosh_clean_01',
      },
      {
        id: `ev-${Date.now()}-2`,
        kind: 'photo',
        name: 'waste_segregation_tma.jpg',
        sizeKb: 1850,
        url: REGIONAL_IMAGES.droshBazaar.src,
        hash: 'hash_drosh_clean_02',
      },
    ]);
    setUploadError(null);
  };

  // Test Mismatch Example (Unrelated car photo claiming environmental cleanup)
  const handleFillMismatchExample = () => {
    setTitle('Riverbank Plastic Waste Cleanup');
    setCategory('Environment');
    setDescription(
      'Collected 50 bags of plastic waste along the Chitral riverbank with local youth volunteers.'
    );
    setLocationName('Drosh Riverside, Lower Chitral');
    setDate('2026-09-24');
    setEvidenceList([
      {
        id: `ev-${Date.now()}-mismatch`,
        kind: 'photo',
        name: 'random_car_parking.jpg',
        sizeKb: 1120,
        url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
        hash: 'hash_unrelated_car_photo',
      },
    ]);
    setUploadError(null);
  };

  // Mock File Upload
  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (demoSettings.simulateUploadFailure) {
      setUploadError('Simulated network failure: Evidence upload failed. Please retry.');
      return;
    }

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const newEv: EvidenceItem = {
          id: `ev-${Date.now()}`,
          kind: 'photo',
          name: file.name,
          sizeKb: Math.round(file.size / 1024),
          url: dataUrl,
          hash: `hash_${file.name}_${file.size}`,
        };
        setEvidenceList((prev) => [...prev, newEv]);
        setUploadError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeEvidence = (id: string) => {
    setEvidenceList((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Use default sample image if user didn't attach any
    const finalEvidence =
      evidenceList.length > 0
        ? evidenceList
        : [
            {
              id: `ev-${Date.now()}-default`,
              kind: 'photo' as const,
              name: 'drosh_cleanup_field_photo.jpg',
              sizeKb: 1650,
              url: REGIONAL_IMAGES.droshCleanlinessDrive.src,
              hash: 'hash_drosh_cleanup_field',
            },
          ];

    setStage('analyzing');
    setCurrentStepIndex(0);

    try {
      const verification = await civicAi.verifyImpact(
        {
          title,
          category,
          description,
          locationName,
          date,
          evidence: finalEvidence,
          forceDuplicateWarning: demoSettings.forceDuplicateWarning,
        },
        (stepIndex, stepLabel) => {
          setCurrentStepIndex(stepIndex);
          setCurrentStepLabel(stepLabel);
        }
      );

      setVerificationResult(verification);

      // Commit to store
      const result = submitImpactActivity({
        title,
        category,
        description,
        locationName,
        date,
        evidence: finalEvidence,
        verification,
      });

      setSubmissionSummary({
        pointsAdded: result.pointsAdded,
        newTotal: result.newTotal,
        unlockedAchievement: result.unlockedAchievement,
      });

      // Celebration confetti only for successful genuine verified score
      const isMismatch = (verification.confidence < 30) || verification.impactLevel === 'Invalid' || verification.civicImpactScore <= 20;
      if (!isMismatch && result.pointsAdded > 15) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1F6B43', '#174F32', '#B7791F'],
        });
      }

      setStage('result');
    } catch (err) {
      console.error(err);
      setStage('form');
    }
  };

  const stepsList = [
    'Visual evidence match & object detection',
    'Category & description relevance verification',
    'Duplicate and recycled evidence detection',
    'Metadata authenticity & EXIF consistency',
    'Location and geographic consistency verification',
    'Civic impact tier & score allocation audit',
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb / Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E8E6] mb-6 gap-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5A6B]">
            Citizen Impact Verification • Journey A
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F1B2D] mt-0.5">
            Submit Verified Civic Work
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleFillExample}
            className="px-2.5 py-1.5 rounded-[6px] text-xs font-semibold bg-[#E8F2EC] text-[#174F32] hover:bg-[#d5e7dc] border border-[#1F6B43]/30 transition-colors flex items-center gap-1.5"
            title="Auto-fill with Drosh Bazaar Cleanliness Campaign demo data (High Impact)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1F6B43]" />
            <span>Fill Valid Cleanup</span>
          </button>
          <button
            type="button"
            onClick={handleFillMismatchExample}
            className="px-2.5 py-1.5 rounded-[6px] text-xs font-semibold bg-[#FDF2F2] text-[#B3261E] hover:bg-[#fae8e8] border border-[#B3261E]/30 transition-colors flex items-center gap-1.5"
            title="Test Rule 1: Uploading unrelated car photo for an environmental claim (Low Confidence / 0-15 pts)"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#B3261E]" />
            <span>Test Mismatch (Car Photo)</span>
          </button>
        </div>
      </div>

      {/* STAGE 1: SUBMISSION FORM */}
      {stage === 'form' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] flex items-center justify-between text-xs">
            <div>
              <span className="text-[#4B5A6B]">Signed in as:</span>
              <span className="font-bold text-[#0F1B2D] ml-1.5">{currentProfile.fullName}</span>
              <span className="text-[#174F32] bg-[#E8F2EC] px-1.5 py-0.5 rounded font-medium ml-2">
                Starting Score: {currentScore} pts
              </span>
            </div>
            <DemoAiBadge />
          </div>

          {/* Activity Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Activity Title <span className="text-[#B3261E]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cleanliness Campaign at Drosh Bazaar"
              className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] focus:outline-none focus:border-[#1F6B43] text-sm text-[#0F1B2D] bg-white shadow-xs"
            />
          </div>

          {/* Category & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                Category <span className="text-[#B3261E]">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ActivityCategory)}
                className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] focus:outline-none focus:border-[#1F6B43] text-sm text-[#0F1B2D] bg-white shadow-xs"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                Date Completed <span className="text-[#B3261E]">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] focus:outline-none focus:border-[#1F6B43] text-sm text-[#0F1B2D] bg-white shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Location / Tehsil <span className="text-[#B3261E]">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#4B5A6B]" />
                <input
                  type="text"
                  required
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g. Drosh Main Bazaar, Lower Chitral"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] focus:outline-none focus:border-[#1F6B43] text-sm text-[#0F1B2D] bg-white shadow-xs"
                />
              </div>
              <button
                type="button"
                onClick={() => setLocationName('Drosh Main Bazaar, Lower Chitral (GPS: 35.5630, 71.7950)')}
                className="px-3 py-2.5 rounded-[6px] text-xs font-semibold bg-[#F6F8F7] hover:bg-[#E3E8E6] text-[#0F1B2D] border border-[#E3E8E6] shrink-0"
              >
                Use GPS Pin
              </button>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Description & Mobilization Details <span className="text-[#B3261E]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail what was accomplished, volunteer numbers, and community benefits..."
              className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] focus:outline-none focus:border-[#1F6B43] text-sm text-[#0F1B2D] bg-white shadow-xs"
            />
          </div>

          {/* Evidence Uploader */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F1B2D]">
                Visual Evidence (Photos / Documents)
              </label>
              <span className="text-[11px] text-[#4B5A6B]">
                Max 10MB per file • JPG, PNG, PDF
              </span>
            </div>

            {uploadError && (
              <div className="mb-3 p-3 rounded-[6px] bg-[#FCEBEA] border border-[#B3261E]/30 text-xs text-[#8A1D17] flex items-center justify-between">
                <span>{uploadError}</span>
                <button
                  type="button"
                  onClick={() => setUploadError(null)}
                  className="font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="border-2 border-dashed border-[#E3E8E6] hover:border-[#1F6B43] rounded-lg p-6 text-center bg-[#F6F8F7]/50 transition-colors">
              <Upload className="w-8 h-8 text-[#4B5A6B] mx-auto mb-2" />
              <p className="text-xs font-medium text-[#0F1B2D]">
                Drag and drop ground-level evidence photos here, or click to browse
              </p>
              <p className="text-[11px] text-[#4B5A6B] mt-1">
                Metadata & EXIF data are automatically audited by the AI verification pipeline.
              </p>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleSimulateUpload}
                className="mt-3 text-xs text-[#4B5A6B] file:mr-3 file:py-1.5 file:px-3 file:rounded-[4px] file:border-0 file:text-xs file:font-semibold file:bg-[#1F6B43] file:text-white hover:file:bg-[#174F32] cursor-pointer"
              />
            </div>

            {/* Attached Evidence Previews */}
            {evidenceList.length > 0 && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {evidenceList.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-2.5 rounded-[6px] border border-[#E3E8E6] bg-white flex items-center justify-between shadow-2xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img
                        src={ev.url}
                        alt={ev.name}
                        className="w-10 h-10 rounded object-cover border border-[#E3E8E6]"
                      />
                      <div className="truncate text-xs">
                        <p className="font-semibold text-[#0F1B2D] truncate">{ev.name}</p>
                        <p className="text-[10px] text-[#4B5A6B]">{ev.sizeKb} KB • Verified Hash</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeEvidence(ev.id)}
                      className="text-[#4B5A6B] hover:text-[#B3261E] p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-[#E3E8E6] flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 rounded-[6px] text-xs font-semibold text-[#4B5A6B] hover:text-[#0F1B2D]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-[6px] text-sm font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-xs transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit for AI Verification</span>
            </button>
          </div>
        </form>
      )}

      {/* STAGE 2: SEQUENTIAL AI VERIFICATION PROGRESS */}
      {stage === 'analyzing' && (
        <div className="p-8 rounded-lg border border-[#E3E8E6] bg-white text-center shadow-xs space-y-6 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-[#E8F2EC] text-[#1F6B43] flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#0F1B2D]">AI Evidence Verification Engine</h3>
            <p className="text-xs text-[#4B5A6B] mt-1">
              Analyzing photo metadata, location authenticity, and community participant count...
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#E3E8E6] rounded-full h-2 overflow-hidden max-w-md mx-auto">
            <div
              className="h-full bg-[#1F6B43] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.round(((currentStepIndex + 1) / stepsList.length) * 100)}%` }}
            />
          </div>

          {/* Sequential Step List */}
          <div className="max-w-md mx-auto space-y-2 text-left text-xs">
            {stepsList.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 p-2 rounded-[6px] transition-colors ${
                    isCurrent
                      ? 'bg-[#E8F2EC] text-[#174F32] font-semibold border border-[#1F6B43]/30'
                      : isPast
                      ? 'text-[#0F1B2D]'
                      : 'text-[#4B5A6B]/50'
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-4 h-4 text-[#1F6B43] shrink-0" />
                  ) : isCurrent ? (
                    <span className="w-4 h-4 rounded-full border-2 border-[#1F6B43] border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-[#E3E8E6] shrink-0" />
                  )}
                  <span>{step}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <DemoAiBadge />
          </div>
        </div>
      )}

      {/* STAGE 3: VERIFICATION RESULT & SCORE ADVANCEMENT */}
      {stage === 'result' && verificationResult && submissionSummary && (() => {
        const isMismatch = (verificationResult.confidence < 30) ||
          verificationResult.impactLevel === 'Invalid' ||
          verificationResult.impactTier === 'Invalid' ||
          verificationResult.civicImpactScore <= 20;

        return (
          <div className="space-y-6 animate-in fade-in">
            {/* Headline Result Banner */}
            <div className={`p-6 rounded-lg bg-white border shadow-sm ${
              isMismatch ? 'border-[#B3261E]/40' : 'border-[#E3E8E6]'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3E8E6]">
                <div>
                  {isMismatch ? (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B3261E] bg-[#FDF2F2] border border-[#B3261E]/20 px-2 py-0.5 rounded flex items-center gap-1.5 inline-flex">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Evidence Mismatch • Flagged</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F6B43] bg-[#E8F2EC] px-2 py-0.5 rounded flex items-center gap-1.5 inline-flex">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>✓ Activity Verified</span>
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-[#0F1B2D] mt-2">
                    {title}
                  </h2>
                  <p className="text-xs text-[#4B5A6B] mt-0.5">
                    📍 {locationName} • {date} • <span className="font-semibold text-[#0F1B2D]">{category}</span>
                  </p>
                </div>

                {/* Animated Score Increment */}
                <div className={`text-right p-3 rounded-lg border shrink-0 ${
                  isMismatch ? 'bg-[#FFF8F8] border-[#B3261E]/30' : 'bg-[#F6F8F7] border-[#E3E8E6]'
                }`}>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#4B5A6B] block">
                    Civic Score Earned
                  </span>
                  <div className="flex items-baseline justify-end gap-2 mt-0.5">
                    <span className={`text-2xl font-bold font-tabular ${
                      isMismatch ? 'text-[#B7791F]' : 'text-[#1F6B43]'
                    }`}>
                      +{submissionSummary.pointsAdded}
                    </span>
                    <span className="text-xs font-semibold text-[#0F1B2D]">
                      ({currentScore} → {submissionSummary.newTotal} pts)
                    </span>
                  </div>
                  {isMismatch && (
                    <span className="text-[10px] text-[#B3261E] font-medium block mt-0.5">
                      Penalized per evaluation rules (0 - 20 pts)
                    </span>
                  )}
                </div>
              </div>

              {/* AI Verification Breakdown Card */}
              {(verificationResult.summary || verificationResult.reasoning) && (
                <div className={`mt-4 p-3.5 rounded-lg border text-xs space-y-1.5 ${
                  isMismatch ? 'bg-[#FDF2F2] border-[#B3261E]/30 text-[#842029]' : 'bg-[#F6F8F7] border-[#E3E8E6] text-[#0F1B2D]'
                }`}>
                  <div className="flex items-center justify-between font-semibold">
                    <span className="flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#1F6B43]" />
                      <span>AI Verification Evaluation Breakdown:</span>
                    </span>
                    <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-white border border-[#E3E8E6]">
                      Tier: {verificationResult.impactTier || verificationResult.impactLevel}
                    </span>
                  </div>
                  {verificationResult.summary && (
                    <p className="font-bold">{verificationResult.summary}</p>
                  )}
                  {verificationResult.reasoning && (
                    <p className="leading-relaxed opacity-90">{verificationResult.reasoning}</p>
                  )}
                </div>
              )}

              {/* Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                <div>
                  <span className="text-[#4B5A6B] block">Evidence Confidence</span>
                  <span className={`text-base font-bold font-tabular ${
                    verificationResult.confidence <= 25 ? 'text-[#B3261E]' : 'text-[#0F1B2D]'
                  }`}>
                    {verificationResult.confidence}% {verificationResult.confidence <= 25 && '(LOW)'}
                  </span>
                </div>
                <div>
                  <span className="text-[#4B5A6B] block">Participants Estimated</span>
                  <span className="text-base font-bold text-[#0F1B2D] font-tabular">
                    {verificationResult.estimatedParticipants} volunteers
                  </span>
                </div>
                <div>
                  <span className="text-[#4B5A6B] block">Impact Tier</span>
                  <span className={`text-base font-bold ${
                    verificationResult.impactTier === 'Invalid' || verificationResult.impactLevel === 'Invalid'
                      ? 'text-[#B3261E]'
                      : verificationResult.impactTier === 'Low' || verificationResult.impactLevel === 'Low'
                      ? 'text-[#B7791F]'
                      : 'text-[#1F6B43]'
                  }`}>
                    {verificationResult.impactTier || verificationResult.impactLevel}
                  </span>
                </div>
                <div>
                  <span className="text-[#4B5A6B] block">Civic Impact Score</span>
                  <span className={`text-base font-bold font-tabular ${
                    isMismatch ? 'text-[#B7791F]' : 'text-[#0F1B2D]'
                  }`}>
                    {verificationResult.civicImpactScore} / 100
                  </span>
                </div>
              </div>
            </div>

          {/* Unlocked Achievement Announcement (if unlocked) */}
          {submissionSummary.unlockedAchievement && (
            <div className="p-4 rounded-lg bg-[#E8F2EC] border border-[#1F6B43]/40 flex items-center justify-between animate-bounce">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1F6B43] text-white flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#174F32] tracking-wider">
                    New Achievement Unlocked!
                  </span>
                  <h4 className="text-sm font-bold text-[#0F1B2D]">
                    {submissionSummary.unlockedAchievement.title}
                  </h4>
                  <p className="text-xs text-[#174F32]">
                    {submissionSummary.unlockedAchievement.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Integrity Checklist & Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IntegrityChecklist
              checks={verificationResult.checks}
              warningNote={verificationResult.warningNote}
            />

            <div className="p-4 rounded-lg border border-[#E3E8E6] bg-white space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E6]">
                <h4 className="font-semibold text-[#0F1B2D]">Score Calculation Basis</h4>
                <DemoAiBadge />
              </div>
              <ul className="space-y-2 text-[#4B5A6B] leading-relaxed list-disc pl-4">
                {verificationResult.explanation.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <div className="pt-2 border-t border-[#E3E8E6] text-[11px] text-[#4B5A6B]">
                Weights: 40% Participant Verification • 30% Geographic Consistency • 30% Category Weighting.
              </div>
            </div>
          </div>

          {/* Post-Completion Actions */}
          <div className="p-4 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/profile/muhammad-zulkaif')}
                className="px-4 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] text-white hover:bg-[#174F32] transition-colors flex items-center gap-1.5"
              >
                <span>View on Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setStage('form');
                  setTitle('');
                  setDescription('');
                  setEvidenceList([]);
                }}
                className="px-4 py-2 rounded-[6px] text-xs font-semibold bg-white text-[#0F1B2D] border border-[#E3E8E6] hover:bg-[#F6F8F7]"
              >
                Submit Another
              </button>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs font-medium text-[#4B5A6B] hover:text-[#0F1B2D]"
            >
              Back to Dashboard →
            </button>
          </div>
        </div>
        );
      })()}
    </div>
  );
};
