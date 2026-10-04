import React, { useState, useEffect, useRef } from 'react';
import { REGIONAL_IMAGES } from '../../data/images';
import { useCivicStore } from '../../store/useCivicStore';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  Sparkles,
  MapPin,
  Users,
  AlertTriangle,
  Play,
  Pause,
  Award,
  CheckCircle2
} from 'lucide-react';

interface SlideData {
  id: string;
  image: string;
  location: string;
  badge: string;
  headline: string;
  highlightText: string;
  description: string;
  primaryCtaText: string;
  primaryCtaAction: () => void;
  secondaryCtaText: string;
  secondaryCtaAction: () => void;
  featuredStat: {
    value: string;
    label: string;
  };
}

interface BanoQabilHeroSliderProps {
  navigate: (path: string) => void;
}

export const BanoQabilHeroSlider: React.FC<BanoQabilHeroSliderProps> = ({ navigate }) => {
  const { openGateway, loginAsCitizen, portalState } = useCivicStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: SlideData[] = [
    {
      id: 'slide-1',
      image: REGIONAL_IMAGES.heroChitralValley.src,
      location: 'Chitral Valley & Hindu Kush, Lower Chitral',
      badge: 'OFFICIAL CIVIC INITIATIVE · KHYBER PAKHTUNKHWA',
      headline: 'Empowering Chitral:',
      highlightText: 'Do Good. Prove It. Transform Your Tehsil.',
      description:
        'Khyber Pakhtunkhwa’s pioneering civic-tech network connecting youth, community volunteers, and municipal leadership through verified community impact and rapid digital accountability.',
      primaryCtaText: 'Join as Citizen / Volunteer',
      primaryCtaAction: () => {
        openGateway();
      },
      secondaryCtaText: 'Report a District Problem',
      secondaryCtaAction: () => navigate('/report'),
      featuredStat: {
        value: '14,850+',
        label: 'Registered Citizens Across Chitral',
      },
    },
    {
      id: 'slide-2',
      image: REGIONAL_IMAGES.heroChitralVolunteers.src,
      location: 'Shishi Koh & Drosh Valley, Lower Chitral',
      badge: 'YOUTH EMPOWERMENT & VOLUNTEER CORPS',
      headline: 'Recognizing Local Champions:',
      highlightText: 'Earn Points, Badges & Official Certifications.',
      description:
        'Every tree planted, road cleaned, and emergency assistance provided in Drosh is verified by Civic AI, awarded verified reputation points, and celebrated on the District Leaderboard.',
      primaryCtaText: 'Explore Volunteer Drives',
      primaryCtaAction: () => navigate('/opportunities'),
      secondaryCtaText: 'View District Leaderboard',
      secondaryCtaAction: () => navigate('/leaderboard'),
      featuredStat: {
        value: '8,294',
        label: 'Verified Community Action Hours',
      },
    },
    {
      id: 'slide-3',
      image: REGIONAL_IMAGES.heroChitralRiver.src,
      location: 'Chitral River Basin & Municipal Infrastructure',
      badge: 'TRANSPARENT DISTRICT GOVERNANCE',
      headline: 'Direct Grievance Redressal:',
      highlightText: 'Broken Roads, Cleanliness & Emergency Works.',
      description:
        'Submit photographic and GPS-pinned evidence directly to the Deputy Commissioner Office, TMA Drosh, and C&W Department. Track the repair lifecycle from inspection to completion.',
      primaryCtaText: 'Submit Grievance Now',
      primaryCtaAction: () => navigate('/report'),
      secondaryCtaText: 'Track Existing Complaint',
      secondaryCtaAction: () => navigate('/complaints'),
      featuredStat: {
        value: '94.2%',
        label: 'Verified Resolution Efficiency',
      },
    },
  ];

  // Auto-slide effect (every 6 seconds unless paused)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-[#0A192F] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with smooth cross-fade */}
      <div className="relative h-[560px] sm:h-[620px] lg:h-[680px] w-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Real Photographic Background Image */}
            <img
              src={slide.image}
              alt={slide.location}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
            />

            {/* Multi-layered Dark Gradient Overlays for Guaranteed High-Contrast Visible Text */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#071322]/95 via-[#0A192F]/80 to-[#0A192F]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-black/30" />
          </div>
        ))}

        {/* Foreground Content */}
        <div className="relative z-20 max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-10 lg:py-16">
          {/* Top Row: Location Pill + Administration Access Quick Link */}
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-medium text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>{slides[currentSlide].location}</span>
            </div>

            {/* Quick Admin Access Chip */}
            <button
              onClick={() => {
                openGateway();
              }}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold text-white transition-all"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>DC Administration Portal</span>
              <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-1.5 py-0.2 rounded ml-1">
                Authorized
              </span>
            </button>
          </div>

          {/* Center Main Copy */}
          <div className="max-w-3xl my-auto space-y-5 lg:space-y-6">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{slides[currentSlide].badge}</span>
            </div>

            {/* Big Bold Headline (Bano Qabil Style Impact) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white drop-shadow-md">
              {slides[currentSlide].headline}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-200">
                {slides[currentSlide].highlightText}
              </span>
            </h1>

            {/* Visible Clear Paragraph */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed drop-shadow">
              {slides[currentSlide].description}
            </p>

            {/* High-Impact Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={slides[currentSlide].primaryCtaAction}
                className="px-6 py-3.5 rounded-lg text-sm sm:text-base font-bold bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-lg hover:shadow-emerald-900/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
              >
                <span>{slides[currentSlide].primaryCtaText}</span>
                <ArrowRight className="w-5 h-5 text-emerald-200" />
              </button>

              <button
                onClick={slides[currentSlide].secondaryCtaAction}
                className="px-5 py-3.5 rounded-lg text-sm sm:text-base font-semibold bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white transition-all cursor-pointer"
              >
                {slides[currentSlide].secondaryCtaText}
              </button>

              {/* Mobile Administration Button */}
              <button
                onClick={openGateway}
                className="sm:hidden px-4 py-3 rounded-lg text-xs font-bold bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center gap-1.5"
              >
                <Building2 className="w-4 h-4" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

          {/* Bottom Bar: Stats Pill, Indicators & Controls */}
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Quick Stat Pill */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-white leading-tight">
                  {slides[currentSlide].featuredStat.value}
                </div>
                <div className="text-xs text-slate-300">
                  {slides[currentSlide].featuredStat.label}
                </div>
              </div>
            </div>

            {/* Slider Navigation & Indicators */}
            <div className="flex items-center gap-4">
              {/* Slide Counter */}
              <span className="text-xs font-mono text-slate-300 font-semibold tracking-wider">
                0{currentSlide + 1} / 0{slides.length}
              </span>

              {/* Slide Dots / Bars */}
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 transition-all rounded-full ${
                      idx === currentSlide
                        ? 'w-8 bg-emerald-400'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Previous / Next Arrow Controls */}
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Progress Line (runs across the bottom) */}
      <div className="w-full bg-white/10 h-1">
        <div
          className="bg-emerald-400 h-1 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
