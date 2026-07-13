import React, { useState } from "react";
import {
  Megaphone, Clock, FileText, Wallet,
  ArrowLeft, Plus, X, ChevronRight, ChevronDown,
  CheckCircle, AlertTriangle, Info, Pin,
  Calendar, Printer, Download,
  ArrowUpRight, ArrowDownLeft, LogIn, LogOut,
  Users, Menu as MenuIcon, User, Bell,
  Building, TrendingUp, Search,
} from "lucide-react";

// ─── Colors ──────────────────────────────────────────────────────────────────

const C = {
  brown: "#4E342E",
  gold:  "#B8860B",
  beige: "#D6C5A4",
  ivory: "#F8F6F2",
  char:  "#2D2D2D",
  gray:  "#6C757D",
  green: "#2E7D32",
  amber: "#F4A300",
  red:   "#D32F2F",
  blue:  "#1565C0",
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = "home" | "announcements" | "clocking" | "salary" | "slip" | "wallet";
type Priority = "urgent" | "info" | "general";
type TxType = "credit" | "debit";

interface Employee {
  id: number; name: string; initials: string; role: string; dept: string;
  basic: number; housing: number; transport: number; meal: number; overtime: number;
  tax: number; pension: number; lateDeduction: number; walletBalance: number;
}
interface Announcement {
  id: number; title: string; body: string; author: string; dept: string;
  priority: Priority; date: string; pinned: boolean;
}
interface ClockEntry {
  employeeId: number; clockIn: string | null; clockOut: string | null;
  status: "present" | "late" | "absent";
}
interface Transaction {
  id: number; type: TxType; desc: string; amount: number; date: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EMPLOYEES: Employee[] = [
  { id: 1, name: "Adebayo Okonkwo",  initials: "AO", role: "Front Desk Manager",  dept: "Front Office",   basic: 180000, housing: 45000, transport: 20000, meal: 15000, overtime: 12000, tax: 27200, pension: 14400, lateDeduction: 0,    walletBalance: 42500 },
  { id: 2, name: "Fatima Musa",       initials: "FM", role: "Receptionist",         dept: "Front Office",   basic: 95000,  housing: 24000, transport: 15000, meal: 10000, overtime: 0,     tax: 14400, pension: 7600,  lateDeduction: 2000, walletBalance: 18700 },
  { id: 3, name: "Chukwuemeka Obi",  initials: "CO", role: "Head Chef",            dept: "F&B",            basic: 220000, housing: 55000, transport: 25000, meal: 20000, overtime: 28000, tax: 34800, pension: 17600, lateDeduction: 0,    walletBalance: 65000 },
  { id: 4, name: "Ngozi Adeyemi",    initials: "NA", role: "Housekeeper",          dept: "Housekeeping",   basic: 75000,  housing: 18000, transport: 12000, meal: 8000,  overtime: 5000,  tax: 10800, pension: 6000,  lateDeduction: 1500, walletBalance: 8200  },
  { id: 5, name: "Seun Akintola",    initials: "SA", role: "Security Officer",     dept: "Security",       basic: 80000,  housing: 20000, transport: 12000, meal: 8000,  overtime: 8000,  tax: 11600, pension: 6400,  lateDeduction: 0,    walletBalance: 12400 },
  { id: 6, name: "Amaka Eze",        initials: "AE", role: "Spa Therapist",        dept: "Spa & Wellness", basic: 110000, housing: 28000, transport: 15000, meal: 10000, overtime: 15000, tax: 17200, pension: 8800,  lateDeduction: 0,    walletBalance: 29800 },
  { id: 7, name: "Tunde Fashola",    initials: "TF", role: "Maintenance Tech",     dept: "Facilities",     basic: 90000,  housing: 22000, transport: 15000, meal: 10000, overtime: 6000,  tax: 13600, pension: 7200,  lateDeduction: 0,    walletBalance: 21500 },
  { id: 8, name: "Blessing Okoro",   initials: "BO", role: "Waitress",             dept: "F&B",            basic: 70000,  housing: 18000, transport: 10000, meal: 8000,  overtime: 0,     tax: 10400, pension: 5600,  lateDeduction: 3000, walletBalance: 5600  },
];

const INIT_ANNOUNCEMENTS: Announcement[] = [
  { id: 1, title: "July Salary Processing — Important Notice",       body: "Salary for July 2026 will be processed and credited to all employee wallets on Friday 25th July by 5:00 PM. Please ensure your wallet details are up to date by Wednesday 23rd July.",                                                                          author: "General Manager",    dept: "All Staff",          priority: "urgent",  date: "Jul 10, 2026", pinned: true  },
  { id: 2, title: "Staff Appreciation Dinner — Saturday 19th July", body: "Management cordially invites all staff to the monthly Staff Appreciation Dinner this Saturday at 7:00 PM in the Jade Restaurant. Attendance is mandatory for all Heads of Department.",                                                                          author: "HR Department",      dept: "All Staff",          priority: "info",    date: "Jul 9, 2026",  pinned: true  },
  { id: 3, title: "New Uniform Distribution — Collect This Week",   body: "New uniforms are available for collection from the Laundry & Linen Room on the Ground Floor. Please bring your old uniform for exchange. Distribution runs Monday–Friday, 8 AM–4 PM.",                                                                            author: "HR Department",      dept: "All Staff",          priority: "general", date: "Jul 8, 2026",  pinned: false },
  { id: 4, title: "Pool Closed for Maintenance: Jul 14–16",         body: "The swimming pool will be closed for maintenance Monday 14th to Wednesday 16th July. All guest-facing staff must proactively inform guests and offer apologies for the inconvenience.",                                                                             author: "Facilities Manager", dept: "Front Office, F&B",  priority: "info",    date: "Jul 7, 2026",  pinned: false },
  { id: 5, title: "Health & Hygiene Protocol Reminder",             body: "All staff must continue to adhere to hotel health and hygiene protocols at all times: regular handwashing, sanitiser use, and reporting any illness to your HOD before reporting to work. Thank you for your cooperation.",                                          author: "HR Department",      dept: "All Staff",          priority: "general", date: "Jul 5, 2026",  pinned: false },
];

const CLOCK_LOG: ClockEntry[] = [
  { employeeId: 1, clockIn: "7:58 AM",  clockOut: null,       status: "present" },
  { employeeId: 2, clockIn: "8:34 AM",  clockOut: null,       status: "late"    },
  { employeeId: 3, clockIn: "7:00 AM",  clockOut: "3:00 PM",  status: "present" },
  { employeeId: 4, clockIn: "9:05 AM",  clockOut: null,       status: "late"    },
  { employeeId: 5, clockIn: "7:52 AM",  clockOut: "4:00 PM",  status: "present" },
  { employeeId: 6, clockIn: "9:00 AM",  clockOut: null,       status: "present" },
  { employeeId: 7, clockIn: "8:02 AM",  clockOut: null,       status: "present" },
  { employeeId: 8, clockIn: null,       clockOut: null,       status: "absent"  },
];

const WALLET_TX: Transaction[] = [
  { id: 1, type: "credit", desc: "June 2026 Salary Credit",       amount: 230400, date: "Jun 25, 2026" },
  { id: 2, type: "debit",  desc: "Salary Advance Repayment",       amount: 50000,  date: "Jun 25, 2026" },
  { id: 3, type: "credit", desc: "Overtime Bonus — June",           amount: 12000,  date: "Jun 20, 2026" },
  { id: 4, type: "debit",  desc: "Bank Withdrawal — GTB *4821",    amount: 150000, date: "Jun 15, 2026" },
  { id: 5, type: "credit", desc: "Tips Pool Distribution",          amount: 8500,   date: "Jun 10, 2026" },
  { id: 6, type: "debit",  desc: "Bank Withdrawal — GTB *4821",    amount: 80000,  date: "Jun 5, 2026"  },
  { id: 7, type: "credit", desc: "May 2026 Salary Credit",         amount: 218400, date: "May 25, 2026" },
  { id: 8, type: "debit",  desc: "Salary Advance Disbursement",    amount: 100000, date: "May 18, 2026" },
];

const MONTHS = ["July 2026", "June 2026", "May 2026", "April 2026"];

const PRIORITY_CFG: Record<Priority, { color: string; bg: string; label: string; Icon: React.ElementType }> = {
  urgent:  { color: C.red,   bg: "rgba(211,47,47,0.1)",   label: "Urgent",  Icon: AlertTriangle },
  info:    { color: C.blue,  bg: "rgba(21,101,192,0.1)",  label: "Info",    Icon: Info          },
  general: { color: C.green, bg: "rgba(46,125,50,0.1)",   label: "General", Icon: CheckCircle   },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt  = (n: number) => `₦${n.toLocaleString()}`;
const gross      = (e: Employee) => e.basic + e.housing + e.transport + e.meal + e.overtime;
const totalDeduc = (e: Employee) => e.tax + e.pension + e.lateDeduction;
const netPay     = (e: Employee) => gross(e) - totalDeduc(e);

// ─── App ─────────────────────────────────────────────────────────────────────

export default function StaffHRApp() {
  const [screen, setScreen]               = useState<Screen>("home");
  const [selectedEmp, setSelectedEmp]     = useState<Employee>(EMPLOYEES[0]);
  const [clockedIn, setClockedIn]         = useState(true);
  const [clockInTime]                     = useState("7:58 AM");
  const [filter, setFilter]               = useState<"all" | Priority | "pinned">("all");
  const [showCompose, setShowCompose]     = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INIT_ANNOUNCEMENTS);
  const [newTitle, setNewTitle]           = useState("");
  const [newBody, setNewBody]             = useState("");
  const [newPriority, setNewPriority]     = useState<Priority>("general");
  const [newDept, setNewDept]             = useState("All Staff");
  const [selectedMonth, setSelectedMonth] = useState("July 2026");
  const [processed, setProcessed]         = useState<Set<number>>(new Set([3, 5]));
  const [mobileMenu, setMobileMenu]       = useState(false);
  const [walletEmpId, setWalletEmpId]     = useState(1);

  const goTo = (s: Screen, emp?: Employee) => {
    if (emp) setSelectedEmp(emp);
    setScreen(s);
    window.scrollTo(0, 0);
  };

  const walletEmp = EMPLOYEES.find(e => e.id === walletEmpId) ?? EMPLOYEES[0];
  const presentCount = CLOCK_LOG.filter(c => c.status === "present").length;
  const lateCount    = CLOCK_LOG.filter(c => c.status === "late").length;
  const absentCount  = CLOCK_LOG.filter(c => c.status === "absent").length;
  const totalPayroll = EMPLOYEES.reduce((s, e) => s + netPay(e), 0);
  const totalWallet  = EMPLOYEES.reduce((s, e) => s + e.walletBalance, 0);

  const filteredAnnouncements = announcements.filter(a => {
    if (filter === "all")    return true;
    if (filter === "pinned") return a.pinned;
    return a.priority === filter;
  });

  const processAll = () => setProcessed(new Set(EMPLOYEES.map(e => e.id)));

  const postAnnouncement = () => {
    if (!newTitle.trim() || !newBody.trim()) return;
    setAnnouncements(prev => [{
      id: Date.now(), title: newTitle, body: newBody,
      author: "HR Department", dept: newDept,
      priority: newPriority, date: "Jul 13, 2026", pinned: false,
    }, ...prev]);
    setNewTitle(""); setNewBody(""); setNewPriority("general");
    setShowCompose(false);
  };

  // ── Shared ────────────────────────────────────────────────────────────────

  const Avatar = ({ emp, size = 40 }: { emp: Employee; size?: number }) => (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: C.brown, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ color: C.gold, fontWeight: 700, fontSize: size * 0.32 }}>{emp.initials}</span>
    </div>
  );

  const Chip = ({ label, color, bg }: { label: string; color: string; bg: string }) => (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 99, color, backgroundColor: bg }}>{label}</span>
  );

  const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", ...style }}>{children}</div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontWeight: 700, fontSize: 15, color: C.char, marginBottom: 16, marginTop: 0 }}>{children}</h2>
  );

  const GoldBtn = ({ label, onClick, disabled = false, size = "md", style: ext = {} }: { label: string; onClick: () => void; disabled?: boolean; size?: "sm" | "md" | "lg"; style?: React.CSSProperties }) => (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? C.beige : C.gold, color: "#fff", border: "none", cursor: disabled ? "not-allowed" : "pointer",
      borderRadius: 99, fontWeight: 700, opacity: disabled ? 0.7 : 1,
      padding: size === "lg" ? "14px 28px" : size === "sm" ? "7px 16px" : "10px 22px",
      fontSize: size === "sm" ? 12 : 14, ...ext,
    }}>{label}</button>
  );

  const BrownBtn = ({ label, onClick, style: ext = {} }: { label: string; onClick: () => void; style?: React.CSSProperties }) => (
    <button onClick={onClick} style={{ background: C.brown, color: "#fff", border: "none", cursor: "pointer", borderRadius: 99, fontWeight: 600, padding: "10px 22px", fontSize: 14, ...ext }}>{label}</button>
  );

  const OutlineBtn = ({ label, onClick, style: ext = {} }: { label: string; onClick: () => void; style?: React.CSSProperties }) => (
    <button onClick={onClick} style={{ background: "transparent", color: C.char, border: `1.5px solid ${C.beige}`, cursor: "pointer", borderRadius: 99, fontWeight: 600, padding: "9px 20px", fontSize: 14, ...ext }}>{label}</button>
  );

  const StatCard = ({ label, value, sub, color = C.char }: { label: string; value: string; sub?: string; color?: string }) => (
    <div style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
      <p style={{ fontSize: 12, color: C.gray, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 700, color, marginBottom: 2 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: C.gray }}>{sub}</p>}
    </div>
  );

  // ── Navbar ────────────────────────────────────────────────────────────────

  const navLinks: { label: string; s: Screen }[] = [
    { label: "Announcements", s: "announcements" },
    { label: "Clocking",      s: "clocking"      },
    { label: "Salary",        s: "salary"        },
    { label: "Wallet",        s: "wallet"        },
  ];

  const navbar = (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: C.brown, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64 }}>
      <button onClick={() => goTo("home")} style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer" }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>A</span>
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "0.04em", lineHeight: 1 }}>ARYHILLS</div>
          <div style={{ color: C.beige, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", lineHeight: 1, marginTop: 2 }}>Staff & HR</div>
        </div>
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden md:flex">
        {navLinks.map(({ label, s }) => (
          <button key={s} onClick={() => goTo(s)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: screen === s ? "#fff" : C.beige }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", borderRadius: 99, padding: "6px 14px 6px 8px" }}>
          <Avatar emp={EMPLOYEES[0]} size={24} />
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Adebayo O.</span>
        </div>
        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: C.beige }}>
          {mobileMenu ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {mobileMenu && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: C.brown, borderTop: `1px solid rgba(214,197,164,0.15)`, padding: "8px 24px 16px" }}>
          {navLinks.map(({ label, s }) => (
            <button key={s} onClick={() => { goTo(s); setMobileMenu(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: C.beige, fontSize: 14, fontWeight: 600, padding: "12px 0", borderBottom: `1px solid rgba(214,197,164,0.1)` }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  // ── Home Screen ───────────────────────────────────────────────────────────

  const homeScreen = (
    <div style={{ paddingTop: 64, minHeight: "100vh", background: C.ivory }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.brown} 0%, #6D3B30 100%)`, padding: "36px 24px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: C.beige, fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Staff & HR Hub</p>
          <h1 style={{ color: "#fff", fontSize: 30, fontWeight: 700, marginBottom: 4 }}>Good morning, Adebayo 👋</h1>
          <p style={{ color: C.beige, fontSize: 14 }}>Sunday, 13 July 2026 · Shift: Morning (7 AM – 3 PM)</p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: -24 }}>
          <StatCard label="Total Staff"      value="8"              sub="Active employees"          />
          <StatCard label="Present Today"    value={String(presentCount + lateCount)} sub={`${lateCount} arrived late`} color={C.green} />
          <StatCard label="July Payroll"     value={fmt(totalPayroll)} sub="Total net pay"          color={C.gold}  />
          <StatCard label="Wallet Balances"  value={fmt(totalWallet)}  sub="Across all staff"       color={C.brown} />
        </div>

        {/* Feature tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginTop: 28 }}>
          {[
            { icon: Megaphone, label: "Announcement Board",    sub: `${announcements.length} posts · ${announcements.filter(a => a.pinned).length} pinned`, s: "announcements" as Screen, urgent: announcements.some(a => a.priority === "urgent") },
            { icon: Clock,     label: "Employee Clocking",     sub: `${presentCount} present · ${lateCount} late · ${absentCount} absent`, s: "clocking"      as Screen, urgent: absentCount > 0 },
            { icon: FileText,  label: "Salary Processing",     sub: `${selectedMonth} · ${processed.size} of ${EMPLOYEES.length} processed`, s: "salary" as Screen, urgent: processed.size < EMPLOYEES.length },
            { icon: Wallet,    label: "Employee Wallet",       sub: `Total balance ${fmt(totalWallet)}`, s: "wallet" as Screen, urgent: false },
          ].map(({ icon: Icon, label, sub, s, urgent }) => (
            <button key={s} onClick={() => goTo(s)}
              style={{ background: "#fff", border: urgent ? `2px solid ${C.gold}` : `1.5px solid rgba(78,52,46,0.1)`, borderRadius: 16, padding: "24px 20px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 12, transition: "box-shadow 0.2s", position: "relative" }}>
              {urgent && <span style={{ position: "absolute", top: 14, right: 14, width: 8, height: 8, borderRadius: "50%", background: C.gold }} />}
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(78,52,46,0.08)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={22} color={C.brown} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: C.char, marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 12, color: C.gray }}>{sub}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: C.gold, fontSize: 13, fontWeight: 600 }}>
                Open <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>

        {/* Recent announcements preview */}
        <div style={{ marginTop: 28, marginBottom: 40 }}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <SectionTitle>Recent Announcements</SectionTitle>
              <button onClick={() => goTo("announcements")} style={{ fontSize: 13, color: C.gold, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>View all →</button>
            </div>
            {announcements.slice(0, 3).map(a => {
              const cfg = PRIORITY_CFG[a.priority];
              return (
                <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <cfg.Icon size={16} color={cfg.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 13, color: C.char, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</p>
                    <p style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{a.author} · {a.date}</p>
                  </div>
                  <Chip label={cfg.label} color={cfg.color} bg={cfg.bg} />
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </div>
  );

  // ── Announcements Screen ──────────────────────────────────────────────────

  const announcementsScreen = (
    <div style={{ paddingTop: 64, minHeight: "100vh", background: C.ivory }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: 24, color: C.char, margin: 0 }}>Announcement Board</h1>
            <p style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>{announcements.length} posts · July 2026</p>
          </div>
          <GoldBtn label="+ New Post" onClick={() => setShowCompose(true)} />
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 20 }}>
          {(["all", "pinned", "urgent", "info", "general"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ flexShrink: 0, padding: "7px 18px", borderRadius: 99, border: "1.5px solid", borderColor: filter === f ? C.brown : C.beige, background: filter === f ? C.brown : "#fff", color: filter === f ? "#fff" : C.char, fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
              {f === "all" ? "All" : f === "pinned" ? "📌 Pinned" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Pinned banner */}
        {filter === "all" && announcements.some(a => a.pinned) && (
          <div style={{ background: `rgba(184,134,11,0.08)`, border: `1px solid rgba(184,134,11,0.3)`, borderRadius: 12, padding: "10px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Pin size={14} color={C.gold} />
            <span style={{ fontSize: 13, color: C.brown, fontWeight: 600 }}>Pinned announcements are shown first</span>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filteredAnnouncements.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 24px", color: C.gray }}>
              <Megaphone size={36} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
              <p style={{ fontWeight: 600 }}>No announcements here</p>
            </div>
          ) : filteredAnnouncements.map(a => {
            const cfg = PRIORITY_CFG[a.priority];
            return (
              <Card key={a.id} style={{ border: a.pinned ? `1.5px solid ${C.beige}` : "1.5px solid transparent", position: "relative" }}>
                {a.pinned && (
                  <div style={{ position: "absolute", top: 16, right: 16, display: "flex", alignItems: "center", gap: 4 }}>
                    <Pin size={12} color={C.gold} />
                    <span style={{ fontSize: 11, color: C.gold, fontWeight: 700 }}>Pinned</span>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <cfg.Icon size={20} color={cfg.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                      <Chip label={cfg.label} color={cfg.color} bg={cfg.bg} />
                      <span style={{ fontSize: 11, color: C.gray }}>To: {a.dept}</span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 15, color: C.char, marginBottom: 8 }}>{a.title}</h3>
                    <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.6 }}>{a.body}</p>
                    <p style={{ fontSize: 11, color: C.gray, marginTop: 10 }}>Posted by <span style={{ fontWeight: 600, color: C.brown }}>{a.author}</span> · {a.date}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "flex-end", justifyContent: "center", background: "rgba(0,0,0,0.5)" }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: 600, borderRadius: "20px 20px 0 0", padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontWeight: 700, fontSize: 18, color: C.char }}>New Announcement</h2>
              <button onClick={() => setShowCompose(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.gray }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Announcement title"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${C.beige}`, fontSize: 14, outline: "none", boxSizing: "border-box", color: C.char }} />
              <textarea value={newBody} onChange={e => setNewBody(e.target.value)} placeholder="Write the announcement body here…" rows={4}
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: `1.5px solid ${C.beige}`, fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box", color: C.char }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <select value={newPriority} onChange={e => setNewPriority(e.target.value as Priority)}
                  style={{ padding: "11px 14px", borderRadius: 12, border: `1.5px solid ${C.beige}`, fontSize: 14, color: C.char, background: "#fff" }}>
                  <option value="general">General</option>
                  <option value="info">Info</option>
                  <option value="urgent">Urgent</option>
                </select>
                <select value={newDept} onChange={e => setNewDept(e.target.value)}
                  style={{ padding: "11px 14px", borderRadius: 12, border: `1.5px solid ${C.beige}`, fontSize: 14, color: C.char, background: "#fff" }}>
                  <option>All Staff</option>
                  <option>Front Office</option>
                  <option>F&B</option>
                  <option>Housekeeping</option>
                  <option>Facilities</option>
                  <option>Security</option>
                  <option>Spa & Wellness</option>
                </select>
              </div>
              <GoldBtn label="Post Announcement" onClick={postAnnouncement} disabled={!newTitle.trim() || !newBody.trim()} style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ── Clocking Screen ───────────────────────────────────────────────────────

  const clockingScreen = (
    <div style={{ paddingTop: 64, minHeight: "100vh", background: C.ivory }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 24px" }}>
        <h1 style={{ fontWeight: 700, fontSize: 24, color: C.char, marginBottom: 4 }}>Employee Clocking</h1>
        <p style={{ fontSize: 13, color: C.gray, marginBottom: 24 }}>Sunday, 13 July 2026</p>

        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }} className="grid-cols-2">
          {/* My Clock */}
          <Card style={{ gridColumn: "1 / -1" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Avatar emp={EMPLOYEES[0]} size={52} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 16, color: C.char }}>Adebayo Okonkwo</p>
                  <p style={{ fontSize: 13, color: C.gray }}>Front Desk Manager · Front Office</p>
                  {clockedIn
                    ? <p style={{ fontSize: 12, color: C.green, fontWeight: 600, marginTop: 4 }}>● Clocked in at {clockInTime}</p>
                    : <p style={{ fontSize: 12, color: C.gray, fontWeight: 600, marginTop: 4 }}>○ Not clocked in</p>}
                </div>
              </div>
              <button onClick={() => setClockedIn(!clockedIn)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 99, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, color: "#fff", background: clockedIn ? C.red : C.green }}>
                {clockedIn ? <><LogOut size={18} /> Clock Out</> : <><LogIn size={18} /> Clock In</>}
              </button>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 20 }}>
          {[
            { label: "Present",     value: presentCount,           color: C.green },
            { label: "Late",        value: lateCount,              color: C.amber },
            { label: "Absent",      value: absentCount,            color: C.red   },
            { label: "Clocked Out", value: CLOCK_LOG.filter(c => c.clockOut).length, color: C.gray },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "#fff", borderRadius: 14, padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", textAlign: "center" }}>
              <p style={{ fontSize: 28, fontWeight: 700, color, margin: 0 }}>{value}</p>
              <p style={{ fontSize: 12, color: C.gray, fontWeight: 600, marginTop: 4 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Attendance Table */}
        <Card style={{ marginTop: 20 }}>
          <SectionTitle>Today's Attendance Log</SectionTitle>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${C.beige}` }}>
                  {["Employee", "Department", "Clock In", "Clock Out", "Hours", "Status"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 12px", color: C.gray, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EMPLOYEES.map(emp => {
                  const log = CLOCK_LOG.find(c => c.employeeId === emp.id)!;
                  const statusColors: Record<string, string> = { present: C.green, late: C.amber, absent: C.red };
                  const hours = log.clockIn && !log.clockOut ? "In progress" : log.clockIn && log.clockOut ? "8h 00m" : "—";
                  return (
                    <tr key={emp.id} style={{ borderBottom: `1px solid rgba(0,0,0,0.05)` }}>
                      <td style={{ padding: "12px 12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Avatar emp={emp} size={32} />
                          <div>
                            <p style={{ fontWeight: 600, color: C.char, margin: 0 }}>{emp.name}</p>
                            <p style={{ fontSize: 11, color: C.gray, margin: 0 }}>{emp.role}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px 12px", color: C.gray }}>{emp.dept}</td>
                      <td style={{ padding: "12px 12px", color: log.clockIn ? C.char : C.gray }}>{log.clockIn ?? "—"}</td>
                      <td style={{ padding: "12px 12px", color: log.clockOut ? C.char : C.gray }}>{log.clockOut ?? (log.clockIn ? "Still in" : "—")}</td>
                      <td style={{ padding: "12px 12px", color: C.char, fontWeight: 600 }}>{hours}</td>
                      <td style={{ padding: "12px 12px" }}>
                        <Chip
                          label={log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                          color={statusColors[log.status]}
                          bg={`${statusColors[log.status]}18`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );

  // ── Salary Screen ─────────────────────────────────────────────────────────

  const salaryScreen = (
    <div style={{ paddingTop: 64, minHeight: "100vh", background: C.ivory }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: 24, color: C.char, margin: 0 }}>Salary Processing</h1>
            <p style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>
              {processed.size} of {EMPLOYEES.length} processed · Total net: {fmt(EMPLOYEES.reduce((s, e) => s + netPay(e), 0))}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}
              style={{ padding: "10px 16px", borderRadius: 12, border: `1.5px solid ${C.beige}`, fontSize: 13, fontWeight: 600, color: C.char, background: "#fff", cursor: "pointer" }}>
              {MONTHS.map(m => <option key={m}>{m}</option>)}
            </select>
            <GoldBtn label="Process All" onClick={processAll} />
          </div>
        </div>

        <Card style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.beige}` }}>
                {["Employee", "Department", "Gross Pay", "Deductions", "Net Pay", "Status", "Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: C.gray, fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EMPLOYEES.map(emp => {
                const g = gross(emp);
                const d = totalDeduc(emp);
                const n = netPay(emp);
                const isPaid = processed.has(emp.id);
                return (
                  <tr key={emp.id} style={{ borderBottom: `1px solid rgba(0,0,0,0.05)` }}>
                    <td style={{ padding: "14px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar emp={emp} size={34} />
                        <div>
                          <p style={{ fontWeight: 600, color: C.char, margin: 0 }}>{emp.name}</p>
                          <p style={{ fontSize: 11, color: C.gray, margin: 0 }}>{emp.role}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 14px", color: C.gray }}>{emp.dept}</td>
                    <td style={{ padding: "14px 14px", fontWeight: 600, color: C.char }}>{fmt(g)}</td>
                    <td style={{ padding: "14px 14px", color: C.red }}>{fmt(d)}</td>
                    <td style={{ padding: "14px 14px", fontWeight: 700, color: C.gold, fontSize: 14 }}>{fmt(n)}</td>
                    <td style={{ padding: "14px 14px" }}>
                      {isPaid
                        ? <Chip label="Processed" color={C.green} bg="rgba(46,125,50,0.1)" />
                        : <Chip label="Pending"   color={C.amber} bg="rgba(244,163,0,0.12)" />}
                    </td>
                    <td style={{ padding: "14px 14px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => goTo("slip", emp)}
                          style={{ fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 99, border: `1.5px solid ${C.beige}`, background: "#fff", cursor: "pointer", color: C.char }}>
                          View Slip
                        </button>
                        {!isPaid && (
                          <button onClick={() => setProcessed(prev => new Set([...prev, emp.id]))}
                            style={{ fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 99, border: "none", background: C.gold, color: "#fff", cursor: "pointer" }}>
                            Process
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: `2px solid ${C.beige}`, background: C.ivory }}>
                <td colSpan={2} style={{ padding: "14px 14px", fontWeight: 700, color: C.char }}>TOTAL ({EMPLOYEES.length} employees)</td>
                <td style={{ padding: "14px 14px", fontWeight: 700, color: C.char }}>{fmt(EMPLOYEES.reduce((s, e) => s + gross(e), 0))}</td>
                <td style={{ padding: "14px 14px", fontWeight: 700, color: C.red }}>{fmt(EMPLOYEES.reduce((s, e) => s + totalDeduc(e), 0))}</td>
                <td style={{ padding: "14px 14px", fontWeight: 700, color: C.gold, fontSize: 15 }}>{fmt(totalPayroll)}</td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </Card>
      </div>
    </div>
  );

  // ── Salary Slip Screen ────────────────────────────────────────────────────

  const slipScreen = (
    <div style={{ paddingTop: 64, minHeight: "100vh", background: C.ivory }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button onClick={() => goTo("salary")} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.gray, background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={15} /> Back to Salary
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <OutlineBtn label="🖨 Print" onClick={() => window.print()} />
            <GoldBtn label="Download PDF" onClick={() => {}} size="sm" />
          </div>
        </div>

        {/* Payslip card */}
        <Card>
          {/* Hotel header */}
          <div style={{ textAlign: "center", borderBottom: `2px solid ${C.beige}`, paddingBottom: 20, marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.brown, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
              <span style={{ color: C.gold, fontWeight: 800, fontSize: 20 }}>A</span>
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 18, color: C.brown, margin: 0, letterSpacing: "0.04em" }}>ARYHILLS HOTEL & TOWER</h2>
            <p style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>Old St. John School, Kajola Street, Imo, Ilesa, Osun State · +234 805 030 3270</p>
            <div style={{ display: "inline-block", background: C.brown, color: C.gold, fontWeight: 700, fontSize: 13, padding: "6px 24px", borderRadius: 99, marginTop: 14, letterSpacing: "0.1em" }}>
              PAYSLIP — {selectedMonth.toUpperCase()}
            </div>
          </div>

          {/* Employee info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24, fontSize: 13 }}>
            {[
              { label: "Employee Name",  value: selectedEmp.name       },
              { label: "Employee ID",    value: `ARY-00${selectedEmp.id}` },
              { label: "Job Title",      value: selectedEmp.role       },
              { label: "Department",     value: selectedEmp.dept       },
              { label: "Pay Period",     value: selectedMonth          },
              { label: "Payment Date",   value: "Jul 25, 2026"         },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: "8px 14px", background: C.ivory, borderRadius: 10 }}>
                <p style={{ fontSize: 11, color: C.gray, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{label}</p>
                <p style={{ fontWeight: 600, color: C.char, margin: "3px 0 0" }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Earnings & Deductions side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            {/* Earnings */}
            <div>
              <div style={{ background: `rgba(46,125,50,0.07)`, borderRadius: 12, padding: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Earnings</p>
                {[
                  { label: "Basic Salary",         val: selectedEmp.basic     },
                  { label: "Housing Allowance",     val: selectedEmp.housing   },
                  { label: "Transport Allowance",   val: selectedEmp.transport },
                  { label: "Meal Allowance",        val: selectedEmp.meal      },
                  { label: "Overtime Pay",          val: selectedEmp.overtime  },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(0,0,0,0.05)", fontSize: 13 }}>
                    <span style={{ color: C.gray }}>{label}</span>
                    <span style={{ fontWeight: 600, color: C.char }}>{fmt(val)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: `2px solid ${C.green}` }}>
                  <span style={{ fontWeight: 700, color: C.green }}>Gross Pay</span>
                  <span style={{ fontWeight: 700, color: C.green, fontSize: 15 }}>{fmt(gross(selectedEmp))}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <div style={{ background: "rgba(211,47,47,0.06)", borderRadius: 12, padding: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.red, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Deductions</p>
                {[
                  { label: "PAYE Tax",              val: selectedEmp.tax          },
                  { label: "Pension (8%)",           val: selectedEmp.pension      },
                  { label: "Late Arrival Penalty",   val: selectedEmp.lateDeduction },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(0,0,0,0.05)", fontSize: 13 }}>
                    <span style={{ color: C.gray }}>{label}</span>
                    <span style={{ fontWeight: 600, color: val === 0 ? C.gray : C.red }}>{val === 0 ? "—" : fmt(val)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: `2px solid ${C.red}` }}>
                  <span style={{ fontWeight: 700, color: C.red }}>Total Deductions</span>
                  <span style={{ fontWeight: 700, color: C.red, fontSize: 15 }}>{fmt(totalDeduc(selectedEmp))}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Pay */}
          <div style={{ background: `linear-gradient(135deg, ${C.brown} 0%, #6D3B30 100%)`, borderRadius: 14, padding: "20px 24px", textAlign: "center", marginBottom: 24 }}>
            <p style={{ color: C.beige, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>Net Pay</p>
            <p style={{ color: "#fff", fontSize: 34, fontWeight: 800, margin: "6px 0 0", letterSpacing: "-0.01em" }}>{fmt(netPay(selectedEmp))}</p>
            <p style={{ color: C.beige, fontSize: 12, marginTop: 4 }}>Credited to employee wallet on Jul 25, 2026</p>
          </div>

          {/* Signature */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, fontSize: 12 }}>
            {["Authorised Signatory", "Employee Acknowledgement"].map(label => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ borderBottom: `1.5px solid ${C.char}`, marginBottom: 8, paddingTop: 32 }} />
                <p style={{ color: C.gray, fontWeight: 600 }}>{label}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 11, color: C.gray, textAlign: "center", marginTop: 20 }}>This is a computer-generated payslip and does not require a physical signature.</p>
        </Card>
      </div>
    </div>
  );

  // ── Wallet Screen ─────────────────────────────────────────────────────────

  const walletScreen = (
    <div style={{ paddingTop: 64, minHeight: "100vh", background: C.ivory }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 24px" }}>
        <h1 style={{ fontWeight: 700, fontSize: 24, color: C.char, marginBottom: 20 }}>Employee Wallet</h1>

        {/* Employee selector */}
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, marginBottom: 24 }}>
          {EMPLOYEES.map(emp => (
            <button key={emp.id} onClick={() => setWalletEmpId(emp.id)}
              style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 99, border: "1.5px solid", borderColor: walletEmpId === emp.id ? C.brown : C.beige, background: walletEmpId === emp.id ? C.brown : "#fff", cursor: "pointer" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: walletEmpId === emp.id ? C.gold : C.beige, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: walletEmpId === emp.id ? "#fff" : C.brown }}>
                {emp.initials}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: walletEmpId === emp.id ? "#fff" : C.char, whiteSpace: "nowrap" }}>{emp.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Balance card */}
        <div style={{ background: `linear-gradient(135deg, ${C.brown} 0%, #6D3B30 100%)`, borderRadius: 20, padding: "28px 28px 24px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(184,134,11,0.15)" }} />
          <div style={{ position: "absolute", bottom: -30, right: 60, width: 80, height: 80, borderRadius: "50%", background: "rgba(184,134,11,0.08)" }} />
          <p style={{ color: C.beige, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>Available Balance</p>
          <p style={{ color: "#fff", fontSize: 38, fontWeight: 800, margin: "8px 0 4px", letterSpacing: "-0.02em" }}>{fmt(walletEmp.walletBalance)}</p>
          <p style={{ color: C.beige, fontSize: 13, marginBottom: 20 }}>{walletEmp.name} · ARY-00{walletEmp.id}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "Request Advance", action: () => {} },
              { label: "Withdraw to Bank", action: () => {} },
            ].map(({ label, action }) => (
              <button key={label} onClick={action}
                style={{ padding: "9px 18px", borderRadius: 99, border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
          {[
            { label: "Last Salary",      value: fmt(WALLET_TX.find(t => t.type === "credit" && t.desc.includes("Salary"))?.amount ?? 0), color: C.green },
            { label: "Total Withdrawn",  value: fmt(WALLET_TX.filter(t => t.type === "debit" && t.desc.includes("Withdrawal")).reduce((s, t) => s + t.amount, 0)), color: C.gray },
            { label: "Net Pay (July)",   value: fmt(netPay(walletEmp)), color: C.gold },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: 11, color: C.gray, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{label}</p>
              <p style={{ fontSize: 17, fontWeight: 700, color, margin: "5px 0 0" }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <SectionTitle>Transaction History</SectionTitle>
            <button onClick={() => goTo("slip", walletEmp)}
              style={{ fontSize: 12, fontWeight: 600, color: C.gold, background: "none", border: "none", cursor: "pointer" }}>
              View Payslip →
            </button>
          </div>
          {WALLET_TX.map((tx, i) => (
            <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: i < WALLET_TX.length - 1 ? `1px solid rgba(0,0,0,0.06)` : "none" }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: tx.type === "credit" ? "rgba(46,125,50,0.1)" : "rgba(211,47,47,0.08)" }}>
                {tx.type === "credit"
                  ? <ArrowDownLeft size={18} color={C.green} />
                  : <ArrowUpRight size={18} color={C.red} />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 13, color: C.char, margin: 0 }}>{tx.desc}</p>
                <p style={{ fontSize: 11, color: C.gray, margin: "2px 0 0" }}>{tx.date}</p>
              </div>
              <span style={{ fontWeight: 700, fontSize: 14, color: tx.type === "credit" ? C.green : C.red, flexShrink: 0 }}>
                {tx.type === "credit" ? "+" : "−"}{fmt(tx.amount)}
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────

  const screens: Record<Screen, React.ReactNode> = {
    home:          homeScreen,
    announcements: announcementsScreen,
    clocking:      clockingScreen,
    salary:        salaryScreen,
    slip:          slipScreen,
    wallet:        walletScreen,
  };

  return (
    <div style={{ minHeight: "100vh", background: C.ivory, fontFamily: "Inter, system-ui, sans-serif" }}>
      {navbar}
      {screens[screen]}
    </div>
  );
}
