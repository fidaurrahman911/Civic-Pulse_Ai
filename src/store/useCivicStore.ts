import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  Profile,
  CivicScore,
  Activity,
  Complaint,
  Opportunity,
  Organization,
  Campaign,
  Achievement,
  Department,
  Officer,
  Location,
  AIInsight,
  ComplaintStatus,
  ComplaintSeverity,
  ResolutionVerification,
  EvidenceItem,
  ImpactVerification,
  AdminRegistrationData,
  AdminVerificationDocument
} from '../types';
import {
  SEED_USERS,
  SEED_PROFILES,
  SEED_CIVIC_SCORES,
  SEED_ACTIVITIES,
  SEED_COMPLAINTS,
  SEED_OPPORTUNITIES,
  SEED_ORGANIZATIONS,
  SEED_CAMPAIGNS,
  SEED_ACHIEVEMENTS,
  SEED_DEPARTMENTS,
  SEED_OFFICERS,
  SEED_LOCATIONS,
  SEED_LEADERBOARD_ENTRIES,
  SEED_TRANSPARENCY_KPIS,
  SEED_AI_INSIGHT,
  LeaderboardEntry,
} from '../data/seedData';
import { generateTrackingId } from '../lib/ids';
import { getTierForScore } from '../lib/scoring';
import { ActiveCampaign, INITIAL_ACTIVE_CAMPAIGNS } from '../data/activeCampaignsData';

export const GUEST_USER: User = {
  id: 'guest',
  role: 'guest',
  email: '',
  phone: '',
  createdAt: new Date().toISOString(),
  verificationStatus: 'none',
};

export const GUEST_PROFILE: Profile = {
  userId: 'guest',
  slug: 'guest',
  fullName: 'Guest Citizen',
  locationId: 'loc-drosh',
  locationName: 'Lower Chitral',
  bio: 'Exploring community cleanliness campaigns, citizen volunteer initiatives, and municipal transparency in Lower Chitral.',
  avatarColor: '#4B5A6B',
  level: 'Guest Explorer',
  joinedAt: new Date().toISOString(),
};

export interface CivicState {
  // Auth & Profile
  currentUser: User;
  currentProfile: Profile;
  profiles: Profile[];
  users: User[];

  // Civic Data
  civicScores: Record<string, CivicScore>;
  activities: Activity[];
  complaints: Complaint[];
  opportunities: Opportunity[];
  organizations: Organization[];
  campaigns: Campaign[];
  activeCampaigns: ActiveCampaign[];
  achievements: Achievement[];
  departments: Department[];
  officers: Officer[];
  locations: Location[];
  aiInsight: AIInsight;

  // Stats Counters (dynamic)
  citizenStats: {
    verifiedActivities: number;
    communityProjects: number;
    volunteerCampaigns: number;
    peopleReached: number;
    problemsReported: number;
    problemsResolved: number;
  };

  // Demo Controls
  demoSettings: {
    forceDuplicateWarning: boolean;
    forceLowResolutionConfidence: boolean;
    simulateUploadFailure: boolean;
  };

  // Portal Authentication & Entry Gateway State
  portalState: {
    hasSelectedPortal: boolean;
    portalMode: 'citizen' | 'admin' | null;
    isGatewayOpen: boolean;
  };
  isAdminIdentityModalOpen: boolean;

  // New Auth & Onboarding state
  isAuthenticated: boolean;
  isOnboardingOpen: boolean;
  onboardingDefaultTab: 'signup' | 'login';
  isAdminAuthModalOpen: boolean;

