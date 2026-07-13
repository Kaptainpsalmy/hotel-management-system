import { Link } from "react-router";

const C = {
  brown:  "#4E342E",
  gold:   "#B8860B",
  beige:  "#D6C5A4",
  ivory:  "#F8F6F2",
  white:  "#EFFFFE",
  char:   "#2D2D2D",
  gray:   "#6C757D",
  green:  "#2E7D32",
  amber:  "#F4A300",
  red:    "#D32F2F",
} as const;

interface Module {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  icon: string;
  screens: { label: string; note?: string }[];
}

const MODULES: Module[] = [
  {
    id: "M1",
    title: "Hotel Management",
    subtitle: "Core operations for General Manager",
    route: "/management",
    icon: "🏨",
    screens: [
      { label: "Login / Authentication" },
      { label: "GM Dashboard" },
      { label: "Reservation Calendar" },
      { label: "New Booking Flow" },
      { label: "Booking Detail View" },
      { label: "Guest Profile" },
    ],
  },
  {
    id: "M2",
    title: "Front Desk",
    subtitle: "Guest lifecycle management",
    route: "/frontdesk",
    icon: "🛎️",
    screens: [
      { label: "Guest Check-In (4-step wizard)" },
      { label: "Check-Out & Invoice" },
      { label: "Room Status Board (36 rooms)" },
      { label: "Invoice Detail" },
      { label: "Guest Requests" },
      { label: "QR Key Card Print" },
    ],
  },
  {
    id: "M3",
    title: "Back of House",
    subtitle: "Operations & facilities",
    route: "/backofhouse",
    icon: "⚙️",
    screens: [
      { label: "Housekeeping Task Board (Kanban)" },
      { label: "Housekeeping Assignment Grid" },
      { label: "Maintenance Board (Kanban)" },
      { label: "Inventory Dashboard" },
      { label: "Restaurant Table Plan" },
      { label: "Staff Shift Schedule" },
    ],
  },
  {
    id: "M4",
    title: "Guest Mobile Portal",
    subtitle: "Self-service on mobile",
    route: "/guestmobile",
    icon: "📱",
    screens: [
      { label: "Portal Home" },
      { label: "Room Service (menu → cart → confirm)" },
      { label: "Complaint Flow" },
      { label: "Live Chat" },
      { label: "Request Tracker" },
      { label: "View My Bill" },
    ],
  },
  {
    id: "M5",
    title: "Business Intelligence",
    subtitle: "Analytics & admin settings",
    route: "/bi-admin",
    icon: "📊",
    screens: [
      { label: "Daily Revenue Dashboard" },
      { label: "Event Booking Screen" },
      { label: "CRM Guest Segments" },
      { label: "Reports Center" },
      { label: "System Settings" },
    ],
  },
  {
    id: "M6",
    title: "Public Website",
    subtitle: "Marketing & social screens",
    route: "/website",
    icon: "🌐",
    screens: [
      { label: "Offers & Packages" },
      { label: "Events & Conference" },
      { label: "Restaurant & Bar" },
      { label: "Google Search Mockup" },
      { label: "WhatsApp Widget" },
      { label: "Guest Reviews" },
    ],
  },
  {
    id: "M7",
    title: "Online Booking",
    subtitle: "Guest-facing booking funnel",
    route: "/booking",
    icon: "🛏️",
    screens: [
      { label: "Homepage (Desktop)" },
      { label: "Homepage (Mobile)" },
      { label: "Room Listing" },
      { label: "Booking Step 1 — Select Room & Dates" },
      { label: "Booking Step 2 — Guest Details" },
      { label: "Booking Confirmation" },
    ],
  },
  {
    id: "M8",
    title: "Ordering & Services",
    subtitle: "Food, Gym, Pool, Spa — order online",
    route: "/ordering",
    icon: "🍽️",
    screens: [
      { label: "Services Home (all 8 tiles)" },
      { label: "Food & Drinks Menu + Cart" },
      { label: "Item Detail Modal" },
      { label: "Checkout (delivery vs pickup)" },
      { label: "Order Tracking (live status)" },
      { label: "Gym Booking (slots + add-ons)" },
      { label: "Pool Booking (capacity + guests)" },
      { label: "Spa Booking (treatment + therapist)" },
      { label: "Booking Confirmation (QR pass)" },
    ],
  },
];

export default function HomeIndex() {
  return (
    <div style={{ minHeight: "100vh", background: C.ivory, fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Top header */}
      <header style={{ background: C.brown, padding: "0 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 20, letterSpacing: "0.02em" }}>
              Aryhills Hotel &amp; Tower
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginLeft: 12 }}>
              · Imo, Ilesa, Osun State
            </span>
          </div>
          <span style={{ color: C.beige, fontSize: 12 }}>
            Hotel Management System — 50 Screens
          </span>
        </div>
      </header>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.brown} 0%, #6D3B30 100%)`, padding: "48px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: C.gold, fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            All Modules Connected
          </div>
          <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 700, margin: "0 0 12px" }}>
            Aryhills HMS — Unified System
          </h1>
          <p style={{ color: C.beige, fontSize: 15, lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            8 modules · 50 screens · Full hotel operations from check-in to analytics.
            Select any module below to enter.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", color: "#fff", fontSize: 13 }}>
              📍 Old St. John School, Kajola Street, Abiola Avenue Way, Imo, Ilesa, Osun State
            </div>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", color: "#fff", fontSize: 13 }}>
              📞 +234 805 030 3270
            </div>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", color: "#fff", fontSize: 13 }}>
              ⭐ 4.2 / 5 Google
            </div>
          </div>
        </div>
      </div>

      {/* Module grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
        }}>
          {MODULES.map((mod) => (
            <div
              key={mod.id}
              style={{
                background: C.white,
                borderRadius: 12,
                border: `1px solid rgba(78,52,46,0.1)`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Card header */}
              <div style={{ background: C.brown, padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{mod.icon}</span>
                  <div>
                    <div style={{ color: C.gold, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {mod.id}
                    </div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{mod.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{mod.subtitle}</div>
                  </div>
                </div>
              </div>

              {/* Screen list */}
              <div style={{ padding: "16px 24px", flex: 1 }}>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {mod.screens.map((screen, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "5px 0",
                        borderBottom: i < mod.screens.length - 1 ? `1px solid rgba(78,52,46,0.07)` : "none",
                        fontSize: 13,
                        color: C.char,
                      }}
                    >
                      <span style={{ color: C.gold, fontWeight: 700, fontSize: 11, minWidth: 28 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {screen.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div style={{ padding: "16px 24px", borderTop: `1px solid rgba(78,52,46,0.1)` }}>
                <Link
                  to={mod.route}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "10px 24px",
                    background: C.gold,
                    color: "#fff",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Open {mod.title} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 48, paddingBottom: 40, color: C.gray, fontSize: 12 }}>
          © 2026 Aryhills Hotel &amp; Tower · Old St. John School, Kajola Street, Abiola Avenue Way, Imo, Ilesa, Osun State · +234 805 030 3270
        </div>
      </div>
    </div>
  );
}
