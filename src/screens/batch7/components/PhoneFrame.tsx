import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative mx-auto" style={{ width: '395px', height: '832px' }}>
      {/* Phone Frame */}
      <div className="absolute inset-0 bg-[#1F1F1F] rounded-[40px] shadow-2xl p-2">
        <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1F1F1F] rounded-b-2xl z-50"></div>
          
          {/* Screen Content */}
          <div className="w-full h-full overflow-auto bg-[#F8F6F2]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
