import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Complaint, Activity, Location } from '../../types';
import { Layers, MapPin, Eye, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface CivicMapProps {
  complaints: Complaint[];
  activities: Activity[];
  locations: Location[];
  onSelectComplaint?: (complaint: Complaint) => void;
  onSelectLocation?: (location: Location) => void;
  height?: string;
  defaultCenter?: [number, number];
  defaultZoom?: number;
  className?: string;
}

export const CivicMap: React.FC<CivicMapProps> = ({
  complaints,
  activities,
  locations,
  onSelectComplaint,
  onSelectLocation,
  height = '480px',
  defaultCenter = [35.60, 71.79], // Drosh - Chitral region
  defaultZoom = 11,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeLayers, setActiveLayers] = useState({
    activities: true,
    unresolved: true,
    resolved: true,
    emergencies: true,
  });

  const [selectedItem, setSelectedItem] = useState<{
    type: 'complaint' | 'activity' | 'location';
    data: any;
  } | null>(null);

  const [mapError, setMapError] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | CivicPulse AI',
        maxZoom: 18,
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
    } catch (err) {
      console.error('Leaflet initialization error:', err);
      setMapError(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when layers or data change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    // 1. Render Activities (Green)
    if (activeLayers.activities) {
      activities.forEach((act) => {
        // Fallback coordinates around Drosh bazaar if not specified
        const lat = 35.5630 + (Math.random() - 0.5) * 0.02;
        const lng = 71.7950 + (Math.random() - 0.5) * 0.02;

        const customIcon = L.divIcon({
          className: 'civic-marker-activity',
          html: `<div style="background-color: #1F6B43; width: 22px; height: 22px; border-radius: 50%; border: 2px solid #FFFFFF; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">✓</div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        const marker = L.marker([lat, lng], { icon: customIcon });
        marker.on('click', () => {
          setSelectedItem({ type: 'activity', data: act });
        });
        marker.bindTooltip(`<b>${act.title}</b><br/>${act.category} • ${act.participants} volunteers`, {
          direction: 'top',
        });
        markersLayerRef.current?.addLayer(marker);
      });
    }

    // 2. Render Complaints (Red/Yellow/Emergencies/Green)
    complaints.forEach((comp) => {
      const isResolved = comp.status === 'resolved';
      const isEmergency = comp.isEmergency;

      if (isEmergency && !activeLayers.emergencies) return;
      if (isResolved && !activeLayers.resolved) return;
      if (!isResolved && !isEmergency && !activeLayers.unresolved) return;

      const lat = comp.coordinates?.lat || 35.5630;
      const lng = comp.coordinates?.lng || 71.7950;

      let bgColor = '#B7791F'; // moderate yellow
      let iconSymbol = '!';

      if (isEmergency) {
        bgColor = '#B3261E'; // bright red
        iconSymbol = '⚠';
      } else if (isResolved) {
        bgColor = '#1F6B43'; // green
        iconSymbol = '✓';
      } else if (comp.severity === 'critical' || comp.severity === 'high') {
        bgColor = '#B3261E';
      }

      const customIcon = L.divIcon({
        className: 'civic-marker-complaint',
        html: `<div style="background-color: ${bgColor}; width: ${isEmergency ? 26 : 22}px; height: ${
          isEmergency ? 26 : 22
        }px; border-radius: ${isEmergency ? '4px' : '50%'}; border: 2px solid #FFFFFF; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">${iconSymbol}</div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });
      marker.on('click', () => {
        setSelectedItem({ type: 'complaint', data: comp });
        if (onSelectComplaint) onSelectComplaint(comp);
      });
      marker.bindTooltip(`<b>[${comp.trackingId}] ${comp.title}</b><br/>${comp.departmentName} • ${comp.status.replace('_', ' ')}`, {
        direction: 'top',
      });
      markersLayerRef.current?.addLayer(marker);
    });
  }, [complaints, activities, activeLayers]);

  const toggleLayer = (key: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(defaultCenter, defaultZoom);
    }
  };

  if (mapError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-[#F6F8F7] border border-[#E3E8E6] rounded-lg text-center h-[350px]">
        <AlertTriangle className="w-8 h-8 text-[#B7791F] mb-2" />
        <h4 className="text-sm font-semibold text-[#0F1B2D]">Unable to load map service</h4>
        <p className="text-xs text-[#4B5A6B] mt-1 max-w-sm">
          Please check your network connection or try resetting the view.
        </p>
        <button
          onClick={() => setMapError(false)}
          className="mt-3 px-3 py-1.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] text-white"
        >
          Retry Map
        </button>
      </div>
    );
  }

  return (
    <div className={`relative rounded-lg overflow-hidden border border-[#E3E8E6] bg-white shadow-xs ${className}`}>
      {/* Map Header / Layer Toggles */}
      <div className="p-3 bg-white border-b border-[#E3E8E6] flex flex-wrap items-center justify-between gap-2 z-20 relative text-xs">
        <div className="flex items-center gap-2 font-medium text-[#0F1B2D]">
          <Layers className="w-4 h-4 text-[#1F6B43]" />
          <span>Civic Geographic Layers</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => toggleLayer('activities')}
            className={`px-2 py-1 rounded-[4px] border font-medium transition-colors ${
              activeLayers.activities
                ? 'bg-[#E8F2EC] text-[#174F32] border-[#1F6B43]'
                : 'bg-white text-[#4B5A6B] border-[#E3E8E6]'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#1F6B43] mr-1.5" />
            Citizen Activities ({activities.length})
          </button>

          <button
            onClick={() => toggleLayer('unresolved')}
            className={`px-2 py-1 rounded-[4px] border font-medium transition-colors ${
              activeLayers.unresolved
                ? 'bg-[#FAF0E1] text-[#8B5B16] border-[#B7791F]'
                : 'bg-white text-[#4B5A6B] border-[#E3E8E6]'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#B7791F] mr-1.5" />
            Unresolved ({complaints.filter((c) => c.status !== 'resolved' && !c.isEmergency).length})
          </button>

          <button
            onClick={() => toggleLayer('emergencies')}
            className={`px-2 py-1 rounded-[4px] border font-medium transition-colors ${
              activeLayers.emergencies
                ? 'bg-[#FCEBEA] text-[#8A1D17] border-[#B3261E]'
                : 'bg-white text-[#4B5A6B] border-[#E3E8E6]'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#B3261E] mr-1.5" />
            Emergencies ({complaints.filter((c) => c.isEmergency).length})
          </button>

          <button
            onClick={() => toggleLayer('resolved')}
            className={`px-2 py-1 rounded-[4px] border font-medium transition-colors ${
              activeLayers.resolved
                ? 'bg-[#E8F2EC] text-[#174F32] border-[#1F6B43]'
                : 'bg-white text-[#4B5A6B] border-[#E3E8E6]'
            }`}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#1F6B43] mr-1.5" />
            Resolved ({complaints.filter((c) => c.status === 'resolved').length})
          </button>

          <button
            onClick={handleResetView}
            className="px-2 py-1 rounded-[4px] bg-[#F6F8F7] text-[#4B5A6B] border border-[#E3E8E6] hover:bg-[#E3E8E6]"
            title="Reset map to Drosh center"
          >
            Reset Center
          </button>
        </div>
      </div>

      {/* Map Viewport Container */}
      <div ref={mapContainerRef} style={{ height, width: '100%' }} className="relative z-10" />

      {/* Selected Item Drawer / Panel Overlay */}
      {selectedItem && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white p-4 rounded-lg shadow-lg border border-[#E3E8E6] z-30 animate-in fade-in slide-in-from-bottom-2 text-xs">
          <div className="flex items-start justify-between pb-2 border-b border-[#E3E8E6]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B5A6B]">
                {selectedItem.type === 'complaint'
                  ? `Complaint: ${selectedItem.data.trackingId}`
                  : 'Verified Activity'}
              </span>
              <h4 className="text-sm font-semibold text-[#0F1B2D] mt-0.5 line-clamp-1">
                {selectedItem.data.title}
              </h4>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-[#4B5A6B] hover:text-[#0F1B2D] font-bold p-1"
            >
              ✕
            </button>
          </div>

          <div className="mt-2.5 space-y-1.5 text-[#4B5A6B]">
            <p className="line-clamp-2">{selectedItem.data.description}</p>
            <div className="flex items-center justify-between pt-1">
              <span className="font-medium text-[#0F1B2D]">
                📍 {selectedItem.data.locationName}
              </span>
              {selectedItem.type === 'complaint' ? (
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#FAF0E1] text-[#8B5B16]">
                  {selectedItem.data.status.replace('_', ' ')}
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#E8F2EC] text-[#174F32]">
                  +{selectedItem.data.points} pts
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
