import { Link } from "react-router";

interface BookNowButtonProps {
  mobile?: boolean;
}

export default function BookNowButton({ mobile = false }: BookNowButtonProps) {
  if (mobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-[#D6C5A4]">
        <Link
          to="/booking/step1"
          className="block w-full py-4 px-8 bg-[#B8860B] text-white text-center rounded-lg hover:bg-[#9A7209] transition-colors"
          style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}
        >
          Book Now
        </Link>
      </div>
    );
  }

  return (
    <Link
      to="/booking/step1"
      className="fixed top-6 right-8 z-50 py-3 px-8 bg-[#B8860B] text-white rounded-lg hover:bg-[#9A7209] transition-colors shadow-lg"
      style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
    >
      Book Now
    </Link>
  );
}
