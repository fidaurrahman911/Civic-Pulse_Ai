import React, { useState } from 'react';
import { TimelineEvent, ComplaintStatus } from '../../types';
import { formatDateTime } from '../../lib/format';
import { CheckCircle2, Circle, Clock, Wrench, UserCheck, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
  currentStatus: ComplaintStatus;
  className?: string;
}

const ORDERED_STAGES: { status: ComplaintStatus; label: string }[] = [
  { status: 'submitted', label: 'Submitted' },
  { status: 'under_review', label: 'Under Review' },
  { status: 'assigned', label: 'Assigned' },
  { status: 'in_progress', label: 'Work in Progress' },
  { status: 'resolved', label: 'Resolved' },
];

export const Timeline: React.FC<TimelineProps> = ({ events, currentStatus, className = '' }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(events.length - 1);

  const getStageStatus = (stage: ComplaintStatus) => {
    const stageIndex = ORDERED_STAGES.findIndex((s) => s.status === stage);
    const currentIndex = ORDERED_STAGES.findIndex((s) => s.status === currentStatus);

    if (currentStatus === 'resolved') return 'completed';
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top horizontal progress stages for desktop */}
      <div className="hidden sm:flex items-center justify-between pb-4 border-b border-[#E3E8E6]">
        {ORDERED_STAGES.map((stage, idx) => {
          const state = getStageStatus(stage.status);
          const isDone = state === 'completed';
          const isActive = state === 'active';

          return (
            <div key={stage.status} className="flex-1 flex items-center">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border ${
                    isDone
                      ? 'bg-[#1F6B43] border-[#1F6B43] text-white'
                      : isActive
                      ? 'bg-[#E8F2EC] border-[#1F6B43] text-[#174F32]'
                      : 'bg-[#F6F8F7] border-[#E3E8E6] text-[#4B5A6B]'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span
                  className={`text-[11px] mt-1.5 font-medium ${
                    isActive ? 'text-[#0F1B2D] font-semibold' : 'text-[#4B5A6B]'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              {idx < ORDERED_STAGES.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    isDone ? 'bg-[#1F6B43]' : 'bg-[#E3E8E6]'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive vertical history log */}
      <div className="relative pl-6 space-y-4 border-l-2 border-[#E3E8E6] ml-3">
        {events.map((event, index) => {
          const isExpanded = expandedIndex === index;
          const isLatest = index === events.length - 1;

          return (
            <div key={event.id || index} className="relative group">
              {/* Dot */}
              <div
                className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                  isLatest
                    ? 'border-[#1F6B43] bg-[#E8F2EC]'
                    : 'border-[#4B5A6B] bg-white'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLatest ? 'bg-[#1F6B43]' : 'bg-[#4B5A6B]'
                  }`}
                />
              </div>

              {/* Event card */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className={`p-3.5 rounded-[6px] border cursor-pointer transition-all ${
                  isLatest
                    ? 'bg-[#F6F8F7] border-[#E3E8E6]'
                    : 'bg-white border-[#E3E8E6]/70 hover:border-[#E3E8E6]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0F1B2D]">
                      {event.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-[#4B5A6B]">by {event.actor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <time className="text-[11px] text-[#4B5A6B] font-tabular">
                      {formatDateTime(event.at)}
                    </time>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-[#4B5A6B]" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-[#4B5A6B]" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-2.5 pt-2.5 border-t border-[#E3E8E6] text-xs text-[#0F1B2D] leading-relaxed">
                    <p>{event.note}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
