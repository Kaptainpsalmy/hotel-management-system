import { Calendar, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface HeroSearchBarProps {
  mobile?: boolean;
}

export default function HeroSearchBar({ mobile = false }: HeroSearchBarProps) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("2026-07-01");
  const [checkOut, setCheckOut] = useState("2026-07-03");
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    navigate("/booking/rooms");
  };

  if (mobile) {
    return (
      <div className="w-full bg-white rounded-lg shadow-lg p-4 space-y-3">
        <div>
          <label className="block text-xs text-[#6C757D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
            Check-in
          </label>
          <div className="relative">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full py-2 px-3 pr-10 border border-[#D6C5A4] rounded text-sm text-[#2D2D2D]"
              style={{ fontFamily: 'Inter' }}
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C757D] pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[#6C757D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
            Check-out
          </label>
          <div className="relative">
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full py-2 px-3 pr-10 border border-[#D6C5A4] rounded text-sm text-[#2D2D2D]"
              style={{ fontFamily: 'Inter' }}
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C757D] pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[#6C757D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
            Guests
          </label>
          <div className="relative">
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full py-2 px-3 pr-10 border border-[#D6C5A4] rounded text-sm text-[#2D2D2D] appearance-none"
              style={{ fontFamily: 'Inter' }}
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
            </select>
            <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C757D] pointer-events-none" />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="w-full py-3 px-6 bg-[#B8860B] text-white rounded hover:bg-[#9A7209] transition-colors"
          style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
        >
          Check Availability
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-4 bg-white rounded-full shadow-lg p-3 max-w-4xl">
      <div className="flex-1">
        <label className="block text-xs text-[#6C757D] mb-1 px-4" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
          Check-in
        </label>
        <div className="relative">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full py-2 px-4 border-0 rounded-full text-sm text-[#2D2D2D]"
            style={{ fontFamily: 'Inter' }}
          />
          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C757D] pointer-events-none" />
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-xs text-[#6C757D] mb-1 px-4" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
          Check-out
        </label>
        <div className="relative">
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full py-2 px-4 border-0 rounded-full text-sm text-[#2D2D2D]"
            style={{ fontFamily: 'Inter' }}
          />
          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C757D] pointer-events-none" />
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-xs text-[#6C757D] mb-1 px-4" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
          Guests
        </label>
        <div className="relative">
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full py-2 px-4 border-0 rounded-full text-sm text-[#2D2D2D] appearance-none"
            style={{ fontFamily: 'Inter' }}
          >
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
          </select>
          <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C757D] pointer-events-none" />
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="py-3 px-8 bg-[#B8860B] text-white rounded-full hover:bg-[#9A7209] transition-colors whitespace-nowrap"
        style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
      >
        Check Availability
      </button>
    </div>
  );
}

