import { useState } from "react";
import type { ReactNode } from "react";
import {
  LayoutDashboard, Calendar, Users, Plus, FileText, Bed, Wallet, Settings,
  ChevronLeft, ChevronRight, Bell, Search, LogOut,
  TrendingUp, TrendingDown, Filter, Check, CheckCircle, X,
  Edit, ArrowLeft, ArrowRight, Mail, Phone, Star, Shield, Flag,
  Home,
} from "lucide-react";

// ─── Brand tokens ──────────────────────────────────────────────────────────────
const C = {
  brown:   "#4E342E",
  beige:   "#D6C5A4",
  gold:    "#B8860B",
  ivory:   "#F8F6F2",
  white:   "#EFFFFE",
  charcoal:"#2D2D2D",
  gray:    "#6C757D",
  green:   "#2E7D32",
  amber:   "#F4A300",
  red:     "#D32F2F",
} as const;

// ─── Types ─────────────────────────────────────────────────────────────────────
type Screen = "login" | "gm-dashboard" | "reservation-calendar" | "new-booking" | "booking-detail" | "guest-profile";
type Role   = "gm" | "front-desk" | "housekeeping" | "finance";
type BookingStatus = "Pending" | "Confirmed" | "Checked In" | "Checked Out" | "Archived";
type RoomStatus    = "Available" | "Occupied" | "Reserved" | "Maintenance" | "Cleaning";

// ─── Mock data ─────────────────────────────────────────────────────────────────
const ROOMS = [
  { id: "R101", name: "Room 101", type: "Standard",   floor: 1, rate: 45000 },
  { id: "R102", name: "Room 102", type: "Standard",   floor: 1, rate: 45000 },
  { id: "R201", name: "Room 201", type: "Deluxe",     floor: 2, rate: 75000 },
  { id: "R202", name: "Room 202", type: "Deluxe",     floor: 2, rate: 75000 },
  { id: "R203", name: "Room 203", type: "Deluxe",     floor: 2, rate: 75000 },
  { id: "R204", name: "Room 204", type: "Deluxe",     floor: 2, rate: 75000 },
  { id: "R301", name: "Room 301", type: "Superior",   floor: 3, rate: 95000 },
  { id: "R302", name: "Room 302", type: "Superior",   floor: 3, rate: 95000 },
  { id: "S310", name: "Suite 310", type: "Suite",     floor: 3, rate: 185000 },
  { id: "S311", name: "Suite 311", type: "Suite",     floor: 3, rate: 185000 },
  { id: "R401", name: "Room 401", type: "Superior",   floor: 4, rate: 95000 },
  { id: "R402", name: "Room 402", type: "Deluxe",     floor: 4, rate: 75000 },
  { id: "PS501", name: "Penthouse 501", type: "Penthouse", floor: 5, rate: 350000 },
];

const GUESTS = [
  { id: "G001", name: "Mr. Chidi Okafor",    email: "c.okafor@legacygroup.ng",   phone: "+234 801 234 5678", nationality: "Nigerian", idNumber: "A04521987",  loyalty: "Gold",     vip: true,  totalStays: 12, totalSpend: 2450000 },
  { id: "G002", name: "Mrs. Aisha Bello",    email: "a.bello@company.ng",        phone: "+234 802 345 6789", nationality: "Nigerian", idNumber: "B11234567",  loyalty: "Silver",   vip: false, totalStays: 5,  totalSpend: 875000  },
  { id: "G003", name: "Mr. James Carter",    email: "j.carter@intlventures.com", phone: "+44 7700 900 123",  nationality: "British",  idNumber: "GB987654321",loyalty: "Platinum", vip: true,  totalStays: 28, totalSpend: 8200000 },
  { id: "G004", name: "Dr. Ngozi Adeyemi",   email: "n.adeyemi@unilag.edu.ng",   phone: "+234 803 456 7890", nationality: "Nigerian", idNumber: "A09876543",  loyalty: "Bronze",   vip: false, totalStays: 2,  totalSpend: 190000  },
  { id: "G005", name: "Mr. Emeka Nwosu",     email: "e.nwosu@fintech.ng",        phone: "+234 806 789 0123", nationality: "Nigerian", idNumber: "C22345678",  loyalty: "Gold",     vip: true,  totalStays: 8,  totalSpend: 1680000 },
  { id: "G006", name: "Ms. Sophie Laurent",  email: "s.laurent@bnpgroup.fr",     phone: "+33 6 12 34 56 78", nationality: "French",   idNumber: "FR456789",   loyalty: "Silver",   vip: false, totalStays: 3,  totalSpend: 650000  },
];

const BOOKINGS = [
  { id: "BK-2026-001", guestId: "G001", roomId: "S310",  checkIn: "2026-07-01", checkOut: "2026-07-04", status: "Confirmed"  as BookingStatus, nights: 3, rate: 185000, addOns: [{ name: "Airport Transfer", amount: 15000 }, { name: "Breakfast Package", amount: 12000 }], total: 582000 },
  { id: "BK-2026-002", guestId: "G003", roomId: "PS501", checkIn: "2026-06-28", checkOut: "2026-07-02", status: "Checked In" as BookingStatus, nights: 4, rate: 350000, addOns: [{ name: "Spa Package", amount: 45000 }],                                                      total: 1445000 },
  { id: "BK-2026-003", guestId: "G002", roomId: "R204",  checkIn: "2026-07-03", checkOut: "2026-07-05", status: "Pending"    as BookingStatus, nights: 2, rate: 75000,  addOns: [],                                                                                           total: 150000  },
  { id: "BK-2026-004", guestId: "G005", roomId: "S311",  checkIn: "2026-06-30", checkOut: "2026-07-03", status: "Checked In" as BookingStatus, nights: 3, rate: 185000, addOns: [{ name: "City Tour", amount: 25000 }],                                                        total: 580000  },
  { id: "BK-2026-005", guestId: "G004", roomId: "R301",  checkIn: "2026-07-05", checkOut: "2026-07-07", status: "Confirmed"  as BookingStatus, nights: 2, rate: 95000,  addOns: [],                                                                                           total: 190000  },
];

const STAFF = [
  { name: "Kunle Adebayo",       role: "Front Desk Agent",       shift: "Morning",   dept: "Front Office"  },
  { name: "Grace Eze",           role: "Concierge",              shift: "Morning",   dept: "Front Office"  },
  { name: "Tunde Williams",      role: "Housekeeping Supervisor", shift: "Morning",   dept: "Housekeeping"  },
  { name: "Fatima Aliyu",        role: "Room Attendant",         shift: "Afternoon", dept: "Housekeeping"  },
  { name: "David Okonkwo",       role: "Chef de Partie",         shift: "Morning",   dept: "F&B"           },
  { name: "Amina Hassan",        role: "Night Auditor",          shift: "Night",     dept: "Finance"       },
  { name: "Seun Adesanya",       role: "Security Officer",       shift: "Afternoon", dept: "Security"      },
  { name: "Bimbo Adeyinka",      role: "Spa Therapist",          shift: "Afternoon", dept: "Wellness"      },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function padDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getRoomCalendarStatus(roomId: string, dateStr: string): RoomStatus {
  const booking = BOOKINGS.find(b => b.roomId === roomId && dateStr >= b.checkIn && dateStr < b.checkOut);
  if (booking) {
    if (booking.status === "Checked In") return "Occupied";
    return "Reserved";
  }
  if (roomId === "R102" && dateStr >= "2026-06-28" && dateStr <= "2026-06-30") return "Maintenance";
  if (roomId === "R401" && dateStr === "2026-07-02") return "Cleaning";
  return "Available";
}

// ─── Shared: StatusBadge ───────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, [string, string]> = {
    Available:   ["#E8F5E9", C.green],
    Confirmed:   ["#E8F5E9", C.green],
    Completed:   ["#E8F5E9", C.green],
    Resolved:    ["#E8F5E9", C.green],
    Pending:     ["#FFF8E1", C.amber],
    "In Progress":["#FFF8E1", C.amber],
    Cleaning:    ["#FFF8E1", C.amber],
    Cancelled:   ["#FFEBEE", C.red],
    Maintenance: ["#FFEBEE", C.red],
    Blocked:     ["#FFEBEE", C.red],
    Reserved:    ["#F5EFE3", "#8B6914"],
    "Checked In":["#FFF9C4", C.gold],
    Occupied:    ["#FFF9C4", C.gold],
    "Checked Out":["#F3F4F6", C.gray],
    Archived:    ["#F3F4F6", C.gray],
  };
  const [bg, text] = map[status] ?? ["#F3F4F6", C.gray];
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap" style={{ backgroundColor: bg, color: text }}>
      {status}
    </span>
  );
}

