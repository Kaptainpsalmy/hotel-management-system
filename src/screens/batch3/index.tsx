import { useState, useRef, useCallback } from "react";
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
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: C.gold, display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0
        }}>
          <BedDouble size={18} color="#fff" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>Aryhills</div>
            <div style={{ color: C.beige, fontSize: 10, lineHeight: 1.2 }}>Hotel Management</div>
          </div>
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
// B3-01  HOUSEKEEPING TASK BOARD
// ═══════════════════════════════════════════════════════════════════════════════

type HKColumn = "toclean" | "cleaning" | "inspecting" | "done";
interface HKCard {
  id: string; roomNumber: string; floor: number;
  assignedTo: string; timeInStage: string; notes?: string; column: HKColumn;
}

const INIT_HK_CARDS: HKCard[] = [
  { id:"hk1",  roomNumber:"Room 101", floor:1, assignedTo:"Fatima Yusuf",    timeInStage:"0m",   column:"toclean"   },
  { id:"hk2",  roomNumber:"Room 205", floor:2, assignedTo:"Ngozi Eze",       timeInStage:"5m",   column:"toclean"   },
  { id:"hk3",  roomNumber:"Suite 310",floor:3, assignedTo:"Unassigned",      timeInStage:"2m",   notes:"VIP checkout", column:"toclean"},
  { id:"hk4",  roomNumber:"Room 112", floor:1, assignedTo:"Amaka Obi",       timeInStage:"18m",  column:"cleaning"  },
  { id:"hk5",  roomNumber:"Room 214", floor:2, assignedTo:"Halima Sule",     timeInStage:"22m",  column:"cleaning"  },
  { id:"hk6",  roomNumber:"Room 308", floor:3, assignedTo:"Fatima Yusuf",    timeInStage:"14m",  column:"cleaning"  },
  { id:"hk7",  roomNumber:"Suite 201",floor:2, assignedTo:"Ngozi Eze",       timeInStage:"8m",   column:"inspecting"},
  { id:"hk8",  roomNumber:"Room 115", floor:1, assignedTo:"Amaka Obi",       timeInStage:"6m",   notes:"Extra towels requested", column:"inspecting"},
  { id:"hk9",  roomNumber:"Room 104", floor:1, assignedTo:"Halima Sule",     timeInStage:"45m",  column:"done"      },
  { id:"hk10", roomNumber:"Room 207", floor:2, assignedTo:"Fatima Yusuf",    timeInStage:"38m",  column:"done"      },
  { id:"hk11", roomNumber:"Suite 402",floor:4, assignedTo:"Amaka Obi",       timeInStage:"52m",  column:"done"      },
];

const HK_COLUMNS: { id: HKColumn; label: string; color: string }[] = [
  { id: "toclean",   label: "To Clean",  color: C.gray  },
  { id: "cleaning",  label: "Cleaning",  color: C.amber },
  { id: "inspecting",label: "Inspecting",color: "#1565C0"},
  { id: "done",      label: "Done",      color: C.green },
];

