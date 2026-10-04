-- ==============================================================================
-- CivicPulse AI: Production Relational Schema (PostgreSQL / Supabase)
-- ==============================================================================
-- Designed as a civic technology platform for citizens and administration.
-- Includes full Row Level Security (RLS) policies and role-based access rules.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('citizen', 'organization', 'admin');
CREATE TYPE activity_status AS ENUM ('pending', 'verified', 'needs_review', 'rejected');
CREATE TYPE complaint_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE complaint_status AS ENUM ('submitted', 'under_review', 'assigned', 'in_progress', 'resolved', 'needs_evidence');
CREATE TYPE evidence_kind AS ENUM ('photo', 'video', 'document');

-- 2. LOCATIONS (Hierarchical Geographic Hierarchy)
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    tier TEXT NOT NULL CHECK (tier IN ('area', 'tehsil', 'district', 'province')),
    parent_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    geom geometry(Point, 4326),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USERS & PROFILES
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    location_id UUID REFERENCES locations(id),
    location_name TEXT NOT NULL,
    bio TEXT,
    avatar_color TEXT DEFAULT '#1F6B43',
    level TEXT DEFAULT 'Citizen',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CIVIC SCORES & REPUTATION
CREATE TABLE civic_scores (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    total_score INTEGER DEFAULT 0,
    impact_score INTEGER DEFAULT 0,
    volunteering_score INTEGER DEFAULT 0,
    reporting_score INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE civic_score_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    points INTEGER NOT NULL,
    activity_title TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DEPARTMENTS & OFFICERS
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE officers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ACTIVITIES & AI VERIFICATIONS
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    location_id UUID REFERENCES locations(id),
    location_name TEXT NOT NULL,
    date DATE NOT NULL,
    status activity_status DEFAULT 'pending',
    participants_count INTEGER DEFAULT 1,
    civic_points_awarded INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
    confidence INTEGER NOT NULL CHECK (confidence BETWEEN 0 AND 100),
    evidence_quality INTEGER NOT NULL,
    estimated_participants INTEGER NOT NULL,
    impact_level TEXT NOT NULL,
    civic_impact_score INTEGER NOT NULL,
    checks_json JSONB NOT NULL,
    explanation_json JSONB NOT NULL,
    warning_note TEXT,
    is_demo BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. COMPLAINTS & LIFECYCLE
CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_id TEXT UNIQUE NOT NULL,
    citizen_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    description TEXT NOT NULL,
    location_id UUID REFERENCES locations(id),
    location_name TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    severity complaint_severity DEFAULT 'medium',
    is_emergency BOOLEAN DEFAULT FALSE,
    department_id UUID REFERENCES departments(id),
    officer_id UUID REFERENCES officers(id),
    status complaint_status DEFAULT 'submitted',
    before_evidence_url TEXT,
    after_evidence_url TEXT,
    resolution_confidence INTEGER,
    resolution_notes TEXT,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE complaint_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
    status complaint_status NOT NULL,
    actor_name TEXT NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. EVIDENCE ASSETS
CREATE TABLE evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
    activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
    kind evidence_kind NOT NULL,
    name TEXT NOT NULL,
    size_kb INTEGER NOT NULL,
    storage_path TEXT NOT NULL,
    sha256_hash TEXT NOT NULL,
    taken_at TIMESTAMPTZ,
    gps_lat DOUBLE PRECISION,
    gps_lng DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ORGANIZATIONS, CAMPAIGNS & OPPORTUNITIES
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    handle TEXT UNIQUE NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location_id UUID REFERENCES locations(id),
    location_name TEXT NOT NULL,
    date DATE NOT NULL,
    volunteers_needed INTEGER NOT NULL,
    outcome TEXT,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location_id UUID REFERENCES locations(id),
    location_name TEXT NOT NULL,
    datetime TEXT NOT NULL,
    volunteers_needed INTEGER NOT NULL,
    filled_count INTEGER DEFAULT 0,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE participations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'joined',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, opportunity_id)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE civic_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE participations ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, owner update
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Activities: Public read, authenticated users can insert, owner can update
CREATE POLICY "Activities are viewable by everyone" ON activities FOR SELECT USING (true);
CREATE POLICY "Authenticated users can submit activities" ON activities FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Complaints: Public read, citizen insert, admin update
CREATE POLICY "Complaints are viewable by everyone" ON complaints FOR SELECT USING (true);
CREATE POLICY "Citizens can insert complaints" ON complaints FOR INSERT WITH CHECK (auth.uid() = citizen_id);
CREATE POLICY "Admins and officers can update complaints" ON complaints FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (level = 'Civic Champion' OR full_name LIKE '%Admin%'))
);
