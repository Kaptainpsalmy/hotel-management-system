import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import BrowserFrame from "../components/BrowserFrame";
import BookNowButton from "../components/BookNowButton";
import WhatsAppButton from "../components/WhatsAppButton";
import RoomCard from "../components/RoomCard";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function BookingStep1() {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [checkIn, setCheckIn] = useState("2026-07-01");
  const [checkOut, setCheckOut] = useState("2026-07-03");
  const [breakfast, setBreakfast] = useState(false);
  const [airportTransfer, setAirportTransfer] = useState(false);

  const rooms = [
    {
      title: "Deluxe King Room",
      image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb20lMjBtb2Rlcm4lMjBiZWR8ZW58MXx8fHwxNzgyNjc3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 45000,
      available: 3,
    },
    {
      title: "Executive Suite",
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwZWxlZ2FudCUyMGludGVyaW9yfGVufDF8fHx8MTc4MjY3Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      price: 65000,
      available: 2,
    },
    {
      title: "Premium Double Room",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWx1eGUlMjBob3RlbCUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3ODI2Nzc3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 42000,
    },
  ];

  const nights = 2;
  const roomPrice = selectedRoom !== null ? rooms[selectedRoom].price : 0;
  const breakfastPrice = breakfast ? 5000 : 0;
  const transferPrice = airportTransfer ? 15000 : 0;
  const subtotal = (roomPrice * nights) + breakfastPrice + transferPrice;

  const handleContinue = () => {
    if (selectedRoom !== null) {
      navigate("/booking/step2");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] py-12">
      <BrowserFrame url="aryhillshotel.com/booking/step1">
        <BookNowButton />
        <WhatsAppButton />

        {/* Progress Indicator */}
        <div className="bg-white border-b border-[#D6C5A4] py-6">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#B8860B] text-white rounded-full flex items-center justify-center" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                  1
                </div>
                <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                  Select Room & Dates
                </span>
              </div>
              
              <div className="w-24 h-0.5 bg-[#D6C5A4]"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#D6C5A4] text-[#6C757D] rounded-full flex items-center justify-center" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                  2
                </div>
                <span className="text-[#6C757D]" style={{ fontFamily: 'Inter', fontSize: '14px' }}>
                  Guest Details & Payment
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="col-span-2 space-y-8">
              {/* Calendar Section */}
              <div className="bg-[#EFFFFE] rounded-lg p-6">
                <h2 className="text-[#2D2D2D] mb-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px' }}>
                  Select Your Dates
                </h2>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                      Check-in Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full py-3 px-4 pr-12 border border-[#D6C5A4] rounded-lg text-[#2D2D2D]"
                        style={{ fontFamily: 'Inter', fontSize: '14px' }}
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C757D] pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                      Check-out Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full py-3 px-4 pr-12 border border-[#D6C5A4] rounded-lg text-[#2D2D2D]"
                        style={{ fontFamily: 'Inter', fontSize: '14px' }}
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C757D] pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#F8F6F2] rounded-lg p-4 flex items-center justify-between">
                  <span className="text-[#6C757D]" style={{ fontFamily: 'Inter', fontSize: '14px' }}>
                    Total Stay
                  </span>
                  <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
                    {nights} nights
                  </span>
                </div>
              </div>

              {/* Available Rooms */}
              <div>
                <h2 className="text-[#2D2D2D] mb-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px' }}>
                  Available Rooms
                </h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {rooms.map((room, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedRoom(index)}
                      className={`cursor-pointer transition-all ${
                        selectedRoom === index
                          ? 'ring-2 ring-[#B8860B] rounded-lg'
                          : ''
                      }`}
                    >
                      <RoomCard {...room} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div className="bg-[#EFFFFE] rounded-lg p-6">
                <h2 className="text-[#2D2D2D] mb-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px' }}>
                  Enhance Your Stay
                </h2>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-white rounded-lg cursor-pointer hover:bg-[#F8F6F2] transition-colors">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={breakfast}
                        onChange={(e) => setBreakfast(e.target.checked)}
                        className="w-5 h-5 accent-[#B8860B]"
                      />
                      <div>
                        <p className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                          Complimentary Breakfast
                        </p>
                        <p className="text-[#6C757D] text-xs" style={{ fontFamily: 'Inter' }}>
                          Continental breakfast buffet for your entire stay
                        </p>
                      </div>
                    </div>
                    <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
                      +₦5,000
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-white rounded-lg cursor-pointer hover:bg-[#F8F6F2] transition-colors">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={airportTransfer}
                        onChange={(e) => setAirportTransfer(e.target.checked)}
                        className="w-5 h-5 accent-[#B8860B]"
                      />
                      <div>
                        <p className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                          Airport Transfer
                        </p>
                        <p className="text-[#6C757D] text-xs" style={{ fontFamily: 'Inter' }}>
                          Round-trip luxury car service to/from airport
                        </p>
                      </div>
                    </div>
                    <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
                      +₦15,000
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Sidebar - Running Total */}
            <div className="col-span-1">
              <div className="bg-[#EFFFFE] rounded-lg p-6 sticky top-24">
                <h3 className="text-[#2D2D2D] mb-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '18px' }}>
                  Booking Summary
                </h3>
                
                {selectedRoom !== null ? (
                  <>
                    <div className="space-y-4 mb-6 pb-6 border-b border-[#D6C5A4]">
                      <div className="flex justify-between">
                        <span className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                          {rooms[selectedRoom].title}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                          {nights} nights × ₦{rooms[selectedRoom].price.toLocaleString()}
                        </span>
                        <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                          ₦{(roomPrice * nights).toLocaleString()}
                        </span>
                      </div>
                      
                      {breakfast && (
                        <div className="flex justify-between">
                          <span className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                            Breakfast
                          </span>
                          <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                            ₦{breakfastPrice.toLocaleString()}
                          </span>
                        </div>
                      )}
                      
                      {airportTransfer && (
                        <div className="flex justify-between">
                          <span className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                            Airport Transfer
                          </span>
                          <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                            ₦{transferPrice.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between mb-6">
                      <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '18px' }}>
                        Total
                      </span>
                      <span className="text-[#B8860B]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px' }}>
                        ₦{subtotal.toLocaleString()}
                      </span>
                    </div>
                    
                    <button
                      onClick={handleContinue}
                      className="w-full py-3 px-6 bg-[#B8860B] text-white rounded-lg hover:bg-[#9A7209] transition-colors mb-4"
                      style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
                    >
                      Continue to Payment →
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                      Select a room to see pricing
                    </p>
                  </div>
                )}
                
                <div className="mt-6 pt-6 border-t border-[#D6C5A4]">
                  <p className="text-[#6C757D] text-xs mb-3" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                    • Free cancellation up to 48 hours before check-in
                  </p>
                  <p className="text-[#6C757D] text-xs" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                    • Prices include all applicable taxes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}
