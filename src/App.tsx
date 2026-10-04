import React, { useState, useEffect } from 'react';
import { useCivicStore } from './store/useCivicStore';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { OnboardingAuthModal } from './components/auth/OnboardingAuthModal';
import { RestrictedAdminAccess } from './components/civic/RestrictedAdminAccess';
import { AdminAuthModal } from './components/auth/AdminAuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { TransparencyPage } from './pages/TransparencyPage';
import { OrganizationsPage } from './pages/OrganizationsPage';
import { CitizenDashboardPage } from './pages/CitizenDashboardPage';
import { PublicProfilePage } from './pages/PublicProfilePage';
import { ImpactNewPage } from './pages/ImpactNewPage';
import { ReportProblemPage } from './pages/ReportProblemPage';
import { EmergencyReportPage } from './pages/EmergencyReportPage';
import { ComplaintsListPage } from './pages/ComplaintsListPage';
import { ComplaintDetailPage } from './pages/ComplaintDetailPage';
import { ImpactReportPage } from './pages/ImpactReportPage';
import { AdminOverviewPage } from './pages/AdminOverviewPage';
import { AdminComplaintsPage } from './pages/AdminComplaintsPage';
import { AdminComplaintCasePage } from './pages/AdminComplaintCasePage';
import { AdminMapPage } from './pages/AdminMapPage';
import { AuthPages } from './pages/AuthPages';

export default function App() {
  const { currentUser } = useCivicStore();

  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdmin = currentUser.role === 'admin';

  // Route matching helper
  const renderRoute = () => {
    // 1. Static Routes
    if (currentPath === '/' || currentPath === '') {
      return <HomePage navigate={navigate} />;
    }
    if (currentPath === '/discover') {
      return <DiscoverPage navigate={navigate} />;
    }
    if (currentPath === '/leaderboard') {
      return <LeaderboardPage navigate={navigate} />;
    }
    if (currentPath === '/map') {
      return <AdminMapPage navigate={navigate} isAdmin={false} />;
    }
    if (currentPath === '/opportunities' || currentPath === '/campaigns' || currentPath.startsWith('/campaigns/')) {
      return <OpportunitiesPage navigate={navigate} />;
    }
    if (currentPath === '/transparency') {
      return <TransparencyPage navigate={navigate} />;
    }
    if (currentPath === '/organizations') {
      return <OrganizationsPage navigate={navigate} isDashboardView={false} />;
    }
    if (currentPath === '/organizations/dashboard') {
      return <OrganizationsPage navigate={navigate} isDashboardView={true} />;
    }
    if (currentPath === '/dashboard') {
      return <CitizenDashboardPage navigate={navigate} />;
    }
    if (currentPath === '/impact/new') {
      return <ImpactNewPage navigate={navigate} />;
    }
    if (currentPath === '/report') {
      return <ReportProblemPage navigate={navigate} />;
    }
    if (currentPath === '/report/emergency') {
      return <EmergencyReportPage navigate={navigate} />;
    }
    if (currentPath === '/complaints') {
      return <ComplaintsListPage navigate={navigate} />;
    }
    if (currentPath === '/impact-report') {
      return <ImpactReportPage navigate={navigate} />;
    }

    // Role-Guarded Administration Routes
    if (currentPath === '/admin' || currentPath === '/admin/assistant') {
      if (!isAdmin) return <RestrictedAdminAccess navigate={navigate} />;
      return <AdminOverviewPage navigate={navigate} />;
    }
    if (currentPath === '/admin/complaints') {
      if (!isAdmin) return <RestrictedAdminAccess navigate={navigate} />;
      return <AdminComplaintsPage navigate={navigate} />;
    }
    if (currentPath === '/admin/map') {
      if (!isAdmin) return <RestrictedAdminAccess navigate={navigate} />;
      return <AdminMapPage navigate={navigate} isAdmin={true} />;
    }

    // Authentication Routes
    if (currentPath === '/sign-in') {
      return <AuthPages mode="sign-in" navigate={navigate} />;
    }
    if (currentPath === '/create-account') {
      return <AuthPages mode="create-account" navigate={navigate} />;
    }
    if (currentPath === '/forgot-password') {
      return <AuthPages mode="forgot-password" navigate={navigate} />;
    }

    // 2. Dynamic Param Routes: /profile/[slug]
    const profileMatch = currentPath.match(/^\/profile\/(.+)$/);
    if (profileMatch) {
      return <PublicProfilePage slug={profileMatch[1]} navigate={navigate} />;
    }

    // 3. Dynamic Param Routes: /complaints/[trackingId]
    const complaintMatch = currentPath.match(/^\/complaints\/(.+)$/);
    if (complaintMatch) {
      return <ComplaintDetailPage trackingId={complaintMatch[1]} navigate={navigate} />;
    }

    // 4. Dynamic Param Routes: /admin/complaints/[id]
    const adminComplaintMatch = currentPath.match(/^\/admin\/complaints\/(.+)$/);
    if (adminComplaintMatch) {
      if (!isAdmin) return <RestrictedAdminAccess navigate={navigate} />;
      return <AdminComplaintCasePage complaintId={adminComplaintMatch[1]} navigate={navigate} />;
    }

    // 5. 404 Fallback
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center text-xs text-[#4B5A6B] space-y-3">
        <h2 className="text-xl font-bold text-[#0F1B2D]">Page Not Found (404)</h2>
        <p>The requested route does not exist or has moved.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-[6px] bg-[#1F6B43] text-white font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F1B2D]">
      <Header currentPath={currentPath} navigate={navigate} />

      <main className="flex-1">
        {renderRoute()}
      </main>

      <Footer navigate={navigate} />
      <MobileNav currentPath={currentPath} navigate={navigate} />

      {/* Initial Citizen Onboarding & Auth Modal (Sign Up, Log In, Continue as Guest) */}
      <OnboardingAuthModal navigate={navigate} />

      {/* Dedicated Administrative Registration & Verification Modal */}
      <AdminAuthModal navigate={navigate} />
    </div>
  );
}
