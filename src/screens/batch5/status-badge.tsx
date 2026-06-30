interface StatusBadgeProps {
  status: 'available' | 'pending' | 'cancelled' | 'neutral' | 'selected' | 'active';
  label: string;
}

const statusColors = {
  available: { bg: '#2E7D32', text: '#FFFFFF' },
  pending: { bg: '#F4A300', text: '#2D2D2D' },
  cancelled: { bg: '#D32F2F', text: '#FFFFFF' },
  neutral: { bg: '#6C757D', text: '#FFFFFF' },
  selected: { bg: '#D6C5A4', text: '#2D2D2D' },
  active: { bg: '#B8860B', text: '#FFFFFF' },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const colors = statusColors[status];
  
  return (
    <span
      className="inline-flex items-center justify-center px-3 py-1"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        fontFamily: 'Inter',
        fontSize: '12px',
        fontWeight: 500,
        borderRadius: '999px',
      }}
    >
      {label}
    </span>
  );
}
