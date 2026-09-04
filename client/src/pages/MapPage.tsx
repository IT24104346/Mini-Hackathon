import React, { useState, useEffect } from 'react';
import { FloodReport } from '../types/flood';
import { fetchFloodReports, updateFloodReport, deleteFloodReport } from '../services/api';
import { SriLankaMap } from '../components/SriLankaMap';
import { FloodDetailModal } from '../components/FloodDetailModal';
import { EditFloodModal } from '../components/EditFloodModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { LoadingState } from '../components/LoadingState';
import { getSeverityBadgeClasses } from '../utils/formatters';
import { MapPin, Filter, Layers, Info, RefreshCw } from 'lucide-react';
import { DISTRICT_NAMES } from '../utils/districts';

interface MapPageProps {
  onShowToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => void;
}

export const MapPage: React.FC<MapPageProps> = ({ onShowToast }) => {
  const [reports, setReports] = useState<FloodReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');

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

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-cyan-400" />
            <span>Interactive Sri Lanka Flood Risk Map</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Geospatial overview of active flood alerts and localized inundations across Sri Lanka.
          </p>
        </div>

        <button
          onClick={loadReports}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Map</span>
        </button>
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
            />
          )}

          {/* Map Legend */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Risk Legend:</span>
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="font-semibold">Critical Danger</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>High Risk</span>
              </div>
              <div className="flex items-center gap-1.5 text-yellow-300">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span>Moderate</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Low / Receding</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sidebar Filter & List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel rounded-3xl p-5 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>Filter Map Locations</span>
            </h3>

            {/* District dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
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
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Severity
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
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
          <div className="glass-panel rounded-3xl p-4 border border-slate-800 max-h-[420px] overflow-y-auto space-y-2">
            <div className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
              <span>Mapped Flood Zones</span>
              <span className="text-[10px] text-cyan-400 font-semibold">{reports.length} Pins</span>
            </div>

            {reports.map((report) => {
              const severityStyle = getSeverityBadgeClasses(report.severity);
              return (
                <div
                  key={report._id}
                  onClick={() => setSelectedReport(report)}
                  className="p-3 rounded-2xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 cursor-pointer transition flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${severityStyle.badge}`}>
                      {report.severity}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {report.district}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{report.location}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{report.description}</p>
                </div>
              );
            })}
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
