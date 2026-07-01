import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  ScanLine, Key, Printer, CheckCircle, ChevronRight, ChevronLeft,
  Search, Bell, BedDouble, Calendar, Receipt, CreditCard, Wallet,
  Building2, Banknote, Utensils, Wrench, Sparkles, Phone,
  MessageSquare, BarChart3, AlertCircle, Clock, Plus, Tag, X, Check,
  QrCode, Home, Settings, ChevronDown, Coffee, Car, Wifi,
  Hotel, PhoneCall, FileText, Send, Zap, Bath,
  MoreHorizontal, LogOut, TrendingUp, TrendingDown,
  ClipboardList, Users, RefreshCw, Pencil, Download,
  Shield, Star, Filter, MapPin, Package, Wind,
  Brush, ShoppingBag, UtensilsCrossed, LayoutDashboard, ArrowLeft,
  UserCheck, ShoppingCart, DollarSign, Minus,
} from "lucide-react";

// ─── Brand palette ────────────────────────────────────────────────────────────
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

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = "B201"|"B202"|"B203"|"B205"|"REQUESTS"|"GUESTS"|"SALES";
type RoomStatus = "available"|"occupied"|"checking-out"|"cleaning"|"out-of-order"|"reserved";
type Priority = "urgent"|"high"|"standard";
type ReqType = "room-service"|"maintenance"|"housekeeping"|"concierge"|"front-desk";

interface Room {
  id: string; floor: number; type: string; view?: string; status: RoomStatus;
  guest?: { name: string; checkIn: string; checkOut: string; nights: number; reservation: string; };
}
interface GuestRequest {
  id: string; room: string; guestName: string; type: ReqType;
  description: string; priority: Priority; minutesAgo: number;
  countdownSecs?: number; status: "pending"|"acknowledged"|"in-progress"|"resolved";
}

// ─── Rooms data ───────────────────────────────────────────────────────────────
const ROOMS: Room[] = [
  // Floor 1
  {id:"101",floor:1,type:"Standard",view:"Garden",status:"available"},
  {id:"102",floor:1,type:"Standard",view:"Garden",status:"occupied",guest:{name:"Mr. Chidi Okafor",checkIn:"Dec 13",checkOut:"Dec 17",nights:4,reservation:"BKG-0813"}},
  {id:"103",floor:1,type:"Standard",view:"Courtyard",status:"cleaning"},
  {id:"104",floor:1,type:"Standard",view:"Courtyard",status:"available"},
  {id:"105",floor:1,type:"Standard",view:"Pool",status:"occupied",guest:{name:"Mrs. Grace Nwosu",checkIn:"Dec 14",checkOut:"Dec 16",nights:2,reservation:"BKG-0820"}},
  {id:"106",floor:1,type:"Standard",view:"Pool",status:"reserved",guest:{name:"Mr. Felix Eze",checkIn:"Dec 16",checkOut:"Dec 19",nights:3,reservation:"BKG-0831"}},
  {id:"107",floor:1,type:"Standard",view:"Garden",status:"cleaning"},
  {id:"108",floor:1,type:"Standard",view:"Garden",status:"available"},
  {id:"109",floor:1,type:"Standard",view:"Courtyard",status:"occupied",guest:{name:"Ms. Ngozi Eze",checkIn:"Dec 14",checkOut:"Dec 18",nights:4,reservation:"BKG-0829"}},
  {id:"110",floor:1,type:"Standard",view:"Garden",status:"out-of-order"},
  // Floor 2
  {id:"201",floor:2,type:"Deluxe",view:"Garden",status:"occupied",guest:{name:"Mr. James Carter",checkIn:"Dec 12",checkOut:"Dec 16",nights:4,reservation:"BKG-0801"}},
  {id:"202",floor:2,type:"Deluxe",view:"Garden",status:"available"},
  {id:"203",floor:2,type:"Deluxe",view:"Pool",status:"checking-out",guest:{name:"Mrs. Aisha Bello",checkIn:"Dec 11",checkOut:"Dec 15",nights:4,reservation:"BKG-0790"}},
  {id:"204",floor:2,type:"Deluxe",view:"Garden",status:"occupied",guest:{name:"Mr. Adebayo Mensah",checkIn:"Dec 15",checkOut:"Dec 18",nights:3,reservation:"BKG-0847"}},
  {id:"205",floor:2,type:"Deluxe",view:"City",status:"reserved",guest:{name:"Dr. Emeka Obiora",checkIn:"Dec 16",checkOut:"Dec 20",nights:4,reservation:"BKG-0852"}},
  {id:"206",floor:2,type:"Deluxe",view:"City",status:"available"},
  {id:"207",floor:2,type:"Deluxe",view:"City",status:"occupied",guest:{name:"Mrs. Helen Adeyemi",checkIn:"Dec 14",checkOut:"Dec 17",nights:3,reservation:"BKG-0823"}},
  {id:"208",floor:2,type:"Deluxe",view:"Pool",status:"cleaning"},
  {id:"209",floor:2,type:"Deluxe",view:"Pool",status:"available"},
  {id:"210",floor:2,type:"Deluxe",view:"Garden",status:"occupied",guest:{name:"Mr. Kofi Asante",checkIn:"Dec 13",checkOut:"Dec 17",nights:4,reservation:"BKG-0812"}},
  // Floor 3
  {id:"301",floor:3,type:"Superior",view:"City",status:"occupied",guest:{name:"Mr. David Okonkwo",checkIn:"Dec 14",checkOut:"Dec 18",nights:4,reservation:"BKG-0826"}},
  {id:"302",floor:3,type:"Superior",view:"City",status:"available"},
  {id:"303",floor:3,type:"Superior",view:"Panoramic",status:"occupied",guest:{name:"Ms. Amara Diallo",checkIn:"Dec 15",checkOut:"Dec 19",nights:4,reservation:"BKG-0840"}},
  {id:"304",floor:3,type:"Superior",view:"Pool",status:"checking-out",guest:{name:"Mr. Samuel Obi",checkIn:"Dec 12",checkOut:"Dec 15",nights:3,reservation:"BKG-0795"}},
  {id:"305",floor:3,type:"Superior",view:"Pool",status:"cleaning"},
  {id:"306",floor:3,type:"Superior",view:"Panoramic",status:"available"},
  {id:"307",floor:3,type:"Superior",view:"City",status:"reserved",guest:{name:"Mrs. Fatima Hassan",checkIn:"Dec 16",checkOut:"Dec 18",nights:2,reservation:"BKG-0856"}},
  {id:"308",floor:3,type:"Superior",view:"City",status:"occupied",guest:{name:"Mr. Ahmed Musa",checkIn:"Dec 14",checkOut:"Dec 17",nights:3,reservation:"BKG-0825"}},
  {id:"309",floor:3,type:"Superior",view:"Panoramic",status:"available"},
  {id:"310",floor:3,type:"Superior",view:"Panoramic",status:"out-of-order"},
  // Floor 4 — Suites
  {id:"401",floor:4,type:"Suite",view:"Panoramic",status:"occupied",guest:{name:"Mr. Babatunde Adeyemi",checkIn:"Dec 13",checkOut:"Dec 18",nights:5,reservation:"BKG-0810"}},
  {id:"402",floor:4,type:"Suite",view:"Panoramic",status:"available"},
  {id:"403",floor:4,type:"Suite",view:"Ocean",status:"occupied",guest:{name:"Ms. Tunde Fashola",checkIn:"Dec 15",checkOut:"Dec 20",nights:5,reservation:"BKG-0845"}},
  {id:"404",floor:4,type:"Suite",view:"Ocean",status:"reserved",guest:{name:"Dr. Ngozi Adichie",checkIn:"Dec 17",checkOut:"Dec 22",nights:5,reservation:"BKG-0862"}},
  // Floor 5 — Suites
  {id:"501",floor:5,type:"Suite",view:"Panoramic",status:"occupied",guest:{name:"Mr. James Carter",checkIn:"Dec 13",checkOut:"Dec 17",nights:4,reservation:"BKG-0802"}},
  {id:"502",floor:5,type:"Suite",view:"Panoramic",status:"available"},
];

// ─── Requests data ────────────────────────────────────────────────────────────
const INITIAL_REQUESTS: GuestRequest[] = [
  {id:"REQ-001",room:"512",guestName:"Mr. Babatunde Adeyemi",type:"maintenance",description:"Hot water not available in bathroom — guest very dissatisfied",priority:"urgent",minutesAgo:12,countdownSecs:480,status:"pending"},
  {id:"REQ-002",room:"318",guestName:"Mrs. Sarah Mitchell",type:"maintenance",description:"Air conditioning unit not functioning — room temperature unbearable",priority:"urgent",minutesAgo:8,countdownSecs:323,status:"pending"},
  {id:"REQ-003",room:"204",guestName:"Mr. Adebayo Mensah",type:"housekeeping",description:"Extra towels and an additional pillow requested",priority:"high",minutesAgo:25,status:"acknowledged"},
  {id:"REQ-004",room:"417",guestName:"Mrs. Aisha Bello",type:"room-service",description:"Follow-up on room service order not yet delivered after 45 mins",priority:"high",minutesAgo:31,status:"in-progress"},
  {id:"REQ-005",room:"501",guestName:"Mr. James Carter",type:"front-desk",description:"Late check-out request to 2:00 PM on Dec 17",priority:"standard",minutesAgo:62,status:"pending"},
  {id:"REQ-006",room:"109",guestName:"Ms. Ngozi Eze",type:"concierge",description:"Book airport transfer for 06:00 AM departure tomorrow",priority:"standard",minutesAgo:118,status:"acknowledged"},
  {id:"REQ-007",room:"301",guestName:"Mr. David Okonkwo",type:"concierge",description:"Restaurant reservation for 4 guests at Crest — 7:30 PM tonight",priority:"high",minutesAgo:45,status:"in-progress"},
  {id:"REQ-008",room:"220",guestName:"Mrs. Fatima Hassan",type:"housekeeping",description:"Do Not Disturb flag override — room needs urgent servicing",priority:"standard",minutesAgo:180,status:"pending"},
];

// ─── Folio data ───────────────────────────────────────────────────────────────
const FOLIO_BASE = {
  guestName:"Mrs. Aisha Bello", room:"203", roomType:"Deluxe Double — Pool View",
  checkIn:"Dec 11, 2024", checkOut:"Dec 15, 2024", nights:4, reservationId:"BKG-0790",
};
const FOLIO_CHARGES = {
  room:     [{id:"r1",desc:"Deluxe Double — Night 1 (Dec 11)",amount:85000},{id:"r2",desc:"Deluxe Double — Night 2 (Dec 12)",amount:85000},{id:"r3",desc:"Deluxe Double — Night 3 (Dec 13)",amount:85000},{id:"r4",desc:"Deluxe Double — Night 4 (Dec 14)",amount:85000},{id:"r5",desc:"Mini Bar (Dec 13)",amount:12500}],
  fnb:      [{id:"f1",desc:"Crest Restaurant — Dinner (Dec 11)",amount:28000},{id:"f2",desc:"Room Service — Breakfast (Dec 12)",amount:14500},{id:"f3",desc:"Pool Bar (Dec 13)",amount:8500},{id:"f4",desc:"Crest Restaurant — Dinner (Dec 14)",amount:31000}],
  ancillary:[{id:"a1",desc:"Serenity Spa — Full Day (Dec 12)",amount:35000},{id:"a2",desc:"Laundry Service (Dec 13)",amount:8500},{id:"a3",desc:"Airport Transfer (on departure)",amount:15000}],
};

// ─── Utilities ────────────────────────────────────────────────────────────────
const fmt = (n: number) => "₦" + n.toLocaleString("en-NG");

function statusCfg(s: string) {
  const map: Record<string, {bg:string;text:string;label:string}> = {
    available:      {bg:"#E8F5E9",text:"#2E7D32",label:"Available"},
    occupied:       {bg:"#FFF8E1",text:"#B8860B",label:"Occupied"},
    "checking-out": {bg:"#FFF3E0",text:"#F4A300",label:"Checking Out"},
    cleaning:       {bg:"#F5F5F5",text:"#6C757D",label:"Cleaning"},
    "out-of-order": {bg:"#FFEBEE",text:"#D32F2F",label:"Out of Order"},
    reserved:       {bg:"#F5EFE6",text:"#4E342E",label:"Reserved"},
    urgent:         {bg:"#FFEBEE",text:"#D32F2F",label:"Urgent"},
    high:           {bg:"#FFF3E0",text:"#F4A300",label:"High"},
    standard:       {bg:"#F5F5F5",text:"#6C757D",label:"Standard"},
    confirmed:      {bg:"#E8F5E9",text:"#2E7D32",label:"Confirmed"},
    pending:        {bg:"#FFF3E0",text:"#F4A300",label:"Pending"},
    acknowledged:   {bg:"#E3F2FD",text:"#1565C0",label:"Acknowledged"},
    "in-progress":  {bg:"#FFF3E0",text:"#F4A300",label:"In Progress"},
    resolved:       {bg:"#E8F5E9",text:"#2E7D32",label:"Resolved"},
    completed:      {bg:"#E8F5E9",text:"#2E7D32",label:"Completed"},
    cancelled:      {bg:"#FFEBEE",text:"#D32F2F",label:"Cancelled"},
  };
  return map[s] ?? map.standard;
}

