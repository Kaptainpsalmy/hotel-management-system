import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router";
import { 
  BarChart3, 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Search,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut
} from "lucide-react";

const navItems = [
  { path: "/bi-admin/revenue", icon: BarChart3, label: "Revenue Dashboard" },
  { path: "/bi-admin/events", icon: Calendar, label: "Event Booking" },
  { path: "/bi-admin/crm", icon: Users, label: "CRM & Segments" },
  { path: "/bi-admin/reports", icon: FileText, label: "Reports Center" },
  { path: "/bi-admin/settings", icon: Settings, label: "System Settings" },
];

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F6F2' }}>
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 h-full transition-all duration-300"
        style={{
          width: sidebarCollapsed ? '64px' : '240px',
          backgroundColor: '#4E342E',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="h-16 flex items-center justify-between px-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {!sidebarCollapsed && (
              <span className="text-white" style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 600 }}>
                Aryhills Hotel & Tower
              </span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 text-white" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          {/* Back to HMS Home */}
          <div className="px-3 pt-4 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: '#D6C5A4', textDecoration: 'none' }}
            >
              <Home className="w-4 h-4" style={{ flexShrink: 0 }} />
              {!sidebarCollapsed && (
                <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500 }}>← HMS Home</span>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 transition-colors ${
                    sidebarCollapsed ? 'justify-center' : ''
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#B8860B' : 'transparent',
                  color: '#F8F6F2',
                })}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className="w-5 h-5" style={{ flexShrink: 0 }} />
                    {!sidebarCollapsed && (
                      <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: isActive ? 600 : 400 }}>
                        {item.label}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className="transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? '64px' : '240px',
        }}
      >
        {/* Top Header Bar */}
        <header
          className="h-16 flex items-center justify-between px-6 sticky top-0 z-40"
          style={{ backgroundColor: '#4E342E', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6C757D' }} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border-0 outline-none"
                style={{
                  backgroundColor: '#EFFFFE',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5 text-white" />
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: '#D32F2F',
                  fontSize: '10px',
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  color: 'white',
                }}
              >
                3
              </span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B8860B' }}>
                <span style={{ color: 'white', fontFamily: 'Inter', fontSize: '14px', fontWeight: 600 }}>
                  AO
                </span>
              </div>
              <div className="text-left">
                <div style={{ color: '#F8F6F2', fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 }}>
                  Adebayo Olawale
                </div>
                <div style={{ color: '#D6C5A4', fontFamily: 'Inter', fontSize: '12px' }}>
                  General Manager
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <LogOut className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

