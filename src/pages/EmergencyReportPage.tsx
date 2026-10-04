import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { REGIONAL_IMAGES } from '../data/images';
import { ShieldAlert, AlertTriangle, MapPin, Upload, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DemoAiBadge } from '../components/civic/DemoAiBadge';

interface EmergencyReportPageProps {
  navigate: (path: string) => void;
}

export const EmergencyReportPage: React.FC<EmergencyReportPageProps> = ({ navigate }) => {
  const { submitComplaint } = useCivicStore();

  const [category, setCategory] = useState('Landslide');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('Lowari Bypass Km 4, Drosh (GPS: 35.3512, 71.8021)');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const emergencyCategories = [
    'Landslide',
    'Flood',
    'Road Blockage',
    'Earthquake',
    'Heavy Snowfall',
    'Other Critical Hazard',
  ];

  const handleFillExample = () => {
    setCategory('Landslide');
    setTitle('EMERGENCY: Massive Rockfall Obstructing Lowari Bypass');
    setDescription(
      'Active boulder collapse blocking both lanes on Lowari bypass 4km south of Drosh. Heavy boulders completely halt vehicle traffic. Risk of further falling rock.'
    );
    setLocationName('Lowari Bypass Km 4, Drosh (GPS: 35.3512, 71.8021)');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const complaint = submitComplaint({
      title,
      category: 'Disaster Response',
      subcategory: category,
      description,
      locationName,
      coordinates: { lat: 35.3512, lng: 71.8021 },
      evidence: [
        {
          id: `ev-em-${Date.now()}`,
          kind: 'photo',
          name: 'emergency_landslide_scene.jpg',
          sizeKb: 1980,
          url: REGIONAL_IMAGES.floodRestoration.src,
          hash: 'hash_em_landslide_01',
        },
      ],
      severity: 'critical',
      isEmergency: true,
      departmentId: 'dept-cw',
    });

    setSubmittedId(complaint.trackingId);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* High-contrast Red Emergency Header */}
      <div className="p-4 rounded-lg bg-[#FCEBEA] border-2 border-[#B3261E] mb-6 flex items-start gap-3">
        <ShieldAlert className="w-6 h-6 text-[#B3261E] shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-base sm:text-lg font-bold text-[#8A1D17]">
              Emergency Disaster & Rapid Dispatch Form
            </h1>
            <button
              type="button"
              onClick={handleFillExample}
              className="text-xs underline font-semibold text-[#8A1D17] hover:text-black"
            >
              Fill Example
            </button>
          </div>
          <p className="text-xs text-[#8A1D17] mt-0.5">
            Use this expedited form ONLY for immediate life safety risks, severe rockfalls, flood breaches, or complete highway isolation.
          </p>
        </div>
      </div>

      {!submittedId ? (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg border border-[#E3E8E6] shadow-xs">
          {/* Emergency Category Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Emergency Hazard Category <span className="text-[#B3261E]">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {emergencyCategories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`p-2.5 rounded-[6px] text-xs font-semibold border text-center transition-colors ${
                    category === cat
                      ? 'bg-[#FCEBEA] text-[#8A1D17] border-[#B3261E] ring-1 ring-[#B3261E]'
                      : 'bg-[#F6F8F7] text-[#0F1B2D] border-[#E3E8E6] hover:bg-[#E3E8E6]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Brief Incident Headline <span className="text-[#B3261E]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Landslide blocking road"
              className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] text-sm text-[#0F1B2D] focus:border-[#B3261E] focus:outline-none bg-white font-medium"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Exact Location / Km Marker <span className="text-[#B3261E]">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#B3261E]" />
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. Lowari Bypass Km 4, Drosh"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] text-sm text-[#0F1B2D] focus:border-[#B3261E] focus:outline-none bg-white font-medium"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Urgent Details (Casualties, stranded vehicles, water surge) <span className="text-[#B3261E]">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide critical on-ground observations for immediate disaster machinery dispatch..."
              className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E3E8E6] text-sm text-[#0F1B2D] focus:border-[#B3261E] focus:outline-none bg-white"
            />
          </div>

          {/* Severity notice */}
          <div className="p-3 rounded bg-[#FCEBEA] border border-[#B3261E]/30 text-xs text-[#8A1D17] flex items-center justify-between">
            <span className="font-semibold">Priority: CRITICAL DISPATCH</span>
            <span className="text-[11px]">Pinned to District Disaster Operations</span>
          </div>

          {/* Submit CTA */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/report')}
              className="text-xs text-[#4B5A6B] hover:text-[#0F1B2D]"
            >
              Standard Non-Emergency Report
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-[6px] text-sm font-bold bg-[#B3261E] hover:bg-[#8A1D17] text-white shadow-xs transition-colors flex items-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Broadcast Emergency Report</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="p-6 rounded-lg bg-white border border-[#E3E8E6] shadow-sm text-center space-y-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-[#FCEBEA] text-[#B3261E] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#0F1B2D]">Emergency Alert Broadcasted</h2>
          <p className="text-xs text-[#4B5A6B] max-w-md mx-auto">
            Your emergency report has been prioritized in the District Administration Control Room with ID{' '}
            <strong className="text-[#0F1B2D] font-tabular">{submittedId}</strong>.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => navigate(`/complaints/${submittedId}`)}
              className="px-4 py-2 rounded-[6px] text-xs font-semibold bg-[#1F6B43] text-white"
            >
              Track Emergency Status
            </button>
            <button
              onClick={() => navigate('/admin/map')}
              className="px-4 py-2 rounded-[6px] text-xs font-semibold bg-[#0F1B2D] text-white"
            >
              View on District Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
