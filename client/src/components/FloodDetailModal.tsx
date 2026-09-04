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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${severityStyle.badge}`}>
                <span className={`w-2 h-2 rounded-full ${severityStyle.dot}`} />
                {report.severity} Severity
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-gray-200 text-slate-700">
                {report.floodType}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusClass}`}>
                {report.status} Status
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {report.location}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{report.district} District, Sri Lanka</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-slate-600 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Situation Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Reported Situation & Observations
            </h4>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
              {report.description}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                <span>Water Depth</span>
              </div>
              <div className="text-lg font-bold text-slate-900">
                {report.waterLevel > 0 ? `${report.waterLevel} ft` : 'Receded (0 ft)'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span>Affected People</span>
              </div>
              <div className="text-lg font-bold text-slate-900">
                {report.affectedPeople > 0 ? report.affectedPeople.toLocaleString() : 'Not stated'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 col-span-2 sm:col-span-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                <span>GPS Coordinates</span>
              </div>
              <div className="text-sm font-semibold text-slate-800 flex items-center justify-between">
                <span>{report.latitude.toFixed(4)}° N, {report.longitude.toFixed(4)}° E</span>
                <a
                  href={`https://maps.google.com/?q=${report.latitude},${report.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Reporter & Verification info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-600">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Reporter:</span>
                <span className="font-semibold text-slate-800">
                  {report.reporterName || 'Anonymous Community Citizen'}
                </span>
              </div>
              {report.contactNumber && (
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Contact:</span>
                  <a href={`tel:${report.contactNumber}`} className="font-semibold text-blue-600 hover:underline">
                    {report.contactNumber}
                  </a>
                </div>
              )}
            </div>
            <div className="space-y-1.5 text-slate-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Reported:</span>
                <span className="text-slate-800 font-medium">
                  {formatDateTime(report.reportedAt)} ({formatRelativeTime(report.reportedAt)})
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Last Updated:</span>
                <span className="text-slate-800 font-medium">
                  {formatDateTime(report.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(report);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Update Report</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(report);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white hover:bg-gray-100 text-slate-700 text-xs font-medium border border-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
