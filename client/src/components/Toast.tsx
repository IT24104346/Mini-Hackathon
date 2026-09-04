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
          bg: 'bg-white border-emerald-200 text-emerald-800 shadow-lg',
          icon: <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        };
      case 'error':
        return {
          bg: 'bg-white border-red-200 text-red-800 shadow-lg',
          icon: <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
        };
      case 'warning':
        return {
          bg: 'bg-white border-amber-200 text-amber-800 shadow-lg',
          icon: <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-white border-blue-200 text-blue-800 shadow-lg',
          icon: <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
        };
    }
  };

  const style = getStyle();

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 transform translate-y-0 ${style.bg}`}
    >
      {style.icon}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-slate-900">{toast.title}</h4>
        {toast.message && (
          <p className="text-xs text-slate-600 mt-0.5 break-words">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-gray-100 transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
