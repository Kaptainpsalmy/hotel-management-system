import { useState } from "react";
import { PageHeader } from "./page-header";
import { Check, X, Settings, Users, Shield, Bell, Database, Mail } from "lucide-react";

const roles = [
  { id: 1, name: 'General Manager', color: '#B8860B', users: 2 },
  { id: 2, name: 'Front Desk', color: '#2E7D32', users: 8 },
  { id: 3, name: 'Housekeeping', color: '#F4A300', users: 15 },
  { id: 4, name: 'Finance', color: '#4E342E', users: 4 },
  { id: 5, name: 'F&B Manager', color: '#D32F2F', users: 6 },
  { id: 6, name: 'Maintenance', color: '#6C757D', users: 5 },
];

const permissions = [
  { id: 1, category: 'Reservations', name: 'View Bookings' },
  { id: 2, category: 'Reservations', name: 'Create/Edit Bookings' },
  { id: 3, category: 'Reservations', name: 'Cancel Bookings' },
  { id: 4, category: 'Reservations', name: 'Pricing Override' },
  { id: 5, category: 'Guest Management', name: 'View Guest Profiles' },
  { id: 6, category: 'Guest Management', name: 'Edit Guest Data' },
  { id: 7, category: 'Guest Management', name: 'Guest History Access' },
  { id: 8, category: 'Financial', name: 'View Revenue Reports' },
  { id: 9, category: 'Financial', name: 'Process Payments' },
  { id: 10, category: 'Financial', name: 'Issue Refunds' },
  { id: 11, category: 'Financial', name: 'Modify Invoices' },
  { id: 12, category: 'Operations', name: 'Assign Rooms' },
  { id: 13, category: 'Operations', name: 'Housekeeping Schedule' },
  { id: 14, category: 'Operations', name: 'Maintenance Requests' },
  { id: 15, category: 'Administration', name: 'User Management' },
  { id: 16, category: 'Administration', name: 'System Settings' },
  { id: 17, category: 'Administration', name: 'Audit Logs' },
];

// Permission matrix: role -> permission -> granted
const permissionMatrix: Record<string, Record<number, boolean>> = {
  'General Manager': {
    1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true,
    8: true, 9: true, 10: true, 11: true, 12: true, 13: true, 14: true,
    15: true, 16: true, 17: true,
  },
  'Front Desk': {
    1: true, 2: true, 3: true, 4: false, 5: true, 6: true, 7: true,
    8: false, 9: true, 10: false, 11: false, 12: true, 13: false, 14: true,
    15: false, 16: false, 17: false,
  },
  'Housekeeping': {
    1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false,
    8: false, 9: false, 10: false, 11: false, 12: false, 13: true, 14: true,
    15: false, 16: false, 17: false,
  },
  'Finance': {
    1: true, 2: false, 3: false, 4: false, 5: true, 6: false, 7: true,
    8: true, 9: true, 10: true, 11: true, 12: false, 13: false, 14: false,
    15: false, 16: false, 17: true,
  },
  'F&B Manager': {
    1: true, 2: false, 3: false, 4: false, 5: true, 6: false, 7: false,
    8: true, 9: true, 10: false, 11: false, 12: false, 13: false, 14: true,
    15: false, 16: false, 17: false,
  },
  'Maintenance': {
    1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false,
    8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: true,
    15: false, 16: false, 17: false,
  },
};

const settingsCategories = [
  {
    id: 1,
    icon: Database,
    title: 'General Settings',
    description: 'Hotel information, currency, time zone',
    lastUpdated: 'Jun 15, 2026',
  },
  {
    id: 2,
    icon: Bell,
    title: 'Notification Preferences',
    description: 'Email alerts, SMS notifications, in-app alerts',
    lastUpdated: 'Jun 20, 2026',
  },
  {
    id: 3,
    icon: Mail,
    title: 'Email Templates',
    description: 'Booking confirmations, invoices, marketing',
    lastUpdated: 'Jun 10, 2026',
  },
  {
    id: 4,
    icon: Shield,
    title: 'Security & Privacy',
    description: 'Password policies, data retention, GDPR compliance',
    lastUpdated: 'May 28, 2026',
  },
];

