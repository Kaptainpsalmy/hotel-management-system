import { Star, Mail, Phone, MapPin, Menu } from "lucide-react";
import PhoneFrame from "../components/PhoneFrame";
import BookNowButton from "../components/BookNowButton";
import WhatsAppButton from "../components/WhatsAppButton";
import HeroSearchBar from "../components/HeroSearchBar";
import RoomCard from "../components/RoomCard";
import TestimonialCard from "../components/TestimonialCard";
import TrustBadges from "../components/TrustBadges";
import { Link } from "react-router";

export default function HomepageMobile() {
  const featuredRooms = [
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
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2] py-12 flex items-center justify-center">
      <PhoneFrame>
        <BookNowButton mobile />
        <WhatsAppButton />

        {/* Mobile Header */}
        <div className="sticky top-0 z-40 bg-[#4E342E] px-4 py-4 flex items-center justify-between">
          <h1 className="text-white" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '18px' }}>
            Aryhills Hotel
          </h1>
          <button className="text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative">
          <div className="h-80 bg-gradient-to-b from-[#4E342E] to-[#2D2D2D]">
            <img
              src="https://images.unsplash.com/photo-1779487581808-145bfb858e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwTGFnb3N8ZW58MXx8fHwxNzgyNjc3NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Aryhills Hotel"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-white mb-2" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '28px', lineHeight: '1.3' }}>
                Ilesa's Premier<br />Hotel
              </h2>
              <p className="text-[#D6C5A4] mb-4" style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.5' }}>
                Experience luxury in the heart of Ilesa
              </p>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-[#B8860B] fill-[#B8860B]" />
                  ))}
                </div>
                <span className="text-white text-sm" style={{ fontFamily: 'Inter' }}>
                  4.8/5 (342)
                </span>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="px-4 -mt-20 relative z-10">
            <HeroSearchBar mobile />
          </div>
        </div>

        {/* Featured Rooms Section */}
        <div className="px-4 pt-8 pb-24">
          <div className="mb-6">
            <h3 className="text-[#2D2D2D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px' }}>
              Featured Rooms
            </h3>
            <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
              Premium accommodations for your stay
            </p>
          </div>
          
          {/* Horizontal Scroll Carousel */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4" style={{ scrollSnapType: 'x mandatory' }}>
            {featuredRooms.map((room, index) => (
              <div key={index} className="flex-shrink-0 w-72" style={{ scrollSnapAlign: 'start' }}>
                <RoomCard {...room} />
              </div>
            ))}
          </div>
          
          <Link
            to="/booking/rooms"
            className="block text-center text-[#B8860B] mt-4"
            style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
          >
            View All Rooms →
          </Link>
        </div>

        {/* Offers Section */}
        <div className="bg-[#4E342E] px-4 py-12">
          <h3 className="text-white text-center mb-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px' }}>
            Special Offers
          </h3>
          
          <div className="space-y-6">
            <div className="bg-[#EFFFFE] rounded-lg overflow-hidden">
              <div className="relative h-40">
                <img
                  src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwbG9iYnklMjBsdXh1cnl8ZW58MXx8fHwxNzgyNjc3NzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Weekend Getaway"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#F4A300] text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                  Ends in 2d 14h
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-[#2D2D2D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
                  Weekend Getaway Package
                </h4>
                <p className="text-[#6C757D] text-sm mb-3" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                  Book 2 nights, get 20% off + breakfast
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '20px' }}>
                    From ₦72,000
                  </span>
                  <Link
                    to="/booking/step1"
                    className="py-2 px-4 bg-[#B8860B] text-white rounded text-sm hover:bg-[#9A7209] transition-colors"
                    style={{ fontFamily: 'Inter', fontWeight: 600 }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#EFFFFE] rounded-lg overflow-hidden">
              <div className="relative h-40">
                <img
                  src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwZWxlZ2FudCUyMGludGVyaW9yfGVufDF8fHx8MTc4MjY3Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Business Travel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-[#2D2D2D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
                  Business Travel Discount
                </h4>
                <p className="text-[#6C757D] text-sm mb-3" style={{ fontFamily: 'Inter', lineHeight: '1.5' }}>
                  Extended stays (5+ nights) get 15% off
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '20px' }}>
                    From ₦32,300
                  </span>
                  <Link
                    to="/booking/step1"
                    className="py-2 px-4 bg-[#B8860B] text-white rounded text-sm hover:bg-[#9A7209] transition-colors"
                    style={{ fontFamily: 'Inter', fontWeight: 600 }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="px-4 py-12">
          <div className="text-center mb-6">
            <h3 className="text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px' }}>
              What Our Guests Say
            </h3>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-[#B8860B] fill-[#B8860B]" />
                ))}
              </div>
              <span className="text-[#6C757D]" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
                4.8/5 (342)
              </span>
            </div>
          </div>
          
          <div className="space-y-4 pb-20">
            <TestimonialCard
              name="Mrs. Aisha Bello"
              rating={5}
              quote="Exceptional service and stunning rooms. The staff went above and beyond to make our anniversary special."
            />
            <TestimonialCard
              name="Mr. James Carter"
              rating={5}
              quote="Perfect location, amazing amenities. The business center made my work trip very productive."
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#4E342E] text-white px-4 py-8 pb-24">
          <div className="mb-6">
            <h4 className="mb-3" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '18px' }}>
              Aryhills Hotel
            </h4>
            <p className="text-[#D6C5A4] text-sm mb-4" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
              Ilesa's Premier Hotel
            </p>
            
            <div className="space-y-2 text-sm mb-6">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#D6C5A4]" />
                <span className="text-[#D6C5A4]">Kajola Street, Imo, Ilesa, Osun State</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D6C5A4]" />
                <span className="text-[#D6C5A4]">+234 801 234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D6C5A4]" />
                <span className="text-[#D6C5A4]">info@aryhillshotel.com</span>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-[#D6C5A4]/20">
            <TrustBadges />
            <p className="text-center text-[#D6C5A4] text-xs mt-4" style={{ fontFamily: 'Inter' }}>
              © 2026 Aryhills Hotel. All rights reserved.
            </p>
          </div>
        </footer>
      </PhoneFrame>
    </div>
  );
}

