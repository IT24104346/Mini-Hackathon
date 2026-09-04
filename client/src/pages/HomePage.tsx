import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  PlusCircle,
  MapPin,
  Waves,
  Users,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  ExternalLink,
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
    <div className="space-y-14 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Sri Lanka Community Flood Alert & Rapid Response</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Protecting Communities Across Sri Lanka with{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Real-Time Flood Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            During heavy monsoon rainfall and swollen river basins across Kelani, Kalu, Gin, and Nilwala rivers, critical safety information becomes fragmented. <strong>Flood-Safe-LK</strong> connects affected citizens, volunteer responders, and district monitors on one unified platform.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>View Live Alerts</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              to="/report"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 hover:border-cyan-500/40 transition"
            >
              <PlusCircle className="w-4 h-4 text-cyan-400" />
              <span>Report a Flood in Your Area</span>
            </Link>

            <Link
              to="/map"
              className="flex items-center gap-2 px-4 py-3 rounded-2xl text-slate-300 hover:text-white font-medium text-sm transition"
            >
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Explore Island Map</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics Grid */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span>Live Disaster Impact Metrics</span>
            </h2>
            <p className="text-xs text-slate-400">
              Aggregated continuously from community verified field reports
            </p>
          </div>
          <Link
            to="/dashboard"
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Full Analytics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <StatCard
            title="Total Reports"
            value={stats?.totalReports ?? 0}
            icon={Waves}
            subtitle="Recorded across island"
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
            title="Critical Risk"
            value={stats?.criticalFloods ?? 0}
            icon={AlertTriangle}
            subtitle="Immediate danger zones"
            variant="danger"
          />
          <StatCard
            title="Affected Citizens"
            value={stats?.totalAffectedPeople ? stats.totalAffectedPeople.toLocaleString() : '0'}
            icon={Users}
            subtitle="Estimated displaced/impacted"
            variant="info"
          />
          <StatCard
            title="Resolved Zones"
            value={stats?.resolvedFloods ?? 0}
            icon={CheckCircle2}
            subtitle="Water subsided safely"
            variant="success"
          />
        </div>
      </section>

      {/* The Sri Lankan Flood Problem Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-3xl bg-slate-900/50 border border-slate-800 p-6 sm:p-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <span>Disaster Vulnerability Analysis</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            Why Sri Lanka Needs Community-Powered Flood Monitoring
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Sri Lanka is subject to two major monsoon seasons (South-West and North-East) coupled with inter-monsoonal depressions. Low-lying districts such as <strong>Colombo, Gampaha, Kalutara, Galle, Matara, and Ratnapura</strong> face regular inundations from major river basins including <strong>Kelani Ganga, Kalu Ganga, Gin Ganga, and Nilwala Ganga</strong>.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            While government agencies provide overarching warnings, localized blockages, sudden flash floods in urban streets, and submerged village access roads often go unreported for hours. <strong>Flood-Safe-LK</strong> fills this gap by allowing community members on the ground to log exact water depths, GPS coordinates, and urgent rescue needs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h4 className="text-xs font-bold text-white mb-1">⚡ Rapid Local Verification</h4>
              <p className="text-xs text-slate-400">
                Reports reflect exact street-level depth and impassable roads within minutes.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h4 className="text-xs font-bold text-white mb-1">🤝 Direct Aid Coordination</h4>
              <p className="text-xs text-slate-400">
                Enables volunteer rescue boats and rations to reach the highest priority households.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Guidance Card */}
        <div className="rounded-2xl bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-950 border border-red-900/40 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-3">
              <LifeBuoy className="w-5 h-5" />
              <span>In Case of Severe Flooding</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Move to designated higher ground before floodwaters exceed 2 feet.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Turn off main electrical breaker panels to avoid electrocution.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Do not drive through moving water; 12 inches can sweep a vehicle.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Call <strong>117</strong> (DMC) or <strong>1990</strong> (Suwa Seriya) for urgent rescue.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-red-900/30">
            <Link
              to="/report"
              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Urgent Situation Alert</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Live Alerts Grid */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>Recent Community Flood Alerts</span>
            </h2>
            <p className="text-xs text-slate-400">
              Latest field situations submitted across Sri Lankan districts
            </p>
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline"
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
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
            No flood alerts currently logged in the database.
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
