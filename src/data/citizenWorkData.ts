import { REGIONAL_IMAGES } from './images';

export interface CitizenDriveStep {
  stepNumber: number;
  title: string;
  description: string;
  practicalTip: string;
}

export interface CitizenManagedDrive {
  id: string;
  citizenId: string;
  citizenName: string;
  title: string;
  category: 'Cleanliness' | 'Environment' | 'Infrastructure' | 'Water & Sanitation' | 'Public Health';
  role: string;
  location: string;
  dateCompleted: string;
  volunteersMobilized: number;
  hoursDedicated: number;
  impactMetrics: {
    metric: string;
    label: string;
  }[];
  summary: string;
  whatHeDid: string;
  challengesFaced: string;
  howToReplicate: {
    overview: string;
    estimatedBudget: string;
    toolsRequired: string[];
    steps: CitizenDriveStep[];
  };
  imageUrl: string;
}

export interface CitizenWorkProfile {
  citizenId: string;
  name: string;
  avatarColor: string;
  rank: number;
  score: number;
  location: string;
  level: string;
  specialty: string;
  bio: string;
  totalDrivesOrganized: number;
  volunteersMobilizedTotal: number;
  wasteClearedTotalKg: number;
  treesPlantedTotal: number;
  managedDrives: CitizenManagedDrive[];
  recentActivities: {
    id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    points: number;
    participants: number;
    status: 'verified';
    verifiedBy: string;
    summary: string;
  }[];
}

