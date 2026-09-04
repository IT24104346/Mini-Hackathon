import { SeverityType, StatusType } from '../types/flood';

export const formatRelativeTime = (dateString: string | Date): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (isNaN(diffInSeconds) || diffInSeconds < 0) return 'Just now';
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const formatDateTime = (dateString: string | Date): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const getSeverityBadgeClasses = (severity: SeverityType): {
  badge: string;
  dot: string;
  border: string;
  bg: string;
  text: string;
} => {
  switch (severity) {
    case 'Critical':
      return {
        badge: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
        dot: 'bg-rose-500 animate-ping-slow',
        border: 'border-rose-500/40',
        bg: 'bg-rose-950/20',
        text: 'text-rose-400'
      };
    case 'High':
      return {
        badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
        dot: 'bg-amber-500',
        border: 'border-amber-500/40',
        bg: 'bg-amber-950/20',
        text: 'text-amber-400'
      };
    case 'Moderate':
      return {
        badge: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30',
        dot: 'bg-yellow-400',
        border: 'border-yellow-500/40',
        bg: 'bg-yellow-950/20',
        text: 'text-yellow-300'
      };
    case 'Low':
    default:
      return {
        badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
        dot: 'bg-emerald-500',
        border: 'border-emerald-500/40',
        bg: 'bg-emerald-950/20',
        text: 'text-emerald-400'
      };
  }
};

export const getStatusBadgeClasses = (status: StatusType): string => {
  switch (status) {
    case 'Active':
      return 'bg-red-500/20 text-red-300 border border-red-500/30';
    case 'Monitoring':
      return 'bg-sky-500/20 text-sky-300 border border-sky-500/30';
    case 'Resolved':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
    default:
      return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
  }
};
