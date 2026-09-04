import React, { useState, useEffect } from 'react';
import { FloodReport } from '../types/flood';
import { fetchFloodReports, updateFloodReport, deleteFloodReport } from '../services/api';
import { SriLankaMap } from '../components/SriLankaMap';
import { FloodDetailModal } from '../components/FloodDetailModal';
import { EditFloodModal } from '../components/EditFloodModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { LoadingState } from '../components/LoadingState';
import { getSeverityBadgeClasses } from '../utils/formatters';
import { MapPin, Filter, Layers, RefreshCw, Search, Navigation } from 'lucide-react';
import { DISTRICT_NAMES, TownLocation, getTownSuggestions } from '../utils/districts';

interface MapPageProps {
  onShowToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => void;
}

export const MapPage: React.FC<MapPageProps> = ({ onShowToast }) => {
  const [reports, setReports] = useState<FloodReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');

  // Map viewport & clean basemap control
  const [mapCenter, setMapCenter] = useState<[number, number]>([7.8731, 80.7718]);
  const [mapZoom, setMapZoom] = useState<number>(8);
  const [mapStyle, setMapStyle] = useState<'street' | 'topo' | 'satellite'>('street');

  // City Search state
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<TownLocation[]>([]);

  // Modals state
  const [selectedReport, setSelectedReport] = useState<FloodReport | null>(null);
  const [editingReport, setEditingReport] = useState<FloodReport | null>(null);
  const [deletingReport, setDeletingReport] = useState<FloodReport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const data = await fetchFloodReports({
        district: selectedDistrict,
        severity: selectedSeverity
      });
      setReports(data);
    } catch (err: any) {
      onShowToast('error', 'Map Data Error', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, [selectedDistrict, selectedSeverity]);

  // Handle city search input
  const handleCitySearchChange = (query: string) => {
    setCitySearchQuery(query);
    if (query.trim().length >= 1) {
      setCitySuggestions(getTownSuggestions(query, 6));
    } else {
      setCitySuggestions([]);
    }
  };

  // Pan to selected city/town
  const handleSelectCity = (town: TownLocation) => {
    setMapCenter([town.lat, town.lng]);
    setMapZoom(13); // Close zoom on selected town
    setCitySearchQuery(town.town);
    setCitySuggestions([]);
    onShowToast('info', `Panned to ${town.town}`, `Location: ${town.district} District (${town.lat.toFixed(4)}° N, ${town.lng.toFixed(4)}° E)`);
  };

  // Reset to full Sri Lanka view
  const handleResetView = () => {
    setMapCenter([7.8731, 80.7718]);
    setMapZoom(8);
    setCitySearchQuery('');
    setCitySuggestions([]);
  };

  const handleUpdate = async (id: string, data: any) => {
    try {
      await updateFloodReport(id, data);
      onShowToast('success', 'Report Updated', 'Flood status updated.');
      loadReports();
    } catch (err: any) {
      onShowToast('error', 'Update Failed', err.message);
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!deletingReport) return;
    try {
      setIsDeleting(true);
      await deleteFloodReport(deletingReport._id);
      onShowToast('success', 'Report Deleted', 'Report removed from map.');
      setDeletingReport(null);
      loadReports();
    } catch (err: any) {
      onShowToast('error', 'Delete Failed', err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Popular Quick-Pan Cities (including user-requested Godagama)
  const quickJumpCities = [
    { name: '📍 Godagama', town: 'Godagama', district: 'Colombo', lat: 6.8521, lng: 80.0384 },
    { name: '📍 Colombo', town: 'Colombo', district: 'Colombo', lat: 6.9271, lng: 79.8612 },
    { name: '📍 Kaduwela', town: 'Kaduwela', district: 'Colombo', lat: 6.9344, lng: 79.9842 },
    { name: '📍 Gampaha', town: 'Gampaha', district: 'Gampaha', lat: 7.0840, lng: 79.9939 },
    { name: '📍 Kalutara', town: 'Kalutara', district: 'Kalutara', lat: 6.5854, lng: 79.9607 },
    { name: '📍 Galle', town: 'Galle', district: 'Galle', lat: 6.0535, lng: 80.2210 },
    { name: '📍 Matara', town: 'Matara', district: 'Matara', lat: 5.9549, lng: 80.5550 },
    { name: '📍 Ratnapura', town: 'Ratnapura', district: 'Ratnapura', lat: 6.6828, lng: 80.4034 },
    { name: '📍 Kandy', town: 'Kandy', district: 'Kandy', lat: 7.2906, lng: 80.6337 },
    { name: '📍 Kurunegala', town: 'Kurunegala', district: 'Kurunegala', lat: 7.4863, lng: 80.3623 },
    { name: '📍 Anuradhapura', town: 'Anuradhapura', district: 'Anuradhapura', lat: 8.3114, lng: 80.4037 },
    { name: '📍 Jaffna', town: 'Jaffna', district: 'Jaffna', lat: 9.6615, lng: 80.0255 },
    { name: '📍 Trincomalee', town: 'Trincomalee', district: 'Trincomalee', lat: 8.5874, lng: 81.2152 }
  ];

  return (
    <div className="space-y-5 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            <span>Interactive Sri Lanka Flood Risk Map</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Geospatial overview of active flood alerts and localized inundations across Sri Lanka.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetView}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-100 text-slate-700 text-xs font-semibold border border-gray-300 transition shadow-sm"
            title="Reset to whole Sri Lanka view"
          >
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span>Whole Island</span>
          </button>
          <button
            onClick={loadReports}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Map</span>
          </button>
        </div>
      </div>

      {/* Quick City Jumps Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1 flex-shrink-0">
          <Navigation className="w-3.5 h-3.5 text-blue-600" />
          <span>Quick City Jumps:</span>
        </span>
        {quickJumpCities.map((c) => (
          <button
            key={c.town}
            onClick={() => handleSelectCity(c)}
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-medium text-[11px] transition shadow-sm"
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Map + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Map Container */}
        <div className="lg:col-span-8 space-y-3">
          {isLoading ? (
            <LoadingState message="Plotting flood markers on Sri Lanka map..." />
          ) : (
            <SriLankaMap
              reports={reports}
              onSelectReport={(r) => setSelectedReport(r)}
              height="600px"
              center={mapCenter}
              zoom={mapZoom}
              mapStyle={mapStyle}
            />
          )}

          {/* Map Legend & Clean Style Selector */}
          <div className="p-3 rounded-xl bg-white border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-slate-600 font-semibold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Risk Legend:</span>
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-red-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <span className="font-semibold">Critical</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>High Risk</span>
                </div>
                <div className="flex items-center gap-1.5 text-yellow-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span>Moderate</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Low</span>
                </div>
              </div>
            </div>

            {/* Map Style Switcher */}
            <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-1 rounded-lg border border-gray-200 text-[11px]">
              <span className="text-slate-500 text-[10px] uppercase font-bold mr-1">Layer:</span>
              <button
                type="button"
                onClick={() => setMapStyle('street')}
                className={`px-2 py-0.5 rounded-md font-semibold transition ${mapStyle === 'street' ? 'bg-white text-blue-700 shadow-sm border border-gray-200' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Street
              </button>
              <button
                type="button"
                onClick={() => setMapStyle('topo')}
                className={`px-2 py-0.5 rounded-md font-semibold transition ${mapStyle === 'topo' ? 'bg-white text-blue-700 shadow-sm border border-gray-200' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Topographic
              </button>
              <button
                type="button"
                onClick={() => setMapStyle('satellite')}
                className={`px-2 py-0.5 rounded-md font-semibold transition ${mapStyle === 'satellite' ? 'bg-white text-blue-700 shadow-sm border border-gray-200' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Satellite
              </button>
            </div>
          </div>
        </div>

        {/* Right: Sidebar Filter & List */}
        <div className="lg:col-span-4 space-y-4">
          {/* City / Place Finder Search */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 space-y-2.5 relative shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span>Search City / Town</span>
            </h3>

            <div className="relative">
              <input
                type="text"
                value={citySearchQuery}
                onChange={(e) => handleCitySearchChange(e.target.value)}
                placeholder="Type city (Godagama, Colombo, Kandy)..."
                className="w-full pl-3 pr-8 py-2 rounded-xl bg-white border border-gray-300 text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <MapPin className="w-4 h-4 text-blue-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Suggestions dropdown */}
            {citySuggestions.length > 0 && (
              <div className="p-1 rounded-xl bg-white border border-gray-200 space-y-1 shadow-lg">
                {citySuggestions.map((town) => (
                  <button
                    key={`${town.town}-${town.district}`}
                    type="button"
                    onClick={() => handleSelectCity(town)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-xs text-slate-800 transition flex items-center justify-between"
                  >
                    <span className="font-semibold">📍 {town.town}</span>
                    <span className="text-[10px] text-slate-500">{town.district} District</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter options */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 space-y-3 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Filter Map Incidents</span>
            </h3>

            {/* District dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-white border border-gray-300 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="All">All Sri Lankan Districts</option>
                {DISTRICT_NAMES.map((d) => (
                  <option key={d} value={d}>
                    {d} District
                  </option>
                ))}
              </select>
            </div>

            {/* Severity dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Severity
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-white border border-gray-300 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="All">All Severity Levels</option>
                <option value="Critical">Critical Only</option>
                <option value="High">High Risk Only</option>
                <option value="Moderate">Moderate Only</option>
                <option value="Low">Low Only</option>
              </select>
            </div>
          </div>

          {/* Location list card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 max-h-[360px] overflow-y-auto space-y-2 shadow-sm">
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
              <span>Mapped Flood Zones</span>
              <span className="text-[10px] text-blue-600 font-semibold">{reports.length} Pins</span>
            </div>

            {reports.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-gray-200 rounded-xl">
                No active flood alerts in selected filter.
              </div>
            ) : (
              reports.map((report) => {
                const severityStyle = getSeverityBadgeClasses(report.severity);
                return (
                  <div
                    key={report._id}
                    onClick={() => {
                      setSelectedReport(report);
                      if (report.latitude && report.longitude) {
                        setMapCenter([report.latitude, report.longitude]);
                        setMapZoom(14);
                      }
                    }}
                    className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-200 cursor-pointer transition flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${severityStyle.badge}`}>
                        {report.severity}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {report.district}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{report.location}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{report.description}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <FloodDetailModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        onEdit={(r) => setEditingReport(r)}
        onDelete={(r) => setDeletingReport(r)}
      />

      <EditFloodModal
        report={editingReport}
        isOpen={Boolean(editingReport)}
        onClose={() => setEditingReport(null)}
        onSave={handleUpdate}
      />

      <DeleteConfirmModal
        report={deletingReport}
        isOpen={Boolean(deletingReport)}
        isDeleting={isDeleting}
        onClose={() => setDeletingReport(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};
