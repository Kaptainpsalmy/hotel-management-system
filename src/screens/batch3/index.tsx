import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  LayoutGrid, Wrench, Package, UtensilsCrossed, Calendar,
  Bell, Search, Users, RefreshCw, Plus, MoreVertical,
  GripVertical, LogOut, Settings, BarChart3, Home,
  ChevronDown, ChevronRight, X, Eye, ShoppingCart,
  Clock, Coffee, Wine, CheckCircle2, AlertTriangle,
  ArrowUpRight, Layers, Utensils, BookOpen, CreditCard,
  BedDouble, ChevronLeft, Filter
} from "lucide-react";

// ─── Color tokens ───────────────────────────────────────────────────────────
const C = {
  sidebar:    "#4E342E",
  beige:      "#D6C5A4",
  gold:       "#B8860B",
  ivory:      "#F8F6F2",
  white:      "#EFFFFE",
  charcoal:   "#2D2D2D",
  gray:       "#6C757D",
  green:      "#2E7D32",
  amber:      "#F4A300",
  red:        "#D32F2F",
} as const;

// ─── Status badge ────────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
  available:   { bg: "#E8F5E9", color: C.green,  label: "Available" },
  completed:   { bg: "#E8F5E9", color: C.green,  label: "Completed" },
  resolved:    { bg: "#E8F5E9", color: C.green,  label: "Resolved" },
  done:        { bg: "#E8F5E9", color: C.green,  label: "Done" },
  pending:     { bg: "#FFF8E1", color: C.amber,  label: "Pending" },
  cleaning:    { bg: "#FFF8E1", color: C.amber,  label: "Cleaning" },
  inprogress:  { bg: "#FFF8E1", color: C.amber,  label: "In Progress" },
  assigned:    { bg: "#FFF8E1", color: C.amber,  label: "Assigned" },
  inspecting:  { bg: "#F3F3F3", color: C.gray,   label: "Inspecting" },
  toclean:     { bg: "#F3F3F3", color: C.gray,   label: "To Clean" },
  reported:    { bg: "#FFEBEE", color: C.red,    label: "Reported" },
  urgent:      { bg: "#FFEBEE", color: C.red,    label: "Urgent" },
  blocked:     { bg: "#FFEBEE", color: C.red,    label: "Blocked" },
  occupied:    { bg: "#FFF8E1", color: C.gold,   label: "Occupied" },
  reserved:    { bg: "#F5EDD8", color: "#8B6914", label: "Reserved" },
  lowstock:    { bg: "#FFF3E0", color: C.amber,  label: "Low Stock" },
  instock:     { bg: "#E8F5E9", color: C.green,  label: "In Stock" },
  low:         { bg: "#FFEBEE", color: C.red,    label: "High" },
  medium:      { bg: "#FFF8E1", color: C.amber,  label: "Medium" },
  high:        { bg: "#E8F5E9", color: C.green,  label: "Low" },
  morning:     { bg: "#E3F2FD", color: "#1565C0", label: "Morning" },
  afternoon:   { bg: "#F3E5F5", color: "#6A1B9A", label: "Afternoon" },
  night:       { bg: "#E8EAF6", color: "#283593", label: "Night" },
  off:         { bg: "#F3F3F3", color: C.gray,   label: "Off" },
};

function StatusBadge({ status, label }: { status: string; label?: string }) {
  const s = STATUS_MAP[status.toLowerCase().replace(/\s+/g, "")] ?? STATUS_MAP.inspecting;
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: 11, fontWeight: 600, padding: "2px 10px",
      borderRadius: 999, display: "inline-block", whiteSpace: "nowrap"
    }}>
      {label ?? s.label}
    </span>
  );
}

// ─── Sidebar nav data ─────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: "dashboard",   icon: Home,           label: "Dashboard",         batch: null },
  { id: "reservations",icon: BookOpen,        label: "Reservations",      batch: null },
  { id: "frontdesk",   icon: CreditCard,      label: "Front Desk",        batch: null },
  { id: "b3-01",       icon: LayoutGrid,      label: "Housekeeping Board",batch: "BOH" },
  { id: "b3-02",       icon: Users,           label: "Assignment Grid",   batch: "BOH" },
  { id: "b3-03",       icon: Wrench,          label: "Maintenance Board", batch: "BOH" },
  { id: "b3-04",       icon: Package,         label: "Inventory",         batch: "BOH" },
  { id: "b3-05",       icon: UtensilsCrossed, label: "Restaurant Plan",   batch: "BOH" },
  { id: "b3-06",       icon: Calendar,        label: "Staff Schedule",    batch: "BOH" },
  { id: "analytics",   icon: BarChart3,       label: "Analytics",         batch: null },
  { id: "settings",    icon: Settings,        label: "Settings",          batch: null },
];

const PAGE_TITLES: Record<string, { title: string; breadcrumb: string[]; action?: string }> = {
  "b3-01": { title: "Housekeeping Task Board", breadcrumb: ["Back-of-House", "Housekeeping"], action: "Add Task" },
  "b3-02": { title: "Assignment Grid",         breadcrumb: ["Back-of-House", "Housekeeping"], action: "Assign Staff" },
  "b3-03": { title: "Maintenance Work Orders", breadcrumb: ["Back-of-House", "Maintenance"],  action: "New Work Order" },
  "b3-04": { title: "Inventory Dashboard",     breadcrumb: ["Back-of-House", "Inventory"],    action: "Add Item" },
  "b3-05": { title: "Restaurant Table Plan",   breadcrumb: ["Back-of-House", "Restaurant"],   action: "New Reservation" },
  "b3-06": { title: "Staff Shift Schedule",    breadcrumb: ["Back-of-House", "HR"],           action: "Publish Schedule" },
};

