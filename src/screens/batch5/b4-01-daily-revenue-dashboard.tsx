import { useState } from "react";
import { PageHeader } from "./page-header";
import { KpiCard } from "./kpi-card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { Download, Filter } from "lucide-react";

const revenueByCategory = [
  { category: 'Room Revenue', amount: 4850000, percentage: 58 },
  { category: 'F&B', amount: 2100000, percentage: 25 },
  { category: 'Ancillary', amount: 890000, percentage: 11 },
  { category: 'Events', amount: 510000, percentage: 6 },
];

const dailyTrend = [
  { date: 'Jun 22', rooms: 780000, fb: 320000, ancillary: 145000, events: 85000 },
  { date: 'Jun 23', rooms: 820000, fb: 350000, ancillary: 160000, events: 95000 },
  { date: 'Jun 24', rooms: 900000, fb: 380000, ancillary: 170000, events: 110000 },
  { date: 'Jun 25', rooms: 850000, fb: 340000, ancillary: 155000, events: 90000 },
  { date: 'Jun 26', rooms: 920000, fb: 390000, ancillary: 180000, events: 105000 },
  { date: 'Jun 27', rooms: 880000, fb: 360000, ancillary: 165000, events: 95000 },
  { date: 'Jun 28', rooms: 950000, fb: 410000, ancillary: 190000, events: 120000 },
];

const roomTypeBreakdown = [
  { type: 'Standard', revenue: 1200000, rooms: 45 },
  { type: 'Deluxe', revenue: 1850000, rooms: 32 },
  { type: 'Suite', revenue: 1300000, rooms: 18 },
  { type: 'Presidential', revenue: 500000, rooms: 5 },
];

