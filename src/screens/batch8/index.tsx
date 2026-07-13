import React, { useState } from "react";
import {
  ShoppingCart, X, Clock, MapPin, Users, Calendar,
  CheckCircle, ArrowLeft, Plus, Minus, Dumbbell, Waves, Heart,
  Gift, Utensils, Wine, Building, Briefcase, Menu as MenuIcon,
  ChevronRight, Truck, Package, Star,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen = "home" | "food" | "checkout" | "tracking" | "gym" | "pool" | "spa" | "confirmation";
type BookingType = "gym" | "pool" | "spa";

interface FoodItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  photo: string;
  popular?: boolean;
  spicy?: boolean;
}

interface CartEntry {
  item: FoodItem;
  qty: number;
}

interface GymSlot {
  label: string;
  time: string;
  available: boolean;
  capacity: number;
  booked: number;
}

interface PoolSlot {
  id: string;
  label: string;
  time: string;
  capacity: number;
  booked: number;
  price: number;
}

interface SpaTreatment {
  id: number;
  name: string;
  duration: string;
  price: number;
  category: string;
  description: string;
}

interface SpaTherapist {
  id: number;
  name: string;
  speciality: string;
  rating: number | null;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const FOOD_CATS = ["All", "Breakfast", "Local Dishes", "Continental", "Grills", "Snacks", "Cocktails", "Non-Alcoholic"];

const MENU: FoodItem[] = [
  { id: 1, name: "Jollof Rice & Grilled Chicken", category: "Local Dishes", price: 4500, description: "Aromatic party jollof rice with grilled chicken thighs, fried plantain and coleslaw", photo: "photo-1567620905732-2d1ec7ab7445", popular: true, spicy: true },
  { id: 2, name: "Egusi Soup & Pounded Yam", category: "Local Dishes", price: 5500, description: "Rich melon seed soup with assorted meat, stockfish and freshly pounded yam", photo: "photo-1604329760661-e71dc83f8f26" },
  { id: 3, name: "Catfish Pepper Soup", category: "Local Dishes", price: 6200, description: "Spiced catfish broth with uziza leaves, utazi and aromatic warm spices", photo: "photo-1547592166-23ac45744acd", spicy: true },
  { id: 4, name: "Continental Breakfast", category: "Breakfast", price: 3800, description: "Eggs Benedict, crispy bacon, grilled tomatoes, mushrooms and sourdough toast", photo: "photo-1533089860892-a7c6f0a88666" },
  { id: 5, name: "Akara & Ogi", category: "Breakfast", price: 2200, description: "Crispy bean cakes with smooth millet porridge and a drizzle of honey", photo: "photo-1528735602780-2552fd46c7af" },
  { id: 6, name: "French Toast Stack", category: "Breakfast", price: 2800, description: "Thick brioche French toast with fresh berries, maple syrup and whipped cream", photo: "photo-1484723091739-30a097e8f929" },
  { id: 7, name: "T-Bone Steak", category: "Continental", price: 18500, description: "300g prime T-bone with garlic butter, rosemary jus and hand-cut fries", photo: "photo-1529692236671-f1f6cf9683ba", popular: true },
  { id: 8, name: "Club Sandwich", category: "Continental", price: 3200, description: "Triple-decker grilled chicken, bacon, lettuce, tomato and garlic aioli", photo: "photo-1528735602780-2552fd46c7af" },
  { id: 9, name: "Grilled Whole Tilapia", category: "Grills", price: 7500, description: "Lemon-herb marinated tilapia charcoal grilled and served with garden salad", photo: "photo-1580476262798-bddd9f4b7369" },
  { id: 10, name: "Beef Suya Platter", category: "Grills", price: 4800, description: "Tender beef suya skewers with fresh onion rings and groundnut spice blend", photo: "photo-1544025162-d76694265947", popular: true, spicy: true },
  { id: 11, name: "Chicken Wings (12 pcs)", category: "Snacks", price: 3500, description: "Crispy wings in your choice of buffalo, honey-garlic or suya spice sauce", photo: "photo-1567620832903-9fc6debc209f" },
  { id: 12, name: "Chapman Classic", category: "Non-Alcoholic", price: 1500, description: "Aryhills signature Chapman with Ribena, Fanta, bitters and fresh citrus", photo: "photo-1512621776951-a57141f2eefd" },
  { id: 13, name: "Classic Mojito", category: "Cocktails", price: 3200, description: "Fresh mint, lime, white rum and sparkling soda poured over crushed ice", photo: "photo-1551538827-9c037cb4f32a" },
  { id: 14, name: "Palm Wine Sunrise", category: "Cocktails", price: 2800, description: "Fresh palm wine blended with pineapple juice and a float of grenadine", photo: "photo-1470338745628-171cf53de3a8" },
];

const SERVICES = [
  { id: "food",     label: "Food & Drinks",    sub: "Full restaurant menu — delivery or pickup",   Icon: Utensils, screen: "food"  as Screen, photo: "photo-1567620905732-2d1ec7ab7445" },
  { id: "bar",      label: "Bar & Cocktails",   sub: "Cocktails, wines, spirits, bottle service",   Icon: Wine,     screen: "food"  as Screen, photo: "photo-1551538827-9c037cb4f32a" },
  { id: "gym",      label: "Gym & Fitness",     sub: "Day passes, memberships, personal training",  Icon: Dumbbell, screen: "gym"   as Screen, photo: "photo-1534438327276-14e5300c3a48" },
  { id: "pool",     label: "Swimming Pool",     sub: "Sessions, group & private pool hire",          Icon: Waves,    screen: "pool"  as Screen, photo: "photo-1571003123894-1f0594d2b5d9" },
  { id: "spa",      label: "Spa & Wellness",    sub: "Massages, facials, couples retreats",          Icon: Heart,    screen: "spa"   as Screen, photo: "photo-1540555700478-4be289fbecef" },
  { id: "events",   label: "Event Spaces",      sub: "Halls, boardrooms, garden venues",             Icon: Building, screen: "home"  as Screen, photo: "photo-1519167758481-83f550bb49b3" },
  { id: "catering", label: "Catering Orders",   sub: "Off-site catering for any occasion",           Icon: Briefcase,screen: "home"  as Screen, photo: "photo-1414235077428-338989a2e8c0" },
  { id: "gifts",    label: "Gift Vouchers",     sub: "Experiences and monetary vouchers",             Icon: Gift,     screen: "home"  as Screen, photo: "photo-1513885535751-8b9238bd345a" },
];

const GYM_SLOTS: GymSlot[] = [
  { label: "Early Morning", time: "6:00 AM – 8:00 AM",   available: true,  capacity: 20, booked: 12 },
  { label: "Morning",       time: "8:00 AM – 10:00 AM",  available: true,  capacity: 20, booked: 8  },
  { label: "Mid-Morning",   time: "10:00 AM – 12:00 PM", available: true,  capacity: 20, booked: 5  },
  { label: "Midday",        time: "12:00 PM – 2:00 PM",  available: false, capacity: 20, booked: 20 },
  { label: "Afternoon",     time: "2:00 PM – 4:00 PM",   available: true,  capacity: 20, booked: 3  },
  { label: "Late Afternoon",time: "4:00 PM – 6:00 PM",   available: true,  capacity: 20, booked: 15 },
  { label: "Evening",       time: "6:00 PM – 8:00 PM",   available: false, capacity: 20, booked: 20 },
];

const POOL_SLOTS: PoolSlot[] = [
  { id: "morning",   label: "Morning Session",   time: "8:00 AM – 12:00 PM", capacity: 30, booked: 12, price: 5000 },
  { id: "afternoon", label: "Afternoon Session", time: "1:00 PM – 5:00 PM",  capacity: 30, booked: 24, price: 5000 },
  { id: "evening",   label: "Evening Session",   time: "5:00 PM – 8:00 PM",  capacity: 30, booked: 8,  price: 4000 },
];

const SPA_TREATMENTS: SpaTreatment[] = [
  { id: 1, name: "Swedish Massage",       duration: "60 min",  price: 15000, category: "Massage",  description: "Gentle full-body massage using long strokes and kneading for deep relaxation" },
  { id: 2, name: "Deep Tissue Massage",   duration: "75 min",  price: 18000, category: "Massage",  description: "Targets deep muscle layers to relieve chronic tension and stubborn knots" },
  { id: 3, name: "Hot Stone Therapy",     duration: "90 min",  price: 22000, category: "Massage",  description: "Warm volcanic stones placed on pressure points for profound muscular relief" },
  { id: 4, name: "Revitalizing Facial",   duration: "60 min",  price: 12000, category: "Facial",   description: "Deep cleanse, exfoliation and hydration treatment for luminous, healthy skin" },
  { id: 5, name: "Manicure & Pedicure",   duration: "90 min",  price: 8500,  category: "Nails",    description: "Complete nail care with cuticle treatment, polish and moisturizing wrap" },
  { id: 6, name: "Couples Retreat",       duration: "120 min", price: 45000, category: "Packages", description: "Side-by-side massages and facials in our private couples suite — the ultimate indulgence" },
];

const SPA_THERAPISTS: SpaTherapist[] = [
  { id: 1, name: "Amaka Okafor",     speciality: "Deep Tissue & Hot Stone", rating: 4.9 },
  { id: 2, name: "Chidi Nwosu",      speciality: "Swedish & Sports Massage", rating: 4.8 },
  { id: 3, name: "Fatima Al-Hassan", speciality: "Facials & Skin Care",      rating: 4.9 },
  { id: 4, name: "Any Available",    speciality: "Matched by availability",  rating: null },
];

const SPA_TIMES = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"];

const GYM_ADDONS = [
  { label: "Personal Training Session", price: 8000 },
  { label: "Locker + Padlock",          price: 500  },
  { label: "Towel Set",                 price: 300  },
  { label: "Protein Shake",             price: 1500 },
];

const POOL_ADDONS = [
  { label: "Towel Set",              price: 500  },
  { label: "Sun Lounger",            price: 1000 },
  { label: "Poolside Food Package",  price: 5000 },
  { label: "Drinks Package",         price: 3000 },
];

// Static QR pattern for confirmation (8×8)
const QR_CELLS = [1,1,1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,0,0,1,0,0,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,1,0,0,1,1,1,0,0,0,1,0];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const fmt = (n: number) => `₦${n.toLocaleString()}`;

const nextDates = () => {
  const out: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    out.push(d);
  }
  return out;
};

