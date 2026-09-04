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
          glow: 'from-rose-500/20 to-red-500/5',
          border: isActive ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-rose-500/30 hover:border-rose-500/60',
          iconBg: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
          valueColor: 'text-rose-400'
        };
      case 'warning':
        return {
          glow: 'from-amber-500/20 to-orange-500/5',
          border: isActive ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-amber-500/30 hover:border-amber-500/60',
          iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
          valueColor: 'text-amber-400'
        };
      case 'info':
        return {
          glow: 'from-cyan-500/20 to-blue-500/5',
          border: isActive ? 'border-cyan-500 ring-2 ring-cyan-500/30' : 'border-cyan-500/30 hover:border-cyan-500/60',
          iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
          valueColor: 'text-cyan-400'
        };
      case 'success':
        return {
          glow: 'from-emerald-500/20 to-teal-500/5',
          border: isActive ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-emerald-500/30 hover:border-emerald-500/60',
          iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
          valueColor: 'text-emerald-400'
        };
      case 'default':
      default:
        return {
          glow: 'from-slate-700/20 to-slate-800/5',
          border: isActive ? 'border-slate-500 ring-2 ring-slate-500/30' : 'border-slate-800 hover:border-slate-700',
          iconBg: 'bg-slate-800 text-slate-300 border border-slate-700',
          valueColor: 'text-white'
        };
    }
  };

  const style = getVariantStyles();

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.glow} bg-slate-900/80 backdrop-blur-md p-5 border ${style.border} transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-1 shadow-lg' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-2 rounded-xl ${style.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div className={`text-3xl font-extrabold tracking-tight ${style.valueColor}`}>
          {value}
        </div>
        {trend && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1.5 text-xs text-slate-400 flex items-center gap-1 truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
};