export function DailyRevenueDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleRoomTypeClick = (type: string) => {
    setSelectedRoomType(selectedRoomType === type ? null : type);
  };

  return (
    <div>
      <PageHeader
        title="Daily Revenue Dashboard"
        breadcrumbs={['Business Intelligence', 'Revenue']}
        action={
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
              <Filter className="w-4 h-4" />
              Filter
            </button>
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
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        }
      />

      <div className="p-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <KpiCard
            label="Today's Revenue"
            value="₦1,670,000"
            trend={{ direction: 'up', percentage: '+8.2%' }}
            subtitle="vs yesterday ₦1,544,000"
          />
          <KpiCard
            label="Month-to-Date"
            value="₦42.3M"
            trend={{ direction: 'up', percentage: '+12.5%' }}
            subtitle="Target: ₦50M (84.6%)"
          />
          <KpiCard
            label="Average Daily Rate"
            value="₦89,500"
            trend={{ direction: 'up', percentage: '+3.7%' }}
            subtitle="Occupancy: 78%"
          />
          <KpiCard
            label="RevPAR"
            value="₦69,810"
            trend={{ direction: 'up', percentage: '+6.1%' }}
            subtitle="Per available room"
          />
        </div>

        {/* Revenue by Category */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div
            className="col-span-2 p-6 rounded-lg"
            style={{
              backgroundColor: '#EFFFFE',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <div className="mb-6">
              <h2 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
                Revenue by Category
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6C757D', marginTop: '4px' }}>
                Today's revenue breakdown - click bars for details
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis
                  dataKey="category"
                  tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' }}
                  axisLine={{ stroke: '#E0E0E0' }}
                />
                <YAxis
                  tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' }}
                  axisLine={{ stroke: '#E0E0E0' }}
                  tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
                  label={{ value: 'Revenue (₦ Millions)', angle: -90, position: 'insideLeft', style: { fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' } }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#EFFFFE',
                    border: '1px solid #D6C5A4',
                    borderRadius: '8px',
                    fontFamily: 'Inter',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Revenue']}
                />
                <Bar
                  dataKey="amount"
                  fill="#B8860B"
                  radius={[8, 8, 0, 0]}
                  onClick={(data) => handleCategoryClick(data.category)}
                  cursor="pointer"
                />
              </BarChart>
            </ResponsiveContainer>
            {selectedCategory && (
              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#F8F6F2', border: '1px solid #D6C5A4' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>
                  {selectedCategory} - Detailed Breakdown
                </div>
                <div className="mt-2 grid grid-cols-3 gap-4">
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Yesterday</div>
                    <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>₦1,820,000</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Last Week Avg</div>
                    <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>₦1,650,000</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Month Avg</div>
                    <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>₦1,580,000</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category Summary */}
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: '#EFFFFE',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <h2 className="mb-4" style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
              Category Mix
            </h2>
            <div className="space-y-4">
              {revenueByCategory.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                      {item.category}
                    </span>
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#F8F6F2' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: '#B8860B',
                      }}
                    />
                  </div>
                  <div className="mt-1" style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>
                    ₦{item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7-Day Trend */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: '#EFFFFE',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <div className="mb-6">
              <h2 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
                7-Day Revenue Trend
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6C757D', marginTop: '4px' }}>
                Daily revenue by category over the past week
              </p>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={dailyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' }}
                  axisLine={{ stroke: '#E0E0E0' }}
                  label={{ value: 'Date', position: 'insideBottom', offset: -5, style: { fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' } }}
                />
                <YAxis
                  tick={{ fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' }}
                  axisLine={{ stroke: '#E0E0E0' }}
                  tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`}
                  label={{ value: 'Revenue (₦ Thousands)', angle: -90, position: 'insideLeft', style: { fontFamily: 'Inter', fontSize: 12, fill: '#6C757D' } }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#EFFFFE',
                    border: '1px solid #D6C5A4',
                    borderRadius: '8px',
                    fontFamily: 'Inter',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => `₦${value.toLocaleString()}`}
                />
                <Legend
                  wrapperStyle={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                  }}
                />
                <Line type="monotone" dataKey="rooms" stroke="#4E342E" strokeWidth={2} name="Rooms" />
                <Line type="monotone" dataKey="fb" stroke="#B8860B" strokeWidth={2} name="F&B" />
                <Line type="monotone" dataKey="ancillary" stroke="#2E7D32" strokeWidth={2} name="Ancillary" />
                <Line type="monotone" dataKey="events" stroke="#F4A300" strokeWidth={2} name="Events" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Room Type Performance */}
        <div
          className="p-6 rounded-lg"
          style={{
            backgroundColor: '#EFFFFE',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <div className="mb-6">
            <h2 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
              Room Type Revenue Performance
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6C757D', marginTop: '4px' }}>
              Click a row for detailed analytics
            </p>
          </div>
          <div className="overflow-hidden rounded-lg" style={{ border: '1px solid #E0E0E0' }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#F8F6F2' }}>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Room Type
                  </th>
                  <th className="px-4 py-3 text-right" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Rooms Sold
                  </th>
                  <th className="px-4 py-3 text-right" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Revenue Today
                  </th>
                  <th className="px-4 py-3 text-right" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Avg Rate
                  </th>
                  <th className="px-4 py-3 text-right" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    % of Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {roomTypeBreakdown.map((room, index) => {
                  const avgRate = room.revenue / room.rooms;
                  const percentage = (room.revenue / 4850000) * 100;
                  const isSelected = selectedRoomType === room.type;
                  
                  return (
                    <tr
                      key={index}
                      onClick={() => handleRoomTypeClick(room.type)}
                      className="cursor-pointer transition-colors border-t"
                      style={{
                        backgroundColor: isSelected ? '#D6C5A4' : index % 2 === 0 ? '#EFFFFE' : '#F8F6F2',
                        borderColor: '#E0E0E0',
                      }}
                    >
                      <td className="px-4 py-4" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#2D2D2D' }}>
                        {room.type}
                      </td>
                      <td className="px-4 py-4 text-right" style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                        {room.rooms}
                      </td>
                      <td className="px-4 py-4 text-right" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>
                        ₦{room.revenue.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right" style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                        ₦{avgRate.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right" style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                        {percentage.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {selectedRoomType && (
            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#F8F6F2', border: '1px solid #B8860B' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>
                {selectedRoomType} Room - Extended Metrics
              </div>
              <div className="mt-3 grid grid-cols-4 gap-4">
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>7-Day Avg Revenue</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>₦1,450,000</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Occupancy Rate</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>82%</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Avg Length of Stay</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>2.4 nights</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Guest Satisfaction</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>4.6 / 5.0</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
