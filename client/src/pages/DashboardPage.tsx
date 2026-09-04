import React, { useEffect, useState, useCallback } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  RefreshCw,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Waves,
  AlertTriangle,
  Users,
  CheckCircle2,
  Database,
  ArrowUpDown,
  Radio,
  X
} from 'lucide-react';
import { FloodReport, FloodStats, FilterOptions } from '../types/flood';
import {
  fetchFloodReports,
  fetchFloodStats,
  deleteFloodReport,
  updateFloodReport,
  seedSampleData
} from '../services/api';
import { DISTRICT_NAMES } from '../utils/districts';
import { StatCard } from '../components/StatCard';
import { FloodCard } from '../components/FloodCard';
import { FloodTable } from '../components/FloodTable';
import { FloodDetailModal } from '../components/FloodDetailModal';
import { EditFloodModal } from '../components/EditFloodModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { LoadingState, EmptyState } from '../components/LoadingState';

interface DashboardPageProps {
  onShowToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onShowToast }) => {
  const [reports, setReports] = useState<FloodReport[]>([]);
  const [stats, setStats] = useState<FloodStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [autoPolling, setAutoPolling] = useState(true);

  // Filters State
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    district: 'All',
    severity: 'All',
    status: 'All',
    floodType: 'All',
    sortBy: 'newest',
    order: 'desc'
  });

  // Modals state
  const [selectedReport, setSelectedReport] = useState<FloodReport | null>(null);
  const [editingReport, setEditingReport] = useState<FloodReport | null>(null);
  const [deletingReport, setDeletingReport] = useState<FloodReport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch data
  const loadDashboardData = useCallback(async (showLoadingSpinner = false) => {
    if (showLoadingSpinner) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const [reportsData, statsData] = await Promise.all([
        fetchFloodReports(filters),
        fetchFloodStats()
      ]);

      setReports(reportsData);
      setStats(statsData);
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      onShowToast('error', 'Sync Failed', err.message || 'Could not reach backend API.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [filters, onShowToast]);

  useEffect(() => {
    loadDashboardData(true);
  }, [loadDashboardData]);

  // Live Auto Polling (every 20s)
  useEffect(() => {
    if (!autoPolling) return;
    const interval = setInterval(() => {
      loadDashboardData(false);
    }, 20000);

    return () => clearInterval(interval);
  }, [autoPolling, loadDashboardData]);

  // Handle CRUD
  const handleUpdate = async (id: string, data: any) => {
    try {
      await updateFloodReport(id, data);
      onShowToast('success', 'Report Updated', 'Flood status and water levels have been updated.');
      loadDashboardData(false);
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
      onShowToast('success', 'Report Deleted', 'The flood alert has been permanently removed.');
      setDeletingReport(null);
      loadDashboardData(false);
    } catch (err: any) {
      onShowToast('error', 'Delete Error', err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetSeed = async () => {
    if (!window.confirm('Reset all flood reports back to initial Sri Lankan sample data?')) return;
    try {
      setIsLoading(true);
      await seedSampleData();
      onShowToast('success', 'Database Reset', 'Sample Sri Lankan flood reports restored.');
      resetFilters();
    } catch (err: any) {
      onShowToast('error', 'Seed Error', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      district: 'All',
      severity: 'All',
      status: 'All',
      floodType: 'All',
      sortBy: 'newest',
      order: 'desc'
    });
  };

  const activeFilterCount = [
    filters.district !== 'All',
    filters.severity !== 'All',
    filters.status !== 'All',
    filters.floodType !== 'All',
    filters.search.trim() !== ''
  ].filter(Boolean).length;

  return (
    <div className="space-y-8 py-4">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Live Flood Management Dashboard
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {reports.length} Reports
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time monitoring, filtration, and situation management across all Sri Lankan districts.
          </p>
        </div>

        {/* Live Controls Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Auto polling switch */}
          <button
            onClick={() => setAutoPolling(!autoPolling)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              autoPolling
                ? 'bg-cyan-950/50 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${autoPolling ? 'animate-pulse text-cyan-400' : ''}`} />
            <span>Live Sync {autoPolling ? 'ON (20s)' : 'PAUSED'}</span>
          </button>

          {/* Manual Refresh */}
          <button
            onClick={() => loadDashboardData(false)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition disabled:opacity-50"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Refresh</span>
          </button>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition ${
                viewMode === 'grid'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition ${
                viewMode === 'table'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Reset Seed Button */}
          <button
            onClick={handleResetSeed}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 text-xs font-medium border border-slate-800 transition"
            title="Reset to initial Sri Lanka seed dataset"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Seed</span>
          </button>
        </div>
      </div>

      {/* Statistics Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <StatCard
          title="Total Reports"
          value={stats?.totalReports ?? 0}
          icon={Waves}
          subtitle="All recorded events"
          variant="default"
          isActive={filters.status === 'All' && filters.severity === 'All'}
          onClick={() => setFilters({ ...filters, status: 'All', severity: 'All' })}
        />
        <StatCard
          title="Active Floods"
          value={stats?.activeFloods ?? 0}
          icon={ShieldAlert}
          subtitle="Ongoing emergencies"
          variant="warning"
          isActive={filters.status === 'Active'}
          onClick={() => setFilters({ ...filters, status: filters.status === 'Active' ? 'All' : 'Active' })}
        />
        <StatCard
          title="Critical Situations"
          value={stats?.criticalFloods ?? 0}
          icon={AlertTriangle}
          subtitle="Immediate rescue danger"
          variant="danger"
          isActive={filters.severity === 'Critical'}
          onClick={() => setFilters({ ...filters, severity: filters.severity === 'Critical' ? 'All' : 'Critical' })}
        />
        <StatCard
          title="Affected People"
          value={stats?.totalAffectedPeople ? stats.totalAffectedPeople.toLocaleString() : '0'}
          icon={Users}
          subtitle="Across Sri Lanka"
          variant="info"
        />
        <StatCard
          title="Resolved"
          value={stats?.resolvedFloods ?? 0}
          icon={CheckCircle2}
          subtitle="Water safely receded"
          variant="success"
          isActive={filters.status === 'Resolved'}
          onClick={() => setFilters({ ...filters, status: filters.status === 'Resolved' ? 'All' : 'Resolved' })}
        />
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-panel rounded-3xl p-5 border border-slate-800 space-y-4">
        {/* Row 1: Search & Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search bar */}
          <div className="md:col-span-7 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search by location (e.g. Wellampitiya, Ratnapura), keyword, or reporter..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-950 border border-slate-700/80 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {filters.search && (
              <button
                onClick={() => setFilters({ ...filters, search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* District Dropdown */}
          <div className="md:col-span-3">
            <select
              value={filters.district}
              onChange={(e) => setFilters({ ...filters, district: e.target.value })}
              className="w-full py-2.5 px-3.5 rounded-2xl bg-slate-950 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="All">All Sri Lankan Districts (25)</option>
              {DISTRICT_NAMES.map((d) => (
                <option key={d} value={d}>
                  {d} District
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-2">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="w-full py-2.5 px-3.5 rounded-2xl bg-slate-950 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highestSeverity">Highest Severity</option>
              <option value="waterLevel">Water Level</option>
              <option value="affectedPeople">Most Affected</option>
            </select>
          </div>
        </div>

        {/* Row 2: Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
          {/* Severity Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" />
              <span>Severity:</span>
            </span>
            {['All', 'Critical', 'High', 'Moderate', 'Low'].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilters({ ...filters, severity: sev })}
                className={`px-3 py-1 rounded-xl font-semibold transition ${
                  filters.severity === sev
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-semibold mr-1">Status:</span>
            {['All', 'Active', 'Monitoring', 'Resolved'].map((st) => (
              <button
                key={st}
                onClick={() => setFilters({ ...filters, status: st })}
                className={`px-3 py-1 rounded-xl font-medium transition ${
                  filters.status === st
                    ? 'bg-slate-700 text-white border border-slate-600'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st}
              </button>
            ))}

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="ml-2 text-xs text-rose-400 hover:underline font-semibold"
              >
                Reset Filters ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Reports Display */}
      {isLoading ? (
        <LoadingState />
      ) : reports.length === 0 ? (
        <EmptyState onResetFilters={resetFilters} />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
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
        <FloodTable
          reports={reports}
          onView={(r) => setSelectedReport(r)}
          onEdit={(r) => setEditingReport(r)}
          onDelete={(r) => setDeletingReport(r)}
        />
      )}

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
