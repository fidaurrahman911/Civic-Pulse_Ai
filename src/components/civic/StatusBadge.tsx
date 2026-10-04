import React from 'react';
import { ComplaintStatus, ActivityStatus } from '../../types';
import { CheckCircle2, Clock, UserCheck, Wrench, AlertCircle, HelpCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ComplaintStatus | ActivityStatus | 'verified';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  switch (status) {
    case 'verified':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/30 ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#1F6B43]" />
          Verified
        </span>
      );
    case 'resolved':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#E8F2EC] text-[#174F32] border border-[#1F6B43]/40 ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#1F6B43]" />
          Resolved
        </span>
      );
    case 'in_progress':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#E6EFF9] text-[#14467E] border border-[#1F5FA8]/30 ${className}`}>
          <Wrench className="w-3.5 h-3.5 text-[#1F5FA8]" />
          In Progress
        </span>
      );
    case 'assigned':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#F0EDF9] text-[#4C2882] border border-[#6B3FA0]/30 ${className}`}>
          <UserCheck className="w-3.5 h-3.5 text-[#6B3FA0]" />
          Assigned
        </span>
      );
    case 'under_review':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#FAF0E1] text-[#8B5B16] border border-[#B7791F]/30 ${className}`}>
          <Clock className="w-3.5 h-3.5 text-[#B7791F]" />
          Under Review
        </span>
      );
    case 'needs_evidence':
    case 'needs_review':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#FAF0E1] text-[#8B5B16] border border-[#B7791F]/40 ${className}`}>
          <AlertCircle className="w-3.5 h-3.5 text-[#B7791F]" />
          Needs Evidence
        </span>
      );
    case 'rejected':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#FCEBEA] text-[#8A1D17] border border-[#B3261E]/30 ${className}`}>
          <XCircle className="w-3.5 h-3.5 text-[#B3261E]" />
          Rejected
        </span>
      );
    case 'submitted':
    case 'pending':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#F6F8F7] text-[#4B5A6B] border border-[#E3E8E6] ${className}`}>
          <HelpCircle className="w-3.5 h-3.5 text-[#4B5A6B]" />
          Submitted
        </span>
      );
  }
};
