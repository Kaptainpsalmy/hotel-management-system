import { PageHeader } from "./page-header";
import { StatusBadge } from "./status-badge";
import { Mail, Phone, Filter, Download, Send } from "lucide-react";

const segments = [
  {
    id: 1,
    name: 'Corporate - Inactive 3+ Months',
    count: 47,
    description: 'Business travelers who haven\'t booked in the last 90 days',
    tags: ['Corporate', 'Inactive'],
    lastInteraction: 'Mar 15, 2026',
    potentialRevenue: '₦8.5M',
  },
  {
    id: 2,
    name: 'Gold Tier Loyalty Members',
    count: 124,
    description: 'VIP guests with 10+ stays or ₦5M+ lifetime spend',
    tags: ['Loyalty', 'VIP', 'Active'],
    lastInteraction: 'Jun 28, 2026',
    potentialRevenue: '₦22.3M',
  },
  {
    id: 3,
    name: 'Wedding Event Leads',
    count: 31,
    description: 'Engaged couples who inquired but haven\'t confirmed',
    tags: ['Events', 'Pending'],
    lastInteraction: 'Jun 20, 2026',
    potentialRevenue: '₦15.7M',
  },
  {
    id: 4,
    name: 'International Frequent Visitors',
    count: 89,
    description: 'Non-Nigerian guests with 5+ visits in the past year',
    tags: ['International', 'Frequent'],
    lastInteraction: 'Jun 25, 2026',
    potentialRevenue: '₦18.2M',
  },
  {
    id: 5,
    name: 'Local Weekend Guests',
    count: 156,
    description: 'Lagos residents who book weekend staycations',
    tags: ['Local', 'Leisure'],
    lastInteraction: 'Jun 27, 2026',
    potentialRevenue: '₦6.8M',
  },
];

