import { useState } from "react";
import {
  UtensilsCrossed,
  BedDouble,
  MessageSquareWarning,
  PhoneCall,
  MapPin,
  CalendarDays,
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle2,
  ChevronDown,
  Send,
  Clock,
  CheckCheck,
  Star,
  Receipt,
  Wifi,
  Coffee,
  Car,
  Dumbbell,
  Tv,
  X,
  Bell,
  User,
  ChevronRight,
} from "lucide-react";

// ── Brand constants ──────────────────────────────────────────────────────────
const BROWN = "#4E342E";
const GOLD = "#B8860B";
const BEIGE = "#D6C5A4";
const IVORY = "#F8F6F2";
const WHITE = "#EFFFFE";
const CHARCOAL = "#2D2D2D";
const GRAY = "#6C757D";
const GREEN = "#2E7D32";
const AMBER = "#F4A300";
const RED = "#D32F2F";

// ── Shared components ────────────────────────────────────────────────────────
function PhoneFrame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center">
      <p
        className="mb-3 text-xs font-semibold tracking-widest uppercase"
        style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}
      >
        {title}
      </p>
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 375,
          height: 812,
          background: "#1a1a1a",
          borderRadius: 44,
          boxShadow: "0 24px 64px rgba(0,0,0,0.35), inset 0 0 0 2px #333",
        }}
      >
        {/* notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50"
          style={{
            width: 120,
            height: 28,
            background: "#1a1a1a",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        />
        <div
          className="flex flex-col flex-1 overflow-hidden"
          style={{ borderRadius: 40, background: IVORY }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function MobileHeader({
  title,
  onBack,
  badge,
}: {
  title?: string;
  onBack?: () => void;
  badge?: number;
}) {
  return (
    <div
      className="flex items-center justify-between px-4 pt-10 pb-3 flex-shrink-0"
      style={{ background: BROWN, minHeight: 56 }}
    >
      <div className="w-8">
        {onBack && (
          <button onClick={onBack} style={{ color: IVORY }}>
            <ArrowLeft size={20} />
          </button>
        )}
      </div>
      <div className="flex flex-col items-center">
        <span
          className="font-bold text-xs tracking-[0.2em] uppercase"
          style={{ color: BEIGE, fontFamily: "Inter, sans-serif" }}
        >
          Aryhills
        </span>
        {title && (
          <span
            className="font-semibold text-sm"
            style={{ color: WHITE, fontFamily: "Inter, sans-serif" }}
          >
            {title}
          </span>
        )}
      </div>
      <div className="w-8 flex justify-end relative">
        <Bell size={18} style={{ color: BEIGE }} />
        {badge !== undefined && badge > 0 && (
          <span
            className="absolute -top-1 -right-1 text-white rounded-full flex items-center justify-center font-bold"
            style={{ background: RED, fontSize: 9, width: 14, height: 14 }}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    resolved: { bg: "#E8F5E9", text: GREEN, label: "Resolved" },
    completed: { bg: "#E8F5E9", text: GREEN, label: "Completed" },
    confirmed: { bg: "#E8F5E9", text: GREEN, label: "Confirmed" },
    "in-progress": { bg: "#FFF8E1", text: AMBER, label: "In Progress" },
    pending: { bg: "#FFF8E1", text: AMBER, label: "Pending" },
    acknowledged: { bg: "#FFF8E1", text: AMBER, label: "Acknowledged" },
    urgent: { bg: "#FFEBEE", text: RED, label: "Urgent" },
    cancelled: { bg: "#FFEBEE", text: RED, label: "Cancelled" },
    submitted: { bg: "#F5F5F5", text: GRAY, label: "Submitted" },
  };
  const s = map[status] ?? { bg: "#F5F5F5", text: GRAY, label: status };
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.text, fontFamily: "Inter, sans-serif" }}
    >
      {s.label}
    </span>
  );
}

function GoldButton({
  children,
  onClick,
  disabled,
  small,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="font-semibold transition-opacity"
      style={{
        background: disabled ? GRAY : GOLD,
        color: WHITE,
        borderRadius: 8,
        padding: small ? "8px 16px" : "14px 24px",
        fontFamily: "Inter, sans-serif",
        fontSize: small ? 13 : 14,
        opacity: disabled ? 0.6 : 1,
        width: small ? "auto" : "100%",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

// ── Screen 1: Guest Portal Home ──────────────────────────────────────────────
const serviceMenu = [
  { icon: UtensilsCrossed, label: "Food &\nBeverage", screen: "roomservice" },
  { icon: BedDouble, label: "Housekeeping", screen: "none" },
  { icon: MessageSquareWarning, label: "Complaints", screen: "complaint" },
  { icon: PhoneCall, label: "Contact\nReception", screen: "chat" },
  { icon: MapPin, label: "Concierge\n& Info", screen: "none" },
  { icon: CalendarDays, label: "My Stay", screen: "bill" },
];

function GuestPortalHome({ navigate }: { navigate: (s: string) => void }) {
  return (
    <PhoneFrame title="B5-01 Guest Portal Home">
      <MobileHeader badge={2} />
      <div className="flex-1 overflow-y-auto" style={{ background: IVORY }}>
        {/* Hero greeting */}
        <div
          className="px-5 pt-5 pb-6"
          style={{
            background: `linear-gradient(135deg, ${BROWN} 0%, #6D4C41 100%)`,
          }}
        >
          <p className="text-xs font-medium mb-1" style={{ color: BEIGE, fontFamily: "Inter, sans-serif", letterSpacing: "0.1em" }}>
            WELCOME BACK
          </p>
          <h1
            className="font-bold mb-0.5"
            style={{ color: WHITE, fontFamily: "Inter, sans-serif", fontSize: 22 }}
          >
            Mr. Chidi Okafor
          </h1>
          <p className="text-sm" style={{ color: BEIGE, fontFamily: "Inter, sans-serif" }}>
            Suite 310 · Check-out: Jul 3, 2025
          </p>
          <div
            className="mt-4 rounded-xl p-3 flex items-center gap-3"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <Star size={16} fill={GOLD} stroke="none" />
            <span className="text-xs font-medium" style={{ color: BEIGE, fontFamily: "Inter, sans-serif" }}>
              Gold Member · 4,820 Reward Points
            </span>
          </div>
        </div>

        {/* Quick status strip */}
        <div
          className="mx-4 -mt-4 rounded-xl p-4 flex justify-between"
          style={{
            background: WHITE,
            boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
          }}
        >
          {[
            { label: "Check-in", value: "Jun 29" },
            { label: "Nights", value: "4" },
            { label: "Balance", value: "₦0" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span
                className="font-bold"
                style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif", fontSize: 16 }}
              >
                {item.value}
              </span>
              <span
                className="text-xs mt-0.5"
                style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Service grid */}
        <div className="px-4 pt-6 pb-2">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}
          >
            How can we help?
          </p>
          <div className="grid grid-cols-3 gap-3">
            {serviceMenu.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => item.screen !== "none" && navigate(item.screen)}
                  className="flex flex-col items-center justify-center rounded-xl py-4 px-2 transition-transform active:scale-95"
                  style={{
                    background: WHITE,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    border: `1px solid rgba(78,52,46,0.08)`,
                    minHeight: 96,
                    cursor: item.screen !== "none" ? "pointer" : "default",
                  }}
                >
                  <div
                    className="rounded-full flex items-center justify-center mb-2"
                    style={{ background: `${GOLD}18`, width: 40, height: 40 }}
                  >
                    <Icon size={18} style={{ color: GOLD }} />
                  </div>
                  <span
                    className="text-xs font-medium text-center leading-tight"
                    style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif", whiteSpace: "pre-line" }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent request banner */}
        <div className="px-4 pt-5 pb-6">
          <button
            onClick={() => navigate("tracker")}
            className="w-full rounded-xl p-4 flex items-center justify-between"
            style={{
              background: WHITE,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              border: `1px solid rgba(78,52,46,0.08)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="rounded-full flex items-center justify-center"
                style={{ background: "#FFF8E1", width: 36, height: 36 }}
              >
                <Clock size={16} style={{ color: AMBER }} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                  Towel replacement
                </p>
                <p className="text-xs" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
                  In progress · requested 14 min ago
                </p>
              </div>
            </div>
            <ChevronRight size={16} style={{ color: GRAY }} />
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Screen 2: Room Service Order Flow ────────────────────────────────────────
const menuItems = [
  {
    id: 1,
    name: "Grilled Chicken Suya",
    desc: "Spiced strips, roasted peppers, onion salad",
    price: 4800,
    img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=200&h=140&fit=crop&auto=format",
    category: "Mains",
  },
  {
    id: 2,
    name: "Jollof Rice & Plantain",
    desc: "Smoky party jollof, fried sweet plantain",
    price: 3500,
    img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=140&fit=crop&auto=format",
    category: "Mains",
  },
  {
    id: 3,
    name: "Prawn Pepper Soup",
    desc: "Aromatic broth, king prawns, uziza leaves",
    price: 5200,
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=140&fit=crop&auto=format",
    category: "Starters",
  },
  {
    id: 4,
    name: "Club Sandwich",
    desc: "Chicken, bacon, egg, lettuce, tomato",
    price: 2900,
    img: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=200&h=140&fit=crop&auto=format",
    category: "Starters",
  },
  {
    id: 5,
    name: "Chapman Mocktail",
    desc: "Fanta, Ribena, cucumber, orange, lime",
    price: 1800,
    img: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=200&h=140&fit=crop&auto=format",
    category: "Drinks",
  },
];

function RoomServiceFlow({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<"menu" | "cart" | "confirm">("menu");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const cartItems = menuItems.filter((m) => (quantities[m.id] ?? 0) > 0);
  const subtotal = cartItems.reduce((s, m) => s + m.price * (quantities[m.id] ?? 0), 0);
  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  const adjust = (id: number, delta: number) => {
    setQuantities((q) => {
      const next = Math.max(0, (q[id] ?? 0) + delta);
      const updated = { ...q };
      if (next === 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  };

  if (step === "confirm") {
    const ticket = "RS-" + Math.floor(10000 + Math.random() * 90000);
    return (
      <PhoneFrame title="B5-02C Order Confirmation">
        <MobileHeader title="Order Placed" onBack={() => setStep("cart")} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8" style={{ background: IVORY }}>
          <div
            className="rounded-full flex items-center justify-center mb-5"
            style={{ background: "#E8F5E9", width: 72, height: 72 }}
          >
            <CheckCircle2 size={36} style={{ color: GREEN }} />
          </div>
          <h2
            className="font-bold text-center mb-2"
            style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif", fontSize: 20 }}
          >
            Order Confirmed!
          </h2>
          <p className="text-sm text-center mb-6" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
            Your order has been sent to the kitchen.
          </p>

          <div
            className="w-full rounded-xl p-5 mb-5"
            style={{ background: WHITE, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold" style={{ color: GRAY, fontFamily: "Inter, sans-serif", letterSpacing: "0.1em" }}>
                ORDER REFERENCE
              </span>
              <span className="font-bold text-sm" style={{ color: GOLD, fontFamily: "Inter, sans-serif" }}>
                {ticket}
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                Delivery to
              </span>
              <span className="text-sm font-medium" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                Suite 310
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                Estimated delivery
              </span>
              <span
                className="font-bold text-sm px-3 py-1 rounded-full"
                style={{ background: "#FFF8E1", color: AMBER, fontFamily: "Inter, sans-serif" }}
              >
                25–30 min
              </span>
            </div>
          </div>

          <div
            className="w-full rounded-xl p-4 mb-6 flex items-center gap-3"
            style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}30` }}
          >
            <Clock size={16} style={{ color: GOLD }} />
            <p className="text-xs" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
              You will receive a call when your order is on its way.
            </p>
          </div>

          <GoldButton onClick={onBack}>Back to Home</GoldButton>
        </div>
      </PhoneFrame>
    );
  }

  if (step === "cart") {
    return (
      <PhoneFrame title="B5-02B Cart & Summary">
        <MobileHeader title="Your Order" onBack={() => setStep("menu")} />
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4" style={{ background: IVORY }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
            Order Items
          </p>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl p-3 mb-3"
              style={{ background: WHITE, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              <img
                src={item.img}
                alt={item.name}
                className="rounded-lg flex-shrink-0 object-cover"
                style={{ width: 56, height: 56, background: BEIGE }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                  {item.name}
                </p>
                <p className="text-xs" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
                  ₦{item.price.toLocaleString()} each
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjust(item.id, -1)}
                  className="rounded-full flex items-center justify-center"
                  style={{ background: IVORY, width: 24, height: 24, border: `1px solid ${BEIGE}` }}
                >
                  <Minus size={10} style={{ color: CHARCOAL }} />
                </button>
                <span className="text-sm font-semibold w-4 text-center" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                  {quantities[item.id]}
                </span>
                <button
                  onClick={() => adjust(item.id, 1)}
                  className="rounded-full flex items-center justify-center"
                  style={{ background: GOLD, width: 24, height: 24 }}
                >
                  <Plus size={10} style={{ color: WHITE }} />
                </button>
              </div>
            </div>
          ))}

          {/* Order totals */}
          <div
            className="rounded-xl p-4 mt-2"
            style={{ background: WHITE, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
              Price Summary
            </p>
            {[
              { label: "Subtotal", value: `₦${subtotal.toLocaleString()}` },
              { label: "Delivery fee", value: `₦${deliveryFee.toLocaleString()}` },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-1.5">
                <span className="text-sm" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
                  {row.label}
                </span>
                <span className="text-sm" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                  {row.value}
                </span>
              </div>
            ))}
            <div
              className="flex justify-between pt-3 mt-1"
              style={{ borderTop: `1px solid rgba(0,0,0,0.08)` }}
            >
              <span className="font-bold text-sm" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                Total
              </span>
              <span className="font-bold text-base" style={{ color: GOLD, fontFamily: "Inter, sans-serif" }}>
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-3 px-1">
            <p className="text-xs mb-2" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
              Delivery note (optional)
            </p>
            <input
              placeholder="e.g. No pepper please"
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
              style={{
                background: WHITE,
                border: `1px solid rgba(78,52,46,0.15)`,
                color: CHARCOAL,
                fontFamily: "Inter, sans-serif",
              }}
            />
          </div>
        </div>
        <div className="px-4 py-4 flex-shrink-0" style={{ background: IVORY }}>
          <GoldButton onClick={() => setStep("confirm")}>Place Order · ₦{total.toLocaleString()}</GoldButton>
        </div>
      </PhoneFrame>
    );
  }

  // Menu
  const categories = ["All", "Starters", "Mains", "Drinks"];
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? menuItems : menuItems.filter((m) => m.category === activeCategory);

  return (
    <PhoneFrame title="B5-02A Digital Menu">
      <MobileHeader title="Room Service" onBack={onBack} />
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: IVORY }}>
        {/* Category tabs */}
        <div
          className="flex gap-2 px-4 py-3 overflow-x-auto flex-shrink-0"
          style={{ borderBottom: `1px solid rgba(78,52,46,0.08)`, background: WHITE }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors"
              style={{
                background: activeCategory === cat ? GOLD : IVORY,
                color: activeCategory === cat ? WHITE : GRAY,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-xl mb-3 overflow-hidden"
              style={{ background: WHITE, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full object-cover"
                style={{ height: 120, background: BEIGE }}
              />
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-semibold text-sm" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                      {item.name}
                    </p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
                      {item.desc}
                    </p>
                    <p className="font-bold text-sm mt-2" style={{ color: GOLD, fontFamily: "Inter, sans-serif" }}>
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                    {(quantities[item.id] ?? 0) > 0 ? (
                      <>
                        <button
                          onClick={() => adjust(item.id, -1)}
                          className="rounded-full flex items-center justify-center"
                          style={{ background: IVORY, width: 28, height: 28, border: `1px solid ${BEIGE}` }}
                        >
                          <Minus size={12} style={{ color: CHARCOAL }} />
                        </button>
                        <span className="font-bold text-sm w-5 text-center" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                          {quantities[item.id]}
                        </span>
                      </>
                    ) : null}
                    <button
                      onClick={() => adjust(item.id, 1)}
                      className="rounded-full flex items-center justify-center"
                      style={{ background: GOLD, width: 28, height: 28 }}
                    >
                      <Plus size={12} style={{ color: WHITE }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating cart button */}
        {totalItems > 0 && (
          <div className="px-4 pb-5 flex-shrink-0" style={{ background: IVORY }}>
            <button
              onClick={() => setStep("cart")}
              className="w-full rounded-lg py-3.5 flex items-center justify-between px-5 font-semibold text-sm transition-opacity"
              style={{ background: GOLD, color: WHITE, fontFamily: "Inter, sans-serif" }}
            >
              <span
                className="rounded-full flex items-center justify-center font-bold text-xs"
                style={{ background: "rgba(255,255,255,0.25)", width: 22, height: 22 }}
              >
                {totalItems}
              </span>
              <span>View Cart</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

// ── Screen 3: Complaint Form ─────────────────────────────────────────────────
const complaintCategories = [
  "Room Cleanliness",
  "Noise / Disturbance",
  "Maintenance Issue",
  "Staff Conduct",
  "Food Quality",
  "Billing Dispute",
  "Other",
];

function ComplaintFlow({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<"low" | "medium" | "high" | "">("");
  const [showDropdown, setShowDropdown] = useState(false);

  const ticketNo = "CMP-2025-4471";

  if (submitted) {
    return (
      <PhoneFrame title="B5-03B Complaint Success">
        <MobileHeader title="Complaint Filed" onBack={onBack} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8" style={{ background: IVORY }}>
          <div
            className="rounded-full flex items-center justify-center mb-5"
            style={{ background: "#E8F5E9", width: 72, height: 72 }}
          >
            <CheckCircle2 size={36} style={{ color: GREEN }} />
          </div>
          <h2
            className="font-bold text-center mb-2"
            style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif", fontSize: 20 }}
          >
            Complaint Received
          </h2>
          <p className="text-sm text-center mb-6" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
            We take every concern seriously. Our team has been notified.
          </p>

          <div
            className="w-full rounded-xl p-5 mb-4"
            style={{ background: WHITE, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold" style={{ color: GRAY, fontFamily: "Inter, sans-serif", letterSpacing: "0.1em" }}>
                TICKET NUMBER
              </span>
              <span className="font-bold text-sm" style={{ color: GOLD, fontFamily: "Inter, sans-serif" }}>
                {ticketNo}
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>Category</span>
              <span className="text-sm font-medium" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>{category || "Room Cleanliness"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>Room</span>
              <span className="text-sm font-medium" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>Suite 310</span>
            </div>
          </div>

          <div
            className="w-full rounded-xl p-4 mb-6 flex items-start gap-3"
            style={{ background: `${AMBER}12`, border: `1px solid ${AMBER}30` }}
          >
            <PhoneCall size={16} style={{ color: AMBER, flexShrink: 0, marginTop: 1 }} />
            <p className="text-sm font-semibold" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
              We are calling your room now.
            </p>
          </div>

          <GoldButton onClick={onBack}>Back to Home</GoldButton>
        </div>
      </PhoneFrame>
    );
  }

  const severities = [
    { key: "low", label: "Low", color: GREEN, bg: "#E8F5E9" },
    { key: "medium", label: "Medium", color: AMBER, bg: "#FFF8E1" },
    { key: "high", label: "High", color: RED, bg: "#FFEBEE" },
  ] as const;

  return (
    <PhoneFrame title="B5-03A Complaint Form">
      <MobileHeader title="File a Complaint" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-4" style={{ background: IVORY }}>
        {/* Room prefilled */}
        <div className="mb-5">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
            Room Number
          </label>
          <div
            className="rounded-lg px-3 py-3 flex items-center justify-between"
            style={{ background: `${BEIGE}40`, border: `1px solid ${BEIGE}` }}
          >
            <span className="text-sm font-medium" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
              Suite 310
            </span>
            <span className="text-xs" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
              Pre-filled
            </span>
          </div>
        </div>

        {/* Category dropdown */}
        <div className="mb-5 relative">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
            Category <span style={{ color: RED }}>*</span>
          </label>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full rounded-lg px-3 py-3 flex items-center justify-between"
            style={{
              background: WHITE,
              border: `1px solid rgba(78,52,46,0.15)`,
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span className="text-sm" style={{ color: category ? CHARCOAL : GRAY }}>
              {category || "Select a category"}
            </span>
            <ChevronDown size={14} style={{ color: GRAY }} />
          </button>
          {showDropdown && (
            <div
              className="absolute z-10 w-full rounded-xl mt-1 overflow-hidden"
              style={{ background: WHITE, boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}
            >
              {complaintCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setShowDropdown(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                  style={{
                    color: category === cat ? GOLD : CHARCOAL,
                    background: category === cat ? `${GOLD}10` : "transparent",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: category === cat ? 600 : 400,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
            Description <span style={{ color: RED }}>*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Describe the issue in detail…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg px-3 py-2.5 text-sm outline-none resize-none"
            style={{
              background: WHITE,
              border: `1px solid rgba(78,52,46,0.15)`,
              color: CHARCOAL,
              fontFamily: "Inter, sans-serif",
            }}
          />
          <p className="text-xs mt-1 text-right" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
            {description.length}/300
          </p>
        </div>

        {/* Severity */}
        <div className="mb-6">
          <label className="text-xs font-medium mb-2 block" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
            Severity <span style={{ color: RED }}>*</span>
          </label>
          <div className="flex gap-2">
            {severities.map((s) => (
              <button
                key={s.key}
                onClick={() => setSeverity(s.key)}
                className="flex-1 rounded-lg py-2 text-sm font-semibold transition-all"
                style={{
                  background: severity === s.key ? s.bg : IVORY,
                  color: severity === s.key ? s.color : GRAY,
                  border: `1.5px solid ${severity === s.key ? s.color : "transparent"}`,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <GoldButton
          onClick={() => setSubmitted(true)}
          disabled={!category || !description || !severity}
        >
          Submit Complaint
        </GoldButton>
        <p className="text-xs text-center mt-3" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
          A ticket number will be generated immediately.
        </p>
      </div>
    </PhoneFrame>
  );
}

// ── Screen 4: Live Chat ──────────────────────────────────────────────────────
const initialMessages = [
  { id: 1, from: "hotel", text: "Good evening, Mr. Okafor! Welcome to Aryhills. How may I assist you tonight?", time: "8:02 PM", read: true },
  { id: 2, from: "guest", text: "Hi, I'd like extra towels and a bottle of still water please.", time: "8:03 PM", read: true },
  { id: 3, from: "hotel", text: "Of course! I've placed that request with housekeeping. It should reach Suite 310 in about 10 minutes.", time: "8:04 PM", read: true },
  { id: 4, from: "guest", text: "Great. Also, can you recommend a good restaurant nearby for breakfast?", time: "8:05 PM", read: true },
  { id: 5, from: "hotel", text: "Absolutely! our Aryhills Restaurant on the ground floor does a wonderful continental spread — highly rated by our guests. Shall I make a reservation for tomorrow morning?", time: "8:06 PM", read: true },
];

function LiveChat({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      from: "guest" as const,
      text: input.trim(),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setMessages((m) => [...m, newMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: m.length + 1,
          from: "hotel",
          text: "Thank you for reaching out. We will attend to that right away!",
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          read: true,
        },
      ]);
    }, 2000);
  };

  return (
    <PhoneFrame title="B5-04 Live Chat">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 pt-10 pb-3 flex-shrink-0"
        style={{ background: BROWN }}
      >
        <button onClick={onBack} style={{ color: IVORY }}>
          <ArrowLeft size={20} />
        </button>
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ width: 36, height: 36, background: GOLD }}
        >
          <span className="text-xs font-bold" style={{ color: WHITE, fontFamily: "Inter, sans-serif" }}>A</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: WHITE, fontFamily: "Inter, sans-serif" }}>
            Aryhills Reception
          </p>
          <div className="flex items-center gap-1">
            <span className="rounded-full" style={{ width: 6, height: 6, background: GREEN, display: "inline-block" }} />
            <span className="text-xs" style={{ color: BEIGE, fontFamily: "Inter, sans-serif" }}>Online now</span>
          </div>
        </div>
        <div className="relative">
          <Bell size={18} style={{ color: BEIGE }} />
          <span
            className="absolute -top-1 -right-1 text-white rounded-full flex items-center justify-center font-bold"
            style={{ background: RED, fontSize: 9, width: 14, height: 14 }}
          >
            2
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ background: IVORY }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.from === "guest" ? "flex-row-reverse" : "flex-row"}`}
          >
            {msg.from === "hotel" && (
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0 self-end"
                style={{ width: 28, height: 28, background: BROWN, marginBottom: 2 }}
              >
                <span style={{ color: BEIGE, fontSize: 9, fontFamily: "Inter, sans-serif", fontWeight: 700 }}>AH</span>
              </div>
            )}
            <div
              className="rounded-2xl px-3 py-2 max-w-[70%]"
              style={{
                background: msg.from === "guest" ? GOLD : WHITE,
                borderBottomRightRadius: msg.from === "guest" ? 4 : 16,
                borderBottomLeftRadius: msg.from === "hotel" ? 4 : 16,
                boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: msg.from === "guest" ? WHITE : CHARCOAL, fontFamily: "Inter, sans-serif" }}
              >
                {msg.text}
              </p>
              <div className={`flex items-center gap-1 mt-1 ${msg.from === "guest" ? "justify-end" : "justify-start"}`}>
                <span style={{ fontSize: 10, color: msg.from === "guest" ? "rgba(255,255,255,0.7)" : GRAY, fontFamily: "Inter, sans-serif" }}>
                  {msg.time}
                </span>
                {msg.from === "guest" && (
                  <CheckCheck size={12} style={{ color: "rgba(255,255,255,0.7)" }} />
                )}
              </div>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2 items-end">
            <div
              className="rounded-full flex items-center justify-center flex-shrink-0"
              style={{ width: 28, height: 28, background: BROWN }}
            >
              <span style={{ color: BEIGE, fontSize: 9, fontFamily: "Inter, sans-serif", fontWeight: 700 }}>AH</span>
            </div>
            <div
              className="rounded-2xl px-4 py-3 flex gap-1 items-center"
              style={{ background: WHITE, borderBottomLeftRadius: 4, boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    background: GRAY,
                    display: "inline-block",
                    animation: `typing-dot 1.2s ${i * 0.2}s infinite ease-in-out`,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
        style={{ background: WHITE, borderTop: `1px solid rgba(78,52,46,0.1)` }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message…"
          className="flex-1 rounded-full px-4 py-2 text-sm outline-none"
          style={{
            background: IVORY,
            border: `1px solid rgba(78,52,46,0.12)`,
            color: CHARCOAL,
            fontFamily: "Inter, sans-serif",
          }}
        />
        <button
          onClick={sendMessage}
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: GOLD, width: 36, height: 36 }}
        >
          <Send size={14} style={{ color: WHITE }} />
        </button>
      </div>
    </PhoneFrame>
  );
}

// ── Screen 5: Request Tracker ────────────────────────────────────────────────
const requests = [
  {
    id: "REQ-8821",
    title: "Extra Towels",
    category: "Housekeeping",
    priority: "low",
    stages: [
      { key: "submitted", label: "Submitted", time: "Jun 29, 8:05 PM", done: true },
      { key: "acknowledged", label: "Acknowledged", time: "Jun 29, 8:07 PM", done: true },
      { key: "in-progress", label: "In Progress", time: "Jun 29, 8:10 PM", done: true },
      { key: "resolved", label: "Resolved", time: "Jun 29, 8:22 PM", done: true },
    ],
    status: "resolved",
  },
  {
    id: "REQ-8847",
    title: "AC Thermostat Not Working",
    category: "Maintenance",
    priority: "high",
    stages: [
      { key: "submitted", label: "Submitted", time: "Jun 29, 9:30 PM", done: true },
      { key: "acknowledged", label: "Acknowledged", time: "Jun 29, 9:35 PM", done: true },
      { key: "in-progress", label: "In Progress", time: "Jun 29, 9:50 PM", done: true },
      { key: "resolved", label: "Resolved", time: "—", done: false },
    ],
    status: "in-progress",
  },
  {
    id: "REQ-8859",
    title: "Late Checkout Request",
    category: "Front Desk",
    priority: "medium",
    stages: [
      { key: "submitted", label: "Submitted", time: "Jun 30, 7:00 AM", done: true },
      { key: "acknowledged", label: "Acknowledged", time: "—", done: false },
      { key: "in-progress", label: "In Progress", time: "—", done: false },
      { key: "resolved", label: "Resolved", time: "—", done: false },
    ],
    status: "pending",
  },
];

const priorityColors: Record<string, { color: string; bg: string }> = {
  low: { color: GREEN, bg: "#E8F5E9" },
  medium: { color: AMBER, bg: "#FFF8E1" },
  high: { color: RED, bg: "#FFEBEE" },
};

function RequestTracker({ onBack }: { onBack: () => void }) {
  const [expanded, setExpanded] = useState<string | null>("REQ-8847");

  return (
    <PhoneFrame title="B5-05 My Requests">
      <MobileHeader title="My Requests" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6" style={{ background: IVORY }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
          3 Requests · Suite 310
        </p>
        {requests.map((req) => {
          const pc = priorityColors[req.priority];
          const isOpen = expanded === req.id;
          return (
            <div
              key={req.id}
              className="rounded-xl mb-3 overflow-hidden"
              style={{ background: WHITE, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
            >
              <button
                className="w-full text-left p-4 flex items-start justify-between gap-2"
                onClick={() => setExpanded(isOpen ? null : req.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}
                    >
                      {req.id}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: pc.bg, color: pc.color, fontFamily: "Inter, sans-serif" }}
                    >
                      {req.priority.charAt(0).toUpperCase() + req.priority.slice(1)} Priority
                    </span>
                  </div>
                  <p className="font-semibold text-sm" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                    {req.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
                    {req.category}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={req.status} />
                  <ChevronDown
                    size={14}
                    style={{
                      color: GRAY,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1">
                  <div className="relative pl-4">
                    {req.stages.map((stage, idx) => {
                      const isLast = idx === req.stages.length - 1;
                      const isDone = stage.done;
                      const isActive = isDone && (isLast || !req.stages[idx + 1].done);
                      return (
                        <div key={stage.key} className="flex items-start gap-3 mb-0">
                          <div className="flex flex-col items-center">
                            <div
                              className="rounded-full flex-shrink-0 z-10"
                              style={{
                                width: 12,
                                height: 12,
                                marginTop: 3,
                                background: isDone ? (isActive ? GOLD : GREEN) : IVORY,
                                border: `2px solid ${isDone ? (isActive ? GOLD : GREEN) : BEIGE}`,
                              }}
                            />
                            {!isLast && (
                              <div
                                style={{
                                  width: 2,
                                  height: 28,
                                  background: req.stages[idx + 1].done ? GREEN : BEIGE,
                                  marginTop: 2,
                                  marginBottom: 2,
                                }}
                              />
                            )}
                          </div>
                          <div className="flex-1 pb-0" style={{ paddingBottom: isLast ? 0 : 12 }}>
                            <p
                              className="text-xs font-semibold"
                              style={{
                                color: isDone ? CHARCOAL : GRAY,
                                fontFamily: "Inter, sans-serif",
                              }}
                            >
                              {stage.label}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}
                            >
                              {stage.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PhoneFrame>
  );
}

// ── Screen 6: View My Bill ────────────────────────────────────────────────────
const billSections = [
  {
    category: "Room & Board",
    icon: BedDouble,
    items: [
      { desc: "Suite 310 — Jun 29", qty: 1, unit: 85000, total: 85000 },
      { desc: "Suite 310 — Jun 30", qty: 1, unit: 85000, total: 85000 },
      { desc: "Suite 310 — Jul 1", qty: 1, unit: 85000, total: 85000 },
      { desc: "Suite 310 — Jul 2", qty: 1, unit: 85000, total: 85000 },
    ],
  },
  {
    category: "Food & Beverage",
    icon: UtensilsCrossed,
    items: [
      { desc: "Grilled Chicken Suya (Jun 29)", qty: 1, unit: 4800, total: 4800 },
      { desc: "Chapman Mocktail × 2 (Jun 30)", qty: 2, unit: 1800, total: 3600 },
      { desc: "Club Sandwich (Jul 1)", qty: 1, unit: 2900, total: 2900 },
    ],
  },
  {
    category: "Spa & Wellness",
    icon: Dumbbell,
    items: [{ desc: "Deep tissue massage (Jun 30)", qty: 1, unit: 22000, total: 22000 }],
  },
  {
    category: "Business Centre",
    icon: Wifi,
    items: [
      { desc: "High-speed Wi-Fi (4 days)", qty: 4, unit: 2000, total: 8000 },
      { desc: "Printing service (Jun 30)", qty: 1, unit: 500, total: 500 },
    ],
  },
];

function ViewMyBill({ onBack }: { onBack: () => void }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Room & Board": true,
    "Food & Beverage": true,
  });

  const toggle = (cat: string) =>
    setOpenSections((s) => ({ ...s, [cat]: !s[cat] }));

  const subtotal = billSections.flatMap((s) => s.items).reduce((a, i) => a + i.total, 0);
  const vat = Math.round(subtotal * 0.075);
  const serviceCharge = Math.round(subtotal * 0.05);
  const total = subtotal + vat + serviceCharge;

  return (
    <PhoneFrame title="B5-06 View My Bill">
      <MobileHeader title="My Bill" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-6" style={{ background: IVORY }}>
        {/* Folio header */}
        <div className="px-4 pt-4 pb-4" style={{ background: BROWN }}>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-sm" style={{ color: WHITE, fontFamily: "Inter, sans-serif" }}>
                Mr. Chidi Okafor
              </p>
              <p className="text-xs mt-0.5" style={{ color: BEIGE, fontFamily: "Inter, sans-serif" }}>
                Suite 310 · Folio #F-20250629-310
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: BEIGE, fontFamily: "Inter, sans-serif" }}>Jun 29 – Jul 3</p>
              <StatusBadge status="confirmed" />
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">
          {billSections.map((section) => {
            const Icon = section.icon;
            const sectionTotal = section.items.reduce((a, i) => a + i.total, 0);
            const isOpen = !!openSections[section.category];
            return (
              <div
                key={section.category}
                className="rounded-xl mb-3 overflow-hidden"
                style={{ background: WHITE, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
              >
                <button
                  className="w-full flex items-center justify-between p-4"
                  onClick={() => toggle(section.category)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-lg flex items-center justify-center"
                      style={{ background: `${GOLD}18`, width: 32, height: 32 }}
                    >
                      <Icon size={14} style={{ color: GOLD }} />
                    </div>
                    <span className="font-semibold text-sm" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                      {section.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm" style={{ color: GOLD, fontFamily: "Inter, sans-serif" }}>
                      ₦{sectionTotal.toLocaleString()}
                    </span>
                    <ChevronDown
                      size={14}
                      style={{
                        color: GRAY,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div style={{ borderTop: `1px solid rgba(0,0,0,0.06)` }}>
                    {section.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-4 py-2.5"
                        style={{
                          background: idx % 2 === 1 ? `${BEIGE}20` : "transparent",
                        }}
                      >
                        <div className="flex-1 pr-2">
                          <p className="text-xs" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                            {item.desc}
                          </p>
                          {item.qty > 1 && (
                            <p className="text-xs" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
                              {item.qty} × ₦{item.unit.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <span className="text-xs font-medium flex-shrink-0" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                          ₦{item.total.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Taxes & totals */}
          <div
            className="rounded-xl p-4 mb-4"
            style={{ background: WHITE, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
              Summary
            </p>
            {[
              { label: "Subtotal", value: subtotal },
              { label: "VAT (7.5%)", value: vat },
              { label: "Service charge (5%)", value: serviceCharge },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-1.5">
                <span className="text-sm" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
                  {row.label}
                </span>
                <span className="text-sm" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                  ₦{row.value.toLocaleString()}
                </span>
              </div>
            ))}
            <div
              className="flex justify-between pt-3 mt-2"
              style={{ borderTop: `2px solid ${GOLD}30` }}
            >
              <span className="font-bold text-sm" style={{ color: CHARCOAL, fontFamily: "Inter, sans-serif" }}>
                Total Due
              </span>
              <span className="font-bold text-base" style={{ color: GOLD, fontFamily: "Inter, sans-serif" }}>
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>

          <GoldButton>Request Express Checkout</GoldButton>
          <p className="text-xs text-center mt-2" style={{ color: GRAY, fontFamily: "Inter, sans-serif" }}>
            Balance charged to card on file · ····4821
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ── Root app / navigation ────────────────────────────────────────────────────
export default function GuestMobileApp() {
  const [screen, setScreen] = useState<string>("home");

  const goHome = () => setScreen("home");

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "#E8E0D8", fontFamily: "Inter, sans-serif" }}
    >
      <style>{`
        @keyframes typing-dot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>

      {/* Title bar */}
      <div
        className="w-full py-4 px-8 flex-shrink-0"
        style={{ background: BROWN }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p
              className="font-bold text-base tracking-widest uppercase"
              style={{ color: BEIGE, fontFamily: "Inter, sans-serif" }}
            >
              Aryhills Hotel
            </p>
            <p className="text-xs" style={{ color: `${BEIGE}80`, fontFamily: "Inter, sans-serif" }}>
              Guest Mobile Self-Service Portal
            </p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {[
              { key: "home", label: "B5-01 Home" },
              { key: "roomservice", label: "B5-02 Room Service" },
              { key: "complaint", label: "B5-03 Complaint" },
              { key: "chat", label: "B5-04 Live Chat" },
              { key: "tracker", label: "B5-05 Requests" },
              { key: "bill", label: "B5-06 Bill" },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => setScreen(s.key)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                style={{
                  background: screen === s.key ? GOLD : "rgba(255,255,255,0.12)",
                  color: screen === s.key ? WHITE : BEIGE,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content — single active screen */}
      <div className="flex-1 flex items-start justify-center py-10 px-4">
        {screen === "home" && <GuestPortalHome navigate={setScreen} />}
        {screen === "roomservice" && <RoomServiceFlow onBack={goHome} />}
        {screen === "complaint" && <ComplaintFlow onBack={goHome} />}
        {screen === "chat" && <LiveChat onBack={goHome} />}
        {screen === "tracker" && <RequestTracker onBack={goHome} />}
        {screen === "bill" && <ViewMyBill onBack={goHome} />}
      </div>
    </div>
  );
}