export const CITIZEN_WORK_PROFILES: Record<string, CitizenWorkProfile> = {
  // 1. Ahmad Khan (Rank #1)
  'user-extra-1': {
    citizenId: 'user-extra-1',
    name: 'Ahmad Khan',
    avatarColor: '#1F6B43',
    rank: 1,
    score: 1284,
    location: 'Drosh, Lower Chitral',
    level: 'District Civic Fellow',
    specialty: 'Commercial Bazaar Cleanliness & Drainage Infrastructure',
    bio: 'Pioneered youth-led cleanliness drives and drain clearing in Tehsil Drosh. Mobilized over 140 shopkeepers to ban roadside plastic dumping.',
    totalDrivesOrganized: 8,
    volunteersMobilizedTotal: 210,
    wasteClearedTotalKg: 4600,
    treesPlantedTotal: 240,
    managedDrives: [
      {
        id: 'drive-ak-1',
        citizenId: 'user-extra-1',
        citizenName: 'Ahmad Khan',
        title: 'Drosh Main Bazaar & Link Road Zero-Waste Cleanliness Drive',
        category: 'Cleanliness',
        role: 'Lead Field Director & Organizer',
        location: 'Drosh Main Bazaar & Taxi Stand Corridor',
        dateCompleted: 'Sept 2026',
        volunteersMobilized: 42,
        hoursDedicated: 36,
        impactMetrics: [
          { metric: '4.6 Metric Tons', label: 'Solid Waste & Asphalt Silt Hauled' },
          { metric: '3.2 Kilometers', label: 'Commercial Roadway Swept' },
          { metric: '24 Drums', label: 'Permanent Metal Waste Drums Placed' },
          { metric: '60 Shopkeepers', label: 'Signed Cleanliness Pledge' },
        ],
        summary:
          'A month-long multi-phase campaign cleaning heavy silt, plastic dumping, and gravel washouts from Drosh’s most congested commercial corridor without waiting for municipal tenders.',
        whatHeDid:
          'Organized high school volunteers and bazaar shopkeepers into 4 rotating squads. Sourced recycled steel drums, painted them green with reflective numbers, arranged volunteer tractor-trolleys to transport waste to the municipal landfill, and swept 3.2 kilometers of roadside.',
        challengesFaced:
          'Uncontrolled roadside garbage dumping from fruit stalls and vehicle dust. Overcame this by engaging the Trader Union president and assigning individual street segments to local shop pairs.',
        howToReplicate: {
          overview:
            'How you can replicate a similar zero-waste bazaar cleanup in your town or village in 4 clear steps:',
          estimatedBudget: 'PKR 8,000 - 15,000 (Sourced from local trader donations for bags and paint)',
          toolsRequired: [
            'Heavy-duty stiff street brooms and flat shovels',
            'Recycled oil drums or large woven polypropylene sacks',
            'Industrial rubber gloves and dust masks for all volunteers',
            '1 hired tractor-trolley or pickup for landfill haulage',
          ],
          steps: [
            {
              stepNumber: 1,
              title: 'Hold a 15-Minute Trader Meeting',
              description: 'Meet local shop owners in your street. Explain that clean shopfronts increase foot traffic and reduce fly-borne illnesses.',
              practicalTip: 'Ask each shop to contribute PKR 200 or provide 2 brooms rather than asking for large sums.',
            },
            {
              stepNumber: 2,
              title: 'Divide the Street into 50-Meter Squad Zones',
              description: 'Assign 3-4 volunteers per zone. Pair 1 shovel operator with 2 sack handlers to prevent bottlenecking.',
              practicalTip: 'Start early morning (07:00 AM) before shops open and vehicle traffic peaks.',
            },
            {
              stepNumber: 3,
              title: 'Install Permanent Reusable Waste Drums',
              description: 'Place painted waste containers every 40 meters. Clearly stencil "Dustbin / Civic Cleanliness" on each drum.',
              practicalTip: 'Fasten drums to utility poles using steel wire so they cannot be kicked over or displaced.',
            },
            {
              stepNumber: 4,
              title: 'Schedule Bi-Weekly Maintenance Sweep',
              description: 'Cleanups fail if they are one-offs. Agree on a fixed 30-minute Sunday morning sweep with local youth volunteers.',
              practicalTip: 'Log your verified photos on CivicPulse AI to earn community recognition and verified civic merit points.',
            },
          ],
        },
        imageUrl: REGIONAL_IMAGES.droshCleanlinessDrive.src,
      },
      {
        id: 'drive-ak-2',
        citizenId: 'user-extra-1',
        citizenName: 'Ahmad Khan',
        title: 'Drosh Water Canal De-Clogging & Plastic Removal Drive',
        category: 'Cleanliness',
        role: 'Drive Lead & Volunteer Safety Coordinator',
        location: 'Upper Drosh Irrigation Canal Feed',
        dateCompleted: 'August 2026',
        volunteersMobilized: 28,
        hoursDedicated: 20,
        impactMetrics: [
          { metric: '1.4 Kilometers', label: 'Canal Bed Hand-Excavated' },
          { metric: '850 Kg', label: 'Bottles & Packaging Removed' },
          { metric: '100% Flow', label: 'Irrigation Water Restored' },
        ],
        summary:
          'Unblocked irrigation channels feeding local apple orchards that were clogged with single-use plastic sacks and decaying foliage.',
        whatHeDid:
          'Constructed temporary wire mesh filter gates at 3 bridge choke points. Led 28 volunteers wading through shallow canals using grappling rakes to extract plastic blockages.',
        challengesFaced:
          'Sharp glass shards and slippery mud banks. Solved by requiring thick rubber gumboots and puncture-resistant work gloves for all stream waders.',
        howToReplicate: {
          overview:
            'How to safely unblock a clogged community water canal or agricultural irrigation feeder:',
          estimatedBudget: 'PKR 4,000 (Mesh wire and grappling hooks)',
          toolsRequired: [
            'Steel grappling hooks with 4-meter ropes',
            'Long wire mesh fencing rolls for filter barriers',
            'Rubber gumboots and waterproof waders',
          ],
          steps: [
            {
              stepNumber: 1,
              title: 'Install Temporary Downstream Mesh Barrier',
              description: 'Place chicken wire across the downstream channel to catch any debris freed while you work upstream.',
              practicalTip: 'Never work alone in moving water; always have a buddy on the bank holding a safety rope.',
            },
            {
              stepNumber: 2,
              title: 'Work Upstream using Rakes and Grapples',
              description: 'Pull heavy debris bags onto the canal banks to drain before placing them into collection sacks.',
              practicalTip: 'Wet silt weighs 3x more than dry waste; let it sun-dry for 2 hours before transporting.',
            },
          ],
        },
        imageUrl: REGIONAL_IMAGES.floodRestoration.src,
      },
    ],
    recentActivities: [
      {
        id: 'act-ak-1',
        title: 'Drosh Main Bazaar Cleanliness & Zero-Plastic Campaign',
        category: 'Cleanliness',
        date: 'Sept 28, 2026',
        location: 'Drosh Main Bazaar',
        points: 85,
        participants: 38,
        status: 'verified',
        verifiedBy: 'TMA Drosh Sanitary Inspector',
        summary: 'Mobilized 38 youth to clear 1.2 tons of solid waste and install 24 permanent metal waste bins.',
      },
      {
        id: 'act-ak-2',
        title: 'Monsoon Canal Silt Excavation & Water Runoff Drive',
        category: 'Cleanliness',
        date: 'Sept 20, 2026',
        location: 'Drosh Bypass Culvert',
        points: 75,
        participants: 32,
        status: 'verified',
        verifiedBy: 'Irrigation Field Supervisor',
        summary: 'Manually cleared 400m concrete ditch clogged with clay and plastic bags to prevent road flooding.',
      },
      {
        id: 'act-ak-3',
        title: 'Drosh High School Green Corridor Tree Plantation',
        category: 'Environment',
        date: 'August 14, 2026',
        location: 'Drosh Government High School',
        points: 90,
        participants: 60,
        status: 'verified',
        verifiedBy: 'District Forest Officer',
        summary: 'Planted 240 indigenous deodar and pine saplings along the perimeter fence with student guardianship.',
      },
    ],
  },

  // 2. Muhammad Zulkaif (Rank #2 / Current User)
  'user-mz': {
    citizenId: 'user-mz',
    name: 'Muhammad Zulkaif',
    avatarColor: '#1F6B43',
    rank: 2,
    score: 1092,
    location: 'Drosh, Lower Chitral',
    level: 'Senior Civic Contributor',
    specialty: 'Rural Clean Water Restoration & Community Hazard Mitigation',
    bio: 'Youth community activist and civic coordinator in Drosh. Dedicated to clean water distribution, flood prevention, and citizen-led community action.',
    totalDrivesOrganized: 6,
    volunteersMobilizedTotal: 165,
    wasteClearedTotalKg: 2800,
    treesPlantedTotal: 450,
    managedDrives: [
      {
        id: 'drive-mz-1',
        citizenId: 'user-mz',
        citizenName: 'Muhammad Zulkaif',
        title: 'Shishi Koh Gravity Spring Waterline Restoration Drive',
        category: 'Water & Sanitation',
        role: 'Field Volunteer Coordinator & Community Organizer',
        location: 'Shishi Koh Gorge, Drosh Tehsil',
        dateCompleted: 'Sept 2026',
        volunteersMobilized: 28,
        hoursDedicated: 48,
        impactMetrics: [
          { metric: '620 Meters', label: 'HDPE Waterline Replaced' },
          { metric: '160 Homes', label: 'Drinking Water Restored' },
          { metric: '2 Sand Traps', label: 'Masonry Sediment Boxes Built' },
        ],
        summary:
          'After seasonal flash torrents tore mountain plastic pipelines, mobilized local youth to trench heavy-gauge HDPE pipe into bedrock and build stone silt filters in 4 weeks.',
        whatHeDid:
          'Coordinated small neighborhood contributions to purchase pipe rolls. Organized 28 volunteers into hiking excavation squads carrying pipe sections up 2,200m elevation trails.',
        challengesFaced:
          'High altitude rocky terrain with falling rock hazards. Addressed by posting safety lookouts and working during cool morning hours.',
        howToReplicate: {
          overview:
            'How to organize a community emergency clean water pipe restoration:',
          estimatedBudget: 'PKR 25,000 - 45,000 (Pipe coils and fittings sourced wholesale)',
          toolsRequired: [
            'Pickaxes and heavy iron crowbars for rocky trenches',
            'Heating clamp tool for butt-fusion HDPE welding',
            'Cement bags and clean river gravel for sediment chambers',
          ],
          steps: [
            {
              stepNumber: 1,
              title: 'Survey Springhead & Safe Natural Contours',
              description: 'Walk the line with an elder who knows the terrain. Avoid avalanche chutes and loose scree slopes.',
              practicalTip: 'Bury the pipe at least 2.5 feet deep to prevent winter freezing and UV sun degradation.',
            },
            {
              stepNumber: 2,
              title: 'Construct a Dual-Chamber Sediment Box',
              description: 'Build a stone chamber at the source with coarse gravel in compartment 1 and fine sand in compartment 2.',
              practicalTip: 'Include a bottom drain flush valve to wash out accumulated mud every 3 months.',
            },
          ],
        },
        imageUrl: REGIONAL_IMAGES.floodRestoration.src,
      },
    ],
    recentActivities: [
      {
        id: 'act-mz-1',
        title: 'Shishi Koh Mountain Pipeline Silt Extraction',
        category: 'Water & Sanitation',
        date: 'Sept 17, 2026',
        location: 'Upper Shishi Koh',
        points: 95,
        participants: 24,
        status: 'verified',
        verifiedBy: 'Public Health Engineering Sub-Engineer',
        summary: 'Welded and tested 400m HDPE pipe, restoring potable gravity water to 160 village homes.',
      },
      {
        id: 'act-mz-2',
        title: 'Drosh Community Center Waste Audit & Sorting Station',
        category: 'Cleanliness',
        date: 'Sept 02, 2026',
        location: 'Drosh Community Center',
        points: 60,
        participants: 18,
        status: 'verified',
        verifiedBy: 'Assistant Director Local Government',
        summary: 'Established 3-bin recycling hub and trained 50 youth on dry vs organic waste separation.',
      },
    ],
  },

  // 3. Ali Ahmad (Rank #3)
  'user-extra-2': {
    citizenId: 'user-extra-2',
    name: 'Ali Ahmad',
    avatarColor: '#1F5FA8',
    rank: 3,
    score: 980,
    location: 'Chitral Town, Lower Chitral',
    level: 'Senior Civic Contributor',
    specialty: 'Riverfront Restoration & Urban Sanitation Stewardship',
    bio: 'Dedicated urban river activist in Chitral Town. Organizes weekly river bank cleanup patrols and shopkeeper awareness seminars.',
    totalDrivesOrganized: 5,
    volunteersMobilizedTotal: 130,
    wasteClearedTotalKg: 3100,
    treesPlantedTotal: 320,
    managedDrives: [
      {
        id: 'drive-aa-1',
        citizenId: 'user-extra-2',
        citizenName: 'Ali Ahmad',
        title: 'Chitral Riverfront Shahi Mosque Promenade Cleanup Drive',
        category: 'Cleanliness',
        role: 'Promenade Cleanup Lead',
        location: 'Shahi Mosque River Walkway, Chitral Town',
        dateCompleted: 'Sept 2026',
        volunteersMobilized: 35,
        hoursDedicated: 24,
        impactMetrics: [
          { metric: '2.1 Metric Tons', label: 'Riverbank Waste Collected' },
          { metric: '1.8 Kilometers', label: 'Historic River Walk Restored' },
          { metric: '18 Receptacles', label: 'Wood-Cased Waste Bins Placed' },
        ],
        summary:
          'Citizen initiative cleaning tourist plastic waste and market washouts along the sacred riverfront adjoining the historic Shahi Mosque.',
        whatHeDid:
          'Partnered with local madrassa students and civil defense volunteers. Provided canvas sorting sacks and transported recyclables to a local scrap merchant.',
        challengesFaced:
          'Steep riverbank drop-offs. Implemented safety harnesses and rope lines for volunteers cleaning the water edge.',
        howToReplicate: {
          overview:
            'How to lead an eco-restoration cleanup along public riverbanks and water promenades:',
          estimatedBudget: 'PKR 10,000 (Safety ropes, heavy gloves, and collection bags)',
          toolsRequired: [
            'Climbing or heavy tow ropes for steep bank tethering',
            'Telescoping trash grabbers to fish trash from water eddies',
            'Reinforced woven burlap or plastic sacks',
          ],
          steps: [
            {
              stepNumber: 1,
              title: 'Designate High-Risk Bank Safety Zones',
              description: 'Identify slippery spots near fast water. Only place trained adult volunteers on ropes near the waterline.',
              practicalTip: 'Keep youth volunteers on flat upper walkways sorting recyclables.',
            },
            {
              stepNumber: 2,
              title: 'Separate Clean Plastics for Scrap Sale',
              description: 'PET bottles and metal cans can be sold to local scrap dealers ("Kabaris") to fund future trash bins.',
              practicalTip: 'This self-funds the project so you never need outside donor grants.',
            },
          ],
        },
        imageUrl: REGIONAL_IMAGES.heroChitralVolunteers.src,
      },
    ],
    recentActivities: [
      {
        id: 'act-aa-1',
        title: 'Shahi Mosque Promenade Plastic Extraction',
        category: 'Cleanliness',
        date: 'Sept 21, 2026',
        location: 'Chitral Town Riverfront',
        points: 80,
        participants: 35,
        status: 'verified',
        verifiedBy: 'TMA Chitral Town Officer',
        summary: 'Cleared 2.1 tons of tourist waste along 1.8km river promenade, installing 18 wooden bins.',
      },
    ],
  },

  // 4. Kaleem Ilahi (Rank #4)
  'user-ki': {
    citizenId: 'user-ki',
    name: 'Kaleem Ilahi',
    avatarColor: '#B7791F',
    rank: 4,
    score: 940,
    location: 'Drosh, Lower Chitral',
    level: 'Senior Civic Contributor',
    specialty: 'Bio-Engineering River Defense & Soil Bio-Terracing',
    bio: 'Mountain conservationist championing bio-engineering, willow root planting, and stone gabions to protect farmland from flash erosion.',
    totalDrivesOrganized: 6,
    volunteersMobilizedTotal: 180,
    wasteClearedTotalKg: 1200,
    treesPlantedTotal: 1200,
    managedDrives: [
      {
        id: 'drive-ki-1',
        citizenId: 'user-ki',
        citizenName: 'Kaleem Ilahi',
        title: 'Drosh Riverbank Flood Defense & 1,000-Tree Bio-Terrace Drive',
        category: 'Environment',
        role: 'Afforestation Coordinator & Conservation Lead',
        location: 'Drosh River Embankment',
        dateCompleted: 'Sept 2026',
        volunteersMobilized: 87,
        hoursDedicated: 50,
        impactMetrics: [
          { metric: '580 Saplings', label: 'Willow & Pine Planted' },
          { metric: '800 Meters', label: 'Dry-Stone Bio-Bunds Built' },
          { metric: '40 Acres', label: 'Downstream Land Shielded' },
        ],
        summary:
          'Grassroots bio-engineering campaign using deep-rooting native willows and hand-stacked stone bunds to halt catastrophic riverbank collapse.',
        whatHeDid:
          'Sourced willow cuttings directly from farmers. Taught 87 volunteers how to plant cuttings at a 45-degree angle to withstand rushing monsoon waters.',
        challengesFaced:
          'Free-grazing livestock eating young shoots. Organized local youth to weave thorny acacia brushwood fences around planting zones.',
        howToReplicate: {
          overview:
            'How to implement community bio-engineering to stop river erosion without concrete:',
          estimatedBudget: 'PKR 6,000 (Willow cuttings and binding wire)',
          toolsRequired: [
            'Pointed iron stakes and mallet hammers',
            'Fresh native willow branches (cuttings)',
            'Wheelbarrows for river stone transport',
          ],
          steps: [
            {
              stepNumber: 1,
              title: 'Harvest Live Dormant Willow Cuttings',
              description: 'Cut 1.5-meter long willow branches with clean 45-degree angle cuts at the base.',
              practicalTip: 'Soak branch bases in river water for 24 hours before planting to trigger rapid root growth.',
            },
            {
              stepNumber: 2,
              title: 'Drive Cuttings Deep into Wet Bank Mud',
              description: 'Drive stakes 2 feet into the ground spaced 1 foot apart. Intertwine flexible branches into a living fence.',
              practicalTip: 'Within 3 months, roots create an unbreakable subterranean net that locks the soil in place.',
            },
          ],
        },
        imageUrl: REGIONAL_IMAGES.treePlantationDrive.src,
      },
    ],
    recentActivities: [
      {
        id: 'act-ki-1',
        title: 'Drosh Riverbank Willow Stabilization Shift #1',
        category: 'Environment',
        date: 'Sept 13, 2026',
        location: 'Chitral River Embankment',
        points: 90,
        participants: 87,
        status: 'verified',
        verifiedBy: 'Conservator of Forests Lower Chitral',
        summary: 'Planted 420 river willow cuttings and built 300m dry-stone silt terraces.',
      },
    ],
  },

  // 5. Sher Wali Khan (Rank #5)
  'user-extra-3': {
    citizenId: 'user-extra-3',
    name: 'Sher Wali Khan',
    avatarColor: '#1F6B43',
    rank: 5,
    score: 870,
    location: 'Ayun, Lower Chitral',
    level: 'Active Volunteer',
    specialty: 'Village Sanitation & Composting Systems',
    bio: 'Community farmer and civic volunteer implementing rural organic composting hubs to keep plastic out of mountain streams.',
    totalDrivesOrganized: 4,
    volunteersMobilizedTotal: 75,
    wasteClearedTotalKg: 2400,
    treesPlantedTotal: 160,
    managedDrives: [
      {
        id: 'drive-sw-1',
        citizenId: 'user-extra-3',
        citizenName: 'Sher Wali Khan',
        title: 'Ayun Village Organic Composting & Clean Stream Drive',
        category: 'Cleanliness',
        role: 'Community Sanitation Lead',
        location: 'Ayun Valley Center',
        dateCompleted: 'August 2026',
        volunteersMobilized: 26,
        hoursDedicated: 30,
        impactMetrics: [
          { metric: '2.4 Tons', label: 'Organic Waste Diverted' },
          { metric: '4 Pits', label: 'Community Compost Pits Built' },
          { metric: '70 Families', label: 'Participating in Separation' },
        ],
        summary:
          'Constructed 4 village compost pits that turn organic kitchen waste into rich orchard fertilizer while keeping plastics out of waterways.',
        whatHeDid:
          'Dug 4 masonry-lined composting pits on village communal land. Distributed color-coded collection bags to 70 households.',
        challengesFaced:
          'Initial resistance to separating smelly kitchen waste. Held tea gatherings explaining how the compost would be shared for their walnut orchards.',
        howToReplicate: {
          overview:
            'How to set up a low-cost village community composting and clean street initiative:',
          estimatedBudget: 'PKR 12,000 (Bricks, cement, and simple wooden covers)',
          toolsRequired: ['Shovels, trowels, wheelbarrows, garden forks'],
          steps: [
            {
              stepNumber: 1,
              title: 'Dig Dual 6x4 Foot Aerated Pits',
              description: 'Dig two adjacent pits with gravel bases for aeration. Use one pit while the other cures for 60 days.',
              practicalTip: 'Layer dry leaves or sawdust over wet kitchen waste to eliminate flies and odors completely.',
            },
          ],
        },
        imageUrl: REGIONAL_IMAGES.heroYouthEmpowerment.src,
      },
    ],
    recentActivities: [
      {
        id: 'act-sw-1',
        title: 'Ayun Stream De-Plastification & Pit Seeding',
        category: 'Cleanliness',
        date: 'August 25, 2026',
        location: 'Ayun Center',
        points: 70,
        participants: 26,
        status: 'verified',
        verifiedBy: 'Village Council Ayun Secretary',
        summary: 'Excavated 4 composting bays and cleared plastic packaging along Ayun stream.',
      },
    ],
  },

  // 6. Faizan Ahmad (Rank #6)
  'user-fa': {
    citizenId: 'user-fa',
    name: 'Faizan Ahmad',
    avatarColor: '#6B3FA0',
    rank: 6,
    score: 620,
    location: 'Drosh, Lower Chitral',
    level: 'Active Volunteer',
    specialty: 'Solar Lighting & Road Hazard Signage',
    bio: 'Eco-builder and community educator installing solar night illumination and safety convex mirrors on cliff hairpin curves.',
    totalDrivesOrganized: 3,
    volunteersMobilizedTotal: 65,
    wasteClearedTotalKg: 900,
    treesPlantedTotal: 80,
    managedDrives: [
      {
        id: 'drive-fa-1',
        citizenId: 'user-fa',
        citizenName: 'Faizan Ahmad',
        title: 'Ayun Canyon Blind-Turn Solar Streetlight & Mirror Drive',
        category: 'Public Health',
        role: 'Campaign Lead & Lighting Technician',
        location: 'Ayun Valley Hairpin Curves',
        dateCompleted: 'Sept 2026',
        volunteersMobilized: 24,
        hoursDedicated: 32,
        impactMetrics: [
          { metric: '16 Solar Lamps', label: 'Dusk-to-Dawn Lamps Installed' },
          { metric: '4 Mirrors', label: 'Convex Curve Mirrors Mounted' },
          { metric: '0 Accidents', label: 'Night Crashes Since Launch' },
        ],
        summary:
          'Installed 16 solar luminaires and wide-angle mirrors on four lethal hairpin turns without waiting for grid power lines.',
        whatHeDid:
          'Crowdfunded funds from local taxi and transport associations. Fabricated steel mount poles in Drosh and installed automated sensors.',
        challengesFaced:
          'Severe wind vibration on canyon poles. Reinforced bases with dual guy-wires anchored into bedrock.',
        howToReplicate: {
          overview:
            'How to organize community solar lighting on hazardous unlit village roads:',
          estimatedBudget: 'PKR 7,000 per light unit (Solar LED floodlight with pole)',
          toolsRequired: ['Hand drills, masonry anchors, steel guy wire, ladders'],
          steps: [
            {
              stepNumber: 1,
              title: 'Audit Darkest Accident Choke Points',
              description: 'Interview local evening drivers and school teachers to pinpoint where pedestrians walk in the dark.',
              practicalTip: 'Mount solar panels facing South at a 35-degree tilt for maximum mountain winter sun capture.',
            },
          ],
        },
        imageUrl: REGIONAL_IMAGES.droshRoadRepairAfter.src,
      },
    ],
    recentActivities: [
      {
        id: 'act-fa-1',
        title: 'Ayun Canyon Mirror Calibration & Night Audit',
        category: 'Public Safety',
        date: 'Sept 19, 2026',
        location: 'Ayun Gorge Road',
        points: 75,
        participants: 20,
        status: 'verified',
        verifiedBy: 'Traffic Police Drosh In-Charge',
        summary: 'Mounted 16 solar luminaires and tuned 4 convex traffic mirrors on hairpin bends.',
      },
    ],
  },
};

