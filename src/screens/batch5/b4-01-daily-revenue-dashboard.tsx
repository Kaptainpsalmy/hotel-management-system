import { useState } from "react";
import { PageHeader } from "./page-header";
import { KpiCard } from "./kpi-card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";
import { Download, Filter, X, ChevronRight } from "lucide-react";

// ── Shared tokens ─────────────────────────────────────────────────────────────
const C = {
  brown: "#4E342E", gold: "#B8860B", beige: "#D6C5A4",
  ivory: "#F8F6F2", white: "#EFFFFE", charcoal: "#2D2D2D",
  gray: "#6C757D", green: "#2E7D32", amber: "#F4A300", red: "#D32F2F",
};

// ── Time-period filter ────────────────────────────────────────────────────────
const PERIODS = ["Today", "This Week", "This Month", "This Quarter", "This Year"] as const;
type Period = typeof PERIODS[number];

type PeriodData = {
  rooms: number; bar: number; kitchen: number; events: number;
  total: number; adr: number; revpar: number; occupancy: number;
  mtd: string; label: string;
};

const PERIOD_DATA: Record<Period, PeriodData> = {
  "Today":        { rooms:970000,   bar:420000,    kitchen:215000,   events:65000,    total:1670000,   adr:89500,  revpar:69810,  occupancy:78, mtd:"₦42.3M",   label:"vs yesterday" },
  "This Week":    { rooms:5440000,  bar:1890000,   kitchen:940000,   events:510000,   total:8780000,   adr:91200,  revpar:71100,  occupancy:80, mtd:"₦42.3M",   label:"vs last week" },
  "This Month":   { rooms:19400000, bar:7100000,   kitchen:3800000,  events:2400000,  total:32700000,  adr:88000,  revpar:68600,  occupancy:77, mtd:"₦32.7M",   label:"vs last month" },
  "This Quarter": { rooms:56200000, bar:20100000,  kitchen:11400000, events:7200000,  total:94900000,  adr:87000,  revpar:67800,  occupancy:76, mtd:"₦94.9M",   label:"vs last quarter" },
  "This Year":    { rooms:198000000,bar:72000000,  kitchen:38000000, events:24000000, total:332000000, adr:85000,  revpar:66300,  occupancy:75, mtd:"₦332M",    label:"vs last year" },
};

const TREND_DATA = [
  { date: "Jun 25", rooms: 850000, bar: 340000, kitchen: 155000, events: 90000 },
  { date: "Jun 26", rooms: 920000, bar: 390000, kitchen: 180000, events: 105000 },
  { date: "Jun 27", rooms: 880000, bar: 360000, kitchen: 165000, events: 95000 },
  { date: "Jun 28", rooms: 950000, bar: 410000, kitchen: 190000, events: 120000 },
  { date: "Jun 29", rooms: 920000, bar: 380000, kitchen: 175000, events: 100000 },
  { date: "Jun 30", rooms: 970000, bar: 420000, kitchen: 215000, events: 65000 },
];

const ROOM_TYPE_DATA = [
  { type: "Standard",     revenue: 1200000, rooms: 45 },
  { type: "Deluxe",       revenue: 1850000, rooms: 32 },
  { type: "Suite",        revenue: 1300000, rooms: 18 },
  { type: "Presidential", revenue: 500000,  rooms: 5  },
];

// ── Transaction detail data ───────────────────────────────────────────────────
type TxCategory = "Rooms" | "Bar" | "Kitchen" | "Events";
type TxMethod   = "Cash" | "Transfer" | "POS";

type Transaction = {
  id: string; time: string; roomNo: string; guestName: string;
  roomType: string; category: TxCategory; description: string;
  amount: number; method: TxMethod; reference: string;
};

