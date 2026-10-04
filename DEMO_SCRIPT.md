# CivicPulse AI: 3-5 Minute Live Demo Script

Use this script during your hackathon presentation or judge walkthrough. Every step matches an exact UI button and live store transition.

---

### Step 0: The Dual-Portal Gateway & Elevator Pitch
- **Start at:** `http://localhost:3000/`
- **Initial Screen:**  
  When entering for the first time, visitors encounter the **Portal Access Gateway**:
  1. **Citizen & Volunteer Portal (Left/Main Card):**  
     Designed for open community access. Allows citizens to sign in (as *Muhammad Zulkaif* with 1-click, or any custom name) or register a new account. Grants access to:
     - Documenting verified community work (`/impact/new`)
     - Reporting public hazards with photos & GPS (`/report`)
     - Real-time complaint tracking (`/complaints/:id`)
     - District leaderboard and public profile
     - **No administration access** (administrative work order desks and dispatch tools are strictly restricted).
  2. **District Administration Desk (Right Card):**  
     Restricted to authorized municipal officers (Deputy Commissioner Office, C&W Department, TMA).  
     - **Official Username:** `DC Chitral`  
     - **Password:** `Chitral123`  
     - Grants access to the full district command center: complaint triage, engineer dispatch, before/after resolution verification, and civic heatmap.
- **Select:** Click **"Enter Citizen & Volunteer Interface"** (as Muhammad Zulkaif) to start Journey A.

---

### Step 1: Journey A — Citizen Impact (+72 Civic Points)
- **Click:** Top nav or hero button **"+ Submit Impact"** (`/impact/new`).
- **Say:**  
  *"Here we are signed in as Muhammad Zulkaif, a youth organizer in Drosh with an initial Civic Score of 1,020."*
- **Click:** The **"Fill Demo Example"** button in the top right.  
  *(Form fills with 'Cleanliness Campaign at Drosh Bazaar', 25 volunteers, photos, GPS).*
- **Click:** **"Submit for AI Verification"**.
- **Observe:**  
  Watch the 6-step verification pipeline execute:
  1. Image relevance check
  2. Scene participant estimation (25 people)
  3. Duplicate detection
  4. Manipulation check
  5. Location verification
  6. Activity consistency
- **Result:**  
  - Confidence: **91%**  
  - Civic Impact Score: **72/100**  
  - Confetti fires!  
  - Score animates: **1,020 → 1,092 points (+72)**  
  - Badge unlocked: **"Environment Volunteer"**  
- **Click:** **"View on Profile"** (`/profile/muhammad-zulkaif`). Point out the new activity listed under Verified Contributions with the exact +72 pts.
- **Click:** **"Leaderboard"** in the top nav (`/leaderboard`). Point out that Muhammad Zulkaif is now ranked **#2** in Lower Chitral with **1,092 points**, ahead of Ali Ahmad (987) and right behind Ahmad Khan (1,284).

---

### Step 2: Journey B — Civic Complaint & Triage
- **Click:** Header button **"Report a Problem"** (`/report`).
- **Say:**  
  *"Now let's switch to the second side: Civic Accountability. A citizen discovers severe road erosion near Drosh Main Bazaar."*
- **Click:** **"Fill Demo Example"** in top right.  
  *(Fills 'Broken Road and Deep Potholes Near Main Bazaar', location, photos).*
- **Click:** **"Submit Report"**.
- **Observe:**  
  - AI triaging engine analyzes visual hazard:  
    - Category: **Infrastructure**  
    - Subcategory: **Road Damage**  
    - Severity: **High Priority**  
    - Recommended Department: **C&W Department**  
  - Official Tracking ID generated: **`CP-2026-008421`**.
- **Click:** **"Track Complaint Lifecycle"** (`/complaints/CP-2026-008421`).  
  Show the interactive vertical timeline showing *Submitted* and *Under Review*.

---

### Step 3: Administration Review & Before/After Verification
- **Click:** Top right **"Portal: Citizen"** button or user menu → **"Admin Login (DC Chitral)"**.
- **Action:** In the Administration portal card:
  - Username: `DC Chitral`
  - Password: `Chitral123`
  - Click **"Authenticate as DC Chitral"**.
- **Say:**  
  *"Notice the immediate interface transition: the top bar now reflects the official District Administration Portal. Citizens cannot access this section. As DC Chitral, we now oversee all municipal dispatch pipelines, work orders, emergency flood alerts, and engineering audits."*
- **Click:** **"Complaints & Dispatch Work Orders"** (`/admin/complaints`).
- **Click:** The top complaint case row (`Broken Road and Deep Potholes Near Main Bazaar`).
- **Action:**
  1. Scroll down to the **Resolution Verification (Before & After Audit)** panel.
  2. Point out the two large comparison panels labeled **BEFORE** (damaged asphalt) and **AFTER** (resurfaced municipal roadway).
  3. Click **"Run AI Resolution Verification"**.
  4. The engine performs spatial feature delta comparison: **87% Confidence ("Visual comparison indicates substantial change between submitted before and after evidence")**.
  5. Click **"Confirm & Mark Resolved"**.
- **Result:**  
  - Work order status updates to **Resolved ✓**.
  - Timeline records closure note by Fida Ur Rahman.
  - Resolved complaints count increments across the admin stats and public transparency dashboard!

---

### Step 4: Geographic Heatmap & AI District Assistant
- **Click:** **"Civic Map"** in header (`/map` or `/admin/map`).
- **Show:**  
  - Leaflet map centered on Drosh/Chitral with OpenStreetMap tiles.
  - Toggle layers: *Citizen Activities* (green pins), *Unresolved* (yellow), *Emergencies* (red squares).
  - Click any marker to open the detailed drawer panel.
- **Navigate to:** `/admin`. Scroll to the embedded **AI District Data Assistant**.
- **Click:** Suggested query: **"What are the biggest problems in Drosh this month?"**
- **Say:**  
  *"The assistant queries the live municipal store data and returns structured findings: Infrastructure and Sanitation account for majority of complaints, with an active breakdown by category."*

---

### Wrap Up
- Point to the footer: *"Designed as a civic technology platform for citizens and administration. All figures shown are demo data."*
- Click **"Reset Demo Data"** to restore pristine state for the next judge!
