import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  breadcrumbs?: string[];
  action?: ReactNode;
  tabs?: { label: string; active?: boolean; onClick?: () => void }[];
}

export function PageHeader({ title, breadcrumbs, action, tabs }: PageHeaderProps) {
  return (
    <div className="h-20 flex items-center justify-between px-8" style={{ backgroundColor: '#F8F6F2', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="flex flex-col gap-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>
                {crumb}
                {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))}
          </div>
        )}
        <h1 style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 600, color: '#2D2D2D' }}>
          {title}
        </h1>
        {tabs && tabs.length > 0 && (
          <div className="flex gap-2 mt-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={tab.onClick}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: tab.active ? '#D6C5A4' : 'transparent',
                  color: tab.active ? '#2D2D2D' : '#6C757D',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: tab.active ? 500 : 400,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
