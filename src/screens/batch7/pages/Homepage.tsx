import { Star, Mail, Phone, MapPin } from "lucide-react";
import BrowserFrame from "../components/BrowserFrame";
import BookNowButton from "../components/BookNowButton";
import WhatsAppButton from "../components/WhatsAppButton";
import HeroSearchBar from "../components/HeroSearchBar";
import RoomCard from "../components/RoomCard";
import TestimonialCard from "../components/TestimonialCard";
import TrustBadges from "../components/TrustBadges";
import { Link } from "react-router";

export default function Homepage() {
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
    {
      title: "Premium Double Room",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWx1eGUlMjBob3RlbCUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3ODI2Nzc3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 42000,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2] py-12">
      <BrowserFrame url="aryhillshotel.com">
        <BookNowButton />
        <WhatsAppButton />

        {/* Hero Section */}
        <div className="relative h-[600px] bg-gradient-to-b from-[#4E342E] to-[#2D2D2D]">
          <img
            src="https://images.unsplash.com/photo-1779487581808-145bfb858e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwTGFnb3N8ZW58MXx8fHwxNzgyNjc3NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Aryhills Hotel"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <h1 className="text-white mb-4" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '48px', lineHeight: '1.2' }}>
              Ilesa's Premier Hotel
            </h1>
            <p className="text-[#D6C5A4] max-w-2xl mb-8" style={{ fontFamily: 'Inter', fontSize: '18px', lineHeight: '1.6' }}>
              Experience luxury, comfort, and world-class service in the heart of Ilesa, Osun State. Your perfect stay begins here.
            </p>
            <div className="flex items-center gap-3 mb-12">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-[#B8860B] fill-[#B8860B]" />
                ))}
              </div>
              <span className="text-white" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
                4.8/5 from 342 reviews
              </span>
            </div>
          </div>
          
          {/* Search Bar Overlay */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-5xl px-8">
            <HeroSearchBar />
          </div>
        </div>

        {/* Featured Rooms Section */}
        <div className="max-w-7xl mx-auto px-8 pt-24 pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '32px' }}>
                Featured Rooms
              </h2>
              <p className="text-[#6C757D]" style={{ fontFamily: 'Inter', fontSize: '16px' }}>
                Choose from our selection of premium accommodations
              </p>
            </div>
            <Link
              to="/booking/rooms"
              className="text-[#B8860B] hover:text-[#9A7209] transition-colors"
              style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
            >
              View All Rooms →
            </Link>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {featuredRooms.map((room, index) => (
              <RoomCard key={index} {...room} />
            ))}
          </div>
        </div>

        {/* Offers Section */}
        <div className="bg-[#4E342E] py-16">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-white text-center mb-12" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '32px' }}>
              Special Offers
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-[#EFFFFE] rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwbG9iYnklMjBsdXh1cnl8ZW58MXx8fHwxNzgyNjc3NzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Weekend Getaway"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-[#F4A300] text-white px-3 py-1.5 rounded-full text-xs" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    Offer ends in 2d 14h
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '20px' }}>
                    Weekend Getaway Package
                  </h3>
                  <p className="text-[#6C757D] mb-4" style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.6' }}>
                    Book 2 nights, get 20% off + complimentary breakfast and airport transfer
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px' }}>
                      From ₦72,000
                    </span>
                    <Link
                      to="/booking/step1"
                      className="py-2 px-6 bg-[#B8860B] text-white rounded-lg hover:bg-[#9A7209] transition-colors"
                      style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-[#EFFFFE] rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwZWxlZ2FudCUyMGludGVyaW9yfGVufDF8fHx8MTc4MjY3Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Business Travel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '20px' }}>
                    Business Travel Discount
                  </h3>
                  <p className="text-[#6C757D] mb-4" style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.6' }}>
                    Extended stays (5+ nights) receive 15% off + free high-speed WiFi and workspace
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px' }}>
                      From ₦32,300
                    </span>
                    <Link
                      to="/booking/step1"
                      className="py-2 px-6 bg-[#B8860B] text-white rounded-lg hover:bg-[#9A7209] transition-colors"
                      style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-[#2D2D2D] mb-3" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '32px' }}>
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 text-[#B8860B] fill-[#B8860B]" />
                ))}
              </div>
              <span className="text-[#6C757D]" style={{ fontFamily: 'Inter', fontSize: '18px' }}>
                4.8/5 from 342 reviews
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <TestimonialCard
              name="Mrs. Aisha Bello"
              rating={5}
              quote="Exceptional service and stunning rooms. The staff went above and beyond to make our anniversary special. Will definitely be back!"
            />
            <TestimonialCard
              name="Mr. James Carter"
              rating={5}
              quote="Perfect location, amazing amenities. The business center and high-speed WiFi made my work trip very productive. Highly recommend!"
            />
            <TestimonialCard
              name="Mr. Chidi Okafor"
              rating={4}
              quote="Beautiful hotel with great attention to detail. The breakfast was delicious and the rooms were spotless. Great value for money."
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#4E342E] text-white py-12">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="mb-4" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '20px' }}>
                  Aryhills Hotel
                </h3>
                <p className="text-[#D6C5A4] text-sm" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                  Ilesa's Premier Hotel offering luxury, comfort, and exceptional service.
                </p>
              </div>
              
              <div>
                <h4 className="mb-4" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
                  Quick Links
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/booking/rooms" className="text-[#D6C5A4] hover:text-white transition-colors">Rooms & Suites</Link></li>
                  <li><a href="#" className="text-[#D6C5A4] hover:text-white transition-colors">Dining</a></li>
                  <li><a href="#" className="text-[#D6C5A4] hover:text-white transition-colors">Amenities</a></li>
                  <li><a href="#" className="text-[#D6C5A4] hover:text-white transition-colors">About Us</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="mb-4" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
                  Contact
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#D6C5A4]" />
                    <span className="text-[#D6C5A4]">Old St. John School, Kajola Street, Imo, Ilesa, Osun State, Nigeria</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#D6C5A4]" />
                    <span className="text-[#D6C5A4]">+234 801 234 5678</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#D6C5A4]" />
                    <span className="text-[#D6C5A4]">info@aryhillshotel.com</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="mb-4" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
                  Policies
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-[#D6C5A4] hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-[#D6C5A4] hover:text-white transition-colors">Terms & Conditions</a></li>
                  <li><a href="#" className="text-[#D6C5A4] hover:text-white transition-colors">Cancellation Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-[#D6C5A4]/20">
              <TrustBadges />
              <p className="text-center text-[#D6C5A4] text-sm mt-4" style={{ fontFamily: 'Inter' }}>
                © 2026 Aryhills Hotel. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </BrowserFrame>
    </div>
  );
}