function StatusBadge({status,label}:{status:string;label?:string}) {
  const cfg = statusCfg(status);
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
      style={{backgroundColor:cfg.bg, color:cfg.text}}>
      {label ?? cfg.label}
    </span>
  );
}

// QR Code SVG placeholder — deterministic pattern that looks like a real QR
function QRCode({size=160,fg="#2D2D2D"}:{size?:number;fg?:string}) {
  const n=21, c=size/n;
  // Compact pattern string (1=dark, 0=light), 21×21
  const rows = [
    "1111111011010111111111",
    "1000001001101000000101",
    "1011101011011011101011",
    "1011101001100101110101",
    "1011101010101011101101",
    "1000001011010100000101",
    "1111111010101111111111",
    "0000000011010000000001",
    "1011011101011001010111",
    "0101100010100100110010",
    "1100010101001010010111",
    "0010101010110001010010",
    "1001001101010100100101",
    "0000000011001011001000",
    "1111111000101001010011",
    "1000001011010001001010",
    "1011101001010110001011",
    "1011101010100010001010",
    "1011101001011001001011",
    "1000001010110000001010",
    "1111111011001001010011",
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill="white" />
      {rows.slice(0,n).map((row,r) =>
        row.split("").slice(0,n).map((cell,col) =>
          cell==="1" ? <rect key={`${r}-${col}`} x={col*c} y={r*c} width={c-.5} height={c-.5} fill={fg}/> : null
        )
      )}
    </svg>
  );
}

// ─── Layout Shell ──────────────────────────────────────────────────────────────
const NAV: {id:Screen;label:string;Icon:any;badge?:number}[] = [
  {id:"B205",label:"Dashboard",Icon:Home},
  {id:"B201",label:"Guest Check-In",Icon:ScanLine},
  {id:"B202",label:"Check-Out & Invoice",Icon:LogOut},
  {id:"B203",label:"Room Status Board",Icon:BedDouble},
  {id:"REQUESTS",label:"Guest Requests",Icon:MessageSquare,badge:5},
  {id:"GUESTS",label:"Guest Management",Icon:Users},
  {id:"SALES",label:"Sales",Icon:ShoppingBag},
];

