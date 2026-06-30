import { Wifi, Coffee, Tv, Wind } from "lucide-react";
import { Link } from "react-router";

interface RoomCardProps {
  title: string;
  image: string;
  price: number;
  amenities?: string[];
  available?: number;
}

export default function RoomCard({ title, image, price, amenities, available }: RoomCardProps) {
  const amenityIcons: Record<string, any> = {
    wifi: Wifi,
    coffee: Coffee,
    tv: Tv,
    ac: Wind,
  };

  const defaultAmenities = amenities || ['wifi', 'coffee', 'tv', 'ac'];

  return (
    <div className="bg-[#EFFFFE] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {available && available <= 5 && (
          <div className="absolute top-3 right-3 bg-[#F4A300] text-white px-3 py-1 rounded-full text-xs" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
            {available} rooms left
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-[#2D2D2D] mb-3" style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '18px' }}>
          {title}
        </h3>
        <div className="flex gap-3 mb-4">
          {defaultAmenities.slice(0, 4).map((amenity, index) => {
            const Icon = amenityIcons[amenity] || Wifi;
            return (
              <div key={index} className="w-8 h-8 bg-[#F8F6F2] rounded-full flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#6C757D]" />
              </div>
            );
          })}
        </div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[#2D2D2D]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px' }}>
              ₦{price.toLocaleString()}
            </span>
            <span className="text-[#6C757D] text-sm ml-1" style={{ fontFamily: 'Inter' }}>
              / night
            </span>
          </div>
        </div>
        <Link
          to="/booking/step1"
          className="block w-full py-3 px-6 bg-[#B8860B] text-white text-center rounded-lg hover:bg-[#9A7209] transition-colors"
          style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
        >
          Book This Room
        </Link>
      </div>
    </div>
  );
}
