import React, { useEffect, useState } from 'react';
import { FloodReport } from '../types/flood';
import { getSeverityBadgeClasses } from '../utils/formatters';
import { Eye, Compass } from 'lucide-react';

interface SriLankaMapProps {
  reports: FloodReport[];
  onSelectReport?: (report: FloodReport) => void;
  height?: string;
  center?: [number, number];
  zoom?: number;
  mapStyle?: 'street' | 'topo' | 'satellite';
}

export const SriLankaMap: React.FC<SriLankaMapProps> = ({
  reports,
  onSelectReport,
  height = '500px',
  center = [7.8731, 80.7718],
  zoom = 8,
  mapStyle = 'street'
}) => {
  const [LeafletComponents, setLeafletComponents] = useState<any>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Dynamic import for Leaflet to ensure reliable SSR/Vite client execution
    Promise.all([
      import('react-leaflet'),
      import('leaflet')
    ])
      .then(([reactLeaflet, L]) => {
        // Fix Leaflet default marker asset issues
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
        });

        setLeafletComponents({
          MapContainer: reactLeaflet.MapContainer,
          TileLayer: reactLeaflet.TileLayer,
          Marker: reactLeaflet.Marker,
          Popup: reactLeaflet.Popup,
          useMap: reactLeaflet.useMap,
          L
        });
      })
      .catch((err) => {
        console.error('Failed to initialize Leaflet map:', err);
        setMapError(true);
      });
  }, []);

  if (mapError || !LeafletComponents) {
    return (
      <div
        style={{ height }}
        className="w-full rounded-2xl bg-white border border-gray-200 flex flex-col items-center justify-center p-6 text-center shadow-sm"
      >
        <Compass className="w-10 h-10 text-blue-600 mb-3 animate-spin" />
        <h4 className="text-sm font-bold text-slate-800">Interactive Sri Lanka Disaster Map</h4>
        <p className="text-xs text-slate-500 max-w-md mt-1">
          Loading map tiles centered on Sri Lanka coordinates ({center[0].toFixed(4)}° N, {center[1].toFixed(4)}° E)...
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-lg">
          {reports.slice(0, 6).map((r) => (
            <div
              key={r._id}
              onClick={() => onSelectReport?.(r)}
              className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-slate-700 cursor-pointer hover:border-blue-500"
            >
              📍 {r.location} ({r.district})
            </div>
          ))}
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, useMap, L } = LeafletComponents;

  // Custom marker generator based on flood severity
  const createCustomIcon = (severity: string) => {
    let color = '#0284c7';
    let pulseHtml = '';

    if (severity === 'Critical') {
      color = '#dc2626';
      pulseHtml = '<div style="position:absolute; width:28px; height:28px; border-radius:50%; background:rgba(220,38,38,0.3); animation:ping 1.5s infinite; top:-6px; left:-6px;"></div>';
    } else if (severity === 'High') {
      color = '#ea580c';
    } else if (severity === 'Moderate') {
      color = '#d97706';
    } else if (severity === 'Low') {
      color = '#16a34a';
    }

    return L.divIcon({
      className: 'custom-flood-marker',
      html: `
        <div style="position:relative; display:flex; align-items:center; justify-content:center;">
          ${pulseHtml}
          <div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2.5px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>
        </div>
      `,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -10]
    });
  };

  // Controller to dynamically pan and zoom the map
  const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({
    center: targetCenter,
    zoom: targetZoom
  }) => {
    const map = useMap();
    useEffect(() => {
      map.flyTo(targetCenter, targetZoom, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }, [targetCenter, targetZoom, map]);
    return null;
  };

  // 100% Free, Watermark-Free Esri ArcGIS Online Basemaps
  const getTileConfig = () => {
    switch (mapStyle) {
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri &mdash; Earthstar Geographics'
        };
      case 'topo':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri &mdash; National Geographic'
        };
      case 'street':
      default:
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri, HERE, Garmin, USGS'
        };
    }
  };

  const tileConfig = getTileConfig();

  return (
    <div
      style={{ height }}
      className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <MapController center={center} zoom={zoom} />

        {/* Crisp, Watermark-Free TileLayer */}
        <TileLayer
          key={mapStyle}
          attribution={tileConfig.attribution}
          url={tileConfig.url}
          maxZoom={19}
        />

        {/* Flood Report Incident Markers */}
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
                <div className="p-1 min-w-[210px] text-slate-800">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${severityStyle.badge}`}>
                      {report.severity}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">{report.status}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 leading-snug">{report.location}</h4>
                  <p className="text-[11px] text-blue-700 font-medium">{report.district} District</p>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{report.description}</p>
                  
                  <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between text-[10px] text-slate-600">
                    <span>Water: <strong className="text-slate-900">{report.waterLevel} ft</strong></span>
                    {onSelectReport && (
                      <button
                        onClick={() => onSelectReport(report)}
                        className="text-blue-600 hover:text-blue-800 font-bold underline flex items-center gap-0.5"
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
