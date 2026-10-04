import React, { useState } from 'react';
import { useCivicStore } from '../../store/useCivicStore';
import {
  Users,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  MapPin,
  Leaf,
  AlertCircle,
  Award,
  Globe,
  X
} from 'lucide-react';

interface OnboardingAuthModalProps {
  navigate: (path: string) => void;
}

export const OnboardingAuthModal: React.FC<OnboardingAuthModalProps> = ({ navigate }) => {
  const {
    isOnboardingOpen,
    onboardingDefaultTab,
    closeOnboarding,
    continueAsGuest,
    loginAsCitizen,
    registerCitizen,
    openAdminAuthModal,
    profiles,
  } = useCivicStore();

  const [activeTab, setActiveTab] = useState<'signup' | 'login'>(onboardingDefaultTab || 'signup');

  // Sign up fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [locationName, setLocationName] = useState('Drosh, Lower Chitral');

  // Log in fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  if (!isOnboardingOpen) return null;

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    registerCitizen({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || '+92 345 0000000',
      locationName: locationName.trim() || 'Drosh, Lower Chitral',
    });
    navigate('/dashboard');
  };

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const id = loginIdentifier.trim();
    const pw = loginPassword.trim();

    if (!id) {
      setLoginError('Please enter your email or username.');
      return;
    }
    if (!pw) {
      setLoginError('Please enter your password.');
      return;
    }
    if (pw.length < 4) {
      setLoginError('Password must be at least 4 characters.');
      return;
    }

    loginAsCitizen(id);
    navigate('/dashboard');
  };

  const handleGuest = () => {
    continueAsGuest();
  };

  const handleOpenAdmin = () => {
    openAdminAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-[#E3E8E6] shadow-2xl overflow-hidden my-auto animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#0F1B2D] text-white p-6 sm:p-7 relative">
          <button
            onClick={handleGuest}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded transition-colors"
            aria-label="Continue as Guest"
            title="Continue as Guest"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1F6B43] text-white text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CivicPulse AI · Khyber Pakhtunkhwa</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Welcome to CivicPulse AI
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              Connecting citizen volunteer campaigns, verified public impact, and transparent municipal problem resolution in Lower Chitral & Tehsil Drosh.
            </p>
          </div>
        </div>

        {/* 3 Main Choice Tabs / Navigation */}
        <div className="p-6 sm:p-8 space-y-6 bg-white">
          <div className="grid grid-cols-2 p-1 bg-[#F6F8F7] rounded-lg border border-[#E3E8E6] text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`py-2 px-3 rounded-[6px] font-semibold transition-all cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-white text-[#0F1B2D] shadow-2xs font-bold border border-[#E3E8E6]'
                  : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
              }`}
            >
              1. Sign Up (New Citizen)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`py-2 px-3 rounded-[6px] font-semibold transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-[#0F1B2D] shadow-2xs font-bold border border-[#E3E8E6]'
                  : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
              }`}
            >
              2. Log In (Existing Account)
            </button>
          </div>

          {/* TAB 1: SIGN UP */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Asad Ullah"
                  className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#1F6B43] focus:outline-none text-[#0F1B2D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#1F6B43] focus:outline-none text-[#0F1B2D]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 345 1234567"
                    className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#1F6B43] focus:outline-none text-[#0F1B2D]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                  Tehsil / Union Council
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Drosh, Lower Chitral"
                  className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#1F6B43] focus:outline-none text-[#0F1B2D]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Create Citizen Account & Enter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* TAB 2: LOG IN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogIn} className="space-y-4 text-xs">
              {loginError && (
                <div className="p-2.5 rounded-lg bg-[#FCEBEA] border border-[#B3261E]/30 text-[#8A1D17] text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#B3261E] shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                  Email or Username *
                </label>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="Enter your email or username"
                  className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#1F6B43] focus:outline-none text-[#0F1B2D]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#1F6B43] focus:outline-none text-[#0F1B2D]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* DIVIDER & OPTION 3: CONTINUE AS GUEST */}
          <div className="pt-4 border-t border-[#E3E8E6] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-[#4B5A6B]">
                Want to explore before creating an account?
              </span>
            </div>

            <button
              type="button"
              onClick={handleGuest}
              className="w-full py-2.5 px-4 rounded-[6px] text-xs font-semibold bg-[#F6F8F7] hover:bg-[#E3E8E6] text-[#0F1B2D] border border-[#E3E8E6] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#1F6B43]" />
              <span>3. Continue as Guest</span>
            </button>
            <p className="text-[10px] text-[#4B5A6B] text-center leading-normal">
              Guest visitors have instant access to browse active campaigns, view GIS telemetry, report problems, and inspect the district transparency dashboard.
            </p>
          </div>

          {/* SUBTLE ADMINISTRATIVE ACCESS LINK AT VERY BOTTOM */}
          <div className="pt-3 border-t border-[#E3E8E6] text-center">
            <p className="text-[11px] text-[#718096]">
              Authorized Municipal Personnel?{' '}
              <button
                type="button"
                onClick={handleOpenAdmin}
                className="text-[#4B5A6B] hover:text-[#0F1B2D] underline font-medium cursor-pointer"
              >
                Administrative Portal & Verification
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
