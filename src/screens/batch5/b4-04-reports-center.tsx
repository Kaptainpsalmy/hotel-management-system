import { PageHeader } from "./page-header";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Download, Calendar, TrendingUp, FileText } from "lucide-react";

const monthlyOccupancyData = [
  { month: 'Jan', occupancy: 68, revenue: 24500000, adr: 85000 },
  { month: 'Feb', occupancy: 72, revenue: 26800000, adr: 87500 },
  { month: 'Mar', occupancy: 78, revenue: 31200000, adr: 92000 },
  { month: 'Apr', occupancy: 75, revenue: 29500000, adr: 89500 },
  { month: 'May', occupancy: 82, revenue: 35600000, adr: 96000 },
  { month: 'Jun', occupancy: 80, revenue: 34200000, adr: 94500 },
];

const availableReports = [
  {
    id: 1,
    title: 'Monthly Occupancy Rate',
    description: 'Comprehensive occupancy analytics with revenue correlation',
    category: 'Operations',
    lastGenerated: 'Jun 28, 2026 - 08:00 AM',
    format: 'PDF, Excel',
    featured: true,
  },
  {
    id: 2,
    title: 'Revenue by Department',
    description: 'Breakdown of revenue streams across all hotel departments',
    category: 'Finance',
    lastGenerated: 'Jun 27, 2026 - 11:30 PM',
    format: 'PDF, Excel',
    featured: false,
  },
  {
    id: 3,
    title: 'Guest Satisfaction Survey Results',
    description: 'Aggregated feedback scores and sentiment analysis',
    category: 'Guest Experience',
    lastGenerated: 'Jun 26, 2026 - 03:15 PM',
    format: 'PDF',
    featured: false,
  },
  {
    id: 4,
    title: 'Housekeeping Performance',
    description: 'Room cleaning efficiency and quality metrics',
    category: 'Operations',
    lastGenerated: 'Jun 28, 2026 - 06:45 AM',
    format: 'Excel',
    featured: false,
  },
  {
    id: 5,
    title: 'F&B Department P&L',
    description: 'Profit and loss statement for restaurant and bar operations',
    category: 'Finance',
    lastGenerated: 'Jun 25, 2026 - 09:20 AM',
    format: 'PDF, Excel',
    featured: false,
  },
  {
    id: 6,
    title: 'Marketing Campaign ROI',
    description: 'Return on investment analysis for recent marketing initiatives',
    category: 'Marketing',
    lastGenerated: 'Jun 24, 2026 - 02:30 PM',
    format: 'PDF',
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  Operations: '#2E7D32',
  Finance: '#B8860B',
  'Guest Experience': '#F4A300',
  Marketing: '#4E342E',
};

export function ReportsCenter() {
  return (
    <div>
      <PageHeader
        title="Reports Center"
        breadcrumbs={['Business Intelligence', 'Reports']}
        action={
          <button
            className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors hover:opacity-90"
            style={{
              backgroundColor: '#B8860B',
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            <FileText className="w-4 h-4" />
            Schedule Report
          </button>
        }
      />

      <div className="p-8">
        {/* Featured Report - Monthly Occupancy */}
        <div
          className="p-8 rounded-lg mb-8"
          style={{
            backgroundColor: '#EFFFFE',
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            border: '2px solid #B8860B',
          }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 600, color: '#2D2D2D' }}>
                  Monthly Occupancy Rate Analysis
                </h2>
                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: '#B8860B',
                    color: '#FFFFFF',
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Featured Report
                </span>
              </div>
              <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6C757D' }}>
                6-month trend analysis with revenue correlation and ADR metrics
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors hover:opacity-90"
                style={{
                  backgroundColor: '#EFFFFE',
                  border: '1px solid #D6C5A4',
                  color: '#2D2D2D',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                <Calendar className="w-4 h-4" />
                Change Period
              </button>
              <button
                className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors hover:opacity-90"
                style={{
                  backgroundColor: '#2E7D32',
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>

          {/* Key Insights Summary */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: '#F8F6F2',
                border: '1px solid #E0E0E0',
              }}
            >
              <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Avg Occupancy
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <div style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: 700, color: '#2D2D2D' }}>
                  75.8%
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" style={{ color: '#2E7D32' }} />
                  <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#2E7D32' }}>
                    +5.2%
                  </span>
                </div>
              </div>
              <div className="mt-1" style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>
                vs previous 6 months
              </div>
            </div>

            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: '#F8F6F2',
                border: '1px solid #E0E0E0',
              }}
            >
              <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Revenue
              </div>
              <div className="mt-2">
                <div style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: 700, color: '#2D2D2D' }}>
                  ₦181.8M
                </div>
              </div>
              <div className="mt-1" style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>
                Jan - Jun 2026
              </div>
            </div>

            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: '#F8F6F2',
                border: '1px solid #E0E0E0',
              }}
            >
              <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Avg Daily Rate
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <div style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: 700, color: '#2D2D2D' }}>
                  ₦90,750
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" style={{ color: '#2E7D32' }} />
                  <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#2E7D32' }}>
                    +3.8%
                  </span>
                </div>
              </div>
              <div className="mt-1" style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>
                6-month average
              </div>
            </div>

            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: '#F8F6F2',
                border: '1px solid #E0E0E0',
              }}
            >
              <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Peak Month
              </div>
              <div className="mt-2">
                <div style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: 700, color: '#2D2D2D' }}>
                  May
                </div>
              </div>
              <div className="mt-1" style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>
                82% occupancy
              </div>
            </div>
          </div>

          {/* Occupancy Chart */}
          <div className="mb-6">
            <h3 className="mb-4" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, color: '#2D2D2D' }}>
              Monthly Occupancy & Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyOccupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' }}
                  axisLine={{ stroke: '#E0E0E0' }}
                  label={{ value: 'Month (2026)', position: 'insideBottom', offset: -5, style: { fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' } }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' }}
                  axisLine={{ stroke: '#E0E0E0' }}
                  tickFormatter={(value) => `${value}%`}
                  label={{ value: 'Occupancy Rate (%)', angle: -90, position: 'insideLeft', style: { fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' } }}
                  domain={[0, 100]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' }}
                  axisLine={{ stroke: '#E0E0E0' }}
                  tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}M`}
                  label={{ value: 'Revenue (₦ Millions)', angle: 90, position: 'insideRight', style: { fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' } }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#EFFFFE',
                    border: '1px solid #D6C5A4',
                    borderRadius: '8px',
                    fontFamily: 'Inter',
                    fontSize: '12px',
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'occupancy') return [`${value}%`, 'Occupancy'];
                    if (name === 'revenue') return [`₦${(value / 1000000).toFixed(1)}M`, 'Revenue'];
                    if (name === 'adr') return [`₦${value.toLocaleString()}`, 'ADR'];
                    return [value, name];
                  }}
                />
                <Legend
                  wrapperStyle={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="occupancy"
                  stroke="#2E7D32"
                  strokeWidth={3}
                  name="Occupancy Rate"
                  dot={{ fill: '#2E7D32', r: 5 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#B8860B"
                  strokeWidth={3}
                  name="Revenue"
                  dot={{ fill: '#B8860B', r: 5 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="adr"
                  stroke="#4E342E"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Average Daily Rate"
                  dot={{ fill: '#4E342E', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Insights */}
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: '#F8F6F2',
              border: '1px solid #B8860B',
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-1 p-2 rounded-full"
                style={{
                  backgroundColor: '#B8860B',
                }}
              >
                <TrendingUp className="w-4 h-4" style={{ color: '#FFFFFF' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>
                  Key Insights & Recommendations
                </div>
                <ul className="mt-2 space-y-2" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                  <li style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                    <strong>Occupancy trending upward:</strong> May achieved peak occupancy at 82%, up 14% from January baseline.
                  </li>
                  <li style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                    <strong>ADR growth consistent:</strong> Average Daily Rate increased 3.8% period-over-period, indicating successful rate management.
                  </li>
                  <li style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                    <strong>Recommendation:</strong> Continue promotional campaigns during low-occupancy periods (Jan-Feb) to smooth seasonal variance.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Available Reports Grid */}
        <div
          className="p-6 rounded-lg"
          style={{
            backgroundColor: '#EFFFFE',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <div className="mb-6">
            <h2 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
              All Available Reports
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6C757D', marginTop: '4px' }}>
              Access and download historical reports by category
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {availableReports.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-lg border transition-all hover:shadow-lg cursor-pointer"
                style={{
                  backgroundColor: '#F8F6F2',
                  borderColor: report.featured ? '#B8860B' : '#E0E0E0',
                  borderWidth: report.featured ? '2px' : '1px',
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: categoryColors[report.category] || '#6C757D',
                      color: '#FFFFFF',
                      fontFamily: 'Inter',
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    {report.category}
                  </span>
                  <FileText className="w-5 h-5" style={{ color: '#6C757D' }} />
                </div>

                <h3 className="mb-2" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, color: '#2D2D2D' }}>
                  {report.title}
                </h3>

                <p className="mb-4" style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D', lineHeight: '1.6' }}>
                  {report.description}
                </p>

                <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid #E0E0E0' }}>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Last Generated</div>
                    <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#2D2D2D' }}>
                      {report.lastGenerated}
                    </div>
                  </div>
                  <button
                    className="px-3 py-1.5 rounded-lg transition-colors hover:opacity-90"
                    style={{
                      backgroundColor: '#B8860B',
                      color: '#FFFFFF',
                      fontFamily: 'Inter',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
                  >
                    <Download className="w-3 h-3 inline mr-1" />
                    {report.format}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