// ─── Layout Shell ─────────────────────────────────────────────────────────────
function Sidebar({ active, onNav, collapsed, onToggle }: {
  active: string; onNav: (id: string) => void;
  collapsed: boolean; onToggle: () => void;
}) {
  const nav = useNavigate();
  const BOHopen = NAV_SECTIONS.filter(n => n.batch === "BOH").some(n => n.id === active);
  return (
    <aside style={{
      width: collapsed ? 64 : 240, minHeight: "100vh", background: C.sidebar,
      display: "flex", flexDirection: "column", flexShrink: 0,
      transition: "width 0.2s ease", position: "sticky", top: 0
    }}>
      {/* Logo */}
      <div style={{
        height: 64, display: "flex", alignItems: "center",
        padding: collapsed ? "0 16px" : "0 20px", gap: 10,
        borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}>
        <button onClick={() => nav("/")} title="Back to HMS Home" style={{
          width: 32, height: 32, borderRadius: 8,
          background: C.gold, display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0, border: "none", cursor: "pointer"
        }}>
          <BedDouble size={18} color="#fff" />
        </button>
        {!collapsed && (
          <>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>Aryhills</div>
              <div style={{ color: C.beige, fontSize: 10, lineHeight: 1.2 }}>Back of House</div>
            </div>
            <button onClick={() => nav("/")} title="Back to HMS Home" style={{
              background: "transparent", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 24, height: 24, borderRadius: 6, flexShrink: 0,
              color: C.beige, opacity: 0.7
            }}>
              <ChevronLeft size={16} />
            </button>
          </>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {/* Non-BOH items above */}
        {["dashboard","reservations","frontdesk"].map(id => {
          const n = NAV_SECTIONS.find(x => x.id === id)!;
          const Icon = n.icon;
          const isActive = active === id;
          return (
            <button key={id} onClick={() => onNav(id)} style={{
              width: "100%", display: "flex", alignItems: "center",
              gap: 10, padding: collapsed ? "10px 0" : "10px 12px",
              borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2,
              background: isActive ? C.gold : "transparent",
              color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
              transition: "all 0.15s", justifyContent: collapsed ? "center" : "flex-start"
            }}>
              <Icon size={18} />
              {!collapsed && <span style={{ fontSize: 13 }}>{n.label}</span>}
            </button>
          );
        })}

        {/* BOH section */}
        <div style={{ margin: "8px 0 4px", padding: collapsed ? 0 : "0 12px" }}>
          {!collapsed && (
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
              Back-of-House
            </div>
          )}
        </div>
        {NAV_SECTIONS.filter(n => n.batch === "BOH").map(n => {
          const Icon = n.icon;
          const isActive = active === n.id;
          return (
            <button key={n.id} onClick={() => onNav(n.id)} style={{
              width: "100%", display: "flex", alignItems: "center",
              gap: 10, padding: collapsed ? "10px 0" : "9px 12px",
              borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2,
              background: isActive ? C.gold : "transparent",
              color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
              transition: "all 0.15s", justifyContent: collapsed ? "center" : "flex-start"
            }}>
              <Icon size={16} />
              {!collapsed && <span style={{ fontSize: 12 }}>{n.label}</span>}
            </button>
          );
        })}

        {/* Analytics + Settings */}
        <div style={{ margin: "8px 0 4px" }} />
        {["analytics","settings"].map(id => {
          const n = NAV_SECTIONS.find(x => x.id === id)!;
          const Icon = n.icon;
          return (
            <button key={id} onClick={() => onNav(id)} style={{
              width: "100%", display: "flex", alignItems: "center",
              gap: 10, padding: collapsed ? "10px 0" : "10px 12px",
              borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 2,
              background: "transparent",
              color: "rgba(255,255,255,0.7)", transition: "all 0.15s",
              justifyContent: collapsed ? "center" : "flex-start"
            }}>
              <Icon size={18} />
              {!collapsed && <span style={{ fontSize: 13 }}>{n.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle + user */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px 8px" }}>
        <button onClick={onToggle} style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "8px 0" : "8px 12px",
          background: "transparent", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.5)", borderRadius: 8
        }}>
          {!collapsed && <span style={{ fontSize: 12 }}>Collapse</span>}
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        {!collapsed && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 12px", marginTop: 4
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: C.beige,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: C.sidebar, flexShrink: 0
            }}>AO</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#fff", fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Adaeze Okonkwo</div>
              <div style={{ color: C.beige, fontSize: 10 }}>General Manager</div>
            </div>
            <LogOut size={14} color="rgba(255,255,255,0.4)" style={{ cursor: "pointer" }} />
          </div>
        )}
      </div>
    </aside>
  );
}

function TopHeader() {
  return (
    <header style={{
      height: 64, background: C.sidebar, display: "flex", alignItems: "center",
      padding: "0 24px", gap: 16, flexShrink: 0,
      borderBottom: "1px solid rgba(255,255,255,0.06)"
    }}>
      {/* Search */}
      <div style={{
        flex: 1, maxWidth: 400, margin: "0 auto",
        background: "rgba(255,255,255,0.08)", borderRadius: 8,
        display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 36
      }}>
        <Search size={14} color="rgba(255,255,255,0.4)" />
        <input placeholder="Search rooms, guests, tasks…" style={{
          background: "transparent", border: "none", outline: "none",
          color: "#fff", fontSize: 13, width: "100%"
        }} />
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative" }}>
          <Bell size={20} color="rgba(255,255,255,0.7)" style={{ cursor: "pointer" }} />
          <div style={{
            position: "absolute", top: -4, right: -4,
            width: 16, height: 16, background: C.red, borderRadius: "50%",
            fontSize: 9, fontWeight: 700, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>7</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", background: C.beige,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: C.sidebar
          }}>AO</div>
          <div>
            <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Adaeze Okonkwo</div>
            <div style={{ color: C.beige, fontSize: 10 }}>General Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function PageHeader({ screenId, onAction }: { screenId: string; onAction: () => void }) {
  const nav = useNavigate();
  const p = PAGE_TITLES[screenId];
  if (!p) return null;
  return (
    <div style={{
      height: 80, background: C.ivory, display: "flex", alignItems: "center",
      padding: "0 32px", borderBottom: `1px solid ${C.beige}40`,
      flexShrink: 0
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <button onClick={() => nav("/")} style={{
            display: "flex", alignItems: "center", gap: 4,
            background: "transparent", border: "none", cursor: "pointer", padding: 0, opacity: 0.85
          }}>
            <Home size={12} color={C.gold} />
            <span style={{ fontSize: 12, color: C.gold, fontWeight: 500 }}>HMS</span>
          </button>
          <ChevronRight size={12} color={C.gray} />
          {p.breadcrumb.map((b, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {i > 0 && <ChevronRight size={12} color={C.gray} />}
              <span style={{ fontSize: 12, color: C.gray }}>{b}</span>
            </span>
          ))}
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: C.charcoal, margin: 0 }}>{p.title}</h1>
      </div>
      {p.action && (
        <button onClick={onAction} style={{
          background: C.gold, color: "#fff", border: "none", borderRadius: 8,
          padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8
        }}>
          <Plus size={16} />
          {p.action}
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// B3-01  DEPARTMENT BOARD
// ═══════════════════════════════════════════════════════════════════════════════

const DEPT_INFO = [
  { id:"Housekeeping", name:"Housekeeping", Icon:Layers, color:C.amber, staffToday:3,
    tasks:[{l:"To Clean",n:5,c:C.gray},{l:"Cleaning",n:4,c:C.amber},{l:"Inspecting",n:2,c:"#1565C0"},{l:"Done",n:6,c:C.green}],
    note:"17 rooms assigned across 3 attendants today" },
  { id:"Maintenance", name:"Maintenance", Icon:Wrench, color:C.red, staffToday:2,
    tasks:[{l:"Pending",n:3,c:C.red},{l:"Assigned",n:2,c:C.amber},{l:"In Progress",n:2,c:"#1565C0"},{l:"Done",n:2,c:C.green}],
    note:"3 complaints pending manager approval" },
  { id:"Restaurant", name:"Restaurant", Icon:UtensilsCrossed, color:"#6A1B9A", staffToday:2,
    tasks:[{l:"Tables Set",n:8,c:C.green},{l:"Occupied",n:4,c:C.gold},{l:"Reserved",n:3,c:"#8B6914"}],
    note:"Lunch service active · 18 covers so far" },
  { id:"Security", name:"Security", Icon:Eye, color:"#283593", staffToday:1,
    tasks:[{l:"Posts Active",n:4,c:C.green},{l:"Incidents",n:0,c:C.gray}],
    note:"All posts manned · Night handover 22:00" },
  { id:"Front Desk", name:"Front Desk", Icon:CreditCard, color:C.gold, staffToday:2,
    tasks:[{l:"Check-Ins",n:3,c:C.green},{l:"Check-Outs",n:2,c:C.amber},{l:"Requests",n:5,c:C.red}],
    note:"5 guest requests open · 3 arrivals expected" },
] as const;

function HousekeepingDeptBoard({ onSelectDept }: { onSelectDept: (d: string) => void }) {
  const today = new Date().toLocaleDateString("en-NG", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: C.gray, marginBottom: 4 }}>Today · {today}</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.charcoal }}>Departmental Overview — Today's Schedule</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
        {DEPT_INFO.map(dept => {
          const Icon = dept.Icon;
          return (
            <button key={dept.id} onClick={() => onSelectDept(dept.id)}
              style={{ background: C.white, borderRadius: 12, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: dept.color + "18", display: "flex", alignItems: "center", justifyContent: "center", color: dept.color, flexShrink: 0 }}>
                  <Icon size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal }}>{dept.name}</div>
                  <div style={{ fontSize: 11, color: C.gray }}>{dept.staffToday} staff on duty today</div>
                </div>
                <ChevronRight size={16} color={C.beige} />
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                {dept.tasks.map(t => (
                  <span key={t.l} style={{ background: t.c + "18", color: t.c, borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>
                    {t.n} {t.l}
                  </span>
                ))}
              </div>
              <div style={{ fontSize: 11, color: C.gray, borderTop: `1px solid ${C.beige}40`, paddingTop: 10 }}>
                {dept.note}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// B3-02  DEPARTMENT ASSIGNMENT DETAIL
// ═══════════════════════════════════════════════════════════════════════════════

const ALL_DEPTS = ["Housekeeping","Maintenance","Restaurant","Security","Front Desk"] as const;

function HousekeepingAssignmentGrid({ dept, onBack }: { dept: string|null; onBack: () => void }) {
  const [activeDept, setActiveDept] = useState(dept || "Housekeeping");
  const [shiftFilter, setShiftFilter] = useState<string>("all");
  const todayIdx = 1; // "Tue 1"

  const deptStaff = STAFF_SCHEDULE.filter(s => s.dept === activeDept);
  const visibleStaff = shiftFilter === "all" ? deptStaff
    : deptStaff.filter(s => s.shifts[todayIdx] === shiftFilter);

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: `1px solid ${C.beige}`, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12, color: C.charcoal }}>
          <ChevronLeft size={14} /> Dept Board
        </button>
        <div>
          <div style={{ fontSize: 11, color: C.gray }}>Back-of-House → Schedule</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.charcoal }}>{activeDept} — Assignment Detail</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.gray }}>Week of 30 Jun – 6 Jul 2026</div>
      </div>

      {/* Dept tabs + shift filter */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {ALL_DEPTS.map(d => (
          <button key={d} onClick={() => setActiveDept(d)} style={{ padding: "5px 14px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: activeDept === d ? C.gold : C.white, color: activeDept === d ? "#fff" : C.gray, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            {d}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {["all","morning","afternoon","night"].map(s => (
            <button key={s} onClick={() => setShiftFilter(s)} style={{ padding: "5px 14px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 12, background: shiftFilter === s ? C.sidebar : C.white, color: shiftFilter === s ? "#fff" : C.gray, boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
              {s === "all" ? "All Shifts" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule table */}
      <div style={{ background: C.white, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "180px 100px repeat(7,1fr)", background: C.sidebar }}>
          <div style={{ padding: "12px 16px", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Staff Member</div>
          <div style={{ padding: "12px 8px", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Role</div>
          {DAYS.map((d, i) => (
            <div key={d} style={{ padding: "12px 4px", fontSize: 11, fontWeight: 600, textAlign: "center", color: i === todayIdx ? C.gold : "rgba(255,255,255,0.7)", background: i === todayIdx ? "rgba(184,134,11,0.15)" : "transparent" }}>{d}</div>
          ))}
        </div>
        {visibleStaff.map((row, ri) => (
          <div key={row.name} style={{ display: "grid", gridTemplateColumns: "180px 100px repeat(7,1fr)", background: ri % 2 === 1 ? `${C.beige}12` : C.white, borderBottom: `1px solid ${C.beige}30` }}>
            <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.beige, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: C.sidebar, flexShrink: 0 }}>
                {row.name.split(" ").map(w => w[0]).slice(0,2).join("")}
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: C.charcoal }}>{row.name}</span>
            </div>
            <div style={{ padding: "12px 8px", fontSize: 11, color: C.gray, display: "flex", alignItems: "center" }}>{row.role}</div>
            {row.shifts.map((shift, di) => {
              const ss = SHIFT_STYLE[shift];
              return (
                <div key={di} style={{ padding: "8px 4px", display: "flex", alignItems: "center", justifyContent: "center", background: di === todayIdx ? "rgba(184,134,11,0.05)" : "transparent" }}>
                  <div style={{ width: 32, height: 26, borderRadius: 6, background: ss.bg, border: `1px solid ${ss.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: ss.color }}>{ss.label}</div>
                </div>
              );
            })}
          </div>
        ))}
        {visibleStaff.length === 0 && (
          <div style={{ padding: 32, textAlign: "center", fontSize: 13, color: C.gray }}>
            No {activeDept} staff on {shiftFilter === "all" ? "any" : shiftFilter} shift today
          </div>
        )}
      </div>

      {/* Shift legend */}
      <div style={{ display: "flex", gap: 16, marginTop: 16, alignItems: "center" }}>
        {(["morning","afternoon","night","off"] as ShiftType[]).map(s => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 24, height: 20, borderRadius: 4, background: SHIFT_STYLE[s].bg, border: `1px solid ${SHIFT_STYLE[s].color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: SHIFT_STYLE[s].color }}>{SHIFT_STYLE[s].label}</div>
            <span style={{ fontSize: 12, color: C.gray, textTransform: "capitalize" }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// B3-03  MAINTENANCE — ESCALATION FLOW + WORK ORDERS
// ═══════════════════════════════════════════════════════════════════════════════

type MaintCol = "assigned" | "inprogress" | "done";
type Priority = "low" | "medium" | "high";

interface MaintCard {
  id: string; roomNumber: string; issueType: string;
  description: string; priority: Priority;
  assignedTo?: string; reportedAt: string; column: MaintCol;
}

interface PendingComplaint {
  id: string; room: string; guestName: string; issueType: string;
  description: string; reportedAt: string;
}

const PENDING_COMPLAINTS_INIT: PendingComplaint[] = [
  { id:"pc1", room:"Room 302", guestName:"Mr. Chidi Okafor",    issueType:"Plumbing",   description:"Shower head leaking continuously — guest very upset", reportedAt:"07:14" },
  { id:"pc2", room:"Room 118", guestName:"Mrs. Aisha Bello",    issueType:"Electrical", description:"Air conditioner not cooling at all, room is unbearable", reportedAt:"08:02" },
  { id:"pc3", room:"Suite 401",guestName:"Dr. Emeka Eze",       issueType:"HVAC",       description:"Strange smell from ventilation — guest requesting room change", reportedAt:"09:30" },
];

const INIT_WORK_ORDERS: MaintCard[] = [
  { id:"m4", roomNumber:"Room 215", issueType:"Plumbing",   description:"Toilet cistern running non-stop",        priority:"medium", assignedTo:"Emeka Nwosu",  reportedAt:"06:50", column:"assigned"   },
  { id:"m5", roomNumber:"Room 103", issueType:"Electrical", description:"Bedside lamp faulty – bulb replaced ok", priority:"low",    assignedTo:"Bode Afolabi", reportedAt:"07:22", column:"assigned"   },
  { id:"m6", roomNumber:"Room 404", issueType:"HVAC",       description:"Strange noise from ceiling fan",         priority:"medium", assignedTo:"Emeka Nwosu",  reportedAt:"08:45", column:"inprogress" },
  { id:"m7", roomNumber:"Suite 310",issueType:"Plumbing",   description:"Hot water intermittent – 3rd complaint", priority:"high",   assignedTo:"Tunde Bello",  reportedAt:"06:10", column:"inprogress" },
  { id:"m8", roomNumber:"Room 206", issueType:"Furniture",  description:"TV remote missing",                      priority:"low",    assignedTo:"Bode Afolabi", reportedAt:"09:00", column:"done"       },
  { id:"m9", roomNumber:"Room 109", issueType:"Electrical", description:"Bathroom light flickering",              priority:"medium", assignedTo:"Tunde Bello",  reportedAt:"05:30", column:"done"       },
];

const MAINT_WO_COLUMNS: { id: MaintCol; label: string; color: string }[] = [
  { id:"assigned",   label:"Assigned",    color: C.amber   },
  { id:"inprogress", label:"In Progress", color: "#1565C0" },
  { id:"done",       label:"Done",        color: C.green   },
];

const PRIORITY_STYLE: Record<Priority, { bg: string; color: string; label: string }> = {
  high:   { bg: "#FFEBEE", color: C.red,   label: "High Priority" },
  medium: { bg: "#FFF8E1", color: C.amber, label: "Medium" },
  low:    { bg: "#E8F5E9", color: C.green, label: "Low" },
};

const TECHNICIANS = ["Emeka Nwosu", "Bode Afolabi", "Tunde Bello"];

function MaintenanceBoard() {
  const [cards, setCards] = useState<MaintCard[]>(INIT_WORK_ORDERS);
  const [pending, setPending] = useState<PendingComplaint[]>(PENDING_COMPLAINTS_INIT);
  const [approvingId, setApprovingId] = useState<string|null>(null);
  const [approvePriority, setApprovePriority] = useState<Priority>("medium");
  const [approveAssignee, setApproveAssignee] = useState(TECHNICIANS[0]);
  const dragId = useRef<string | null>(null);

  const handleApprove = (c: PendingComplaint) => {
    const card: MaintCard = {
      id: "m-" + Date.now(), roomNumber: c.room, issueType: c.issueType,
      description: c.description, priority: approvePriority,
      assignedTo: approveAssignee, reportedAt: c.reportedAt, column: "assigned",
    };
    setCards(prev => [...prev, card]);
    setPending(prev => prev.filter(p => p.id !== c.id));
    setApprovingId(null);
  };

  const handleDrop = (col: MaintCol) => {
    if (!dragId.current) return;
    setCards(prev => prev.map(c => c.id === dragId.current ? { ...c, column: col } : c));
    dragId.current = null;
  };

  return (
    <div style={{ padding: 32 }}>
      {/* ── Pending Complaints ── */}
      {pending.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red }} />
            <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal }}>Pending Complaints</div>
            <span style={{ background: C.red + "18", color: C.red, borderRadius: 999, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{pending.length}</span>
            <span style={{ fontSize: 12, color: C.gray }}>· Awaiting manager approval before becoming work orders</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pending.map(complaint => (
              <div key={complaint.id} style={{ background: C.white, borderRadius: 10, padding: "16px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: `1px solid ${C.red}25` }}>
                {approvingId === complaint.id ? (
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.charcoal, marginBottom: 14 }}>
                      Approving: {complaint.room} — {complaint.issueType}
                    </div>
                    <div style={{ display: "flex", gap: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontSize: 11, color: C.gray, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Priority</div>
                        <div style={{ display: "flex", gap: 6 }}>
                          {(["low","medium","high"] as Priority[]).map(p => (
                            <button key={p} onClick={() => setApprovePriority(p)} style={{ padding: "5px 14px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: approvePriority === p ? PRIORITY_STYLE[p].bg : "#f5f5f5", color: approvePriority === p ? PRIORITY_STYLE[p].color : C.gray }}>
                              {p.charAt(0).toUpperCase() + p.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: C.gray, marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Assign To</div>
                        <select value={approveAssignee} onChange={e => setApproveAssignee(e.target.value)} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.beige}`, fontSize: 13, color: C.charcoal, background: C.white, cursor: "pointer" }}>
                          {TECHNICIANS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
                        <button onClick={() => handleApprove(complaint)} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                          Confirm & Create Work Order
                        </button>
                        <button onClick={() => setApprovingId(null)} style={{ background: C.white, color: C.gray, border: `1px solid ${C.beige}`, borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer" }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>{complaint.room}</span>
                        <span style={{ fontSize: 12, color: C.gold, fontWeight: 600 }}>{complaint.issueType}</span>
                        <span style={{ fontSize: 11, color: C.gray }}>Reported {complaint.reportedAt} · via Front Desk</span>
                      </div>
                      <div style={{ fontSize: 13, color: C.charcoal }}>{complaint.description}</div>
                      <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>Guest: {complaint.guestName}</div>
                    </div>
                    <button onClick={() => { setApprovingId(complaint.id); setApprovePriority("medium"); }} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
                      Approve &amp; Assign
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Work Orders Kanban ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal }}>Work Orders</div>
        <span style={{ fontSize: 12, color: C.gray }}>· Drag cards to update status</span>
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {MAINT_WO_COLUMNS.map(col => {
          const colCards = cards.filter(c => c.column === col.id);
          return (
            <div key={col.id} onDragOver={e => e.preventDefault()} onDrop={() => handleDrop(col.id)}
              style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ background: C.white, borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderTop: `3px solid ${col.color}` }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.charcoal }}>{col.label}</span>
                <span style={{ background: col.color + "20", color: col.color, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{colCards.length}</span>
              </div>
              {colCards.map(card => {
                const pri = PRIORITY_STYLE[card.priority];
                return (
                  <div key={card.id} draggable onDragStart={() => { dragId.current = card.id; }}
                    style={{ background: C.white, borderRadius: 8, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", cursor: "grab", border: `1px solid ${C.beige}50`, transition: "box-shadow 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)")}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <GripVertical size={13} color={C.beige} />
                        <span style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>{card.roomNumber}</span>
                      </div>
                      <span style={{ background: pri.bg, color: pri.color, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999 }}>{pri.label}</span>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.gold, marginBottom: 2 }}>{card.issueType}</div>
                      <div style={{ fontSize: 12, color: C.charcoal, lineHeight: 1.5 }}>{card.description}</div>
                    </div>
                    {card.assignedTo && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.beige, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: C.sidebar }}>
                          {card.assignedTo.split(" ").map(w => w[0]).slice(0,2).join("")}
                        </div>
                        <span style={{ fontSize: 11, color: C.charcoal }}>{card.assignedTo}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, borderTop: `1px solid ${C.beige}30`, paddingTop: 8 }}>
                      <Clock size={10} color={C.gray} />
                      <span style={{ fontSize: 10, color: C.gray }}>Reported {card.reportedAt} today</span>
                    </div>
                  </div>
                );
              })}
              {colCards.length === 0 && (
                <div style={{ background: `${col.color}08`, border: `2px dashed ${col.color}30`, borderRadius: 8, padding: 24, textAlign: "center" }}>
                  <CheckCircle2 size={18} color={col.color} style={{ opacity: 0.4, margin: "0 auto 6px" }} />
                  <div style={{ fontSize: 12, color: C.gray }}>No tickets here</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// B3-04  INVENTORY — BAR / KITCHEN / GENERAL
// ═══════════════════════════════════════════════════════════════════════════════

type InvSection = "bar" | "kitchen" | "general";

interface InvItem {
  id: string; name: string; category: string; section: InvSection;
  current: number; min: number; unit: string; lastOrdered: string; price?: number;
}

const INVENTORY_DATA: InvItem[] = [
  // Bar
  { id:"b1",  name:"Star Lager Beer (Crates)",  category:"Beers",    section:"bar",     current:12,  min:20,  unit:"crates",  lastOrdered:"28 Jun 2026", price:3600  },
  { id:"b2",  name:"Heineken (Crates)",          category:"Beers",    section:"bar",     current:8,   min:15,  unit:"crates",  lastOrdered:"25 Jun 2026", price:4200  },
  { id:"b3",  name:"Guinness Stout (Crates)",    category:"Beers",    section:"bar",     current:5,   min:10,  unit:"crates",  lastOrdered:"20 Jun 2026", price:3800  },
  { id:"b4",  name:"Red Wine (Bottles)",         category:"Wine",     section:"bar",     current:18,  min:24,  unit:"bottles", lastOrdered:"22 Jun 2026", price:8500  },
  { id:"b5",  name:"White Wine (Bottles)",       category:"Wine",     section:"bar",     current:14,  min:24,  unit:"bottles", lastOrdered:"22 Jun 2026", price:7500  },
  { id:"b6",  name:"Champagne",                  category:"Wine",     section:"bar",     current:6,   min:12,  unit:"bottles", lastOrdered:"15 Jun 2026", price:25000 },
  { id:"b7",  name:"Whisky (750ml)",             category:"Spirits",  section:"bar",     current:10,  min:12,  unit:"bottles", lastOrdered:"18 Jun 2026", price:18000 },
  { id:"b8",  name:"Vodka (750ml)",              category:"Spirits",  section:"bar",     current:7,   min:10,  unit:"bottles", lastOrdered:"18 Jun 2026", price:15000 },
  { id:"b9",  name:"Soft Drinks (Crates)",       category:"Mixers",   section:"bar",     current:20,  min:15,  unit:"crates",  lastOrdered:"27 Jun 2026", price:1800  },
  { id:"b10", name:"Still Water (500ml)",        category:"Mixers",   section:"bar",     current:90,  min:120, unit:"bottles", lastOrdered:"25 Jun 2026", price:200   },
  // Kitchen
  { id:"k1",  name:"Rice (50kg bags)",           category:"Grains",   section:"kitchen", current:8,   min:15,  unit:"bags",    lastOrdered:"20 Jun 2026", price:45000 },
  { id:"k2",  name:"Vegetable Oil (25L)",        category:"Oils",     section:"kitchen", current:6,   min:10,  unit:"kegs",    lastOrdered:"22 Jun 2026", price:32000 },
  { id:"k3",  name:"Chicken (Frozen, kg)",       category:"Proteins", section:"kitchen", current:45,  min:60,  unit:"kg",      lastOrdered:"28 Jun 2026", price:3200  },
  { id:"k4",  name:"Beef (kg)",                  category:"Proteins", section:"kitchen", current:25,  min:40,  unit:"kg",      lastOrdered:"27 Jun 2026", price:4500  },
  { id:"k5",  name:"Fresh Tilapia (kg)",         category:"Proteins", section:"kitchen", current:12,  min:25,  unit:"kg",      lastOrdered:"29 Jun 2026", price:3800  },
  { id:"k6",  name:"Tomatoes (kg)",              category:"Produce",  section:"kitchen", current:15,  min:20,  unit:"kg",      lastOrdered:"29 Jun 2026", price:800   },
  { id:"k7",  name:"Onions (kg)",                category:"Produce",  section:"kitchen", current:20,  min:15,  unit:"kg",      lastOrdered:"25 Jun 2026", price:600   },
  { id:"k8",  name:"Palm Oil (25L)",             category:"Oils",     section:"kitchen", current:4,   min:8,   unit:"kegs",    lastOrdered:"20 Jun 2026", price:22000 },
  { id:"k9",  name:"Dry Pepper (kg)",            category:"Spices",   section:"kitchen", current:5,   min:8,   unit:"kg",      lastOrdered:"15 Jun 2026", price:2500  },
  { id:"k10", name:"Seasoning Cubes",            category:"Spices",   section:"kitchen", current:200, min:300, unit:"pcs",     lastOrdered:"22 Jun 2026", price:50    },
  // General
  { id:"g1",  name:"Bath Towels (Large)",        category:"Linen",      section:"general", current:180, min:100, unit:"pcs",   lastOrdered:"15 Jun 2026" },
  { id:"g2",  name:"Hand Towels",                category:"Linen",      section:"general", current:42,  min:80,  unit:"pcs",   lastOrdered:"10 Jun 2026" },
  { id:"g3",  name:"Bed Sheets (King)",          category:"Linen",      section:"general", current:95,  min:60,  unit:"sets",  lastOrdered:"18 Jun 2026" },
  { id:"g4",  name:"Shampoo (50ml)",             category:"Toiletries", section:"general", current:310, min:200, unit:"units", lastOrdered:"22 Jun 2026" },
  { id:"g5",  name:"Body Lotion (50ml)",         category:"Toiletries", section:"general", current:55,  min:150, unit:"units", lastOrdered:"01 Jun 2026" },
  { id:"g6",  name:"Floor Cleaner (5L)",         category:"Cleaning",   section:"general", current:22,  min:15,  unit:"bottles",lastOrdered:"18 Jun 2026" },
  { id:"g7",  name:"Disinfectant Spray",         category:"Cleaning",   section:"general", current:8,   min:20,  unit:"cans",  lastOrdered:"12 Jun 2026" },
  { id:"g8",  name:"Bin Liners (Medium)",        category:"Cleaning",   section:"general", current:500, min:200, unit:"pcs",   lastOrdered:"20 Jun 2026" },
];

const SECTION_INFO: Record<InvSection, { label: string; Icon: any; color: string }> = {
  bar:     { label: "Bar",     Icon: Wine,           color: C.red      },
  kitchen: { label: "Kitchen", Icon: UtensilsCrossed, color: C.amber    },
  general: { label: "General", Icon: Package,         color: "#1565C0"  },
};

function InventoryDashboard() {
  const [section, setSection] = useState<InvSection>("bar");
  const [showPrices, setShowPrices] = useState(true);
  const [filterCat, setFilterCat] = useState("All");
  const [reordered, setReordered] = useState<Set<string>>(new Set());

  const sectionItems = INVENTORY_DATA.filter(i => i.section === section);
  const categories = ["All", ...Array.from(new Set(sectionItems.map(i => i.category)))];
  const filtered = sectionItems.filter(i => filterCat === "All" || i.category === filterCat);
  const lowCount = sectionItems.filter(i => i.current < i.min).length;

  const isLow = (i: InvItem) => i.current < i.min;
  const pct = (i: InvItem) => Math.min(100, Math.round((i.current / (i.min * 2)) * 100));

  return (
    <div style={{ padding: 32 }}>
      {/* Section tabs */}
      <div style={{ display: "flex", alignItems: "center", borderBottom: `1px solid ${C.beige}40`, marginBottom: 24 }}>
        {(["bar","kitchen","general"] as InvSection[]).map(s => {
          const info = SECTION_INFO[s];
          const Icon = info.Icon;
          return (
            <button key={s} onClick={() => { setSection(s); setFilterCat("All"); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 24px", border: "none", borderBottom: `3px solid ${section === s ? info.color : "transparent"}`, marginBottom: -1, cursor: "pointer", background: "transparent", fontSize: 14, fontWeight: 600, color: section === s ? info.color : C.gray, transition: "all 0.15s" }}>
              <Icon size={16} />{info.label}
            </button>
          );
        })}
        <div style={{ flex: 1 }} />
        <button onClick={() => setShowPrices(p => !p)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.beige}`, background: "transparent", cursor: "pointer", fontSize: 12, color: showPrices ? C.gold : C.gray, marginBottom: 4 }}>
          <Eye size={13} />{showPrices ? "Hide Prices" : "Show Prices (Manager)"}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total SKUs",    value: sectionItems.length, color: C.gold    },
          { label: "Low Stock",     value: lowCount,            color: C.red     },
          { label: "Categories",    value: categories.length-1, color: "#1565C0" },
          { label: "Reorders Out",  value: reordered.size,      color: C.green   },
        ].map(s => (
          <div key={s.label} style={{ background: C.white, borderRadius: 8, padding: "16px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.charcoal }}>{s.value}</div>
              <div style={{ fontSize: 11, color: C.gray }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)} style={{ padding: "5px 14px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, background: filterCat === cat ? C.gold : C.white, color: filterCat === cat ? "#fff" : C.gray, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: C.white, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.sidebar }}>
              {["Item","Category","Current Stock","Min Required","Stock Level","Last Ordered",...(showPrices && section !== "general" ? ["Unit Price"] : []),"Action"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.04em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const low = isLow(item);
              const p = pct(item);
              const ordered = reordered.has(item.id);
              return (
                <tr key={item.id} style={{ background: low && !ordered ? "#FFF8E1" : i%2===1 ? `${C.beige}18` : C.white, borderBottom: `1px solid ${C.beige}40` }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {low && !ordered && <AlertTriangle size={13} color={C.amber} />}
                      <span style={{ fontSize: 13, fontWeight: 500, color: C.charcoal }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: C.gray }}>{item.category}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: low && !ordered ? C.amber : C.charcoal }}>
                      {item.current} <span style={{ fontSize: 11, color: C.gray, fontWeight: 400 }}>{item.unit}</span>
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: C.gray }}>{item.min} {item.unit}</td>
                  <td style={{ padding: "14px 16px", width: 140 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: "#E0E0E0", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 3, width: `${p}%`, background: low ? C.amber : C.green, transition: "width 0.3s" }} />
                      </div>
                      <span style={{ fontSize: 11, color: C.gray, width: 30 }}>{p}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: C.gray }}>{item.lastOrdered}</td>
                  {showPrices && section !== "general" && (
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: C.gold }}>
                      {item.price ? `₦${item.price.toLocaleString()}` : "—"}
                    </td>
                  )}
                  <td style={{ padding: "14px 16px" }}>
                    {low && !ordered ? (
                      <button onClick={() => setReordered(prev => new Set([...prev, item.id]))} style={{ background: C.amber, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                        <ShoppingCart size={12} /> Reorder
                      </button>
                    ) : ordered ? (
                      <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>✓ Ordered</span>
                    ) : (
                      <button style={{ background: "transparent", color: C.gray, border: `1px solid ${C.beige}`, borderRadius: 6, padding: "5px 12px", fontSize: 11, cursor: "pointer" }}>View</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// B3-05  RESTAURANT TABLE PLAN
// ═══════════════════════════════════════════════════════════════════════════════

type TableStatus = "available" | "occupied" | "reserved";
interface RestTable {
  id: string; number: number; seats: number; status: TableStatus;
  x: number; y: number; shape: "round" | "rect";
  guestName?: string; startTime?: string; items?: string[]; total?: number;
  reservedFor?: string; reservedAt?: string;
}

const TABLES: RestTable[] = [
  { id:"t1",  number:1,  seats:2, status:"available", x:1,  y:1, shape:"round" },
  { id:"t2",  number:2,  seats:4, status:"occupied",  x:3,  y:1, shape:"rect",  guestName:"Mr. Chidi Okafor",   startTime:"12:10", items:["Jollof Rice","Grilled Tilapia","Zobo Drink"], total:18500 },
  { id:"t3",  number:3,  seats:4, status:"reserved",  x:5,  y:1, shape:"rect",  reservedFor:"Mrs. Aisha Bello", reservedAt:"13:30" },
  { id:"t4",  number:4,  seats:2, status:"available", x:7,  y:1, shape:"round" },
  { id:"t5",  number:5,  seats:6, status:"occupied",  x:1,  y:4, shape:"rect",  guestName:"James Carter Party", startTime:"11:50", items:["Eba & Egusi","Pepper Soup","Chapman × 3"], total:42000 },
  { id:"t6",  number:6,  seats:2, status:"available", x:3,  y:4, shape:"round" },
  { id:"t7",  number:7,  seats:4, status:"reserved",  x:5,  y:4, shape:"rect",  reservedFor:"Dr. Emeka Eze",    reservedAt:"14:00" },
  { id:"t8",  number:8,  seats:8, status:"occupied",  x:7,  y:4, shape:"rect",  guestName:"Bello Family",      startTime:"12:30", items:["Chicken Suya","Fried Rice","Salad","Drinks × 4"], total:65000 },
  { id:"t9",  number:9,  seats:2, status:"available", x:1,  y:7, shape:"round" },
  { id:"t10", number:10, seats:4, status:"occupied",  x:3,  y:7, shape:"rect",  guestName:"Mrs. Ngozi Adu",    startTime:"13:05", items:["Ofada Rice","Assorted Meat","Soft Drink"], total:22000 },
  { id:"t11", number:11, seats:4, status:"available", x:5,  y:7, shape:"rect"  },
  { id:"t12", number:12, seats:6, status:"reserved",  x:7,  y:7, shape:"rect",  reservedFor:"Mr. Tunde Bakare", reservedAt:"15:00" },
];

const TABLE_COLORS: Record<TableStatus, { bg: string; border: string; text: string }> = {
  available: { bg: "#E8F5E9", border: C.green,  text: C.green  },
  occupied:  { bg: "#FFF8E1", border: C.gold,   text: C.gold   },
  reserved:  { bg: "#F5EDD8", border: "#8B6914",text: "#8B6914"},
};

function RestaurantTablePlan() {
  const [selectedTable, setSelectedTable] = useState<RestTable | null>(null);

  return (
    <div style={{ padding: 32, display: "flex", gap: 24, alignItems: "flex-start" }}>
      {/* Floor plan */}
      <div style={{ flex: 1 }}>
        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "center" }}>
          {(["available","occupied","reserved"] as TableStatus[]).map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 12, height: 12, borderRadius: 2,
                background: TABLE_COLORS[s].bg, border: `2px solid ${TABLE_COLORS[s].border}`
              }} />
              <span style={{ fontSize: 12, color: C.gray, textTransform: "capitalize" }}>{s}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 16, fontSize: 12, color: C.gray }}>
            <span>Available: {TABLES.filter(t => t.status === "available").length}</span>
            <span>Occupied: {TABLES.filter(t => t.status === "occupied").length}</span>
            <span>Reserved: {TABLES.filter(t => t.status === "reserved").length}</span>
          </div>
        </div>

        {/* Restaurant floor */}
        <div style={{
          background: C.white, borderRadius: 12, padding: 32,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          position: "relative", minHeight: 520
        }}>
          {/* Section labels */}
          <div style={{ position: "absolute", top: 12, left: 20, fontSize: 10, color: C.beige, fontWeight: 600, letterSpacing: "0.1em" }}>MAIN DINING AREA</div>

          {/* Tables in grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(9, 1fr)",
            gridTemplateRows: "repeat(9, 56px)",
            gap: 4, paddingTop: 24
          }}>
            {TABLES.map(table => {
              const sc = TABLE_COLORS[table.status];
              const isSelected = selectedTable?.id === table.id;
              const size = table.seats <= 2 ? 1 : table.seats <= 4 ? 1 : 2;
              return (
                <div
                  key={table.id}
                  onClick={() => setSelectedTable(table)}
                  style={{
                    gridColumnStart: table.x,
                    gridColumnEnd: table.x + (table.seats > 4 ? 2 : 1),
                    gridRowStart: table.y,
                    gridRowEnd: table.y + 2,
                    background: isSelected ? sc.border : sc.bg,
                    border: `2px solid ${sc.border}`,
                    borderRadius: table.shape === "round" ? "50%" : 10,
                    cursor: "pointer",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    gap: 2,
                    transition: "all 0.15s",
                    boxShadow: isSelected ? `0 0 0 3px ${sc.border}40` : "none"
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = sc.border + "30"; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = sc.bg; }}
                >
                  <span style={{
                    fontSize: 13, fontWeight: 700,
                    color: isSelected ? "#fff" : sc.text
                  }}>T{table.number}</span>
                  <span style={{
                    fontSize: 10, color: isSelected ? "rgba(255,255,255,0.8)" : sc.text,
                    opacity: isSelected ? 1 : 0.7
                  }}>{table.seats}p</span>
                </div>
              );
            })}
          </div>

          {/* Waiter station indicator */}
          <div style={{
            position: "absolute", bottom: 20, right: 20,
            background: C.ivory, border: `1px dashed ${C.beige}`,
            borderRadius: 8, padding: "8px 14px", fontSize: 11, color: C.gray
          }}>
            🍽 Waiter Station
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ width: 300, flexShrink: 0 }}>
        <div style={{ background: C.white, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          {selectedTable ? (
            <>
              <div style={{
                padding: "16px 20px", background: C.sidebar,
                display: "flex", alignItems: "center", justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>Table {selectedTable.number}</div>
                  <div style={{ color: C.beige, fontSize: 12 }}>{selectedTable.seats} seats</div>
                </div>
                <StatusBadge status={selectedTable.status} />
              </div>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                {selectedTable.status === "occupied" && selectedTable.guestName && (
                  <>
                    <div>
                      <div style={{ fontSize: 10, color: C.gray, marginBottom: 4, fontWeight: 600 }}>GUEST</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.charcoal }}>{selectedTable.guestName}</div>
                      <div style={{ fontSize: 11, color: C.gray }}>Seated since {selectedTable.startTime}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: C.gray, marginBottom: 8, fontWeight: 600 }}>CURRENT ORDER</div>
                      {selectedTable.items?.map((item, i) => (
                        <div key={i} style={{
                          display: "flex", justifyContent: "space-between",
                          padding: "6px 0", borderBottom: `1px solid ${C.beige}30`,
                          fontSize: 12, color: C.charcoal
                        }}>
                          <span>{item}</span>
                        </div>
                      ))}
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        padding: "10px 0 0", fontSize: 13, fontWeight: 700, color: C.charcoal
                      }}>
                        <span>Total</span>
                        <span style={{ color: C.gold }}>₦{selectedTable.total?.toLocaleString()}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{
                        flex: 1, background: C.gold, color: "#fff", border: "none",
                        borderRadius: 8, padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer"
                      }}>Bill Out</button>
                      <button style={{
                        flex: 1, background: C.ivory, color: C.charcoal,
                        border: `1px solid ${C.beige}`, borderRadius: 8,
                        padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer"
                      }}>Add Item</button>
                    </div>
                  </>
                )}
                {selectedTable.status === "reserved" && (
                  <>
                    <div>
                      <div style={{ fontSize: 10, color: C.gray, marginBottom: 4, fontWeight: 600 }}>RESERVED FOR</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.charcoal }}>{selectedTable.reservedFor}</div>
                      <div style={{ fontSize: 11, color: C.gray }}>Arriving at {selectedTable.reservedAt}</div>
                    </div>
                    <button style={{
                      background: C.gold, color: "#fff", border: "none",
                      borderRadius: 8, padding: "10px", fontSize: 12,
                      fontWeight: 600, cursor: "pointer", width: "100%"
                    }}>Seat Guest</button>
                  </>
                )}
                {selectedTable.status === "available" && (
                  <>
                    <div style={{ textAlign: "center", padding: "16px 0" }}>
                      <CheckCircle2 size={32} color={C.green} style={{ margin: "0 auto 8px" }} />
                      <div style={{ fontSize: 13, color: C.gray }}>Table is available</div>
                    </div>
                    <button style={{
                      background: C.gold, color: "#fff", border: "none",
                      borderRadius: 8, padding: "10px", fontSize: 12,
                      fontWeight: 600, cursor: "pointer", width: "100%"
                    }}>Seat Walk-in</button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div style={{ padding: 32, textAlign: "center" }}>
              <UtensilsCrossed size={32} color={C.beige} style={{ margin: "0 auto 12px" }} />
              <div style={{ fontSize: 13, color: C.gray }}>Select a table to view details</div>
            </div>
          )}
        </div>

        {/* Occupancy summary */}
        <div style={{ background: C.white, borderRadius: 8, padding: 20, marginTop: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.charcoal, marginBottom: 12 }}>Today's Revenue</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.charcoal }}>
            ₦{(147500).toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: C.gray, marginBottom: 12 }}>From 18 covers so far</div>
          <div style={{ height: 4, background: "#E0E0E0", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: "68%", background: C.gold, borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 10, color: C.gray, marginTop: 4 }}>68% of daily target (₦217,000)</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// B3-06  STAFF SHIFT SCHEDULE
// ═══════════════════════════════════════════════════════════════════════════════

const DAYS = ["Mon 30", "Tue 1", "Wed 2", "Thu 3", "Fri 4", "Sat 5", "Sun 6"];
const DEPARTMENTS = ["Front Desk", "Housekeeping", "Maintenance", "Restaurant", "Security"];

type ShiftType = "morning" | "afternoon" | "night" | "off";

interface StaffRow {
  name: string; role: string; dept: string;
  shifts: ShiftType[];
}

const STAFF_SCHEDULE: StaffRow[] = [
  // Front Desk
  { name:"Chioma Adeleke",  role:"Supervisor",   dept:"Front Desk",  shifts:["morning","morning","morning","off","morning","morning","off"] },
  { name:"Usman Garba",     role:"Agent",        dept:"Front Desk",  shifts:["afternoon","afternoon","off","afternoon","afternoon","off","afternoon"] },
  { name:"Temi Fashola",    role:"Agent",        dept:"Front Desk",  shifts:["night","night","night","night","off","night","night"] },
  // Housekeeping
  { name:"Fatima Yusuf",    role:"Lead",         dept:"Housekeeping",shifts:["morning","morning","morning","morning","morning","off","off"] },
  { name:"Ngozi Eze",       role:"Housekeeper",  dept:"Housekeeping",shifts:["morning","morning","off","morning","morning","morning","morning"] },
  { name:"Amaka Obi",       role:"Housekeeper",  dept:"Housekeeping",shifts:["afternoon","off","afternoon","afternoon","afternoon","afternoon","off"] },
  { name:"Halima Sule",     role:"Housekeeper",  dept:"Housekeeping",shifts:["off","morning","morning","morning","off","morning","morning"] },
  // Maintenance
  { name:"Emeka Nwosu",     role:"Lead",         dept:"Maintenance", shifts:["morning","morning","morning","morning","off","morning","morning"] },
  { name:"Bode Afolabi",    role:"Technician",   dept:"Maintenance", shifts:["afternoon","afternoon","afternoon","off","afternoon","afternoon","off"] },
  { name:"Tunde Bello",     role:"Technician",   dept:"Maintenance", shifts:["off","morning","morning","morning","morning","morning","off"] },
  // Restaurant
  { name:"Sade Ogunleye",   role:"Chef",         dept:"Restaurant",  shifts:["morning","morning","morning","off","morning","morning","morning"] },
  { name:"Ifeoma Chukwu",   role:"Waiter",       dept:"Restaurant",  shifts:["afternoon","afternoon","off","afternoon","afternoon","afternoon","off"] },
  { name:"Yakubu Musa",     role:"Waiter",       dept:"Restaurant",  shifts:["night","off","night","night","night","off","night"] },
  // Security
  { name:"Biodun Adeyemi",  role:"Supervisor",   dept:"Security",    shifts:["night","night","night","off","night","night","night"] },
  { name:"Kola Olawale",    role:"Guard",        dept:"Security",    shifts:["morning","morning","off","morning","morning","morning","off"] },
];

const SHIFT_STYLE: Record<ShiftType, { bg: string; color: string; label: string }> = {
  morning:   { bg: "#E3F2FD", color: "#1565C0", label: "M" },
  afternoon: { bg: "#F3E5F5", color: "#6A1B9A", label: "A" },
  night:     { bg: "#E8EAF6", color: "#283593", label: "N" },
  off:       { bg: "#F5F5F5", color: "#9E9E9E", label: "—" },
};

function StaffShiftSchedule() {
  const depts = DEPARTMENTS;
  const today = 1; // "Tue 1" index

  return (
    <div style={{ padding: 32 }}>
      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "center" }}>
        {(["morning","afternoon","night","off"] as ShiftType[]).map(s => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 24, height: 20, borderRadius: 4,
              background: SHIFT_STYLE[s].bg, border: `1px solid ${SHIFT_STYLE[s].color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700, color: SHIFT_STYLE[s].color
            }}>{SHIFT_STYLE[s].label}</div>
            <span style={{ fontSize: 12, color: C.gray, textTransform: "capitalize" }}>{s}</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 12, color: C.gray }}>
          Week of 30 Jun – 6 Jul 2026
        </div>
      </div>

      {/* Table */}
      <div style={{ background: C.white, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 100px repeat(7, 1fr)", background: C.sidebar }}>
          <div style={{ padding: "12px 16px", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Staff Member</div>
          <div style={{ padding: "12px 8px", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Role</div>
          {DAYS.map((d, i) => (
            <div key={d} style={{
              padding: "12px 4px", fontSize: 11, fontWeight: 600,
              color: i === today ? C.gold : "rgba(255,255,255,0.7)",
              textAlign: "center",
              background: i === today ? "rgba(184,134,11,0.15)" : "transparent"
            }}>{d}</div>
          ))}
        </div>

        {/* Department sections */}
        {depts.map(dept => {
          const rows = STAFF_SCHEDULE.filter(s => s.dept === dept);
          return (
            <div key={dept}>
              <div style={{
                background: `${C.beige}30`, padding: "8px 16px",
                borderTop: `1px solid ${C.beige}60`, borderBottom: `1px solid ${C.beige}40`
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.sidebar, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {dept}
                </span>
              </div>
              {rows.map((staff, ri) => (
                <div key={staff.name} style={{
                  display: "grid", gridTemplateColumns: "200px 100px repeat(7, 1fr)",
                  background: ri % 2 === 1 ? `${C.beige}12` : C.white,
                  borderBottom: `1px solid ${C.beige}30`
                }}>
                  <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", background: C.beige,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700, color: C.sidebar, flexShrink: 0
                    }}>
                      {staff.name.split(" ").map(w => w[0]).slice(0,2).join("")}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.charcoal }}>{staff.name}</span>
                  </div>
                  <div style={{ padding: "12px 8px", fontSize: 11, color: C.gray, display: "flex", alignItems: "center" }}>
                    {staff.role}
                  </div>
                  {staff.shifts.map((shift, di) => {
                    const ss = SHIFT_STYLE[shift];
                    return (
                      <div key={di} style={{
                        padding: "8px 4px", display: "flex", alignItems: "center", justifyContent: "center",
                        background: di === today ? "rgba(184,134,11,0.05)" : "transparent"
                      }}>
                        <div style={{
                          width: 32, height: 26, borderRadius: 6,
                          background: ss.bg, border: `1px solid ${ss.color}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10, fontWeight: 700, color: ss.color
                        }}>{ss.label}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 24 }}>
        {[
          { label: "Total Staff", value: STAFF_SCHEDULE.length },
          { label: "On Duty Today", value: STAFF_SCHEDULE.filter(s => s.shifts[today] !== "off").length },
          { label: "Morning Shift", value: STAFF_SCHEDULE.filter(s => s.shifts[today] === "morning").length },
          { label: "Night Shift",   value: STAFF_SCHEDULE.filter(s => s.shifts[today] === "night").length },
        ].map(s => (
          <div key={s.label} style={{
            background: C.white, borderRadius: 8, padding: "16px 20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)", textAlign: "center"
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.charcoal }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.gray }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════

export default function BackOfHouseApp() {
  const [activeScreen, setActiveScreen] = useState("b3-01");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string|null>(null);

  const handleDeptSelect = (dept: string) => { setSelectedDept(dept); setActiveScreen("b3-02"); };
  const handleBackToDeptBoard = () => setActiveScreen("b3-01");

  const SCREENS: Record<string, React.ReactNode> = {
    "b3-01": <HousekeepingDeptBoard onSelectDept={handleDeptSelect} />,
    "b3-02": <HousekeepingAssignmentGrid dept={selectedDept} onBack={handleBackToDeptBoard} />,
    "b3-03": <MaintenanceBoard />,
    "b3-04": <InventoryDashboard />,
    "b3-05": <RestaurantTablePlan />,
    "b3-06": <StaffShiftSchedule />,
  };

  const validScreen = SCREENS[activeScreen] ?? SCREENS["b3-01"];
  const screenId = SCREENS[activeScreen] ? activeScreen : "b3-01";

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      background: C.ivory, fontFamily: "'Inter', sans-serif"
    }}>
      <Sidebar
        active={activeScreen}
        onNav={setActiveScreen}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopHeader />
        <PageHeader screenId={screenId} onAction={() => {}} />

        <main style={{ flex: 1, overflowY: "auto", background: C.ivory }}>
          {validScreen}
        </main>
      </div>
    </div>
  );
}

