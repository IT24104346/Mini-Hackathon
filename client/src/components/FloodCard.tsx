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
  Compass,
  AlertOctagon,
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
    <div className={`glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between border ${severityStyle.border} relative overflow-hidden group`}>
      {/* Top Bar: Severity & Status Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${severityStyle.badge}`}>
              <span className={`w-2 h-2 rounded-full ${severityStyle.dot}`} />
              {report.severity} Risk
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              {report.floodType}
            </span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusClass}`}>
            {report.status}
          </span>
        </div>

        {/* Location & District */}
        <div className="mb-2">
          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition line-clamp-1">
            {report.location}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="font-semibold text-slate-300">{report.district} District</span>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock className="w-3 h-3" />
              <span>{formatRelativeTime(report.reportedAt)}</span>
            </div>
          </div>
        </div>

        {/* Description Snippet */}
        <p className="text-xs text-slate-300/90 line-clamp-2 mt-2.5 leading-relaxed bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
          {report.description}
        </p>

        {/* Key Metrics row */}
        <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="text-[10px] text-slate-400 block leading-none">Water Level</span>
              <span className="text-xs font-bold text-slate-200">
                {report.waterLevel > 0 ? `${report.waterLevel} ft` : 'Receded'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <Users className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 block leading-none">Affected</span>
              <span className="text-xs font-bold text-slate-200">
                {report.affectedPeople > 0 ? `${report.affectedPeople.toLocaleString()} people` : 'None / NA'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800">
        <button
          onClick={() => onView(report)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold transition shadow-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </button>
        <button
          onClick={() => onEdit(report)}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          title="Edit Report"
          aria-label="Edit Report"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(report)}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition"
          title="Delete Report"
          aria-label="Delete Report"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
