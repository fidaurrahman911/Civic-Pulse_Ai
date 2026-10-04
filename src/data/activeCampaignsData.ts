import { REGIONAL_IMAGES } from './images';

export interface CampaignLead {
  userId: string;
  name: string;
  role: string;
  avatarColor: string;
  rank: number;
  score: number;
  phone: string;
  bio: string;
}

export interface CampaignWorkSession {
  id: string;
  date: string;
  title: string;
  description: string;
  volunteersCount: number;
  workMetric: string;
  imageUrl?: string;
}

export interface ActiveCampaign {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: 'Cleanliness' | 'Infrastructure' | 'Environment' | 'Water & Sanitation' | 'Public Safety';
  categoryLabel: string;
  location: string;
  locationId: string;
  lead: CampaignLead;
  progressPercent: number;
  volunteersNeeded: number;
  volunteersJoined: number;
  isJoined?: boolean;
  userRole?: string;
  joinedDate?: string;
  overview: string;
  whyCitizenLed: string;
  workCompleted: {
    metric: string;
    label: string;
    detail: string;
  }[];
  sessionsHistory: CampaignWorkSession[];
  nextSession: {
    date: string;
    time: string;
    meetingPoint: string;
    tasksForVolunteers: string[];
    whatToBring: string[];
  };
  toolsProvided: string[];
  imageUrl: string;
}