// ─── Shared: LoyaltyBadge ─────────────────────────────────────────────────────
function LoyaltyBadge({ tier }: { tier: string }) {
  const map: Record<string, [string, string]> = {
    Bronze:   ["#CD7F32", "#fff"],
    Silver:   ["#A8A9AD", "#fff"],
    Gold:     [C.gold,    "#fff"],
    Platinum: ["#3D3D3D", "#E5E4E2"],
  };
  const [bg, text] = map[tier] ?? [C.gray, "#fff"];
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: bg, color: text }}>
      {tier}
    </span>
  );
}

// ─── Shared: KPICard ──────────────────────────────────────────────────────────
function KPICard({ label, value, unit, trend, trendLabel, sub, valueColor, onClick }: {
  label: string; value: string | number; unit?: string;
  trend?: "up" | "down" | "neutral"; trendLabel?: string;
  sub?: string; valueColor?: string; onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left p-5 rounded-lg w-full transition-shadow"
      style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)"; }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: C.gray }}>{label}</p>
          <div className="flex items-end gap-1.5">
            <span className="text-3xl font-bold leading-none" style={{ color: valueColor ?? C.charcoal }}>{value}</span>
            {unit && <span className="text-sm mb-0.5" style={{ color: C.gray }}>{unit}</span>}
          </div>
          {sub && <p className="text-xs mt-1.5" style={{ color: C.gray }}>{sub}</p>}
        </div>
        {trend && trendLabel && (
          <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md flex-shrink-0" style={{
            backgroundColor: trend === "up" ? "#E8F5E9" : trend === "down" ? "#FFEBEE" : "#F3F4F6",
            color: trend === "up" ? C.green : trend === "down" ? C.red : C.gray,
          }}>
            {trend === "up" ? <TrendingUp size={11} /> : trend === "down" ? <TrendingDown size={11} /> : null}
            <span>{trendLabel}</span>
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Shared: Sidebar ──────────────────────────────────────────────────────────
const NAV: { id: Screen; label: string; icon: typeof Home; roles: Role[] }[] = [
  { id: "gm-dashboard",          label: "Dashboard",   icon: LayoutDashboard, roles: ["gm","front-desk","housekeeping","finance"] },
  { id: "reservation-calendar",  label: "Reservations", icon: Calendar,        roles: ["gm","front-desk"] },
  { id: "new-booking",           label: "New Booking",  icon: Plus,            roles: ["gm","front-desk"] },
  { id: "guest-profile",         label: "Guests",       icon: Users,           roles: ["gm","front-desk","housekeeping"] },
  { id: "booking-detail",        label: "Booking Detail", icon: FileText,      roles: ["gm","front-desk"] },
];

function Sidebar({ screen, setScreen, role, collapsed, setCollapsed }: {
  screen: Screen; setScreen: (s: Screen) => void;
  role: Role; collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  const visible = NAV.filter(n => n.roles.includes(role));
  return (
    <div className="flex flex-col flex-shrink-0 h-full transition-all duration-300" style={{ width: collapsed ? 64 : 240, backgroundColor: C.brown }}>
      {/* Logo */}
      <div className="flex items-center px-4 flex-shrink-0" style={{ height: 64, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ backgroundColor: C.gold }}>A</div>
        {!collapsed && <span className="ml-2.5 font-semibold text-white text-sm tracking-wide truncate">Aryhills HMS</span>}
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} className="ml-auto text-white/40 hover:text-white/80 transition-colors flex-shrink-0">
            <ChevronLeft size={15} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {visible.map(item => {
          const active = screen === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              title={collapsed ? item.label : undefined}
              className="w-full flex items-center gap-3 rounded-lg transition-colors"
              style={{
                padding: collapsed ? "10px 0" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
                backgroundColor: active ? C.gold : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.65)",
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.07)"; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Expand handle when collapsed */}
      {collapsed && (
        <div className="pb-4 flex justify-center">
          <button onClick={() => setCollapsed(false)} className="text-white/40 hover:text-white/80 transition-colors p-2">
            <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* Bottom nav items */}
      {!collapsed && (
        <div className="px-2 pb-4 space-y-0.5">
          {[{ id: "housekeeping", label: "Housekeeping", icon: Bed }, { id: "finance", label: "Finance", icon: Wallet }, { id: "settings", label: "Settings", icon: Settings }]
            .filter(n => n.id !== "housekeeping" || role !== "finance")
            .map(item => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ color: "rgba(255,255,255,0.4)", cursor: "default" }}>
                  <Icon size={17} className="flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

// ─── Shared: TopHeader ────────────────────────────────────────────────────────
const ROLE_LABELS: Record<Role, string> = {
  gm:           "General Manager",
  "front-desk": "Front Desk",
  housekeeping: "Housekeeping",
  finance:      "Finance",
};
const ROLE_NAMES: Record<Role, string> = {
  gm:           "Oluwaseun Adewale",
  "front-desk": "Kunle Adebayo",
  housekeeping: "Tunde Williams",
  finance:      "Amina Hassan",
};
const ROLE_INITIALS: Record<Role, string> = { gm: "OA", "front-desk": "KA", housekeeping: "TW", finance: "AH" };

function TopHeader({ role, setIsLoggedIn }: { role: Role; setIsLoggedIn: (v: boolean) => void }) {
  return (
    <div className="flex items-center px-6 gap-4 flex-shrink-0" style={{ height: 64, backgroundColor: C.brown, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="hidden md:flex items-center gap-2">
        <span className="font-bold text-white text-lg tracking-tight">Aryhills Hotel &amp; Tower</span>
        <span className="text-white/35 text-xs font-normal">· Imo, Ilesa, Osun State</span>
      </div>

      <div className="flex-1 max-w-sm mx-auto">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
          <input placeholder="Search guests, rooms, bookings…" className="w-full text-sm rounded-lg border-0 outline-none pl-9 pr-4 py-1.5" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff" }} />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="relative text-white/60 hover:text-white transition-colors">
          <Bell size={19} />
          <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-bold" style={{ backgroundColor: C.red }}>3</span>
        </button>
        <div className="flex items-center gap-2.5 pl-3" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: C.gold }}>
            {ROLE_INITIALS[role]}
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-white text-xs font-medium leading-tight">{ROLE_NAMES[role]}</p>
            <p className="text-white/45 text-[11px] leading-tight">{ROLE_LABELS[role]}</p>
          </div>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="text-white/45 hover:text-white transition-colors ml-1" title="Sign out">
          <LogOut size={17} />
        </button>
      </div>
    </div>
  );
}

// ─── Shared: PageHeader ───────────────────────────────────────────────────────
function PageHeader({ title, crumbs, action }: { title: string; crumbs?: string[]; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 flex-shrink-0" style={{ height: 80, backgroundColor: C.ivory, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
      <div>
        {crumbs && (
          <div className="flex items-center gap-1 text-xs mb-0.5" style={{ color: C.gray }}>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={10} />}
                <span>{c}</span>
              </span>
            ))}
          </div>
        )}
        <h1 className="text-xl font-semibold" style={{ color: C.charcoal }}>{title}</h1>
      </div>
      {action}
    </div>
  );
}

// ─── Shared: GoldButton ───────────────────────────────────────────────────────
function GoldButton({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90 ${className}`}
      style={{ backgroundColor: C.gold }}
    >
      {children}
    </button>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN B1-01: Login Page
// ══════════════════════════════════════════════════════════════════════════════
function LoginPage({ onLogin }: { onLogin: (r: Role) => void }) {
  const [selectedRole, setSelectedRole] = useState<Role>("gm");
  const [email, setEmail]       = useState("oluwaseun.adewale@aryhills.ng");
  const [password, setPassword] = useState("••••••••••");
  const [focused, setFocused]   = useState<string | null>(null);

  const roles: { value: Role; label: string; desc: string }[] = [
    { value: "gm",           label: "General Manager", desc: "Full system access"         },
    { value: "front-desk",   label: "Front Desk",       desc: "Reservations & guests"     },
    { value: "housekeeping", label: "Housekeeping",     desc: "Room management"            },
    { value: "finance",      label: "Finance",          desc: "Revenue & invoicing"        },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: C.ivory, fontFamily: "'Inter', sans-serif" }}>
      {/* Left panel */}
      <div className="hidden lg:flex w-[52%] relative flex-col justify-between p-12 overflow-hidden" style={{ backgroundColor: C.brown }}>
        {/* Diagonal pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(135deg, transparent 0px, transparent 48px, rgba(184,134,11,0.07) 48px, rgba(184,134,11,0.07) 50px)`,
        }} />
        {/* Top logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white" style={{ backgroundColor: C.gold }}>A</div>
          <span className="text-white font-semibold tracking-wide text-base">Aryhills Hotel &amp; Tower</span>
        </div>
        {/* Centre display */}
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.2em] font-medium mb-4" style={{ color: "rgba(184,134,11,0.8)" }}>Aryhills Hotel & Tower</p>
          <h1 className="font-bold text-white leading-tight mb-6" style={{ fontSize: 40 }}>Premium Hotel<br />Management System</h1>
          <div className="space-y-3 mb-10">
            {["360° operational control across all departments", "Real-time room status, reservations & guest profiles", "Integrated billing, housekeeping, and analytics"].map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: C.gold }} />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{t}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-6">
            {[["60", "Rooms"], ["98.2%", "Uptime SLA"], ["5★", "Rating"]].map(([n, l]) => (
              <div key={l}>
                <p className="font-bold text-xl text-white">{n}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom strip */}
        <p className="relative z-10 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>© 2026 Aryhills Hotel & Tower · Kajola Street, Imo, Ilesa, Osun State</p>
      </div>

      {/* Right panel: form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white" style={{ backgroundColor: C.gold }}>A</div>
            <span className="font-semibold tracking-wide text-base" style={{ color: C.charcoal }}>Aryhills Hotel &amp; Tower</span>
          </div>

          <h2 className="text-2xl font-semibold mb-1" style={{ color: C.charcoal }}>Welcome back</h2>
          <p className="text-sm mb-7" style={{ color: C.gray }}>Sign in to the Hotel Management System</p>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wider mb-2.5" style={{ color: C.gray }}>Select Your Role</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(r => (
                <button
                  key={r.value}
                  onClick={() => setSelectedRole(r.value)}
                  className="text-left px-4 py-3 rounded-lg border-2 transition-all"
                  style={{
                    backgroundColor: selectedRole === r.value ? "#FFF9C4" : C.white,
                    borderColor:     selectedRole === r.value ? C.gold    : "rgba(0,0,0,0.09)",
                  }}
                >
                  <p className="text-sm font-semibold" style={{ color: selectedRole === r.value ? C.gold : C.charcoal }}>{r.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: C.gray }}>{r.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5" style={{ color: C.charcoal }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors"
              style={{ backgroundColor: C.white, borderColor: focused === "email" ? C.gold : "rgba(0,0,0,0.12)", color: C.charcoal }}
            />
          </div>

          {/* Password */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium" style={{ color: C.charcoal }}>Password</label>
              <button className="text-xs font-medium" style={{ color: C.gold }}>Forgot password?</button>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors"
              style={{ backgroundColor: C.white, borderColor: focused === "password" ? C.gold : "rgba(0,0,0,0.12)", color: C.charcoal }}
            />
          </div>

          <button
            onClick={() => onLogin(selectedRole)}
            className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: C.gold }}
          >
            Sign In to Dashboard
          </button>

          <p className="text-center text-xs mt-6" style={{ color: "rgba(0,0,0,0.3)" }}>
            Aryhills HMS v3.2 · Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN B1-02: GM Master Dashboard
// ══════════════════════════════════════════════════════════════════════════════
function GMDashboard({ setScreen, setSelectedBookingId, setSelectedGuestId }: {
  setScreen: (s: Screen) => void;
  setSelectedBookingId: (id: string) => void;
  setSelectedGuestId: (id: string) => void;
}) {
  const today = "2026-06-28";
  const miniGrid = ROOMS.map(r => ({ ...r, status: getRoomCalendarStatus(r.id, today) }));

  const statusColors: Record<RoomStatus, string> = {
    Available:   C.green,
    Occupied:    C.gold,
    Reserved:    "#8B6914",
    Maintenance: C.red,
    Cleaning:    C.amber,
  };
  const statusBg: Record<RoomStatus, string> = {
    Available:   "#E8F5E9",
    Occupied:    "#FFF9C4",
    Reserved:    "#F5EFE3",
    Maintenance: "#FFEBEE",
    Cleaning:    "#FFF8E1",
  };

  const arrivals = BOOKINGS.filter(b => b.checkIn === "2026-07-01" && b.status === "Confirmed");
  const departures = BOOKINGS.filter(b => b.checkOut === "2026-07-02");
  const vipInHouse = BOOKINGS.filter(b => b.status === "Checked In" && GUESTS.find(g => g.id === b.guestId)?.vip);

  const occupiedCount = miniGrid.filter(r => r.status === "Occupied").length;
  const occupancy     = Math.round((occupiedCount / ROOMS.length) * 100);

  return (
    <div>
      <PageHeader
        title="GM Dashboard"
        crumbs={["Home", "Dashboard"]}
        action={<GoldButton onClick={() => setScreen("new-booking")}><Plus size={14} />New Booking</GoldButton>}
      />

      <div className="p-6 space-y-5">
        {/* KPI row 1 */}
        <div className="grid grid-cols-4 gap-4">
          <KPICard label="Occupancy Rate"     value={occupancy}       unit="%" trend="up"      trendLabel="+4%"     sub="vs. last week"              valueColor={C.gold}  onClick={() => setScreen("reservation-calendar")} />
          <KPICard label="Arrivals Today"     value={arrivals.length}      trend="neutral" trendLabel="on track" sub="Expected 3 PM check-in"                   onClick={() => setScreen("reservation-calendar")} />
          <KPICard label="Departures Today"   value={departures.length}    trend="up"      trendLabel="clear"    sub="Last departure 11 AM"                    onClick={() => setScreen("reservation-calendar")} />
          <KPICard label="VIP Guests In-House" value={vipInHouse.length}   trend="neutral" trendLabel="Suite 310, PS501" sub="Mr. Okafor · Mr. Carter" valueColor={C.gold} onClick={() => setScreen("guest-profile")} />
        </div>

        {/* KPI row 2 */}
        <div className="grid grid-cols-3 gap-4">
          <KPICard label="Revenue Today"    value="₦2.1M" trend="up"   trendLabel="+12%" sub="vs. yesterday"     />
          <KPICard label="Pending Payments" value={3}     trend="down"  trendLabel="₦820K" sub="Requires follow-up" valueColor={C.amber} />
          <KPICard label="Avg. Daily Rate"  value="₦142K" trend="up"   trendLabel="+3%"  sub="This month"        />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-3 gap-5">
          {/* Room status grid */}
          <div className="col-span-2 rounded-lg p-5" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm" style={{ color: C.charcoal }}>Room Status Overview</h2>
              <button onClick={() => setScreen("reservation-calendar")} className="text-xs font-medium" style={{ color: C.gold }}>View Calendar →</button>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              {(["Available","Occupied","Reserved","Maintenance","Cleaning"] as RoomStatus[]).map(s => (
                <div key={s} className="flex items-center gap-1.5 text-xs" style={{ color: C.gray }}>
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: statusColors[s] }} />
                  {s} ({miniGrid.filter(r => r.status === s).length})
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {miniGrid.map(room => (
                <button
                  key={room.id}
                  onClick={() => setScreen("reservation-calendar")}
                  className="rounded-lg py-2.5 px-1 text-center transition-transform hover:scale-105"
                  style={{ backgroundColor: statusBg[room.status], border: `1px solid ${statusColors[room.status]}33` }}
                  title={`${room.name} — ${room.status}`}
                >
                  <p className="text-xs font-semibold" style={{ color: statusColors[room.status] }}>{room.id}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>{room.type.slice(0, 3)}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Staff on shift */}
          <div className="rounded-lg p-5 overflow-auto" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm" style={{ color: C.charcoal }}>Staff On Shift</h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#E8F5E9", color: C.green }}>8 active</span>
            </div>
            {(["Morning","Afternoon","Night"] as const).map(shift => {
              const crew = STAFF.filter(s => s.shift === shift);
              if (!crew.length) return null;
              return (
                <div key={shift} className="mb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: C.gray }}>{shift}</p>
                  <div className="space-y-1.5">
                    {crew.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-lg" style={{ backgroundColor: C.ivory }}>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ backgroundColor: C.brown }}>
                          {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium truncate" style={{ color: C.charcoal }}>{s.name}</p>
                          <p className="text-[10px]" style={{ color: C.gray }}>{s.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent bookings table */}
        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <h2 className="font-semibold text-sm" style={{ color: C.charcoal }}>Recent Bookings</h2>
            <button onClick={() => setScreen("reservation-calendar")} className="text-xs font-medium" style={{ color: C.gold }}>View all →</button>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: C.ivory }}>
                {["Booking ID","Guest","Room","Check-In","Check-Out","Amount","Status",""].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-wider" style={{ color: C.gray }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map((b, i) => {
                const guest = GUESTS.find(g => g.id === b.guestId);
                const room  = ROOMS.find(r => r.id === b.roomId);
                return (
                  <tr key={b.id} className="border-t" style={{ borderColor: "rgba(0,0,0,0.05)", backgroundColor: i % 2 === 1 ? C.ivory : C.white }}>
                    <td className="px-4 py-3 text-xs font-semibold" style={{ color: C.gold }}>{b.id}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: C.charcoal }}>
                      <div className="flex items-center gap-2">
                        {guest?.vip && <Star size={11} fill={C.gold} style={{ color: C.gold }} />}
                        {guest?.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: C.charcoal }}>{room?.name}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: C.gray }}>{b.checkIn}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: C.gray }}>{b.checkOut}</td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: C.charcoal }}>{fmt(b.total)}</td>
                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => { setSelectedBookingId(b.id); setScreen("booking-detail"); }}
                        className="text-xs font-medium hover:underline"
                        style={{ color: C.gold }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN B1-03: Reservation Calendar
// ══════════════════════════════════════════════════════════════════════════════
function ReservationCalendar({ setScreen, setSelectedBookingId }: {
  setScreen: (s: Screen) => void;
  setSelectedBookingId: (id: string) => void;
}) {
  const [filterType, setFilterType] = useState("All");
  const [weekOffset, setWeekOffset] = useState(0);

  const roomTypes = ["All", "Standard", "Deluxe", "Superior", "Suite", "Penthouse"];
  const filteredRooms = filterType === "All" ? ROOMS : ROOMS.filter(r => r.type === filterType);

  const dates = Array.from({ length: 14 }, (_, i) => {
    const base = new Date(2026, 5, 28);
    base.setDate(base.getDate() + i + weekOffset * 7);
    return padDate(base);
  });

  const statusStyle: Record<RoomStatus, [string, string]> = {
    Available:   ["#E8F5E9", C.green],
    Occupied:    ["#FFF9C4", C.gold],
    Reserved:    ["#F5EFE3", "#8B6914"],
    Maintenance: ["#FFEBEE", C.red],
    Cleaning:    ["#FFF8E1", C.amber],
  };

  const rangeLabel = `${new Date(dates[0]).toLocaleDateString("en-GB",{month:"short",day:"numeric"})} – ${new Date(dates[13]).toLocaleDateString("en-GB",{month:"short",day:"numeric",year:"numeric"})}`;

  return (
    <div>
      <PageHeader
        title="Reservation Calendar"
        crumbs={["Home", "Reservations", "Calendar"]}
        action={<GoldButton onClick={() => setScreen("new-booking")}><Plus size={14} />New Booking</GoldButton>}
      />

      <div className="p-6">
        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={13} style={{ color: C.gray }} />
            <span className="text-xs font-medium" style={{ color: C.gray }}>Room Type:</span>
            {roomTypes.map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-colors"
                style={{
                  backgroundColor: filterType === t ? C.gold : "transparent",
                  borderColor:     filterType === t ? C.gold : "rgba(0,0,0,0.12)",
                  color:           filterType === t ? "#fff" : C.gray,
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setWeekOffset(w => w - 1)} className="p-1.5 rounded-lg hover:bg-white transition-colors" style={{ color: C.gray }}>
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-medium px-2 whitespace-nowrap" style={{ color: C.charcoal }}>{rangeLabel}</span>
            <button onClick={() => setWeekOffset(w => w + 1)} className="p-1.5 rounded-lg hover:bg-white transition-colors" style={{ color: C.gray }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-3 flex-wrap">
          {(Object.entries(statusStyle) as [RoomStatus, [string,string]][]).map(([s, [bg, text]]) => (
            <div key={s} className="flex items-center gap-1.5 text-xs" style={{ color: C.gray }}>
              <div className="w-2.5 h-2.5 rounded-sm border" style={{ backgroundColor: bg, borderColor: text + "55" }} />
              {s}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: 860 }}>
              <thead>
                <tr style={{ backgroundColor: C.brown }}>
                  <th className="text-left px-4 py-3 text-xs font-medium text-white sticky left-0 z-10" style={{ backgroundColor: C.brown, minWidth: 148 }}>Room</th>
                  {dates.map(d => {
                    const dt     = new Date(d + "T00:00:00");
                    const isToday = d === "2026-06-28";
                    return (
                      <th key={d} className="text-center py-2 text-xs font-medium" style={{ color: isToday ? C.gold : "rgba(255,255,255,0.7)", minWidth: 52 }}>
                        <div className="text-[10px]">{dt.toLocaleDateString("en-GB",{weekday:"short"})}</div>
                        <div className={`text-sm ${isToday ? "font-bold" : ""}`}>{dt.getDate()}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room, ri) => (
                  <tr key={room.id} className="border-t" style={{ borderColor: "rgba(0,0,0,0.05)", backgroundColor: ri % 2 === 1 ? C.ivory : C.white }}>
                    <td className="px-4 py-2 border-r sticky left-0 z-10" style={{ borderColor: "rgba(0,0,0,0.07)", backgroundColor: ri % 2 === 1 ? C.ivory : C.white }}>
                      <p className="text-xs font-semibold" style={{ color: C.charcoal }}>{room.name}</p>
                      <p className="text-[10px]" style={{ color: C.gray }}>{room.type} · {fmt(room.rate)}/n</p>
                    </td>
                    {dates.map(d => {
                      const status  = getRoomCalendarStatus(room.id, d);
                      const [bg, tc] = statusStyle[status];
                      const booking  = BOOKINGS.find(b => b.roomId === room.id && d >= b.checkIn && d < b.checkOut);
                      const label    = status === "Available" ? "✓" : status === "Occupied" ? "●" : status === "Reserved" ? "R" : status === "Maintenance" ? "M" : "C";
                      return (
                        <td key={d} className="text-center py-1.5 px-0.5 border-r" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
                          <button
                            onClick={() => {
                              if (booking) { setSelectedBookingId(booking.id); setScreen("booking-detail"); }
                              else if (status === "Available") setScreen("new-booking");
                            }}
                            className="w-11 h-7 rounded text-[11px] font-semibold transition-transform hover:scale-110"
                            style={{ backgroundColor: bg, color: tc, border: `1px solid ${tc}25` }}
                            title={booking ? GUESTS.find(g => g.id === booking.guestId)?.name : status}
                          >
                            {label}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {filteredRooms.length === 0 && (
                  <tr>
                    <td colSpan={15} className="text-center py-12 text-sm" style={{ color: C.gray }}>
                      No rooms match the selected filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN B1-04: New Booking Flow (3-step wizard)
// ══════════════════════════════════════════════════════════════════════════════
function NewBookingFlow({ setScreen, setSelectedBookingId }: {
  setScreen: (s: Screen) => void;
  setSelectedBookingId: (id: string) => void;
}) {
  const [step, setStep]               = useState(1);
  const [checkIn, setCheckIn]         = useState("2026-07-08");
  const [checkOut, setCheckOut]       = useState("2026-07-11");
  const [roomType, setRoomType]       = useState("Deluxe");
  const [selectedRoom, setSelectedRoom] = useState("R201");
  const [guestMode, setGuestMode]     = useState<"search"|"new">("search");
  const [selectedGuestId, setSelectedGuestId] = useState("G001");
  const [addOns, setAddOns]           = useState<string[]>([]);
  const [newName, setNewName]         = useState("");
  const [newEmail, setNewEmail]       = useState("");
  const [newPhone, setNewPhone]       = useState("");
  const [newNat, setNewNat]           = useState("Nigerian");
  const [newId, setNewId]             = useState("");

  const nightsRaw = Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000);
  const nights    = Math.max(1, nightsRaw);
  const room      = ROOMS.find(r => r.id === selectedRoom);
  const guest     = GUESTS.find(g => g.id === selectedGuestId);

  const ADD_ON_OPTIONS = [
    { id: "airport",   name: "Airport Transfer",   price: 15000 },
    { id: "breakfast", name: "Breakfast Package",  price: 12000 },
    { id: "spa",       name: "Spa Package",         price: 45000 },
    { id: "tour",      name: "City Tour",           price: 25000 },
    { id: "late",      name: "Late Checkout (2 PM)", price: 8000 },
  ];

  const addOnTotal  = addOns.reduce((s, id) => s + (ADD_ON_OPTIONS.find(a => a.id === id)?.price ?? 0), 0);
  const roomTotal   = (room?.rate ?? 0) * nights;
  const grandTotal  = roomTotal + addOnTotal;
  const vat         = Math.round(grandTotal * 0.075);

  const availableRooms = ROOMS.filter(r => r.type === roomType);
  const steps = ["Dates & Room", "Guest Details", "Confirmation"];

  return (
    <div>
      <PageHeader title="New Booking" crumbs={["Home", "Reservations", "New Booking"]} />

      <div className="p-6 max-w-4xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-start justify-center gap-0 mb-8">
          {steps.map((label, i) => {
            const n      = i + 1;
            const done   = step > n;
            const active = step === n;
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      backgroundColor: done ? C.green : active ? C.gold : "rgba(0,0,0,0.1)",
                      color:           done || active ? "#fff" : C.gray,
                    }}
                  >
                    {done ? <Check size={13} /> : n}
                  </div>
                  <span className="text-xs mt-1.5 font-medium whitespace-nowrap" style={{ color: active ? C.gold : done ? C.green : C.gray }}>{label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-28 h-0.5 mb-5 mx-2" style={{ backgroundColor: done ? C.green : "rgba(0,0,0,0.1)" }} />
                )}
              </div>
            );
          })}
        </div>

        <div className="rounded-xl p-8" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>

          {/* ── Step 1 ── */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-semibold text-base" style={{ color: C.charcoal }}>Select Dates &amp; Room Type</h2>
              <div className="grid grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.gray }}>Check-In</label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                    style={{ backgroundColor: C.ivory, borderColor: "rgba(0,0,0,0.12)", color: C.charcoal }} />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.gray }}>Check-Out</label>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                    style={{ backgroundColor: C.ivory, borderColor: "rgba(0,0,0,0.12)", color: C.charcoal }} />
                </div>
                <div className="rounded-lg px-4 py-2.5 text-center" style={{ backgroundColor: "#FFF9C4" }}>
                  <p className="text-xs" style={{ color: C.gray }}>Duration</p>
                  <p className="font-bold text-lg" style={{ color: C.gold }}>{nights} night{nights !== 1 ? "s" : ""}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider mb-2.5" style={{ color: C.gray }}>Room Type</label>
                <div className="flex flex-wrap gap-2">
                  {["Standard","Deluxe","Superior","Suite","Penthouse"].map(t => (
                    <button key={t} onClick={() => { setRoomType(t); setSelectedRoom(ROOMS.find(r => r.type === t)?.id ?? ""); }}
                      className="px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                      style={{ backgroundColor: roomType === t ? C.gold : "transparent", color: roomType === t ? "#fff" : C.charcoal, borderColor: roomType === t ? C.gold : "rgba(0,0,0,0.1)" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider mb-2.5" style={{ color: C.gray }}>Available Rooms</label>
                <div className="grid grid-cols-2 gap-3">
                  {availableRooms.map(r => {
                    const avail = getRoomCalendarStatus(r.id, checkIn) === "Available";
                    return (
                      <button key={r.id} disabled={!avail}
                        onClick={() => setSelectedRoom(r.id)}
                        className="text-left p-4 rounded-lg border-2 transition-all"
                        style={{
                          borderColor:     selectedRoom === r.id ? C.gold : "rgba(0,0,0,0.08)",
                          backgroundColor: !avail ? "#F9F9F9" : selectedRoom === r.id ? "#FFF9C4" : C.ivory,
                          opacity:         !avail ? 0.55 : 1,
                        }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm" style={{ color: C.charcoal }}>{r.name}</span>
                          <StatusBadge status={avail ? "Available" : "Reserved"} />
                        </div>
                        <p className="text-xs mb-1" style={{ color: C.gray }}>Floor {r.floor}</p>
                        <p className="text-sm font-semibold" style={{ color: C.gold }}>{fmt(r.rate)}/night · {fmt(r.rate * nights)} total</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-semibold text-base" style={{ color: C.charcoal }}>Guest Details</h2>
              <div className="flex gap-2">
                {(["search","new"] as const).map(m => (
                  <button key={m} onClick={() => setGuestMode(m)}
                    className="px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                    style={{ backgroundColor: guestMode === m ? C.gold : "transparent", color: guestMode === m ? "#fff" : C.charcoal, borderColor: guestMode === m ? C.gold : "rgba(0,0,0,0.1)" }}>
                    {m === "search" ? "Search Existing Guest" : "Create New Guest"}
                  </button>
                ))}
              </div>

              {guestMode === "search" ? (
                <div>
                  <div className="relative mb-3">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.gray }} />
                    <input placeholder="Name, email, or phone…" className="w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm outline-none"
                      style={{ backgroundColor: C.ivory, borderColor: "rgba(0,0,0,0.12)" }} />
                  </div>
                  <div className="space-y-2">
                    {GUESTS.map(g => (
                      <button key={g.id} onClick={() => setSelectedGuestId(g.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-left transition-all"
                        style={{ borderColor: selectedGuestId === g.id ? C.gold : "rgba(0,0,0,0.07)", backgroundColor: selectedGuestId === g.id ? "#FFF9C4" : C.ivory }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: C.brown }}>
                          {g.name.split(" ").at(-1)?.[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="font-medium text-sm" style={{ color: C.charcoal }}>{g.name}</span>
                            <LoyaltyBadge tier={g.loyalty} />
                            {g.vip && <span className="text-[11px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: "#FFF9C4", color: C.gold }}>VIP</span>}
                          </div>
                          <p className="text-xs" style={{ color: C.gray }}>{g.email} · {g.phone}</p>
                        </div>
                        <span className="text-xs flex-shrink-0" style={{ color: C.gray }}>{g.totalStays} stays</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {([["Full Name","text",newName,setNewName,"Mr. Olumide Fashola"], ["Email","email",newEmail,setNewEmail,"o.fashola@email.com"], ["Phone","tel",newPhone,setNewPhone,"+234 801 000 0000"], ["Nationality","text",newNat,setNewNat,"Nigerian"], ["ID Number","text",newId,setNewId,"A12345678"]] as [string,string,string,(v:string)=>void,string][]).map(([lbl,type,val,setter,ph]) => (
                    <div key={lbl}>
                      <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: C.gray }}>{lbl}</label>
                      <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={ph}
                        className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ backgroundColor: C.ivory, borderColor: "rgba(0,0,0,0.12)", color: C.charcoal }} />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider mb-2.5" style={{ color: C.gray }}>Add-On Services (Optional)</label>
                <div className="grid grid-cols-2 gap-2">
                  {ADD_ON_OPTIONS.map(a => (
                    <button key={a.id}
                      onClick={() => setAddOns(prev => prev.includes(a.id) ? prev.filter(x => x !== a.id) : [...prev, a.id])}
                      className="flex items-center justify-between px-4 py-3 rounded-lg border-2 text-left transition-all"
                      style={{ borderColor: addOns.includes(a.id) ? C.gold : "rgba(0,0,0,0.08)", backgroundColor: addOns.includes(a.id) ? "#FFF9C4" : C.ivory }}>
                      <span className="text-sm" style={{ color: C.charcoal }}>{a.name}</span>
                      <span className="text-sm font-semibold" style={{ color: C.gold }}>{fmt(a.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-semibold text-base" style={{ color: C.charcoal }}>Confirm Booking</h2>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div className="rounded-lg p-4" style={{ backgroundColor: C.ivory }}>
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: C.gray }}>Guest</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0" style={{ backgroundColor: C.brown }}>
                        {(guestMode === "search" ? guest?.name : newName || "?").split(" ").at(-1)?.[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: C.charcoal }}>{guestMode === "search" ? guest?.name : (newName || "New Guest")}</p>
                        <p className="text-xs" style={{ color: C.gray }}>{guestMode === "search" ? guest?.email : newEmail}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg p-4" style={{ backgroundColor: C.ivory }}>
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: C.gray }}>Room</p>
                    <p className="font-semibold text-sm" style={{ color: C.charcoal }}>{room?.name}</p>
                    <p className="text-xs mb-2" style={{ color: C.gray }}>{room?.type} · Floor {room?.floor}</p>
                    <div className="flex gap-6 text-xs" style={{ color: C.gray }}>
                      <span>In: <strong style={{ color: C.charcoal }}>{checkIn}</strong></span>
                      <span>Out: <strong style={{ color: C.charcoal }}>{checkOut}</strong></span>
                      <span><strong style={{ color: C.charcoal }}>{nights}n</strong></span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-4" style={{ backgroundColor: C.ivory }}>
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: C.gray }}>Rate Breakdown</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: C.charcoal }}>{room?.name} × {nights}n</span>
                      <span style={{ color: C.charcoal }}>{fmt(roomTotal)}</span>
                    </div>
                    {addOns.map(id => {
                      const a = ADD_ON_OPTIONS.find(o => o.id === id);
                      return a ? (
                        <div key={id} className="flex justify-between text-sm">
                          <span style={{ color: C.gray }}>{a.name}</span>
                          <span style={{ color: C.gray }}>{fmt(a.price)}</span>
                        </div>
                      ) : null;
                    })}
                    <div className="border-t pt-2 mt-1 flex justify-between text-sm" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
                      <span style={{ color: C.gray }}>Subtotal</span>
                      <span style={{ color: C.charcoal }}>{fmt(grandTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: C.gray }}>VAT (7.5%)</span>
                      <span style={{ color: C.gray }}>{fmt(vat)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-1">
                      <span style={{ color: C.charcoal }}>Total incl. VAT</span>
                      <span style={{ color: C.gold, fontSize: "1.05rem" }}>{fmt(grandTotal + vat)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "#E8F5E9", border: `1px solid ${C.green}40` }}>
                <CheckCircle size={18} style={{ color: C.green, flexShrink: 0 }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: C.green }}>Ready to confirm</p>
                  <p className="text-xs" style={{ color: C.gray }}>Confirmation will be sent to {guestMode === "search" ? guest?.email : newEmail || "guest email"}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard nav */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => step > 1 ? setStep(s => s - 1) : setScreen("reservation-calendar")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border"
            style={{ borderColor: "rgba(0,0,0,0.14)", color: C.charcoal, backgroundColor: C.white }}>
            <ArrowLeft size={14} />
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <GoldButton onClick={() => {
            if (step < 3) { setStep(s => s + 1); }
            else { setSelectedBookingId("BK-2026-001"); setScreen("booking-detail"); }
          }}>
            {step === 3 ? "Confirm Booking" : "Continue"}
            <ArrowRight size={14} />
          </GoldButton>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN B1-05: Booking Detail View
// ══════════════════════════════════════════════════════════════════════════════
function BookingDetailView({ bookingId, setScreen, setSelectedGuestId }: {
  bookingId: string;
  setScreen: (s: Screen) => void;
  setSelectedGuestId: (id: string) => void;
}) {
  const booking = BOOKINGS.find(b => b.id === bookingId) ?? BOOKINGS[0];
  const guest   = GUESTS.find(g => g.id === booking.guestId)!;
  const room    = ROOMS.find(r => r.id === booking.roomId)!;

  const STATUSES: BookingStatus[] = ["Pending", "Confirmed", "Checked In", "Checked Out", "Archived"];
  const [currentStatus, setCurrentStatus] = useState<BookingStatus>(booking.status);
  const currentIdx = STATUSES.indexOf(currentStatus);

  const subtotal = booking.total;
  const vat      = Math.round(subtotal * 0.075);

  return (
    <div>
      <PageHeader
        title="Booking Detail"
        crumbs={["Home", "Reservations", booking.id]}
        action={
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border"
              style={{ borderColor: "rgba(0,0,0,0.14)", color: C.charcoal, backgroundColor: C.white }}>
              <Edit size={13} />Edit
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border"
              style={{ borderColor: C.red, color: C.red, backgroundColor: "#FFEBEE" }}>
              <X size={13} />Cancel
            </button>
            <GoldButton><ArrowRight size={13} />Upgrade</GoldButton>
          </div>
        }
      />

      <div className="p-6 flex gap-5">
        {/* Main */}
        <div className="flex-1 space-y-5 min-w-0">
          {/* Guest + Room */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg p-5" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: C.gray }}>Guest</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0" style={{ backgroundColor: C.brown }}>
                  {guest.name.split(" ").at(-1)?.[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold" style={{ color: C.charcoal }}>{guest.name}</span>
                    {guest.vip && <span className="text-[11px] px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: "#FFF9C4", color: C.gold }}>VIP</span>}
                  </div>
                  <LoyaltyBadge tier={guest.loyalty} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs" style={{ color: C.gray }}><Mail size={12} />{guest.email}</div>
                <div className="flex items-center gap-2 text-xs" style={{ color: C.gray }}><Phone size={12} />{guest.phone}</div>
              </div>
              <button onClick={() => { setSelectedGuestId(guest.id); setScreen("guest-profile"); }}
                className="mt-3 text-xs font-medium" style={{ color: C.gold }}>
                View full profile →
              </button>
            </div>

            <div className="rounded-lg p-5" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: C.gray }}>Room</p>
              <p className="font-bold text-lg" style={{ color: C.charcoal }}>{room.name}</p>
              <p className="text-sm mb-3" style={{ color: C.gray }}>{room.type} · Floor {room.floor}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[["Check-In", booking.checkIn], ["Check-Out", booking.checkOut], ["Nights", String(booking.nights)], ["Rate/Night", fmt(room.rate)]].map(([k,v]) => (
                  <div key={k}>
                    <p className="text-xs" style={{ color: C.gray }}>{k}</p>
                    <p className="font-semibold" style={{ color: k === "Rate/Night" ? C.gold : C.charcoal }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status timeline */}
          <div className="rounded-lg p-5" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-6" style={{ color: C.gray }}>Booking Status</p>
            <div className="relative flex items-center justify-between">
              {/* Track */}
              <div className="absolute top-4 left-0 right-0 h-0.5" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
              <div className="absolute top-4 left-0 h-0.5 transition-all duration-500"
                style={{ backgroundColor: C.gold, width: `${(currentIdx / (STATUSES.length - 1)) * 100}%` }} />
              {STATUSES.map((s, i) => {
                const done   = i < currentIdx;
                const active = i === currentIdx;
                const next   = i === currentIdx + 1;
                return (
                  <button key={s}
                    onClick={() => next && setCurrentStatus(s)}
                    className="flex flex-col items-center relative z-10"
                    style={{ cursor: next ? "pointer" : "default" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all"
                      style={{ backgroundColor: done ? C.green : active ? C.gold : C.white, border: `2px solid ${done ? C.green : active ? C.gold : "rgba(0,0,0,0.15)"}`, color: done || active ? "#fff" : C.gray }}>
                      {done ? <Check size={13} /> : <span className="text-xs font-bold">{i + 1}</span>}
                    </div>
                    <span className="text-xs font-medium whitespace-nowrap" style={{ color: active ? C.gold : done ? C.green : C.gray }}>{s}</span>
                  </button>
                );
              })}
            </div>
            {currentIdx < STATUSES.length - 1 && (
              <div className="mt-5 text-center">
                <button onClick={() => setCurrentStatus(STATUSES[currentIdx + 1])}
                  className="text-xs font-semibold px-4 py-1.5 rounded-lg"
                  style={{ backgroundColor: "#FFF9C4", color: C.gold }}>
                  Advance → &quot;{STATUSES[currentIdx + 1]}&quot;
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Folio panel */}
        <div className="w-72 flex-shrink-0">
          <div className="rounded-lg p-5 sticky top-6" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: C.gray }}>Folio Preview</p>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#E8F5E9", color: C.green }}>Open</span>
            </div>
            <p className="text-xs mb-4" style={{ color: C.gray }}>FO-{booking.id.replace("BK-","")}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span style={{ color: C.charcoal }}>{room.name} × {booking.nights}n</span>
                <span style={{ color: C.charcoal }}>{fmt(room.rate * booking.nights)}</span>
              </div>
              {booking.addOns.map((a, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span style={{ color: C.gray }}>{a.name}</span>
                  <span style={{ color: C.gray }}>{fmt(a.amount)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-1.5" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <div className="flex justify-between text-sm"><span style={{ color: C.gray }}>Subtotal</span><span style={{ color: C.charcoal }}>{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span style={{ color: C.gray }}>VAT (7.5%)</span><span style={{ color: C.charcoal }}>{fmt(vat)}</span></div>
              <div className="flex justify-between font-bold text-sm pt-1">
                <span style={{ color: C.charcoal }}>Total</span>
                <span style={{ color: C.gold }}>{fmt(subtotal + vat)}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t space-y-1.5" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <div className="flex justify-between text-sm"><span style={{ color: C.gray }}>Paid</span><span style={{ color: C.green }}>₦0</span></div>
              <div className="flex justify-between font-bold text-sm">
                <span style={{ color: C.charcoal }}>Balance Due</span>
                <span style={{ color: C.red }}>{fmt(subtotal + vat)}</span>
              </div>
            </div>

            <button className="w-full mt-4 py-2.5 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: C.gold }}>
              Post Payment
            </button>
            <button className="w-full mt-2 py-2 rounded-lg text-sm font-medium border"
              style={{ borderColor: "rgba(0,0,0,0.12)", color: C.charcoal }}>
              Print Folio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCREEN B1-06: Guest Profile Page
// ══════════════════════════════════════════════════════════════════════════════
function GuestProfilePage({ guestId, setScreen, setSelectedBookingId }: {
  guestId: string;
  setScreen: (s: Screen) => void;
  setSelectedBookingId: (id: string) => void;
}) {
  const guest        = GUESTS.find(g => g.id === guestId) ?? GUESTS[0];
  const guestBookings = BOOKINGS.filter(b => b.guestId === guest.id);
  const [tab, setTab] = useState("overview");

  const TABS = ["overview","stays","preferences","finance","notes"];

  const PREFS = [
    ["Preferred Floor",    "High floor (3rd+)"],
    ["Pillow Type",        "Firm memory foam"],
    ["Dietary",            "Halal"],
    ["Room Temperature",   "Cool · 20°C"],
    ["Newspaper",          "The Guardian Nigeria"],
    ["Bed Configuration",  "King, no extra bed"],
  ];

  return (
    <div>
      <PageHeader
        title="Guest Profile"
        crumbs={["Home", "Guests", guest.name]}
        action={<GoldButton onClick={() => setScreen("new-booking")}><Plus size={14} />New Booking</GoldButton>}
      />

      <div className="p-6 space-y-5">
        {/* Identity block */}
        <div className="rounded-lg p-6" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white" style={{ backgroundColor: C.brown }}>
                {guest.name.split(" ").at(-1)?.[0]}
              </div>
              {guest.vip && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: C.gold }}>
                  <Star size={12} className="text-white" fill="white" />
                </div>
              )}
            </div>

            {/* Core info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="text-xl font-bold" style={{ color: C.charcoal }}>{guest.name}</h1>
                <LoyaltyBadge tier={guest.loyalty} />
                {guest.vip && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "#FFF9C4", color: C.gold }}>
                    <Star size={10} fill={C.gold} />VIP Guest
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                <div className="flex items-center gap-2 text-xs" style={{ color: C.gray }}><Flag size={12} />{guest.nationality}</div>
                <div className="flex items-center gap-2 text-xs" style={{ color: C.gray }}><Shield size={12} />ID: {guest.idNumber}</div>
                <div className="flex items-center gap-2 text-xs" style={{ color: C.gray }}><Mail size={12} />{guest.email}</div>
                <div className="flex items-center gap-2 text-xs" style={{ color: C.gray }}><Phone size={12} />{guest.phone}</div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-3 flex-shrink-0">
              {[[String(guest.totalStays), "Stays"], [String(guest.totalStays * 3), "Nights"], [fmt(guest.totalSpend), "Total Spend"]].map(([v, l]) => (
                <div key={l} className="rounded-lg px-4 py-3 text-center min-w-[88px]" style={{ backgroundColor: C.ivory }}>
                  <p className="font-bold text-base" style={{ color: l === "Total Spend" ? C.gold : C.charcoal }}>{v}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: C.gray }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
              style={{ backgroundColor: tab === t ? C.gold : "transparent", color: tab === t ? "#fff" : C.gray }}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="rounded-lg p-6" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>

          {tab === "overview" && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-sm mb-3" style={{ color: C.charcoal }}>Quick Summary</h3>
                <div className="space-y-3">
                  {[["Guest Since","March 2019"], ["Last Stay","16 June 2026"], ["Preferred Room","Suite, high floor"], ["Loyalty Points","4,820 pts"], ["Outstanding Balance","₦0 (settled)"]].map(([k,v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span style={{ color: C.gray }}>{k}</span>
                      <span style={{ color: k === "Loyalty Points" ? C.gold : k === "Outstanding Balance" ? C.green : C.charcoal }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3" style={{ color: C.charcoal }}>Current Booking</h3>
                {guestBookings.length > 0 ? (
                  <div className="rounded-lg p-4" style={{ backgroundColor: C.ivory }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm" style={{ color: C.charcoal }}>{guestBookings[0].id}</span>
                      <StatusBadge status={guestBookings[0].status} />
                    </div>
                    <p className="text-xs mb-0.5" style={{ color: C.gray }}>
                      {ROOMS.find(r => r.id === guestBookings[0].roomId)?.name}
                    </p>
                    <p className="text-xs" style={{ color: C.gray }}>
                      {guestBookings[0].checkIn} → {guestBookings[0].checkOut}
                    </p>
                    <button onClick={() => { setSelectedBookingId(guestBookings[0].id); setScreen("booking-detail"); }}
                      className="text-xs font-medium mt-2" style={{ color: C.gold }}>
                      View booking →
                    </button>
                  </div>
                ) : (
                  <div className="rounded-lg p-6 text-center" style={{ backgroundColor: C.ivory }}>
                    <Bed size={32} className="mx-auto mb-2" style={{ color: C.gray, opacity: 0.4 }} />
                    <p className="text-sm" style={{ color: C.gray }}>No active bookings</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "stays" && (
            <div>
              <h3 className="font-semibold text-sm mb-4" style={{ color: C.charcoal }}>Stay History</h3>
              {guestBookings.length === 0 ? (
                <div className="text-center py-10" style={{ color: C.gray }}>
                  <Bed size={40} className="mx-auto mb-3" style={{ opacity: 0.3 }} />
                  <p className="text-sm">No stays recorded yet</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: C.ivory }}>
                      {["Booking ID","Room","Check-In","Check-Out","Nights","Total","Status"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-[11px] font-medium uppercase tracking-wider" style={{ color: C.gray }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {guestBookings.map((b, i) => {
                      const r = ROOMS.find(rm => rm.id === b.roomId);
                      return (
                        <tr key={b.id} onClick={() => { setSelectedBookingId(b.id); setScreen("booking-detail"); }}
                          className="border-t cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ borderColor: "rgba(0,0,0,0.05)", backgroundColor: i % 2 === 1 ? C.ivory : C.white }}>
                          <td className="px-4 py-3 text-xs font-semibold" style={{ color: C.gold }}>{b.id}</td>
                          <td className="px-4 py-3 text-sm" style={{ color: C.charcoal }}>{r?.name}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: C.gray }}>{b.checkIn}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: C.gray }}>{b.checkOut}</td>
                          <td className="px-4 py-3 text-sm" style={{ color: C.charcoal }}>{b.nights}</td>
                          <td className="px-4 py-3 text-sm font-medium" style={{ color: C.charcoal }}>{fmt(b.total)}</td>
                          <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {tab === "preferences" && (
            <div>
              <h3 className="font-semibold text-sm mb-4" style={{ color: C.charcoal }}>Guest Preferences</h3>
              <div className="grid grid-cols-3 gap-3">
                {PREFS.map(([k, v]) => (
                  <div key={k} className="rounded-lg p-4" style={{ backgroundColor: C.ivory }}>
                    <p className="text-[10px] uppercase tracking-wider font-medium mb-1" style={{ color: C.gray }}>{k}</p>
                    <p className="text-sm font-semibold" style={{ color: C.charcoal }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "finance" && (
            <div>
              <h3 className="font-semibold text-sm mb-4" style={{ color: C.charcoal }}>Financial Summary</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[["Lifetime Spend", fmt(guest.totalSpend), C.gold], ["Avg. per Stay", fmt(Math.round(guest.totalSpend / guest.totalStays)), C.charcoal], ["Outstanding", "₦0", C.green]].map(([l,v,c]) => (
                  <div key={l} className="rounded-lg p-4 text-center" style={{ backgroundColor: C.ivory }}>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: C.gray }}>{l}</p>
                    <p className="text-xl font-bold mt-1" style={{ color: c }}>{v}</p>
                  </div>
                ))}
              </div>
              <h4 className="font-semibold text-xs uppercase tracking-wider mb-3" style={{ color: C.gray }}>Recent Transactions</h4>
              <div className="space-y-2">
                {guestBookings.map(b => (
                  <div key={b.id} className="flex items-center justify-between px-4 py-3 rounded-lg" style={{ backgroundColor: C.ivory }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: C.charcoal }}>{b.id}</p>
                      <p className="text-xs" style={{ color: C.gray }}>{b.checkIn} · {ROOMS.find(r => r.id === b.roomId)?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold" style={{ color: C.charcoal }}>{fmt(b.total)}</p>
                      <StatusBadge status={b.status} />
                    </div>
                  </div>
                ))}
                {guestBookings.length === 0 && <p className="text-sm text-center py-6" style={{ color: C.gray }}>No transactions found</p>}
              </div>
            </div>
          )}

          {tab === "notes" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm" style={{ color: C.charcoal }}>Notes &amp; Alerts</h3>
                <GoldButton><Plus size={13} />Add Note</GoldButton>
              </div>
              <div className="space-y-3">
                {guest.vip && (
                  <div className="rounded-lg px-4 py-3 flex gap-3" style={{ backgroundColor: "#FFF9C4", border: `1px solid ${C.gold}40` }}>
                    <Star size={15} style={{ color: C.gold, flexShrink: 0, marginTop: 1 }} fill={C.gold} />
                    <div>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: C.gold }}>VIP Guest — Priority Service</p>
                      <p className="text-xs" style={{ color: C.gray }}>Ensure welcome fruit basket, complimentary room upgrade when available, and GM greeting on arrival.</p>
                    </div>
                  </div>
                )}
                <div className="rounded-lg px-4 py-3 flex gap-3" style={{ backgroundColor: "#E8F5E9", border: `1px solid ${C.green}35` }}>
                  <CheckCircle size={15} style={{ color: C.green, flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: C.green }}>Loyalty Member — {guest.loyalty} Tier</p>
                    <p className="text-xs" style={{ color: C.gray }}>Eligible for late checkout and complimentary minibar refresh. {guest.loyalty} tier benefits apply on every stay.</p>
                  </div>
                </div>
                <div className="rounded-lg px-4 py-3 flex gap-3" style={{ backgroundColor: C.ivory, border: "1px solid rgba(0,0,0,0.07)" }}>
                  <Flag size={15} style={{ color: C.gray, flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: C.charcoal }}>Dietary Requirement</p>
                    <p className="text-xs" style={{ color: C.gray }}>All meals must be Halal-certified. Notify F&amp;B team prior to arrival. Confirm with chef de partie.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT App
// ══════════════════════════════════════════════════════════════════════════════
export default function HotelManagementApp() {
  const [isLoggedIn, setIsLoggedIn]       = useState(false);
  const [role, setRole]                   = useState<Role>("gm");
  const [screen, setScreen]               = useState<Screen>("gm-dashboard");
  const [collapsed, setCollapsed]         = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("BK-2026-001");
  const [selectedGuestId, setSelectedGuestId]     = useState("G001");

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={r => {
          setRole(r);
          setIsLoggedIn(true);
          setScreen("gm-dashboard");
        }}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: C.ivory }}>
      <Sidebar
        screen={screen}
        setScreen={setScreen}
        role={role}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <TopHeader role={role} setIsLoggedIn={setIsLoggedIn} />
        <div className="flex-1 overflow-auto min-h-0" style={{ backgroundColor: C.ivory }}>
          {screen === "gm-dashboard" && (
            <GMDashboard
              setScreen={setScreen}
              setSelectedBookingId={setSelectedBookingId}
              setSelectedGuestId={setSelectedGuestId}
            />
          )}
          {screen === "reservation-calendar" && (
            <ReservationCalendar
              setScreen={setScreen}
              setSelectedBookingId={setSelectedBookingId}
            />
          )}
          {screen === "new-booking" && (
            <NewBookingFlow
              setScreen={setScreen}
              setSelectedBookingId={setSelectedBookingId}
            />
          )}
          {screen === "booking-detail" && (
            <BookingDetailView
              bookingId={selectedBookingId}
              setScreen={setScreen}
              setSelectedGuestId={setSelectedGuestId}
            />
          )}
          {screen === "guest-profile" && (
            <GuestProfilePage
              guestId={selectedGuestId}
              setScreen={setScreen}
              setSelectedBookingId={setSelectedBookingId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

