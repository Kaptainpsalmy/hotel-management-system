import { SlidersHorizontal } from "lucide-react";
import BrowserFrame from "../components/BrowserFrame";
import BookNowButton from "../components/BookNowButton";
import WhatsAppButton from "../components/WhatsAppButton";
import RoomCard from "../components/RoomCard";
import { useState } from "react";

export default function RoomListing() {
  const [priceRange, setPriceRange] = useState("all");
  const [roomType, setRoomType] = useState("all");
  const [bedConfig, setBedConfig] = useState("all");

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
      title: "Business Class Room",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBob3RlbCUyMHJvb20lMjBidXNpbmVzc3xlbnwxfHx8fDE3ODI2Nzc3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 38000,
    },
    {
      title: "Premium Double Room",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWx1eGUlMjBob3RlbCUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3ODI2Nzc3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 42000,
      available: 5,
    },
    {
      title: "Standard Queen Room",
      image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb20lMjBtb2Rlcm4lMjBiZWR8ZW58MXx8fHwxNzgyNjc3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 35000,
    },
    {
      title: "Junior Suite",
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwZWxlZ2FudCUyMGludGVyaW9yfGVufDF8fHx8MTc4MjY3Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      price: 52000,
      available: 4,
    },
    {
      title: "Twin Standard Room",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBob3RlbCUyMHJvb20lMjBidXNpbmVzc3xlbnwxfHx8fDE3ODI2Nzc3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 33000,
    },
    {
      title: "Presidential Suite",
      image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwbG9iYnklMjBsdXh1cnl8ZW58MXx8fHwxNzgyNjc3NzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 95000,
      available: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2] py-12">
      <BrowserFrame url="aryhillshotel.com/rooms">
        <BookNowButton />
        <WhatsAppButton />

        {/* Header */}
        <div className="bg-[#4E342E] py-12">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-white mb-3" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '40px' }}>
              Our Rooms & Suites
            </h1>
            <p className="text-[#D6C5A4]" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
              Choose from our selection of premium accommodations
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border-b border-[#D6C5A4] sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#6C757D]" />
                <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                  Filter:
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                  Room Type
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="py-2 px-4 border border-[#D6C5A4] rounded text-sm text-[#2D2D2D]"
                  style={{ fontFamily: 'Inter' }}
                >
                  <option value="all">All Types</option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="py-2 px-4 border border-[#D6C5A4] rounded text-sm text-[#2D2D2D]"
                  style={{ fontFamily: 'Inter' }}
                >
                  <option value="all">All Prices</option>
                  <option value="under40k">Under ₦40,000</option>
                  <option value="40k-60k">₦40,000 - ₦60,000</option>
                  <option value="over60k">Over ₦60,000</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                  Bed Configuration
                </label>
                <select
                  value={bedConfig}
                  onChange={(e) => setBedConfig(e.target.value)}
                  className="py-2 px-4 border border-[#D6C5A4] rounded text-sm text-[#2D2D2D]"
                  style={{ fontFamily: 'Inter' }}
                >
                  <option value="all">All Beds</option>
                  <option value="king">King Bed</option>
                  <option value="queen">Queen Bed</option>
                  <option value="twin">Twin Beds</option>
                  <option value="double">Double Bed</option>
                </select>
              </div>

              <div className="ml-auto">
                <span className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                  {rooms.length} rooms available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Room Grid */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <RoomCard key={index} {...room} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-[#F8F6F2] py-16">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-[#2D2D2D] mb-4" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '32px' }}>
              Need Help Choosing?
            </h2>
            <p className="text-[#6C757D] mb-8" style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: '1.6' }}>
              Our team is available 24/7 to help you find the perfect room for your stay.
              Contact us via phone, email, or WhatsApp.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="tel:+2348012345678"
                className="py-3 px-8 bg-[#B8860B] text-white rounded-lg hover:bg-[#9A7209] transition-colors"
                style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
              >
                Call Us Now
              </a>
              <a
                href="mailto:info@aryhillshotel.com"
                className="py-3 px-8 bg-white text-[#B8860B] border-2 border-[#B8860B] rounded-lg hover:bg-[#F8F6F2] transition-colors"
                style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

