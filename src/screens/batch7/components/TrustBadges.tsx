import { Shield, Star, CreditCard } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-[#2E7D32]" />
        <span className="text-xs text-[#6C757D]" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
          Secure Checkout
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-4 h-4 text-[#B8860B] fill-[#B8860B]" />
          ))}
          <Star className="w-4 h-4 text-[#B8860B]" />
        </div>
        <span className="text-xs text-[#6C757D]" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
          4.2/5 Rating
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="px-2 py-1 bg-[#F8F6F2] rounded text-xs text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
          Paystack
        </div>
        <div className="px-2 py-1 bg-[#F8F6F2] rounded text-xs text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
          Flutterwave
        </div>
        <CreditCard className="w-5 h-5 text-[#6C757D]" />
      </div>
    </div>
  );
}