const guestList = [
  {
    id: 1,
    name: 'Mr. Chidi Okafor',
    company: 'Access Bank Nigeria',
    email: 'c.okafor@accessbank.ng',
    phone: '+234 803 456 7890',
    segment: 'Corporate - Inactive 3+ Months',
    lastStay: 'Feb 12, 2026',
    totalStays: 18,
    lifetimeValue: '₦2.8M',
    tier: 'Gold',
  },
  {
    id: 2,
    name: 'Mrs. Aisha Bello',
    company: 'Dangote Group',
    email: 'aisha.bello@dangote.com',
    phone: '+234 806 123 4567',
    segment: 'Gold Tier Loyalty Members',
    lastStay: 'Jun 24, 2026',
    totalStays: 32,
    lifetimeValue: '₦7.2M',
    tier: 'Platinum',
  },
  {
    id: 3,
    name: 'Mr. James Carter',
    company: 'Shell Nigeria',
    email: 'james.carter@shell.com.ng',
    phone: '+234 809 876 5432',
    segment: 'International Frequent Visitors',
    lastStay: 'Jun 15, 2026',
    totalStays: 24,
    lifetimeValue: '₦5.1M',
    tier: 'Gold',
  },
  {
    id: 4,
    name: 'Ms. Ngozi Eze',
    company: 'Self',
    email: 'ngozi.eze@gmail.com',
    phone: '+234 807 234 5678',
    segment: 'Local Weekend Guests',
    lastStay: 'Jun 22, 2026',
    totalStays: 8,
    lifetimeValue: '₦980K',
    tier: 'Silver',
  },
  {
    id: 5,
    name: 'Dr. Nnamdi Azikiwe',
    company: 'Lagos University Teaching Hospital',
    email: 'n.azikiwe@luth.gov.ng',
    phone: '+234 805 345 6789',
    segment: 'Corporate - Inactive 3+ Months',
    lastStay: 'Jan 28, 2026',
    totalStays: 15,
    lifetimeValue: '₦2.2M',
    tier: 'Gold',
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  Corporate: { bg: '#4E342E', text: '#FFFFFF' },
  Inactive: { bg: '#D32F2F', text: '#FFFFFF' },
  Loyalty: { bg: '#B8860B', text: '#FFFFFF' },
  VIP: { bg: '#B8860B', text: '#FFFFFF' },
  Active: { bg: '#2E7D32', text: '#FFFFFF' },
  Events: { bg: '#F4A300', text: '#2D2D2D' },
  Pending: { bg: '#F4A300', text: '#2D2D2D' },
  International: { bg: '#2E7D32', text: '#FFFFFF' },
  Frequent: { bg: '#2E7D32', text: '#FFFFFF' },
  Local: { bg: '#6C757D', text: '#FFFFFF' },
  Leisure: { bg: '#6C757D', text: '#FFFFFF' },
};

export function CrmGuestSegments() {
  return (
    <div>
      <PageHeader
        title="CRM & Guest Segments"
        breadcrumbs={['Business Intelligence', 'CRM']}
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
              Filter Segments
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
              <Send className="w-4 h-4" />
              Send Campaign
            </button>
          </div>
        }
      />

      <div className="p-8">
        {/* Segment Overview Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {segments.slice(0, 3).map((segment) => (
            <div
              key={segment.id}
              className="p-6 rounded-lg cursor-pointer transition-all hover:shadow-lg"
              style={{
                backgroundColor: '#EFFFFE',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, color: '#2D2D2D' }}>
                  {segment.name}
                </h3>
                <div
                  className="px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: '#B8860B',
                    color: '#FFFFFF',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  {segment.count}
                </div>
              </div>
              <p style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D', marginBottom: '12px' }}>
                {segment.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {segment.tags.map((tag, index) => {
                  const colors = tagColors[tag] || { bg: '#6C757D', text: '#FFFFFF' };
                  return (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text,
                        fontFamily: 'Inter',
                        fontSize: '11px',
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid #E0E0E0' }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Potential Revenue</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2E7D32' }}>
                    {segment.potentialRevenue}
                  </div>
                </div>
                <div className="text-right">
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>Last Interaction</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#2D2D2D' }}>
                    {segment.lastInteraction}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Segments Table */}
        <div
          className="p-6 rounded-lg mb-8"
          style={{
            backgroundColor: '#EFFFFE',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <div className="mb-6">
            <h2 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
              All Customer Segments
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6C757D', marginTop: '4px' }}>
              Click on a segment to view detailed guest list
            </p>
          </div>

          <div className="overflow-hidden rounded-lg" style={{ border: '1px solid #E0E0E0' }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#F8F6F2' }}>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Segment Name
                  </th>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Tags
                  </th>
                  <th className="px-4 py-3 text-center" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Guest Count
                  </th>
                  <th className="px-4 py-3 text-right" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Potential Revenue
                  </th>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Last Interaction
                  </th>
                </tr>
              </thead>
              <tbody>
                {segments.map((segment, index) => (
                  <tr
                    key={segment.id}
                    className="border-t cursor-pointer hover:bg-opacity-70 transition-colors"
                    style={{
                      backgroundColor: index % 2 === 0 ? '#EFFFFE' : '#F8F6F2',
                      borderColor: '#E0E0E0',
                    }}
                  >
                    <td className="px-4 py-4">
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#2D2D2D' }}>
                        {segment.name}
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D', marginTop: '2px' }}>
                        {segment.description}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {segment.tags.map((tag, tagIndex) => {
                          const colors = tagColors[tag] || { bg: '#6C757D', text: '#FFFFFF' };
                          return (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: colors.bg,
                                color: colors.text,
                                fontFamily: 'Inter',
                                fontSize: '10px',
                                fontWeight: 500,
                              }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full"
                        style={{
                          backgroundColor: '#B8860B',
                          color: '#FFFFFF',
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          fontWeight: 700,
                        }}
                      >
                        {segment.count}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2E7D32' }}>
                      {segment.potentialRevenue}
                    </td>
                    <td className="px-4 py-4" style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>
                      {segment.lastInteraction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guest List - Corporate Inactive 3+ Months */}
        <div
          className="p-6 rounded-lg"
          style={{
            backgroundColor: '#EFFFFE',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
                Corporate - Inactive 3+ Months
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6C757D', marginTop: '4px' }}>
                47 guests • Select guests for bulk action
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
                <Download className="w-4 h-4" />
                Export CSV
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
                <Mail className="w-4 h-4" />
                Send Re-engagement Email
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg" style={{ border: '1px solid #E0E0E0' }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#F8F6F2' }}>
                  <th className="px-4 py-3 w-12">
                    <input type="checkbox" className="w-4 h-4" />
                  </th>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Guest Name
                  </th>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Company
                  </th>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Contact
                  </th>
                  <th className="px-4 py-3 text-center" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Total Stays
                  </th>
                  <th className="px-4 py-3 text-right" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Lifetime Value
                  </th>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Last Stay
                  </th>
                  <th className="px-4 py-3 text-left" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Tier
                  </th>
                </tr>
              </thead>
              <tbody>
                {guestList.map((guest, index) => (
                  <tr
                    key={guest.id}
                    className="border-t hover:bg-opacity-70 transition-colors"
                    style={{
                      backgroundColor: index % 2 === 0 ? '#EFFFFE' : '#F8F6F2',
                      borderColor: '#E0E0E0',
                    }}
                  >
                    <td className="px-4 py-4">
                      <input type="checkbox" className="w-4 h-4" />
                    </td>
                    <td className="px-4 py-4" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#2D2D2D' }}>
                      {guest.name}
                    </td>
                    <td className="px-4 py-4" style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6C757D' }}>
                      {guest.company}
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" style={{ color: '#6C757D' }} />
                          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>
                            {guest.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" style={{ color: '#6C757D' }} />
                          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>
                            {guest.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>
                      {guest.totalStays}
                    </td>
                    <td className="px-4 py-4 text-right" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2E7D32' }}>
                      {guest.lifetimeValue}
                    </td>
                    <td className="px-4 py-4" style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>
                      {guest.lastStay}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className="px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: guest.tier === 'Platinum' ? '#B8860B' : guest.tier === 'Gold' ? '#D6C5A4' : '#6C757D',
                          color: guest.tier === 'Silver' ? '#FFFFFF' : '#2D2D2D',
                          fontFamily: 'Inter',
                          fontSize: '11px',
                          fontWeight: 600,
                        }}
                      >
                        {guest.tier}
                      </span>
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
