import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, User, HelpCircle, AlertCircle } from 'lucide-react';
import { SupportTicket } from '../../types';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const ContactFormModal: React.FC<ContactFormModalProps> = ({ 
  isOpen, 
  onClose,
  initialCategory = 'General Inquiry'
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTicket, setCreatedTicket] = useState<SupportTicket | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          category,
          priority,
          subject,
          message
        })
      });

      const data = await res.json();
      if (res.ok && data.ticket) {
        setCreatedTicket(data.ticket);
      } else {
        setErrorMessage(data.error || 'Failed to submit support ticket.');
      }
    } catch (err) {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setCreatedTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        id="modal-contact-support"
        className="w-full max-w-lg bg-[#FFFFFF] border border-[#E8E3DE] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8E3DE] bg-[#FAF9F7]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FDF2EE] border border-[#F6D5CC] rounded-lg">
              <Mail className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#252525]">Contact Customer Support</h3>
              <p className="text-xs text-[#6B6B6B]">Submit a ticket to our human engineering & support desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B6B6B] hover:text-[#252525] hover:bg-[#E8E3DE]/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {!createdTicket ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-[#FDF2F2] border border-[#F5C6CB] rounded-xl flex items-center gap-2 text-xs text-[#721C24]">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="ticket-name" className="block text-xs font-semibold text-[#252525] mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="ticket-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ticket-email" className="block text-xs font-semibold text-[#252525] mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="ticket-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="ticket-category" className="block text-xs font-semibold text-[#252525] mb-1.5">
                    Category
                  </label>
                  <select
                    id="ticket-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Billing & Invoicing">Billing & Invoicing</option>
                    <option value="Refund Request">Refund Request</option>
                    <option value="Order & Delivery">Order & Delivery</option>
                    <option value="Technical & Integration">Technical & Integration</option>
                    <option value="Account & Security">Account & Security</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ticket-priority" className="block text-xs font-semibold text-[#252525] mb-1.5">
                    Urgency Level
                  </label>
                  <select
                    id="ticket-priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all cursor-pointer"
                  >
                    <option value="low">Low (Standard response)</option>
                    <option value="medium">Medium (Within 4 business hours)</option>
                    <option value="high">High (Priority)</option>
                    <option value="urgent">Urgent (System down)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="ticket-subject" className="block text-xs font-semibold text-[#252525] mb-1.5">
                  Subject *
                </label>
                <input
                  id="ticket-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Assistance needed with webhook endpoint"
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all"
                />
              </div>

              <div>
                <label htmlFor="ticket-message" className="block text-xs font-semibold text-[#252525] mb-1.5">
                  Message Details *
                </label>
                <textarea
                  id="ticket-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide as much context as possible..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-[#6B6B6B]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Guaranteed response within SLA</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-semibold text-[#6B6B6B] hover:text-[#252525] bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    id="btn-submit-ticket"
                    type="submit"
                    disabled={isSubmitting || !email || !subject || !message}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#E76F51] hover:bg-[#C9573F] active:bg-[#B3462F] disabled:opacity-50 rounded-xl transition-colors shadow-xs cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting...' : 'Create Support Ticket'}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 mx-auto bg-[#EDF7ED] border border-[#BDE3BD] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#3A7D44]" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-[#252525]">Support Ticket Created</h4>
                <p className="text-xs text-[#6B6B6B] mt-1">
                  Your ticket has been queued in our human support triage system.
                </p>
              </div>

              <div className="p-4 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-left space-y-2">
                <div className="flex items-center justify-between border-b border-[#E8E3DE] pb-2">
                  <span className="text-xs font-medium text-[#6B6B6B]">Ticket Number</span>
                  <span className="font-mono text-xs font-bold text-[#E76F51]">{createdTicket.id}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E8E3DE] pb-2">
                  <span className="text-xs font-medium text-[#6B6B6B]">Subject</span>
                  <span className="text-xs font-semibold text-[#252525] truncate max-w-[200px]">{createdTicket.subject}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E8E3DE] pb-2">
                  <span className="text-xs font-medium text-[#6B6B6B]">Status</span>
                  <span className="text-[11px] font-semibold text-[#3A7D44] bg-[#EDF7ED] px-2 py-0.5 rounded-sm">
                    Open - Queued
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#6B6B6B]">Target Response</span>
                  <span className="text-xs text-[#252525]">Under 2 hours</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#252525] hover:bg-[#3D3D3D] rounded-xl transition-colors cursor-pointer"
              >
                Back to Conversation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
