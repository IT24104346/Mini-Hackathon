import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FloodReport, FloodStats } from '../types/flood';
import { fetchFloodReports, fetchFloodStats, updateFloodReport, deleteFloodReport, seedSampleData } from '../services/api';
import { getSeverityBadgeClasses, getStatusBadgeClasses, formatDateTime } from '../utils/formatters';
import {
  ShieldCheck,
  AlertTriangle,
  Users,
  CheckCircle,
  Clock,
  Database,
  Trash2,
  Edit2,
  Radio,
  FileCheck,
  RefreshCw,
  Search,
  Building,
  Lock
} from 'lucide-react';
import { FloodDetailModal } from '../components/FloodDetailModal';
import { EditFloodModal } from '../components/EditFloodModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

export const AdminDashboardPage: React.FC<{
  onShowToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => void;
}> = ({ onShowToast }) => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [reports, setReports] = useState<FloodReport[]>([]);
  const [stats, setStats] = useState<FloodStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedReport, setSelectedReport] = useState<FloodReport | null>(null);
  const [editingReport, setEditingReport] = useState<FloodReport | null>(null);
  const [deletingReport, setDeletingReport] = useState<FloodReport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      onShowToast('warning', 'Restricted Access', 'Admin privileges required. Please log in as an administrator.');
      navigate('/login');
    }
  }, [isAdmin, navigate, onShowToast]);

  const loadAdminData = async () => {
    try {
      setIsLoading(true);
      const [reportsData, statsData] = await Promise.all([
        fetchFloodReports({ sortBy: 'highestSeverity' }),
        fetchFloodStats()
      ]);
      setReports(reportsData);
      setStats(statsData);
    } catch (err: any) {
      onShowToast('error', 'Sync Failed', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  const handleQuickStatusChange = async (report: FloodReport, newStatus: 'Active' | 'Monitoring' | 'Resolved') => {
    try {
      await updateFloodReport(report._id, { status: newStatus });
      onShowToast('success', 'Status Revised', `Report for "${report.location}" marked as ${newStatus}.`);
      loadAdminData();
    } catch (err: any) {
      onShowToast('error', 'Update Failed', err.message);
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    try {
      await updateFloodReport(id, data);
      onShowToast('success', 'Report Saved', 'Field assessment successfully updated.');
      loadAdminData();
    } catch (err: any) {
      onShowToast('error', 'Update Error', err.message);
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!deletingReport) return;
    try {
      setIsDeleting(true);
      await deleteFloodReport(deletingReport._id);
      onShowToast('success', 'Report Deleted', 'Report permanently purged by DMC Administrator.');
      setDeletingReport(null);
      loadAdminData();
    } catch (err: any) {
      onShowToast('error', 'Delete Error', err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetDatabase = async () => {
    if (!window.confirm('ADMIN ACTION: Are you sure you want to reset all MongoDB Atlas records back to initial Sri Lankan sample records?')) return;
    try {
      setIsLoading(true);
      await seedSampleData();
      onShowToast('success', 'Database Restored', 'Seeded default Sri Lankan flood dataset.');
      loadAdminData();
    } catch (err: any) {
      onShowToast('error', 'Reset Failed', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReports = reports.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.location.toLowerCase().includes(q) ||
      r.district.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.reporterName && r.reporterName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 py-4">
      {/* Admin Top Command Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-800/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>DMC Emergency Operations Command Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Welcome, {user?.name || 'Administrator'}
          </h1>
          <p className="text-xs text-slate-300 flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span>{user?.organization || 'Sri Lanka Disaster Management Centre'}</span>
            <span className="text-slate-600">•</span>
            <span className="text-purple-300 font-semibold">{user?.district || 'Colombo'} Head Office</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={loadAdminData}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Feed</span>
          </button>
          <button
            onClick={handleResetDatabase}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-bold border border-rose-800/50 transition"
          >
            <Database className="w-3.5 h-3.5 text-rose-400" />
            <span>Re-seed Atlas</span>
          </button>
        </div>
      </div>

      {/* Admin KPI Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-rose-900/40">
          <div className="flex items-center justify-between text-xs text-rose-400 font-bold uppercase">
            <span>Critical Incidents</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400 mt-2">{stats?.criticalFloods ?? 0}</div>
          <p className="text-[11px] text-slate-400 mt-1">Requires immediate boat rescue</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-900/40">
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase">
            <span>Active Emergencies</span>
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400 mt-2">{stats?.activeFloods ?? 0}</div>
          <p className="text-[11px] text-slate-400 mt-1">Inundation ongoing</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-sky-900/40">
          <div className="flex items-center justify-between text-xs text-cyan-400 font-bold uppercase">
            <span>Estimated Displaced</span>
            <Users className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 mt-2">
            {stats?.totalAffectedPeople ? stats.totalAffectedPeople.toLocaleString() : '0'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Citizens needing relief rations</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-900/40">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase">
            <span>Resolved Sectors</span>
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2">{stats?.resolvedFloods ?? 0}</div>
          <p className="text-[11px] text-slate-400 mt-1">Water level normal</p>
        </div>
      </div>

      {/* Incident Verification & Status Management Table */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-purple-400" />
              <span>Community Field Incident Verification Queue</span>
            </h3>
            <p className="text-xs text-slate-400">
              Admin officers can verify reports, change status, adjust water level assessments, or delete spam.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports to verify..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase font-semibold text-[11px]">
                <th className="p-3">Severity</th>
                <th className="p-3">Location & District</th>
                <th className="p-3">Water Depth</th>
                <th className="p-3">Affected</th>
                <th className="p-3">Status</th>
                <th className="p-3">Reporter</th>
                <th className="p-3 text-right">Quick Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredReports.map((report) => {
                const severityStyle = getSeverityBadgeClasses(report.severity);
                const statusClass = getStatusBadgeClasses(report.status);

                return (
                  <tr key={report._id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${severityStyle.badge}`}>
                        {report.severity}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-200">{report.location}</div>
                      <div className="text-[11px] text-cyan-400">{report.district} District</div>
                    </td>
                    <td className="p-3 whitespace-nowrap font-medium text-slate-200">
                      {report.waterLevel} ft
                    </td>
                    <td className="p-3 whitespace-nowrap text-slate-200">
                      {report.affectedPeople > 0 ? report.affectedPeople.toLocaleString() : '—'}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusClass}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap text-slate-400">
                      <div>{report.reporterName || 'Anonymous'}</div>
                      <div className="text-[10px] text-slate-500">{formatDateTime(report.reportedAt)}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {report.status !== 'Resolved' ? (
                          <button
                            onClick={() => handleQuickStatusChange(report, 'Resolved')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/50 text-[10px] font-bold transition"
                            title="Mark as Resolved"
                          >
                            Resolve
                          </button>
                        ) : (
                          <button
                            onClick={() => handleQuickStatusChange(report, 'Active')}
                            className="px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/50 text-[10px] font-bold transition"
                            title="Reactivate Emergency"
                          >
                            Reactivate
                          </button>
                        )}
                        <button
                          onClick={() => setEditingReport(report)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                          title="Edit Full Assessment"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeletingReport(report)}
                          className="p-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-400 transition"
                          title="Purge Report"
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
