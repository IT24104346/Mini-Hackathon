import React from 'react';
import { Loader2, SearchX, PlusCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Fetching real-time flood reports from Sri Lanka network...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 mb-4">
        <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
      </div>
      <h3 className="text-base font-bold text-slate-800">Connecting to Database</h3>
      <p className="text-xs text-slate-500 max-w-sm mt-1">{message}</p>
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
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl bg-white border border-gray-200 my-4 shadow-sm">
      <div className="p-4 rounded-2xl bg-gray-100 text-slate-500 mb-4">
        <SearchX className="w-8 h-8 text-slate-500" />
      </div>
      <h3 className="text-base font-bold text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 max-w-md mt-1 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-slate-700 text-xs font-semibold border border-gray-300 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
        {showReportCta && (
          <Link
            to="/report"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Submit New Flood Alert</span>
          </Link>
        )}
      </div>
    </div>
  );
};
