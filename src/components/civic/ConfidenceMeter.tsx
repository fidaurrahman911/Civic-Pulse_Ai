import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ConfidenceMeterProps {
  score: number; // 0 to 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  score,
  label = 'AI Confidence',
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const normalized = Math.min(100, Math.max(0, score));

  // Semantic color based on confidence threshold
  let strokeColor = '#1F6B43'; // > 80% pass
  let textColor = 'text-[#174F32]';
  let bgColor = 'bg-[#E8F2EC]';

  if (normalized < 65) {
    strokeColor = '#B7791F'; // warn
    textColor = 'text-[#8B5B16]';
    bgColor = 'bg-[#FAF0E1]';
  }
  if (normalized < 45) {
    strokeColor = '#B3261E'; // critical/fail
    textColor = 'text-[#8A1D17]';
    bgColor = 'bg-[#FCEBEA]';
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-medium text-[#4B5A6B]">
          {showIcon && <ShieldCheck className="w-3.5 h-3.5 text-[#1F6B43]" />}
          {label}
        </span>
        <span className={`font-semibold font-tabular px-1.5 py-0.5 rounded text-xs ${bgColor} ${textColor}`}>
          {normalized}%
        </span>
      </div>
      <div className="w-full bg-[#E3E8E6] rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${normalized}%`,
            backgroundColor: strokeColor,
          }}
        />
      </div>
    </div>
  );
};
