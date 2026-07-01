import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowPrompt(!showPrompt)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#B8860B] text-white rounded-full shadow-lg hover:bg-[#9A7209] transition-all flex items-center justify-center"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {showPrompt && (
        <div className="fixed bottom-24 right-8 z-50 w-80 bg-white rounded-lg shadow-xl p-4 border border-[#D6C5A4]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#B8860B] text-white rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#2D2D2D] mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                Aryhills Hotel
              </p>
              <p className="text-xs text-[#6C757D]" style={{ fontFamily: 'Inter' }}>
                Hello! How can we help you today? Send us a message to make an enquiry.
              </p>
              <a
                href="https://wa.me/2348050303270"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block w-full py-2 px-4 bg-[#25D366] text-white text-center text-xs rounded hover:bg-[#20BA5A] transition-colors"
                style={{ fontFamily: 'Inter', fontWeight: 600 }}
              >
                Start Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
