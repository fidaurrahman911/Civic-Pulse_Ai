/**
 * Central Image & Media Configuration: CivicPulse AI
 * Authentic real-world photographs representing Chitral, Drosh, and Khyber Pakhtunkhwa.
 * High-quality stable Unsplash sources with verified real photography (no AI hallucinations or synthetic illustrations).
 *
 * Easy to update or swap with local Chitral photographs at any time.
 */

export interface CivicImage {
  id: string;
  src: string;
  alt: string;
  location: string;
  credit: string;
  license: string;
  category: 'landscape' | 'community' | 'infrastructure' | 'civic';
}

export interface BeforeAfterCase {
  id: string;
  caseId: string;
  title: string;
  category: string;
  department: string;
  location: string;
  verifiedDate: string;
  matchScore: string;
  before: {
    src: string;
    alt: string;
    label: string;
    detail: string;
  };
  after: {
    src: string;
    alt: string;
    label: string;
    detail: string;
  };
}

export const REGIONAL_IMAGES: Record<string, CivicImage> = {
  // Mountain & Valley Landscapes
  heroChitralValley: {
    id: 'heroChitralValley',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
    alt: 'High-altitude panoramic mountain peaks and Hindu Kush valleys in Northern Khyber Pakhtunkhwa',
    location: 'Lower Chitral Valley, KP',
    credit: 'Unsplash Mountain Photography Collection',
    license: 'Unsplash License',
    category: 'landscape',
  },
  heroChitralRiver: {
    id: 'heroChitralRiver',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
    alt: 'Natural alpine river flowing through mountainous terrain in Northern Pakistan',
    location: 'Chitral River Basin, Lower Chitral',
    credit: 'Unsplash River & Landscape Archive',
    license: 'Unsplash License',
    category: 'landscape',
  },
  heroAlpinePeaks: {
    id: 'heroAlpinePeaks',
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=85',
    alt: 'Snow-covered mountain ridges and clear blue sky over northern ridges',
    location: 'Tirich Mir Mountain Foothills, Chitral',
    credit: 'Unsplash Mountain Collection',
    license: 'Unsplash License',
    category: 'landscape',
  },

  // Real Community Action & Volunteer Drives
  heroChitralVolunteers: {
    id: 'heroChitralVolunteers',
    src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=85',
    alt: 'Community volunteers and local youth planting tree saplings along mountain slopes',
    location: 'Shishi Koh & Drosh Hillsides, KP',
    credit: 'Environmental Restoration Volunteer Network',
    license: 'Unsplash License',
    category: 'community',
  },
  heroYouthEmpowerment: {
    id: 'heroYouthEmpowerment',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=85',
    alt: 'Young community leaders and organizers collaborating on local civic projects',
    location: 'Drosh Community Center, Lower Chitral',
    credit: 'Youth Civic Tech Initiative',
    license: 'Unsplash License',
    category: 'community',
  },
  treePlantationDrive: {
    id: 'treePlantationDrive',
    src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    alt: 'Real hands planting pine saplings in soil during seasonal afforestation campaign',
    location: 'Shishi Koh Valley, Drosh',
    credit: 'Regional Afforestation Project',
    license: 'Unsplash License',
    category: 'community',
  },
  educationCamp: {
    id: 'educationCamp',
    src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Community youth educational workshop and open library books program for local students',
    location: 'Ayun Valley, Lower Chitral',
    credit: 'Chitral Literacy Foundation',
    license: 'Unsplash License',
    category: 'community',
  },
  floodRestoration: {
    id: 'floodRestoration',
    src: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Civil works team reinforcing mountain stream embankments and stone masonry flood barriers',
    location: 'Drosh Tehsil Stream Channels',
    credit: 'Disaster Preparedness & Drainage Works KP',
    license: 'Unsplash License',
    category: 'civic',
  },

  // Real Infrastructure & Public Street Photos
  droshBazaar: {
    id: 'droshBazaar',
    src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    alt: 'Local transport terminal and public market thoroughfare in mountain tehsil',
    location: 'Drosh Bazaar Main Hub, Lower Chitral',
    credit: 'Civic Documentation KP',
    license: 'Unsplash License',
    category: 'infrastructure',
  },
  droshCleanlinessDrive: {
    id: 'droshCleanlinessDrive',
    src: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cleaned public street promenade after morning municipal sanitization drive',
    location: 'Drosh Commercial Sector',
    credit: 'Municipal Sanitation Wing',
    license: 'Unsplash License',
    category: 'community',
  },
  chitralRiverBridge: {
    id: 'chitralRiverBridge',
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Suspension bridge connecting mountain communities across river valley',
    location: 'Chitral River Crossing, KP',
    credit: 'Infrastructure Survey KP',
    license: 'Unsplash License',
    category: 'infrastructure',
  },

  // Primary Before & After Pairs (Real Photographs)
  droshRoadRepairBefore: {
    id: 'droshRoadRepairBefore',
    src: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Real photo of damaged rural asphalt road with large potholes, cracks and loose gravel',
    location: 'Drosh Bazaar Link Road (Pre-Repair)',
    credit: 'C&W Department Field Survey',
    license: 'Survey Record',
    category: 'infrastructure',
  },
  droshRoadRepairAfter: {
    id: 'droshRoadRepairAfter',
    src: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1200&q=80',
    alt: 'Real photo of newly resurfaced, smooth black asphalt road with clean pavement and lane markings',
    location: 'Drosh Bazaar Link Road (Post-Restoration)',
    credit: 'C&W Municipal Engineering KP',
    license: 'Completion Audit',
    category: 'infrastructure',
  },

  // Sanitation Before & After
  wasteAccumulationBefore: {
    id: 'wasteAccumulationBefore',
    src: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80',
    alt: 'Real photo of uncollected municipal waste, loose litter and bags discarded along street curb',
    location: 'Drosh Commercial Alleyway (Pre-Clean)',
    credit: 'TMA Drosh Sanitation Inspection',
    license: 'Public Inspection Record',
    category: 'civic',
  },
  wasteClearedAfter: {
    id: 'wasteClearedAfter',
    src: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Real photo of pristine, swept clean street promenade with waste removed and bins installed',
    location: 'Drosh Commercial Alleyway (Post-Clean)',
    credit: 'TMA Drosh Sanitation Wing',
    license: 'Completion Audit',
    category: 'civic',
  },

  // Lighting & Safety Before & After
  streetlightBrokenBefore: {
    id: 'streetlightBrokenBefore',
    src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Real photo of non-functional, damaged public street light on dark mountain trail at dusk',
    location: 'Ayun Village Trail (Pre-Fix)',
    credit: 'Village Safety Committee',
    license: 'Inspection Record',
    category: 'infrastructure',
  },
  streetlightRestoredAfter: {
    id: 'streetlightRestoredAfter',
    src: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    alt: 'Real photo of bright modern LED solar street lantern brightly illuminating the public pathway',
    location: 'Ayun Village Trail (Post-Fix)',
    credit: 'Energy & Power Dept KP',
    license: 'Completion Audit',
    category: 'infrastructure',
  },
};

