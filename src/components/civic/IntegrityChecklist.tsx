import React from 'react';
import { VerificationCheck } from '../../types';
import { CheckCircle2, AlertTriangle, XCircle, Shield } from 'lucide-react';

interface IntegrityChecklistProps {
  checks: VerificationCheck[];
  warningNote?: string;
  className?: string;
}

export const IntegrityChecklist: React.FC<IntegrityChecklistProps> = ({
  checks,
  warningNote,
  className = '',
}) => {
  return (
    <div className={`rounded-lg border border-[#E3E8E6] bg-[#FFFFFF] p-4 ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#1F6B43]" />
          <h4 className="text-sm font-semibold text-[#0F1B2D]">Evidence Integrity & Authenticity</h4>
        </div>
        <span className="text-[11px] font-medium text-[#4B5A6B]">
          {checks.filter((c) => c.status === 'pass').length} / {checks.length} Verified
        </span>
      </div>

      {warningNote && (
        <div className="mt-3 p-3 rounded-[6px] bg-[#FAF0E1] border border-[#B7791F]/40 flex items-start gap-2.5 text-xs text-[#8B5B16]">
          <AlertTriangle className="w-4 h-4 text-[#B7791F] shrink-0 mt-0.5" />
          <p className="font-medium leading-relaxed">{warningNote}</p>
        </div>
      )}

      <ul className="mt-3 divide-y divide-[#E3E8E6]/60 text-xs">
        {checks.map((check) => {
          let icon = <CheckCircle2 className="w-4 h-4 text-[#1F6B43] shrink-0" />;
          let labelColor = 'text-[#0F1B2D]';

          if (check.status === 'warn') {
            icon = <AlertTriangle className="w-4 h-4 text-[#B7791F] shrink-0" />;
            labelColor = 'text-[#8B5B16] font-medium';
          } else if (check.status === 'fail') {
            icon = <XCircle className="w-4 h-4 text-[#B3261E] shrink-0" />;
            labelColor = 'text-[#8A1D17] font-medium';
          }

          return (
            <li key={check.key} className="py-2.5 flex items-start gap-2.5">
              <span className="mt-0.5">{icon}</span>
              <div className="flex-1">
                <span className={`block font-medium ${labelColor}`}>{check.label}</span>
                <span className="block text-[#4B5A6B] mt-0.5 text-[11px] leading-relaxed">
                  {check.detail}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