const dateLabel = (d: Date, i: number) =>
  i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-NG", { weekday: "short" });

const dateVal = (d: Date) =>
  d.toLocaleDateString("en-NG", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

// ─── App ─────────────────────────────────────────────────────────────────────

export default function OrderingPlatformApp() {
  const [screen, setScreen]               = useState<Screen>("home");
  const [cart, setCart]                   = useState<CartEntry[]>([]);
  const [modalItem, setModalItem]         = useState<FoodItem | null>(null);
  const [itemQty, setItemQty]             = useState(1);
  const [foodCat, setFoodCat]             = useState("All");
  const [deliveryMode, setDeliveryMode]   = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress]             = useState("");
  const [gymSlot, setGymSlot]             = useState<number | null>(null);
  const [gymDate, setGymDate]             = useState("");
  const [gymAddons, setGymAddons]         = useState<string[]>([]);
  const [poolSlot, setPoolSlot]           = useState<string | null>(null);
  const [poolDate, setPoolDate]           = useState("");
  const [poolGuests, setPoolGuests]       = useState(1);
  const [poolAddons, setPoolAddons]       = useState<string[]>([]);
  const [spaTreatment, setSpaTreatment]   = useState<SpaTreatment | null>(null);
  const [spaTherapist, setSpaTherapist]   = useState<SpaTherapist | null>(null);
  const [spaDate, setSpaDate]             = useState("");
  const [spaTime, setSpaTime]             = useState("");
  const [bookingType, setBookingType]     = useState<BookingType>("gym");
  const [cartOpen, setCartOpen]           = useState(false);
  const [mobileMenu, setMobileMenu]       = useState(false);

  const cartCount   = cart.reduce((s, e) => s + e.qty, 0);
  const cartTotal   = cart.reduce((s, e) => s + e.item.price * e.qty, 0);
  const deliveryFee = deliveryMode === "delivery" ? 1500 : 0;
  const dates       = nextDates();
  const filtered    = foodCat === "All" ? MENU : MENU.filter(i => i.category === foodCat);

  const goTo = (s: Screen, bt?: BookingType) => {
    if (bt) setBookingType(bt);
    setScreen(s);
    window.scrollTo(0, 0);
  };

  const addToCart = (item: FoodItem, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(e => e.item.id === item.id);
      return ex
        ? prev.map(e => e.item.id === item.id ? { ...e, qty: e.qty + qty } : e)
        : [...prev, { item, qty }];
    });
    setModalItem(null);
    setItemQty(1);
  };

  const updateQty = (id: number, delta: number) =>
    setCart(prev =>
      prev.map(e => e.item.id === id ? { ...e, qty: Math.max(0, e.qty + delta) } : e)
          .filter(e => e.qty > 0)
    );

  const toggleAddon = (list: string[], setList: (v: string[]) => void, addon: string) =>
    setList(list.includes(addon) ? list.filter(a => a !== addon) : [...list, addon]);

  const gymTotal = 4000 + GYM_ADDONS.filter(a => gymAddons.includes(a.label)).reduce((s, a) => s + a.price, 0);
  const poolSession = POOL_SLOTS.find(s => s.id === poolSlot);
  const poolTotal = poolSession ? poolSession.price * poolGuests + POOL_ADDONS.filter(a => poolAddons.includes(a.label)).reduce((s, a) => s + a.price, 0) : 0;

  // ── Shared Pill Button ──────────────────────────────────────────────────────

  const GoldBtn = ({ label, onClick, disabled = false, full = true, size = "md" }: { label: string; onClick: () => void; disabled?: boolean; full?: boolean; size?: "sm" | "md" | "lg" }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${full ? "w-full" : ""} ${size === "lg" ? "py-4 px-8 text-base" : size === "sm" ? "py-2 px-5 text-sm" : "py-3.5 px-6 text-sm"} rounded-full font-semibold text-white transition-opacity`}
      style={{ backgroundColor: disabled ? "#D6C5A4" : "#B8860B", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.7 : 1 }}
    >
      {label}
    </button>
  );

  // ── Date Strip ─────────────────────────────────────────────────────────────

  const DateStrip = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {dates.map((d, i) => {
        const val = dateVal(d);
        const active = value === val;
        return (
          <button key={i} onClick={() => onChange(val)}
            className="flex-shrink-0 px-4 py-3 rounded-xl border text-center min-w-[76px] transition-all"
            style={{ borderColor: active ? "#B8860B" : "#D6C5A4", backgroundColor: active ? "rgba(184,134,11,0.08)" : "white" }}>
            <div className="text-xs font-semibold" style={{ color: active ? "#B8860B" : "#6C757D" }}>{dateLabel(d, i)}</div>
            <div className="text-base font-bold" style={{ color: "#2D2D2D" }}>{d.getDate()}</div>
            <div className="text-xs" style={{ color: "#6C757D" }}>{d.toLocaleDateString("en-NG", { month: "short" })}</div>
          </button>
        );
      })}
    </div>
  );

  // ── Section Card ───────────────────────────────────────────────────────────

  const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>{children}</div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-semibold text-base mb-4" style={{ color: "#2D2D2D" }}>{children}</h2>
  );

  // ── Capacity Bar ───────────────────────────────────────────────────────────

  const CapBar = ({ booked, capacity, urgent = false }: { booked: number; capacity: number; urgent?: boolean }) => (
    <div className="h-1.5 rounded-full overflow-hidden mt-2" style={{ backgroundColor: "#F0E8D9" }}>
      <div className="h-full rounded-full transition-all"
        style={{ width: `${(booked / capacity) * 100}%`, backgroundColor: urgent ? "#F4A300" : "#2E7D32" }} />
    </div>
  );

  // ── Navbar ─────────────────────────────────────────────────────────────────

  const navLinks: { label: string; s: Screen }[] = [
    { label: "Food & Drinks", s: "food" },
    { label: "Gym",           s: "gym"  },
    { label: "Pool",          s: "pool" },
    { label: "Spa",           s: "spa"  },
  ];

  const navbar = (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ backgroundColor: "#4E342E" }}>
      <button onClick={() => goTo("home")} className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#B8860B" }}>
          <span className="text-white font-serif font-bold text-sm">A</span>
        </div>
        <div className="text-left">
          <div className="font-serif font-bold text-white tracking-wider text-base leading-none">ARYHILLS</div>
          <div className="text-[10px] tracking-widest uppercase leading-none mt-0.5" style={{ color: "#D6C5A4" }}>Hotel & Tower</div>
        </div>
      </button>

      <div className="hidden md:flex items-center gap-7">
        {navLinks.map(({ label, s }) => (
          <button key={s} onClick={() => goTo(s)}
            className="text-sm font-medium transition-colors hover:text-white"
            style={{ color: screen === s ? "white" : "#D6C5A4" }}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setCartOpen(!cartOpen)}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#B8860B" }}>
          <ShoppingCart size={15} />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
              style={{ backgroundColor: "#D32F2F", color: "white" }}>
              {cartCount}
            </span>
          )}
        </button>
        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden" style={{ color: "#D6C5A4" }}>
          {mobileMenu ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {mobileMenu && (
        <div className="absolute top-full left-0 right-0 py-3 px-6 flex flex-col gap-1" style={{ backgroundColor: "#4E342E", borderTop: "1px solid rgba(214,197,164,0.2)" }}>
          {navLinks.map(({ label, s }) => (
            <button key={s} onClick={() => { goTo(s); setMobileMenu(false); }}
              className="text-left text-sm font-medium py-3 border-b transition-colors hover:text-white"
              style={{ color: "#D6C5A4", borderColor: "rgba(214,197,164,0.12)" }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  // ── Cart Drawer ─────────────────────────────────────────────────────────────

  const cartDrawer = cartOpen && (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <div className="w-full max-w-sm bg-white flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6" style={{ backgroundColor: "#4E342E" }}>
          <h2 className="font-serif text-xl text-white">Your Order</h2>
          <button onClick={() => setCartOpen(false)} className="text-white/70 hover:text-white transition-colors"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart size={40} className="mx-auto mb-3" style={{ color: "#D6C5A4" }} />
              <p className="font-medium" style={{ color: "#6C757D" }}>Your cart is empty</p>
              <p className="text-sm mt-1" style={{ color: "#6C757D" }}>Browse our menu to add items</p>
            </div>
          ) : cart.map(e => (
            <div key={e.item.id} className="flex items-center gap-3 py-3 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <img src={img(e.item.photo, 80, 80)} alt={e.item.name}
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0" style={{ backgroundColor: "#EDE9E1" }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight truncate" style={{ color: "#2D2D2D" }}>{e.item.name}</p>
                <p className="text-sm font-bold mt-0.5" style={{ color: "#B8860B" }}>{fmt(e.item.price)}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => updateQty(e.item.id, -1)}
                  className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "#D6C5A4" }}>
                  <Minus size={12} />
                </button>
                <span className="w-4 text-center text-sm font-bold" style={{ color: "#2D2D2D" }}>{e.qty}</span>
                <button onClick={() => updateQty(e.item.id, 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: "#B8860B" }}>
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <div className="flex justify-between mb-2 text-sm" style={{ color: "#6C757D" }}>
              <span>Subtotal</span><span>{fmt(cartTotal)}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm" style={{ color: "#6C757D" }}>
              <span>Delivery</span><span>{deliveryMode === "delivery" ? fmt(1500) : "Free (pickup)"}</span>
            </div>
            <div className="flex justify-between mb-5 font-bold" style={{ color: "#2D2D2D" }}>
              <span>Total</span><span style={{ color: "#B8860B" }}>{fmt(cartTotal + deliveryFee)}</span>
            </div>
            <GoldBtn label={`Checkout — ${fmt(cartTotal + deliveryFee)}`} onClick={() => { setCartOpen(false); goTo("checkout"); }} />
          </div>
        )}
      </div>
    </div>
  );

  // ── Item Modal ──────────────────────────────────────────────────────────────

  const itemModal = modalItem && (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setModalItem(null); setItemQty(1); }} />
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative h-60">
          <img src={img(modalItem.photo, 640, 320)} alt={modalItem.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent 50%)" }} />
          <button onClick={() => { setModalItem(null); setItemQty(1); }}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
            <X size={16} style={{ color: "#2D2D2D" }} />
          </button>
          {modalItem.popular && (
            <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: "#B8860B" }}>Popular</span>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-serif text-xl mb-1" style={{ color: "#2D2D2D" }}>{modalItem.name}</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#6C757D" }}>{modalItem.description}</p>
          <div className="flex items-center justify-between mb-6">
            <span className="font-serif text-2xl font-bold" style={{ color: "#B8860B" }}>{fmt(modalItem.price)}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setItemQty(Math.max(1, itemQty - 1))}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors hover:bg-gray-50"
                style={{ borderColor: "#D6C5A4" }}>
                <Minus size={16} />
              </button>
              <span className="w-6 text-center font-bold text-lg" style={{ color: "#2D2D2D" }}>{itemQty}</span>
              <button onClick={() => setItemQty(itemQty + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: "#4E342E" }}>
                <Plus size={16} />
              </button>
            </div>
          </div>
          <button onClick={() => addToCart(modalItem, itemQty)}
            className="w-full py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#B8860B" }}>
            <ShoppingCart size={18} />
            Add to Cart — {fmt(modalItem.price * itemQty)}
          </button>
        </div>
      </div>
    </div>
  );

  // ── Home Screen ─────────────────────────────────────────────────────────────

  const homeScreen = (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[600px] flex items-center">
        <img src={img("photo-1566073771259-6a8506099945", 1600, 800)} alt="Aryhills Hotel lobby"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(78,52,46,0.92) 38%, rgba(78,52,46,0.35) 100%)" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-lg">
            <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-5" style={{ color: "#D6C5A4" }}>
              Order & Book Services Online
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Hotel Luxury,<br />
              At Your<br />
              Doorstep.
            </h1>
            <p className="text-base mb-8 leading-relaxed" style={{ color: "#D6C5A4" }}>
              Order from our kitchen, book the spa, reserve pool access, hire event spaces — from anywhere, at any time.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => goTo("food")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: "#B8860B" }}>
                Order Food <ChevronRight size={18} />
              </button>
              <button onClick={() => goTo("spa")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all hover:bg-white/10"
                style={{ border: "1.5px solid #D6C5A4", color: "#D6C5A4" }}>
                Book Spa
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: "#B8860B" }}>Everything in one place</p>
          <h2 className="font-serif text-4xl" style={{ color: "#2D2D2D" }}>Our Services</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SERVICES.map(svc => (
            <button key={svc.id} onClick={() => goTo(svc.screen)}
              className="group relative overflow-hidden rounded-2xl text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ aspectRatio: "4/3" }}>
              <img src={img(svc.photo, 400, 300)} alt={svc.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: "#EDE9E1" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(78,52,46,0.95) 40%, rgba(78,52,46,0.1) 100%)" }} />
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="w-8 h-8 rounded-full mb-2 flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(184,134,11,0.9)" }}>
                  <svc.Icon size={16} className="text-white" />
                </div>
                <h3 className="font-serif font-semibold text-white text-sm leading-tight">{svc.label}</h3>
                <p className="text-xs mt-0.5 leading-tight" style={{ color: "#D6C5A4" }}>{svc.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-t border-b py-10" style={{ borderColor: "rgba(78,52,46,0.12)" }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { Icon: Clock,   label: "30–45 min delivery",  sub: "To addresses within 5 km of the hotel" },
            { Icon: Truck,   label: "Free pickup",          sub: "Collect at the hotel lobby, Kajola St" },
            { Icon: MapPin,  label: "Imo, Ilesa",           sub: "Osun State — serving Ilesa & environs" },
            { Icon: Users,   label: "Corporate accounts",   sub: "Invoice billing for businesses" },
          ].map(({ Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(184,134,11,0.12)" }}>
                <Icon size={18} style={{ color: "#B8860B" }} />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>{label}</p>
                <p className="text-xs leading-snug" style={{ color: "#6C757D" }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center" style={{ backgroundColor: "#4E342E" }}>
        <p className="font-serif text-white text-base mb-1">Aryhills Hotel & Tower</p>
        <p className="text-sm" style={{ color: "#D6C5A4" }}>Old St. John School, Kajola Street, Imo, Ilesa, Osun State · +234 805 030 3270</p>
        <p className="text-xs mt-3" style={{ color: "rgba(214,197,164,0.5)" }}>© 2026 Aryhills Hotel. All rights reserved.</p>
      </footer>
    </div>
  );

  // ── Food Screen ─────────────────────────────────────────────────────────────

  const foodScreen = (
    <div className="pt-[72px] min-h-screen" style={{ backgroundColor: "#F8F6F2" }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl mb-1" style={{ color: "#2D2D2D" }}>Food & Drinks</h1>
            <p className="text-sm" style={{ color: "#6C757D" }}>Order from our kitchen · Delivery or Pickup · 30–45 min</p>
          </div>
          <button onClick={() => goTo("home")} className="flex items-center gap-1 text-sm mt-1 transition-colors hover:opacity-70" style={{ color: "#6C757D" }}>
            <ArrowLeft size={15} /> Home
          </button>
        </div>

        {/* Mobile category scroll */}
        <div className="md:hidden mb-5">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {FOOD_CATS.map(cat => (
              <button key={cat} onClick={() => setFoodCat(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border"
                style={{ backgroundColor: foodCat === cat ? "#4E342E" : "white", color: foodCat === cat ? "white" : "#2D2D2D", borderColor: foodCat === cat ? "#4E342E" : "#D6C5A4" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Category sidebar */}
          <aside className="hidden md:block w-44 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6C757D" }}>Categories</p>
              <div className="flex flex-col gap-0.5">
                {FOOD_CATS.map(cat => (
                  <button key={cat} onClick={() => setFoodCat(cat)}
                    className="text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{ backgroundColor: foodCat === cat ? "#4E342E" : "transparent", color: foodCat === cat ? "white" : "#2D2D2D" }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Items grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(item => (
                <div key={item.id} onClick={() => setModalItem(item)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <div className="relative h-44 overflow-hidden" style={{ backgroundColor: "#EDE9E1" }}>
                    <img src={img(item.photo, 400, 220)} alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    {item.popular && (
                      <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: "#B8860B" }}>Popular</span>
                    )}
                    {item.spicy && (
                      <span className="absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full bg-white/90" style={{ color: "#D32F2F" }}>🌶 Spicy</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1 leading-tight" style={{ color: "#2D2D2D" }}>{item.name}</h3>
                    <p className="text-xs mb-3 leading-relaxed" style={{ color: "#6C757D", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold" style={{ color: "#B8860B" }}>{fmt(item.price)}</span>
                      <button
                        onClick={e => { e.stopPropagation(); addToCart(item); }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "#4E342E" }}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 px-4 pointer-events-none">
          <button onClick={() => goTo("checkout")}
            className="pointer-events-auto flex items-center gap-4 px-8 py-4 rounded-full shadow-2xl text-white font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: "#4E342E" }}>
            <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0" style={{ backgroundColor: "#B8860B" }}>{cartCount}</span>
            <span>View Order</span>
            <span className="font-serif" style={{ color: "#D6C5A4" }}>{fmt(cartTotal)}</span>
          </button>
        </div>
      )}
    </div>
  );

  // ── Checkout Screen ─────────────────────────────────────────────────────────

  const checkoutScreen = (
    <div className="pt-[72px] min-h-screen" style={{ backgroundColor: "#F8F6F2" }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => goTo("food")} className="flex items-center gap-1 text-sm mb-6 hover:opacity-70 transition-opacity" style={{ color: "#6C757D" }}>
          <ArrowLeft size={15} /> Back to Menu
        </button>
        <h1 className="font-serif text-3xl mb-8" style={{ color: "#2D2D2D" }}>Checkout</h1>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3 space-y-5">
            {/* Delivery Toggle */}
            <Card>
              <SectionTitle>How would you like to receive your order?</SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                {(["delivery", "pickup"] as const).map(mode => (
                  <button key={mode} onClick={() => setDeliveryMode(mode)}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all"
                    style={{ borderColor: deliveryMode === mode ? "#B8860B" : "#D6C5A4", backgroundColor: deliveryMode === mode ? "rgba(184,134,11,0.06)" : "white" }}>
                    {mode === "delivery"
                      ? <Truck size={20} style={{ color: deliveryMode === mode ? "#B8860B" : "#6C757D" }} />
                      : <Package size={20} style={{ color: deliveryMode === mode ? "#B8860B" : "#6C757D" }} />}
                    <div>
                      <p className="font-semibold text-sm capitalize" style={{ color: "#2D2D2D" }}>{mode}</p>
                      <p className="text-xs" style={{ color: "#6C757D" }}>
                        {mode === "delivery" ? "30–45 min · ₦1,500" : "Ready in 20 min · Free"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {deliveryMode === "delivery" && (
              <Card>
                <SectionTitle>Delivery Address</SectionTitle>
                <div className="space-y-3">
                  <input value={address} onChange={e => setAddress(e.target.value)}
                    placeholder="House / flat number, street name"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#B8860B]/30"
                    style={{ borderColor: "#D6C5A4", color: "#2D2D2D", backgroundColor: "white" }} />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Area / Estate" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: "#D6C5A4" }} />
                    <input placeholder="Nearest landmark" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: "#D6C5A4" }} />
                  </div>
                  <input placeholder="Phone number for delivery" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: "#D6C5A4" }} />
                  <textarea placeholder="Special instructions (e.g. gate code, extra sauce)" rows={2}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: "#D6C5A4" }} />
                </div>
              </Card>
            )}

            <Card>
              <SectionTitle>Payment Method</SectionTitle>
              <div className="space-y-2">
                {["Card via Paystack", "Bank Transfer (USSD)", "Pay on Pickup / Delivery"].map((method, i) => (
                  <label key={method} className="flex items-center gap-3 p-3.5 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors border"
                    style={{ borderColor: "transparent" }}>
                    <input type="radio" name="payment" defaultChecked={i === 0} className="w-4 h-4" style={{ accentColor: "#B8860B" }} />
                    <span className="text-sm font-medium" style={{ color: "#2D2D2D" }}>{method}</span>
                  </label>
                ))}
              </div>
            </Card>
          </div>

          {/* Order summary */}
          <div className="md:col-span-2">
            <Card className="sticky top-24">
              <SectionTitle>Order Summary</SectionTitle>
              <div className="space-y-3 mb-4">
                {cart.map(e => (
                  <div key={e.item.id} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full text-xs flex items-center justify-center text-white font-bold flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#4E342E" }}>{e.qty}</div>
                    <p className="flex-1 text-sm font-medium leading-tight" style={{ color: "#2D2D2D" }}>{e.item.name}</p>
                    <p className="text-sm font-semibold flex-shrink-0" style={{ color: "#B8860B" }}>{fmt(e.item.price * e.qty)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <div className="flex justify-between text-sm" style={{ color: "#6C757D" }}>
                  <span>Subtotal</span><span>{fmt(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ color: "#6C757D" }}>
                  <span>Delivery</span><span>{deliveryMode === "delivery" ? "₦1,500" : "Free"}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t text-base" style={{ borderColor: "rgba(0,0,0,0.08)", color: "#2D2D2D" }}>
                  <span>Total</span>
                  <span style={{ color: "#B8860B" }}>{fmt(cartTotal + deliveryFee)}</span>
                </div>
              </div>
              <div className="mt-5">
                <GoldBtn label={`Place Order — ${fmt(cartTotal + deliveryFee)}`} onClick={() => goTo("tracking")} />
              </div>
              <p className="text-xs text-center mt-3 flex items-center justify-center gap-1" style={{ color: "#6C757D" }}>
                <Clock size={12} />
                Est. {deliveryMode === "delivery" ? "30–45 min delivery" : "20 min for pickup"}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Tracking Screen ─────────────────────────────────────────────────────────

  const trackingSteps = [
    { label: "Order Received",     sub: "Aryhills confirmed your order",       done: true,  active: false },
    { label: "Being Prepared",     sub: "Your meal is in the kitchen",          done: false, active: true  },
    { label: "Out for Delivery",   sub: "Rider has picked up your order",       done: false, active: false },
    { label: "Delivered",          sub: "Enjoy your meal!",                     done: false, active: false },
  ];

  const trackingScreen = (
    <div className="pt-[72px] min-h-screen" style={{ backgroundColor: "#F8F6F2" }}>
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: "rgba(46,125,50,0.12)" }}>
            <CheckCircle size={32} style={{ color: "#2E7D32" }} />
          </div>
          <h1 className="font-serif text-3xl mb-2" style={{ color: "#2D2D2D" }}>Order Confirmed!</h1>
          <p style={{ color: "#6C757D" }}>Order #ARY-28471 · Placed just now</p>
        </div>

        <Card className="mb-5">
          <div className="relative pl-1">
            <div className="absolute left-[18px] top-6 bottom-6 w-0.5" style={{ backgroundColor: "#D6C5A4" }} />
            <div className="space-y-7">
              {trackingSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 relative z-10">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all"
                    style={{
                      backgroundColor: step.done ? "#2E7D32" : step.active ? "#B8860B" : "white",
                      borderColor: step.done ? "#2E7D32" : step.active ? "#B8860B" : "#D6C5A4",
                    }}>
                    {step.done
                      ? <CheckCircle size={16} className="text-white" />
                      : step.active
                        ? <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                        : <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#D6C5A4" }} />}
                  </div>
                  <div className="pt-1.5">
                    <p className="font-semibold text-sm" style={{ color: step.done || step.active ? "#2D2D2D" : "#9a9a9a" }}>{step.label}</p>
                    <p className="text-xs" style={{ color: "#6C757D" }}>{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t flex items-center gap-3" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(184,134,11,0.12)" }}>
              <Clock size={18} style={{ color: "#B8860B" }} />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>Estimated delivery: 30–40 minutes</p>
              <p className="text-xs" style={{ color: "#6C757D" }}>Arriving by 7:45 PM</p>
            </div>
          </div>
        </Card>

        <Card className="mb-5">
          <h3 className="font-semibold text-sm mb-2" style={{ color: "#2D2D2D" }}>Delivering to</h3>
          <p className="text-sm" style={{ color: "#6C757D" }}>
            {address || "Kajola Street, Imo, Ilesa, Osun State"}
          </p>
        </Card>

        <div className="flex gap-3">
          <button onClick={() => goTo("home")} className="flex-1 py-3 rounded-full font-semibold border transition-all hover:bg-white"
            style={{ borderColor: "#D6C5A4", color: "#2D2D2D" }}>
            Back to Home
          </button>
          <button onClick={() => goTo("food")} className="flex-1 py-3 rounded-full font-semibold text-white"
            style={{ backgroundColor: "#B8860B" }}>
            Order Again
          </button>
        </div>
      </div>
    </div>
  );

  // ── Gym Screen ──────────────────────────────────────────────────────────────

  const gymScreen = (
    <div className="pt-[72px] min-h-screen" style={{ backgroundColor: "#F8F6F2" }}>
      <div className="relative h-52 overflow-hidden" style={{ backgroundColor: "#4E342E" }}>
        <img src={img("photo-1534438327276-14e5300c3a48", 1400, 400)} alt="Gym"
          className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-end p-6" style={{ background: "linear-gradient(to top, rgba(78,52,46,0.95), rgba(78,52,46,0.2))" }}>
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: "#D6C5A4" }}>Aryhills Fitness</p>
            <h1 className="font-serif text-4xl text-white">Gym & Fitness Centre</h1>
            <p className="text-sm mt-1" style={{ color: "#D6C5A4" }}>Day pass · ₦4,000 · Full equipment access · Lockers included</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <Card>
              <SectionTitle>Select Date</SectionTitle>
              <DateStrip value={gymDate} onChange={setGymDate} />
            </Card>

            <Card>
              <SectionTitle>Available Sessions</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-3">
                {GYM_SLOTS.map((slot, i) => {
                  const remaining = slot.capacity - slot.booked;
                  const selected = gymSlot === i;
                  return (
                    <button key={i} onClick={() => slot.available && setGymSlot(i)} disabled={!slot.available}
                      className="p-4 rounded-xl border-2 text-left transition-all"
                      style={{
                        borderColor: selected ? "#B8860B" : slot.available ? "#D6C5A4" : "rgba(214,197,164,0.3)",
                        backgroundColor: selected ? "rgba(184,134,11,0.07)" : "white",
                        opacity: slot.available ? 1 : 0.5,
                        cursor: slot.available ? "pointer" : "not-allowed",
                      }}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>{slot.label}</p>
                          <p className="text-xs" style={{ color: "#6C757D" }}>{slot.time}</p>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{
                            backgroundColor: slot.available ? "rgba(46,125,50,0.1)" : "rgba(211,47,47,0.1)",
                            color: slot.available ? "#2E7D32" : "#D32F2F",
                          }}>
                          {slot.available ? `${remaining} left` : "Full"}
                        </span>
                      </div>
                      <CapBar booked={slot.booked} capacity={slot.capacity} urgent={remaining <= 5} />
                      <p className="text-xs mt-1.5" style={{ color: "#6C757D" }}>{slot.booked}/{slot.capacity} spots taken</p>
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card>
              <SectionTitle>Add-ons (Optional)</SectionTitle>
              <div className="space-y-2">
                {GYM_ADDONS.map(addon => (
                  <label key={addon.label} className="flex items-center justify-between p-3.5 rounded-xl border cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "#D6C5A4" }}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={gymAddons.includes(addon.label)}
                        onChange={() => toggleAddon(gymAddons, setGymAddons, addon.label)}
                        className="w-4 h-4" style={{ accentColor: "#B8860B" }} />
                      <span className="text-sm font-medium" style={{ color: "#2D2D2D" }}>{addon.label}</span>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "#B8860B" }}>+{fmt(addon.price)}</span>
                  </label>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <SectionTitle>Booking Summary</SectionTitle>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Day Pass</span><span style={{ color: "#2D2D2D" }}>₦4,000</span></div>
                <div className="flex justify-between">
                  <span style={{ color: "#6C757D" }}>Session</span>
                  <span style={{ color: "#2D2D2D" }}>{gymSlot !== null ? GYM_SLOTS[gymSlot].label : "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6C757D" }}>Date</span>
                  <span className="text-right text-xs" style={{ color: "#2D2D2D" }}>{gymDate || "Not selected"}</span>
                </div>
                {GYM_ADDONS.filter(a => gymAddons.includes(a.label)).map(a => (
                  <div key={a.label} className="flex justify-between">
                    <span className="text-xs" style={{ color: "#6C757D" }}>{a.label}</span>
                    <span style={{ color: "#2D2D2D" }}>+{fmt(a.price)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold" style={{ borderColor: "rgba(0,0,0,0.08)", color: "#2D2D2D" }}>
                <span>Total</span>
                <span style={{ color: "#B8860B" }}>{fmt(gymTotal)}</span>
              </div>
              <div className="mt-5">
                <GoldBtn label="Book Gym Session" onClick={() => goTo("confirmation", "gym")} disabled={!gymDate || gymSlot === null} />
              </div>
              {(!gymDate || gymSlot === null) && (
                <p className="text-xs text-center mt-2" style={{ color: "#6C757D" }}>Select a date and session to continue</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Pool Screen ─────────────────────────────────────────────────────────────

  const poolScreen = (
    <div className="pt-[72px] min-h-screen" style={{ backgroundColor: "#F8F6F2" }}>
      <div className="relative h-52 overflow-hidden" style={{ backgroundColor: "#4E342E" }}>
        <img src={img("photo-1571003123894-1f0594d2b5d9", 1400, 400)} alt="Pool"
          className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-end p-6" style={{ background: "linear-gradient(to top, rgba(78,52,46,0.95), rgba(78,52,46,0.2))" }}>
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: "#D6C5A4" }}>Aryhills Pool</p>
            <h1 className="font-serif text-4xl text-white">Swimming Pool</h1>
            <p className="text-sm mt-1" style={{ color: "#D6C5A4" }}>Day sessions · Group hire · Private pool events · Poolside service</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <Card>
              <SectionTitle>Select Date</SectionTitle>
              <DateStrip value={poolDate} onChange={setPoolDate} />
            </Card>

            <Card>
              <SectionTitle>Available Sessions</SectionTitle>
              <div className="space-y-3">
                {POOL_SLOTS.map(slot => {
                  const remaining = slot.capacity - slot.booked;
                  const full = remaining === 0;
                  const selected = poolSlot === slot.id;
                  return (
                    <button key={slot.id} onClick={() => !full && setPoolSlot(slot.id)} disabled={full}
                      className="w-full p-5 rounded-xl border-2 text-left transition-all"
                      style={{
                        borderColor: selected ? "#B8860B" : full ? "rgba(214,197,164,0.3)" : "#D6C5A4",
                        backgroundColor: selected ? "rgba(184,134,11,0.06)" : "white",
                        opacity: full ? 0.6 : 1,
                        cursor: full ? "not-allowed" : "pointer",
                      }}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold" style={{ color: "#2D2D2D" }}>{slot.label}</p>
                          <p className="text-sm" style={{ color: "#6C757D" }}>{slot.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold font-serif" style={{ color: "#B8860B" }}>{fmt(slot.price)}<span className="text-xs font-normal" style={{ color: "#6C757D" }}>/person</span></p>
                          <p className="text-xs font-semibold" style={{ color: full ? "#D32F2F" : remaining <= 8 ? "#F4A300" : "#2E7D32" }}>
                            {full ? "Fully Booked" : `${remaining} of ${slot.capacity} remaining`}
                          </p>
                        </div>
                      </div>
                      <CapBar booked={slot.booked} capacity={slot.capacity} urgent={remaining <= 8} />
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <SectionTitle>Number of Guests</SectionTitle>
                  <p className="text-sm -mt-2" style={{ color: "#6C757D" }}>Each guest requires one slot</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setPoolGuests(Math.max(1, poolGuests - 1))}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors hover:bg-gray-50"
                    style={{ borderColor: "#D6C5A4" }}>
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-bold w-6 text-center" style={{ color: "#2D2D2D" }}>{poolGuests}</span>
                  <button onClick={() => setPoolGuests(poolGuests + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: "#B8860B" }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle>Poolside Add-ons</SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                {POOL_ADDONS.map(addon => (
                  <label key={addon.label} className="flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "#D6C5A4" }}>
                    <input type="checkbox" checked={poolAddons.includes(addon.label)}
                      onChange={() => toggleAddon(poolAddons, setPoolAddons, addon.label)}
                      className="mt-0.5 w-4 h-4" style={{ accentColor: "#B8860B" }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#2D2D2D" }}>{addon.label}</p>
                      <p className="text-xs" style={{ color: "#B8860B" }}>+{fmt(addon.price)}</p>
                    </div>
                  </label>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <SectionTitle>Booking Summary</SectionTitle>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "#6C757D" }}>Session</span>
                  <span style={{ color: "#2D2D2D" }}>{poolSession?.label || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6C757D" }}>Date</span>
                  <span className="text-right text-xs" style={{ color: "#2D2D2D" }}>{poolDate || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6C757D" }}>Guests × {poolGuests}</span>
                  <span style={{ color: "#2D2D2D" }}>{poolSession ? fmt(poolSession.price * poolGuests) : "—"}</span>
                </div>
                {POOL_ADDONS.filter(a => poolAddons.includes(a.label)).map(a => (
                  <div key={a.label} className="flex justify-between">
                    <span className="text-xs" style={{ color: "#6C757D" }}>{a.label}</span>
                    <span style={{ color: "#2D2D2D" }}>+{fmt(a.price)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold" style={{ borderColor: "rgba(0,0,0,0.08)", color: "#2D2D2D" }}>
                <span>Total</span>
                <span style={{ color: "#B8860B" }}>{poolTotal > 0 ? fmt(poolTotal) : "—"}</span>
              </div>
              <div className="mt-5">
                <GoldBtn label="Book Pool Access" onClick={() => goTo("confirmation", "pool")} disabled={!poolDate || !poolSlot} />
              </div>
              <p className="text-xs text-center mt-2 flex items-center justify-center gap-1" style={{ color: "#6C757D" }}>
                <span>QR entry pass sent by email</span>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Spa Screen ──────────────────────────────────────────────────────────────

  const spaReady = spaTreatment && spaTherapist && spaDate && spaTime;

  const spaScreen = (
    <div className="pt-[72px] min-h-screen" style={{ backgroundColor: "#F8F6F2" }}>
      <div className="relative h-52 overflow-hidden" style={{ backgroundColor: "#4E342E" }}>
        <img src={img("photo-1540555700478-4be289fbecef", 1400, 400)} alt="Spa"
          className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-end p-6" style={{ background: "linear-gradient(to top, rgba(78,52,46,0.95), rgba(78,52,46,0.2))" }}>
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: "#D6C5A4" }}>Aryhills Spa</p>
            <h1 className="font-serif text-4xl text-white">Spa & Wellness</h1>
            <p className="text-sm mt-1" style={{ color: "#D6C5A4" }}>Massages · Facials · Couples retreats · Gift vouchers</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <Card>
              <SectionTitle>Choose Treatment</SectionTitle>
              <div className="space-y-2">
                {SPA_TREATMENTS.map(t => {
                  const selected = spaTreatment?.id === t.id;
                  return (
                    <button key={t.id} onClick={() => setSpaTreatment(t)}
                      className="w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between gap-4"
                      style={{ borderColor: selected ? "#B8860B" : "#D6C5A4", backgroundColor: selected ? "rgba(184,134,11,0.06)" : "white" }}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <p className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>{t.name}</p>
                          {t.category === "Packages" && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: "rgba(184,134,11,0.12)", color: "#B8860B" }}>Best Value</span>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "#6C757D" }}>{t.description}</p>
                        <p className="text-xs mt-1 font-medium flex items-center gap-1" style={{ color: "#9a8a7a" }}>
                          <Clock size={10} /> {t.duration}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold font-serif" style={{ color: "#B8860B" }}>{fmt(t.price)}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card>
              <SectionTitle>Choose Therapist</SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                {SPA_THERAPISTS.map(t => {
                  const selected = spaTherapist?.id === t.id;
                  const initials = t.name.split(" ").map(n => n[0]).join("").slice(0, 2);
                  return (
                    <button key={t.id} onClick={() => setSpaTherapist(t)}
                      className="p-4 rounded-xl border-2 text-left transition-all"
                      style={{ borderColor: selected ? "#B8860B" : "#D6C5A4", backgroundColor: selected ? "rgba(184,134,11,0.06)" : "white" }}>
                      <div className="w-10 h-10 rounded-full mb-2 flex items-center justify-center font-bold text-white text-sm"
                        style={{ backgroundColor: t.rating ? "#4E342E" : "#D6C5A4" }}>
                        {t.rating ? initials : "?"}
                      </div>
                      <p className="font-semibold text-sm" style={{ color: "#2D2D2D" }}>{t.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#6C757D" }}>{t.speciality}</p>
                      {t.rating && (
                        <p className="text-xs mt-1.5 flex items-center gap-0.5 font-semibold" style={{ color: "#B8860B" }}>
                          <Star size={10} fill="#B8860B" /> {t.rating}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card>
              <SectionTitle>Select Date</SectionTitle>
              <DateStrip value={spaDate} onChange={setSpaDate} />
            </Card>

            <Card>
              <SectionTitle>Select Time Slot</SectionTitle>
              <div className="grid grid-cols-4 gap-2">
                {SPA_TIMES.map(time => (
                  <button key={time} onClick={() => setSpaTime(time)}
                    className="py-2.5 rounded-xl border text-sm font-medium transition-all"
                    style={{
                      borderColor: spaTime === time ? "#B8860B" : "#D6C5A4",
                      backgroundColor: spaTime === time ? "rgba(184,134,11,0.08)" : "white",
                      color: spaTime === time ? "#B8860B" : "#2D2D2D",
                    }}>
                    {time}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <SectionTitle>Booking Summary</SectionTitle>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Treatment</span><span className="text-right ml-2 leading-tight" style={{ color: "#2D2D2D" }}>{spaTreatment?.name || "Not selected"}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Duration</span><span style={{ color: "#2D2D2D" }}>{spaTreatment?.duration || "—"}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Therapist</span><span style={{ color: "#2D2D2D" }}>{spaTherapist?.name || "Not selected"}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Date</span><span className="text-right text-xs" style={{ color: "#2D2D2D" }}>{spaDate || "Not selected"}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Time</span><span style={{ color: "#2D2D2D" }}>{spaTime || "Not selected"}</span></div>
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold" style={{ borderColor: "rgba(0,0,0,0.08)", color: "#2D2D2D" }}>
                <span>Total</span>
                <span style={{ color: "#B8860B" }}>{spaTreatment ? fmt(spaTreatment.price) : "—"}</span>
              </div>
              <div className="mt-5">
                <GoldBtn label="Book Treatment" onClick={() => goTo("confirmation", "spa")} disabled={!spaReady} />
              </div>
              <p className="text-xs text-center mt-2" style={{ color: "#6C757D" }}>Arrive 15 min before your appointment</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Confirmation Screen ─────────────────────────────────────────────────────

  const confirmationScreen = (
    <div className="pt-[72px] min-h-screen" style={{ backgroundColor: "#F8F6F2" }}>
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ backgroundColor: "rgba(46,125,50,0.12)" }}>
          <CheckCircle size={32} style={{ color: "#2E7D32" }} />
        </div>
        <h1 className="font-serif text-3xl mb-2" style={{ color: "#2D2D2D" }}>Booking Confirmed!</h1>
        <p className="mb-8" style={{ color: "#6C757D" }}>
          Your {bookingType === "gym" ? "Gym Session" : bookingType === "pool" ? "Pool Access" : "Spa Treatment"} is booked and confirmed.
        </p>

        {/* QR Entry Pass */}
        <Card className="mb-5">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6C757D" }}>Your Entry Pass</p>
          <div className="w-44 h-44 mx-auto mb-4 p-4 rounded-xl" style={{ backgroundColor: "#F8F6F2" }}>
            <div className="w-full h-full grid gap-0.5" style={{ gridTemplateColumns: "repeat(8, 1fr)" }}>
              {QR_CELLS.map((p, i) => (
                <div key={i} className="rounded-sm" style={{ backgroundColor: p ? "#2D2D2D" : "transparent", aspectRatio: "1" }} />
              ))}
            </div>
          </div>
          <p className="font-mono font-bold tracking-widest text-lg mb-1" style={{ color: "#2D2D2D" }}>ARY-28471</p>
          <p className="text-xs" style={{ color: "#6C757D" }}>Present this QR code at the front desk on arrival</p>
        </Card>

        {/* Details */}
        <Card className="mb-6 text-left">
          <h3 className="font-semibold mb-4" style={{ color: "#2D2D2D" }}>Booking Details</h3>
          <div className="space-y-3 text-sm">
            {bookingType === "gym" && gymSlot !== null && (
              <>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Service</span><span style={{ color: "#2D2D2D" }}>Gym Day Pass</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Session</span><span style={{ color: "#2D2D2D" }}>{GYM_SLOTS[gymSlot].time}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Date</span><span style={{ color: "#2D2D2D" }}>{gymDate}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Total</span><span className="font-bold" style={{ color: "#B8860B" }}>{fmt(gymTotal)}</span></div>
              </>
            )}
            {bookingType === "pool" && poolSlot && (
              <>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Service</span><span style={{ color: "#2D2D2D" }}>Pool Access</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Session</span><span style={{ color: "#2D2D2D" }}>{poolSession?.label}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Guests</span><span style={{ color: "#2D2D2D" }}>{poolGuests} {poolGuests === 1 ? "person" : "people"}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Date</span><span style={{ color: "#2D2D2D" }}>{poolDate}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Total</span><span className="font-bold" style={{ color: "#B8860B" }}>{fmt(poolTotal)}</span></div>
              </>
            )}
            {bookingType === "spa" && spaTreatment && (
              <>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Treatment</span><span style={{ color: "#2D2D2D" }}>{spaTreatment.name}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Duration</span><span style={{ color: "#2D2D2D" }}>{spaTreatment.duration}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Therapist</span><span style={{ color: "#2D2D2D" }}>{spaTherapist?.name}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Date & Time</span><span style={{ color: "#2D2D2D" }}>{spaDate}, {spaTime}</span></div>
                <div className="flex justify-between"><span style={{ color: "#6C757D" }}>Total</span><span className="font-bold" style={{ color: "#B8860B" }}>{fmt(spaTreatment.price)}</span></div>
              </>
            )}
            <div className="flex justify-between pt-2 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <span style={{ color: "#6C757D" }}>Location</span>
              <span style={{ color: "#2D2D2D" }}>Aryhills Hotel, Imo, Ilesa, Osun State</span>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-full font-semibold border transition-all hover:bg-white flex items-center justify-center gap-2"
            style={{ borderColor: "#D6C5A4", color: "#2D2D2D" }}>
            <Calendar size={15} /> Add to Calendar
          </button>
          <button onClick={() => goTo("home")} className="flex-1 py-3 rounded-full font-semibold text-white" style={{ backgroundColor: "#B8860B" }}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  // ── Render ──────────────────────────────────────────────────────────────────

  const screens: Record<Screen, React.ReactNode> = {
    home:         homeScreen,
    food:         foodScreen,
    checkout:     checkoutScreen,
    tracking:     trackingScreen,
    gym:          gymScreen,
    pool:         poolScreen,
    spa:          spaScreen,
    confirmation: confirmationScreen,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F2" }}>
      {navbar}
      {screens[screen]}
      {cartDrawer}
      {itemModal}
    </div>
  );
}
