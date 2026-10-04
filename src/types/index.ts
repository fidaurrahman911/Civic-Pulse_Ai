/**
 * CivicPulse AI - Domain Models & Types
 *
 * RELATIONSHIP DIAGRAM:
 * 
 *   [User] 1 ──── 1 [Profile]
 *     │                 │
 *     ├───── 1:N ──── [CivicScore (history)]
 *     ├───── 1:N ──── [Activity] ── 1:1 ── [Verification]
 *     │                  └── N:M ── [Evidence]
 *     ├───── 1:N ──── [Complaint] ── 1:1 ── [ComplaintAnalysis]
 *     │                  ├── N:M ── [Evidence (Before/After)]
 *     │                  └── 1:1 ── [ResolutionVerification]
 *     ├───── N:M ──── [Opportunity] (via [Participation])
 *     └───── 1:N ──── [Achievement]
 *
 *   [Organization] 1 ──── N [Campaign]
 *   [Department]   1 ──── N [Officer]
 *   [Location]     Hierarchical: Province -> District -> Tehsil -> Area
 */

export type UserRole = 'citizen' | 'organization' | 'admin' | 'guest';

export interface AdminVerificationDocument {
  id: string;
  name: string;
  type: string;
  sizeKb: number;
  url: string;
  uploadedAt: string;
}

export interface AdminRegistrationData {
  fullName: string;
  designation: string;
  departmentId: string;
  officialEmail: string;
  officialPhone: string;
  cnicNumber: string;
  employeeId: string;
  verificationDocument: AdminVerificationDocument;
  dutyStation: string;
}

export interface User {
  id: string;
  role: UserRole;
  email: string;
  phone: string;
  createdAt: string;
  designation?: string;
  verificationStatus?: 'verified' | 'pending_verification' | 'none';
  verificationDocUrl?: string;
}

export interface Profile {
  userId: string;
  slug: string;
  fullName: string;
  locationId: string;
  locationName: string;
  bio: string;
  avatarColor: string;
  level: string;
  joinedAt: string;
}

export interface CivicScoreHistory {
  id: string;
  date: string;
  points: number;
  activityTitle: string;
  category: string;
}

export interface CivicScore {
  userId: string;
  total: number;
  breakdown: {
    impact: number;
    volunteering: number;
    reporting: number;
  };
  history: CivicScoreHistory[];
}

export type ActivityCategory = 
  | 'Environment' 
  | 'Education' 
  | 'Health' 
  | 'Technology' 
  | 'Sports' 
  | 'Infrastructure' 
  | 'Social Welfare' 
  | 'Disaster Response' 
  | 'Youth Development' 
  | 'Other';

export type ActivityStatus = 'pending' | 'verified' | 'needs_review' | 'rejected';

export interface EvidenceItem {
  id: string;
  kind: 'photo' | 'video' | 'document';
  name: string;
  sizeKb: number;
  url: string;
  takenAt?: string;
  gps?: { lat: number; lng: number };
  hash: string;
}

export interface VerificationCheck {
  key: string;
  label: string;
  status: 'pass' | 'warn' | 'fail';
  detail: string;
}

export interface ImpactVerification {
  id: string;
  subjectType: 'activity';
  subjectId: string;
  confidence: number;
  evidenceConfidence?: number;
  evidenceQuality: number;
  checks: VerificationCheck[];
  estimatedParticipants: number;
  impactLevel: 'Invalid' | 'Low' | 'Medium' | 'High' | 'Exceptional';
  impactTier?: 'Invalid' | 'Low' | 'Medium' | 'High';
  civicImpactScore: number;
  summary?: string;
  reasoning?: string;
  explanation: string[];
  isDemo?: boolean;
  warningNote?: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  title: string;
  category: ActivityCategory;
  description: string;
  locationId: string;
  locationName: string;
  date: string;
  evidenceIds: string[];
  evidence?: EvidenceItem[];
  verificationId?: string;
  verification?: ImpactVerification;
  status: ActivityStatus;
  participants: number;
  points: number;
  createdAt: string;
}

export interface Achievement {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  earnedAt?: string;
  criteria: string;
}

export type ComplaintSeverity = 'low' | 'medium' | 'high' | 'critical';

export type ComplaintStatus = 
  | 'submitted' 
  | 'under_review' 
  | 'assigned' 
  | 'in_progress' 
  | 'resolved' 
  | 'needs_evidence';

export interface TimelineEvent {
  id: string;
  status: ComplaintStatus;
  at: string;
  actor: string;
  note: string;
}

export interface ComplaintAnalysis {
  id: string;
  category: string;
  subcategory: string;
  severity: ComplaintSeverity;
  confidence: number;
  locationVerified: boolean;
  recommendedDepartmentId: string;
  recommendedDepartmentName: string;
  isDemo?: boolean;
  summary: string;
  civicImpactScore?: number;
}

export interface ResolutionVerification {
  id: string;
  confidence: number;
  notes: string;
  verifiedAt: string;
  visualDifferenceScore: number;
  isDemo?: boolean;
}

export interface Complaint {
  id: string;
  trackingId: string;
  citizenId: string;
  citizenName: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  locationId: string;
  locationName: string;
  coordinates: { lat: number; lng: number };
  evidenceIds: string[];
  evidence?: EvidenceItem[];
  severity: ComplaintSeverity;
  isEmergency: boolean;
  aiAnalysisId?: string;
  aiAnalysis?: ComplaintAnalysis;
  departmentId: string;
  departmentName: string;
  officerId?: string;
  officerName?: string;
  status: ComplaintStatus;
  timeline: TimelineEvent[];
  beforeEvidenceUrl?: string;
  afterEvidenceUrl?: string;
  resolutionVerification?: ResolutionVerification;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface Officer {
  id: string;
  name: string;
  departmentId: string;
  title: string;
  phone: string;
}

export interface Organization {
  id: string;
  name: string;
  handle: string;
  verified: boolean;
  category: string;
  location: string;
  description: string;
  activeCampaignsCount: number;
  totalVolunteersEngaged: number;
}

export interface Campaign {
  id: string;
  orgId: string;
  orgName: string;
  title: string;
  locationId: string;
  locationName: string;
  date: string;
  volunteersNeeded: number;
  volunteersJoined: number;
  outcome?: string;
  category: string;
  description: string;
}

export interface Opportunity {
  id: string;
  title: string;
  locationId: string;
  locationName: string;
  datetime: string;
  volunteersNeeded: number;
  filled: number;
  category: ActivityCategory;
  orgId: string;
  orgName: string;
  description: string;
  isJoined?: boolean;
}

export interface Participation {
  id: string;
  userId: string;
  opportunityId: string;
  status: 'joined' | 'attended' | 'cancelled';
  joinedAt: string;
}

export interface Location {
  id: string;
  name: string;
  tier: 'area' | 'tehsil' | 'district' | 'province';
  parentId?: string;
  lat: number;
  lng: number;
  unresolvedCount?: number;
  participationCount?: number;
}

export interface AIInsight {
  id: string;
  scope: string;
  text: string;
  generatedAt: string;
  basis: string;
  locations: string[];
  isDemo?: boolean;
}

export interface DistrictStatistic {
  scope: string;
  registeredCitizens: number;
  activeVolunteers: number;
  verifiedActivities: number;
  problemsReported: number;
  problemsResolved: number;
  pendingProblems: number;
  avgResolutionDays: number;
}
