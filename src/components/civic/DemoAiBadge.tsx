import React from 'react';
import { Sparkles } from 'lucide-react';
import { isGeminiLive } from '../../lib/ai';

interface DemoAiBadgeProps {
  variant?: 'subtle' | 'pill' | 'banner';
  className?: string;
  customText?: string;
  isLiveOverride?: boolean;
}

export const DemoAiBadge: React.FC<DemoAiBadgeProps> = ({
  variant = 'subtle',
  className = '',
  customText,
  isLiveOverride,
}) => {
  const isLive = isLiveOverride !== undefined ? isLiveOverride : isGeminiLive();
  const defaultText = isLive
    ? 'Google Gemini API (Live)'
    : 'Simulated result (Offline demo)';

  if (variant === 'banner') {
    return (
      <div
        className={`flex items-center gap-2 p-2.5 rounded-[6px] text-xs ${
          isLive
            ? 'bg-[#E8F2EC] text-[#174F32] border border-[#B8D7C6]'
            : 'bg-[#F6F8F7] text-[#4B5A6B] border border-[#E3E8E6]'
        } ${className}`}
      >
        <span className={`w-2 h-2 rounded-full shrink-0 ${isLive ? 'bg-[#1F6B43] animate-pulse' : 'bg-[#8A9BA8]'}`} />
        <Sparkles className={`w-4 h-4 shrink-0 ${isLive ? 'text-[#1F6B43]' : 'text-[#1F5FA8]'}`} />
        <span className="font-medium">{customText || defaultText}</span>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[6px] text-[11px] font-medium border select-none ${
        isLive
          ? 'bg-[#E8F2EC] text-[#174F32] border-[#B8D7C6]'
          : 'bg-[#F6F8F7] text-[#4B5A6B] border-[#E3E8E6]'
      } ${className}`}
      title={
        isLive
          ? 'Analysis powered live by Google Gemini API (@google/genai).'
          : 'This analysis was generated deterministically for demonstration purposes.'
      }
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-[#1F6B43]' : 'bg-[#8A9BA8]'}`} />
      <Sparkles className={`w-3 h-3 ${isLive ? 'text-[#1F6B43]' : 'text-[#1F5FA8]'}`} />
      <span>{customText || defaultText}</span>
    </span>
  );
};
