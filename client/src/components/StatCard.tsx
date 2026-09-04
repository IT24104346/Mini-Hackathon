import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: string;
  variant?: 'danger' | 'warning' | 'info' | 'success' | 'default';
  onClick?: () => void;
  isActive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  variant = 'default',
  onClick,
  isActive = false
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          iconBg: 'bg-red-50 text-red-600 border border-red-200',
          valueColor: 'text-red-600',
          border: isActive ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200 hover:border-red-300'
        };
      case 'warning':
        return {
          iconBg: 'bg-amber-50 text-amber-600 border border-amber-200',
          valueColor: 'text-amber-600',
          border: isActive ? 'border-amber-500 ring-2 ring-amber-100' : 'border-gray-200 hover:border-amber-300'
        };
      case 'info':
        return {
          iconBg: 'bg-blue-50 text-blue-600 border border-blue-200',
          valueColor: 'text-blue-600',
          border: isActive ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200 hover:border-blue-300'
        };
      case 'success':
        return {
          iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
          valueColor: 'text-emerald-600',
          border: isActive ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-gray-200 hover:border-emerald-300'
        };
      case 'default':
      default:
        return {
          iconBg: 'bg-gray-100 text-slate-700 border border-gray-200',
          valueColor: 'text-slate-900',
          border: isActive ? 'border-slate-500 ring-2 ring-slate-100' : 'border-gray-200 hover:border-gray-300'
        };
    }
  };

  const style = getVariantStyles();

  return (
    <div
      onClick={onClick}
      className={`rounded-xl bg-white p-4 sm:p-5 border ${style.border} shadow-sm transition-all duration-150 ${
        onClick ? 'cursor-pointer hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`p-1.5 rounded-lg ${style.iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${style.valueColor}`}>
          {value}
        </div>
        {trend && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 text-slate-600 border border-gray-200">
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
};