export const getCitizenWorkProfile = (citizenIdOrName: string): CitizenWorkProfile => {
  if (CITIZEN_WORK_PROFILES[citizenIdOrName]) {
    return CITIZEN_WORK_PROFILES[citizenIdOrName];
  }

  // Fallback by name lookup
  const found = Object.values(CITIZEN_WORK_PROFILES).find(
    (p) => p.name.toLowerCase() === citizenIdOrName.toLowerCase()
  );
  if (found) return found;

  // Fallback default profile
  return {
    citizenId: citizenIdOrName,
    name: citizenIdOrName,
    avatarColor: '#1F6B43',
    rank: 7,
    score: 550,
    location: 'Lower Chitral',
    level: 'Active Volunteer',
    specialty: 'Community Cleanliness & Public Safety',
    bio: 'Dedicated citizen volunteer working for local community betterment and public hygiene in Khyber Pakhtunkhwa.',
    totalDrivesOrganized: 2,
    volunteersMobilizedTotal: 30,
    wasteClearedTotalKg: 650,
    treesPlantedTotal: 40,
    managedDrives: [
      {
        id: `drive-gen-${citizenIdOrName}`,
        citizenId: citizenIdOrName,
        citizenName: citizenIdOrName,
        title: `${citizenIdOrName}'s Neighborhood Cleanliness & Sanitation Drive`,
        category: 'Cleanliness',
        role: 'Community Volunteer Organizer',
        location: 'Lower Chitral Tehsil',
        dateCompleted: 'Recent',
        volunteersMobilized: 18,
        hoursDedicated: 16,
        impactMetrics: [
          { metric: '650 Kg', label: 'Waste Cleared' },
          { metric: '800 Meters', label: 'Street Swept' },
          { metric: '18 Volunteers', label: 'Engaged' },
        ],
        summary:
          'Citizen-organized street sweep and plastic cleanup helping maintain neighborhood hygiene.',
        whatHeDid:
          'Mobilized neighbors to sweep streets, clear drain culverts, and dispose of commercial plastics safely.',
        challengesFaced: 'Encouraging neighbors to participate consistently.',
        howToReplicate: {
          overview: 'How to organize a weekend neighborhood street cleanup:',
          estimatedBudget: 'PKR 3,000 (Brooms and sacks)',
          toolsRequired: ['Brooms, gloves, trash sacks'],
          steps: [
            {
              stepNumber: 1,
              title: 'Gather 5 Neighbors on Sunday Morning',
              description: 'Pick one street corner. Spend 1 hour sweeping and bagging trash.',
              practicalTip: 'Take before/after photos and post them on CivicPulse AI.',
            },
          ],
        },
        imageUrl: REGIONAL_IMAGES.droshCleanlinessDrive.src,
      },
    ],
    recentActivities: [
      {
        id: `act-gen-${citizenIdOrName}`,
        title: 'Neighborhood Cleanliness & Public Street Sweep',
        category: 'Cleanliness',
        date: 'Recent',
        location: 'Lower Chitral',
        points: 40,
        participants: 18,
        status: 'verified',
        verifiedBy: 'Local Union Council Supervisor',
        summary: 'Participated in neighborhood cleanliness and street litter removal.',
      },
    ],
  };
};

export const getCitizenManagedDrives = (
  userId?: string,
  fullName?: string,
  _locationName?: string
): CitizenManagedDrive[] => {
  const profile = getCitizenWorkProfile(userId || fullName || '');
  return profile.managedDrives;
};