export const INITIAL_ACTIVE_CAMPAIGNS: ActiveCampaign[] = [
  // 1. Road Cleaning Campaign (Drosh Commercial Link Road)
  {
    id: 'camp-road-clean',
    title: 'Drosh Commercial Link Road Cleanliness & De-Silting Campaign',
    slug: 'drosh-road-cleaning-campaign',
    tagline: 'Citizen-led road sweep, asphalt gravel removal, and drainage unblocking along Drosh bazaar bypass.',
    category: 'Cleanliness',
    categoryLabel: 'Road Cleaning & Safety',
    location: 'Drosh Commercial Link Road, Lower Chitral',
    locationId: 'loc-drosh-bazaar',
    lead: {
      userId: 'user-extra-1',
      name: 'Ahmad Khan',
      role: 'Lead Campaign Director & Youth Organizer',
      avatarColor: '#1F6B43',
      rank: 1,
      score: 1284,
      phone: '+92 344 8920114',
      bio: 'Rank #1 Civic Contributor in Lower Chitral. Known for mobilizing 100+ youth across Drosh to maintain market and road infrastructure through volunteer grit.',
    },
    progressPercent: 75,
    volunteersNeeded: 60,
    volunteersJoined: 42,
    isJoined: false,
    overview:
      'A community-driven campaign rehabilitating the busy link road connecting Drosh Bazaar to the south valley. Over time, gravel washouts, commercial trash, and silt clogged roadside culverts, causing vehicle axle damage and blinding dust clouds for pedestrians. Rather than waiting for government tenders, local merchants and youth mobilized to restore the road themselves.',
    whyCitizenLed:
      'Municipal machinery was delayed for months due to provincial paperwork. Local residents decided to take responsibility: pooling hand tools, organizing weekend volunteer sweep shifts, and contracting private transport to clear 4.6 tons of rubble.',
    workCompleted: [
      {
        metric: '3.2 Kilometers',
        label: 'Roadside Swept & Cleared',
        detail: 'Continuous street surface cleared of hazardous gravel, tire puncture debris, and plastics.',
      },
      {
        metric: '4.6 Metric Tons',
        label: 'Waste & Silt Hauled',
        detail: 'Heavy silt dug out of roadside drainage trenches and transported to municipal landfill.',
      },
      {
        metric: '24 Drums Placed',
        label: 'Commercial Trash Bins',
        detail: 'Recycled metal oil drums painted and installed at shopfronts to prevent roadside dumping.',
      },
      {
        metric: '42 Volunteers',
        label: 'Active Citizens Mobilized',
        detail: 'High school students, shopkeepers, and local taxi drivers working in synchronized squads.',
      },
    ],
    sessionsHistory: [
      {
        id: 'sess-1',
        date: 'Sept 12, 2026',
        title: 'Phase 1: Main Bazaar Junction to Veterinary Clinic Corridor',
        description:
          'Mobilized 25 volunteers with shovels and heavy brooms. Cleared heavy asphalt washouts and segregated 1.8 tons of commercial plastic packaging.',
        volunteersCount: 25,
        workMetric: '1.2 km swept, 1.8 tons hauled',
        imageUrl: REGIONAL_IMAGES.droshCleanlinessDrive.src,
      },
      {
        id: 'sess-2',
        date: 'Sept 20, 2026',
        title: 'Phase 2: Open Culvert Drainage Trench Unblocking',
        description:
          'Dug out 400 meters of concrete ditch packed with hardened clay and discarded shopping bags. Restored gravity stormwater runoff before monsoon rains.',
        volunteersCount: 32,
        workMetric: '400m drain cleared, 1.6 tons silt removed',
        imageUrl: REGIONAL_IMAGES.floodRestoration.src,
      },
      {
        id: 'sess-3',
        date: 'Sept 28, 2026',
        title: 'Phase 3: Merchant Engagement & Metal Bin Placement',
        description:
          'Installed 24 designated waste bins along shop fronts and secured verbal commitments from 60 shopkeepers to maintain storefront clean zones.',
        volunteersCount: 38,
        workMetric: '24 bins anchored, 1.2 tons sorted',
        imageUrl: REGIONAL_IMAGES.droshBazaar.src,
      },
    ],
    nextSession: {
      date: 'Sunday, Oct 11, 2026',
      time: '07:30 AM - 11:30 AM',
      meetingPoint: 'Drosh Main Bazaar Old Bridge Crossing (near Taxi Stand)',
      tasksForVolunteers: [
        'Final surface sweep of the southern 800m road section',
        'Installation of 30 reflective cat-eye road studs on dangerous dark curves',
        'Painting white pedestrian safety crosswalks outside Drosh Girls Primary School',
      ],
      whatToBring: ['Sturdy work boots / sneakers', 'Reusable personal water bottle', 'Cap or sunhat'],
    },
    toolsProvided: [
      'Heavy-duty industrial rubber gloves & dust masks',
      'Long-handled asphalt scrapers and stiff wire brooms',
      'Polypropylene waste sorting sacks',
      'High-visibility volunteer safety vests',
    ],
    imageUrl: REGIONAL_IMAGES.droshCleanlinessDrive.src,
  },

  // 2. Mountain Clean Water Pipeline Restoration (Shishi Koh)
  {
    id: 'camp-water-pipe',
    title: 'Shishi Koh Gravity Spring Waterline Restoration Campaign',
    slug: 'shishi-koh-waterline-campaign',
    tagline: 'Repairing 800m of broken mountain pipe and building stone silt traps to restore drinking water for 160 families.',
    category: 'Water & Sanitation',
    categoryLabel: 'Clean Water Infrastructure',
    location: 'Shishi Koh Gorge, Drosh Tehsil',
    locationId: 'loc-shishi-koh',
    lead: {
      userId: 'user-mz',
      name: 'Muhammad Zulkaif',
      role: 'Campaign Coordinator & Field Volunteer Lead',
      avatarColor: '#1F6B43',
      rank: 2,
      score: 1092,
      phone: '+92 345 9210084',
      bio: 'Youth community organizer and civic technologist in Drosh. Focuses on rural clean water systems, flood defense, and grassroots empowerment.',
    },
    progressPercent: 68,
    volunteersNeeded: 40,
    volunteersJoined: 28,
    isJoined: true, // Zulkaif is active
    userRole: 'Lead Field Coordinator',
    joinedDate: '2026-09-01T08:00:00Z',
    overview:
      'Seasonal flash floods tore away exposed plastic water lines feeding three mountain villages in Upper Shishi Koh. Over 160 households were forced to fetch water from muddy river rapids. Village youth established this emergency waterline campaign to trench new high-density poly pipelines into safe bedrock and build stone sediment filter chambers.',
    whyCitizenLed:
      'Official public works estimates stated repairs would take 9 months through public bidding. Village families could not survive without clean water for 9 months. With small private donations and communal volunteer labor, the community is completing the repair in 4 weeks.',
    workCompleted: [
      {
        metric: '620 Meters',
        label: 'New HDPE Pipeline Laid',
        detail: 'Heavy-gauge 2-inch poly pipe buried under 3 feet of protective river gravel.',
      },
      {
        metric: '2 Filter Boxes',
        label: 'Stone Sediment Traps Built',
        detail: 'Dual-chamber masonry sand-and-gravel filters preventing silt entering pipes.',
      },
      {
        metric: '160 Homes',
        label: 'Potable Tap Water Restored',
        detail: 'Clean gravity-flow mountain water restored to family kitchen connections.',
      },
      {
        metric: 'Zero Turbidity',
        label: 'Water Quality Score',
        detail: 'Field test strips confirm water is clear and free of suspended mud.',
      },
    ],
    sessionsHistory: [
      {
        id: 'sess-w1',
        date: 'Sept 06, 2026',
        title: 'Springhead Clearing & Debris Extraction',
        description:
          'Hiked up to 2,400m elevation. Cleared fallen avalanche timber and loose boulders obstructing the natural mountain springhead.',
        volunteersCount: 18,
        workMetric: 'Springhead uncapped, 12 boulders removed',
        imageUrl: REGIONAL_IMAGES.heroChitralValley.src,
      },
      {
        id: 'sess-w2',
        date: 'Sept 17, 2026',
        title: 'Pipe Trenching & Bedrock Anchoring',
        description:
          'Dug 400m of rocky mountain trench and secured the high-density polyethylene pipe using steel anchor brackets.',
        volunteersCount: 24,
        workMetric: '400m pipeline welded & pressure tested',
        imageUrl: REGIONAL_IMAGES.floodRestoration.src,
      },
    ],
    nextSession: {
      date: 'Saturday, Oct 10, 2026',
      time: '09:00 AM - 02:00 PM',
      meetingPoint: 'Shishi Koh Footbridge Entrance',
      tasksForVolunteers: [
        'Trenching remaining 180 meters to Lower Shishi reservoir',
        'Mixing cement and stacking river stone for filter box #3',
        'Testing shut-off control valves at village distribution points',
      ],
      whatToBring: ['Heavy waterproof boots', 'Warm fleece layer for mountain altitude', 'Pack lunch'],
    },
    toolsProvided: [
      'Pickaxes, crowbars, and trenching shovels',
      'Pipe-fusion heating iron and clamp tools',
      'Heavy rubber work gloves',
    ],
    imageUrl: REGIONAL_IMAGES.floodRestoration.src,
  },

  // 3. Riverbank Flood Defense & 1,000-Tree Plantation (Drosh River)
  {
    id: 'camp-river-trees',
    title: 'Drosh Riverbank Flood Defense & 1,000-Tree Plantation',
    slug: 'riverbank-flood-defense-campaign',
    tagline: 'Community afforestation planting 1,000 native pine and willow trees to anchor soil against monsoon erosion.',
    category: 'Environment',
    categoryLabel: 'River Defense & Forestry',
    location: 'Chitral River Embankment, Drosh Tehsil',
    locationId: 'loc-drosh',
    lead: {
      userId: 'user-ki',
      name: 'Kaleem Ilahi',
      role: 'Campaign Lead & Mountain Conservationist',
      avatarColor: '#B7791F',
      rank: 4,
      score: 940,
      phone: '+92 300 9021445',
      bio: 'Conservation mobilization leader with 10 years experience organizing grassroots mountain tree corridors and community disaster resilience.',
    },
    progressPercent: 58,
    volunteersNeeded: 100,
    volunteersJoined: 58,
    isJoined: false,
    overview:
      'Severe monsoon torrents eat away meters of fertile agricultural land along the Chitral River in Drosh every year. This citizen-led reforestation drive stabilizes 2 kilometers of fragile riverbank using deep-rooting native willow, pine, and deodar trees, reinforced by dry-stone gabion walls.',
    whyCitizenLed:
      'Engineered concrete river dykes are expensive and often take years to fund. Bio-engineering through indigenous tree planting is faster, 90% cheaper, environmentally restorative, and creates self-sustaining green barriers managed by local villagers.',
    workCompleted: [
      {
        metric: '580 Saplings',
        label: 'Indigenous Trees Planted',
        detail: 'Native pine, deodar, and water-loving willows planted along the high-water line.',
      },
      {
        metric: '800 Meters',
        label: 'Stone Bunds Staked',
        detail: 'Hand-stacked stone retaining terraces that trap fertile silt during floods.',
      },
      {
        metric: '94% Survival',
        label: 'Sapling Health Rate',
        detail: 'Regular volunteer weekly watering shifts ensure strong sapling root establishment.',
      },
      {
        metric: '40 Acres',
        label: 'Downstream Farm Land Protected',
        detail: 'Agricultural terracing shielded from river bank cave-ins.',
      },
    ],
    sessionsHistory: [
      {
        id: 'sess-t1',
        date: 'Sept 13, 2026',
        title: 'Launch Planting: 420 Alpine Saplings Planted',
        description:
          'Mobilized 87 volunteers including local farmers and school students. Planted 420 trees along the primary flood erosion bank.',
        volunteersCount: 87,
        workMetric: '420 saplings planted & mulched',
        imageUrl: REGIONAL_IMAGES.treePlantationDrive.src,
      },
      {
        id: 'sess-t2',
        date: 'Sept 24, 2026',
        title: 'Stone Terracing & Seedling Protection Fencing',
        description:
          'Constructed 300 meters of temporary brushwood and stone fencing to safeguard young saplings from grazing goats.',
        volunteersCount: 45,
        workMetric: '300m fencing, 160 more saplings planted',
        imageUrl: REGIONAL_IMAGES.heroChitralVolunteers.src,
      },
    ],
    nextSession: {
      date: 'Friday, Oct 16, 2026',
      time: '02:30 PM - 05:30 PM',
      meetingPoint: 'Drosh Riverbank Nursery & Community Field',
      tasksForVolunteers: [
        'Digging 150 planting basins along the lower river spit',
        'Transporting young willow saplings from nursery beds',
        'Spreading organic walnut mulch to retain soil moisture ahead of winter',
      ],
      whatToBring: ['Work gloves', 'Sturdy boots', 'Wide-brim hat'],
    },
    toolsProvided: [
      'Sharpened tree-planting spades and hoes',
      'Sapling transport wheelbarrows & baskets',
      'Organic compost fertilizer bags',
    ],
    imageUrl: REGIONAL_IMAGES.treePlantationDrive.src,
  },

  // 4. Village Solar Road Lighting & Blind Turn Hazard Signage (Ayun)
  {
    id: 'camp-solar-lights',
    title: 'Ayun Valley Solar Streetlight & Road Hazard Signage Campaign',
    slug: 'ayun-solar-lighting-campaign',
    tagline: 'Citizen-funded installation of 20 solar lights and convex mirrors on accident-prone canyon turns.',
    category: 'Public Safety',
    categoryLabel: 'Road Safety & Lighting',
    location: 'Ayun Valley Road & Village Crossings, Lower Chitral',
    locationId: 'loc-ayun',
    lead: {
      userId: 'user-fa',
      name: 'Faizan Ahmad',
      role: 'Campaign Organizer & Eco-Builder',
      avatarColor: '#6B3FA0',
      rank: 6,
      score: 620,
      phone: '+92 333 8742199',
      bio: 'Community educator in Drosh and Ayun dedicated to rural road safety, public health sanitation, and youth green clubs.',
    },
    progressPercent: 82,
    volunteersNeeded: 30,
    volunteersJoined: 24,
    isJoined: false,
    overview:
      'Ayun road winds through narrow mountain cliffs with four pitch-black blind turns where night accidents frequently occurred. Village residents crowd-funded commercial solar LED floodlights, safety convex mirrors, and reflective warning signs, completely installed and maintained by local volunteers.',
    whyCitizenLed:
      'Grid electricity in the valley suffers frequent outages during winter storms. Relying on government line repairs left roads dark for weeks. Autonomous solar lamps run entirely off sunlight, requiring zero government electricity or ongoing utility bills.',
    workCompleted: [
      {
        metric: '16 Solar Lamps',
        label: 'Autonomous Lights Installed',
        detail: '100W solar dusk-to-dawn LED floodlights mounted on 5-meter galvanized steel poles.',
      },
      {
        metric: '4 Convex Mirrors',
        label: 'Blind Curve Mirrors Placed',
        detail: 'Wide-angle road mirrors allowing oncoming motorists to see around cliff hairpin turns.',
      },
      {
        metric: '8 Crossings Painted',
        label: 'Reflective Crosswalks',
        detail: 'School crossing zebra stripes painted using industrial reflective glass-bead paint.',
      },
      {
        metric: 'Zero Accidents',
        label: 'Night Safety Record',
        detail: 'Zero night-time vehicle crashes recorded along the route over the past 45 days.',
      },
    ],
    sessionsHistory: [
      {
        id: 'sess-l1',
        date: 'Sept 04, 2026',
        title: 'Pole Fabrication & Foundation Digging',
        description:
          'Local welding shop and volunteers fabricated 16 steel poles and dug concrete footings along 4 dark village intersections.',
        volunteersCount: 16,
        workMetric: '16 footings cast with cement',
        imageUrl: REGIONAL_IMAGES.heroYouthEmpowerment.src,
      },
      {
        id: 'sess-l2',
        date: 'Sept 19, 2026',
        title: 'Solar Panel Mounting & Mirror Calibration',
        description:
          'Mounted 16 solar luminaires, tested automated light sensors, and calibrated convex traffic mirrors on hairpin bends.',
        volunteersCount: 20,
        workMetric: '16 solar lights operational, 4 mirrors tuned',
        imageUrl: REGIONAL_IMAGES.droshRoadRepairAfter.src,
      },
    ],
    nextSession: {
      date: 'Monday, Oct 19, 2026',
      time: '04:00 PM - 07:00 PM',
      meetingPoint: 'Ayun High School Main Gate',
      tasksForVolunteers: [
        'Erecting final 4 solar light poles outside the primary clinic',
        'Affixing diamond-grade yellow reflective wrap to all 20 roadside poles',
        'Final nighttime illumination audit and lux level measurement',
      ],
      whatToBring: ['Warm jacket', 'Flashlight / headlamp', 'Work gloves'],
    },
    toolsProvided: [
      'Aluminium extension ladders',
      'Socket wrench sets and drill kits',
      'Reflective adhesive wraps and safety harnesses',
    ],
    imageUrl: REGIONAL_IMAGES.heroYouthEmpowerment.src,
  },
];
