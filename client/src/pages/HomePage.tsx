import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldAlert,
  PlusCircle,
  MapPin,
  Waves,
  Users,
  AlertTriangle,
  ArrowRight,
  Activity,
  CheckCircle2,
  Clock,
  LifeBuoy
} from 'lucide-react';
import { FloodReport, FloodStats } from '../types/flood';
import { fetchFloodReports, fetchFloodStats } from '../services/api';
import { StatCard } from '../components/StatCard';
import { FloodCard } from '../components/FloodCard';
import { FloodDetailModal } from '../components/FloodDetailModal';
import { EditFloodModal } from '../components/EditFloodModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { deleteFloodReport, updateFloodReport } from '../services/api';

export const HomePage: React.FC<{
  onShowToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => void;
}> = ({ onShowToast }) => {
  const { isAuthenticated, user } = useAuth();
  const [stats, setStats] = useState<FloodStats | null>(null);
  const [recentReports, setRecentReports] = useState<FloodReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [selectedReport, setSelectedReport] = useState<FloodReport | null>(null);
  const [editingReport, setEditingReport] = useState<FloodReport | null>(null);
  const [deletingReport, setDeletingReport] = useState<FloodReport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [statsData, reportsData] = await Promise.all([
        fetchFloodStats().catch(() => null),
        fetchFloodReports({ sortBy: 'newest' }).catch(() => [])
      ]);

      if (statsData) setStats(statsData);
      setRecentReports(reportsData.slice(0, 6));
    } catch (err: any) {
      console.error('Failed to fetch home page data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdate = async (id: string, data: any) => {
    try {
      await updateFloodReport(id, data);
      onShowToast('success', 'Report Updated', 'Flood status successfully revised.');
      loadData();
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
      onShowToast('success', 'Report Deleted', 'Flood report has been removed.');
      setDeletingReport(null);
      loadData();
    } catch (err: any) {
      onShowToast('error', 'Delete Failed', err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-10 py-2">
      {/* Hero Section */}
      <section className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>Sri Lanka Community Flood Alert Network</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Protecting Communities with Real-Time Flood Intelligence
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            During heavy rainfall and swollen river basins across Kelani, Kalu, Gin, and Nilwala rivers, <strong>Flood-Safe-LK</strong> connects affected citizens, volunteer responders, and monitors on one unified platform.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm transition"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Live Alerts Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>

            <Link
              to="/report"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-slate-800 font-medium text-xs border border-gray-200 transition"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>Report Flood</span>
            </Link>

            <Link
              to="/map"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-gray-50 text-slate-700 font-medium text-xs border border-gray-200 transition"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Disaster Map</span>
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 font-medium text-xs transition"
            >
              <span>About LK Crisis</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Live Disaster Impact Metrics</span>
            </h2>
            <p className="text-xs text-slate-500">
              Aggregated continuously from community verified field reports
            </p>
          </div>
          <Link
            to="/dashboard"
            className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Full Analytics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <StatCard
            title="Total Reports"
            value={stats?.totalReports ?? 0}
            icon={Waves}
            subtitle="Recorded island-wide"
            variant="default"
          />
          <StatCard
            title="Active Floods"
            value={stats?.activeFloods ?? 0}
            icon={ShieldAlert}
            subtitle="Ongoing inundations"
            variant="warning"
          />
          <StatCard
            title="Critical Danger"
            value={stats?.criticalFloods ?? 0}
            icon={AlertTriangle}
            subtitle="Immediate danger zones"
            variant="danger"
          />
          <StatCard
            title="Affected Citizens"
            value={stats?.totalAffectedPeople ? stats.totalAffectedPeople.toLocaleString() : '0'}
            icon={Users}
            subtitle="Estimated impacted"
            variant="info"
          />
          <StatCard
            title="Resolved Zones"
            value={stats?.resolvedFloods ?? 0}
            icon={CheckCircle2}
            subtitle="Water receded safely"
            variant="success"
          />
        </div>
      </section>

      {/* The Sri Lankan Flood Problem Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
        <div className="lg:col-span-2 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <span>Disaster Vulnerability</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Why Sri Lanka Needs Community-Powered Flood Monitoring
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Sri Lanka is subject to regular monsoonal rains. Low-lying districts such as <strong>Colombo, Gampaha, Kalutara, Galle, Matara, and Ratnapura</strong> face rapid water accumulation from major river basins.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong>Flood-Safe-LK</strong> enables community observers to log exact street-level water depths, GPS coordinates, and urgent relief needs to aid fast response.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="text-xs font-bold text-slate-800 mb-1">⚡ Rapid Local Verification</h4>
              <p className="text-xs text-slate-600">
                Reports reflect exact street-level depth and impassable roads.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="text-xs font-bold text-slate-800 mb-1">🤝 Direct Aid Coordination</h4>
              <p className="text-xs text-slate-600">
                Helps volunteer rescue units reach priority households quickly.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Guidance Card */}
        <div className="rounded-xl bg-red-50/70 border border-red-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-red-700 font-bold text-xs mb-2">
              <LifeBuoy className="w-4 h-4" />
              <span>Safety Reminders</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">•</span>
                <span>Move to designated safe ground before water exceeds 2 feet.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">•</span>
                <span>Turn off main electrical breaker panels to avoid hazard.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">•</span>
                <span>Never drive through moving water.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">•</span>
                <span>Call <strong>117</strong> (DMC) for urgent emergency dispatch.</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-red-200">
            <Link
              to="/report"
              className="w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit Urgent Report</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Alerts Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Recent Community Flood Alerts</span>
            </h2>
            <p className="text-xs text-slate-500">
              Latest field situations submitted across Sri Lankan districts
            </p>
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
          >
            <span>View All ({stats?.totalReports ?? 0})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentReports.map((report) => (
              <FloodCard
                key={report._id}
                report={report}
                onView={(r) => setSelectedReport(r)}
                onEdit={(r) => setEditingReport(r)}
                onDelete={(r) => setDeletingReport(r)}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-white border border-gray-200 text-center text-xs text-slate-500">
            No flood alerts currently logged in MongoDB Atlas database.
          </div>
        )}
      </section>

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
