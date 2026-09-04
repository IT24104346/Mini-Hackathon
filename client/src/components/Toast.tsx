import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-slate-900 border-emerald-500/40 text-emerald-400',
          icon: <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        };
      case 'error':
        return {
          bg: 'bg-slate-900 border-rose-500/40 text-rose-400',
          icon: <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
        };
      case 'warning':
        return {
          bg: 'bg-slate-900 border-amber-500/40 text-amber-400',
          icon: <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-slate-900 border-cyan-500/40 text-cyan-400',
          icon: <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        };
    }
  };

  const style = getStyle();

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${style.bg}`}
    >
      {style.icon}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-slate-100">{toast.title}</h4>
        {toast.message && (
          <p className="text-xs text-slate-300 mt-0.5 break-words">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
