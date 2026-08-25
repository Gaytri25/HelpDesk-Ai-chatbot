import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mockToken, setMockToken] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setMockToken(`rst_${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
    }, 600);
  };

  const handleReset = () => {
    setEmail('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        id="modal-reset-password"
        className="w-full max-w-md bg-[#FFFFFF] border border-[#E8E3DE] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8E3DE] bg-[#FAF9F7]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FDF2EE] border border-[#F6D5CC] rounded-lg">
              <KeyRound className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#252525]">Reset Your Password</h3>
              <p className="text-xs text-[#6B6B6B]">HelpDesk AI Security System</p>
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
              <div>
                <label htmlFor="reset-email" className="block text-xs font-semibold text-[#252525] mb-1.5">
                  Account Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="reset-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#6B6B6B] mt-1.5">
                  We will dispatch a secure 60-minute password recovery link.
                </p>
              </div>

              <div className="p-3 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#3A7D44] shrink-0 mt-0.5" />
                <p className="text-xs text-[#6B6B6B]">
                  Your session is protected with end-to-end encryption. No plaintext passwords are ever stored.
                </p>
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
                  id="btn-submit-reset-password"
                  type="submit"
                  disabled={isLoading || !email}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#E76F51] hover:bg-[#C9573F] active:bg-[#B3462F] disabled:opacity-50 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  {isLoading ? 'Verifying...' : 'Send Recovery Link'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-3 space-y-4">
              <div className="w-12 h-12 mx-auto bg-[#EDF7ED] border border-[#BDE3BD] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#3A7D44]" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-[#252525]">Recovery Link Dispatched</h4>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  We have sent reset instructions to <strong className="text-[#252525]">{email}</strong>.
                </p>
              </div>

              <div className="p-3.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-left">
                <div className="text-[11px] font-semibold text-[#6B6B6B] uppercase">Security Token ID</div>
                <div className="font-mono text-xs font-bold text-[#252525] mt-0.5">{mockToken}</div>
                <p className="text-[11px] text-[#6B6B6B] mt-1">Check your inbox or spam folder within 2 minutes.</p>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#252525] hover:bg-[#3D3D3D] rounded-xl transition-colors cursor-pointer"
              >
                Return to Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
