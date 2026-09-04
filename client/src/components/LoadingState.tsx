import React from 'react';
import { Loader2, SearchX, PlusCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Fetching real-time flood reports from Sri Lanka network...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-950/40 border border-cyan-800/50 mb-4">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
      <h3 className="text-base font-bold text-slate-200">Connecting to Database</h3>
      <p className="text-xs text-slate-400 max-w-sm mt-1">{message}</p>
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  description?: string;
  onResetFilters?: () => void;
  showReportCta?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Flood Reports Found',
  description = 'No active flood situations match your current search filters or district selection.',
  onResetFilters,
  showReportCta = true
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 my-4">
      <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-slate-400 mb-4">
        <SearchX className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-base font-bold text-slate-200">{title}</h3>
      <p className="text-xs text-slate-400 max-w-md mt-1 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
        {showReportCta && (
          <Link
            to="/report"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Submit New Flood Alert</span>
          </Link>
        )}
      </div>
    </div>
  );
};
