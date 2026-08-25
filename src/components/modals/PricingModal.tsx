import React, { useState } from 'react';
import { X, CreditCard, Check, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planName: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  if (!isOpen) return null;

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for small websites and early stage startups.',
      monthlyPrice: 29,
      annualPrice: 24,
      chats: '1,000 chats / mo',
      features: [
        '1 Website domain',
        'Standard intent recognition',
        'Predefined knowledge retrieval',
        'Email customer support',
        'Community analytics',
        'Standard SLA'
      ],
      badge: null,
      highlight: false
    },
    {
      name: 'Professional',
      description: 'Best for growing commercial e-commerce & SaaS businesses.',
      monthlyPrice: 79,
      annualPrice: 64,
      chats: '10,000 chats / mo',
      features: [
        '3 Website domains',
        'Advanced hybrid AI fallback',
        'Custom knowledge training sandbox',
        'Smart Action cards integration',
        'Live agent ticketing handoff',
        'Priority 4-hour SLA response',
        'Full analytics exports'
      ],
      badge: 'Most Popular',
      highlight: true
    },
    {
      name: 'Enterprise',
      description: 'For high-volume brands requiring custom SLAs & integrations.',
      monthlyPrice: 199,
      annualPrice: 159,
      chats: 'Unlimited volume',
      features: [
        'Unlimited domains & seats',
        'Dedicated API endpoint & SLA (99.95%)',
        'Custom CRM & webhook integrations',
        'SOC-2 Type II audit report',
        'Dedicated account manager',
        'Custom voice & branding styles',
        '15-minute emergency SLA'
      ],
      badge: 'Scalable',
      highlight: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        id="modal-pricing"
        className="w-full max-w-4xl bg-[#FFFFFF] border border-[#E8E3DE] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8E3DE] bg-[#FAF9F7]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FDF2EE] border border-[#F6D5CC] rounded-lg">
              <CreditCard className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#252525]">HelpDesk AI Pricing Plans</h3>
              <p className="text-xs text-[#6B6B6B]">Simple, transparent pricing. 14-day free trial on all tiers.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B6B6B] hover:text-[#252525] hover:bg-[#E8E3DE]/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Billing Interval Toggle */}
          <div className="flex items-center justify-center">
            <div className="p-1 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  !isAnnual ? 'bg-[#FFFFFF] text-[#252525] shadow-xs' : 'text-[#6B6B6B] hover:text-[#252525]'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  isAnnual ? 'bg-[#FFFFFF] text-[#252525] shadow-xs' : 'text-[#6B6B6B] hover:text-[#252525]'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] font-bold text-[#3A7D44] bg-[#EDF7ED] px-1.5 py-0.5 rounded-sm">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              return (
                <div
                  key={plan.name}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    plan.highlight
                      ? 'bg-[#FAF9F7] border-[#E76F51] ring-1 ring-[#E76F51] shadow-md relative'
                      : 'bg-[#FFFFFF] border-[#E8E3DE] shadow-xs hover:border-[#D8D2CB]'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E76F51] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <h4 className="text-base font-bold text-[#252525]">{plan.name}</h4>
                    <p className="text-xs text-[#6B6B6B] mt-1 min-h-[32px]">{plan.description}</p>

                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#252525]">${price}</span>
                      <span className="text-xs text-[#6B6B6B]">/ month</span>
                    </div>
                    <span className="inline-block mt-1 text-[11px] font-medium text-[#E76F51] bg-[#FDF2EE] px-2 py-0.5 rounded-sm">
                      {plan.chats}
                    </span>

                    <div className="mt-5 pt-4 border-t border-[#E8E3DE] space-y-2.5">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#252525]">
                          <Check className="w-3.5 h-3.5 text-[#3A7D44] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8E3DE]">
                    <button
                      onClick={() => {
                        onSelectPlan?.(plan.name);
                        onClose();
                      }}
                      className={`w-full py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        plan.highlight
                          ? 'bg-[#E76F51] hover:bg-[#C9573F] text-white shadow-xs'
                          : 'bg-[#252525] hover:bg-[#3D3D3D] text-white'
                      }`}
                    >
                      <span>Start 14-Day Free Trial</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[10px] text-center text-[#6B6B6B] mt-2">
                      No credit card required. Cancel anytime.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#3A7D44]" />
              <span className="text-[#252525] font-medium">All plans backed by 30-Day Money Back Guarantee</span>
            </div>
            <span className="text-[#6B6B6B]">Non-profit & educational discounts available (35% off)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
