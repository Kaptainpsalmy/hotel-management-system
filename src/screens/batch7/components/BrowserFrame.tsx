import { ArrowLeft, ArrowRight, RotateCw, Lock } from "lucide-react";
import { ReactNode } from "react";

interface BrowserFrameProps {
  children: ReactNode;
  url?: string;
}

export default function BrowserFrame({ children, url = "aryhillshotel.com" }: BrowserFrameProps) {
  return (
    <div className="w-[1440px] mx-auto bg-[#E5E7EB] rounded-lg shadow-2xl overflow-hidden">
      {/* Browser Chrome */}
      <div className="bg-white border-b border-gray-300">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28CA42]"></div>
          </div>
          <div className="flex gap-2 ml-4">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 mx-4 bg-[#F3F4F6] rounded-full px-4 py-1.5 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-sm text-gray-700" style={{ fontFamily: 'Inter' }}>
              {url}
            </span>
          </div>
        </div>
      </div>
      
      {/* Browser Content */}
      <div className="bg-[#F8F6F2] overflow-auto" style={{ maxHeight: '900px' }}>
        {children}
      </div>
    </div>
  );
}