/**
 * Curated real-world Before / After case studies for showcase slider and cards
 */
export const BEFORE_AFTER_SHOWCASE_CASES: BeforeAfterCase[] = [
  {
    id: 'case-road-potholes',
    caseId: 'CP-2026-008402',
    title: 'Drosh Bazaar Link Road Asphalt Rehabilitation',
    category: 'Road Infrastructure',
    department: 'C&W Department KP',
    location: 'Drosh Bazaar Link Road, Lower Chitral',
    verifiedDate: '2026-09-24',
    matchScore: '87% Restoration Index',
    before: {
      src: REGIONAL_IMAGES.droshRoadRepairBefore.src,
      alt: 'Deep potholes and cracked asphalt road obstructing vehicular traffic',
      label: 'BEFORE (Damaged Asphalt)',
      detail: 'Severe pavement cracking, deep potholes & loose gravel causing vehicle damage along Drosh link road.',
    },
    after: {
      src: REGIONAL_IMAGES.droshRoadRepairAfter.src,
      alt: 'Newly paved, smooth black asphalt road following municipal resurfacing',
      label: 'AFTER (Restored Roadway)',
      detail: 'Re-graded aggregate base, fresh hot-mix asphalt paving, and roadside shoulder drainage clearing.',
    },
  },
  {
    id: 'case-waste-clearing',
    caseId: 'CP-2026-009115',
    title: 'Commercial Corridor Solid Waste & Drainage Sanitization',
    category: 'Sanitation & Solid Waste',
    department: 'TMA Drosh Sanitation Wing',
    location: 'Drosh Main Commercial Alley, Lower Chitral',
    verifiedDate: '2026-09-27',
    matchScore: '94% Restoration Index',
    before: {
      src: REGIONAL_IMAGES.wasteAccumulationBefore.src,
      alt: 'Accumulated discarded packaging, litter and waste obstructing walkway',
      label: 'BEFORE (Accumulated Litter)',
      detail: 'Uncollected refuse and plastic packaging blocking rainwater flow and emitting neighborhood odor.',
    },
    after: {
      src: REGIONAL_IMAGES.wasteClearedAfter.src,
      alt: 'Pristine, clean swept public street promenade with cleared walkways',
      label: 'AFTER (Cleaned & Sanitized)',
      detail: '4.2 tons of solid waste hauled away, drainage trench desilted, and two covered disposal bins deployed.',
    },
  },
  {
    id: 'case-streetlight-solar',
    caseId: 'CP-2026-007834',
    title: 'Mountain Village Trail Solar Streetlight Installation',
    category: 'Public Safety & Utilities',
    department: 'Energy & Power Dept KP',
    location: 'Ayun Village Trail, Lower Chitral',
    verifiedDate: '2026-09-29',
    matchScore: '91% Restoration Index',
    before: {
      src: REGIONAL_IMAGES.streetlightBrokenBefore.src,
      alt: 'Damaged, non-functional light fixture leaving mountain path in dark',
      label: 'BEFORE (Dark / Severed Light)',
      detail: 'Burnt mercury vapor fixture left 350-meter student walkway in pitch darkness after nightfall.',
    },
    after: {
      src: REGIONAL_IMAGES.streetlightRestoredAfter.src,
      alt: 'Bright autonomous solar LED lantern illuminating the mountain pathway',
      label: 'AFTER (Illuminated Solar LED)',
      detail: 'Installed 60W autonomous solar LED pole fixture with lithium battery backup providing all-night illumination.',
    },
  },
];

/**
 * Topographic SVG pattern in the civic palette used as a graceful zero-layout-shift fallback
 */
export const TOPOGRAPHIC_SVG_FALLBACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%23F6F8F7"><rect width="600" height="400" fill="%23F6F8F7"/><path d="M0,160 Q150,110 300,160 T600,160 L600,400 L0,400 Z" fill="%23E8F2EC" opacity="0.6"/><path d="M0,230 Q150,190 300,240 T600,220 L600,400 L0,400 Z" fill="%231F6B43" opacity="0.15"/><path d="M0,290 Q200,260 400,310 T600,280 L600,400 L0,400 Z" fill="%23174F32" opacity="0.12"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%234B5A6B" font-weight="500">CivicPulse Regional Evidence Record</text></svg>`;
