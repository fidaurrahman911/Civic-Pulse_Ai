/**
 * CivicPulse AI Reputation & Civic Score System
 *
 * Professional reputation tiers:
 * Citizen (0-99)
 * Active Citizen (100-249)
 * Volunteer (250-499)
 * Community Builder (500-999)
 * Community Leader (1,000-2,499)
 * Civic Champion (2,500+)
 */

export interface LevelTier {
  name: string;
  minPoints: number;
  maxPoints: number;
  nextTierName: string | null;
  badgeColor: string;
  description: string;
}

export const LEVEL_TIERS: LevelTier[] = [
  {
    name: 'Citizen',
    minPoints: 0,
    maxPoints: 99,
    nextTierName: 'Active Citizen',
    badgeColor: '#4B5A6B',
    description: 'Beginning your journey of local engagement and civic awareness.',
  },
  {
    name: 'Active Citizen',
    minPoints: 100,
    maxPoints: 249,
    nextTierName: 'Volunteer',
    badgeColor: '#1F5FA8',
    description: 'Regularly participating in local problem reporting and community activities.',
  },
  {
    name: 'Volunteer',
    minPoints: 250,
    maxPoints: 499,
    nextTierName: 'Community Builder',
    badgeColor: '#1F6B43',
    description: 'Active contributor dedicating time and effort to community improvement projects.',
  },
  {
    name: 'Community Builder',
    minPoints: 500,
    maxPoints: 999,
    nextTierName: 'Community Leader',
    badgeColor: '#B7791F',
    description: 'Organizing initiatives and driving measurable impact in neighborhoods.',
  },
  {
    name: 'Community Leader',
    minPoints: 1000,
    maxPoints: 2499,
    nextTierName: 'Civic Champion',
    badgeColor: '#174F32',
    description: 'Proven track record of sustained local leadership, volunteer mobilization, and verified civic results.',
  },
  {
    name: 'Civic Champion',
    minPoints: 2500,
    maxPoints: Infinity,
    nextTierName: null,
    badgeColor: '#0F1B2D',
    description: 'Highest tier of civic dedication, recognized across the district for transformative contributions.',
  },
];

export function getTierForScore(score: number): LevelTier {
  for (const tier of LEVEL_TIERS) {
    if (score >= tier.minPoints && score <= tier.maxPoints) {
      return tier;
    }
  }
  return LEVEL_TIERS[LEVEL_TIERS.length - 1];
}

export function getNextTierProgress(score: number): {
  currentTier: LevelTier;
  nextTier: LevelTier | null;
  pointsInCurrentTier: number;
  pointsNeededForNext: number;
  progressPercentage: number;
  pointsRemaining: number;
} {
  const currentTier = getTierForScore(score);
  const currentIndex = LEVEL_TIERS.findIndex(t => t.name === currentTier.name);
  const nextTier = currentIndex < LEVEL_TIERS.length - 1 ? LEVEL_TIERS[currentIndex + 1] : null;

  if (!nextTier) {
    return {
      currentTier,
      nextTier: null,
      pointsInCurrentTier: score - currentTier.minPoints,
      pointsNeededForNext: 0,
      progressPercentage: 100,
      pointsRemaining: 0,
    };
  }

  const range = nextTier.minPoints - currentTier.minPoints;
  const currentProgress = score - currentTier.minPoints;
  const progressPercentage = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));
  const pointsRemaining = Math.max(0, nextTier.minPoints - score);

  return {
    currentTier,
    nextTier,
    pointsInCurrentTier: currentProgress,
    pointsNeededForNext: range,
    progressPercentage,
    pointsRemaining,
  };
}
