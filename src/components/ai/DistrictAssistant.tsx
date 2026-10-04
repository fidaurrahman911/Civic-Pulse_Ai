import React, { useState } from 'react';
import { useCivicStore } from '../../store/useCivicStore';
import { civicAi, AssistantAnswer, isGeminiLive } from '../../lib/ai';
import { Sparkles, Send, Database, ArrowRight, ShieldAlert, CheckCircle, Lightbulb } from 'lucide-react';
import { DemoAiBadge } from '../civic/DemoAiBadge';

export const DistrictAssistant: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { complaints, activities, departments } = useCivicStore();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<AssistantAnswer | null>(null);

  const suggestedQuestions = [
    'What are the biggest problems in Drosh this month?',
    'Which department has the most pending complaints?',
    'What critical hazards need immediate dispatch in Lower Chitral?',
    'Provide municipal priority recommendations for Drosh Bazaar',
  ];

  const handleAsk = async (textToAsk: string) => {
    if (!textToAsk.trim() || isLoading) return;
    setIsLoading(true);
    setQuery(textToAsk);

    // Compute live context from store data
    const totalComplaints = complaints.length;
    const resolvedComplaints = complaints.filter((c) => c.status === 'resolved').length;
    const pendingComplaints = totalComplaints - resolvedComplaints;
    const highPriorityCount = complaints.filter(
      (c) => c.severity === 'high' || c.severity === 'critical'
    ).length;

    // Category breakdown
    const catMap: Record<string, number> = {};
    complaints.forEach((c) => {
      catMap[c.category] = (catMap[c.category] || 0) + 1;
    });
    const topCategories = Object.entries(catMap)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    // Department breakdown
    const deptBreakdown = departments.map((d) => {
      const pending = complaints.filter((c) => c.departmentId === d.id && c.status !== 'resolved')
        .length;
      const resolved = complaints.filter((c) => c.departmentId === d.id && c.status === 'resolved')
        .length;
      return { department: d.name, pending, resolved };
    });

    // Unique locations with issues
    const locationsWithIssues = Array.from(
      new Set(complaints.map((c) => c.locationName).filter(Boolean))
    ).slice(0, 10);

    // Active complaints list payload for Gemini context
    const activeComplaints = complaints.map((c) => ({
      id: c.id,
      trackingId: c.trackingId,
      title: c.title,
      category: c.category,
      subcategory: c.subcategory,
      severity: c.severity,
      status: c.status,
      locationName: c.locationName,
      description: c.description,
      departmentName: c.departmentName,
      createdAt: c.createdAt,
    }));

    try {
      const res = await civicAi.answerDistrictQuestion(textToAsk, {
        totalComplaints,
        resolvedComplaints,
        pendingComplaints,
        highPriorityCount,
        topCategories,
        departmentBreakdown: deptBreakdown,
        locationsWithIssues: locationsWithIssues.length > 0 ? locationsWithIssues : ['Drosh Main Bazaar', 'Ataliq Corridor', 'Shishi Koh'],
        activeComplaints,
      });
      setAnswer(res);
    } catch (err) {
      console.error('District assistant query error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isLive = isGeminiLive();

  return (
    <div className={`rounded-lg border border-[#E3E8E6] bg-white p-5 shadow-xs ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
            isLive ? 'bg-[#E8F2EC] text-[#1F6B43]' : 'bg-[#E6EFF9] text-[#1F5FA8]'
          }`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0F1B2D] flex items-center gap-2">
              <span>District Intelligence Assistant</span>
              {isLive && (
                <span className="text-[10px] uppercase font-bold text-[#1F6B43] bg-[#E8F2EC] px-1.5 py-0.5 rounded border border-[#B8D7C6]">
                  Live Gemini
                </span>
              )}
            </h3>
            <p className="text-[11px] text-[#4B5A6B]">
              {isLive
                ? 'Grounded in active Lower Chitral & Drosh complaint records via Google Gen AI'
                : 'Deterministic municipal analysis grounded in Lower Chitral store data (Offline)'}
            </p>
          </div>
        </div>
        <DemoAiBadge />
      </div>

      {/* Suggested Questions */}
      <div className="mt-3.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4B5A6B] block mb-2">
          Suggested District Inquiries:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleAsk(q)}
              className="text-left text-xs px-2.5 py-1.5 rounded-[6px] bg-[#F6F8F7] hover:bg-[#E8F2EC] text-[#0F1B2D] border border-[#E3E8E6] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(query);
        }}
        className="mt-4 flex gap-2"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about complaints, departments, or volunteer hotspots..."
          className="flex-1 text-xs px-3 py-2 rounded-[6px] border border-[#E3E8E6] focus:outline-none focus:border-[#1F6B43] bg-white text-[#0F1B2D]"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-3.5 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] text-white hover:bg-[#174F32] disabled:opacity-50 transition-colors flex items-center gap-1.5"
        >
          {isLoading ? (
            <span className="animate-spin text-xs">⟳</span>
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          <span>{isLoading ? 'Consulting Gemini...' : 'Analyze'}</span>
        </button>
      </form>

      {/* Answer Output */}
      {answer && (
        <div className="mt-4 p-4 rounded-lg bg-[#F6F8F7] border border-[#E3E8E6] text-xs animate-in fade-in space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="font-semibold text-sm text-[#0F1B2D]">
              {answer.headline}
            </div>
            {answer.providerName && (
              <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded bg-[#E8F2EC] text-[#174F32] border border-[#B8D7C6]">
                {answer.providerName}
              </span>
            )}
          </div>

          <p className="text-[#4B5A6B] leading-relaxed whitespace-pre-line">
            {answer.explanation}
          </p>

          {/* Priority Breakdown (if returned by Gemini) */}
          {answer.priorityBreakdown && answer.priorityBreakdown.length > 0 && (
            <div className="p-2.5 rounded bg-white border border-[#E3E8E6]">
              <div className="text-[11px] font-semibold text-[#0F1B2D] mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#B7791F]" />
                <span>Priority Caseload Breakdown</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {answer.priorityBreakdown.map((pb, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded text-xs border ${
                      pb.priority.toLowerCase() === 'critical'
                        ? 'bg-red-50 border-red-200 text-red-700'
                        : pb.priority.toLowerCase() === 'high'
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="font-bold text-sm">{pb.count}</div>
                    <div className="text-[10px] uppercase font-semibold">{pb.priority}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actionable Recommendations (if returned by Gemini) */}
          {answer.recommendations && answer.recommendations.length > 0 && (
            <div className="p-3 rounded bg-[#E8F2EC] border border-[#B8D7C6]">
              <div className="text-[11px] font-semibold text-[#174F32] mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-[#1F6B43]" />
                <span>Actionable Recommendations for Local Administrators:</span>
              </div>
              <ul className="space-y-1.5">
                {answer.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#0F1B2D]">
                    <span className="w-4 h-4 rounded-full bg-[#1F6B43] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Structured Table */}
          {answer.tableData && answer.tableData.length > 0 && (
            <div className="mt-2 overflow-x-auto rounded border border-[#E3E8E6] bg-white">
              <table className="w-full text-left text-xs divide-y divide-[#E3E8E6]">
                <tbody className="divide-y divide-[#E3E8E6]">
                  {answer.tableData.map((row, i) => (
                    <tr key={i} className="hover:bg-[#F6F8F7]">
                      <td className="px-3 py-1.5 font-medium text-[#0F1B2D]">{row.label}</td>
                      <td className="px-3 py-1.5 text-right font-tabular text-[#4B5A6B]">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Basis line */}
          <div className="mt-3 pt-2 border-t border-[#E3E8E6] flex items-center gap-1.5 text-[11px] text-[#4B5A6B]">
            <Database className="w-3.5 h-3.5 text-[#1F5FA8]" />
            <span>Basis: {answer.basis}</span>
          </div>

          {/* Follow-up question chips */}
          {answer.followUpQuestions && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-[#4B5A6B]">Follow-up:</span>
              {answer.followUpQuestions.map((fq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(fq)}
                  className="inline-flex items-center gap-1 text-[11px] text-[#1F5FA8] hover:underline"
                >
                  <span>{fq}</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
