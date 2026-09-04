import React, { useEffect, useState } from 'react';
import { FloodReport } from '../types/flood';
import { getSeverityBadgeClasses } from '../utils/formatters';
import { MapPin, Eye, AlertCircle, Compass } from 'lucide-react';

interface SriLankaMapProps {
  reports: FloodReport[];
  onSelectReport?: (report: FloodReport) => void;
  height?: string;
}

export const SriLankaMap: React.FC<SriLankaMapProps> = ({
  reports,
  onSelectReport,
  height = '500px'
}) => {
  const [mapError, setMapError] = useState(false);
  const [LeafletComponents, setLeafletComponents] = useState<any>(null);

  useEffect(() => {
    // Dynamic import for Leaflet so SSR or bundling issues don't crash the app
    Promise.all([
      import('react-leaflet'),
      import('leaflet')
    ])
      .then(([reactLeaflet, L]) => {
        setLeafletComponents({
          MapContainer: reactLeaflet.MapContainer,
          TileLayer: reactLeaflet.TileLayer,
          Marker: reactLeaflet.Marker,
          Popup: reactLeaflet.Popup,
          L: L.default || L
        });
      })
      .catch((err) => {
        console.error('Leaflet loading failed:', err);
        setMapError(true);
      });
  }, []);

  if (mapError || !LeafletComponents) {
    return (
      <div
        style={{ height }}
        className="w-full rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-6 text-center"
      >
        <Compass className="w-10 h-10 text-cyan-400 mb-3 animate-spin" />
        <h4 className="text-sm font-bold text-slate-200">Interactive Sri Lanka Disaster Map</h4>
        <p className="text-xs text-slate-400 max-w-md mt-1">
          Loading map tiles centered on Sri Lanka coordinates (7.8731° N, 80.7718° E)...
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-lg">
          {reports.slice(0, 6).map((r) => (
            <div
              key={r._id}
              onClick={() => onSelectReport?.(r)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 cursor-pointer hover:border-cyan-500"
            >
              📍 {r.location} ({r.district})
            </div>
          ))}
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, L } = LeafletComponents;

  // Custom marker generator based on severity
  const createCustomIcon = (severity: string) => {
    let color = '#38bdf8';
    let pulseHtml = '';

    if (severity === 'Critical') {
      color = '#ef4444';
      pulseHtml = '<div style="position:absolute; width:28px; height:28px; border-radius:50%; background:rgba(239,68,68,0.4); animation:ping 1.5s infinite; top:-6px; left:-6px;"></div>';
    } else if (severity === 'High') {
      color = '#f97316';
    } else if (severity === 'Moderate') {
      color = '#eab308';
    } else if (severity === 'Low') {
      color = '#10b981';
    }

    return L.divIcon({
      className: 'custom-flood-pin',
      html: `
        <div style="position:relative; display:flex; align-items:center; justify-content:center; width:16px; height:16px;">
          ${pulseHtml}
          <div style="width:16px; height:16px; border-radius:50%; background:${color}; border:2px solid #ffffff; box-shadow:0 0 10px ${color}; z-index:2;"></div>
        </div>
      `,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -10]
    });
  };

  return (
    <div style={{ height }} className="w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={8}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reports.map((report) => {
          if (!report.latitude || !report.longitude) return null;
          const severityStyle = getSeverityBadgeClasses(report.severity);

          return (
            <Marker
              key={report._id}
              position={[report.latitude, report.longitude]}
              icon={createCustomIcon(report.severity)}
            >
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${severityStyle.badge}`}>
                      {report.severity}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{report.status}</span>
                  </div>
                  <h4 className="font-bold text-xs text-white leading-snug">{report.location}</h4>
                  <p className="text-[11px] text-cyan-400 font-medium">{report.district} District</p>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{report.description}</p>
                  
                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Water: <strong className="text-white">{report.waterLevel} ft</strong></span>
                    {onSelectReport && (
                      <button
                        onClick={() => onSelectReport(report)}
                        className="text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center gap-0.5"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
