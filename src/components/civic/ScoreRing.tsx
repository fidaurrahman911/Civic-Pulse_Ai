import React from 'react';
import { Award, ChevronRight } from 'lucide-react';
import { getNextTierProgress, getTierForScore } from '../../lib/scoring';
import { formatNumber } from '../../lib/format';

interface ScoreRingProps {
  score: number;
  highlightAddition?: number | null;
  className?: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  highlightAddition,
  className = '',
}) => {
  const tier = getTierForScore(score);
  const { progressPercentage, nextTier, pointsRemaining } = getNextTierProgress(score);

  return (
    <div className={`p-5 rounded-lg border border-[#E3E8E6] bg-[#FFFFFF] shadow-xs ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4B5A6B]">
            Current Civic Score
          </span>
          <div className="flex items-baseline gap-2.5 mt-1">
            <span className="text-3xl lg:text-4xl font-bold font-tabular text-[#0F1B2D]">
              {formatNumber(score)}
            </span>
            {highlightAddition && highlightAddition > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/30 animate-pulse">
                +{highlightAddition} pts
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-xs font-semibold"
            style={{
              backgroundColor: '#E8F2EC',
              color: '#174F32',
              borderColor: '#1F6B43',
            }}
          >
            <Award className="w-3.5 h-3.5 text-[#1F6B43]" />
            {tier.name}
          </span>
          <span className="text-[11px] text-[#4B5A6B] mt-1 font-medium">
            Tier Rank #{score >= 1000 ? '02' : '04'} in Tehsil
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E3E8E6]">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[#4B5A6B] font-medium flex items-center gap-1">
            Progress to {nextTier ? nextTier.name : 'Max Tier'}
            <ChevronRight className="w-3 h-3 text-[#4B5A6B]" />
          </span>
          <span className="font-semibold text-[#0F1B2D] font-tabular">
            {nextTier ? `${formatNumber(pointsRemaining)} pts remaining` : 'Elite Tier Reached'}
          </span>
        </div>

        <div className="w-full bg-[#E3E8E6] rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-[#1F6B43] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
