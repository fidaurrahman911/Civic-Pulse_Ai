# CivicPulse AI: Civic Technology Platform

> **Tagline:** Do Good. Prove It. Get Recognized. Improve Your Community.  
> **Positioning:** Designed as a civic technology platform for citizens and administration.

---

## 1. Project Overview

CivicPulse AI is a digital accountability layer between citizens and municipal administration in Lower Chitral, Khyber Pakhtunkhwa. It bridges two interconnected tracks:

1. **Citizen Impact:** Citizens document verified community service (e.g. tree plantations, bazaar cleanups, youth literacy camps), undergo multi-step AI evidence audits, earn Civic Points, achieve reputation ranks (from *Active Citizen* to *Community Leader*), and build verifiable public impact profiles.
2. **Civic Accountability:** Citizens report civic hazards (damaged roads, burst water mains, landslides) with GPS and photos, receive an immutable tracking ID (e.g. `CP-2026-008420`), and follow cases through an interactive 5-stage timeline. Administrators triage complaints, dispatch officers, and verify resolution using automated Before/After visual comparison.

---

## 2. Quickstart & Installation

```bash
# Clone and install dependencies
npm install

# Start local development server on port 3000
npm run dev

# Run type check and lint validation
npm run lint

# Compile production bundle
npm run build
```

---

## 3. Architecture & Folder Map

```text
src/
├── components/
│   ├── ai/               # DistrictAssistant, AI analysis dialogs
│   ├── civic/            # Avatar, ConfidenceMeter, StatusBadge, SeverityBadge,
│   │                     # ScoreRing, IntegrityChecklist, Timeline, EditorialImage, DemoAiBadge
│   ├── layout/           # Header, Footer, MobileNav, DemoControlsModal
│   └── map/              # CivicMap (Leaflet + OpenStreetMap layer toggles)
├── data/
│   ├── images.ts         # Verified regional photography (Chitral/Drosh) & SVG fallbacks
│   └── seedData.ts       # Single source of truth (25 complaints, 20 activities, 30 leaderboard ranks)
├── lib/
│   ├── ai/               # CivicAIProvider abstraction & DemoCivicAIProvider
│   ├── format.ts         # Date, number, and deterministic avatar color helpers
│   ├── ids.ts            # Sequential tracking ID generator (CP-2026-XXXXXX)
│   └── scoring.ts        # Reputation levels & progression logic
├── pages/                # Complete route implementations
├── store/
│   └── useCivicStore.ts  # Zustand store with persistent client state
└── types/
    └── index.ts          # Complete domain models & relationship diagram
```

---

## 4. Swapping the Demo AI Provider for Production Gemini

The application utilizes a clean provider abstraction defined in `src/lib/ai/types.ts`:

```typescript
export interface CivicAIProvider {
  verifyImpact(input: ImpactSubmission, onProgress?: (idx: number, label: string) => void): Promise<ImpactVerification>;
  analyzeComplaint(input: ComplaintSubmission, onProgress?: (idx: number, label: string) => void): Promise<ComplaintAnalysis>;
  verifyResolution(input: ResolutionInput, onProgress?: (idx: number, label: string) => void): Promise<ResolutionVerification>;
  answerDistrictQuestion(query: string, context: DistrictContext): Promise<AssistantAnswer>;
}
```

To plug in a real multimodal model (such as Gemini 2.5 / 3.8 Flash via `@google/genai`):
1. In `src/lib/ai/gemini-provider.ts`, implement `CivicAIProvider` using `ai.models.generateContent({ model: 'gemini-2.5-flash', contents: [...] })`.
2. In `src/lib/ai/index.ts`, swap `civicAi = process.env.AI_PROVIDER === 'gemini' ? new GeminiCivicAIProvider() : demoAiProvider`.

---

## 5. Connecting Supabase Relational Database

A complete production schema is provided in `/supabase/schema.sql`. It includes:
- Tables for `profiles`, `activities`, `verifications`, `complaints`, `complaint_timeline`, `evidence`, `opportunities`, `campaigns`, and `locations`.
- Row Level Security (RLS) policies enforcing citizen privacy and administrative role updates.
- Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` to switch from Zustand local storage to live PostgreSQL.

---

## 6. Known Limitations & Next Steps

1. **Vision Models:** The current demonstration utilizes deterministic and hash-seeded AI simulation (`DemoCivicAIProvider`) labeled clearly with `DemoAiBadge`. Production integration requires server-side image tokenization with Google Cloud Vision / Gemini Multimodal API.
2. **Push Notifications:** Currently SMS and email previews are displayed client-side; production deployment should connect Twilio or Firebase Cloud Messaging for instant citizen SMS dispatch.
3. **Offline Map Caching:** Leaflet loads tiles from OpenStreetMap; offline caching with service workers (PWA) can be added for mountain valleys with intermittent connectivity.
