import React from 'react';
import { 
  MessageSquare, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Sliders, 
  Clock, 
  FileText,
  MousePointerClick
} from 'lucide-react';

interface HomePageProps {
  onStartChatWithQuery: (query?: string) => void;
  onExploreKB: () => void;
  onOpenTraining: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onStartChatWithQuery, 
  onExploreKB,
  onOpenTraining
}) => {
  const popularQuestions = [
    {
      question: 'What are your business hours?',
      category: 'Business Hours',
      intent: 'BUSINESS_HOURS'
    },
    {
      question: 'How can I contact support?',
      category: 'Contact',
      intent: 'CONTACT_SUPPORT'
    },
    {
      question: 'What is your refund policy?',
      category: 'Refunds',
      intent: 'REFUND'
    },
    {
      question: 'How long does delivery take?',
      category: 'Delivery',
      intent: 'DELIVERY'
    },
    {
      question: 'How can I update my account?',
      category: 'Account',
      intent: 'ACCOUNT'
    },
    {
      question: 'How do I reset my password?',
      category: 'Security',
      intent: 'PASSWORD_RESET'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Section */}
      <section className="pt-8 sm:pt-14 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E3DE] text-xs font-semibold text-[#252525] shadow-xs mb-6 animate-in fade-in duration-300">
          <span className="w-2 h-2 rounded-full bg-[#3A7D44] animate-pulse" />
          <span>24/7 Instant Support Assistant</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#252525] tracking-tight leading-[1.15]">
          Support customers <span className="text-[#E76F51]">instantly</span>.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
          An intelligent website chatbot that answers common questions, guides customers, and reduces repetitive support requests.
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <button
            id="btn-hero-start-chat"
            onClick={() => onStartChatWithQuery()}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#E76F51] hover:bg-[#C9573F] active:bg-[#B3462F] rounded shadow-xs transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Start Chat</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-hero-explore-kb"
            onClick={onExploreKB}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#252525] bg-white hover:bg-[#FAF9F7] active:bg-[#F3EFEA] border border-[#E8E3DE] rounded shadow-xs transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#6B6B6B]" />
            <span>Explore Knowledge Base</span>
          </button>
        </div>
      </section>

      {/* 2. How It Works Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#E76F51]">
            Automated Support Lifecycle
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold text-[#252525] mt-1">
            How HelpDesk AI Works
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="p-6 bg-white border border-[#E8E3DE] rounded-lg shadow-xs space-y-3 relative hover:border-[#D8D2CB] transition-all">
            <div className="w-8 h-8 rounded bg-[#FAF9F7] border border-[#E8E3DE] flex items-center justify-center text-xs font-bold text-[#E76F51]">
              1
            </div>
            <h4 className="text-base font-bold text-[#252525]">Ask</h4>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Customers ask questions naturally using everyday phrasing, voice, or typo-laden questions without needing exact keyword syntax.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-white border border-[#E8E3DE] rounded-lg shadow-xs space-y-3 relative hover:border-[#D8D2CB] transition-all">
            <div className="w-8 h-8 rounded bg-[#FAF9F7] border border-[#E8E3DE] flex items-center justify-center text-xs font-bold text-[#E76F51]">
              2
            </div>
            <h4 className="text-base font-bold text-[#252525]">Understand</h4>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              The hybrid AI engine normalizes terms, classifies the underlying intent, and calculates token similarity against verified commercial data.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-white border border-[#E8E3DE] rounded-lg shadow-xs space-y-3 relative hover:border-[#D8D2CB] transition-all">
            <div className="w-8 h-8 rounded bg-[#FAF9F7] border border-[#E8E3DE] flex items-center justify-center text-xs font-bold text-[#E76F51]">
              3
            </div>
            <h4 className="text-base font-bold text-[#252525]">Resolve</h4>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              Provides verified policy answers and triggers interactive Smart Action Cards (e.g. Reset Password, Track Order, View Refunds) for instant task completion.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Popular Questions (6 Clickable Cards) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#E76F51]">
              Instant Demonstrations
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-[#252525] mt-1">
              Popular Questions
            </h3>
            <p className="text-xs text-[#6B6B6B] mt-0.5">
              Click any question below to test the chatbot's instant intent recognition and Smart Action cards:
            </p>
          </div>

          <button
            onClick={onExploreKB}
            className="text-xs font-semibold text-[#E76F51] hover:text-[#C9573F] flex items-center gap-1 cursor-pointer"
          >
            <span>View All 40+ FAQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {popularQuestions.map((item, idx) => (
            <button
              key={idx}
              id={`popular-q-${idx}`}
              onClick={() => onStartChatWithQuery(item.question)}
              className="p-4 bg-white border border-[#E8E3DE] rounded-lg text-left hover:border-[#E76F51] hover:bg-[#FAF9F7] transition-all shadow-xs group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B6B6B] bg-[#FAF9F7] border border-[#E8E3DE] px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <h4 className="text-sm font-semibold text-[#252525] mt-2 group-hover:text-[#E76F51] transition-colors leading-snug">
                  "{item.question}"
                </h4>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-[#6B6B6B] group-hover:text-[#E76F51] font-medium pt-2 border-t border-[#E8E3DE]/60">
                <span className="flex items-center gap-1">
                  <MousePointerClick className="w-3 h-3" />
                  <span>Ask in Chat</span>
                </span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Signature Highlights Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-6 sm:p-8 bg-[#FAF9F7] border border-[#E8E3DE] rounded-lg shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-white border border-[#E8E3DE] rounded shrink-0">
                <Zap className="w-5 h-5 text-[#E76F51]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#252525]">Smart Action Cards</h4>
                <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                  Goes beyond text. Triggers interactive modals for password resets, order tracking, refund claims, and pricing calculators.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-white border border-[#E8E3DE] rounded shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#3A7D44]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#252525]">Zero AI Hallucinations</h4>
                <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                  Strictly prioritizes verified commercial knowledge base answers. Never invents company policies or custom pricing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-white border border-[#E8E3DE] rounded shrink-0">
                <Sliders className="w-5 h-5 text-[#E76F51]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#252525]">Training Sandbox</h4>
                <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                  Live admin console to test query normalization, adjust trigger patterns, and monitor intent classification in real time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
