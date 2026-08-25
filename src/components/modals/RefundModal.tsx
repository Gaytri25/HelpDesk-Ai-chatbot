import React, { useState } from 'react';
import { X, RotateCcw, CheckCircle2, AlertCircle, ShieldCheck, DollarSign } from 'lucide-react';

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RefundModal: React.FC<RefundModalProps> = ({ isOpen, onClose }) => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('Not as expected');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [claimId, setClaimId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setClaimId(`REF-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 700);
  };

  const handleReset = () => {
    setOrderId('');
    setEmail('');
    setComments('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        id="modal-refund-request"
        className="w-full max-w-lg bg-[#FFFFFF] border border-[#E8E3DE] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8E3DE] bg-[#FAF9F7]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FDF2EE] border border-[#F6D5CC] rounded-lg">
              <RotateCcw className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#252525]">Refund & Returns Center</h3>
              <p className="text-xs text-[#6B6B6B]">30-Day Money-Back Guarantee Protection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B6B6B] hover:text-[#252525] hover:bg-[#E8E3DE]/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#3A7D44] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-[#252525]">30-Day Full Refund Guarantee</span>
                  <p className="text-[#6B6B6B] mt-0.5">
                    All software licenses and hardware purchases qualify for a 100% refund within 30 days of invoice date.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="refund-order-id" className="block text-xs font-semibold text-[#252525] mb-1.5">
                    Order or Invoice ID *
                  </label>
                  <input
                    id="refund-order-id"
                    type="text"
                    required
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. ORD-9482 or INV-1044"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="refund-email" className="block text-xs font-semibold text-[#252525] mb-1.5">
                    Billing Email Address *
                  </label>
                  <input
                    id="refund-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="billing@company.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="refund-reason" className="block text-xs font-semibold text-[#252525] mb-1.5">
                  Reason for Refund
                </label>
                <select
                  id="refund-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all cursor-pointer"
                >
                  <option value="Not as expected">Feature set did not fit our requirements</option>
                  <option value="Billing mistake">Accidental charge or duplicate renewal</option>
                  <option value="Switching software">Switching to alternative internal tooling</option>
                  <option value="Technical issues">Experienced technical integration blockage</option>
                  <option value="Other">Other reasons</option>
                </select>
              </div>

              <div>
                <label htmlFor="refund-comments" className="block text-xs font-semibold text-[#252525] mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="refund-comments"
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Help us improve with any feedback..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-[#6B6B6B] hover:text-[#252525] bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="btn-submit-refund"
                  type="submit"
                  disabled={isLoading || !orderId || !email}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#E76F51] hover:bg-[#C9573F] active:bg-[#B3462F] disabled:opacity-50 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  {isLoading ? 'Checking Eligibility...' : 'Submit Refund Request'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 mx-auto bg-[#EDF7ED] border border-[#BDE3BD] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#3A7D44]" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-[#252525]">Refund Claim Registered</h4>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  Order <strong className="text-[#252525]">{orderId}</strong> meets our 30-day guarantee terms.
                </p>
              </div>

              <div className="p-4 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#E8E3DE] pb-2">
                  <span className="text-[#6B6B6B]">Claim Reference</span>
                  <span className="font-mono font-bold text-[#E76F51]">{claimId}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E3DE] pb-2">
                  <span className="text-[#6B6B6B]">Estimated Processing Time</span>
                  <span className="font-semibold text-[#252525]">3 - 5 business days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Destination Account</span>
                  <span className="text-[#252525]">Original Payment Method</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#252525] hover:bg-[#3D3D3D] rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
