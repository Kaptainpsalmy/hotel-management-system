import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  rating: number;
  quote: string;
}

export default function TestimonialCard({ name, rating, quote }: TestimonialCardProps) {
  return (
    <div className="bg-[#EFFFFE] rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 bg-[#D6C5A4] rounded-full flex items-center justify-center text-[#4E342E]" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
          {name.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="text-[#2D2D2D] mb-1" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
            {name}
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < rating ? 'text-[#B8860B] fill-[#B8860B]' : 'text-[#D6C5A4]'}`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-[#6C757D] text-sm" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
        "{quote}"
      </p>
    </div>
  );
}
