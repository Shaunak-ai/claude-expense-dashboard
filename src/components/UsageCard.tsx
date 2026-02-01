import { ReactNode } from 'react';

interface UsageCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
}

export function UsageCard({ title, value, subtitle, icon, trend, colorClass = "bg-white" }: UsageCardProps) {
  return (
    <div className={`${colorClass} rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`mt-2 flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
              <span className="ml-1 text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-claude-beige rounded-lg text-claude-orange">
          {icon}
        </div>
      </div>
    </div>
  );
}