const TRANSACTIONS: Transaction[] = [
  { id:"T001", time:"07:12", roomNo:"102", guestName:"Mr. Chidi Okafor",      roomType:"Standard",     category:"Rooms",   description:"Room charge · Night 2 of 4",          amount:35500,  method:"POS",      reference:"POS-0813" },
  { id:"T002", time:"08:30", roomNo:"201", guestName:"Mr. James Carter",      roomType:"Deluxe",       category:"Rooms",   description:"Room charge · Night 4 of 4",          amount:45000,  method:"Transfer", reference:"TRF-0801" },
  { id:"T003", time:"09:15", roomNo:"102", guestName:"Mr. Chidi Okafor",      roomType:"Standard",     category:"Bar",     description:"2× Heineken, 1× Chapman",             amount:8700,   method:"Cash",     reference:"BAR-1072" },
  { id:"T004", time:"10:00", roomNo:"301", guestName:"Mr. David Okonkwo",     roomType:"Superior",     category:"Rooms",   description:"Room charge · Night 2 of 4",          amount:48000,  method:"POS",      reference:"POS-0826" },
  { id:"T005", time:"10:45", roomNo:"401", guestName:"Mr. Babatunde Adeyemi", roomType:"Suite",        category:"Kitchen", description:"Continental Breakfast (×3)",           amount:18000,  method:"Transfer", reference:"KIT-2031" },
  { id:"T006", time:"11:20", roomNo:"204", guestName:"Mr. Adebayo Mensah",    roomType:"Deluxe",       category:"Rooms",   description:"Room charge · Night 1 of 3",          amount:45000,  method:"POS",      reference:"POS-0847" },
  { id:"T007", time:"12:00", roomNo:"401", guestName:"Mr. Babatunde Adeyemi", roomType:"Suite",        category:"Bar",     description:"Wine bottle · Cabernet Sauvignon",    amount:42000,  method:"Transfer", reference:"BAR-1098" },
  { id:"T008", time:"12:45", roomNo:"105", guestName:"Mrs. Grace Nwosu",      roomType:"Standard",     category:"Kitchen", description:"Jollof Rice & Plantain, Juice",       amount:9500,   method:"Cash",     reference:"KIT-2032" },
  { id:"T009", time:"13:30", roomNo:"301", guestName:"Mr. David Okonkwo",     roomType:"Superior",     category:"Bar",     description:"Club House cocktail ×2",              amount:16000,  method:"Cash",     reference:"BAR-1099" },
  { id:"T010", time:"14:15", roomNo:"501", guestName:"Dr. Emeka Nwachukwu",   roomType:"Presidential", category:"Rooms",   description:"Room charge · Night 3 of 4",          amount:95000,  method:"Transfer", reference:"TRF-0802" },
  { id:"T011", time:"15:00", roomNo:"501", guestName:"Dr. Emeka Nwachukwu",   roomType:"Presidential", category:"Kitchen", description:"Private dining · 4-course set",       amount:78000,  method:"Transfer", reference:"KIT-2033" },
  { id:"T012", time:"15:40", roomNo:"204", guestName:"Mr. Adebayo Mensah",    roomType:"Deluxe",       category:"Bar",     description:"Bar tab · Afternoon drinks",          amount:22000,  method:"POS",      reference:"BAR-1100" },
  { id:"T013", time:"16:20", roomNo:"102", guestName:"Mr. Chidi Okafor",      roomType:"Standard",     category:"Kitchen", description:"Room service · Suya platter",         amount:7800,   method:"Cash",     reference:"KIT-2034" },
  { id:"T014", time:"17:00", roomNo:"401", guestName:"Mr. Babatunde Adeyemi", roomType:"Suite",        category:"Events",  description:"Boardroom booking · 4 hrs",           amount:65000,  method:"Transfer", reference:"EVT-0501" },
  { id:"T015", time:"18:30", roomNo:"301", guestName:"Mr. David Okonkwo",     roomType:"Superior",     category:"Kitchen", description:"Dinner · à la carte",                 amount:28500,  method:"POS",      reference:"KIT-2035" },
  { id:"T016", time:"19:10", roomNo:"105", guestName:"Mrs. Grace Nwosu",      roomType:"Standard",     category:"Rooms",   description:"Room charge · Night 1 of 2",          amount:35500,  method:"POS",      reference:"POS-0820" },
  { id:"T017", time:"20:00", roomNo:"201", guestName:"Mr. James Carter",      roomType:"Deluxe",       category:"Bar",     description:"Wines ×2, Cigars",                    amount:38000,  method:"Cash",     reference:"BAR-1101" },
  { id:"T018", time:"21:30", roomNo:"501", guestName:"Dr. Emeka Nwachukwu",   roomType:"Presidential", category:"Bar",     description:"Premium bar tab",                     amount:95000,  method:"Transfer", reference:"BAR-1102" },
];

