import React from 'react';
import { FloodReport } from '../types/flood';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  report: FloodReport | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  report,
  isOpen,
  isDeleting,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-md bg-slate-900 border border-rose-900/60 rounded-3xl shadow-2xl overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-400 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-white">
              Delete Flood Report?
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Are you sure you want to permanently remove the report for <strong className="text-white">"{report.location}"</strong> in <span className="text-cyan-300">{report.district} District</span>?
            </p>
            <p className="text-[11px] text-slate-500 mt-2">
              This action cannot be undone and will update live dashboard statistics immediately.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
