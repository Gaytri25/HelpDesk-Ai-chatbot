import React, { useState } from 'react';
import { X, ThumbsDown, CheckCircle2, Send, MessageSquare } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageId: string;
  userQuery: string;
  onSubmit: (reason: string, comment: string) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  messageId,
  userQuery,
  onSubmit
}) => {
  const [reason, setReason] = useState<'incorrect' | 'irrelevant' | 'complicated' | 'other'>('incorrect');
  const [comment, setComment] = useState('');
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reason, comment);
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        id="modal-feedback-issue"
        className="w-full max-w-md bg-[#FFFFFF] border border-[#E8E3DE] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8E3DE] bg-[#FAF9F7]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FDF2EE] border border-[#F6D5CC] rounded-lg">
              <ThumbsDown className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#252525]">What went wrong?</h3>
              <p className="text-xs text-[#6B6B6B]">Help us train and improve HelpDesk AI</p>
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
          {!isDone ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-xs">
                <span className="text-[#6B6B6B] block">Query in question:</span>
                <span className="font-semibold text-[#252525] italic">"{userQuery}"</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-2">
                  Select primary issue:
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'incorrect', label: 'Incorrect answer or policy detail' },
                    { id: 'irrelevant', label: 'Not relevant to my question' },
                    { id: 'complicated', label: 'Too complicated or lengthy' },
                    { id: 'other', label: 'Other issue' }
                  ].map((opt) => (
                    <label 
                      key={opt.id}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        reason === opt.id 
                          ? 'bg-[#FAF9F7] border-[#E76F51] text-[#252525] font-semibold ring-1 ring-[#E76F51]' 
                          : 'bg-[#FFFFFF] border-[#E8E3DE] text-[#6B6B6B] hover:border-[#D8D2CB]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="feedback-reason"
                        value={opt.id}
                        checked={reason === opt.id}
                        onChange={() => setReason(opt.id as any)}
                        className="accent-[#E76F51]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="feedback-comment" className="block text-xs font-semibold text-[#252525] mb-1.5">
                  How can we make this better? (Optional)
                </label>
                <textarea
                  id="feedback-comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Expected answer or details..."
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
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#E76F51] hover:bg-[#C9573F] active:bg-[#B3462F] rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  <span>Submit Feedback</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 mx-auto bg-[#EDF7ED] border border-[#BDE3BD] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#3A7D44]" />
              </div>
              <h4 className="text-base font-semibold text-[#252525]">Feedback Recorded</h4>
              <p className="text-xs text-[#6B6B6B]">
                Thank you. Your feedback has been sent to our AI training & QA log.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
