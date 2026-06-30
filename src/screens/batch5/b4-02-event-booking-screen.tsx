import { PageHeader } from "./page-header";
import { StatusBadge } from "./status-badge";
import { Calendar, Users, Clock, MapPin, Plus } from "lucide-react";

const eventSpaces = [
  { id: 1, name: 'Grand Ballroom', capacity: 500, hourlyRate: 150000 },
  { id: 2, name: 'Conference Room A', capacity: 80, hourlyRate: 45000 },
  { id: 3, name: 'Conference Room B', capacity: 50, hourlyRate: 30000 },
  { id: 4, name: 'Executive Boardroom', capacity: 20, hourlyRate: 25000 },
  { id: 5, name: 'Garden Pavilion', capacity: 150, hourlyRate: 85000 },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Okonkwo-Adeyemi Wedding Reception',
    space: 'Grand Ballroom',
    date: 'Jun 30, 2026',
    time: '18:00 - 23:00',
    guests: 350,
    client: 'Mrs. Chioma Okonkwo',
    status: 'active' as const,
    revenue: 750000,
  },
  {
    id: 2,
    title: 'FirstBank Annual General Meeting',
    space: 'Conference Room A',
    date: 'Jul 2, 2026',
    time: '09:00 - 16:00',
    guests: 75,
    client: 'Mr. Tunde Bakare',
    status: 'active' as const,
    revenue: 315000,
  },
  {
    id: 3,
    title: 'Tech Startup Pitch Competition',
    space: 'Garden Pavilion',
    date: 'Jul 5, 2026',
    time: '14:00 - 20:00',
    guests: 120,
    client: 'Ms. Aisha Ibrahim',
    status: 'pending' as const,
    revenue: 510000,
  },
  {
    id: 4,
    title: 'Medical Conference & Workshop',
    space: 'Conference Room A',
    date: 'Jul 8, 2026',
    time: '08:00 - 17:00',
    guests: 80,
    client: 'Dr. Nnamdi Azikiwe',
    status: 'active' as const,
    revenue: 405000,
  },
];

const calendarDays = [
  // Week 1
  { day: 27, events: 0, available: true },
  { day: 28, events: 0, available: true, isToday: true },
  { day: 29, events: 0, available: true },
  { day: 30, events: 1, available: false },
  { day: 1, events: 0, available: true, isNextMonth: true },
  { day: 2, events: 1, available: false, isNextMonth: true },
  { day: 3, events: 0, available: true, isNextMonth: true },
  // Week 2
  { day: 4, events: 0, available: true, isNextMonth: true },
  { day: 5, events: 1, available: false, isNextMonth: true },
  { day: 6, events: 0, available: true, isNextMonth: true },
  { day: 7, events: 0, available: true, isNextMonth: true },
  { day: 8, events: 1, available: false, isNextMonth: true },
  { day: 9, events: 0, available: true, isNextMonth: true },
  { day: 10, events: 0, available: true, isNextMonth: true },
  // Week 3
  { day: 11, events: 0, available: true, isNextMonth: true },
  { day: 12, events: 0, available: true, isNextMonth: true },
  { day: 13, events: 0, available: true, isNextMonth: true },
  { day: 14, events: 0, available: true, isNextMonth: true },
  { day: 15, events: 1, available: false, isNextMonth: true },
  { day: 16, events: 0, available: true, isNextMonth: true },
  { day: 17, events: 0, available: true, isNextMonth: true },
  // Week 4
  { day: 18, events: 0, available: true, isNextMonth: true },
  { day: 19, events: 0, available: true, isNextMonth: true },
  { day: 20, events: 1, available: false, isNextMonth: true },
  { day: 21, events: 0, available: true, isNextMonth: true },
  { day: 22, events: 0, available: true, isNextMonth: true },
  { day: 23, events: 0, available: true, isNextMonth: true },
  { day: 24, events: 0, available: true, isNextMonth: true },
];

