import { CheckCircle2, Download, Calendar, Share2, Gift, Mail, Phone } from "lucide-react";
import BrowserFrame from "../components/BrowserFrame";
import WhatsAppButton from "../components/WhatsAppButton";
import { Link } from "react-router";

export default function BookingConfirmation() {
  return (
    <div className="min-h-screen bg-[#F8F6F2] py-12">
      <BrowserFrame url="aryhillshotel.com/booking/confirmation">
        <WhatsAppButton />

        {/* Success Header */}
        <div className="bg-gradient-to-b from-[#2E7D32] to-[#1B5E20] py-16">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <CheckCircle2 className="w-20 h-20 text-white mx-auto mb-6" />
            <h1 className="text-white mb-4" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '40px' }}>
              Booking Confirmed!
            </h1>
            <p className="text-white/90 mb-8" style={{ fontFamily: 'Inter', fontSize: '18px', lineHeight: '1.6' }}>
              Thank you for choosing Aryhills Hotel. We're excited to host you!
            </p>
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-white/80 text-sm" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
                Confirmation Number:
              </span>
              <span className="text-white" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px' }}>
                ARY-2026-7891
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-8 py-12">
          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            <button className="flex flex-col items-center gap-3 p-6 bg-[#EFFFFE] rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#B8860B] text-white rounded-full flex items-center justify-center">
                <Download className="w-6 h-6" />
              </div>
              <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                Download Confirmation
              </span>
            </button>

            <button className="flex flex-col items-center gap-3 p-6 bg-[#EFFFFE] rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#B8860B] text-white rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                Add to Calendar
              </span>
            </button>

            <button className="flex flex-col items-center gap-3 p-6 bg-[#EFFFFE] rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#B8860B] text-white rounded-full flex items-center justify-center">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                Share Booking
              </span>
            </button>
          </div>

          {/* Booking Details */}
          <div className="bg-[#EFFFFE] rounded-lg p-8 mb-8">
            <h2 className="text-[#2D2D2D] mb-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px' }}>
              Booking Details
            </h2>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-[#6C757D] mb-3" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Guest Information
                </h3>
                <div className="space-y-2">
                  <p className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
                    John Doe
                  </p>
                  <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                    john.doe@email.com
                  </p>
                  <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                    +234 801 234 5678
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-[#6C757D] mb-3" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Room Details
                </h3>
                <div className="space-y-2">
                  <p className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
                    Deluxe King Room
                  </p>
                  <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                    1 King Bed • Non-smoking
                  </p>
                  <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                    Max. 2 Guests
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-[#6C757D] mb-3" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Check-in
                </h3>
                <p className="text-[#2D2D2D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '18px' }}>
                  July 1, 2026
                </p>
                <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                  After 2:00 PM
                </p>
              </div>

              <div>
                <h3 className="text-[#6C757D] mb-3" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Check-out
                </h3>
                <p className="text-[#2D2D2D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '18px' }}>
                  July 3, 2026
                </p>
                <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                  Before 11:00 AM
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#D6C5A4]">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Total Amount Paid
                  </h3>
                  <p className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '32px' }}>
                    ₦110,000
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#6C757D] text-sm mb-1" style={{ fontFamily: 'Inter' }}>
                    Payment Method
                  </p>
                  <p className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                    Credit Card (****3456)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#F8F6F2] rounded-lg">
              <h4 className="text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                Included Add-ons:
              </h4>
              <ul className="space-y-1">
                <li className="text-[#6C757D] text-sm flex items-center gap-2" style={{ fontFamily: 'Inter' }}>
                  <div className="w-1.5 h-1.5 bg-[#B8860B] rounded-full"></div>
                  Complimentary Breakfast
                </li>
                <li className="text-[#6C757D] text-sm flex items-center gap-2" style={{ fontFamily: 'Inter' }}>
                  <div className="w-1.5 h-1.5 bg-[#B8860B] rounded-full"></div>
                  Airport Transfer (Round-trip)
                </li>
              </ul>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-[#EFFFFE] rounded-lg p-8 mb-8">
            <h2 className="text-[#2D2D2D] mb-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px' }}>
              What to Expect at Check-in
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#F8F6F2] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <div>
                  <p className="text-[#2D2D2D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                    Early Check-in Available
                  </p>
                  <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                    Subject to room availability. Contact us 24 hours before arrival to request.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#F8F6F2] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <div>
                  <p className="text-[#2D2D2D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                    ID & Payment Card Required
                  </p>
                  <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                    Please bring a valid photo ID and the credit card used for booking.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#F8F6F2] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <div>
                  <p className="text-[#2D2D2D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                    Mobile Check-in Option
                  </p>
                  <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                    Download our mobile app to check in online and skip the queue.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#F8F6F2] rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <div>
                  <p className="text-[#2D2D2D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                    Airport Pickup Scheduled
                  </p>
                  <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                    Our driver will be waiting at arrivals with your name on a sign.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Refer a Friend */}
          <div className="bg-gradient-to-r from-[#B8860B] to-[#9A7209] rounded-lg p-8 text-center">
            <Gift className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-white mb-3" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px' }}>
              Loved Your Experience?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: '1.6' }}>
              Refer a friend and you both get 10% off your next booking when they complete their stay!
            </p>
            <button className="py-3 px-8 bg-white text-[#B8860B] rounded-lg hover:bg-[#F8F6F2] transition-colors" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
              Refer a Friend
            </button>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <h3 className="text-[#2D2D2D] mb-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '20px' }}>
              Need Help? We're Here for You
            </h3>
            <div className="flex items-center justify-center gap-8">
              <a href="tel:+2348050303270" className="flex items-center gap-2 text-[#6C757D] hover:text-[#B8860B] transition-colors">
                <Phone className="w-5 h-5" />
                <span style={{ fontFamily: 'Inter', fontSize: '14px' }}>+234 805 030 3270</span>
              </a>
              <a href="mailto:info@aryhillshotel.com" className="flex items-center gap-2 text-[#6C757D] hover:text-[#B8860B] transition-colors">
                <Mail className="w-5 h-5" />
                <span style={{ fontFamily: 'Inter', fontSize: '14px' }}>info@aryhillshotel.com</span>
              </a>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              to="/booking"
              className="inline-block py-3 px-8 bg-[#B8860B] text-white rounded-lg hover:bg-[#9A7209] transition-colors"
              style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

