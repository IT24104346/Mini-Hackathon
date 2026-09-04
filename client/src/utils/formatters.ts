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
        badge: 'bg-red-50 text-red-700 border border-red-200',
        dot: 'bg-red-600 animate-ping-slow',
        border: 'border-red-200',
        bg: 'bg-red-50',
        text: 'text-red-700'
      };
    case 'High':
      return {
        badge: 'bg-amber-50 text-amber-700 border border-amber-200',
        dot: 'bg-amber-600',
        border: 'border-amber-200',
        bg: 'bg-amber-50',
        text: 'text-amber-700'
      };
    case 'Moderate':
      return {
        badge: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
        dot: 'bg-yellow-500',
        border: 'border-yellow-200',
        bg: 'bg-yellow-50',
        text: 'text-yellow-800'
      };
    case 'Low':
    default:
      return {
        badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        dot: 'bg-emerald-600',
        border: 'border-emerald-200',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700'
      };
  }
};

export const getStatusBadgeClasses = (status: StatusType): string => {
  switch (status) {
    case 'Active':
      return 'bg-red-50 text-red-700 border border-red-200';
    case 'Monitoring':
      return 'bg-blue-50 text-blue-700 border border-blue-200';
    case 'Resolved':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    default:
      return 'bg-gray-100 text-slate-700 border border-gray-200';
  }
};
