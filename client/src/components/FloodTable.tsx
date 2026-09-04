import React from 'react';
import { FloodReport } from '../types/flood';
import {
  formatRelativeTime,
  getSeverityBadgeClasses,
  getStatusBadgeClasses
} from '../utils/formatters';
import { Eye, Edit2, Trash2, MapPin, Droplets, Users, Clock } from 'lucide-react';

interface FloodTableProps {
  reports: FloodReport[];
  onView: (report: FloodReport) => void;
  onEdit: (report: FloodReport) => void;
  onDelete: (report: FloodReport) => void;
}

export const FloodTable: React.FC<FloodTableProps> = ({
  reports,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider">
            <th className="py-3.5 px-4">Severity</th>
            <th className="py-3.5 px-4">Location / District</th>
            <th className="py-3.5 px-4">Flood Type</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4">Water Level</th>
            <th className="py-3.5 px-4">Affected</th>
            <th className="py-3.5 px-4">Reported</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {reports.map((report) => {
            const severityStyle = getSeverityBadgeClasses(report.severity);
            const statusClass = getStatusBadgeClasses(report.status);

            return (
              <tr
                key={report._id}
                className="hover:bg-slate-800/40 transition group cursor-pointer"
                onClick={() => onView(report)}
              >
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${severityStyle.badge}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${severityStyle.dot}`} />
                    {report.severity}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-200 group-hover:text-cyan-300 transition line-clamp-1">
                    {report.location}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{report.district}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-300">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {report.floodType}
                  </span>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusClass}`}>
                    {report.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-200 font-medium">
                  {report.waterLevel > 0 ? `${report.waterLevel} ft` : 'Receded'}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-200">
                  {report.affectedPeople > 0 ? `${report.affectedPeople.toLocaleString()} people` : '—'}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                  {formatRelativeTime(report.reportedAt)}
                </td>
                <td
                  className="py-3.5 px-4 whitespace-nowrap text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onView(report)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 transition"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onEdit(report)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                      title="Edit Report"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(report)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition"
                      title="Delete Report"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
