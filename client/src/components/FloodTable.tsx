import React from 'react';
import { FloodReport } from '../types/flood';
import {
  formatRelativeTime,
  getSeverityBadgeClasses,
  getStatusBadgeClasses
} from '../utils/formatters';
import { Eye, Edit2, Trash2, MapPin } from 'lucide-react';

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
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-slate-600 font-semibold uppercase tracking-wider">
            <th className="py-3 px-4">Severity</th>
            <th className="py-3 px-4">Location / District</th>
            <th className="py-3 px-4">Flood Type</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Water Level</th>
            <th className="py-3 px-4">Affected</th>
            <th className="py-3 px-4">Reported</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {reports.map((report) => {
            const severityStyle = getSeverityBadgeClasses(report.severity);
            const statusClass = getStatusBadgeClasses(report.status);

            return (
              <tr
                key={report._id}
                className="hover:bg-gray-50/80 transition cursor-pointer"
                onClick={() => onView(report)}
              >
                <td className="py-3 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${severityStyle.badge}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${severityStyle.dot}`} />
                    {report.severity}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-900 line-clamp-1">
                    {report.location}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-blue-600" />
                    <span>{report.district}</span>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-slate-700">
                  <span className="px-2 py-0.5 rounded bg-gray-100 text-slate-600 border border-gray-200">
                    {report.floodType}
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusClass}`}>
                    {report.status}
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-slate-800 font-medium">
                  {report.waterLevel > 0 ? `${report.waterLevel} ft` : 'Receded'}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-slate-800">
                  {report.affectedPeople > 0 ? `${report.affectedPeople.toLocaleString()}` : '—'}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                  {formatRelativeTime(report.reportedAt)}
                </td>
                <td
                  className="py-3 px-4 whitespace-nowrap text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onView(report)}
                      className="p-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 transition"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onEdit(report)}
                      className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 text-slate-700 transition"
                      title="Edit Report"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(report)}
                      className="p-1.5 rounded bg-gray-100 hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
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