function Sidebar({active,onNav}:{active:Screen;onNav:(s:Screen)=>void}) {
  return (
    <div className="w-60 flex-shrink-0 flex flex-col h-full" style={{backgroundColor:C.brown}}>
      {/* Logo */}
      <div className="h-16 flex items-center px-5 gap-3 border-b" style={{borderColor:"rgba(214,197,164,0.15)"}}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor:C.gold}}>
          <Hotel className="w-4 h-4 text-white"/>
        </div>
        <div>
          <div className="text-white font-bold text-sm tracking-widest leading-none">ARYHILLS</div>
          <div className="text-xs mt-0.5" style={{color:C.beige}}>Hotel Management</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {/* Other system links */}
        {[
          {label:"Dashboard",Icon:Home},
          {label:"Reservations",Icon:Calendar},
        ].map(item=>(
          <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
            style={{color:"rgba(255,255,255,0.55)"}}>
            <item.Icon className="w-4 h-4"/>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}

        <div className="pt-3 pb-1 px-3">
          <span className="text-xs font-medium uppercase tracking-widest" style={{color:"rgba(214,197,164,0.45)"}}>Front Desk</span>
        </div>

        {NAV.map(item=>{
          const on=active===item.id;
          return (
            <button key={item.id} onClick={()=>onNav(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all"
              style={{
                backgroundColor: on ? C.gold : "transparent",
                color: on ? "#EFFFFE" : "rgba(255,255,255,0.72)",
              }}>
              <item.Icon className="w-4 h-4 flex-shrink-0"/>
              <span className="text-sm">{item.label}</span>
              {item.id==="B205" && (
                <span className="ml-auto text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
                  style={{backgroundColor:C.red,color:"white"}}>2</span>
              )}
            </button>
          );
        })}

        <div className="pt-3 pb-1 px-3">
          <span className="text-xs font-medium uppercase tracking-widest" style={{color:"rgba(214,197,164,0.45)"}}>Operations</span>
        </div>
        {[
          {label:"Housekeeping",Icon:Sparkles},
          {label:"Reports",Icon:BarChart3},
          {label:"Settings",Icon:Settings},
        ].map(item=>(
          <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
            style={{color:"rgba(255,255,255,0.55)"}}>
            <item.Icon className="w-4 h-4"/>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Agent */}
      <div className="p-4 border-t" style={{borderColor:"rgba(214,197,164,0.15)"}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{backgroundColor:C.gold}}>AO</div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">Amaka Osei</div>
            <div className="text-xs" style={{color:C.beige}}>Front Desk Agent</div>
          </div>
          <LogOut className="w-4 h-4 cursor-pointer flex-shrink-0" style={{color:"rgba(214,197,164,0.5)"}}/>
        </div>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="h-16 flex items-center px-6 gap-4 flex-shrink-0" style={{backgroundColor:C.brown}}>
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{color:"rgba(214,197,164,0.45)"}}/>
          <input placeholder="Search guests, rooms, reservations…"
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none border-0"
            style={{backgroundColor:"rgba(255,255,255,0.08)",color:"rgba(214,197,164,0.9)",caretColor:C.beige}}/>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <div className="relative">
          <button className="w-9 h-9 rounded-lg flex items-center justify-center" style={{backgroundColor:"rgba(255,255,255,0.08)"}}>
            <Bell className="w-4 h-4" style={{color:C.beige}}/>
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center font-semibold"
            style={{backgroundColor:C.red,fontSize:"10px"}}>3</span>
        </div>
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{backgroundColor:C.gold}}>AO</div>
          <div className="hidden lg:block">
            <div className="text-white text-xs font-semibold leading-none">Amaka Osei</div>
            <div className="text-xs mt-0.5" style={{color:"rgba(214,197,164,0.7)"}}>Front Desk · Shift A</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageHdr({title,crumbs,action}:{title:string;crumbs:string[];action?:{label:string;Icon?:any;onClick?:()=>void}}) {
  return (
    <div className="h-20 flex items-center justify-between px-8 flex-shrink-0 border-b"
      style={{backgroundColor:C.ivory,borderColor:"rgba(78,52,46,0.08)"}}>
      <div>
        <div className="flex items-center gap-1 mb-1">
          {crumbs.map((c,i)=>(
            <span key={i} className="flex items-center gap-1">
              <span className="text-xs" style={{color:C.gray}}>{c}</span>
              {i<crumbs.length-1&&<ChevronRight className="w-3 h-3" style={{color:C.gray}}/>}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-semibold leading-none" style={{color:C.charcoal}}>{title}</h1>
      </div>
      {action && (
        <button onClick={action.onClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          style={{backgroundColor:C.gold,color:"#EFFFFE"}}>
          {action.Icon && <action.Icon className="w-4 h-4"/>}
          {action.label}
        </button>
      )}
    </div>
  );
}

// ─── B2-01 Guest Check-In Flow ────────────────────────────────────────────────
function B201() {
  const [step, setStep] = useState(1);
  const [scanned, setScanned] = useState(false);
  const [activated, setActivated] = useState(false);

  const STEPS = ["Verify Identity","Assign Room","Issue Key Card","Confirm & Print"];

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{backgroundColor:C.ivory}}>
      <PageHdr title="Guest Check-In" crumbs={["Front Desk","Guest Check-In"]} action={{label:"Walk-In Guest",Icon:Plus}}/>
      <div className="flex-1 overflow-y-auto p-8">
        {/* Stepper */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-start">
            {STEPS.map((label,i)=>{
              const n=i+1, done=step>n, active=step===n;
              return (
                <div key={n} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all"
                      style={{backgroundColor:done?C.green:active?C.gold:"#E8E3D9",color:done||active?"white":C.gray}}>
                      {done?<Check className="w-5 h-5"/>:n}
                    </div>
                    <span className="text-xs mt-1.5 font-medium text-center whitespace-nowrap"
                      style={{color:active||done?C.charcoal:C.gray}}>{label}</span>
                  </div>
                  {i<3&&(
                    <div className="flex-1 h-0.5 mx-2 mb-5 transition-all"
                      style={{backgroundColor:step>n?C.green:"#E8E3D9"}}/>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1 — Identity */}
        {step===1&&(
          <div className="max-w-3xl mx-auto grid grid-cols-2 gap-6">
            <div className="rounded-xl p-6 shadow-sm" style={{backgroundColor:C.white}}>
              <h2 className="text-lg font-semibold mb-1" style={{color:C.charcoal}}>Document Scan</h2>
              <p className="text-sm mb-5" style={{color:C.gray}}>Scan guest passport or national ID card</p>
              {!scanned?(
                <>
                  <div className="relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center text-center mb-4 cursor-pointer hover:border-amber-500 transition-colors overflow-hidden"
                    style={{borderColor:C.beige,backgroundColor:C.ivory}}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{backgroundColor:"#FFF8E1"}}>
                      <ScanLine className="w-7 h-7" style={{color:C.gold}}/>
                    </div>
                    <p className="font-semibold text-sm mb-1" style={{color:C.charcoal}}>Place document on scanner</p>
                    <p className="text-xs" style={{color:C.gray}}>Passport · National ID · Driver's Licence</p>
                    {/* scan beam */}
                    <div className="absolute left-6 right-6 h-0.5 rounded-full opacity-70 scan-beam"
                      style={{backgroundColor:C.gold,top:"40%"}}/>
                  </div>
                  <button onClick={()=>setScanned(true)}
                    className="w-full py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                    style={{backgroundColor:C.gold,color:"#EFFFFE"}}>
                    Simulate Scan / Upload
                  </button>
                </>
              ):(
                <>
                  <div className="rounded-xl overflow-hidden mb-4 flex items-center justify-center py-8 relative"
                    style={{backgroundColor:"#E8E3D9",aspectRatio:"1.585"}}>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xl font-bold"
                        style={{backgroundColor:C.brown}}>AM</div>
                      <div className="text-sm font-bold" style={{color:C.charcoal}}>REPUBLIC OF GHANA</div>
                      <div className="text-xs mt-0.5" style={{color:C.gray}}>PASSPORT · TYPE P</div>
                      <div className="font-mono text-sm mt-2 font-semibold" style={{color:C.charcoal}}>GHA-X2847391</div>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{backgroundColor:"#E8F5E9",color:C.green}}>
                      <CheckCircle className="w-3 h-3"/>Verified
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg text-sm"
                    style={{backgroundColor:"#E8F5E9",color:C.green}}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0"/>
                    Document verified — ICAO MRZ compliant
                  </div>
                </>
              )}
            </div>

            <div className="rounded-xl p-6 shadow-sm" style={{backgroundColor:C.white}}>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold" style={{color:C.charcoal}}>Booking Match</h2>
                  <p className="text-xs mt-0.5" style={{color:C.gray}}>Arrival today · Pre-paid</p>
                </div>
                <StatusBadge status="confirmed"/>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{color:C.gray}}>Reservation ID</div>
                  <div className="font-mono font-semibold text-sm" style={{color:C.gold}}>BKG-20241215-0847</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{color:C.gray}}>Full Name</div>
                    <div className="text-sm font-semibold" style={{color:C.charcoal}}>Mr. Adebayo Mensah</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{color:C.gray}}>Nationality</div>
                    <div className="text-sm" style={{color:C.charcoal}}>Ghanaian</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{color:C.gray}}>Passport</div>
                    <div className="font-mono text-sm" style={{color:C.charcoal}}>GHA-X2847391</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{color:C.gray}}>Phone</div>
                    <div className="text-sm" style={{color:C.charcoal}}>+233 24 567 8901</div>
                  </div>
                </div>
                <div className="h-px" style={{backgroundColor:"rgba(78,52,46,0.08)"}}/>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {l:"Check-In",v:"Dec 15, 2024"},
                    {l:"Check-Out",v:"Dec 18, 2024"},
                    {l:"Nights",v:"3"},
                  ].map(f=>(
                    <div key={f.l}>
                      <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{color:C.gray}}>{f.l}</div>
                      <div className="text-sm font-semibold" style={{color:C.charcoal}}>{f.v}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{color:C.gray}}>Room Type</div>
                    <div className="text-sm" style={{color:C.charcoal}}>Deluxe Double</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{color:C.gray}}>Nightly Rate</div>
                    <div className="text-sm font-bold" style={{color:C.gold}}>₦85,000</div>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t" style={{borderColor:"rgba(78,52,46,0.08)"}}>
                <button onClick={()=>scanned&&setStep(2)} disabled={!scanned}
                  className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                  style={{backgroundColor:scanned?C.gold:"#E8E3D9",color:scanned?"#EFFFFE":C.gray}}>
                  {scanned?"Proceed to Room Assignment":"Scan document to continue"}
                  {scanned&&<ChevronRight className="w-4 h-4"/>}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Room */}
        {step===2&&(
          <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6">
            <div className="col-span-2 rounded-xl shadow-sm overflow-hidden" style={{backgroundColor:C.white}}>
              <div className="p-5 border-b" style={{borderColor:"rgba(78,52,46,0.08)"}}>
                <h2 className="text-lg font-semibold" style={{color:C.charcoal}}>Assigned Room</h2>
                <p className="text-sm mt-0.5" style={{color:C.gray}}>Pre-assigned based on reservation type · Garden Floor 2</p>
              </div>
              {/* Hero */}
              <div className="relative h-44" style={{backgroundColor:C.brown}}>
                <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=350&fit=crop&auto=format"
                  alt="Room 204" className="w-full h-full object-cover opacity-60"/>
                <div className="absolute inset-0 flex items-end p-5">
                  <div>
                    <div className="text-white/60 text-xs mb-0.5 uppercase tracking-widest">Floor 2</div>
                    <div className="text-white font-bold text-3xl leading-none">Room 204</div>
                    <div className="text-sm mt-1" style={{color:C.beige}}>Deluxe Double · Garden View</div>
                  </div>
                </div>
                <div className="absolute top-3 right-3"><StatusBadge status="available"/></div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  {[
                    {Icon:BedDouble,l:"King Bed"},
                    {Icon:Users,l:"Max 2"},
                    {Icon:Wifi,l:"Free WiFi"},
                    {Icon:Bath,l:"Ensuite"},
                  ].map(({Icon,l})=>(
                    <div key={l} className="flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor:"#FFF8E1"}}>
                        <Icon className="w-4 h-4" style={{color:C.gold}}/>
                      </div>
                      <span className="text-xs" style={{color:C.gray}}>{l}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{color:C.gray}}>Alternate Options</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {r:"207",t:"Deluxe Double",v:"City View",rate:90000},
                    {r:"312",t:"Superior King",v:"Pool View",rate:110000},
                  ].map(room=>(
                    <div key={room.r} className="p-3 rounded-lg border cursor-pointer hover:border-amber-500 transition-colors"
                      style={{borderColor:"rgba(78,52,46,0.12)"}}>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-sm" style={{color:C.charcoal}}>Room {room.r}</div>
                          <div className="text-xs" style={{color:C.gray}}>{room.t} · {room.v}</div>
                        </div>
                        <div className="text-sm font-bold" style={{color:C.gold}}>{fmt(room.rate)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl p-5 shadow-sm" style={{backgroundColor:C.white}}>
              <h2 className="text-lg font-semibold mb-4" style={{color:C.charcoal}}>Summary</h2>
              <div className="space-y-3 text-sm mb-5">
                {[
                  {l:"Guest",v:"Mr. Adebayo Mensah"},
                  {l:"Room",v:"204 — Deluxe"},
                  {l:"Check-In",v:"Dec 15, 2024"},
                  {l:"Check-Out",v:"Dec 18, 2024"},
                  {l:"Nights",v:"3"},
                ].map(row=>(
                  <div key={row.l} className="flex justify-between">
                    <span style={{color:C.gray}}>{row.l}</span>
                    <span className="font-medium text-right" style={{color:C.charcoal}}>{row.v}</span>
                  </div>
                ))}
                <div className="h-px" style={{backgroundColor:"rgba(78,52,46,0.08)"}}/>
                <div className="flex justify-between">
                  <span style={{color:C.gray}}>Rate/Night</span>
                  <span className="font-bold" style={{color:C.gold}}>₦85,000</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span style={{color:C.charcoal}}>Room Total</span>
                  <span style={{color:C.charcoal}}>₦255,000</span>
                </div>
              </div>
              <div className="p-3 rounded-lg mb-4 text-xs" style={{backgroundColor:"#FFF8E1"}}>
                <div className="font-semibold mb-0.5" style={{color:C.gold}}>Special Request</div>
                <div style={{color:C.gray}}>High floor, extra pillow</div>
              </div>
              <div className="space-y-2">
                <button onClick={()=>setStep(3)}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90"
                  style={{backgroundColor:C.gold,color:"#EFFFFE"}}>
                  Confirm Room 204 <ChevronRight className="w-4 h-4"/>
                </button>
                <button onClick={()=>setStep(1)}
                  className="w-full py-2 rounded-lg text-sm border"
                  style={{borderColor:C.beige,color:C.gray}}>
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Key Card */}
        {step===3&&(
          <div className="max-w-3xl mx-auto flex gap-6">
            <div className="flex-1 rounded-xl p-8 shadow-sm flex flex-col items-center" style={{backgroundColor:C.white}}>
              <div className="self-start mb-6">
                <h2 className="text-lg font-semibold" style={{color:C.charcoal}}>Digital Key Card</h2>
                <p className="text-sm mt-0.5" style={{color:C.gray}}>Activate NFC key and issue to guest</p>
              </div>

              {/* Card graphic */}
              <div className="relative mb-8">
                <div className="absolute -bottom-4 inset-x-6 h-6 rounded-full blur-xl opacity-40" style={{backgroundColor:C.brown}}/>
                <div className="w-80 h-48 rounded-2xl relative overflow-hidden"
                  style={{background:`linear-gradient(135deg, ${C.brown} 0%, #3E2723 45%, #6D4C41 100%)`,
                    boxShadow:"0 24px 48px rgba(78,52,46,0.45)"}}>
                  {/* bg circle decorations */}
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full" style={{backgroundColor:"rgba(184,134,11,0.08)"}}/>
                  <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full" style={{backgroundColor:"rgba(214,197,164,0.06)"}}/>
                  {/* Chip */}
                  <div className="absolute top-6 left-6 w-11 h-8 rounded"
                    style={{background:"linear-gradient(135deg,#B8860B,#D4A017)",border:"1px solid rgba(214,197,164,0.4)"}}>
                    <div className="absolute inset-1 grid grid-cols-3 grid-rows-3 gap-px">
                      {Array.from({length:9}).map((_,i)=>(
                        <div key={i} className="rounded-sm" style={{backgroundColor:"rgba(78,52,46,0.35)"}}/>
                      ))}
                    </div>
                  </div>
                  {/* Hotel */}
                  <div className="absolute top-6 right-5 text-right">
                    <div className="font-bold text-base tracking-widest" style={{color:C.gold}}>ARYHILLS</div>
                    <div className="text-xs tracking-wider" style={{color:"rgba(214,197,164,0.65)"}}>HOTEL & RESORTS</div>
                  </div>
                  {/* Ghost key icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{opacity:0.04}}>
                    <Key className="w-24 h-24 text-white"/>
                  </div>
                  {/* Room */}
                  <div className="absolute bottom-10 left-6">
                    <div className="text-xs uppercase tracking-widest mb-0.5" style={{color:"rgba(214,197,164,0.55)"}}>Room</div>
                    <div className="text-4xl font-bold text-white leading-none">204</div>
                  </div>
                  {/* Guest */}
                  <div className="absolute bottom-10 right-5 text-right">
                    <div className="text-xs uppercase tracking-widest mb-0.5" style={{color:"rgba(214,197,164,0.55)"}}>Guest</div>
                    <div className="text-sm font-semibold text-white">Mr. Adebayo Mensah</div>
                  </div>
                  {/* Footer */}
                  <div className="absolute bottom-3 left-6 right-5 flex justify-between items-center">
                    <span className="text-xs" style={{color:"rgba(184,134,11,0.85)"}}>Dec 15 – Dec 18, 2024</span>
                    <span className="text-xs flex items-center gap-1" style={{color:"rgba(214,197,164,0.5)"}}>
                      <Wifi className="w-3 h-3"/>NFC · RFID
                    </span>
                  </div>
                </div>
              </div>

              {!activated?(
                <button onClick={()=>setActivated(true)}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{backgroundColor:C.gold,color:"#EFFFFE"}}>
                  <Zap className="w-4 h-4"/>Activate Key Card
                </button>
              ):(
                <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                  <div className="flex items-center gap-2 text-sm" style={{color:C.green}}>
                    <CheckCircle className="w-4 h-4"/>Key activated — Room 204 unlocked
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <button className="py-2.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-1.5"
                      style={{borderColor:C.beige,color:C.charcoal}}>
                      <Phone className="w-4 h-4"/>Send to App
                    </button>
                    <button className="py-2.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-1.5"
                      style={{borderColor:C.beige,color:C.charcoal}}>
                      <MessageSquare className="w-4 h-4"/>Send SMS
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="w-64 rounded-xl p-5 shadow-sm" style={{backgroundColor:C.white}}>
              <h2 className="text-base font-semibold mb-4" style={{color:C.charcoal}}>Key Configuration</h2>
              <div className="space-y-3 text-sm mb-6">
                {[
                  {l:"Key Type",v:"Digital + Physical"},
                  {l:"Access",v:"Room · Pool · Gym"},
                  {l:"Valid From",v:"Dec 15 · 3:00 PM"},
                  {l:"Valid Until",v:"Dec 18 · 12:00 PM"},
                  {l:"Copies",v:"2 key sets"},
                ].map(row=>(
                  <div key={row.l} className="flex justify-between">
                    <span style={{color:C.gray}}>{row.l}</span>
                    <span className="font-medium" style={{color:C.charcoal}}>{row.v}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <button onClick={()=>activated&&setStep(4)} disabled={!activated}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                  style={{backgroundColor:activated?C.gold:"#E8E3D9",color:activated?"#EFFFFE":C.gray}}>
                  Proceed to Receipt <ChevronRight className="w-4 h-4"/>
                </button>
                <button onClick={()=>setStep(2)}
                  className="w-full py-2 rounded-lg text-sm border" style={{borderColor:C.beige,color:C.gray}}>
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 — Confirm */}
        {step===4&&(
          <div className="max-w-xl mx-auto">
            <div className="rounded-xl p-8 shadow-sm text-center mb-5" style={{backgroundColor:C.white}}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor:"#E8F5E9"}}>
                <CheckCircle className="w-8 h-8" style={{color:C.green}}/>
              </div>
              <h2 className="text-2xl font-bold mb-1" style={{color:C.charcoal}}>Check-In Complete!</h2>
              <p className="text-sm" style={{color:C.gray}}>Mr. Adebayo Mensah is now checked into Room 204</p>
            </div>

            <div className="rounded-xl shadow-sm overflow-hidden mb-5" style={{backgroundColor:C.white}}>
              <div className="px-6 py-4" style={{backgroundColor:C.brown}}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white font-bold text-lg tracking-widest">ARYHILLS</div>
                    <div className="text-xs" style={{color:C.beige}}>Hotel & Tower · Imo, Ilesa, Osun State</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs" style={{color:"rgba(214,197,164,0.7)"}}>CHECK-IN RECEIPT</div>
                    <div className="font-mono text-sm text-white">BKG-20241215-0847</div>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{color:C.gray}}>Guest</div>
                    <div className="text-sm font-bold mb-0.5" style={{color:C.charcoal}}>Mr. Adebayo Mensah</div>
                    <div className="text-sm" style={{color:C.gray}}>adebayo.mensah@gmail.com</div>
                    <div className="text-sm" style={{color:C.gray}}>+233 24 567 8901</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{color:C.gray}}>Room</div>
                    <div className="text-sm font-bold mb-0.5" style={{color:C.charcoal}}>Room 204 · Deluxe Double</div>
                    <div className="text-sm" style={{color:C.gray}}>Floor 2 · Garden View</div>
                  </div>
                </div>
                <div className="h-px" style={{backgroundColor:"rgba(78,52,46,0.08)"}}/>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {[
                    {l:"Check-In",v:"Dec 15, 2024",s:"3:00 PM"},
                    {l:"Check-Out",v:"Dec 18, 2024",s:"12:00 PM"},
                    {l:"Duration",v:"3 Nights",s:""},
                  ].map(r=>(
                    <div key={r.l}>
                      <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{color:C.gray}}>{r.l}</div>
                      <div className="font-semibold" style={{color:C.charcoal}}>{r.v}</div>
                      {r.s&&<div className="text-xs" style={{color:C.gray}}>{r.s}</div>}
                    </div>
                  ))}
                </div>
                <div className="h-px" style={{backgroundColor:"rgba(78,52,46,0.08)"}}/>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{color:C.gray}}>Room Charges</div>
                    <div className="text-sm" style={{color:C.charcoal}}>₦85,000 × 3 nights</div>
                  </div>
                  <div className="text-xl font-bold" style={{color:C.gold}}>₦255,000</div>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg text-xs" style={{backgroundColor:"#FFF8E1"}}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color:C.amber}}/>
                  <span style={{color:C.gray}}>Pre-authorization of ₦50,000 placed on guest card as security deposit. Released on checkout if no damage.</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button className="py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90"
                style={{backgroundColor:C.gold,color:"#EFFFFE"}}>
                <Printer className="w-4 h-4"/>Print Receipt
              </button>
              <button className="py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border"
                style={{borderColor:C.beige,color:C.charcoal}}>
                <Send className="w-4 h-4"/>Email Guest
              </button>
              <button onClick={()=>{setStep(1);setScanned(false);setActivated(false);}}
                className="py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border"
                style={{borderColor:C.beige,color:C.gray}}>
                New Check-In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── B2-02 Check-Out & Invoice ─────────────────────────────────────────────────
function B202() {
  const [view, setView] = useState<"folio"|"payment"|"receipt">("folio");
  const [payment, setPayment] = useState("card");

  const subtotal = 408000;
  const svcCharge = Math.round(subtotal*0.05);
  const vat = Math.round((subtotal+svcCharge)*0.075);
  const levy = 5000;
  const total = subtotal+svcCharge+vat+levy;

  const categories = [
    {key:"room",label:"Room Charges",Icon:BedDouble,color:C.gold,items:FOLIO_CHARGES.room,sub:FOLIO_CHARGES.room.reduce((a,i)=>a+i.amount,0)},
    {key:"fnb",label:"Food & Beverage",Icon:Utensils,color:C.green,items:FOLIO_CHARGES.fnb,sub:FOLIO_CHARGES.fnb.reduce((a,i)=>a+i.amount,0)},
    {key:"ancillary",label:"Ancillary Services",Icon:Sparkles,color:C.amber,items:FOLIO_CHARGES.ancillary,sub:FOLIO_CHARGES.ancillary.reduce((a,i)=>a+i.amount,0)},
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{backgroundColor:C.ivory}}>
      <PageHdr title="Guest Check-Out & Invoice" crumbs={["Front Desk","Check-Out"]}/>

      {/* Sub-nav */}
      <div className="px-8 pt-5 flex items-center gap-1">
        {[
          {id:"folio",label:"1. Folio Review"},
          {id:"payment",label:"2. Payment"},
          {id:"receipt",label:"3. Receipt"},
        ].map(tab=>(
          <button key={tab.id} onClick={()=>setView(tab.id as any)}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              backgroundColor:view===tab.id?C.gold:"transparent",
              color:view===tab.id?"#EFFFFE":C.gray,
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-8 pt-4">
        {view==="folio"&&(
          <div className="grid grid-cols-3 gap-6">
            {/* Folio items */}
            <div className="col-span-2 space-y-4">
              {/* Guest header */}
              <div className="rounded-xl p-5 flex items-center justify-between shadow-sm" style={{backgroundColor:C.white}}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base" style={{backgroundColor:C.brown}}>AB</div>
                  <div>
                    <div className="font-bold text-base" style={{color:C.charcoal}}>Mrs. Aisha Bello</div>
                    <div className="text-sm" style={{color:C.gray}}>Room 203 · Deluxe Double · BKG-0790</div>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status="checking-out"/>
                  <div className="text-xs mt-1.5" style={{color:C.gray}}>Dec 11 → Dec 15, 2024 · 4 nights</div>
                </div>
              </div>

              {categories.map(cat=>(
                <div key={cat.key} className="rounded-xl shadow-sm overflow-hidden" style={{backgroundColor:C.white}}>
                  <div className="px-5 py-3 flex items-center justify-between border-b"
                    style={{borderColor:"rgba(78,52,46,0.06)",backgroundColor:C.ivory}}>
                    <div className="flex items-center gap-2">
                      <cat.Icon className="w-4 h-4" style={{color:cat.color}}/>
                      <span className="font-semibold text-sm" style={{color:C.charcoal}}>{cat.label}</span>
                    </div>
                    <span className="font-bold text-sm" style={{color:C.charcoal}}>{fmt(cat.sub)}</span>
                  </div>
                  <div className="divide-y" style={{borderColor:"rgba(78,52,46,0.05)"}}>
                    {cat.items.map((item,i)=>(
                      <div key={item.id} className="px-5 py-3 flex justify-between items-center text-sm"
                        style={{backgroundColor:i%2===1?"rgba(214,197,164,0.08)":"transparent"}}>
                        <span style={{color:C.charcoal}}>{item.desc}</span>
                        <span className="font-semibold" style={{color:C.charcoal}}>{fmt(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals panel */}
            <div className="space-y-4">
              <div className="rounded-xl p-5 shadow-sm" style={{backgroundColor:C.white}}>
                <h3 className="font-semibold mb-4" style={{color:C.charcoal}}>Folio Summary</h3>
                <div className="space-y-2.5 text-sm">
                  {categories.map(c=>(
                    <div key={c.key} className="flex justify-between">
                      <span style={{color:C.gray}}>{c.label}</span>
                      <span className="font-medium" style={{color:C.charcoal}}>{fmt(c.sub)}</span>
                    </div>
                  ))}
                  <div className="h-px my-1" style={{backgroundColor:"rgba(78,52,46,0.08)"}}/>
                  <div className="flex justify-between">
                    <span style={{color:C.gray}}>Subtotal</span>
                    <span className="font-semibold" style={{color:C.charcoal}}>{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{color:C.gray}}>Service Charge (5%)</span>
                    <span className="font-medium" style={{color:C.charcoal}}>{fmt(svcCharge)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{color:C.gray}}>VAT (7.5%)</span>
                    <span className="font-medium" style={{color:C.charcoal}}>{fmt(vat)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{color:C.gray}}>Tourism Levy</span>
                    <span className="font-medium" style={{color:C.charcoal}}>{fmt(levy)}</span>
                  </div>
                  <div className="h-px my-1" style={{backgroundColor:"rgba(78,52,46,0.08)"}}/>
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-bold text-base" style={{color:C.charcoal}}>Grand Total</span>
                    <span className="font-bold text-xl" style={{color:C.gold}}>{fmt(total)}</span>
                  </div>
                </div>
                <button onClick={()=>setView("payment")}
                  className="w-full mt-5 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90"
                  style={{backgroundColor:C.gold,color:"#EFFFFE"}}>
                  Proceed to Payment <ChevronRight className="w-4 h-4"/>
                </button>
              </div>
              <div className="rounded-xl p-4 shadow-sm" style={{backgroundColor:C.white}}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4" style={{color:C.amber}}/>
                  <span className="text-sm font-semibold" style={{color:C.charcoal}}>Outstanding</span>
                </div>
                <div className="text-xs space-y-1" style={{color:C.gray}}>
                  <div>• Security deposit: ₦50,000 (to be released)</div>
                  <div>• Minibar final check in progress</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view==="payment"&&(
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="rounded-xl p-5 shadow-sm flex items-center justify-between" style={{backgroundColor:C.white}}>
              <div>
                <div className="font-semibold text-base" style={{color:C.charcoal}}>Mrs. Aisha Bello — Room 203</div>
                <div className="text-sm" style={{color:C.gray}}>4 nights · Dec 11–15, 2024</div>
              </div>
              <div className="text-right">
                <div className="text-xs" style={{color:C.gray}}>TOTAL DUE</div>
                <div className="text-2xl font-bold" style={{color:C.gold}}>{fmt(total)}</div>
              </div>
            </div>

            <div className="rounded-xl p-5 shadow-sm" style={{backgroundColor:C.white}}>
              <h3 className="font-semibold mb-4" style={{color:C.charcoal}}>Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {id:"card",label:"Credit / Debit Card",sub:"Visa, Mastercard, Verve",Icon:CreditCard},
                  {id:"cash",label:"Cash Payment",sub:"Counter cash — agent verified",Icon:Banknote},
                  {id:"corporate",label:"Corporate Account",sub:"Invoiced to company",Icon:Building2},
                  {id:"wallet",label:"Mobile Wallet",sub:"OPay, PalmPay, Flutterwave",Icon:Wallet},
                ].map(m=>(
                  <button key={m.id} onClick={()=>setPayment(m.id)}
                    className="p-4 rounded-xl border-2 text-left transition-all hover:border-amber-500"
                    style={{
                      borderColor:payment===m.id?C.gold:"rgba(78,52,46,0.12)",
                      backgroundColor:payment===m.id?"#FFF8E1":"transparent",
                    }}>
                    <div className="flex items-center gap-3 mb-1">
                      <m.Icon className="w-5 h-5" style={{color:payment===m.id?C.gold:C.gray}}/>
                      <span className="font-semibold text-sm" style={{color:C.charcoal}}>{m.label}</span>
                    </div>
                    <div className="text-xs pl-8" style={{color:C.gray}}>{m.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {payment==="card"&&(
              <div className="rounded-xl p-5 shadow-sm" style={{backgroundColor:C.white}}>
                <h3 className="font-semibold mb-4" style={{color:C.charcoal}}>Card Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{color:C.gray}}>Card Number</label>
                    <div className="w-full px-4 py-3 rounded-lg border text-sm font-mono" style={{borderColor:"rgba(78,52,46,0.15)",backgroundColor:C.ivory,color:C.charcoal}}>
                      •••• •••• •••• 4812
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{color:C.gray}}>Expiry</label>
                      <div className="w-full px-4 py-3 rounded-lg border text-sm font-mono" style={{borderColor:"rgba(78,52,46,0.15)",backgroundColor:C.ivory,color:C.charcoal}}>09/27</div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{color:C.gray}}>CVV</label>
                      <div className="w-full px-4 py-3 rounded-lg border text-sm font-mono" style={{borderColor:"rgba(78,52,46,0.15)",backgroundColor:C.ivory,color:C.charcoal}}>•••</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button onClick={()=>setView("receipt")}
              className="w-full py-3.5 rounded-xl text-base font-bold flex items-center justify-center gap-2 hover:opacity-90"
              style={{backgroundColor:C.gold,color:"#EFFFFE"}}>
              Charge {fmt(total)} <ChevronRight className="w-5 h-5"/>
            </button>
          </div>
        )}

        {view==="receipt"&&(
          <div className="max-w-xl mx-auto">
            <div className="rounded-xl p-8 text-center mb-5 shadow-sm" style={{backgroundColor:C.white}}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor:"#E8F5E9"}}>
                <CheckCircle className="w-8 h-8" style={{color:C.green}}/>
              </div>
              <h2 className="text-2xl font-bold mb-1" style={{color:C.charcoal}}>Payment Received</h2>
              <p className="text-sm" style={{color:C.gray}}>Check-out complete · Room 203 released</p>
              <div className="mt-4 text-3xl font-bold" style={{color:C.gold}}>{fmt(total)}</div>
              <div className="text-xs mt-1" style={{color:C.gray}}>via {payment==="card"?"Credit Card ••••4812":payment==="cash"?"Cash Payment":payment==="corporate"?"Corporate Account":"Mobile Wallet"}</div>
            </div>
            <div className="rounded-xl shadow-sm overflow-hidden mb-5" style={{backgroundColor:C.white}}>
              <div className="px-6 py-4" style={{backgroundColor:C.brown}}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white font-bold tracking-widest">ARYHILLS</div>
                    <div className="text-xs" style={{color:C.beige}}>Hotel & Tower · Imo, Ilesa, Osun State</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs" style={{color:"rgba(214,197,164,0.7)"}}>TAX INVOICE</div>
                    <div className="font-mono text-sm text-white">INV-20241215-0203</div>
                  </div>
                </div>
              </div>
              <div className="p-5 text-sm space-y-3">
                <div className="flex justify-between"><span style={{color:C.gray}}>Guest</span><span className="font-semibold" style={{color:C.charcoal}}>Mrs. Aisha Bello</span></div>
                <div className="flex justify-between"><span style={{color:C.gray}}>Room</span><span className="font-semibold" style={{color:C.charcoal}}>203 · Deluxe Double</span></div>
                <div className="flex justify-between"><span style={{color:C.gray}}>Stay</span><span className="font-semibold" style={{color:C.charcoal}}>Dec 11–15, 2024 · 4 nights</span></div>
                <div className="h-px" style={{backgroundColor:"rgba(78,52,46,0.08)"}}/>
                {[
                  {l:"Room Charges",v:fmt(352500)},
                  {l:"Food & Beverage",v:fmt(82000)},
                  {l:"Ancillary Services",v:fmt(58500)},
                  {l:"Service Charge (5%)",v:fmt(svcCharge)},
                  {l:"VAT (7.5%)",v:fmt(vat)},
                  {l:"Tourism Levy",v:fmt(levy)},
                ].map(r=>(
                  <div key={r.l} className="flex justify-between">
                    <span style={{color:C.gray}}>{r.l}</span>
                    <span className="font-medium" style={{color:C.charcoal}}>{r.v}</span>
                  </div>
                ))}
                <div className="h-px" style={{backgroundColor:"rgba(78,52,46,0.08)"}}/>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base" style={{color:C.charcoal}}>Total Paid</span>
                  <span className="font-bold text-xl" style={{color:C.gold}}>{fmt(total)}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <button className="py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90"
                style={{backgroundColor:C.gold,color:"#EFFFFE"}}><Printer className="w-4 h-4"/>Print</button>
              <button className="py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border"
                style={{borderColor:C.beige,color:C.charcoal}}><Send className="w-4 h-4"/>Email</button>
              <button className="py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 border"
                style={{borderColor:C.beige,color:C.charcoal}}><Download className="w-4 h-4"/>PDF</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── B2-03 Room Status Board ───────────────────────────────────────────────────
const STATUS_COLOR: Record<RoomStatus,{bg:string;text:string;border:string;dot:string}> = {
  available:      {bg:"#E8F5E9",text:"#2E7D32",border:"#A5D6A7",dot:"#2E7D32"},
  occupied:       {bg:"#FFF8E1",text:"#B8860B",border:"#FFD54F",dot:"#B8860B"},
  "checking-out": {bg:"#FFF3E0",text:"#F4A300",border:"#FFCC02",dot:"#F4A300"},
  cleaning:       {bg:"#FFF9E6",text:"#B8860B",border:"#FFD54F",dot:"#F4A300"},
  "out-of-order": {bg:"#FFEBEE",text:"#D32F2F",border:"#EF9A9A",dot:"#D32F2F"},
  reserved:       {bg:"#F5EFE6",text:"#4E342E",border:"#D6C5A4",dot:"#D6C5A4"},
};

function B203() {
  const [selected, setSelected] = useState<Room|null>(null);
  const [roomFilter, setRoomFilter] = useState<"all"|"available"|"occupied">("all");
  const floors = [1,2,3,4,5];
  const statusCounts = ROOMS.reduce((acc,r)=>({...acc,[r.status]:(acc[r.status]||0)+1}),{} as Record<string,number>);

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{backgroundColor:C.ivory}}>
      <PageHdr title="Room Status Board" crumbs={["Front Desk","Room Status"]} action={{label:"Refresh",Icon:RefreshCw}}/>

      {/* Filter tabs */}
      <div className="px-8 pt-3 flex items-center gap-2 border-b" style={{borderColor:"rgba(78,52,46,0.08)",backgroundColor:"white"}}>
        {([["all","All Rooms"],["available","Available"],["occupied","Occupied"]] as const).map(([val,lbl])=>(
          <button key={val} onClick={()=>setRoomFilter(val)}
            className="px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 -mb-px transition-colors"
            style={{
              color:roomFilter===val?C.gold:C.gray,
              borderColor:roomFilter===val?C.gold:"transparent",
              backgroundColor:"transparent",
            }}>
            {lbl}
            {val==="available" && <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
              style={{backgroundColor:"#E8F5E9",color:"#2E7D32"}}>{statusCounts["available"]||0}</span>}
            {val==="occupied" && <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
              style={{backgroundColor:"#FFF8E1",color:"#B8860B"}}>{statusCounts["occupied"]||0}</span>}
          </button>
        ))}
        <div className="ml-auto pb-2 flex items-center gap-4 flex-wrap">
          {Object.entries(STATUS_COLOR).map(([status,cfg])=>(
            <div key={status} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{backgroundColor:cfg.dot}}/>
              <span className="text-xs font-medium capitalize" style={{color:C.gray}}>
                {status.replace("-"," ")} ({statusCounts[status]||0})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {floors.map(floor=>{
            const floorRooms = ROOMS.filter(r=>r.floor===floor&&(roomFilter==="all"||r.status===roomFilter));
            if(!floorRooms.length) return null;
            const floorLabel = floor<=3?"Floor "+floor:floor===4?"Suites (Floor 4)":"Penthouse Suites";
            return (
              <div key={floor} className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-sm font-bold" style={{color:C.charcoal}}>{floorLabel}</div>
                  <div className="flex-1 h-px" style={{backgroundColor:"rgba(78,52,46,0.1)"}}/>
                  <div className="text-xs" style={{color:C.gray}}>{floorRooms.length} rooms</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {floorRooms.map(room=>{
                    const cfg = STATUS_COLOR[room.status];
                    const sel = selected?.id===room.id;
                    return (
                      <button key={room.id} onClick={()=>setSelected(sel?null:room)}
                        className="rounded-xl p-3 text-left transition-all hover:scale-105 relative"
                        style={{
                          width:"100px",
                          backgroundColor:cfg.bg,
                          border:`2px solid ${sel?C.gold:cfg.border}`,
                          boxShadow:sel?"0 4px 12px rgba(184,134,11,0.3)":"0 1px 3px rgba(0,0,0,0.06)",
                          transform:sel?"scale(1.05)":"",
                        }}>
                        <div className="font-bold text-lg leading-none mb-1" style={{color:cfg.text}}>{room.id}</div>
                        <div className="text-xs font-medium" style={{color:cfg.text,opacity:0.75}}>{room.type}</div>
                        <div className="text-xs mt-1" style={{color:cfg.text,opacity:0.6}}>{room.view}</div>
                        {room.guest&&(
                          <div className="text-xs mt-1.5 truncate font-medium" style={{color:cfg.text,opacity:0.75}}>
                            {room.guest.name.split(" ").slice(-1)[0]}
                          </div>
                        )}
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{backgroundColor:cfg.dot}}/>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {selected?(
          <div className="w-80 flex-shrink-0 border-l flex flex-col" style={{borderColor:"rgba(78,52,46,0.1)",backgroundColor:C.white}}>
            <div className="p-5 border-b flex items-center justify-between" style={{borderColor:"rgba(78,52,46,0.08)"}}>
              <div>
                <div className="text-xl font-bold" style={{color:C.charcoal}}>Room {selected.id}</div>
                <div className="text-sm" style={{color:C.gray}}>{selected.type} · {selected.view}</div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={selected.status}/>
                <button onClick={()=>setSelected(null)} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{backgroundColor:C.ivory}}>
                  <X className="w-4 h-4" style={{color:C.gray}}/>
                </button>
              </div>
            </div>

            {selected.guest?(
              <div className="p-5 flex-1 overflow-y-auto">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{backgroundColor:C.brown}}>
                    {selected.guest.name.split(" ").map(n=>n[0]).slice(1,3).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{color:C.charcoal}}>{selected.guest.name}</div>
                    <div className="text-xs" style={{color:C.gray}}>{selected.guest.reservation}</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between">
                    <span style={{color:C.gray}}>Check-In</span>
                    <span className="font-medium" style={{color:C.charcoal}}>{selected.guest.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{color:C.gray}}>Check-Out</span>
                    <span className="font-medium" style={{color:C.charcoal}}>{selected.guest.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{color:C.gray}}>Stay</span>
                    <span className="font-medium" style={{color:C.charcoal}}>{selected.guest.nights} nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{color:C.gray}}>Floor</span>
                    <span className="font-medium" style={{color:C.charcoal}}>Floor {selected.floor}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90"
                    style={{backgroundColor:C.gold,color:"#EFFFFE"}}>
                    <PhoneCall className="w-4 h-4"/>Call Room
                  </button>
                  {selected.status==="checking-out"&&(
                    <button className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90"
                      style={{backgroundColor:C.green,color:"#EFFFFE"}}>
                      <Receipt className="w-4 h-4"/>Process Check-Out
                    </button>
                  )}
                  <button className="w-full py-2.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-2"
                    style={{borderColor:C.beige,color:C.charcoal}}>
                    <ClipboardList className="w-4 h-4"/>View Full Folio
                  </button>
                  <button className="w-full py-2.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-2"
                    style={{borderColor:C.beige,color:C.charcoal}}>
                    <MessageSquare className="w-4 h-4"/>Send Message
                  </button>
                  <button className="w-full py-2.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-2"
                    style={{borderColor:"rgba(211,47,47,0.3)",color:C.red}}>
                    <AlertCircle className="w-4 h-4"/>Flag for Housekeeping
                  </button>
                </div>
              </div>
            ):(
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{backgroundColor:C.ivory}}>
                    <BedDouble className="w-6 h-6" style={{color:C.gray}}/>
                  </div>
                  <p className="text-sm font-semibold mb-1" style={{color:C.charcoal}}>
                    {selected.status==="available"?"Room Available":"No Guest Assigned"}
                  </p>
                  <p className="text-xs" style={{color:C.gray}}>
                    {selected.status==="cleaning"?"Housekeeping in progress":selected.status==="out-of-order"?"Under maintenance — contact Engineering":selected.status==="reserved"?"Arrival expected today":"Ready for walk-in or reservation"}
                  </p>
                </div>
                <div className="space-y-2 mt-auto">
                  {selected.status==="available"&&(
                    <button className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90"
                      style={{backgroundColor:C.gold,color:"#EFFFFE"}}>
                      <Plus className="w-4 h-4"/>Assign Guest
                    </button>
                  )}
                  <button className="w-full py-2.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-2"
                    style={{borderColor:C.beige,color:C.charcoal}}>
                    <Pencil className="w-4 h-4"/>Update Status
                  </button>
                </div>
              </div>
            )}
          </div>
        ):(
          <div className="w-80 flex-shrink-0 border-l flex items-center justify-center" style={{borderColor:"rgba(78,52,46,0.1)",backgroundColor:C.white}}>
            <div className="text-center p-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor:C.ivory}}>
                <BedDouble className="w-6 h-6" style={{color:C.beige}}/>
              </div>
              <p className="text-sm font-semibold mb-1" style={{color:C.charcoal}}>No Room Selected</p>
              <p className="text-xs" style={{color:C.gray}}>Click any room card to view details and quick actions</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── B2-04 Invoice / Folio Detail ─────────────────────────────────────────────
function B204() {
  const [showAddCharge, setShowAddCharge] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [charges, setCharges] = useState({...FOLIO_CHARGES});
  const [discount, setDiscount] = useState(0);
  const [newCharge, setNewCharge] = useState({desc:"",cat:"fnb",amount:""});

  const allAmounts = [...charges.room,...charges.fnb,...charges.ancillary].map(i=>i.amount);
  const subtotal = allAmounts.reduce((a,b)=>a+b,0);
  const svc = Math.round(subtotal*0.05);
  const vat = Math.round((subtotal+svc)*0.075);
  const levy = 5000;
  const gross = subtotal+svc+vat+levy;
  const discAmt = Math.round(gross*(discount/100));
  const total = gross-discAmt;

  const cats = [
    {key:"room" as const,label:"Room Charges",Icon:BedDouble,color:C.gold},
    {key:"fnb" as const,label:"Food & Beverage",Icon:Utensils,color:C.green},
    {key:"ancillary" as const,label:"Ancillary Services",Icon:Sparkles,color:C.amber},
  ];

  function addCharge() {
    const cat = newCharge.cat as "room"|"fnb"|"ancillary";
    const amt = parseInt(newCharge.amount)||0;
    if(!newCharge.desc||!amt) return;
    const id = "new-"+Date.now();
    setCharges(prev=>({...prev,[cat]:[...prev[cat],{id,desc:newCharge.desc,amount:amt}]}));
    setNewCharge({desc:"",cat:"fnb",amount:""});
    setShowAddCharge(false);
  }

  function removeCharge(cat:"room"|"fnb"|"ancillary",id:string) {
    setCharges(prev=>({...prev,[cat]:prev[cat].filter(i=>i.id!==id)}));
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{backgroundColor:C.ivory}}>
      <PageHdr title="Invoice / Folio Detail" crumbs={["Front Desk","Invoices","BKG-0790"]}
        action={{label:"Add Charge",Icon:Plus,onClick:()=>setShowAddCharge(true)}}/>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Main folio */}
          <div className="col-span-2 space-y-5">
            {/* Guest header */}
            <div className="rounded-xl p-5 shadow-sm flex items-center justify-between" style={{backgroundColor:C.white}}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base" style={{backgroundColor:C.brown}}>AB</div>
                <div>
                  <div className="font-bold" style={{color:C.charcoal}}>Mrs. Aisha Bello</div>
                  <div className="text-sm" style={{color:C.gray}}>Room 203 · Deluxe Double · BKG-0790</div>
                  <div className="text-xs mt-0.5" style={{color:C.gray}}>Dec 11–15, 2024 · 4 nights</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=>setShowDiscount(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border"
                  style={{borderColor:C.beige,color:C.charcoal}}>
                  <Tag className="w-3.5 h-3.5"/>Apply Discount
                </button>
                <StatusBadge status="checking-out"/>
              </div>
            </div>

            {/* Charge categories */}
            {cats.map(cat=>{
              const items = charges[cat.key];
              const sub = items.reduce((a,i)=>a+i.amount,0);
              return (
                <div key={cat.key} className="rounded-xl shadow-sm overflow-hidden" style={{backgroundColor:C.white}}>
                  <div className="px-5 py-3 flex items-center justify-between" style={{backgroundColor:C.ivory}}>
                    <div className="flex items-center gap-2">
                      <cat.Icon className="w-4 h-4" style={{color:cat.color}}/>
                      <span className="font-semibold text-sm" style={{color:C.charcoal}}>{cat.label}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{backgroundColor:"rgba(78,52,46,0.08)",color:C.gray}}>{items.length} items</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm" style={{color:C.charcoal}}>{fmt(sub)}</span>
                      <button onClick={()=>setShowAddCharge(true)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:opacity-80"
                        style={{backgroundColor:"#FFF8E1",color:C.gold}}>
                        <Plus className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                  </div>
                  <div>
                    {items.map((item,i)=>(
                      <div key={item.id} className="px-5 py-3 flex justify-between items-center text-sm group"
                        style={{backgroundColor:i%2===1?"rgba(214,197,164,0.07)":"transparent"}}>
                        <span style={{color:C.charcoal}}>{item.desc}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold" style={{color:C.charcoal}}>{fmt(item.amount)}</span>
                          <button onClick={()=>removeCharge(cat.key,item.id)}
                            className="w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{backgroundColor:"#FFEBEE",color:C.red}}>
                            <X className="w-3 h-3"/>
                          </button>
                        </div>
                      </div>
                    ))}
                    {items.length===0&&(
                      <div className="px-5 py-6 text-center text-sm" style={{color:C.gray}}>
                        No charges in this category
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Taxes */}
            <div className="rounded-xl shadow-sm overflow-hidden" style={{backgroundColor:C.white}}>
              <div className="px-5 py-3 flex items-center gap-2" style={{backgroundColor:C.ivory}}>
                <FileText className="w-4 h-4" style={{color:C.gray}}/>
                <span className="font-semibold text-sm" style={{color:C.charcoal}}>Taxes & Government Fees</span>
              </div>
              {[
                {desc:"Service Charge (5% on subtotal)",amount:svc},
                {desc:`VAT — 7.5% (on subtotal + service charge)`,amount:vat},
                {desc:"Nigeria Tourism Levy",amount:levy},
              ].map((item,i)=>(
                <div key={item.desc} className="px-5 py-3 flex justify-between items-center text-sm"
                  style={{backgroundColor:i%2===1?"rgba(214,197,164,0.07)":"transparent"}}>
                  <span style={{color:C.charcoal}}>{item.desc}</span>
                  <span className="font-semibold" style={{color:C.charcoal}}>{fmt(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Running total */}
          <div className="space-y-4">
            <div className="rounded-xl p-5 shadow-sm" style={{backgroundColor:C.white}}>
              <h3 className="font-semibold mb-4" style={{color:C.charcoal}}>Running Total</h3>
              <div className="space-y-2.5 text-sm">
                {cats.map(c=>{
                  const s=charges[c.key].reduce((a,i)=>a+i.amount,0);
                  return (
                    <div key={c.key} className="flex justify-between">
                      <span style={{color:C.gray}}>{c.label}</span>
                      <span className="font-medium" style={{color:C.charcoal}}>{fmt(s)}</span>
                    </div>
                  );
                })}
                <div className="h-px my-1" style={{backgroundColor:"rgba(78,52,46,0.08)"}}/>
                <div className="flex justify-between">
                  <span style={{color:C.gray}}>Subtotal</span>
                  <span className="font-semibold" style={{color:C.charcoal}}>{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{color:C.gray}}>Service + VAT + Levy</span>
                  <span className="font-medium" style={{color:C.charcoal}}>{fmt(svc+vat+levy)}</span>
                </div>
                {discount>0&&(
                  <div className="flex justify-between" style={{color:C.green}}>
                    <span>Discount ({discount}%)</span>
                    <span className="font-semibold">-{fmt(discAmt)}</span>
                  </div>
                )}
                <div className="h-px my-1" style={{backgroundColor:"rgba(78,52,46,0.08)"}}/>
                <div className="flex justify-between items-center pt-1">
                  <span className="font-bold text-base" style={{color:C.charcoal}}>Total Due</span>
                  <span className="font-bold text-xl" style={{color:C.gold}}>{fmt(total)}</span>
                </div>
              </div>

              {discount>0&&(
                <div className="mt-3 flex items-center justify-between p-2.5 rounded-lg text-xs"
                  style={{backgroundColor:"#E8F5E9",color:C.green}}>
                  <span>Discount applied: {discount}%</span>
                  <button onClick={()=>setDiscount(0)} className="underline">Remove</button>
                </div>
              )}

              <div className="mt-5 space-y-2">
                <button className="w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90"
                  style={{backgroundColor:C.gold,color:"#EFFFFE"}}>
                  Finalise &amp; Check Out
                </button>
                <button onClick={()=>setShowDiscount(true)}
                  className="w-full py-2.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-2"
                  style={{borderColor:C.beige,color:C.charcoal}}>
                  <Tag className="w-4 h-4"/>Apply Discount
                </button>
                <button className="w-full py-2.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-2"
                  style={{borderColor:C.beige,color:C.charcoal}}>
                  <Printer className="w-4 h-4"/>Print Interim Bill
                </button>
              </div>
            </div>

            <div className="rounded-xl p-4 shadow-sm text-xs space-y-1.5" style={{backgroundColor:C.white,color:C.gray}}>
              <div className="font-semibold text-sm mb-2" style={{color:C.charcoal}}>Folio Notes</div>
              <div>• Security deposit ₦50,000 held</div>
              <div>• Pre-paid via corporate account</div>
              <div>• Minibar audit pending</div>
              <div>• Late check-out fee may apply</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Charge Modal */}
      {showAddCharge&&(
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{backgroundColor:"rgba(0,0,0,0.4)"}}>
          <div className="rounded-2xl p-6 w-96 shadow-2xl" style={{backgroundColor:C.white}}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold" style={{color:C.charcoal}}>Add Charge</h3>
              <button onClick={()=>setShowAddCharge(false)}>
                <X className="w-5 h-5" style={{color:C.gray}}/>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{color:C.gray}}>Description</label>
                <input value={newCharge.desc} onChange={e=>setNewCharge(p=>({...p,desc:e.target.value}))}
                  placeholder="e.g. Room Service — Lunch"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{borderColor:"rgba(78,52,46,0.15)",backgroundColor:C.ivory}}/>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{color:C.gray}}>Category</label>
                <select value={newCharge.cat} onChange={e=>setNewCharge(p=>({...p,cat:e.target.value}))}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{borderColor:"rgba(78,52,46,0.15)",backgroundColor:C.ivory}}>
                  <option value="room">Room Charges</option>
                  <option value="fnb">Food &amp; Beverage</option>
                  <option value="ancillary">Ancillary Services</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{color:C.gray}}>Amount (₦)</label>
                <input type="number" value={newCharge.amount} onChange={e=>setNewCharge(p=>({...p,amount:e.target.value}))}
                  placeholder="0"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none font-mono"
                  style={{borderColor:"rgba(78,52,46,0.15)",backgroundColor:C.ivory}}/>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={()=>setShowAddCharge(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium border"
                style={{borderColor:C.beige,color:C.gray}}>Cancel</button>
              <button onClick={addCharge}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90"
                style={{backgroundColor:C.gold,color:"#EFFFFE"}}>Add Charge</button>
            </div>
          </div>
        </div>
      )}

      {/* Discount Modal */}
      {showDiscount&&(
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{backgroundColor:"rgba(0,0,0,0.4)"}}>
          <div className="rounded-2xl p-6 w-80 shadow-2xl" style={{backgroundColor:C.white}}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold" style={{color:C.charcoal}}>Apply Discount</h3>
              <button onClick={()=>setShowDiscount(false)}><X className="w-5 h-5" style={{color:C.gray}}/></button>
            </div>
            <div className="space-y-3 mb-5">
              {[5,10,15,20].map(pct=>(
                <button key={pct} onClick={()=>setDiscount(pct)}
                  className="w-full flex justify-between items-center p-3 rounded-lg border transition-all"
                  style={{
                    borderColor:discount===pct?C.gold:"rgba(78,52,46,0.12)",
                    backgroundColor:discount===pct?"#FFF8E1":C.ivory,
                  }}>
                  <span className="text-sm font-semibold" style={{color:C.charcoal}}>{pct}% discount</span>
                  <span className="text-sm font-bold" style={{color:C.gold}}>-{fmt(Math.round(total*(pct/100)))}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={()=>{setDiscount(0);setShowDiscount(false);}}
                className="flex-1 py-2.5 rounded-lg text-sm border" style={{borderColor:C.beige,color:C.gray}}>Cancel</button>
              <button onClick={()=>setShowDiscount(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90"
                style={{backgroundColor:C.gold,color:"#EFFFFE"}}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── B2-05 Live Guest Requests ─────────────────────────────────────────────────
const REQ_ICONS: Record<ReqType,any> = {
  "room-service": Utensils,
  maintenance: Wrench,
  housekeeping: Sparkles,
  concierge: MapPin,
  "front-desk": ClipboardList,
};

const REQ_LABEL: Record<ReqType,string> = {
  "room-service":"Room Service",
  maintenance:"Maintenance",
  housekeeping:"Housekeeping",
  concierge:"Concierge",
  "front-desk":"Front Desk",
};

function B205() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS.map(r=>({...r,countdownSecs:r.countdownSecs??undefined})));
  const [filter, setFilter] = useState<"all"|Priority>("all");
  const [tick, setTick] = useState(0);
  const tickRef = useRef(0);

  useEffect(()=>{
    const iv = setInterval(()=>{
      tickRef.current += 1;
      setTick(t=>t+1);
      setRequests(prev=>prev.map(r=>{
        if(r.countdownSecs!==undefined&&r.countdownSecs>0) return {...r,countdownSecs:r.countdownSecs-1};
        return r;
      }));
    },1000);
    return ()=>clearInterval(iv);
  },[]);

  function fmtCountdown(s:number) {
    const m=Math.floor(s/60), sec=s%60;
    return `${m}:${sec.toString().padStart(2,"0")}`;
  }
  function fmtAgo(mins:number) {
    if(mins<60) return mins+" min ago";
    return Math.floor(mins/60)+"h "+((mins%60)||"")+" min ago";
  }

  function ack(id:string) {
    setRequests(prev=>prev.map(r=>r.id===id?{...r,status:"acknowledged"}:r));
  }
  function resolve(id:string) {
    setRequests(prev=>prev.map(r=>r.id===id?{...r,status:"resolved"}:r));
  }

  const filtered = requests.filter(r=>filter==="all"?r.status!=="resolved":r.priority===filter&&r.status!=="resolved");
  const urgentCount = requests.filter(r=>r.priority==="urgent"&&r.status!=="resolved").length;

  // Occupancy stats for left panel (decorative)
  const stats = [
    {label:"Occupied",value:"28",trend:"up",sub:"72% occ rate"},
    {label:"Arrivals Today",value:"12",trend:"up",sub:"4 checked in"},
    {label:"Departures",value:"9",trend:"down",sub:"6 remaining"},
    {label:"Requests Open",value:String(requests.filter(r=>r.status!=="resolved").length),trend:"neutral",sub:`${urgentCount} urgent`},
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{backgroundColor:C.ivory}}>
      <PageHdr title="Front Office Dashboard" crumbs={["Front Desk","Dashboard"]} action={{label:"New Request",Icon:Plus}}/>

      <div className="flex-1 overflow-hidden flex">
        {/* Main dashboard area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map(s=>(
              <div key={s.label} className="rounded-xl p-4 shadow-sm" style={{backgroundColor:C.white}}>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-xs font-semibold uppercase tracking-wide" style={{color:C.gray}}>{s.label}</div>
                  {s.label==="Requests Open"&&urgentCount>0&&(
                    <span className="animate-pulse flex items-center gap-1 text-xs font-bold px-1.5 py-0.5 rounded-full"
                      style={{backgroundColor:"#FFEBEE",color:C.red}}>{urgentCount} urgent</span>
                  )}
                </div>
                <div className="text-3xl font-bold" style={{color:s.label==="Requests Open"&&urgentCount>0?C.red:C.charcoal}}>{s.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {s.trend==="up"&&<TrendingUp className="w-3 h-3" style={{color:C.green}}/>}
                  {s.trend==="down"&&<TrendingDown className="w-3 h-3" style={{color:C.amber}}/>}
                  <span className="text-xs" style={{color:C.gray}}>{s.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Arrivals timeline */}
          <div className="rounded-xl p-5 shadow-sm" style={{backgroundColor:C.white}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{color:C.charcoal}}>Today's Arrivals</h3>
              <span className="text-xs" style={{color:C.gray}}>Dec 15, 2024</span>
            </div>
            <div className="space-y-2">
              {[
                {time:"14:00",name:"Mr. Adebayo Mensah",room:"204",type:"Deluxe",status:"checked-in"},
                {time:"15:30",name:"Dr. Emeka Obiora",room:"205",type:"Deluxe",status:"pending"},
                {time:"16:00",name:"Mrs. Folake Williams",room:"309",type:"Superior",status:"pending"},
                {time:"18:00",name:"Mr. Tobi Lawson",room:"403",type:"Suite",status:"pending"},
                {time:"20:00",name:"Ms. Chisom Okeke",room:"102",type:"Standard",status:"pending"},
              ].map((a,i)=>(
                <div key={i} className="flex items-center gap-4 py-2.5 px-3 rounded-lg text-sm"
                  style={{backgroundColor:i%2===1?"rgba(214,197,164,0.08)":"transparent"}}>
                  <div className="w-12 font-mono text-xs font-semibold" style={{color:C.gold}}>{a.time}</div>
                  <div className="flex-1 font-medium" style={{color:C.charcoal}}>{a.name}</div>
                  <div className="w-16 text-xs" style={{color:C.gray}}>Room {a.room}</div>
                  <div className="w-20 text-xs" style={{color:C.gray}}>{a.type}</div>
                  <StatusBadge status={a.status==="checked-in"?"available":"pending"} label={a.status==="checked-in"?"Checked In":"Arriving"}/>
                </div>
              ))}
            </div>
          </div>

          {/* Departures */}
          <div className="rounded-xl p-5 shadow-sm" style={{backgroundColor:C.white}}>
            <h3 className="font-semibold mb-4" style={{color:C.charcoal}}>Pending Check-Outs</h3>
            <div className="space-y-2">
              {[
                {name:"Mrs. Aisha Bello",room:"203",nights:4,balance:fmt(465530),status:"checking-out"},
                {name:"Mr. Samuel Obi",room:"304",nights:3,balance:fmt(298400),status:"checking-out"},
                {name:"Mr. James Carter",room:"201",nights:4,balance:"Settled",status:"available"},
              ].map((d,i)=>(
                <div key={i} className="flex items-center gap-4 py-2.5 px-3 rounded-lg text-sm"
                  style={{backgroundColor:i%2===1?"rgba(214,197,164,0.08)":"transparent"}}>
                  <div className="flex-1 font-medium" style={{color:C.charcoal}}>{d.name}</div>
                  <div className="w-16 text-xs" style={{color:C.gray}}>Room {d.room}</div>
                  <div className="w-24 text-xs font-semibold" style={{color:d.balance==="Settled"?C.green:C.charcoal}}>{d.balance}</div>
                  <StatusBadge status={d.status}/>
                  <button className="text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90"
                    style={{backgroundColor:C.gold,color:"#EFFFFE"}}>Check Out</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Live Requests Panel (320px) ════════════════════════════════════ */}
        <div className="w-80 flex-shrink-0 flex flex-col border-l" style={{borderColor:"rgba(78,52,46,0.1)",backgroundColor:C.white}}>
          {/* Panel header */}
          <div className="px-4 py-4 border-b" style={{borderColor:"rgba(78,52,46,0.08)"}}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor:C.red}}/>
                <span className="font-bold text-sm" style={{color:C.charcoal}}>Live Guest Requests</span>
              </div>
              <div className="flex items-center gap-1.5">
                {urgentCount>0&&(
                  <span className="animate-pulse text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{backgroundColor:"#FFEBEE",color:C.red}}>{urgentCount} urgent</span>
                )}
                <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{backgroundColor:C.ivory}}>
                  <RefreshCw className="w-3.5 h-3.5" style={{color:C.gray}}/>
                </button>
              </div>
            </div>
            {/* Filter tabs */}
            <div className="flex gap-1">
              {(["all","urgent","high","standard"] as const).map(f=>(
                <button key={f} onClick={()=>setFilter(f)}
                  className="flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                  style={{
                    backgroundColor:filter===f?(f==="urgent"?"#FFEBEE":f==="high"?"#FFF3E0":f==="standard"?"#F5F5F5":C.gold):"transparent",
                    color:filter===f?(f==="urgent"?C.red:f==="high"?C.amber:f==="standard"?C.gray:"#EFFFFE"):C.gray,
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Request cards */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filtered.length===0&&(
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{backgroundColor:C.ivory}}>
                  <CheckCircle className="w-6 h-6" style={{color:C.green}}/>
                </div>
                <p className="text-sm font-semibold" style={{color:C.charcoal}}>All clear!</p>
                <p className="text-xs mt-1" style={{color:C.gray}}>No open requests in this category</p>
              </div>
            )}

            {filtered.map(req=>{
              const RIcon = REQ_ICONS[req.type];
              const isUrgent = req.priority==="urgent";
              const isHigh = req.priority==="high";
              const borderColor = isUrgent?C.red:isHigh?C.amber:"rgba(78,52,46,0.1)";
              const headerBg = isUrgent?"#FFEBEE":isHigh?"#FFF3E0":"rgba(78,52,46,0.04)";

              return (
                <div key={req.id} className="rounded-xl overflow-hidden transition-all hover:shadow-md"
                  style={{
                    border:`1.5px solid ${borderColor}`,
                    boxShadow: isUrgent?"0 0 0 1px rgba(211,47,47,0.15)":"0 1px 3px rgba(0,0,0,0.06)",
                  }}>
                  {/* Card header */}
                  <div className="px-3 pt-3 pb-2" style={{backgroundColor:headerBg}}>
                    <div className="flex items-start justify-between mb-1.5">
                      <div>
                        <div className="font-bold text-base leading-none" style={{color:C.charcoal}}>Room {req.room}</div>
                        <div className="text-xs mt-0.5 font-medium" style={{color:C.gray}}>{req.guestName}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isUrgent?"animate-pulse":""}`}
                          style={{
                            backgroundColor:isUrgent?"#FFEBEE":isHigh?"#FFF3E0":"#F5F5F5",
                            color:isUrgent?C.red:isHigh?C.amber:C.gray,
                          }}>
                          {req.priority.toUpperCase()}
                        </span>
                        <StatusBadge status={req.status}/>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                        style={{backgroundColor:isUrgent?"rgba(211,47,47,0.15)":isHigh?"rgba(244,163,0,0.15)":"rgba(108,117,125,0.1)"}}>
                        <RIcon className="w-3 h-3" style={{color:isUrgent?C.red:isHigh?C.amber:C.gray}}/>
                      </div>
                      <span className="text-xs font-medium" style={{color:isUrgent?C.red:isHigh?C.amber:C.gray}}>{REQ_LABEL[req.type]}</span>
                      <div className="ml-auto flex items-center gap-1 text-xs" style={{color:C.gray}}>
                        <Clock className="w-3 h-3"/>
                        <span>{fmtAgo(req.minutesAgo)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px-3 py-2">
                    <p className="text-xs" style={{color:C.charcoal}}>{req.description}</p>

                    {/* Countdown for urgent */}
                    {isUrgent&&req.countdownSecs!==undefined&&req.countdownSecs>0&&(
                      <div className="mt-2 flex items-center gap-1.5 text-xs font-bold animate-pulse"
                        style={{color:C.red}}>
                        <AlertCircle className="w-3.5 h-3.5"/>
                        Respond within {fmtCountdown(req.countdownSecs)}
                      </div>
                    )}
                    {isUrgent&&req.countdownSecs!==undefined&&req.countdownSecs===0&&(
                      <div className="mt-2 flex items-center gap-1.5 text-xs font-bold"
                        style={{color:C.red}}>
                        <AlertCircle className="w-3.5 h-3.5"/>
                        RESPONSE OVERDUE — Escalate immediately
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="px-3 pb-3 grid grid-cols-2 gap-1.5">
                    {req.status==="pending"&&(
                      <button onClick={()=>ack(req.id)}
                        className="py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 col-span-2 hover:opacity-90"
                        style={{backgroundColor:isUrgent?C.red:isHigh?C.amber:C.gold,color:"white"}}>
                        <Check className="w-3 h-3"/>Acknowledge
                      </button>
                    )}
                    <button className="py-1.5 rounded-lg text-xs font-medium border flex items-center justify-center gap-1"
                      style={{borderColor:"rgba(78,52,46,0.12)",color:C.charcoal}}>
                      <PhoneCall className="w-3 h-3"/>Call Room
                    </button>
                    <button className="py-1.5 rounded-lg text-xs font-medium border flex items-center justify-center gap-1"
                      style={{borderColor:"rgba(78,52,46,0.12)",color:C.charcoal}}>
                      <Send className="w-3 h-3"/>Assign Dept
                    </button>
                    <button onClick={()=>resolve(req.id)}
                      className="py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 col-span-2"
                      style={{backgroundColor:"#E8F5E9",color:C.green}}>
                      <CheckCircle className="w-3 h-3"/>Mark Resolved
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panel footer */}
          <div className="p-3 border-t text-xs flex items-center justify-between"
            style={{borderColor:"rgba(78,52,46,0.08)",color:C.gray}}>
            <span>{requests.filter(r=>r.status!=="resolved").length} open · {requests.filter(r=>r.status==="resolved").length} resolved today</span>
            <button className="text-xs font-semibold" style={{color:C.gold}}>View All</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── B2-06 In-Room QR Card ─────────────────────────────────────────────────────
function B206() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{backgroundColor:C.ivory}}>
      <PageHdr title="QR Card Print Design" crumbs={["Front Desk","QR Print Card"]} action={{label:"Print Card",Icon:Printer}}/>
      <div className="flex-1 overflow-y-auto p-8 flex items-start justify-center gap-10">

        {/* Card mockup — flat design */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-xs font-semibold uppercase tracking-widest" style={{color:C.gray}}>A6 Print Preview</div>

          {/* Card */}
          <div className="relative"
            style={{
              width:"420px", height:"595px",
              boxShadow:"0 24px 64px rgba(78,52,46,0.18), 0 2px 8px rgba(78,52,46,0.1)",
              borderRadius:"12px",
              overflow:"hidden",
            }}>

            {/* Background */}
            <div className="absolute inset-0" style={{backgroundColor:C.white}}/>

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 h-3" style={{backgroundColor:C.gold}}/>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center px-10 pt-10 pb-8">

              {/* Hotel logo lockup */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3"
                  style={{backgroundColor:C.brown}}>
                  <Hotel className="w-7 h-7" style={{color:C.gold}}/>
                </div>
                <div className="font-bold text-2xl tracking-widest" style={{color:C.brown}}>ARYHILLS</div>
                <div className="text-xs tracking-widest mt-0.5 font-medium" style={{color:C.gold}}>HOTEL &amp; RESORTS</div>
                {/* Gold divider */}
                <div className="mt-4 w-16 h-px" style={{backgroundColor:C.gold}}/>
              </div>

              {/* QR code */}
              <div className="mb-6 p-4 rounded-xl" style={{backgroundColor:C.ivory,boxShadow:"inset 0 1px 3px rgba(78,52,46,0.08)"}}>
                <QRCode size={160} fg={C.brown}/>
              </div>

              {/* Tagline */}
              <div className="text-sm font-semibold text-center mb-1" style={{color:C.brown}}>
                Scan for all hotel services
              </div>
              <div className="text-xs text-center" style={{color:C.gray}}>
                Room service · Spa · Concierge · Express checkout
              </div>

              {/* Divider */}
              <div className="w-full my-6 flex items-center gap-3">
                <div className="flex-1 h-px" style={{backgroundColor:"rgba(78,52,46,0.12)"}}/>
                <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:C.gold}}/>
                <div className="flex-1 h-px" style={{backgroundColor:"rgba(78,52,46,0.12)"}}/>
              </div>

              {/* Guest info placeholders */}
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{color:C.gray}}>GUEST NAME</div>
                    <div className="text-base font-bold" style={{color:C.brown}}>Mr. Adebayo Mensah</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium mb-0.5" style={{color:C.gray}}>ROOM</div>
                    <div className="text-2xl font-bold" style={{color:C.gold}}>204</div>
                  </div>
                </div>
                <div className="flex justify-between text-xs pt-1 pb-1 border-t border-b"
                  style={{borderColor:"rgba(78,52,46,0.1)"}}>
                  <div>
                    <div style={{color:C.gray}}>CHECK-IN</div>
                    <div className="font-semibold mt-0.5" style={{color:C.charcoal}}>Dec 15, 2024</div>
                  </div>
                  <div className="text-right">
                    <div style={{color:C.gray}}>CHECK-OUT</div>
                    <div className="font-semibold mt-0.5" style={{color:C.charcoal}}>Dec 18, 2024</div>
                  </div>
                </div>
              </div>

              {/* WiFi details */}
              <div className="w-full mt-4 flex items-center gap-3 p-3 rounded-lg"
                style={{backgroundColor:C.ivory}}>
                <Wifi className="w-4 h-4 flex-shrink-0" style={{color:C.gold}}/>
                <div className="flex-1">
                  <div className="text-xs font-medium" style={{color:C.charcoal}}>Free WiFi</div>
                  <div className="text-xs" style={{color:C.gray}}>Network: Aryhills-Guest</div>
                </div>
                <div className="text-xs font-mono font-semibold" style={{color:C.charcoal}}>aryhills2024</div>
              </div>
            </div>

            {/* Bottom gold bar */}
            <div className="absolute bottom-0 left-0 right-0 h-3" style={{backgroundColor:C.gold}}/>
          </div>

          {/* Print actions */}
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90"
              style={{backgroundColor:C.gold,color:"#EFFFFE"}}>
              <Printer className="w-4 h-4"/>Print
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border"
              style={{borderColor:C.beige,color:C.charcoal}}>
              <Download className="w-4 h-4"/>Export PDF
            </button>
          </div>
        </div>

        {/* Settings panel */}
        <div className="w-64 space-y-4 pt-7">
          <div className="rounded-xl p-5 shadow-sm" style={{backgroundColor:C.white}}>
            <h3 className="font-semibold mb-4" style={{color:C.charcoal}}>Card Settings</h3>
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{color:C.gray}}>Guest Name</label>
                <div className="w-full px-3 py-2 rounded-lg border text-sm" style={{borderColor:"rgba(78,52,46,0.15)",backgroundColor:C.ivory,color:C.charcoal}}>Mr. Adebayo Mensah</div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{color:C.gray}}>Room Number</label>
                <div className="w-full px-3 py-2 rounded-lg border text-sm font-mono" style={{borderColor:"rgba(78,52,46,0.15)",backgroundColor:C.ivory,color:C.charcoal}}>204</div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1.5" style={{color:C.gray}}>Print Copies</label>
                <div className="flex items-center gap-2">
                  {[1,2,3].map(n=>(
                    <button key={n} className="w-9 h-9 rounded-lg border text-sm font-semibold transition-all"
                      style={{borderColor:n===2?C.gold:"rgba(78,52,46,0.15)",backgroundColor:n===2?"#FFF8E1":C.ivory,color:n===2?C.gold:C.charcoal}}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-5 shadow-sm" style={{backgroundColor:C.white}}>
            <h3 className="font-semibold mb-3" style={{color:C.charcoal}}>QR Content</h3>
            <div className="space-y-2">
              {[
                {l:"Room Service Menu",on:true},
                {l:"Spa Booking",on:true},
                {l:"Concierge Chat",on:true},
                {l:"Express Checkout",on:true},
                {l:"Loyalty Programme",on:false},
              ].map(item=>(
                <div key={item.l} className="flex items-center justify-between text-sm">
                  <span style={{color:C.charcoal}}>{item.l}</span>
                  <div className="w-8 h-4 rounded-full flex items-center transition-all"
                    style={{backgroundColor:item.on?C.gold:"#E8E3D9",justifyContent:item.on?"flex-end":"flex-start",padding:"2px"}}>
                    <div className="w-3 h-3 rounded-full bg-white shadow-sm"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sales data ────────────────────────────────────────────────────────────────
type SalesTab = "bar"|"kitchen"|"hotel";
const MENU_ITEMS: Record<SalesTab,{id:string;name:string;price:number;cat:string}[]> = {
  bar:[
    {id:"b1",name:"Star Lager Beer",price:1500,cat:"Drinks"},
    {id:"b2",name:"Heineken",price:1800,cat:"Drinks"},
    {id:"b3",name:"Red Wine (Glass)",price:3500,cat:"Wine"},
    {id:"b4",name:"White Wine (Glass)",price:3500,cat:"Wine"},
    {id:"b5",name:"Chapman",price:2000,cat:"Mocktails"},
    {id:"b6",name:"Fruit Punch",price:1800,cat:"Mocktails"},
    {id:"b7",name:"Bitter Lemon",price:1200,cat:"Soft Drinks"},
    {id:"b8",name:"Malta Guinness",price:1200,cat:"Soft Drinks"},
  ],
  kitchen:[
    {id:"k1",name:"Jollof Rice & Chicken",price:4500,cat:"Rice"},
    {id:"k2",name:"Fried Rice & Turkey",price:5000,cat:"Rice"},
    {id:"k3",name:"Pepper Soup (Goat)",price:5500,cat:"Soups"},
    {id:"k4",name:"Egusi Soup & Eba",price:3800,cat:"Soups"},
    {id:"k5",name:"Moi Moi",price:1500,cat:"Sides"},
    {id:"k6",name:"Fried Plantain",price:1200,cat:"Sides"},
    {id:"k7",name:"Grilled Tilapia",price:7500,cat:"Grill"},
    {id:"k8",name:"Suya Platter",price:4000,cat:"Grill"},
  ],
  hotel:[
    {id:"h1",name:"Room Service Fee",price:1500,cat:"Service"},
    {id:"h2",name:"Laundry (per item)",price:1500,cat:"Housekeeping"},
    {id:"h3",name:"Airport Transfer",price:15000,cat:"Transport"},
    {id:"h4",name:"Minibar Restock",price:5000,cat:"In-Room"},
    {id:"h5",name:"Extra Pillow / Linen",price:500,cat:"In-Room"},
    {id:"h6",name:"Late Check-Out Fee",price:10000,cat:"Charges"},
  ],
};

// ─── Guest Requests screen ─────────────────────────────────────────────────────
function ScreenRequests() {
  const [reqs,setReqs] = useState(INITIAL_REQUESTS);
  const ack = (id:string) => setReqs(p=>p.map(r=>r.id===id?{...r,status:"acknowledged" as const}:r));

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{backgroundColor:C.ivory}}>
      <PageHdr title="Guest Requests" crumbs={["Front Desk","Guest Requests"]} action={{label:"Refresh",Icon:RefreshCw}}/>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-3">
          {reqs.map(r=>(
            <div key={r.id} className="rounded-xl p-4 border flex gap-4 items-start"
              style={{backgroundColor:"white",borderColor:"rgba(78,52,46,0.1)",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-sm" style={{color:C.charcoal}}>{r.guestName}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{backgroundColor:statusCfg(r.priority).bg,color:statusCfg(r.priority).text}}>
                    {r.priority}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{backgroundColor:C.beige,color:C.brown}}>Room {r.room}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{color:C.charcoal}}>{r.description}</p>
                <div className="text-xs mt-1.5" style={{color:C.gray}}>{r.minutesAgo} min ago · {r.type}</div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <StatusBadge status={r.status}/>
                {r.status==="pending"&&(
                  <button onClick={()=>ack(r.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{backgroundColor:C.gold,color:"white"}}>
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Guest Management screen ───────────────────────────────────────────────────
function ScreenGuests() {
  const [search,setSearch] = useState("");
  const inHouse = ROOMS.filter(r=>r.guest&&(r.status==="occupied"||r.status==="checking-out"));
  const filtered = inHouse.filter(r=>
    r.guest!.name.toLowerCase().includes(search.toLowerCase())||r.id.includes(search)
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{backgroundColor:C.ivory}}>
      <PageHdr title="Guest Management" crumbs={["Front Desk","Guests"]}/>
      <div className="px-8 py-3 border-b flex items-center gap-3"
        style={{borderColor:"rgba(78,52,46,0.08)",backgroundColor:"white"}}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{color:C.gray}}/>
          <input className="pl-9 pr-4 py-2 rounded-lg border text-sm outline-none w-64"
            placeholder="Search guest or room…"
            value={search} onChange={e=>setSearch(e.target.value)}
            style={{borderColor:"rgba(78,52,46,0.15)",backgroundColor:C.ivory,color:C.charcoal}}/>
        </div>
        <span className="text-sm" style={{color:C.gray}}>{filtered.length} in-house guests</span>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {filtered.map(room=>{
            const g=room.guest!;
            const gReqs=INITIAL_REQUESTS.filter(q=>q.room===room.id);
            const initials=g.name.split(" ").map((n:string)=>n[0]).join("").slice(0,2);
            return (
              <div key={room.id} className="rounded-xl border overflow-hidden"
                style={{backgroundColor:"white",borderColor:"rgba(78,52,46,0.1)",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
                <div className="px-5 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{backgroundColor:C.brown}}>{initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm" style={{color:C.charcoal}}>{g.name}</div>
                    <div className="text-xs mt-0.5" style={{color:C.gray}}>
                      Room {room.id} · {room.type}{room.view?` · ${room.view} View`:""} · {g.checkIn} → {g.checkOut} ({g.nights} nights)
                    </div>
                  </div>
                  <StatusBadge status={room.status}/>
                  <span className="text-xs px-2 py-1 rounded border font-mono"
                    style={{color:C.gray,borderColor:"rgba(78,52,46,0.15)"}}>{g.reservation}</span>
                </div>
                {gReqs.length>0&&(
                  <div className="px-5 pb-4 border-t pt-3" style={{borderColor:"rgba(78,52,46,0.06)"}}>
                    <div className="text-xs font-semibold mb-2" style={{color:C.gold}}>
                      Open Requests ({gReqs.length})
                    </div>
                    <div className="space-y-1.5">
                      {gReqs.map(req=>(
                        <div key={req.id} className="flex items-center gap-2 text-xs">
                          <StatusBadge status={req.status}/>
                          <span className="flex-1 truncate" style={{color:C.charcoal}}>{req.description}</span>
                          <span style={{color:C.gray}}>{req.minutesAgo}m ago</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Sales screen ──────────────────────────────────────────────────────────────
function ScreenSales() {
  const [tab,setTab] = useState<SalesTab>("bar");
  const [cart,setCart] = useState<{id:string;name:string;price:number;qty:number}[]>([]);
  const [roomNum,setRoomNum] = useState("");
  const items = MENU_ITEMS[tab];
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);

  const addItem = (item:{id:string;name:string;price:number}) =>
    setCart(p=>{
      const ex=p.find(c=>c.id===item.id);
      return ex?p.map(c=>c.id===item.id?{...c,qty:c.qty+1}:c):[...p,{...item,qty:1}];
    });
  const removeItem = (id:string) =>
    setCart(p=>p.map(c=>c.id===id?{...c,qty:Math.max(0,c.qty-1)}:c).filter(c=>c.qty>0));
  const qtyFor = (id:string) => cart.find(c=>c.id===id)?.qty||0;
  const TABS:[SalesTab,string,any][] = [
    ["bar","Bar",Coffee],["kitchen","Kitchen",UtensilsCrossed],["hotel","Hotel Charges",Hotel]
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{backgroundColor:C.ivory}}>
      <PageHdr title="Sales" crumbs={["Front Desk","Sales"]}/>
      <div className="flex gap-0 border-b px-6"
        style={{backgroundColor:"white",borderColor:"rgba(78,52,46,0.08)"}}>
        {TABS.map(([id,lbl,Icon])=>(
          <button key={id} onClick={()=>setTab(id)}
            className="flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors"
            style={{color:tab===id?C.gold:C.gray,borderColor:tab===id?C.gold:"transparent"}}>
            <Icon className="w-4 h-4"/>{lbl}
          </button>
        ))}
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid gap-3" style={{gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))"}}>
            {items.map(item=>{
              const qty=qtyFor(item.id);
              return (
                <div key={item.id} className="rounded-xl border p-4 flex flex-col gap-2"
                  style={{backgroundColor:"white",borderColor:"rgba(78,52,46,0.1)",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full self-start"
                    style={{backgroundColor:C.beige,color:C.brown}}>{item.cat}</span>
                  <span className="font-semibold text-sm flex-1" style={{color:C.charcoal}}>{item.name}</span>
                  <span className="font-bold text-sm" style={{color:C.gold}}>{fmt(item.price)}</span>
                  {qty>0?(
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={()=>removeItem(item.id)}
                        className="w-7 h-7 rounded-lg border flex items-center justify-center"
                        style={{borderColor:"rgba(78,52,46,0.2)"}}>
                        <Minus className="w-3 h-3" style={{color:C.brown}}/>
                      </button>
                      <span className="flex-1 text-center font-semibold text-sm" style={{color:C.charcoal}}>{qty}</span>
                      <button onClick={()=>addItem(item)}
                        className="w-7 h-7 rounded-lg border flex items-center justify-center"
                        style={{borderColor:"rgba(78,52,46,0.2)"}}>
                        <Plus className="w-3 h-3" style={{color:C.brown}}/>
                      </button>
                    </div>
                  ):(
                    <button onClick={()=>addItem(item)}
                      className="mt-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                      style={{backgroundColor:C.gold,color:"white"}}>
                      <Plus className="w-3 h-3"/>Add
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-72 border-l flex flex-col"
          style={{backgroundColor:"white",borderColor:"rgba(78,52,46,0.08)"}}>
          <div className="px-5 py-4 border-b" style={{borderColor:"rgba(78,52,46,0.08)"}}>
            <div className="font-semibold text-sm mb-3" style={{color:C.charcoal}}>Order Summary</div>
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 shrink-0" style={{color:C.gray}}/>
              <input className="flex-1 text-sm border-b pb-1 outline-none bg-transparent"
                placeholder="Room number…" value={roomNum}
                onChange={e=>setRoomNum(e.target.value)}
                style={{borderColor:"rgba(78,52,46,0.2)",color:C.charcoal}}/>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {cart.length===0?(
              <div className="text-sm text-center py-8" style={{color:C.gray}}>No items added yet</div>
            ):cart.map(c=>(
              <div key={c.id} className="flex items-center gap-2 text-sm">
                <span className="w-6 h-6 rounded text-center text-xs font-bold flex items-center justify-center"
                  style={{backgroundColor:C.beige,color:C.gold}}>{c.qty}</span>
                <span className="flex-1 text-xs leading-tight" style={{color:C.charcoal}}>{c.name}</span>
                <span className="text-xs font-medium" style={{color:C.gray}}>{fmt(c.price*c.qty)}</span>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t space-y-3" style={{borderColor:"rgba(78,52,46,0.08)"}}>
            <div className="flex justify-between font-bold">
              <span style={{color:C.charcoal}}>Total</span>
              <span style={{color:C.gold}}>{fmt(total)}</span>
            </div>
            <button disabled={cart.length===0||!roomNum}
              className="w-full py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-opacity"
              style={{backgroundColor:C.gold,color:"white"}}>
              Charge to Room {roomNum||"—"}
            </button>
            <button disabled={cart.length===0} onClick={()=>setCart([])}
              className="w-full py-2 rounded-xl text-sm font-medium border disabled:opacity-40"
              style={{borderColor:"rgba(78,52,46,0.2)",color:C.gray}}>
              Clear Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root App ──────────────────────────────────────────────────────────────────
export default function FrontDeskApp() {
  const [active, setActive] = useState<Screen>("B205");

  const screens: Record<Screen, JSX.Element> = {
    B201: <B201/>,
    B202: <B202/>,
    B203: <B203/>,
    B205: <B205/>,
    REQUESTS: <ScreenRequests/>,
    GUESTS: <ScreenGuests/>,
    SALES: <ScreenSales/>,
  };

  return (
    <>
      <style>{`
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(78,52,46,0.2); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(78,52,46,0.35); }
        @keyframes scan-beam {
          0%   { top: 15%; opacity: 0.8; }
          100% { top: 80%; opacity: 0.4; }
        }
        .scan-beam {
          animation: scan-beam 1.8s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar active={active} onNav={setActive}/>
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar/>
          {screens[active]}
        </div>
      </div>
    </>
  );
}

