import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  trend?: {
    direction: 'up' | 'down';
    percentage: string;
  };
  subtitle?: string;
}

export function KpiCard({ label, value, trend, subtitle }: KpiCardProps) {
  return (
    <div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: '#EFFFFE',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <div style={{ fontFamily: 'Inter', fontSize: '32px', fontWeight: 700, color: '#2D2D2D' }}>
          {value}
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            {trend.direction === 'up' ? (
              <TrendingUp className="w-4 h-4" style={{ color: '#2E7D32' }} />
            ) : (
              <TrendingDown className="w-4 h-4" style={{ color: '#D32F2F' }} />
            )}
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 500,
                color: trend.direction === 'up' ? '#2E7D32' : '#D32F2F',
              }}
            >
              {trend.percentage}
            </span>
          </div>
        )}
      </div>
      {subtitle && (
        <div className="mt-1" style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
