import { useState } from "react";
import {
  Star, MapPin, Phone, Mail, Clock, Users, Shield,
  ChevronLeft, ChevronRight, X, MessageCircle, Send, CalendarDays,
  Check, Tv, Volume2, Camera, Utensils, Monitor, Music, Globe,
  Search, Zap,
} from "lucide-react";

// ── Brand tokens ───────────────────────────────────────────────────────────────
const B = {
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

const img = (id: string, w = 800, h = 500) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

type ScreenId = "b7-01" | "b7-02" | "b7-03" | "b7-04" | "b7-05" | "b7-06";

const SCREENS: { id: ScreenId; label: string; url: string }[] = [
  { id: "b7-01", label: "B7-01 — Offers & Packages",    url: "aryhillshotel.com/offers" },
  { id: "b7-02", label: "B7-02 — Events & Conference",  url: "aryhillshotel.com/events" },
  { id: "b7-03", label: "B7-03 — Restaurant & Bar",     url: "aryhillshotel.com/restaurant" },
  { id: "b7-04", label: "B7-04 — Google Search Mockup", url: "google.com/travel/hotels/entity/aryhills-hotel-ilesa" },
  { id: "b7-05", label: "B7-05 — WhatsApp Widget",      url: "aryhillshotel.com" },
  { id: "b7-06", label: "B7-06 — Guest Reviews",        url: "aryhillshotel.com/reviews" },
];

// ── Micro components ───────────────────────────────────────────────────────────

function StarRow({ n, size = 13 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          fill={i <= n ? B.amber : "none"}
          color={i <= n ? B.amber : "#D1D5DB"}
        />
      ))}
    </span>
  );
}

function Countdown({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
      style={{ background: B.red, color: "white" }}
    >
      <Zap size={9} />
      {text}
    </span>
  );
}

function TrustRow() {
  return (
    <div className="flex items-center gap-5 flex-wrap">
      <span className="flex items-center gap-1.5 text-xs" style={{ color: B.gray }}>
        <Shield size={13} style={{ color: B.green }} />
        SSL Secured
      </span>
      <span className="flex items-center gap-1 text-xs">
        <StarRow n={5} size={11} />
        <span className="font-semibold ml-1" style={{ color: B.char }}>4.8</span>
        <span style={{ color: B.gray }}>&nbsp;(247)</span>
      </span>
      <span
        className="px-2.5 py-1 rounded text-xs font-bold border"
        style={{ borderColor: B.gold, color: B.gold }}
      >
        PAYSTACK
      </span>
      <span className="px-2.5 py-1 rounded text-xs font-bold border border-orange-500 text-orange-600">
        FLUTTERWAVE
      </span>
      <span className="px-2 py-1 rounded text-xs font-bold text-white" style={{ background: "#1A1F71" }}>
        VISA
      </span>
      <span className="px-2 py-1 rounded text-xs font-bold text-white" style={{ background: "#EB001B" }}>
        MC
      </span>
    </div>
  );
}

function WebHeader({ active = "" }: { active?: string }) {
  const links = ["Rooms & Suites", "Offers", "Events", "Restaurant", "Reviews", "Contact"];
  return (
    <header style={{ background: B.brown }} className="sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div
            className="w-8 h-8 rounded flex items-center justify-center font-black text-sm"
            style={{ background: B.gold, color: B.white }}
          >
            A
          </div>
          <div>
            <div
              className="font-bold text-white leading-none"
              style={{ letterSpacing: "0.18em", fontSize: "13px" }}
            >
              ARYHILLS
            </div>
            <div
              className="leading-none mt-0.5"
              style={{ color: B.beige, fontSize: "9px", letterSpacing: "0.12em" }}
            >
              Hotel &amp; Tower · LAGOS
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-5">
          {links.map(l => (
            <a
              key={l}
              href="#"
              className="text-xs font-medium transition-colors whitespace-nowrap"
              style={{ color: active === l ? B.gold : B.beige }}
            >
              {l}
            </a>
          ))}
        </nav>
        <button
          className="px-5 py-2 rounded text-sm font-semibold flex-shrink-0 transition-all hover:brightness-110"
          style={{ background: B.gold, color: B.white }}
        >
          Book Now
        </button>
      </div>
    </header>
  );
}

function HeroSearch() {
  return (
    <div
      className="inline-flex items-center rounded-full shadow-2xl overflow-hidden"
      style={{ background: B.white, border: `2px solid rgba(184,134,11,0.25)` }}
    >
      <div className="flex items-center gap-2.5 px-5 py-3 border-r border-gray-200">
        <CalendarDays size={14} style={{ color: B.gold }} />
        <div>
          <div className="text-xs" style={{ color: B.gray }}>Check-in</div>
          <div className="text-sm font-semibold" style={{ color: B.char }}>Jul 15, 2025</div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 px-5 py-3 border-r border-gray-200">
        <CalendarDays size={14} style={{ color: B.gold }} />
        <div>
          <div className="text-xs" style={{ color: B.gray }}>Check-out</div>
          <div className="text-sm font-semibold" style={{ color: B.char }}>Jul 18, 2025</div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 px-5 py-3 border-r border-gray-200">
        <Users size={14} style={{ color: B.gold }} />
        <div>
          <div className="text-xs" style={{ color: B.gray }}>Guests</div>
          <div className="text-sm font-semibold" style={{ color: B.char }}>2 Adults</div>
        </div>
      </div>
      <div className="px-2">
        <button
          className="px-6 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
          style={{ background: B.gold, color: B.white }}
        >
          Check Availability
        </button>
      </div>
    </div>
  );
}

