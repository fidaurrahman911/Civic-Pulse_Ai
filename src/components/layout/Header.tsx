import React, { useState, useEffect, useRef } from 'react';
import { useCivicStore } from '../../store/useCivicStore';
import { Avatar } from '../civic/Avatar';
import { DemoControlsModal } from './DemoControlsModal';
import {
  Users,
  ShieldAlert,
  SlidersHorizontal,
  ChevronDown,
  LayoutDashboard,
  User as UserIcon,
  FileText,
  AlertCircle,
  LogOut,
  Building2,
  Menu,
  X,
  Lock,
  Compass,
  Trophy,
  MapPin,
  Calendar,
  Sparkles,
  PlusCircle,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const {
    currentUser,
    currentProfile,
    isAuthenticated,
    openOnboarding,
    openAdminAuthModal,
    loginAsCitizen,
    logout,
  } = useCivicStore();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDemoControlsOpen, setIsDemoControlsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide header on scroll down, show on scroll up
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always visible near page top
      if (currentScrollY < 60) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scrolling down hides, scrolling up shows
      if (currentScrollY > lastScrollY.current + 8) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = currentUser.role === 'admin';

  // Role-Specific Navigation Links
  const citizenNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'Discover', path: '/discover' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Civic Map', path: '/map' },
    { label: 'Opportunities', path: '/opportunities' },
    { label: 'Transparency', path: '/transparency' },
  ];

  const adminNavLinks = [
    { label: 'District Overview', path: '/admin' },
    { label: 'Complaints Desk', path: '/admin/complaints' },
    { label: 'Civic Heatmap', path: '/admin/map' },
    { label: 'AI Assistant', path: '/admin/assistant' },
    { label: 'Transparency', path: '/transparency' },
  ];

  const navLinks = isAdmin ? adminNavLinks : citizenNavLinks;

  return (
    <>
      <div
        className={`sticky top-0 z-40 w-full transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Top Administration Bar (Only for verified admin) or Citizen Context */}
        {isAdmin ? (
          <div className="bg-[#0F1B2D] text-white px-4 py-1.5 text-xs border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2 max-w-[1280px] mx-auto w-full">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1F6B43] text-white text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                Official Admin Mode
              </span>
              <span className="text-slate-300 font-medium">
                Operating as: <strong>{currentProfile.fullName}</strong> • Full District Oversight
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="ml-auto text-[11px] text-amber-400 hover:text-white underline font-semibold cursor-pointer"
              >
                Exit Admin Mode
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#F6F8F7] border-b border-[#E3E8E6] px-4 py-1 text-[11px] text-[#4B5A6B]">
            <div className="max-w-[1280px] mx-auto w-full flex items-center justify-between">
              {!isAuthenticated ? (
                <>
                  <span className="text-[#4B5A6B] font-medium">
                    CivicPulse AI Lower Chitral · Public Guest Session
                  </span>
                  <button
                    onClick={() => openOnboarding('signup')}
                    className="text-[#1F6B43] hover:underline font-semibold cursor-pointer"
                  >
                    Sign up to track personal points & drives →
                  </button>
                </>
              ) : (
                <>
                  <span className="text-[#4B5A6B] font-medium">
                    Citizen Portal · Lower Chitral & Tehsil Drosh
                  </span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-[#4B5A6B]">Signed in:</span>
                    <span className="font-bold text-[#0F1B2D]">{currentProfile.fullName}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[#1F6B43] font-medium">{currentProfile.locationName}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <header className="w-full bg-white/95 backdrop-blur-md border-b border-[#E3E8E6] shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo Wordmark */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(isAdmin ? '/admin' : '/')}
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div
                className={`w-8 h-8 rounded-[6px] flex items-center justify-center text-white font-bold text-base shadow-xs ${
                  isAdmin ? 'bg-[#0F1B2D]' : 'bg-[#1F6B43]'
                }`}
              >
                {isAdmin ? 'DC' : 'CP'}
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-[#0F1B2D] block leading-none">
                  CivicPulse <span className={isAdmin ? 'text-[#0F1B2D]' : 'text-[#1F6B43]'}>AI</span>
                </span>
                <span className="text-[10px] text-[#4B5A6B] tracking-wider uppercase font-medium">
                  {isAdmin ? 'Lower Chitral Administration' : 'Khyber Pakhtunkhwa'}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors ${
                      isActive
                        ? isAdmin
                          ? 'text-[#0F1B2D] bg-[#F6F8F7] font-bold border border-[#E3E8E6]'
                          : 'text-[#1F6B43] bg-[#E8F2EC] font-semibold'
                        : 'text-[#4B5A6B] hover:text-[#0F1B2D] hover:bg-[#F6F8F7]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Emergency Link */}
            <button
              onClick={() => navigate('/report/emergency')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] text-xs font-medium text-[#8A1D17] bg-[#FCEBEA] hover:bg-[#F8D7D5] border border-[#B3261E]/30 transition-colors cursor-pointer"
              title="Emergency Disaster & Rapid Dispatch"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#B3261E]" />
              <span className="hidden sm:inline">Emergency</span>
            </button>

            {/* Citizen Primary CTA: Report a Problem (Only for citizens & guests) */}
            {!isAdmin ? (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={() => navigate('/impact/new')}
                  className="px-2.5 py-1.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white transition-colors cursor-pointer"
                >
                  + Submit Impact
                </button>
                <button
                  onClick={() => navigate('/report')}
                  className="px-2.5 py-1.5 rounded-[6px] text-xs font-semibold border border-[#1F6B43] text-[#1F6B43] hover:bg-[#E8F2EC] transition-colors cursor-pointer"
                >
                  Report Problem
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/admin/complaints')}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-[6px] text-xs font-semibold bg-[#0F1B2D] text-white hover:bg-[#1F2B3E] transition-colors cursor-pointer"
              >
                Dispatch Desk
              </button>
            )}

            {/* User Profile or Guest Auth Buttons */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openOnboarding('login')}
                  className="px-3 py-1.5 rounded-[6px] text-xs font-semibold text-[#0F1B2D] hover:bg-[#F6F8F7] border border-[#E3E8E6] transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => openOnboarding('signup')}
                  className="px-3 py-1.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white transition-colors cursor-pointer shadow-xs"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              /* User Profile & Menu */
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-[#E3E8E6] transition-all focus:outline-none cursor-pointer"
                  aria-expanded={isUserMenuOpen}
                >
                  <Avatar name={currentProfile.fullName} size="sm" />
                  <ChevronDown className="w-3.5 h-3.5 text-[#4B5A6B]" />
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-60 rounded-lg bg-white border border-[#E3E8E6] shadow-lg py-1.5 z-50 text-xs animate-in fade-in"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <div className="px-3.5 py-2.5 border-b border-[#E3E8E6]">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-[#0F1B2D] truncate">{currentProfile.fullName}</p>
                        <span
                          className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                            isAdmin ? 'bg-[#0F1B2D] text-white' : 'bg-[#E8F2EC] text-[#174F32]'
                          }`}
                        >
                          {currentUser.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#4B5A6B] mt-0.5">{currentProfile.locationName}</p>
                    </div>

                    {/* CITIZEN LINKS (NO ADMIN ACCESS) */}
                    {!isAdmin ? (
                      <>
                        <button
                          onClick={() => navigate('/dashboard')}
                          className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-[#F6F8F7] text-[#0F1B2D]"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-[#4B5A6B]" />
                          <span>Citizen Dashboard</span>
                        </button>

                        <button
                          onClick={() => navigate('/profile/muhammad-zulkaif')}
                          className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-[#F6F8F7] text-[#0F1B2D]"
                        >
                          <UserIcon className="w-3.5 h-3.5 text-[#4B5A6B]" />
                          <span>Public Profile</span>
                        </button>

                        <button
                          onClick={() => navigate('/complaints')}
                          className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-[#F6F8F7] text-[#0F1B2D]"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-[#4B5A6B]" />
                          <span>My Reported Complaints</span>
                        </button>

                        <button
                          onClick={() => navigate('/impact-report')}
                          className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-[#F6F8F7] text-[#0F1B2D]"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#4B5A6B]" />
                          <span>Civic Impact Report</span>
                        </button>
                      </>
                    ) : (
                      /* ADMIN LINKS */
                      <>
                        <button
                          onClick={() => navigate('/admin')}
                          className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-[#F6F8F7] text-[#0F1B2D] font-medium"
                        >
                          <Building2 className="w-3.5 h-3.5 text-[#0F1B2D]" />
                          <span>District Overview</span>
                        </button>

                        <button
                          onClick={() => navigate('/admin/complaints')}
                          className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-[#F6F8F7] text-[#0F1B2D]"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-[#B7791F]" />
                          <span>Complaints Caseload</span>
                        </button>

                        <button
                          onClick={() => navigate('/admin/map')}
                          className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-[#F6F8F7] text-[#0F1B2D]"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#1F6B43]" />
                          <span>District Heatmap</span>
                        </button>
                      </>
                    )}

                    <div className="my-1 border-t border-[#E3E8E6]" />

                    {/* Switch Account or Sign Out */}
                    <button
                      onClick={() => openOnboarding('login')}
                      className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-[#F6F8F7] text-[#1F5FA8] font-medium cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Switch Citizen Account</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-[#F6F8F7] text-[#B3261E] cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out (Return to Guest)</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-[6px] text-[#4B5A6B] hover:text-[#0F1B2D] hover:bg-[#F6F8F7]"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E3E8E6] bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
            <div className="p-2.5 rounded bg-[#F6F8F7] border border-[#E3E8E6] flex items-center justify-between text-xs mb-2">
              <span className="text-[#4B5A6B]">Session: <strong>{currentUser.role}</strong></span>
              <button
                onClick={() => {
                  openOnboarding();
                  setIsMobileMenuOpen(false);
                }}
                className="text-[#1F5FA8] font-semibold underline cursor-pointer"
              >
                {!isAuthenticated ? 'Sign In / Up' : 'Switch Account'}
              </button>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-[6px] text-sm font-medium ${
                  currentPath === link.path
                    ? 'bg-[#E8F2EC] text-[#1F6B43] font-semibold'
                    : 'text-[#0F1B2D] hover:bg-[#F6F8F7]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-[#E3E8E6] flex flex-col gap-2">
              {!isAdmin ? (
                <>
                  <button
                    onClick={() => {
                      navigate('/impact/new');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 rounded-[6px] text-center text-xs font-semibold bg-[#1F6B43] text-white"
                  >
                    + Submit Civic Impact
                  </button>
                  <button
                    onClick={() => {
                      navigate('/report');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 rounded-[6px] text-center text-xs font-semibold border border-[#1F6B43] text-[#1F6B43]"
                  >
                    Report a Problem
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate('/admin/complaints');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-[6px] text-center text-xs font-semibold bg-[#0F1B2D] text-white"
                >
                  District Complaints Desk
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </div>

    {/* Demo Controls Modal */}
      <DemoControlsModal
        isOpen={isDemoControlsOpen}
        onClose={() => setIsDemoControlsOpen(false)}
      />
    </>
  );
};