const CAT_COLOR: Record<TxCategory, string> = {
  Rooms: C.brown, Bar: C.gold, Kitchen: C.green, Events: C.amber,
};

const METHOD_STYLE: Record<TxMethod, { bg: string; text: string }> = {
  Cash:     { bg: "#E8F5E9", text: C.green },
  Transfer: { bg: "#E3F2FD", text: "#1565C0" },
  POS:      { bg: "#FFF8E1", text: C.amber },
};

const fmt = (n: number) =>
  n >= 1_000_000 ? `₦${(n / 1_000_000).toFixed(1)}M` : `₦${n.toLocaleString()}`;

// ── Revenue Detail Panel ──────────────────────────────────────────────────────
type DetailCat = "All" | TxCategory;
const DETAIL_CATS: DetailCat[] = ["All", "Rooms", "Bar", "Kitchen", "Events"];

function RevenueDetailPanel({
  period,
  onClose,
}: {
  period: Period;
  onClose: () => void;
}) {
  const [cat, setCat] = useState<DetailCat>("All");
  const pd = PERIOD_DATA[period];
  const rows = TRANSACTIONS.filter((t) => cat === "All" || t.category === cat);
  const filteredTotal = rows.reduce((s, t) => s + t.amount, 0);

  return (
    <div
      className="rounded-lg"
      style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 rounded-t-lg"
        style={{ background: C.brown }}
      >
        <div>
          <p style={{ fontFamily: "Inter", fontSize: 18, fontWeight: 700, color: "#FFFFFF" }}>
            Revenue Breakdown — {period}
          </p>
          <p style={{ fontFamily: "Inter", fontSize: 13, color: C.beige, marginTop: 2 }}>
            {fmt(pd.total)} total · {TRANSACTIONS.length} transactions
          </p>
        </div>
        <button
          onClick={onClose}
          style={{ background: "rgba(255,255,255,0.14)", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: "#FFFFFF", display: "flex", alignItems: "center", gap: 6, fontFamily: "Inter", fontSize: 13 }}
        >
          <X size={16} /> Close
        </button>
      </div>

      {/* Category summary strip */}
      <div
        className="grid grid-cols-4 gap-0"
        style={{ borderBottom: `1px solid ${C.beige}` }}
      >
        {(["Rooms", "Bar", "Kitchen", "Events"] as TxCategory[]).map((c) => {
          const val = pd[c.toLowerCase() as keyof PeriodData] as number;
          const total = pd.total;
          const pct = ((val / total) * 100).toFixed(0);
          return (
            <button
              key={c}
              onClick={() => setCat(cat === c ? "All" : c)}
              style={{
                padding: "14px 20px",
                textAlign: "left",
                background: cat === c ? `${CAT_COLOR[c]}14` : "transparent",
                borderBottom: cat === c ? `3px solid ${CAT_COLOR[c]}` : "3px solid transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 700, color: CAT_COLOR[c], textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                {c}
              </div>
              <div style={{ fontFamily: "Inter", fontSize: 20, fontWeight: 700, color: C.charcoal }}>
                {fmt(val)}
              </div>
              <div style={{ fontFamily: "Inter", fontSize: 12, color: C.gray }}>
                {pct}% of total
              </div>
            </button>
          );
        })}
      </div>

      {/* Category filter tabs + row count */}
      <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: `1px solid #E0E0E0` }}>
        <div className="flex gap-2">
          {DETAIL_CATS.map((dc) => (
            <button
              key={dc}
              onClick={() => setCat(dc)}
              style={{
                padding: "5px 14px",
                borderRadius: 20,
                fontFamily: "Inter",
                fontSize: 13,
                fontWeight: cat === dc ? 600 : 400,
                background: cat === dc ? C.gold : C.ivory,
                color: cat === dc ? "#FFFFFF" : C.charcoal,
                border: "none",
                cursor: "pointer",
              }}
            >
              {dc}
            </button>
          ))}
        </div>
        <div style={{ fontFamily: "Inter", fontSize: 13, color: C.gray }}>
          {rows.length} transactions · {fmt(filteredTotal)}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto" style={{ maxHeight: 480 }}>
        <table className="w-full">
          <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr style={{ backgroundColor: C.ivory }}>
              {["Time", "Room #", "Guest", "Room Type", "Category", "Description", "Amount", "Method", "Reference"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left whitespace-nowrap"
                  style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 600, color: C.gray, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: `1px solid #E0E0E0` }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((tx, i) => (
              <tr
                key={tx.id}
                style={{ backgroundColor: i % 2 === 0 ? C.white : C.ivory, borderBottom: "1px solid #E0E0E0" }}
              >
                <td className="px-4 py-3 whitespace-nowrap" style={{ fontFamily: "Inter", fontSize: 13, color: C.gray }}>
                  {tx.time}
                </td>
                <td className="px-4 py-3 whitespace-nowrap" style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 600, color: C.charcoal }}>
                  {tx.roomNo}
                </td>
                <td className="px-4 py-3 whitespace-nowrap" style={{ fontFamily: "Inter", fontSize: 13, color: C.charcoal }}>
                  {tx.guestName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap" style={{ fontFamily: "Inter", fontSize: 13, color: C.gray }}>
                  {tx.roomType}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    style={{
                      fontFamily: "Inter", fontSize: 11, fontWeight: 600,
                      color: CAT_COLOR[tx.category],
                      background: `${CAT_COLOR[tx.category]}14`,
                      padding: "3px 8px", borderRadius: 12,
                    }}
                  >
                    {tx.category}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ fontFamily: "Inter", fontSize: 13, color: C.charcoal, maxWidth: 220 }}>
                  {tx.description}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right" style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 700, color: C.charcoal }}>
                  ₦{tx.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    style={{
                      fontFamily: "Inter", fontSize: 12, fontWeight: 600,
                      ...METHOD_STYLE[tx.method],
                      padding: "3px 8px", borderRadius: 12,
                    }}
                  >
                    {tx.method}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap" style={{ fontFamily: "Inter", fontSize: 12, color: C.gray, fontVariantNumeric: "tabular-nums" }}>
                  {tx.reference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────
export function DailyRevenueDashboard() {
  const [period, setPeriod] = useState<Period>("Today");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);

  const pd = PERIOD_DATA[period];

  const catChartData = [
    { category: "Rooms",   amount: pd.rooms   },
    { category: "Bar",     amount: pd.bar     },
    { category: "Kitchen", amount: pd.kitchen },
    { category: "Events",  amount: pd.events  },
  ];

  const totalForMix = pd.rooms + pd.bar + pd.kitchen + pd.events;

  return (
    <div>
      <PageHeader
        title="Revenue Dashboard"
        breadcrumbs={["Business Intelligence", "Revenue"]}
        action={
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors hover:opacity-90"
              style={{ backgroundColor: C.ivory, border: `1px solid ${C.beige}`, color: C.charcoal, fontFamily: "Inter", fontSize: 14, fontWeight: 500 }}
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors hover:opacity-90"
              style={{ backgroundColor: C.gold, color: "#FFFFFF", fontFamily: "Inter", fontSize: 14, fontWeight: 500 }}
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        }
      />

      <div className="p-8">
        {/* Period filter tabs */}
        <div className="flex gap-2 mb-6">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => { setPeriod(p); setShowDetail(false); }}
              style={{
                padding: "8px 18px",
                borderRadius: 8,
                fontFamily: "Inter",
                fontSize: 13,
                fontWeight: period === p ? 600 : 400,
                background: period === p ? C.brown : C.ivory,
                color: period === p ? "#FFFFFF" : C.charcoal,
                border: `1px solid ${period === p ? C.brown : C.beige}`,
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Clickable revenue card */}
          <button
            onClick={() => setShowDetail((v) => !v)}
            className="text-left rounded-lg p-6 transition-all hover:shadow-md"
            style={{
              backgroundColor: showDetail ? C.brown : C.white,
              boxShadow: showDetail ? "0 4px 16px rgba(78,52,46,0.22)" : "0 1px 3px rgba(0,0,0,0.08)",
              border: showDetail ? `2px solid ${C.brown}` : "2px solid transparent",
            }}
          >
            <div style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 500, color: showDetail ? C.beige : C.gray, letterSpacing: "0.5px", textTransform: "uppercase" }}>
              {period === "Today" ? "Today's Revenue" : `${period} Revenue`}
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <div style={{ fontFamily: "Inter", fontSize: 28, fontWeight: 700, color: showDetail ? "#FFFFFF" : C.charcoal }}>
                {fmt(pd.total)}
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span style={{ fontFamily: "Inter", fontSize: 12, color: showDetail ? `${C.beige}CC` : C.gray }}>
                {pd.label}
              </span>
              <span style={{ fontFamily: "Inter", fontSize: 12, color: showDetail ? C.gold : C.gold, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                View details <ChevronRight size={12} />
              </span>
            </div>
          </button>

          <KpiCard
            label="Month-to-Date"
            value={pd.mtd}
            trend={{ direction: "up", percentage: "+12.5%" }}
            subtitle="Target: ₦50M (84.6%)"
          />
          <KpiCard
            label="Average Daily Rate"
            value={`₦${pd.adr.toLocaleString()}`}
            trend={{ direction: "up", percentage: "+3.7%" }}
            subtitle={`Occupancy: ${pd.occupancy}%`}
          />
          <KpiCard
            label="RevPAR"
            value={`₦${pd.revpar.toLocaleString()}`}
            trend={{ direction: "up", percentage: "+6.1%" }}
            subtitle="Per available room"
          />
        </div>

        {/* Revenue detail panel (replaces charts when active) */}
        {showDetail ? (
          <RevenueDetailPanel period={period} onClose={() => setShowDetail(false)} />
        ) : (
          <>
            {/* Revenue by Category */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div
                className="col-span-2 p-6 rounded-lg"
                style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
              >
                <div className="mb-6">
                  <h2 style={{ fontFamily: "Inter", fontSize: 18, fontWeight: 600, color: C.charcoal }}>
                    Revenue by Category
                  </h2>
                  <p style={{ fontFamily: "Inter", fontSize: 14, color: C.gray, marginTop: 4 }}>
                    {period} revenue — Rooms · Bar · Kitchen · Events
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={catChartData} barSize={48}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis
                      dataKey="category"
                      tick={{ fontFamily: "Inter", fontSize: 12, fill: C.gray }}
                      axisLine={{ stroke: "#E0E0E0" }}
                    />
                    <YAxis
                      tick={{ fontFamily: "Inter", fontSize: 12, fill: C.gray }}
                      axisLine={{ stroke: "#E0E0E0" }}
                      tickFormatter={(v) => fmt(v)}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: C.white, border: `1px solid ${C.beige}`, borderRadius: 8, fontFamily: "Inter", fontSize: 12 }}
                      formatter={(value: number) => [`₦${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Bar
                      dataKey="amount"
                      fill={C.gold}
                      radius={[8, 8, 0, 0]}
                      cursor="pointer"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Category Mix */}
              <div className="p-6 rounded-lg" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                <h2 className="mb-5" style={{ fontFamily: "Inter", fontSize: 18, fontWeight: 600, color: C.charcoal }}>
                  Category Mix
                </h2>
                <div className="space-y-5">
                  {(["Rooms", "Bar", "Kitchen", "Events"] as TxCategory[]).map((cat) => {
                    const val = pd[cat.toLowerCase() as keyof PeriodData] as number;
                    const pct = Math.round((val / totalForMix) * 100);
                    return (
                      <div key={cat}>
                        <div className="flex justify-between mb-1.5">
                          <span style={{ fontFamily: "Inter", fontSize: 14, color: C.charcoal }}>{cat}</span>
                          <span style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 600, color: C.charcoal }}>{pct}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full" style={{ backgroundColor: C.ivory }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${pct}%`, backgroundColor: CAT_COLOR[cat] }}
                          />
                        </div>
                        <div className="mt-1" style={{ fontFamily: "Inter", fontSize: 12, color: C.gray }}>
                          {fmt(val)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 7-Day Trend */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div className="p-6 rounded-lg" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                <div className="mb-6">
                  <h2 style={{ fontFamily: "Inter", fontSize: 18, fontWeight: 600, color: C.charcoal }}>
                    7-Day Revenue Trend
                  </h2>
                  <p style={{ fontFamily: "Inter", fontSize: 14, color: C.gray, marginTop: 4 }}>
                    Daily revenue by category over the past week
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={TREND_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis dataKey="date" tick={{ fontFamily: "Inter", fontSize: 12, fill: C.gray }} axisLine={{ stroke: "#E0E0E0" }} />
                    <YAxis
                      tick={{ fontFamily: "Inter", fontSize: 12, fill: C.gray }}
                      axisLine={{ stroke: "#E0E0E0" }}
                      tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: C.white, border: `1px solid ${C.beige}`, borderRadius: 8, fontFamily: "Inter", fontSize: 12 }}
                      formatter={(value: number) => `₦${value.toLocaleString()}`}
                    />
                    <Legend wrapperStyle={{ fontFamily: "Inter", fontSize: 12 }} />
                    <Line type="monotone" dataKey="rooms"   stroke={C.brown} strokeWidth={2} name="Rooms"   dot={false} />
                    <Line type="monotone" dataKey="bar"     stroke={C.gold}  strokeWidth={2} name="Bar"     dot={false} />
                    <Line type="monotone" dataKey="kitchen" stroke={C.green} strokeWidth={2} name="Kitchen" dot={false} />
                    <Line type="monotone" dataKey="events"  stroke={C.amber} strokeWidth={2} name="Events"  dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Room Type Performance */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div className="mb-6">
                <h2 style={{ fontFamily: "Inter", fontSize: 18, fontWeight: 600, color: C.charcoal }}>
                  Room Type Revenue Performance
                </h2>
                <p style={{ fontFamily: "Inter", fontSize: 14, color: C.gray, marginTop: 4 }}>
                  Click a row for extended metrics
                </p>
              </div>
              <div className="overflow-hidden rounded-lg" style={{ border: "1px solid #E0E0E0" }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: C.ivory }}>
                      {["Room Type", "Rooms Sold", "Revenue Today", "Avg Rate", "% of Total"].map((h, i) => (
                        <th
                          key={h}
                          className={`px-4 py-3 ${i > 0 ? "text-right" : "text-left"}`}
                          style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 500, color: C.gray, textTransform: "uppercase", letterSpacing: "0.5px" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROOM_TYPE_DATA.map((room, index) => {
                      const avgRate = room.revenue / room.rooms;
                      const percentage = (room.revenue / 4850000) * 100;
                      const isSelected = selectedRoomType === room.type;
                      return (
                        <tr
                          key={index}
                          onClick={() => setSelectedRoomType(isSelected ? null : room.type)}
                          className="cursor-pointer transition-colors border-t"
                          style={{ backgroundColor: isSelected ? C.beige : index % 2 === 0 ? C.white : C.ivory, borderColor: "#E0E0E0" }}
                        >
                          <td className="px-4 py-4" style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 500, color: C.charcoal }}>{room.type}</td>
                          <td className="px-4 py-4 text-right" style={{ fontFamily: "Inter", fontSize: 14, color: C.charcoal }}>{room.rooms}</td>
                          <td className="px-4 py-4 text-right" style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 600, color: C.charcoal }}>₦{room.revenue.toLocaleString()}</td>
                          <td className="px-4 py-4 text-right" style={{ fontFamily: "Inter", fontSize: 14, color: C.charcoal }}>₦{Math.round(avgRate).toLocaleString()}</td>
                          <td className="px-4 py-4 text-right" style={{ fontFamily: "Inter", fontSize: 14, color: C.charcoal }}>{percentage.toFixed(1)}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {selectedRoomType && (
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: C.ivory, border: `1px solid ${C.gold}` }}>
                  <div style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 600, color: C.charcoal }}>
                    {selectedRoomType} Room — Extended Metrics
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-4">
                    {[
                      { label: "7-Day Avg Revenue", value: "₦1,450,000" },
                      { label: "Occupancy Rate",    value: "82%" },
                      { label: "Avg Length of Stay", value: "2.4 nights" },
                      { label: "Guest Satisfaction", value: "4.6 / 5.0" },
                    ].map((m) => (
                      <div key={m.label}>
                        <div style={{ fontFamily: "Inter", fontSize: 11, color: C.gray }}>{m.label}</div>
                        <div style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 600, color: C.charcoal }}>{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
