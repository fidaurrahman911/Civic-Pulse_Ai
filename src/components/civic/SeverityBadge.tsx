import React from 'react';
import { ComplaintSeverity } from '../../types';
import { ShieldAlert, AlertTriangle, Info } from 'lucide-react';

interface SeverityBadgeProps {
  severity: ComplaintSeverity;
  isEmergency?: boolean;
  className?: string;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  isEmergency = false,
  className = '',
}) => {
  if (isEmergency || severity === 'critical') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-semibold bg-[#FCEBEA] text-[#8A1D17] border border-[#B3261E]/40 ${className}`}
      >
        <ShieldAlert className="w-3.5 h-3.5 text-[#B3261E]" />
        {isEmergency ? 'Emergency Critical' : 'Critical Severity'}
      </span>
    );
  }

  if (severity === 'high') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#FAF0E1] text-[#8B5B16] border border-[#B7791F]/40 ${className}`}
      >
        <AlertTriangle className="w-3.5 h-3.5 text-[#B7791F]" />
        High Priority
      </span>
    );
  }

  if (severity === 'medium') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#E6EFF9] text-[#14467E] border border-[#1F5FA8]/30 ${className}`}
      >
        <Info className="w-3.5 h-3.5 text-[#1F5FA8]" />
        Medium Priority
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#F6F8F7] text-[#4B5A6B] border border-[#E3E8E6] ${className}`}
    >
      <Info className="w-3.5 h-3.5 text-[#4B5A6B]" />
      Low Priority
    </span>
  );
};