export function EventBookingScreen() {
  return (
    <div>
      <PageHeader
        title="Event Booking & Conference Spaces"
        breadcrumbs={['Business Intelligence', 'Events']}
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
            <Plus className="w-4 h-4" />
            New Event Booking
          </button>
        }
      />

      <div className="p-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Calendar View */}
          <div
            className="col-span-2 p-6 rounded-lg"
            style={{
              backgroundColor: '#EFFFFE',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
                June - July 2026
              </h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#2E7D32' }} />
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#D32F2F' }} />
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>Booked</span>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center py-2"
                  style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#6C757D' }}
                >
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className="aspect-square p-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
                  style={{
                    backgroundColor: day.isToday ? '#D6C5A4' : day.available ? '#F8F6F2' : '#FFE5E5',
                    border: day.isToday ? '2px solid #B8860B' : '1px solid #E0E0E0',
                    opacity: day.isNextMonth ? 1 : 0.6,
                  }}
                >
                  <div className="flex flex-col h-full">
                    <span
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: day.isToday ? 600 : 400,
                        color: '#2D2D2D',
                      }}
                    >
                      {day.day}
                    </span>
                    {day.events > 0 && (
                      <div className="flex-1 flex items-center justify-center">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: day.available ? '#2E7D32' : '#D32F2F',
                            color: '#FFFFFF',
                            fontFamily: 'Inter',
                            fontSize: '10px',
                            fontWeight: 600,
                          }}
                        >
                          {day.events}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#F8F6F2' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2D2D2D', marginBottom: '8px' }}>
                Quick Stats
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Total Events (30 days)</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, color: '#2D2D2D' }}>8 bookings</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Revenue Forecast</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, color: '#2D2D2D' }}>₦3.2M</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Utilization Rate</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, color: '#2D2D2D' }}>62%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Spaces */}
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: '#EFFFFE',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <h2 className="mb-4" style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
              Available Spaces
            </h2>
            <div className="space-y-3">
              {eventSpaces.map((space) => (
                <div
                  key={space.id}
                  className="p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer"
                  style={{
                    backgroundColor: '#F8F6F2',
                    borderColor: '#E0E0E0',
                  }}
                >
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>
                    {space.name}
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" style={{ color: '#6C757D' }} />
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>
                        Up to {space.capacity} guests
                      </span>
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#B8860B' }}>
                      ₦{space.hourlyRate.toLocaleString()}/hour
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div
          className="p-6 rounded-lg"
          style={{
            backgroundColor: '#EFFFFE',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <div className="mb-6">
            <h2 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
              Upcoming Events
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6C757D', marginTop: '4px' }}>
              Confirmed and pending event bookings
            </p>
          </div>

          <div className="overflow-hidden rounded-lg" style={{ border: '1px solid #E0E0E0' }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#F8F6F2' }}>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Event Name
                  </th>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Space
                  </th>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Client
                  </th>
                  <th className="px-4 py-3 text-right" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Guests
                  </th>
                  <th className="px-4 py-3 text-right" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {upcomingEvents.map((event, index) => (
                  <tr
                    key={event.id}
                    className="border-t hover:bg-opacity-50 transition-colors"
                    style={{
                      backgroundColor: index % 2 === 0 ? '#EFFFFE' : '#F8F6F2',
                      borderColor: '#E0E0E0',
                    }}
                  >
                    <td className="px-4 py-4">
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#2D2D2D' }}>
                        {event.title}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color: '#6C757D' }} />
                        <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                          {event.space}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-1 flex-col">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" style={{ color: '#6C757D' }} />
                          <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                            {event.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 ml-6">
                          <Clock className="w-3 h-3" style={{ color: '#6C757D' }} />
                          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>
                            {event.time}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4" style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                      {event.client}
                    </td>
                    <td className="px-4 py-4 text-right" style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                      {event.guests}
                    </td>
                    <td className="px-4 py-4 text-right" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>
                      ₦{event.revenue.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge
                        status={event.status}
                        label={event.status === 'active' ? 'Confirmed' : 'Pending'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
