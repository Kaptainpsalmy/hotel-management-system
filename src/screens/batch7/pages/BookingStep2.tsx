import { Shield, CreditCard, Building2, Banknote, Wallet } from "lucide-react";
import BrowserFrame from "../components/BrowserFrame";
import BookNowButton from "../components/BookNowButton";
import WhatsAppButton from "../components/WhatsAppButton";
import TrustBadges from "../components/TrustBadges";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function BookingStep2() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");

  const handleComplete = () => {
    navigate("/booking/confirmation");
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] py-12">
      <BrowserFrame url="aryhillshotel.com/booking/step2">
        <BookNowButton />
        <WhatsAppButton />

        {/* Progress Indicator */}
        <div className="bg-white border-b border-[#D6C5A4] py-6">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#2E7D32] text-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#6C757D]" style={{ fontFamily: 'Inter', fontSize: '14px' }}>
                  Select Room & Dates
                </span>
              </div>
              
              <div className="w-24 h-0.5 bg-[#B8860B]"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#B8860B] text-white rounded-full flex items-center justify-center" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                  2
                </div>
                <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
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
              {/* Guest Details */}
              <div className="bg-[#EFFFFE] rounded-lg p-6">
                <h2 className="text-[#2D2D2D] mb-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px' }}>
                  Guest Information
                </h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full py-3 px-4 border border-[#D6C5A4] rounded-lg text-[#2D2D2D]"
                      style={{ fontFamily: 'Inter', fontSize: '14px' }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full py-3 px-4 border border-[#D6C5A4] rounded-lg text-[#2D2D2D]"
                      style={{ fontFamily: 'Inter', fontSize: '14px' }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="john.doe@email.com"
                      className="w-full py-3 px-4 border border-[#D6C5A4] rounded-lg text-[#2D2D2D]"
                      style={{ fontFamily: 'Inter', fontSize: '14px' }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 801 234 5678"
                      className="w-full py-3 px-4 border border-[#D6C5A4] rounded-lg text-[#2D2D2D]"
                      style={{ fontFamily: 'Inter', fontSize: '14px' }}
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Let us know if you have any special requirements..."
                    className="w-full py-3 px-4 border border-[#D6C5A4] rounded-lg text-[#2D2D2D] resize-none"
                    style={{ fontFamily: 'Inter', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-[#EFFFFE] rounded-lg p-6">
                <h2 className="text-[#2D2D2D] mb-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px' }}>
                  Payment Method
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <label
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#B8860B] bg-[#F8F6F2]'
                        : 'border-[#D6C5A4] bg-white hover:bg-[#F8F6F2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-[#B8860B]" />
                      <div>
                        <p className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                          Credit/Debit Card
                        </p>
                        <p className="text-[#6C757D] text-xs" style={{ fontFamily: 'Inter' }}>
                          Visa, Mastercard
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'paystack'
                        ? 'border-[#B8860B] bg-[#F8F6F2]'
                        : 'border-[#D6C5A4] bg-white hover:bg-[#F8F6F2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="paystack"
                      checked={paymentMethod === 'paystack'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <Wallet className="w-6 h-6 text-[#B8860B]" />
                      <div>
                        <p className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                          Paystack
                        </p>
                        <p className="text-[#6C757D] text-xs" style={{ fontFamily: 'Inter' }}>
                          Quick & secure
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'flutterwave'
                        ? 'border-[#B8860B] bg-[#F8F6F2]'
                        : 'border-[#D6C5A4] bg-white hover:bg-[#F8F6F2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="flutterwave"
                      checked={paymentMethod === 'flutterwave'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <Wallet className="w-6 h-6 text-[#B8860B]" />
                      <div>
                        <p className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                          Flutterwave
                        </p>
                        <p className="text-[#6C757D] text-xs" style={{ fontFamily: 'Inter' }}>
                          Quick & secure
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-[#B8860B] bg-[#F8F6F2]'
                        : 'border-[#D6C5A4] bg-white hover:bg-[#F8F6F2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <Building2 className="w-6 h-6 text-[#B8860B]" />
                      <div>
                        <p className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                          Bank Transfer
                        </p>
                        <p className="text-[#6C757D] text-xs" style={{ fontFamily: 'Inter' }}>
                          Direct transfer
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'arrival'
                        ? 'border-[#B8860B] bg-[#F8F6F2]'
                        : 'border-[#D6C5A4] bg-white hover:bg-[#F8F6F2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="arrival"
                      checked={paymentMethod === 'arrival'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <Banknote className="w-6 h-6 text-[#B8860B]" />
                      <div>
                        <p className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                          Pay on Arrival
                        </p>
                        <p className="text-[#6C757D] text-xs" style={{ fontFamily: 'Inter' }}>
                          Deposit required
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-white rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-[#2E7D32]" />
                      <span className="text-[#2E7D32] text-sm" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                        Secure SSL Encrypted Payment
                      </span>
                    </div>

                    <div>
                      <label className="block text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full py-3 px-4 border border-[#D6C5A4] rounded-lg text-[#2D2D2D]"
                        style={{ fontFamily: 'Inter', fontSize: '14px' }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="block text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="w-full py-3 px-4 border border-[#D6C5A4] rounded-lg text-[#2D2D2D]"
                          style={{ fontFamily: 'Inter', fontSize: '14px' }}
                        />
                      </div>
                      <div>
                        <label className="block text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full py-3 px-4 border border-[#D6C5A4] rounded-lg text-[#2D2D2D]"
                          style={{ fontFamily: 'Inter', fontSize: '14px' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-lg p-6">
                <TrustBadges />
              </div>
            </div>

            {/* Sidebar - Booking Summary */}
            <div className="col-span-1">
              <div className="bg-[#EFFFFE] rounded-lg p-6 sticky top-24">
                <h3 className="text-[#2D2D2D] mb-6" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '18px' }}>
                  Booking Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="pb-4 border-b border-[#D6C5A4]">
                    <p className="text-[#2D2D2D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                      Deluxe King Room
                    </p>
                    <p className="text-[#6C757D] text-xs" style={{ fontFamily: 'Inter' }}>
                      July 1 - July 3, 2026 (2 nights)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                        Room (2 nights)
                      </span>
                      <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                        ₦90,000
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                        Breakfast
                      </span>
                      <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                        ₦5,000
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter' }}>
                        Airport Transfer
                      </span>
                      <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                        ₦15,000
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[#6C757D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 py-2 px-3 border border-[#D6C5A4] rounded text-sm text-[#2D2D2D]"
                      style={{ fontFamily: 'Inter' }}
                    />
                    <button className="py-2 px-4 bg-white border border-[#B8860B] text-[#B8860B] rounded text-sm hover:bg-[#F8F6F2] transition-colors" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                      Apply
                    </button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-[#D6C5A4] mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '18px' }}>
                      Total
                    </span>
                    <span className="text-[#B8860B]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px' }}>
                      ₦110,000
                    </span>
                  </div>
                  <p className="text-[#6C757D] text-xs" style={{ fontFamily: 'Inter' }}>
                    Inclusive of all taxes
                  </p>
                </div>
                
                <button
                  onClick={handleComplete}
                  className="w-full py-3 px-6 bg-[#B8860B] text-white rounded-lg hover:bg-[#9A7209] transition-colors mb-4"
                  style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
                >
                  Complete Booking
                </button>
                
                <p className="text-[#6C757D] text-xs text-center" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                  By completing this booking, you agree to our Terms & Conditions and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}