  // Actions
  openOnboarding: (tab?: 'signup' | 'login') => void;
  closeOnboarding: () => void;
  continueAsGuest: () => void;
  openAdminAuthModal: () => void;
  closeAdminAuthModal: () => void;
  registerAdmin: (data: AdminRegistrationData) => { success: boolean; error?: string };
  openAdminIdentityModal: () => void;
  closeAdminIdentityModal: () => void;
  openGateway: () => void;
  closeGateway: () => void;
  loginAsCitizen: (customName?: string) => void;
  registerCitizen: (data: { fullName: string; email: string; phone: string; locationName: string }) => void;
  loginAsAdmin: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  switchDemoUser: (userId: string) => void;
  setUserRole: (role: 'citizen' | 'organization' | 'admin') => void;
  submitImpactActivity: (params: {
    title: string;
    category: any;
    description: string;
    locationName: string;
    date: string;
    evidence: EvidenceItem[];
    verification: ImpactVerification;
  }) => { activity: Activity; pointsAdded: number; newTotal: number; unlockedAchievement?: Achievement };
  submitComplaint: (params: {
    title: string;
    category: string;
    subcategory?: string;
    description: string;
    locationName: string;
    coordinates?: { lat: number; lng: number };
    evidence: EvidenceItem[];
    severity: ComplaintSeverity;
    isEmergency?: boolean;
    departmentId?: string;
  }) => Complaint;
  updateComplaintStatus: (complaintId: string, status: ComplaintStatus, note: string, actor?: string) => void;
  assignComplaint: (complaintId: string, departmentId: string, officerId?: string, note?: string) => void;
  requestComplaintEvidence: (complaintId: string, note: string) => void;
  verifyComplaintResolution: (complaintId: string, verification: ResolutionVerification, afterImageUrl: string) => void;
  joinOpportunity: (opportunityId: string) => void;
  leaveOpportunity: (opportunityId: string) => void;
  joinActiveCampaign: (campaignId: string, details?: { role?: string; availability?: string }) => void;
  leaveActiveCampaign: (campaignId: string) => void;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'volunteersJoined'>) => void;
  setDemoSetting: (key: keyof CivicState['demoSettings'], value: boolean) => void;
  resetDemoData: () => void;
}

const getInitialState = () => ({
  currentUser: GUEST_USER, // Starts unauthenticated as guest
  currentProfile: GUEST_PROFILE,
  isAuthenticated: false,
  isOnboardingOpen: true, // Shows clean onboarding overlay for new visitors
  onboardingDefaultTab: 'signup' as const,
  isAdminAuthModalOpen: false,
  profiles: [...SEED_PROFILES],
  users: [...SEED_USERS],
  civicScores: JSON.parse(JSON.stringify(SEED_CIVIC_SCORES)),
  activities: [...SEED_ACTIVITIES],
  complaints: [...SEED_COMPLAINTS],
  opportunities: [...SEED_OPPORTUNITIES],
  organizations: [...SEED_ORGANIZATIONS],
  campaigns: [...SEED_CAMPAIGNS],
  activeCampaigns: JSON.parse(JSON.stringify(INITIAL_ACTIVE_CAMPAIGNS)),
  achievements: [...SEED_ACHIEVEMENTS],
  departments: [...SEED_DEPARTMENTS],
  officers: [...SEED_OFFICERS],
  locations: [...SEED_LOCATIONS],
  aiInsight: { ...SEED_AI_INSIGHT },
  citizenStats: {
    verifiedActivities: 27,
    communityProjects: 14,
    volunteerCampaigns: 6,
    peopleReached: 342,
    problemsReported: 8,
    problemsResolved: 6,
  },
  demoSettings: {
    forceDuplicateWarning: false,
    forceLowResolutionConfidence: false,
    simulateUploadFailure: false,
  },
  portalState: {
    hasSelectedPortal: false,
    portalMode: 'citizen' as const,
    isGatewayOpen: false,
  },
  isAdminIdentityModalOpen: false,
});

