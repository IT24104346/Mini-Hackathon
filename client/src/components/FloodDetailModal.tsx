import React from 'react';
import { FloodReport } from '../types/flood';
import {
  formatDateTime,
  formatRelativeTime,
  getSeverityBadgeClasses,
  getStatusBadgeClasses
} from '../utils/formatters';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Droplets,
  Users,
  Compass,
  User,
  Phone,
  AlertTriangle,
  Edit2,
  Trash2,
  ExternalLink
} from 'lucide-react';

interface FloodDetailModalProps {
  report: FloodReport | null;
  onClose: () => void;
  onEdit: (report: FloodReport) => void;
  onDelete: (report: FloodReport) => void;
}

export const FloodDetailModal: React.FC<FloodDetailModalProps> = ({
  report,
  onClose,
  onEdit,
  onDelete
}) => {
  if (!report) return null;

  const severityStyle = getSeverityBadgeClasses(report.severity);
  const statusClass = getStatusBadgeClasses(report.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className={`p-6 border-b ${severityStyle.border} ${severityStyle.bg} flex items-start justify-between gap-4`}>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${severityStyle.badge}`}>
                <span className={`w-2 h-2 rounded-full ${severityStyle.dot}`} />
                {report.severity} Severity
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-slate-800/80 text-slate-200 border border-slate-700">
                {report.floodType}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusClass}`}>
                {report.status} Status
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              {report.location}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{report.district} District, Sri Lanka</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Situation Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Reported Situation & Observations
            </h4>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
              {report.description}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                <span>Water Depth</span>
              </div>
              <div className="text-lg font-bold text-slate-100">
                {report.waterLevel > 0 ? `${report.waterLevel} ft` : 'Receded (0 ft)'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Affected People</span>
              </div>
              <div className="text-lg font-bold text-slate-100">
                {report.affectedPeople > 0 ? report.affectedPeople.toLocaleString() : 'Not stated'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 col-span-2 sm:col-span-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                <span>GPS Coordinates</span>
              </div>
              <div className="text-sm font-semibold text-slate-200 flex items-center justify-between">
                <span>{report.latitude.toFixed(4)}° N, {report.longitude.toFixed(4)}° E</span>
                <a
                  href={`https://maps.google.com/?q=${report.latitude},${report.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Reporter & Verification info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-400">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Reporter:</span>
                <span className="font-semibold text-slate-200">
                  {report.reporterName || 'Anonymous Community Citizen'}
                </span>
              </div>
              {report.contactNumber && (
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Contact:</span>
                  <a href={`tel:${report.contactNumber}`} className="font-semibold text-cyan-400 hover:underline">
                    {report.contactNumber}
                  </a>
                </div>
              )}
            </div>
            <div className="space-y-1.5 text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Reported:</span>
                <span className="text-slate-200 font-medium">
                  {formatDateTime(report.reportedAt)} ({formatRelativeTime(report.reportedAt)})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Last Updated:</span>
                <span className="text-slate-200 font-medium">
                  {formatDateTime(report.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(report);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Update Report</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(report);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-900/40 text-xs font-semibold transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