function WebFooter() {
  return (
    <footer style={{ background: B.brown }}>
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded flex items-center justify-center text-xs font-black"
                style={{ background: B.gold, color: B.white }}
              >
                A
              </div>
              <div>
                <div className="font-bold tracking-widest text-sm text-white">ARYHILLS</div>
                <div style={{ color: B.beige, fontSize: "9px", letterSpacing: "0.12em" }}>Hotel &amp; Tower</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: B.beige }}>
              Experience Ilesa luxury at its finest. Your home away from home on Ilesa, Osun State.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: B.gold }}>Quick Links</h4>
            {["Rooms & Suites", "Offers & Packages", "Events & Conferences", "Restaurant & Bar", "Guest Reviews"].map(l => (
              <a key={l} href="#" className="block text-xs mb-2 hover:opacity-80 transition-opacity" style={{ color: B.beige }}>
                {l}
              </a>
            ))}
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: B.gold }}>Contact</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs" style={{ color: B.beige }}>
                <MapPin size={12} className="mt-0.5 flex-shrink-0" style={{ color: B.gold }} />
                Old St. John School, Kajola Street, Abiola Avenue Way, Imo, Ilesa, Osun State
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: B.beige }}>
                <Phone size={12} style={{ color: B.gold }} />
                +234 805 030 3270
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: B.beige }}>
                <Mail size={12} style={{ color: B.gold }} />
                reservations@aryhillshotel.com
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: B.gold }}>Payment Methods</h4>
            <TrustRow />
          </div>
        </div>
        <div
          className="pt-6 border-t flex items-center justify-between"
          style={{ borderColor: "rgba(214,197,164,0.2)" }}
        >
          <p className="text-xs" style={{ color: B.beige }}>
            © 2026 Aryhills Hotel &amp; Tower. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <a key={l} href="#" className="text-xs hover:opacity-80" style={{ color: B.beige }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl" style={{ background: "#E4E4E4" }}>
      <div
        className="px-4 py-2.5 flex items-center gap-3"
        style={{ background: "#F0EFEF", borderBottom: "1px solid #D0D0D0" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
        </div>
        <button className="p-1 rounded text-gray-400 hover:bg-gray-200">
          <ChevronLeft size={13} />
        </button>
        <button className="p-1 rounded text-gray-400 hover:bg-gray-200">
          <ChevronRight size={13} />
        </button>
        <div className="flex-1 flex items-center gap-2 bg-white rounded-md px-3 py-1.5 border border-gray-200 max-w-lg mx-auto">
          <Shield size={11} className="text-green-500 flex-shrink-0" />
          <span className="truncate text-xs text-gray-500">{url}</span>
        </div>
        <div className="w-16 text-right text-xs text-gray-400 select-none">⊞ ⋯</div>
      </div>
      <div style={{ maxHeight: "82vh", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// B7-01: Offers & Packages
// ─────────────────────────────────────────────────────────────────────────────

const PACKAGES = [
  {
    id: 1, title: "Weekend Getaway", sub: "FRI – SUN SPECIAL",
    desc: "Two nights in our Deluxe Suite with complimentary dinner for two and late checkout.",
    was: "₦75,000", now: "₦55,000",
    imgId: "1571896349842-33c89424de2d",
    includes: ["2 Nights Stay", "Dinner for Two", "Late Checkout", "Welcome Drinks"],
    timer: null, badge: "Popular",
  },
  {
    id: 2, title: "Honeymoon Suite", sub: "ROMANCE PACKAGE",
    desc: "King suite, couples spa, candlelit dinner, and rose petal turndown for an unforgettable stay.",
    was: "₦120,000", now: "₦95,000",
    imgId: "1520250497591-112f2f40a3f4",
    includes: ["King Suite", "Couples Spa", "Candlelit Dinner", "Champagne"],
    timer: null, badge: "Exclusive",
  },
  {
    id: 3, title: "Corporate Rate", sub: "BUSINESS TRAVELLER",
    desc: "Streamlined for the discerning business guest — high-speed WiFi, workspace, and daily breakfast.",
    was: "₦65,000", now: "₦48,000",
    imgId: "1595576508898-0ad5c879a061",
    includes: ["Executive Room", "Daily Breakfast", "1 Gbps WiFi", "Airport Transfer"],
    timer: null, badge: "Business",
  },
  {
    id: 4, title: "Early Bird Discount", sub: "BOOK 30 DAYS AHEAD",
    desc: "Save 30% when you book at least 30 days in advance. Flexible free cancellation included.",
    was: "₦70,000", now: "₦49,000",
    imgId: "1564501049412-61c2a3083791",
    includes: ["Any Room Type", "30% Savings", "Free Cancellation", "Room Upgrade"],
    timer: "Ends in 2d 14h", badge: "Limited",
  },
  {
    id: 5, title: "Free Breakfast Bundle", sub: "RISE & DINE",
    desc: "Start every morning right with our award-winning Nigerian breakfast buffet included daily.",
    was: "₦60,000", now: "₦52,000",
    imgId: "1533089860892-a7c6f0a88666",
    includes: ["Deluxe Room", "Breakfast for Two", "Poolside Access", "Fruit Basket"],
    timer: "Ends in 5d 08h", badge: "Best Value",
  },
];

function OffersPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div style={{ background: B.ivory, fontFamily: "Inter, sans-serif" }}>
      <WebHeader active="Offers" />

      {/* Hero */}
      <div className="relative h-64 overflow-hidden" style={{ background: B.brown }}>
        <img
          src={img("1745725427804-4d94df0c5eb7", 1440, 500)}
          alt="Aryhills Hotel exterior"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "rgba(78,52,46,0.68)" }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: B.gold, letterSpacing: "0.25em" }}>
            EXCLUSIVE DEALS
          </p>
          <h1 className="text-5xl font-bold text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
            Offers &amp; Packages
          </h1>
          <p className="text-sm max-w-md text-center" style={{ color: B.beige }}>
            Curated experiences at Aryhills Hotel. Every stay, elevated.
          </p>
        </div>
      </div>

      {/* Floating search bar */}
      <div className="flex justify-center -mt-6 relative z-10 px-8 mb-10">
        <HeroSearch />
      </div>

      {/* Trust row */}
      <div className="flex justify-center mb-10">
        <TrustRow />
      </div>

      {/* Package grid */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-1" style={{ color: B.char }}>Current Packages</h2>
          <p className="text-sm" style={{ color: B.gray }}>
            All rates in Nigerian Naira. Taxes &amp; service charge included.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {PACKAGES.map(pkg => (
            <div
              key={pkg.id}
              className="rounded-xl overflow-hidden transition-all duration-200 cursor-pointer"
              style={{
                background: B.white,
                boxShadow: hovered === pkg.id
                  ? "0 4px 12px rgba(0,0,0,0.12)"
                  : "0 1px 3px rgba(0,0,0,0.08)",
                outline: hovered === pkg.id
                  ? `1.5px solid ${B.gold}`
                  : "1.5px solid transparent",
              }}
              onMouseEnter={() => setHovered(pkg.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative h-44 overflow-hidden" style={{ background: B.brown }}>
                <img
                  src={img(pkg.imgId, 600, 350)}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                  style={{ transform: hovered === pkg.id ? "scale(1.04)" : "scale(1)" }}
                />
                <span
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: B.gold }}
                >
                  {pkg.badge}
                </span>
                {pkg.timer !== null && (
                  <div className="absolute top-3 right-3">
                    <Countdown text={pkg.timer} />
                  </div>
                )}
              </div>
              <div className="p-5">
                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: B.gold, letterSpacing: "0.1em" }}
                >
                  {pkg.sub}
                </p>
                <h3 className="text-base font-semibold mb-1.5" style={{ color: B.char }}>
                  {pkg.title}
                </h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: B.gray }}>
                  {pkg.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pkg.includes.map(item => (
                    <span
                      key={item}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                      style={{ background: B.ivory, color: B.char }}
                    >
                      <Check size={9} style={{ color: B.green }} />
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xs line-through" style={{ color: B.gray }}>
                      {pkg.was}
                    </span>
                    <div className="text-xl font-bold leading-none" style={{ color: B.gold }}>
                      {pkg.now}
                    </div>
                    <span className="text-xs" style={{ color: B.gray }}>per night</span>
                  </div>
                  <button
                    className="px-4 py-2 rounded text-sm font-semibold hover:brightness-110 transition-all"
                    style={{ background: B.gold, color: B.white }}
                  >
                    Book Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div className="py-14 px-8 text-center" style={{ background: B.brown }}>
        <p
          className="text-xs font-semibold mb-2"
          style={{ color: B.gold, letterSpacing: "0.25em" }}
        >
          NEED SOMETHING BESPOKE?
        </p>
        <h2 className="text-3xl font-semibold text-white mb-3">Personalise Your Stay</h2>
        <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: B.beige }}>
          Our concierge team creates custom packages tailored exactly to your needs and budget.
        </p>
        <button
          className="px-8 py-3 rounded text-sm font-semibold hover:brightness-110 transition-all"
          style={{ background: B.gold, color: B.white }}
        >
          Contact Concierge
        </button>
      </div>

      <WebFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// B7-02: Events & Conference
// ─────────────────────────────────────────────────────────────────────────────

function EventsPage() {
  const [activeVenue, setActiveVenue] = useState(0);

  const venues = [
    {
      name: "Grand Ballroom",
      imgId: "1561912774-79769a0a0a7a",
      theatre: 500, classroom: 300, banquet: 250, cocktail: 400,
      area: "800 m²",
    },
    {
      name: "Emerald Hall",
      imgId: "1742844552048-410dfdf7b3c7",
      theatre: 200, classroom: 120, banquet: 100, cocktail: 160,
      area: "350 m²",
    },
    {
      name: "Boardroom Suite",
      imgId: "1587825140708-dfaf72ae4b04",
      theatre: 30, classroom: 20, banquet: 16, cocktail: 25,
      area: "65 m²",
    },
  ];

  const av = [
    { Icon: Monitor, label: "4K Laser Projector & Screen" },
    { Icon: Volume2, label: "Full PA & Line-Array Sound" },
    { Icon: Tv,      label: "98″ LED Display Panels" },
    { Icon: Camera,  label: "Video Conferencing (Zoom/Teams)" },
    { Icon: Utensils, label: "Dedicated 1 Gbps WiFi Network" },
    { Icon: Music,   label: "Live Band Rigging Available" },
  ];

  const catering = [
    { name: "Morning Coffee Break",   price: "₦3,500/person",  desc: "Pastries, specialty teas & coffees" },
    { name: "Full-Day Conference",    price: "₦18,000/person", desc: "3 meals + 2 breaks + AV included" },
    { name: "Gala Dinner",            price: "₦28,000/person", desc: "5-course dinner with beverages" },
    { name: "Cocktail Reception",     price: "₦12,000/person", desc: "Canapés, cocktails & mocktails" },
  ];

  return (
    <div style={{ background: B.ivory, fontFamily: "Inter, sans-serif" }}>
      <WebHeader active="Events" />

      {/* Hero */}
      <div className="relative h-72 overflow-hidden" style={{ background: B.brown }}>
        <img
          src={img("1561912774-79769a0a0a7a", 1440, 600)}
          alt="Grand Ballroom"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "rgba(78,52,46,0.72)" }}
        >
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: B.gold, letterSpacing: "0.25em" }}
          >
            EVENTS &amp; CONFERENCES
          </p>
          <h1 className="text-5xl font-bold text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
            Where Great Events Begin
          </h1>
          <p className="text-sm max-w-lg text-center" style={{ color: B.beige }}>
            From intimate boardroom meetings to grand Osun State galas — world-class events at Aryhills.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Venue selector */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2" style={{ color: B.char }}>Our Event Spaces</h2>
        </div>
        <div className="flex gap-2 justify-center mb-8">
          {venues.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveVenue(i)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeVenue === i ? B.gold : B.white,
                color:      activeVenue === i ? B.white : B.char,
                border:     `1.5px solid ${activeVenue === i ? B.gold : B.beige}`,
              }}
            >
              {v.name}
            </button>
          ))}
        </div>

        {/* Active venue detail */}
        <div className="grid grid-cols-2 gap-10 mb-12">
          <div className="rounded-xl overflow-hidden" style={{ height: "300px", background: B.brown }}>
            <img
              src={img(venues[activeVenue].imgId, 700, 400)}
              alt={venues[activeVenue].name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-1" style={{ color: B.char }}>
              {venues[activeVenue].name}
            </h3>
            <p className="text-sm mb-5" style={{ color: B.gray }}>
              Floor area: {venues[activeVenue].area}
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Theatre",   n: venues[activeVenue].theatre },
                { label: "Classroom", n: venues[activeVenue].classroom },
                { label: "Banquet",   n: venues[activeVenue].banquet },
              ].map(({ label, n }) => (
                <div
                  key={label}
                  className="rounded-xl p-4 text-center"
                  style={{ background: B.white, border: `1px solid ${B.beige}` }}
                >
                  <div className="text-2xl font-bold" style={{ color: B.gold }}>{n}</div>
                  <div className="text-xs mt-0.5 font-medium" style={{ color: B.gray }}>{label}</div>
                </div>
              ))}
            </div>
            <button
              className="w-full py-3 rounded text-sm font-semibold hover:brightness-110 transition-all"
              style={{ background: B.gold, color: B.white }}
            >
              Get a Quote for {venues[activeVenue].name}
            </button>
          </div>
        </div>

        {/* Capacity table */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4" style={{ color: B.char }}>
            Capacity &amp; Layout Overview
          </h3>
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${B.beige}` }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: B.brown }}>
                  {["Venue", "Area", "Theatre", "Classroom", "Banquet", "Cocktail"].map(h => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-semibold"
                      style={{ color: B.beige, letterSpacing: "0.06em" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {venues.map((v, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? B.white : B.ivory }}>
                    <td className="px-5 py-3 font-semibold" style={{ color: B.char }}>{v.name}</td>
                    <td className="px-5 py-3" style={{ color: B.gray }}>{v.area}</td>
                    <td className="px-5 py-3 font-medium" style={{ color: B.char }}>{v.theatre}</td>
                    <td className="px-5 py-3 font-medium" style={{ color: B.char }}>{v.classroom}</td>
                    <td className="px-5 py-3 font-medium" style={{ color: B.char }}>{v.banquet}</td>
                    <td className="px-5 py-3 font-medium" style={{ color: B.char }}>{v.cocktail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AV Equipment */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4" style={{ color: B.char }}>
            Audio-Visual &amp; Technical Equipment
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {av.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl p-4"
                style={{ background: B.white, border: `1px solid ${B.beige}` }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: B.ivory }}
                >
                  <Icon size={16} style={{ color: B.gold }} />
                </div>
                <span className="text-sm font-medium" style={{ color: B.char }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Catering packages */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4" style={{ color: B.char }}>Catering Packages</h3>
          <div className="grid grid-cols-4 gap-4">
            {catering.map(c => (
              <div
                key={c.name}
                className="rounded-xl p-5"
                style={{ background: B.white, border: `1px solid ${B.beige}` }}
              >
                <Utensils size={18} className="mb-3" style={{ color: B.gold }} />
                <h4 className="text-sm font-semibold mb-1" style={{ color: B.char }}>{c.name}</h4>
                <p className="text-xs leading-relaxed mb-2" style={{ color: B.gray }}>{c.desc}</p>
                <div className="text-base font-bold" style={{ color: B.gold }}>{c.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry form */}
      <div className="py-14" style={{ background: B.brown }}>
        <div className="max-w-2xl mx-auto px-8">
          <div className="text-center mb-8">
            <p
              className="text-xs font-semibold mb-2"
              style={{ color: B.gold, letterSpacing: "0.25em" }}
            >
              LET&apos;S PLAN TOGETHER
            </p>
            <h2 className="text-3xl font-semibold text-white">Get a Quote / Book a Hall</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: "Full Name",  ph: "Mr. Chidi Okafor" },
              { label: "Email",      ph: "chidi@company.ng" },
              { label: "Phone",      ph: "+234 801 234 5678" },
              { label: "Event Date", ph: "20 Aug 2025" },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-medium mb-1.5" style={{ color: B.beige }}>
                  {f.label}
                </label>
                <input
                  type="text"
                  placeholder={f.ph}
                  className="w-full px-3 py-2.5 rounded text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(214,197,164,0.3)",
                    color: B.white,
                    fontFamily: "Inter, sans-serif",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: B.beige }}>
                Event Type
              </label>
              <select
                className="w-full px-3 py-2.5 rounded text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(214,197,164,0.3)",
                  color: B.white,
                }}
              >
                <option style={{ background: B.brown }}>Corporate Conference</option>
                <option style={{ background: B.brown }}>Wedding Reception</option>
                <option style={{ background: B.brown }}>Product Launch</option>
                <option style={{ background: B.brown }}>Gala Dinner</option>
                <option style={{ background: B.brown }}>Training Workshop</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: B.beige }}>
                Expected Guests
              </label>
              <input
                type="number"
                placeholder="e.g. 150"
                className="w-full px-3 py-2.5 rounded text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(214,197,164,0.3)",
                  color: B.white,
                }}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-xs font-medium mb-1.5" style={{ color: B.beige }}>
              Additional Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Theme, AV needs, dietary restrictions, décor preferences..."
              className="w-full px-3 py-2.5 rounded text-sm outline-none resize-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(214,197,164,0.3)",
                color: B.white,
              }}
            />
          </div>
          <button
            className="w-full py-3 rounded font-semibold text-sm hover:brightness-110 transition-all"
            style={{ background: B.gold, color: B.white }}
          >
            Submit Enquiry
          </button>
        </div>
      </div>

      <WebFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// B7-03: Restaurant & Bar
// ─────────────────────────────────────────────────────────────────────────────

const DISHES = [
  {
    name: "Signature Jollof Rice",
    tag: "House Favourite",
    price: "₦4,500",
    imgId: "1665332195309-9d75071138f0",
    desc: "Smoky party jollof with grilled chicken & fried plantain",
  },
  {
    name: "Catfish Pepper Soup",
    tag: "Chef's Special",
    price: "₦6,200",
    imgId: "1664993101841-036f189719b6",
    desc: "Fresh catfish in our aromatic chef's pepper broth",
  },
  {
    name: "Pounded Yam & Egusi",
    tag: "Traditional",
    price: "₦5,800",
    imgId: "1664992960082-0ea299a9c53e",
    desc: "Hand-pounded yam with rich egusi soup & assorted meat",
  },
  {
    name: "Grilled Lobster",
    tag: "Premium",
    price: "₦18,500",
    imgId: "1555396273-367ea4eb4db5",
    desc: "Fresh Atlantic lobster with herb butter & charred lemon",
  },
  {
    name: "Aryhills Suya Platter",
    tag: "Grilled",
    price: "₦7,200",
    imgId: "1665556899022-9761f95769e5",
    desc: "Northern-style spiced beef suya, tomatoes & onions",
  },
  {
    name: "Dark Chocolate Fondant",
    tag: "Dessert",
    price: "₦3,500",
    imgId: "1563805042-7684c019e1cb",
    desc: "Warm Belgian chocolate fondant with vanilla ice cream",
  },
];

function RestaurantPage() {
  const [guests, setGuests] = useState(2);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div style={{ background: B.ivory, fontFamily: "Inter, sans-serif" }}>
      <WebHeader active="Restaurant" />

      {/* Full-bleed hero */}
      <div className="relative h-80 overflow-hidden" style={{ background: B.brown }}>
        <img
          src={img("1653259038915-7cf0b7a4dd6c", 1440, 600)}
          alt="The Aryhills Table restaurant"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-end justify-end p-14"
          style={{
            background:
              "linear-gradient(to top, rgba(78,52,46,0.9) 35%, rgba(0,0,0,0.1) 100%)",
          }}
        >
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: B.gold, letterSpacing: "0.25em" }}
          >
            FINE DINING &amp; COCKTAILS
          </p>
          <h1 className="text-5xl font-bold text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
            The Aryhills Table
          </h1>
          <p className="text-sm max-w-sm text-right" style={{ color: B.beige }}>
            Where Nigerian heritage meets contemporary culinary artistry.
          </p>
        </div>
      </div>

      {/* Hours strip */}
      <div className="flex justify-center gap-16 py-5" style={{ background: B.brown }}>
        {[
          { label: "RESTAURANT",   hours: "6:30 AM – 11:00 PM" },
          { label: "BAR & LOUNGE", hours: "12:00 PM – 2:00 AM" },
          { label: "POOL BAR",     hours: "10:00 AM – 10:00 PM" },
        ].map(({ label, hours }) => (
          <div key={label} className="flex items-center gap-3">
            <Clock size={14} style={{ color: B.gold }} />
            <div>
              <div
                className="text-xs font-bold"
                style={{ color: B.gold, letterSpacing: "0.15em" }}
              >
                {label}
              </div>
              <div className="text-xs" style={{ color: B.beige }}>{hours}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-12">

          {/* Menu grid */}
          <div className="col-span-2">
            <p
              className="text-xs font-semibold mb-1"
              style={{ color: B.gold, letterSpacing: "0.2em" }}
            >
              SIGNATURE DISHES
            </p>
            <h2 className="text-2xl font-semibold mb-6" style={{ color: B.char }}>
              Menu Highlights
            </h2>
            <div className="grid grid-cols-2 gap-5">
              {DISHES.map(dish => (
                <div
                  key={dish.name}
                  className="rounded-xl overflow-hidden transition-shadow hover:shadow-md"
                  style={{ background: B.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
                >
                  <div className="relative h-36 overflow-hidden" style={{ background: B.brown }}>
                    <img
                      src={img(dish.imgId, 400, 250)}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                      style={{ background: "rgba(78,52,46,0.85)" }}
                    >
                      {dish.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-semibold mb-1" style={{ color: B.char }}>
                      {dish.name}
                    </h4>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: B.gray }}>
                      {dish.desc}
                    </p>
                    <div className="text-base font-bold" style={{ color: B.gold }}>{dish.price}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                className="px-6 py-2.5 rounded text-sm font-semibold transition-colors"
                style={{ border: `1.5px solid ${B.gold}`, color: B.gold }}
              >
                View Full Menu
              </button>
            </div>
          </div>

          {/* Reservation panel */}
          <div>
            <div
              className="rounded-xl p-6 sticky top-20"
              style={{ background: B.white, boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
            >
              <h3 className="text-lg font-semibold mb-1" style={{ color: B.char }}>
                Reserve a Table
              </h3>
              <p className="text-xs mb-5" style={{ color: B.gray }}>
                Recommended for parties of 4+. Walk-ins welcome.
              </p>
              {!confirmed ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: B.char }}>
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 rounded text-sm outline-none"
                      style={{
                        border: `1px solid ${B.beige}`,
                        background: B.ivory,
                        color: B.char,
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: B.char }}>
                      Time
                    </label>
                    <select
                      className="w-full px-3 py-2 rounded text-sm outline-none"
                      style={{
                        border: `1px solid ${B.beige}`,
                        background: B.ivory,
                        color: B.char,
                      }}
                    >
                      {["12:00", "13:00", "14:00", "18:30", "19:00", "20:00", "21:00"].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: B.char }}>
                      Party Size
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold hover:brightness-95 transition-all"
                        style={{
                          background: B.ivory,
                          border: `1px solid ${B.beige}`,
                          color: B.char,
                        }}
                      >
                        −
                      </button>
                      <span
                        className="flex-1 text-center font-semibold text-lg"
                        style={{ color: B.char }}
                      >
                        {guests}
                      </span>
                      <button
                        onClick={() => setGuests(Math.min(20, guests + 1))}
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold hover:brightness-95 transition-all"
                        style={{
                          background: B.ivory,
                          border: `1px solid ${B.beige}`,
                          color: B.char,
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: B.char }}>
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Mrs. Aisha Bello"
                      className="w-full px-3 py-2 rounded text-sm outline-none"
                      style={{
                        border: `1px solid ${B.beige}`,
                        background: B.ivory,
                        color: B.char,
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: B.char }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 801 234 5678"
                      className="w-full px-3 py-2 rounded text-sm outline-none"
                      style={{
                        border: `1px solid ${B.beige}`,
                        background: B.ivory,
                        color: B.char,
                      }}
                    />
                  </div>
                  <button
                    onClick={() => setConfirmed(true)}
                    className="w-full py-3 rounded font-semibold text-sm mt-2 hover:brightness-110 transition-all"
                    style={{ background: B.gold, color: B.white }}
                  >
                    Reserve Table
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: B.green }}
                  >
                    <Check size={22} color="white" />
                  </div>
                  <h4 className="font-semibold mb-1" style={{ color: B.char }}>
                    Reservation Confirmed!
                  </h4>
                  <p className="text-xs mb-4" style={{ color: B.gray }}>
                    A confirmation SMS will be sent to your number. See you soon!
                  </p>
                  <button
                    onClick={() => setConfirmed(false)}
                    className="text-xs font-medium"
                    style={{ color: B.gold }}
                  >
                    Make another reservation →
                  </button>
                </div>
              )}
              <div
                className="mt-5 pt-4 text-center"
                style={{ borderTop: `1px solid ${B.beige}` }}
              >
                <p className="text-xs mb-0.5" style={{ color: B.gray }}>Or call us directly</p>
                <a href="#" className="text-sm font-semibold" style={{ color: B.gold }}>
                  +234 805 030 3270
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Atmosphere strip */}
      <div className="flex h-48 overflow-hidden">
        {[
          "1578474846511-04ba529f0b88",
          "1774509625509-8c452b51649e",
          "1516450360452-9312f5e86fc7",
          "1742844552699-2fb71ad66a72",
        ].map((id, i) => (
          <div key={i} className="flex-1 overflow-hidden" style={{ background: B.brown }}>
            <img
              src={img(id, 400, 300)}
              alt="Restaurant atmosphere"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <WebFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// B7-04: Google Search Result Mockup
// ─────────────────────────────────────────────────────────────────────────────

const HOTELS = [
  {
    name: "Aryhills HOTEL & TOWER",
    stars: 5,
    price: "₦48,000",
    rating: "4.8",
    reviews: "247",
    loc: "Imo, Ilesa, Osun State",
    imgId: "1745725427804-4d94df0c5eb7",
    isAryhills: true,
    tags: ["Pool", "Restaurant", "Free WiFi", "Spa"],
    source: "aryhillshotel.com",
  },
  {
    name: "Lagos Marriott Hotel Ikeja",
    stars: 5,
    price: "₦65,000",
    rating: "4.6",
    reviews: "1,204",
    loc: "Ikeja GRA, Lagos",
    imgId: "1742844552048-410dfdf7b3c7",
    isAryhills: false,
    tags: ["Pool", "Restaurant", "Fitness Centre"],
    source: "booking.com",
  },
  {
    name: "Eko HOTEL & TOWER",
    stars: 4,
    price: "₦55,000",
    rating: "4.4",
    reviews: "892",
    loc: "Imo, Ilesa, Osun State",
    imgId: "1742844552699-2fb71ad66a72",
    isAryhills: false,
    tags: ["Beach Access", "Casino", "Spa"],
    source: "expedia.com",
  },
  {
    name: "Radisson Blu Lagos Ikeja",
    stars: 5,
    price: "₦58,000",
    rating: "4.5",
    reviews: "631",
    loc: "Ikeja, Lagos",
    imgId: "1561912774-79769a0a0a7a",
    isAryhills: false,
    tags: ["Pool", "Restaurant", "Business Centre"],
    source: "hotels.com",
  },
];

function GoogleMockup() {
  return (
    <div style={{ background: "#FFFFFF", fontFamily: "Arial, Helvetica, sans-serif", minHeight: "100vh" }}>

      {/* Annotation banner */}
      <div
        className="px-5 py-2 flex items-center gap-2"
        style={{ background: "rgba(184,134,11,0.08)", borderBottom: "1px solid rgba(184,134,11,0.25)" }}
      >
        <span
          className="px-2 py-0.5 rounded text-xs font-bold text-white flex-shrink-0"
          style={{ background: B.gold }}
        >
          MOCKUP
        </span>
        <span className="text-xs" style={{ color: B.gray }}>
          Illustrative preview of how Aryhills Hotel appears in Google Hotel Ads — for design evaluation only.
        </span>
      </div>

      {/* Google top bar */}
      <div className="px-6 py-3 flex items-center gap-5" style={{ borderBottom: "1px solid #E8EAED" }}>
        <div className="flex-shrink-0 select-none">
          <span style={{ fontSize: "22px", fontWeight: 700 }}>
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#EA4335" }}>o</span>
            <span style={{ color: "#FBBC05" }}>o</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#34A853" }}>l</span>
            <span style={{ color: "#EA4335" }}>e</span>
          </span>
        </div>
        <div className="flex-1 max-w-xl">
          <div
            className="flex items-center rounded-full gap-3 px-4 py-2.5 hover:shadow-md transition-shadow"
            style={{ border: "1px solid #DFE1E5", boxShadow: "0 1px 6px rgba(32,33,36,0.1)" }}
          >
            <input
              readOnly
              defaultValue="hotels in Ilesa Nigeria"
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: "#202124", fontFamily: "Arial, sans-serif" }}
            />
            <div className="w-px h-5 bg-gray-300 mx-1" />
            <Search size={18} style={{ color: "#4285F4" }} />
          </div>
        </div>
        <nav className="flex gap-6 ml-4">
          {["All", "Images", "News", "Maps", "More"].map(t => (
            <button
              key={t}
              className="text-xs pb-1 transition-colors"
              style={{
                fontFamily: "Arial, sans-serif",
                color: t === "All" ? "#1967D2" : "#5F6368",
                borderBottom: t === "All" ? "3px solid #4285F4" : "3px solid transparent",
              }}
            >
              {t}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex gap-6 px-6 py-4" style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Left: results */}
        <div className="flex-1">
          <p className="text-xs mb-4" style={{ color: "#70757A", fontFamily: "Arial, sans-serif" }}>
            About 8,420,000 results (0.43 seconds)
          </p>

          {/* Hotels panel */}
          <div
            className="rounded-xl overflow-hidden mb-5"
            style={{ border: "1px solid #DADCE0", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
          >
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ background: "#F8F9FA", borderBottom: "1px solid #E8EAED" }}
            >
              <span className="text-sm font-medium" style={{ color: "#202124", fontFamily: "Arial, sans-serif" }}>
                Hotels in Ilesa, Nigeria
              </span>
              <div className="flex gap-2">
                {["All filters", "Price", "Star rating", "Amenities"].map(f => (
                  <button
                    key={f}
                    className="px-3 py-1 rounded-full text-xs border hover:bg-gray-100 transition-colors"
                    style={{ borderColor: "#DADCE0", color: "#202124", fontFamily: "Arial, sans-serif" }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {HOTELS.map((hotel, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 transition-colors hover:bg-gray-50"
                style={{
                  borderBottom: i < HOTELS.length - 1 ? "1px solid #E8EAED" : "none",
                  background: hotel.isAryhills ? "rgba(184,134,11,0.04)" : undefined,
                }}
              >
                {/* Photo */}
                <div
                  className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0"
                  style={{ background: "#E8EAED" }}
                >
                  <img
                    src={img(hotel.imgId, 200, 150)}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#1967D2", fontFamily: "Arial, sans-serif" }}
                      >
                        {hotel.name}
                      </span>
                      {hotel.isAryhills && (
                        <span
                          className="px-1.5 py-0.5 rounded text-xs font-bold text-white"
                          style={{ background: B.gold, fontSize: "10px" }}
                        >
                          DIRECT DEAL
                        </span>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div
                        className="text-base font-semibold"
                        style={{ color: "#202124", fontFamily: "Arial, sans-serif" }}
                      >
                        {hotel.price}
                      </div>
                      <div className="text-xs" style={{ color: "#70757A" }}>per night</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <StarRow n={hotel.stars} size={11} />
                    <span className="text-xs font-semibold" style={{ color: "#202124" }}>
                      {hotel.rating}
                    </span>
                    <span className="text-xs" style={{ color: "#70757A" }}>
                      ({hotel.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-xs mb-2" style={{ color: "#70757A" }}>{hotel.loc}</p>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex gap-1.5 flex-wrap">
                      {hotel.tags.map(t => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{ background: "#F1F3F4", color: "#5F6368" }}
                        >
                          {t}
                        </span>
                      ))}
                      <span className="text-xs" style={{ color: "#70757A" }}>
                        via {hotel.source}
                      </span>
                    </div>
                    {hotel.isAryhills ? (
                      <button
                        className="px-4 py-1.5 rounded text-xs font-semibold text-white hover:brightness-110 transition-all"
                        style={{ background: B.gold }}
                      >
                        Book direct ↗
                      </button>
                    ) : (
                      <button
                        className="px-4 py-1.5 rounded text-xs font-medium hover:bg-gray-100 transition-colors"
                        style={{ border: "1px solid #DADCE0", color: "#1967D2" }}
                      >
                        View hotel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="px-5 py-3 text-center" style={{ borderTop: "1px solid #E8EAED" }}>
              <button className="text-sm font-medium" style={{ color: "#1967D2" }}>
                View more hotels ›
              </button>
            </div>
          </div>

          {/* Organic results */}
          {[
            {
              url: "aryhillshotel.com",
              title: "Aryhills HOTEL & TOWER – Official Site | Best Rate Guarantee",
              desc: "Book directly with Aryhills Hotel for the best available rate. Luxury accommodation on Imo, Ilesa, Osun State. Free cancellation available on most rooms.",
            },
            {
              url: "booking.com › hotels › lagos",
              title: "Ilesa hotels – Best Deals from ₦35,000/night – Booking.com",
              desc: "Compare prices on 400+ Ilesa hotels. Secure booking with no hidden fees. Flexible dates & free cancellation on most rooms.",
            },
            {
              url: "tripadvisor.com › hotels-lagos-nigeria",
              title: "Best Hotels in Ilesa 2025 – Reviews & Deals – TripAdvisor",
              desc: "See traveller reviews, candid photos, and great deals for Ilesa hotels. Aryhills Hotel ranked #1 of 127 hotels in Ilesa, Osun State.",
            },
          ].map((r, i) => (
            <div key={i} className="mb-5">
              <div
                className="text-xs mb-0.5"
                style={{ color: "#4D5156", fontFamily: "Arial, sans-serif" }}
              >
                {r.url}
              </div>
              <div
                className="text-lg mb-1 hover:underline cursor-pointer"
                style={{ color: "#1967D2", fontFamily: "Arial, sans-serif" }}
              >
                {r.title}
              </div>
              <p className="text-sm" style={{ color: "#4D5156", fontFamily: "Arial, sans-serif" }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Right: map panel */}
        <div className="w-64 flex-shrink-0">
          <div
            className="rounded-xl overflow-hidden sticky top-4"
            style={{ border: "1px solid #DADCE0" }}
          >
            <div className="h-48 relative overflow-hidden" style={{ background: "#E8F0E8" }}>
              <img
                src={img("1574612357719-5dd0a272afe2", 300, 250)}
                alt="Ilesa map"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg"
                  style={{ background: B.gold }}
                >
                  📍 Imo, Ilesa, Osun State
                </div>
              </div>
            </div>
            <div className="p-3" style={{ background: "#F8F9FA" }}>
              <p
                className="text-xs font-medium mb-0.5"
                style={{ color: "#202124", fontFamily: "Arial, sans-serif" }}
              >
                Hotels near Ilesa, Osun State
              </p>
              <p className="text-xs mb-2" style={{ color: "#70757A" }}>
                4 hotels · Jul 15–18 · 2 guests
              </p>
              <button
                className="w-full text-xs font-medium py-1.5 rounded text-white"
                style={{ background: "#4285F4" }}
              >
                View on Maps
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// B7-05: WhatsApp Chat Widget
// ─────────────────────────────────────────────────────────────────────────────

function WhatsAppPage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: B.ivory, minHeight: "100vh" }}>
      <WebHeader />

      {/* State toggle strip */}
      <div
        className="flex items-center justify-center gap-2 py-2.5"
        style={{ background: "#1A1A1A", borderBottom: `2px solid ${B.gold}` }}
      >
        <span className="text-xs font-semibold mr-1" style={{ color: "#555" }}>WIDGET STATE:</span>
        <button
          onClick={() => setExpanded(false)}
          className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
          style={{
            background: !expanded ? B.gold : "transparent",
            color:      !expanded ? "white" : "#888",
            border:     `1.5px solid ${!expanded ? B.gold : "#444"}`,
          }}
        >
          State A — Closed
        </button>
        <button
          onClick={() => setExpanded(true)}
          className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
          style={{
            background: expanded ? B.gold : "transparent",
            color:      expanded ? "white" : "#888",
            border:     `1.5px solid ${expanded ? B.gold : "#444"}`,
          }}
        >
          State B — Open
        </button>
      </div>

      {/* Homepage hero */}
      <div className="relative h-96 overflow-hidden" style={{ background: B.brown }}>
        <img
          src={img("1690529951054-5818170501a0", 1440, 700)}
          alt="Aryhills Hotel Ilesa"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "rgba(78,52,46,0.65)" }}
        >
          <p
            className="text-xs font-semibold mb-3"
            style={{ color: B.gold, letterSpacing: "0.25em" }}
          >
            Imo, Ilesa, Osun State
          </p>
          <h1
            className="text-5xl font-bold text-white text-center mb-5"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}
          >
            Welcome to Aryhills<br />Hotel &amp; Tower
          </h1>
          <HeroSearch />
        </div>
      </div>

      {/* Teaser content */}
      <div className="max-w-3xl mx-auto px-8 py-12 text-center">
        <p
          className="text-xs font-semibold mb-2"
          style={{ color: B.gold, letterSpacing: "0.25em" }}
        >
          LUXURY REDEFINED
        </p>
        <h2 className="text-3xl font-semibold mb-4" style={{ color: B.char }}>
          Your Ilesa sanctuary awaits
        </h2>
        <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: B.gray }}>
          Set on Ilesa, Osun State, Aryhills Hotel &amp; Tower offers 120 elegantly appointed rooms,
          award-winning dining, a rooftop pool, and dedicated event spaces — all in the heart of Ilesa.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="px-7 py-2.5 rounded text-sm font-semibold hover:brightness-110 transition-all"
            style={{ background: B.gold, color: B.white }}
          >
            Explore Rooms
          </button>
          <button
            className="px-7 py-2.5 rounded text-sm font-semibold transition-all"
            style={{ border: `1.5px solid ${B.gold}`, color: B.gold }}
          >
            View Offers
          </button>
        </div>
      </div>

      {/* WhatsApp widget — sticky to bottom-right of the scrollable content */}
      <div
        className="sticky bottom-0 pb-6 pr-6 flex justify-end pointer-events-none"
        style={{ zIndex: 40 }}
      >
        <div className="flex flex-col items-end gap-3 pointer-events-auto">
          {expanded && (
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ width: "300px", background: "white" }}
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#075E54" }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                  style={{ background: B.gold }}
                >
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold">Aryhills Hotel</div>
                  <div className="text-xs" style={{ color: "#A8D8B9" }}>
                    🟢 Online · Replies in minutes
                  </div>
                </div>
                <button
                  onClick={() => setExpanded(false)}
                  className="text-white opacity-70 hover:opacity-100 flex-shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 min-h-32" style={{ background: "#ECE5DD" }}>
                <div className="flex justify-start">
                  <div
                    className="max-w-xs px-3 py-2 rounded-xl rounded-tl-none text-xs shadow-sm"
                    style={{ background: "white", color: "#333" }}
                  >
                    Hello! 👋 Welcome to Aryhills Hotel. How can we help you today?
                    <div
                      className="text-right mt-1"
                      style={{ fontSize: "10px", color: "#999" }}
                    >
                      10:14 AM
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div
                    className="max-w-xs px-3 py-2 rounded-xl rounded-tr-none text-xs shadow-sm"
                    style={{ background: "#DCF8C6", color: "#333" }}
                  >
                    Hello Aryhills Hotel, I would like to make an enquiry.
                    <div
                      className="text-right mt-1 flex items-center justify-end gap-1"
                      style={{ fontSize: "10px", color: "#999" }}
                    >
                      10:14 AM
                      <Check size={10} style={{ color: "#4FC3F7" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div
                className="flex items-center gap-2 px-3 py-2"
                style={{ borderTop: "1px solid #E0E0E0", background: "white" }}
              >
                <input
                  readOnly
                  placeholder="Type a message..."
                  className="flex-1 text-xs outline-none bg-transparent"
                  style={{ color: "#555" }}
                />
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#25D366" }}
                >
                  <Send size={13} color="white" />
                </button>
              </div>
            </div>
          )}

          {/* FAB */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            style={{ background: "#25D366" }}
          >
            {expanded
              ? <X size={22} color="white" />
              : <MessageCircle size={24} color="white" fill="white" />
            }
          </button>
        </div>
      </div>

      <WebFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// B7-06: Guest Reviews
// ─────────────────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    name: "Mrs. Ngozi Adeleke",
    room: "Honeymoon Suite",
    stars: 5,
    date: "June 2025",
    quote: "The most magical weekend of our lives. Rose petal turndown, couples spa — every detail was perfection. We will be back for every anniversary.",
    avatar: "👩🏾",
  },
  {
    name: "Mr. James Whitfield",
    room: "Executive Suite",
    stars: 5,
    date: "May 2025",
    quote: "Incredible service from check-in to checkout. Staff remembered my name on day two — that personal touch is what makes Aryhills stand apart from any hotel in Ilesa.",
    avatar: "👨🏻",
  },
  {
    name: "Dr. Amara Osei",
    room: "Deluxe Room",
    stars: 4,
    date: "May 2025",
    quote: "Outstanding value for the quality on offer. The breakfast buffet is exceptional — some of the best jollof rice I have had in a hotel anywhere in West Africa.",
    avatar: "👨🏾",
  },
  {
    name: "Ms. Fatimah Al-Hassan",
    room: "Suite",
    stars: 5,
    date: "April 2025",
    quote: "Aryhills exceeded every expectation. The pool view from the 8th floor is breathtaking at sunset. Staff are warm, professional, and genuinely thoughtful.",
    avatar: "👩🏽",
  },
  {
    name: "Mr. David Adeyemi",
    room: "Deluxe Room",
    stars: 4,
    date: "April 2025",
    quote: "Clean, well-furnished, perfectly located in Ilesa. The business centre was well-equipped and room service arrived promptly every time. Solid value in Ilesa.",
    avatar: "👨🏾",
  },
  {
    name: "Mrs. Sarah Thompson",
    room: "Honeymoon Suite",
    stars: 5,
    date: "March 2025",
    quote: "Perfect in every conceivable way. We celebrated our 10th anniversary here and the hotel went above and beyond with surprises. Will return without question.",
    avatar: "👩🏻",
  },
  {
    name: "Engr. Chukwuemeka Eze",
    room: "Executive Suite",
    stars: 5,
    date: "March 2025",
    quote: "My go-to Ilesa hotel for business travel. The concierge team is world-class — arranged last-minute airport transfers and got it done without fuss. Exceptional.",
    avatar: "👨🏿",
  },
  {
    name: "Mrs. Bisi Okafor",
    room: "Deluxe Room",
    stars: 4,
    date: "Feb 2025",
    quote: "Loved the breakfast spread — Nigerian dishes alongside international options. Room was spacious and spotless. Ilesa is charming and Aryhills makes it worth every visit.",
    avatar: "👩🏾",
  },
  {
    name: "Mr. Thomas Reeves",
    room: "Suite",
    stars: 5,
    date: "Feb 2025",
    quote: "I stay here on every Ilesa trip. The consistency is remarkable — same quality, same warmth, same attention to detail every single time. That is rare anywhere.",
    avatar: "👨🏼",
  },
];

const ROOM_FILTERS = ["All Rooms", "Deluxe Room", "Suite", "Executive Suite", "Honeymoon Suite"];

const RATING_BREAKDOWN = [
  { label: "Cleanliness", score: 4.9 },
  { label: "Service",     score: 4.8 },
  { label: "Location",    score: 4.7 },
  { label: "Value",       score: 4.6 },
  { label: "Amenities",   score: 4.8 },
];

function ReviewsPage() {
  const [filter, setFilter] = useState("All Rooms");

  const visible = filter === "All Rooms"
    ? REVIEWS
    : REVIEWS.filter(r => r.room === filter || (filter === "Executive Suite" && r.room === "Executive Suite"));

  return (
    <div style={{ background: B.ivory, fontFamily: "Inter, sans-serif" }}>
      <WebHeader active="Reviews" />

      {/* Hero */}
      <div className="relative h-56 overflow-hidden" style={{ background: B.brown }}>
        <img
          src={img("1742844552699-2fb71ad66a72", 1440, 400)}
          alt="Aryhills Hotel"
          className="w-full h-full object-cover opacity-60"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: "rgba(78,52,46,0.6)" }}
        >
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: B.gold, letterSpacing: "0.25em" }}
          >
            WHAT OUR GUESTS SAY
          </p>
          <h1 className="text-4xl font-bold text-white mb-1" style={{ letterSpacing: "-0.02em" }}>
            Guest Reviews
          </h1>
          <p className="text-sm" style={{ color: B.beige }}>
            Honest experiences from our valued guests.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Rating summary card */}
        <div
          className="rounded-2xl p-8 mb-10 grid grid-cols-3 gap-8"
          style={{ background: B.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          {/* Overall */}
          <div
            className="flex flex-col items-center justify-center col-span-1 border-r"
            style={{ borderColor: B.beige }}
          >
            <div className="text-6xl font-bold mb-1" style={{ color: B.gold }}>4.8</div>
            <StarRow n={5} size={20} />
            <p className="text-sm mt-2" style={{ color: B.gray }}>247 Verified Reviews</p>
            <div
              className="flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(46,125,50,0.1)" }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: B.green }} />
              <span className="text-xs font-semibold" style={{ color: B.green }}>
                96% recommend
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="col-span-2 space-y-3 pl-4">
            {RATING_BREAKDOWN.map(({ label, score }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs font-medium w-24" style={{ color: B.char }}>
                  {label}
                </span>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ background: B.ivory }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(score / 5) * 100}%`, background: B.gold }}
                  />
                </div>
                <span className="text-xs font-semibold w-6 text-right" style={{ color: B.char }}>
                  {score}
                </span>
              </div>
            ))}
            <div className="pt-2">
              <TrustRow />
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {ROOM_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: filter === f ? B.gold : B.white,
                color:      filter === f ? B.white : B.char,
                border:     `1.5px solid ${filter === f ? B.gold : B.beige}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Review cards */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-3 gap-5 mb-10">
            {visible.map((r, i) => (
              <div
                key={i}
                className="rounded-xl p-5 transition-shadow hover:shadow-md"
                style={{ background: B.white, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: B.ivory }}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: B.char }}>
                      {r.name}
                    </div>
                    <div className="text-xs" style={{ color: B.gold }}>{r.room}</div>
                  </div>
                </div>
                <StarRow n={r.stars} />
                <p className="text-xs leading-relaxed mt-2.5 mb-3 italic" style={{ color: B.gray }}>
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="text-xs" style={{ color: B.beige }}>{r.date}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16" style={{ color: B.gray }}>
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-medium">No reviews yet for this room type.</p>
          </div>
        )}

        {/* Google Reviews widget */}
        <div
          className="rounded-2xl p-6"
          style={{ background: B.white, border: `1px solid ${B.beige}` }}
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span
                className="font-bold select-none"
                style={{ fontSize: "20px", fontFamily: "Arial, sans-serif" }}
              >
                <span style={{ color: "#4285F4" }}>G</span>
                <span style={{ color: "#EA4335" }}>o</span>
                <span style={{ color: "#FBBC05" }}>o</span>
                <span style={{ color: "#4285F4" }}>g</span>
                <span style={{ color: "#34A853" }}>l</span>
                <span style={{ color: "#EA4335" }}>e</span>
              </span>
              <span className="text-sm font-medium" style={{ color: B.char }}>Reviews</span>
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                style={{ background: "rgba(184,134,11,0.1)", color: B.gold }}
              >
                <Globe size={10} />
                Verified
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold" style={{ color: B.char }}>4.8</span>
              <StarRow n={5} size={13} />
              <span className="text-xs" style={{ color: B.gray }}>193 Google reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {REVIEWS.slice(0, 3).map((r, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: B.ivory }}>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                    style={{ background: "#E8F0FE" }}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: B.char }}>
                      {r.name.split(" ").slice(-1)[0]}
                    </div>
                    <div className="text-xs" style={{ color: B.gray }}>
                      Local Guide · {r.date}
                    </div>
                  </div>
                </div>
                <StarRow n={r.stars} size={11} />
                <p className="text-xs mt-1.5 leading-relaxed" style={{ color: B.gray }}>
                  {r.quote.slice(0, 80)}...
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="text-xs font-medium" style={{ color: "#1967D2" }}>
              View all 193 reviews on Google ↗
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-12 text-center" style={{ background: B.brown }}>
        <p
          className="text-xs font-semibold mb-2"
          style={{ color: B.gold, letterSpacing: "0.25em" }}
        >
          READY TO EXPERIENCE IT?
        </p>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Book Your Stay at Aryhills
        </h2>
        <button
          className="px-8 py-3 rounded text-sm font-semibold hover:brightness-110 transition-all"
          style={{ background: B.gold, color: B.white }}
        >
          Check Availability
        </button>
      </div>

      <WebFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Global floating WhatsApp (on all real hotel pages)
// ─────────────────────────────────────────────────────────────────────────────

function FloatingWA() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ width: "280px", background: "white" }}
        >
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#075E54" }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
              style={{ background: B.gold }}
            >
              A
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold">Aryhills Hotel</div>
              <div className="text-xs" style={{ color: "#A8D8B9" }}>🟢 Online</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white opacity-70 hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-4" style={{ background: "#ECE5DD" }}>
            <div
              className="px-3 py-2 rounded-xl rounded-tl-none text-xs shadow-sm max-w-52"
              style={{ background: "white", color: "#333" }}
            >
              Hello! 👋 How can we help you today?
            </div>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ borderTop: "1px solid #E0E0E0", background: "white" }}
          >
            <input
              readOnly
              placeholder="Type a message..."
              className="flex-1 text-xs outline-none"
              style={{ color: "#555" }}
            />
            <button
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "#25D366" }}
            >
              <Send size={12} color="white" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{ background: "#25D366" }}
      >
        {open
          ? <X size={22} color="white" />
          : <MessageCircle size={24} color="white" fill="white" />
        }
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────

export default function PublicWebsiteApp() {
  const [screen, setScreen] = useState<ScreenId>("b7-01");
  const current = SCREENS.find(s => s.id === screen)!;

  return (
    <div className="min-h-screen" style={{ background: "#111111", fontFamily: "Inter, sans-serif" }}>

      {/* Screen selector */}
      <div
        className="sticky top-0 z-50 px-4 py-2 flex gap-1.5 overflow-x-auto"
        style={{ background: "#0A0A0A", borderBottom: "1px solid #2A2A2A" }}
      >
        <span
          className="text-xs font-bold flex-shrink-0 self-center mr-2 px-1"
          style={{ color: "#444" }}
        >
          BATCH 7
        </span>
        {SCREENS.map(s => (
          <button
            key={s.id}
            onClick={() => setScreen(s.id)}
            className="px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all flex-shrink-0"
            style={{
              background: screen === s.id ? B.gold : "transparent",
              color:      screen === s.id ? "white" : "#777",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Browser frame */}
      <div className="p-5">
        <BrowserFrame url={current.url}>
          {screen === "b7-01" && <OffersPage />}
          {screen === "b7-02" && <EventsPage />}
          {screen === "b7-03" && <RestaurantPage />}
          {screen === "b7-04" && <GoogleMockup />}
          {screen === "b7-05" && <WhatsAppPage />}
          {screen === "b7-06" && <ReviewsPage />}
        </BrowserFrame>
      </div>

      {/* Global floating WhatsApp — not on Google mockup or the WhatsApp showcase page */}
      {screen !== "b7-04" && screen !== "b7-05" && <FloatingWA />}
    </div>
  );
}