export function SystemSettings() {
  const [activeTab, setActiveTab] = useState<'permissions' | 'settings'>('permissions');

  return (
    <div>
      <PageHeader
        title="System Settings & User Roles"
        breadcrumbs={['Business Intelligence', 'Settings']}
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
            <Settings className="w-4 h-4" />
            Save Changes
          </button>
        }
      />

      <div className="p-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('permissions')}
            className="px-6 py-3 rounded-lg transition-all"
            style={{
              backgroundColor: activeTab === 'permissions' ? '#B8860B' : '#EFFFFE',
              color: activeTab === 'permissions' ? '#FFFFFF' : '#6C757D',
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: activeTab === 'permissions' ? 600 : 400,
              border: activeTab === 'permissions' ? 'none' : '1px solid #E0E0E0',
            }}
          >
            <Shield className="w-4 h-4 inline mr-2" />
            Role & Permissions
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className="px-6 py-3 rounded-lg transition-all"
            style={{
              backgroundColor: activeTab === 'settings' ? '#B8860B' : '#EFFFFE',
              color: activeTab === 'settings' ? '#FFFFFF' : '#6C757D',
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: activeTab === 'settings' ? 600 : 400,
              border: activeTab === 'settings' ? 'none' : '1px solid #E0E0E0',
            }}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            System Configuration
          </button>
        </div>

        {activeTab === 'permissions' ? (
          <>
            {/* Role Summary Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {roles.slice(0, 3).map((role) => (
                <div
                  key={role.id}
                  className="p-5 rounded-lg cursor-pointer transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: '#EFFFFE',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    border: '2px solid transparent',
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: role.color }}
                    >
                      <Users className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div
                      className="px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: '#F8F6F2',
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#2D2D2D',
                      }}
                    >
                      {role.users} users
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, color: '#2D2D2D' }}>
                    {role.name}
                  </h3>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="flex-1 py-2 rounded-lg transition-colors hover:opacity-90"
                      style={{
                        backgroundColor: '#F8F6F2',
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#2D2D2D',
                      }}
                    >
                      View Users
                    </button>
                    <button
                      className="flex-1 py-2 rounded-lg transition-colors hover:opacity-90"
                      style={{
                        backgroundColor: role.color,
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#FFFFFF',
                      }}
                    >
                      Edit Role
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Permission Matrix */}
            <div
              className="p-6 rounded-lg"
              style={{
                backgroundColor: '#EFFFFE',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <div className="mb-6">
                <h2 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
                  Permission Matrix
                </h2>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#6C757D', marginTop: '4px' }}>
                  Manage access controls for each user role
                </p>
              </div>

              <div className="overflow-auto">
                <div className="min-w-max">
                  {/* Header Row */}
                  <div className="flex" style={{ backgroundColor: '#F8F6F2', borderRadius: '8px 8px 0 0' }}>
                    <div
                      className="flex-shrink-0 px-4 py-3"
                      style={{
                        width: '320px',
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#6C757D',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Permission
                    </div>
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className="flex-shrink-0 px-4 py-3 text-center"
                        style={{
                          width: '140px',
                          fontFamily: 'Inter',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: role.color,
                        }}
                      >
                        {role.name}
                      </div>
                    ))}
                  </div>

                  {/* Permission Rows */}
                  {Object.entries(
                    permissions.reduce((acc, perm) => {
                      if (!acc[perm.category]) acc[perm.category] = [];
                      acc[perm.category].push(perm);
                      return acc;
                    }, {} as Record<string, typeof permissions>)
                  ).map(([category, perms]) => (
                    <div key={category}>
                      {/* Category Header */}
                      <div
                        className="px-4 py-2"
                        style={{
                          backgroundColor: '#F8F6F2',
                          fontFamily: 'Inter',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: '#2D2D2D',
                          borderTop: '1px solid #E0E0E0',
                        }}
                      >
                        {category}
                      </div>

                      {/* Permission Rows in Category */}
                      {perms.map((perm, index) => (
                        <div
                          key={perm.id}
                          className="flex items-center hover:bg-opacity-50 transition-colors"
                          style={{
                            backgroundColor: index % 2 === 0 ? '#EFFFFE' : '#F8F6F2',
                            borderTop: '1px solid #E0E0E0',
                          }}
                        >
                          <div
                            className="flex-shrink-0 px-4 py-3"
                            style={{
                              width: '320px',
                              fontFamily: 'Inter',
                              fontSize: '14px',
                              color: '#2D2D2D',
                            }}
                          >
                            {perm.name}
                          </div>
                          {roles.map((role) => {
                            const hasPermission = permissionMatrix[role.name]?.[perm.id] || false;
                            return (
                              <div
                                key={role.id}
                                className="flex-shrink-0 px-4 py-3 flex items-center justify-center"
                                style={{ width: '140px' }}
                              >
                                <button
                                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                  style={{
                                    backgroundColor: hasPermission ? role.color : '#E0E0E0',
                                    cursor: 'pointer',
                                  }}
                                >
                                  {hasPermission ? (
                                    <Check className="w-5 h-5" style={{ color: '#FFFFFF' }} />
                                  ) : (
                                    <X className="w-5 h-5" style={{ color: '#6C757D' }} />
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#F8F6F2' }}>
                <div className="flex items-center gap-6">
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2D2D2D' }}>
                    Legend:
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2E7D32' }}>
                      <Check className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>
                      Permission Granted
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E0E0E0' }}>
                      <X className="w-4 h-4" style={{ color: '#6C757D' }} />
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#6C757D' }}>
                      Permission Denied
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* System Configuration */
          <div className="space-y-6">
            {/* Settings Categories */}
            <div className="grid grid-cols-2 gap-6">
              {settingsCategories.map((setting) => (
                <div
                  key={setting.id}
                  className="p-6 rounded-lg cursor-pointer transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: '#EFFFFE',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    border: '1px solid #E0E0E0',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: '#B8860B' }}
                    >
                      <setting.icon className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 600, color: '#2D2D2D' }}>
                        {setting.title}
                      </h3>
                      <p className="mb-3" style={{ fontFamily: 'Inter', fontSize: '13px', color: '#6C757D', lineHeight: '1.5' }}>
                        {setting.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#6C757D' }}>
                          Last updated: {setting.lastUpdated}
                        </span>
                        <button
                          className="px-3 py-1.5 rounded-lg transition-colors hover:opacity-90"
                          style={{
                            backgroundColor: '#F8F6F2',
                            fontFamily: 'Inter',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#2D2D2D',
                          }}
                        >
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sample Configuration Panel */}
            <div
              className="p-6 rounded-lg"
              style={{
                backgroundColor: '#EFFFFE',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <h2 className="mb-6" style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600, color: '#2D2D2D' }}>
                General Settings
              </h2>

              <div className="space-y-6">
                {/* Hotel Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Hotel Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Aryhills Hotel & Tower"
                      className="w-full px-4 py-2 rounded-lg border outline-none focus:border-2"
                      style={{
                        backgroundColor: '#F8F6F2',
                        borderColor: '#E0E0E0',
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        color: '#2D2D2D',
                      }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue="Kajola Street, Imo, Ilesa, Osun State, Nigeria"
                      className="w-full px-4 py-2 rounded-lg border outline-none focus:border-2"
                      style={{
                        backgroundColor: '#F8F6F2',
                        borderColor: '#E0E0E0',
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        color: '#2D2D2D',
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Default Currency
                    </label>
                    <select
                      defaultValue="NGN"
                      className="w-full px-4 py-2 rounded-lg border outline-none focus:border-2"
                      style={{
                        backgroundColor: '#F8F6F2',
                        borderColor: '#E0E0E0',
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        color: '#2D2D2D',
                      }}
                    >
                      <option value="NGN">Nigerian Naira (₦)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2" style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#6C757D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Time Zone
                    </label>
                    <select
                      defaultValue="WAT"
                      className="w-full px-4 py-2 rounded-lg border outline-none focus:border-2"
                      style={{
                        backgroundColor: '#F8F6F2',
                        borderColor: '#E0E0E0',
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        color: '#2D2D2D',
                      }}
                    >
                      <option value="WAT">West Africa Time (UTC+1)</option>
                      <option value="GMT">GMT (UTC+0)</option>
                      <option value="EST">Eastern Time (UTC-5)</option>
                    </select>
                  </div>
                </div>

                {/* Toggle Settings */}
                <div className="pt-4" style={{ borderTop: '1px solid #E0E0E0' }}>
                  <h3 className="mb-4" style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>
                    System Preferences
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Enable automatic check-in reminders', enabled: true },
                      { label: 'Allow guests to modify bookings online', enabled: true },
                      { label: 'Send daily revenue summary to managers', enabled: true },
                      { label: 'Enable two-factor authentication', enabled: false },
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#F8F6F2' }}>
                        <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#2D2D2D' }}>
                          {setting.label}
                        </span>
                        <button
                          className="relative w-12 h-6 rounded-full transition-colors"
                          style={{
                            backgroundColor: setting.enabled ? '#2E7D32' : '#E0E0E0',
                          }}
                        >
                          <div
                            className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                            style={{
                              left: setting.enabled ? 'calc(100% - 20px)' : '4px',
                            }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

