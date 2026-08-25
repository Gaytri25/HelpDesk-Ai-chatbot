import React from 'react';
import { X, Clock, Calendar, Phone, Mail, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HoursModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HoursModal: React.FC<HoursModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Check if live hours currently open (Mon-Fri 8am-8pm EST, Sat 9am-5pm EST)
  const now = new Date();
  const utcHours = now.getUTCHours();
  const estHours = (utcHours - 5 + 24) % 24; // Simple EST approx
  const day = now.getUTCDay(); // 0 is Sunday, 6 is Saturday

  let isOpenNow = false;
  if (day >= 1 && day <= 5) {
    isOpenNow = estHours >= 8 && estHours < 20;
  } else if (day === 6) {
    isOpenNow = estHours >= 9 && estHours < 17;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        id="modal-support-hours"
        className="w-full max-w-md bg-[#FFFFFF] border border-[#E8E3DE] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8E3DE] bg-[#FAF9F7]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FDF2EE] border border-[#F6D5CC] rounded-lg">
              <Clock className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#252525]">Support Hours & Status</h3>
              <p className="text-xs text-[#6B6B6B]">Global Customer Success Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B6B6B] hover:text-[#252525] hover:bg-[#E8E3DE]/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Status Badge */}
          <div className="flex items-center justify-between p-3.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl">
            <div className="flex items-center gap-2.5">
              <div className={`w-3 h-3 rounded-full ${isOpenNow ? 'bg-[#3A7D44] animate-pulse' : 'bg-[#E76F51]'}`} />
              <span className="text-xs font-semibold text-[#252525]">
                {isOpenNow ? 'Live Support Desk is OPEN' : 'After-Hours (Automated AI Active)'}
              </span>
            </div>
            <span className="text-[11px] text-[#6B6B6B]">Timezone: EST</span>
          </div>

          {/* Schedule Table */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-[#252525] uppercase tracking-wider text-[11px]">
              Weekly Coverage
            </h4>
            <div className="border border-[#E8E3DE] rounded-xl divide-y divide-[#E8E3DE] overflow-hidden">
              <div className="p-3 bg-[#FFFFFF] flex justify-between items-center">
                <span className="font-medium text-[#252525]">Monday – Friday</span>
                <span className="text-[#6B6B6B]">8:00 AM – 8:00 PM EST</span>
              </div>
              <div className="p-3 bg-[#FFFFFF] flex justify-between items-center">
                <span className="font-medium text-[#252525]">Saturday</span>
                <span className="text-[#6B6B6B]">9:00 AM – 5:00 PM EST</span>
              </div>
              <div className="p-3 bg-[#FAF9F7] flex justify-between items-center">
                <span className="font-medium text-[#252525]">Sunday & Major Holidays</span>
                <span className="text-[#E76F51] font-semibold">HelpDesk AI 24/7 + Urgent On-Call</span>
              </div>
            </div>
          </div>

          {/* Direct channels */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-[#252525] uppercase tracking-wider text-[11px]">
              Direct Contact Lines
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-3 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E76F51] shrink-0" />
                <div>
                  <span className="text-[11px] text-[#6B6B6B] block">Toll-Free Phone</span>
                  <span className="font-semibold text-[#252525]">1-800-555-0199</span>
                </div>
              </div>
              <div className="p-3 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E76F51] shrink-0" />
                <div>
                  <span className="text-[11px] text-[#6B6B6B] block">Email Desk</span>
                  <span className="font-semibold text-[#252525]">support@helpdeskai.com</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-white bg-[#252525] hover:bg-[#3D3D3D] rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