export const useCivicStore = create<CivicState>()(
  persist(
    (set, get) => ({
      ...getInitialState(),

      openOnboarding: (tab: 'signup' | 'login' = 'signup') => {
        set({
          isOnboardingOpen: true,
          onboardingDefaultTab: tab,
        });
      },

      closeOnboarding: () => {
        set({ isOnboardingOpen: false });
      },

      continueAsGuest: () => {
        set({
          currentUser: GUEST_USER,
          currentProfile: GUEST_PROFILE,
          isAuthenticated: false,
          isOnboardingOpen: false,
          isAdminAuthModalOpen: false,
          isAdminIdentityModalOpen: false,
          portalState: {
            hasSelectedPortal: true,
            portalMode: 'citizen' as const,
            isGatewayOpen: false,
          },
        });
      },

      openAdminAuthModal: () => {
        set({
          isAdminAuthModalOpen: true,
          isOnboardingOpen: false,
        });
      },

      closeAdminAuthModal: () => {
        set({ isAdminAuthModalOpen: false });
      },

      openAdminIdentityModal: () => {
        set({ isAdminAuthModalOpen: true, isOnboardingOpen: false });
      },

      closeAdminIdentityModal: () => {
        set({ isAdminAuthModalOpen: false, isAdminIdentityModalOpen: false });
      },

      openGateway: () => {
        set({ isOnboardingOpen: true });
      },

      closeGateway: () => {
        set({ isOnboardingOpen: false });
      },

      loginAsCitizen: (customName?: string) => {
        const state = get();
        let user = state.users.find((u) => u.id === 'user-mz') || SEED_USERS[0];
        let profile = state.profiles.find((p) => p.userId === 'user-mz') || SEED_PROFILES[0];

        if (customName && customName.trim()) {
          const matchedProfile = state.profiles.find(
            (p) => p.fullName.toLowerCase() === customName.trim().toLowerCase()
          );
          if (matchedProfile) {
            profile = matchedProfile;
            user = state.users.find((u) => u.id === matchedProfile.userId) || user;
          } else {
            profile = {
              ...profile,
              fullName: customName.trim(),
            };
          }
        }

        set({
          currentUser: { ...user, role: 'citizen' },
          currentProfile: profile,
          isAuthenticated: true,
          isOnboardingOpen: false,
          isAdminAuthModalOpen: false,
          isAdminIdentityModalOpen: false,
          portalState: {
            hasSelectedPortal: true,
            portalMode: 'citizen' as const,
            isGatewayOpen: false,
          },
        });
      },

      registerCitizen: ({ fullName, email, phone, locationName }) => {
        const newUserId = `user-cit-${Date.now()}`;
        const newUser: User = {
          id: newUserId,
          role: 'citizen',
          email,
          phone,
          createdAt: new Date().toISOString(),
          verificationStatus: 'verified',
        };

        const newProfile: Profile = {
          userId: newUserId,
          slug: fullName.toLowerCase().replace(/\s+/g, '-'),
          fullName,
          locationId: 'loc-drosh',
          locationName,
          bio: 'Registered citizen volunteer contributing to local civic improvements in Lower Chitral.',
          avatarColor: '#1F6B43',
          level: 'Active Citizen',
          joinedAt: new Date().toISOString(),
        };

        const state = get();
        set({
          users: [newUser, ...state.users],
          profiles: [newProfile, ...state.profiles],
          currentUser: newUser,
          currentProfile: newProfile,
          isAuthenticated: true,
          isOnboardingOpen: false,
          isAdminAuthModalOpen: false,
          portalState: {
            hasSelectedPortal: true,
            portalMode: 'citizen',
            isGatewayOpen: false,
          },
        });
      },

      registerAdmin: (data: AdminRegistrationData) => {
        const newAdminId = `admin-${Date.now()}`;
        const newAdminUser: User = {
          id: newAdminId,
          role: 'admin',
          email: data.officialEmail,
          phone: data.officialPhone,
          createdAt: new Date().toISOString(),
          designation: data.designation,
          verificationStatus: 'verified',
          verificationDocUrl: data.verificationDocument.url,
        };

        const newAdminProfile: Profile = {
          userId: newAdminId,
          slug: data.fullName.toLowerCase().replace(/\s+/g, '-'),
          fullName: `${data.fullName} (${data.designation})`,
          locationId: 'loc-drosh',
          locationName: data.dutyStation || 'Lower Chitral Administration',
          bio: `${data.designation} · ${data.departmentId}. Authorized officer for district oversight and resolution management.`,
          avatarColor: '#0F1B2D',
          level: 'Verified District Officer',
          joinedAt: new Date().toISOString(),
        };

        const state = get();
        set({
          users: [newAdminUser, ...state.users],
          profiles: [newAdminProfile, ...state.profiles],
          currentUser: newAdminUser,
          currentProfile: newAdminProfile,
          isAuthenticated: true,
          isAdminAuthModalOpen: false,
          isOnboardingOpen: false,
          portalState: {
            hasSelectedPortal: true,
            portalMode: 'admin',
            isGatewayOpen: false,
          },
        });

        return { success: true };
      },

      loginAsAdmin: (username: string, password: string) => {
        const u = username.trim().toLowerCase();
        const p = password.trim();

        // Exact credentials: username "DC Chitral", password "Chitral123"
        const isUserMatch =
          u === 'dc chitral' ||
          u === 'dc_chitral' ||
          u === 'dc' ||
          u === 'fida.admin' ||
          u === 'admin';
        const isPassMatch = p === 'Chitral123' || p === 'chitral123' || p === 'admin123';

        const state = get();
        const registeredAdmin = state.users.find(
          (usr) =>
            usr.role === 'admin' &&
            (usr.email.toLowerCase() === u ||
              state.profiles.find((pr) => pr.userId === usr.id)?.fullName.toLowerCase().includes(u))
        );

        if ((isUserMatch && isPassMatch) || (registeredAdmin && p.length >= 4)) {
          const adminUser =
            registeredAdmin ||
            state.users.find((user) => user.id === 'user-dc') ||
            state.users.find((user) => user.id === 'user-fr') ||
            SEED_USERS[1];
          const adminProfile =
            state.profiles.find((prof) => prof.userId === adminUser.id) || SEED_PROFILES[1];

          set({
            currentUser: { ...adminUser, role: 'admin' },
            currentProfile: adminProfile,
            isAuthenticated: true,
            isAdminAuthModalOpen: false,
            isOnboardingOpen: false,
            portalState: {
              hasSelectedPortal: true,
              portalMode: 'admin',
              isGatewayOpen: false,
            },
          });
          return { success: true };
        }

        return {
          success: false,
          error: 'Invalid credentials. Required: Username "DC Chitral", Password "Chitral123" (or registered administrative account).',
        };
      },

      logout: () => {
        set({
          currentUser: GUEST_USER,
          currentProfile: GUEST_PROFILE,
          isAuthenticated: false,
          isOnboardingOpen: false,
          isAdminAuthModalOpen: false,
          isAdminIdentityModalOpen: false,
          portalState: {
            hasSelectedPortal: true,
            portalMode: 'citizen' as const,
            isGatewayOpen: false,
          },
        });
      },

      switchDemoUser: (userId: string) => {
        const user = get().users.find((u) => u.id === userId) || SEED_USERS[0];
        const profile = get().profiles.find((p) => p.userId === userId) || SEED_PROFILES[0];
        set({
          currentUser: user,
          currentProfile: profile,
        });
      },

      setUserRole: (role) => {
        const current = get().currentUser;
        set({
          currentUser: { ...current, role },
        });
      },

      submitImpactActivity: ({ title, category, description, locationName, date, evidence, verification }) => {
        const state = get();
        const user = state.currentUser;
        const profile = state.currentProfile;
        const isMismatch = (verification.confidence < 30) || verification.impactLevel === 'Invalid' || verification.impactTier === 'Invalid' || verification.civicImpactScore <= 20;
        const isWarning = !!verification.warningNote || isMismatch;
        // Award points allocated by AI (which caps at 0-15 for mismatches/unrelated evidence per CivicPulse rules)
        const pointsAdded = Math.max(0, verification.civicImpactScore);

        const newActivity: Activity = {
          id: `act-${Date.now()}`,
          userId: user.id,
          userName: profile.fullName,
          title,
          category,
          description,
          locationId: 'loc-drosh',
          locationName,
          date,
          evidenceIds: evidence.map((e) => e.id),
          evidence,
          verificationId: verification.id,
          verification,
          status: isMismatch ? 'needs_review' : (isWarning ? 'needs_review' : 'verified'),
          participants: verification.estimatedParticipants,
          points: pointsAdded,
          createdAt: new Date().toISOString(),
        };

        const existingScore = state.civicScores[user.id] || {
          userId: user.id,
          total: 1020,
          breakdown: { impact: 560, volunteering: 320, reporting: 140 },
          history: [],
        };

        const newTotal = existingScore.total + pointsAdded;
        const newScore: CivicScore = {
          ...existingScore,
          total: newTotal,
          breakdown: {
            ...existingScore.breakdown,
            impact: existingScore.breakdown.impact + pointsAdded,
          },
          history: [
            {
              id: `h-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              points: pointsAdded,
              activityTitle: title,
              category,
            },
            ...existingScore.history,
          ],
        };

        // Check if Environment Volunteer achievement unlocked
        let unlockedAchievement: Achievement | undefined;
        const achievements = state.achievements.map((ach) => {
          if (ach.key === 'environment-volunteer' && !ach.earnedAt && category === 'Environment') {
            unlockedAchievement = { ...ach, earnedAt: new Date().toISOString() };
            return unlockedAchievement;
          }
          return ach;
        });

        const newTier = getTierForScore(newTotal);

        set({
          activities: [newActivity, ...state.activities],
          civicScores: {
            ...state.civicScores,
            [user.id]: newScore,
          },
          achievements,
          currentProfile: {
            ...profile,
            level: newTier.name,
          },
          citizenStats: {
            ...state.citizenStats,
            verifiedActivities: state.citizenStats.verifiedActivities + 1,
            peopleReached: state.citizenStats.peopleReached + (verification.estimatedParticipants || 25),
          },
        });

        return {
          activity: newActivity,
          pointsAdded,
          newTotal,
          unlockedAchievement,
        };
      },

      submitComplaint: ({
        title,
        category,
        subcategory = 'General Civic Issue',
        description,
        locationName,
        coordinates = { lat: 35.5630, lng: 71.7950 },
        evidence,
        severity,
        isEmergency = false,
        departmentId = 'dept-cw',
      }) => {
        const state = get();
        const user = state.currentUser;
        const profile = state.currentProfile;
        const trackingId = generateTrackingId(2026);
        const dept = state.departments.find((d) => d.id === departmentId) || state.departments[0];

        const newComplaint: Complaint = {
          id: `comp-${Date.now()}`,
          trackingId,
          citizenId: user.id,
          citizenName: profile.fullName,
          title,
          category,
          subcategory,
          description,
          locationId: 'loc-drosh',
          locationName,
          coordinates,
          evidenceIds: evidence.map((e) => e.id),
          evidence,
          severity,
          isEmergency,
          departmentId: dept.id,
          departmentName: dept.name,
          status: 'submitted',
          timeline: [
            {
              id: `t-${Date.now()}`,
              status: 'submitted',
              at: new Date().toISOString(),
              actor: profile.fullName,
              note: `Complaint filed with ${evidence.length} evidence items and verified location metadata.`,
            },
            {
              id: `t-${Date.now() + 1}`,
              status: 'under_review',
              at: new Date(Date.now() + 30000).toISOString(),
              actor: 'CivicPulse AI Triager',
              note: `Automated assessment: categorized as ${category} (${subcategory}), ${severity} priority. Dispatched to ${dept.name}.`,
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set({
          complaints: [newComplaint, ...state.complaints],
          citizenStats: {
            ...state.citizenStats,
            problemsReported: state.citizenStats.problemsReported + 1,
          },
        });

        return newComplaint;
      },

      updateComplaintStatus: (complaintId, status, note, actor) => {
        const state = get();
        const actorName = actor || state.currentProfile.fullName;

        const updated: Complaint[] = state.complaints.map((c) => {
          if (c.id === complaintId || c.trackingId === complaintId) {
            return {
              ...c,
              status,
              updatedAt: new Date().toISOString(),
              timeline: [
                ...c.timeline,
                {
                  id: `t-${Date.now()}`,
                  status: status as ComplaintStatus,
                  at: new Date().toISOString(),
                  actor: actorName,
                  note,
                },
              ],
            };
          }
          return c;
        });

        set({ complaints: updated });
      },

      assignComplaint: (complaintId, departmentId, officerId, note) => {
        const state = get();
        const dept = state.departments.find((d) => d.id === departmentId);
        const officer = officerId ? state.officers.find((o) => o.id === officerId) : undefined;
        const actorName = state.currentProfile.fullName;

        const updated: Complaint[] = state.complaints.map((c) => {
          if (c.id === complaintId || c.trackingId === complaintId) {
            return {
              ...c,
              departmentId: dept?.id || c.departmentId,
              departmentName: dept?.name || c.departmentName,
              officerId: officer?.id || c.officerId,
              officerName: officer?.name || c.officerName,
              status: 'assigned' as ComplaintStatus,
              updatedAt: new Date().toISOString(),
              timeline: [
                ...c.timeline,
                {
                  id: `t-${Date.now()}`,
                  status: 'assigned' as ComplaintStatus,
                  at: new Date().toISOString(),
                  actor: actorName,
                  note: note || `Assigned to ${dept?.name || 'Department'}${officer ? ` (Officer: ${officer.name})` : ''}.`,
                },
              ],
            };
          }
          return c;
        });

        set({ complaints: updated });
      },

      requestComplaintEvidence: (complaintId, note) => {
        const state = get();
        const actorName = state.currentProfile.fullName;

        const updated: Complaint[] = state.complaints.map((c) => {
          if (c.id === complaintId || c.trackingId === complaintId) {
            return {
              ...c,
              status: 'needs_evidence' as ComplaintStatus,
              updatedAt: new Date().toISOString(),
              timeline: [
                ...c.timeline,
                {
                  id: `t-${Date.now()}`,
                  status: 'needs_evidence' as ComplaintStatus,
                  at: new Date().toISOString(),
                  actor: actorName,
                  note: note || 'Additional photographic evidence or specific milestone landmark verification requested from citizen.',
                },
              ],
            };
          }
          return c;
        });

        set({ complaints: updated });
      },

      verifyComplaintResolution: (complaintId, verification, afterImageUrl) => {
        const state = get();
        const actorName = state.currentProfile.fullName;

        const updated: Complaint[] = state.complaints.map((c) => {
          if (c.id === complaintId || c.trackingId === complaintId) {
            return {
              ...c,
              status: 'resolved' as ComplaintStatus,
              afterEvidenceUrl: afterImageUrl || c.afterEvidenceUrl,
              resolutionVerification: verification,
              updatedAt: new Date().toISOString(),
              timeline: [
                ...c.timeline,
                {
                  id: `t-${Date.now()}`,
                  status: 'resolved' as ComplaintStatus,
                  at: new Date().toISOString(),
                  actor: actorName,
                  note: `Resolution verified with before/after visual audit (${verification.confidence}% confidence). Work order closed.`,
                },
              ],
            };
          }
          return c;
        });

        set({
          complaints: updated,
          citizenStats: {
            ...state.citizenStats,
            problemsResolved: state.citizenStats.problemsResolved + 1,
          },
        });
      },

      joinOpportunity: (opportunityId) => {
        const state = get();
        const updated = state.opportunities.map((opp) => {
          if (opp.id === opportunityId && !opp.isJoined && opp.filled < opp.volunteersNeeded) {
            return {
              ...opp,
              filled: opp.filled + 1,
              isJoined: true,
            };
          }
          return opp;
        });

        set({
          opportunities: updated,
          citizenStats: {
            ...state.citizenStats,
            volunteerCampaigns: state.citizenStats.volunteerCampaigns + 1,
          },
        });
      },

      leaveOpportunity: (opportunityId) => {
        const state = get();
        const updated = state.opportunities.map((opp) => {
          if (opp.id === opportunityId && opp.isJoined) {
            return {
              ...opp,
              filled: Math.max(0, opp.filled - 1),
              isJoined: false,
            };
          }
          return opp;
        });

        set({
          opportunities: updated,
          citizenStats: {
            ...state.citizenStats,
            volunteerCampaigns: Math.max(0, state.citizenStats.volunteerCampaigns - 1),
          },
        });
      },

      joinActiveCampaign: (campaignId, details) => {
        const state = get();
        const updated = state.activeCampaigns.map((camp) => {
          if (camp.id === campaignId) {
            return {
              ...camp,
              isJoined: true,
              volunteersJoined: camp.volunteersJoined + 1,
              userRole: details?.role || 'Field Volunteer',
              joinedDate: new Date().toISOString(),
            };
          }
          return camp;
        });

        set({
          activeCampaigns: updated,
          citizenStats: {
            ...state.citizenStats,
            volunteerCampaigns: state.citizenStats.volunteerCampaigns + 1,
          },
        });
      },

      leaveActiveCampaign: (campaignId) => {
        const state = get();
        const updated = state.activeCampaigns.map((camp) => {
          if (camp.id === campaignId) {
            return {
              ...camp,
              isJoined: false,
              volunteersJoined: Math.max(0, camp.volunteersJoined - 1),
              userRole: undefined,
              joinedDate: undefined,
            };
          }
          return camp;
        });

        set({
          activeCampaigns: updated,
          citizenStats: {
            ...state.citizenStats,
            volunteerCampaigns: Math.max(0, state.citizenStats.volunteerCampaigns - 1),
          },
        });
      },

      createCampaign: (campaignData) => {
        const state = get();
        const newCampaign: Campaign = {
          id: `camp-${Date.now()}`,
          ...campaignData,
          volunteersJoined: 1,
        };

        set({
          campaigns: [newCampaign, ...state.campaigns],
        });
      },

      setDemoSetting: (key, value) => {
        const state = get();
        set({
          demoSettings: {
            ...state.demoSettings,
            [key]: value,
          },
        });
      },

      resetDemoData: () => {
        localStorage.removeItem('civicpulse-store-v3');
        localStorage.removeItem('civicpulse-store-v2');
        localStorage.removeItem('civicpulse-store-v1');
        set(getInitialState());
      },
    }),
    {
      name: 'civicpulse-store-v3',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAdminAuthModalOpen = false;
          state.isAdminIdentityModalOpen = false;
          // If not authenticated, ensure guest identity is active
          if (!state.isAuthenticated) {
            state.currentUser = GUEST_USER;
            state.currentProfile = GUEST_PROFILE;
          }
        }
      },
    }
  )
);