function HousekeepingTaskBoard() {
  const [cards, setCards] = useState<HKCard[]>(INIT_HK_CARDS);
  const dragId = useRef<string | null>(null);

  const handleDragStart = (id: string) => { dragId.current = id; };
  const handleDrop = (col: HKColumn) => {
    if (!dragId.current) return;
    setCards(prev => prev.map(c => c.id === dragId.current ? { ...c, column: col } : c));
    dragId.current = null;
  };

  return (
    <div style={{ padding: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
      {HK_COLUMNS.map(col => {
        const colCards = cards.filter(c => c.column === col.id);
        return (
          <div
            key={col.id}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(col.id)}
            style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}
          >
            {/* Column header */}
            <div style={{
              background: C.white, borderRadius: 8, padding: "12px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              borderTop: `3px solid ${col.color}`
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.charcoal }}>{col.label}</span>
              <span style={{
                background: col.color + "20", color: col.color,
                fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999
              }}>{colCards.length}</span>
            </div>

            {/* Cards */}
            {colCards.map(card => (
              <div
                key={card.id}
                draggable
                onDragStart={() => handleDragStart(card.id)}
                style={{
                  background: C.white, borderRadius: 8, padding: 16,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  cursor: "grab", border: `1px solid ${C.beige}50`,
                  transition: "box-shadow 0.15s"
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)")}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                  <GripVertical size={14} color={C.beige} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>{card.roomNumber}</div>
                    <div style={{ fontSize: 11, color: C.gray }}>Floor {card.floor}</div>
                  </div>
                  <MoreVertical size={14} color={C.gray} style={{ cursor: "pointer" }} />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", background: C.beige,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 700, color: C.sidebar, flexShrink: 0
                  }}>
                    {card.assignedTo.split(" ").map(w => w[0]).slice(0,2).join("")}
                  </div>
                  <span style={{ fontSize: 12, color: C.charcoal }}>{card.assignedTo}</span>
                </div>

                {card.notes && (
                  <div style={{
                    background: "#FFF8E1", borderRadius: 6, padding: "4px 8px",
                    fontSize: 11, color: "#8B6914", marginBottom: 8
                  }}>★ {card.notes}</div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={11} color={C.gray} />
                  <span style={{ fontSize: 11, color: C.gray }}>{card.timeInStage} in stage</span>
                </div>
              </div>
            ))}

            {/* Empty state */}
            {colCards.length === 0 && (
              <div style={{
                background: `${col.color}08`, border: `2px dashed ${col.color}30`,
                borderRadius: 8, padding: 24, textAlign: "center"
              }}>
                <CheckCircle2 size={20} color={col.color} style={{ opacity: 0.4, margin: "0 auto 6px" }} />
                <div style={{ fontSize: 12, color: C.gray }}>No rooms in this stage</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// B3-02  HOUSEKEEPING ASSIGNMENT GRID
// ═══════════════════════════════════════════════════════════════════════════════

type RoomStatus = "available" | "occupied" | "cleaning" | "inspecting" | "toclean" | "done";

interface RoomCell {
  room: string; housekeeper: string; shift: "morning" | "afternoon" | "night";
  status: RoomStatus;
}

const HOUSEKEEPERS = ["Fatima Y.", "Ngozi E.", "Amaka O.", "Halima S.", "Chioma A."];
const SHIFTS: Array<"morning"|"afternoon"|"night"> = ["morning", "afternoon", "morning", "night", "afternoon"];

function makeGrid() {
  const floors = [1,2,3,4];
  const roomsPerFloor = [101,102,103,104,105,106];
  const statusPool: RoomStatus[] = ["available","occupied","cleaning","inspecting","toclean","done"];
  const grid: Record<number, RoomCell[]> = {};
  floors.forEach(f => {
    grid[f] = roomsPerFloor.map((base, i) => {
      const hIdx = (f + i) % HOUSEKEEPERS.length;
      return {
        room: `${f}0${i+1}`,
        housekeeper: HOUSEKEEPERS[hIdx],
        shift: SHIFTS[hIdx],
        status: statusPool[(f * 3 + i * 7) % statusPool.length],
      };
    });
  });
  return grid;
}

const GRID_DATA = makeGrid();

const ROOM_STATUS_COLORS: Record<RoomStatus, string> = {
  available:  C.green,
  occupied:   C.gold,
  cleaning:   C.amber,
  inspecting: "#1565C0",
  toclean:    C.gray,
  done:       C.green,
};

function HousekeepingAssignmentGrid() {
  const [filterShift, setFilterShift] = useState<string>("all");
  const [selectedRoom, setSelectedRoom] = useState<RoomCell | null>(null);

  return (
    <div style={{ padding: 32 }}>
      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, alignItems: "center" }}>
        <Filter size={14} color={C.gray} />
        <span style={{ fontSize: 12, color: C.gray, marginRight: 4 }}>Filter by shift:</span>
        {["all","morning","afternoon","night"].map(s => (
          <button key={s} onClick={() => setFilterShift(s)} style={{
            padding: "4px 14px", borderRadius: 999, border: "none", cursor: "pointer",
            fontSize: 12, fontWeight: 500,
            background: filterShift === s ? C.gold : C.white,
            color: filterShift === s ? "#fff" : C.gray,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
          }}>
            {s === "all" ? "All Shifts" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}

        {/* Legend */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          {(["available","occupied","cleaning","inspecting","toclean"] as RoomStatus[]).map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: ROOM_STATUS_COLORS[s] }} />
              <span style={{ fontSize: 11, color: C.gray }}>{STATUS_MAP[s]?.label ?? s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ background: C.white, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        {/* Header row */}
        <div style={{ display: "grid", gridTemplateColumns: "80px repeat(6, 1fr)", background: C.sidebar }}>
          <div style={{ padding: "12px 16px", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Floor</div>
          {[1,2,3,4,5,6].map(r => (
            <div key={r} style={{ padding: "12px 8px", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>
              Room {String(r).padStart(2, "0")}
            </div>
          ))}
        </div>

        {[1,2,3,4].map((floor, fi) => (
          <div key={floor} style={{
            display: "grid", gridTemplateColumns: "80px repeat(6, 1fr)",
            background: fi % 2 === 1 ? `${C.beige}18` : C.white,
            borderTop: `1px solid ${C.beige}40`
          }}>
            <div style={{
              padding: "14px 16px", fontSize: 13, fontWeight: 600, color: C.charcoal,
              display: "flex", alignItems: "center"
            }}>Floor {floor}</div>
            {GRID_DATA[floor].map((cell, ci) => {
              if (filterShift !== "all" && cell.shift !== filterShift) return (
                <div key={ci} style={{ padding: 12, opacity: 0.3 }}>
                  <div style={{ fontSize: 11, color: C.gray, textAlign: "center" }}>—</div>
                </div>
              );
              return (
                <div key={ci}
                  onClick={() => setSelectedRoom(cell)}
                  style={{
                    padding: "10px 8px", cursor: "pointer", borderLeft: `1px solid ${C.beige}40`,
                    transition: "background 0.15s"
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${C.beige}30`)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: ROOM_STATUS_COLORS[cell.status], flexShrink: 0
                    }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.charcoal }}>
                      {floor}{String(ci+1).padStart(2,"0")}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: C.charcoal, marginBottom: 2 }}>{cell.housekeeper}</div>
                  <StatusBadge status={cell.shift} />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {selectedRoom && (
        <div style={{
          position: "fixed", right: 0, top: 0, bottom: 0, width: 320,
          background: C.white, boxShadow: "-4px 0 20px rgba(0,0,0,0.12)",
          padding: 24, zIndex: 50, overflowY: "auto"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: C.charcoal, margin: 0 }}>Room {selectedRoom.room}</h2>
            <button onClick={() => setSelectedRoom(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <X size={20} color={C.gray} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: C.ivory, borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>STATUS</div>
              <StatusBadge status={selectedRoom.status} />
            </div>
            <div style={{ background: C.ivory, borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>ASSIGNED HOUSEKEEPER</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>{selectedRoom.housekeeper}</div>
            </div>
            <div style={{ background: C.ivory, borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>SHIFT</div>
              <StatusBadge status={selectedRoom.shift} />
            </div>
            <button style={{
              background: C.gold, color: "#fff", border: "none", borderRadius: 8,
              padding: "12px", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 8
            }}>Reassign Housekeeper</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// B3-03  MAINTENANCE WORK ORDER BOARD
// ═══════════════════════════════════════════════════════════════════════════════

type MaintCol = "reported" | "assigned" | "inprogress" | "done";
type Priority = "low" | "medium" | "high";

interface MaintCard {
  id: string; roomNumber: string; issueType: string;
  description: string; priority: Priority;
  assignedTo?: string; reportedAt: string; column: MaintCol;
}

const INIT_MAINT: MaintCard[] = [
  { id:"m1",  roomNumber:"Room 302", issueType:"Plumbing",    description:"Shower head leaking continuously",      priority:"high",   reportedAt:"07:14",  column:"reported"  },
  { id:"m2",  roomNumber:"Room 118", issueType:"Electrical",  description:"Air conditioner not cooling",            priority:"medium", reportedAt:"08:02",  column:"reported"  },
  { id:"m3",  roomNumber:"Suite 401",issueType:"Furniture",   description:"Broken desk chair armrest",              priority:"low",    reportedAt:"09:30",  column:"reported"  },
  { id:"m4",  roomNumber:"Room 215", issueType:"Plumbing",    description:"Toilet cistern running non-stop",        priority:"medium", assignedTo:"Emeka Nwosu", reportedAt:"06:50", column:"assigned"},
  { id:"m5",  roomNumber:"Room 103", issueType:"Electrical",  description:"Bedside lamp faulty – bulb replaced ok", priority:"low",    assignedTo:"Bode Afolabi", reportedAt:"07:22", column:"assigned"},
  { id:"m6",  roomNumber:"Room 404", issueType:"HVAC",        description:"Strange noise from ceiling fan",         priority:"medium", assignedTo:"Emeka Nwosu", reportedAt:"08:45", column:"inprogress"},
  { id:"m7",  roomNumber:"Suite 310",issueType:"Plumbing",    description:"Hot water intermittent – 3rd complaint", priority:"high",   assignedTo:"Tunde Bello",  reportedAt:"06:10", column:"inprogress"},
  { id:"m8",  roomNumber:"Room 206", issueType:"Furniture",   description:"TV remote missing",                      priority:"low",    assignedTo:"Bode Afolabi", reportedAt:"09:00", column:"done"},
  { id:"m9",  roomNumber:"Room 109", issueType:"Electrical",  description:"Bathroom light flickering",              priority:"medium", assignedTo:"Tunde Bello",  reportedAt:"05:30", column:"done"},
];

const MAINT_COLUMNS: { id: MaintCol; label: string; color: string }[] = [
  { id:"reported",   label:"Reported",    color: C.red   },
  { id:"assigned",   label:"Assigned",    color: C.amber },
  { id:"inprogress", label:"In Progress", color: "#1565C0"},
  { id:"done",       label:"Done",        color: C.green },
];

const PRIORITY_STYLE: Record<Priority, { bg: string; color: string; label: string }> = {
  high:   { bg: "#FFEBEE", color: C.red,   label: "High Priority" },
  medium: { bg: "#FFF8E1", color: C.amber, label: "Medium" },
  low:    { bg: "#E8F5E9", color: C.green, label: "Low" },
};

function MaintenanceBoard() {
  const [cards, setCards] = useState<MaintCard[]>(INIT_MAINT);
  const dragId = useRef<string | null>(null);

  const handleDrop = (col: MaintCol) => {
    if (!dragId.current) return;
    setCards(prev => prev.map(c => c.id === dragId.current ? { ...c, column: col } : c));
    dragId.current = null;
  };

  return (
    <div style={{ padding: 32, display: "flex", gap: 20, alignItems: "flex-start" }}>
      {MAINT_COLUMNS.map(col => {
        const colCards = cards.filter(c => c.column === col.id);
        return (
          <div
            key={col.id}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(col.id)}
            style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}
          >
            <div style={{
              background: C.white, borderRadius: 8, padding: "12px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              borderTop: `3px solid ${col.color}`
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.charcoal }}>{col.label}</span>
              <span style={{
                background: col.color + "20", color: col.color,
                fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999
              }}>{colCards.length}</span>
            </div>

            {colCards.map(card => {
              const pri = PRIORITY_STYLE[card.priority];
              return (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => { dragId.current = card.id; }}
                  style={{
                    background: C.white, borderRadius: 8, padding: 16,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    cursor: "grab", border: `1px solid ${C.beige}50`,
                    transition: "box-shadow 0.15s"
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)")}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <GripVertical size={13} color={C.beige} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>{card.roomNumber}</span>
                    </div>
                    <span style={{
                      background: pri.bg, color: pri.color,
                      fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999
                    }}>{pri.label}</span>
                  </div>

                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.gold, marginBottom: 2 }}>{card.issueType}</div>
                    <div style={{ fontSize: 12, color: C.charcoal, lineHeight: 1.5 }}>{card.description}</div>
                  </div>

                  {card.assignedTo && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%", background: C.beige,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 8, fontWeight: 700, color: C.sidebar
                      }}>
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
              <div style={{
                background: `${col.color}08`, border: `2px dashed ${col.color}30`,
                borderRadius: 8, padding: 24, textAlign: "center"
              }}>
                <CheckCircle2 size={18} color={col.color} style={{ opacity: 0.4, margin: "0 auto 6px" }} />
                <div style={{ fontSize: 12, color: C.gray }}>No tickets here</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// B3-04  INVENTORY DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

interface InvItem {
  id: string; name: string; category: string;
  current: number; min: number; unit: string; lastOrdered: string;
}

const INVENTORY: InvItem[] = [
  // Linen
  { id:"i1",  name:"Bath Towels (Large)",     category:"Linen",      current:180, min:100, unit:"pcs", lastOrdered:"15 Jun 2026" },
  { id:"i2",  name:"Hand Towels",             category:"Linen",      current:42,  min:80,  unit:"pcs", lastOrdered:"10 Jun 2026" },
  { id:"i3",  name:"Bed Sheets (King)",       category:"Linen",      current:95,  min:60,  unit:"sets", lastOrdered:"18 Jun 2026" },
  { id:"i4",  name:"Bed Sheets (Queen)",      category:"Linen",      current:28,  min:50,  unit:"sets", lastOrdered:"05 Jun 2026" },
  { id:"i5",  name:"Pillow Cases",            category:"Linen",      current:220, min:100, unit:"pcs", lastOrdered:"20 Jun 2026" },
  // Toiletries
  { id:"i6",  name:"Shampoo (50ml)",          category:"Toiletries", current:310, min:200, unit:"units", lastOrdered:"22 Jun 2026" },
  { id:"i7",  name:"Body Lotion (50ml)",      category:"Toiletries", current:55,  min:150, unit:"units", lastOrdered:"01 Jun 2026" },
  { id:"i8",  name:"Soap Bars (100g)",        category:"Toiletries", current:400, min:200, unit:"units", lastOrdered:"24 Jun 2026" },
  { id:"i9",  name:"Dental Kits",            category:"Toiletries", current:180, min:100, unit:"kits", lastOrdered:"17 Jun 2026" },
  { id:"i10", name:"Shower Caps",            category:"Toiletries", current:30,  min:100, unit:"pcs", lastOrdered:"28 May 2026" },
  // F&B Supplies
  { id:"i11", name:"Arabica Coffee (1kg)",   category:"F&B",        current:12,  min:20,  unit:"bags", lastOrdered:"20 Jun 2026" },
  { id:"i12", name:"Assorted Tea Bags",      category:"F&B",        current:800, min:400, unit:"bags", lastOrdered:"15 Jun 2026" },
  { id:"i13", name:"UHT Milk (1L)",          category:"F&B",        current:45,  min:30,  unit:"cartons", lastOrdered:"24 Jun 2026" },
  { id:"i14", name:"Still Water (500ml)",    category:"F&B",        current:90,  min:120, unit:"bottles", lastOrdered:"23 Jun 2026" },
  { id:"i15", name:"Fruit Juice (1L)",       category:"F&B",        current:18,  min:40,  unit:"cartons", lastOrdered:"10 Jun 2026" },
  // Cleaning
  { id:"i16", name:"Floor Cleaner (5L)",     category:"Cleaning",   current:22,  min:15,  unit:"bottles", lastOrdered:"18 Jun 2026" },
  { id:"i17", name:"Disinfectant Spray",     category:"Cleaning",   current:8,   min:20,  unit:"cans", lastOrdered:"12 Jun 2026" },
  { id:"i18", name:"Bin Liners (Medium)",    category:"Cleaning",   current:500, min:200, unit:"pcs", lastOrdered:"20 Jun 2026" },
];

const CAT_ICONS: Record<string, React.ReactNode> = {
  Linen:     <Layers size={16} />,
  Toiletries:<Coffee size={16} />,
  "F&B":     <Utensils size={16} />,
  Cleaning:  <RefreshCw size={16} />,
};

function InventoryDashboard() {
  const [items, setItems] = useState<InvItem[]>(INVENTORY);
  const [filterCat, setFilterCat] = useState("All");
  const [reordered, setReordered] = useState<Set<string>>(new Set());
  const categories = ["All", ...Array.from(new Set(INVENTORY.map(i => i.category)))];

  const isLow = (item: InvItem) => item.current < item.min;
  const pct = (item: InvItem) => Math.min(100, Math.round((item.current / (item.min * 2)) * 100));

  const filtered = items.filter(i => filterCat === "All" || i.category === filterCat);
  const lowCount = items.filter(isLow).length;

  const handleReorder = (id: string) => {
    setReordered(prev => new Set([...prev, id]));
  };

  return (
    <div style={{ padding: 32 }}>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total SKUs", value: items.length, icon: <Package size={20} />, color: C.gold },
          { label: "Low Stock Items", value: lowCount, icon: <AlertTriangle size={20} />, color: C.amber },
          { label: "Reorders Pending", value: reordered.size, icon: <ShoppingCart size={20} />, color: C.green },
          { label: "Categories", value: categories.length - 1, icon: <Layers size={20} />, color: "#1565C0" },
        ].map(s => (
          <div key={s.label} style={{
            background: C.white, borderRadius: 8, padding: "20px 24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 16
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 8, background: s.color + "18",
              display: "flex", alignItems: "center", justifyContent: "center", color: s.color
            }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.charcoal }}>{s.value}</div>
              <div style={{ fontSize: 12, color: C.gray }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)} style={{
            padding: "6px 16px", borderRadius: 999, border: "none", cursor: "pointer",
            fontSize: 12, fontWeight: 500,
            background: filterCat === cat ? C.gold : C.white,
            color: filterCat === cat ? "#fff" : C.gray,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: C.white, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.sidebar }}>
              {["Item", "Category", "Current Stock", "Min Required", "Stock Level", "Last Ordered", "Action"].map(h => (
                <th key={h} style={{
                  padding: "12px 16px", textAlign: "left", fontSize: 11,
                  fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.04em"
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const low = isLow(item);
              const p = pct(item);
              const ordered = reordered.has(item.id);
              return (
                <tr key={item.id} style={{
                  background: i % 2 === 1 ? `${C.beige}18` : C.white,
                  borderBottom: `1px solid ${C.beige}40`,
                  ...(low && !ordered ? { background: "#FFF8E1" } : {})
                }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {low && !ordered && <AlertTriangle size={13} color={C.amber} />}
                      <span style={{ fontSize: 13, fontWeight: 500, color: C.charcoal }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.gray, fontSize: 12 }}>
                      {CAT_ICONS[item.category]}
                      {item.category}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: low && !ordered ? C.amber : C.charcoal }}>
                      {item.current} <span style={{ fontSize: 11, color: C.gray, fontWeight: 400 }}>{item.unit}</span>
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: C.gray }}>
                    {item.min} {item.unit}
                  </td>
                  <td style={{ padding: "14px 16px", width: 140 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: "#E0E0E0", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{
                          height: "100%", borderRadius: 3,
                          width: `${p}%`,
                          background: low ? C.amber : C.green,
                          transition: "width 0.3s"
                        }} />
                      </div>
                      <span style={{ fontSize: 11, color: C.gray, width: 30 }}>{p}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: C.gray }}>{item.lastOrdered}</td>
                  <td style={{ padding: "14px 16px" }}>
                    {low && !ordered ? (
                      <button onClick={() => handleReorder(item.id)} style={{
                        background: C.amber, color: "#fff", border: "none", borderRadius: 6,
                        padding: "6px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 5
                      }}>
                        <ShoppingCart size={12} /> Reorder
                      </button>
                    ) : ordered ? (
                      <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>✓ Ordered</span>
                    ) : (
                      <button style={{
                        background: "transparent", color: C.gray, border: `1px solid ${C.beige}`,
                        borderRadius: 6, padding: "5px 12px", fontSize: 11, cursor: "pointer"
                      }}>View</button>
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

  const SCREENS: Record<string, React.ReactNode> = {
    "b3-01": <HousekeepingTaskBoard />,
    "b3-02": <HousekeepingAssignmentGrid />,
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

