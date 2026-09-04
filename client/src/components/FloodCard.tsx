import React from 'react';
import { FloodReport } from '../types/flood';
import {
  formatRelativeTime,
  getSeverityBadgeClasses,
  getStatusBadgeClasses
} from '../utils/formatters';
import {
  MapPin,
  Clock,
  Users,
  Eye,
  Edit2,
  Trash2,
  Droplets
} from 'lucide-react';

interface FloodCardProps {
  report: FloodReport;
  onView: (report: FloodReport) => void;
  onEdit: (report: FloodReport) => void;
  onDelete: (report: FloodReport) => void;
}

export const FloodCard: React.FC<FloodCardProps> = ({
  report,
  onView,
  onEdit,
  onDelete
}) => {
  const severityStyle = getSeverityBadgeClasses(report.severity);
  const statusClass = getStatusBadgeClasses(report.status);

  return (
    <div className="rounded-xl bg-white p-5 flex flex-col justify-between border border-gray-200 shadow-sm hover:shadow-md transition relative group">
      {/* Top Bar: Severity & Status Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${severityStyle.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${severityStyle.dot}`} />
              {report.severity} Risk
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-gray-100 text-slate-600 border border-gray-200">
              {report.floodType}
            </span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusClass}`}>
            {report.status}
          </span>
        </div>

        {/* Location & District */}
        <div className="mb-2">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
            {report.location}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span className="font-medium text-slate-700">{report.district} District</span>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Clock className="w-3 h-3" />
              <span>{formatRelativeTime(report.reportedAt)}</span>
            </div>
          </div>
        </div>

        {/* Description Snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed bg-gray-50 p-2.5 rounded-lg border border-gray-100">
          {report.description}
        </p>

        {/* Key Metrics row */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
            <Droplets className="w-4 h-4 text-blue-600" />
            <div>
              <span className="text-[10px] text-slate-500 block leading-none">Water Level</span>
              <span className="text-xs font-bold text-slate-800">
                {report.waterLevel > 0 ? `${report.waterLevel} ft` : 'Receded'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
            <Users className="w-4 h-4 text-amber-600" />
            <div>
              <span className="text-[10px] text-slate-500 block leading-none">Affected</span>
              <span className="text-xs font-bold text-slate-800">
                {report.affectedPeople > 0 ? `${report.affectedPeople.toLocaleString()}` : 'None'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
        <button
          onClick={() => onView(report)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium transition"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </button>
        <button
          onClick={() => onEdit(report)}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-slate-600 hover:text-slate-900 border border-gray-200 transition"
          title="Edit Report"
          aria-label="Edit Report"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(report)}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-gray-200 transition"
          title="Delete Report"
          aria-label="Delete Report"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
