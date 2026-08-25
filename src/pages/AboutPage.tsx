import React from 'react';
import { 
  Bot, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Sparkles, 
  BarChart3, 
  Cpu, 
  ArrowRight,
  Terminal,
  Code2
} from 'lucide-react';

interface AboutPageProps {
  onStartChat: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onStartChat }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF9F7] border border-[#E8E3DE] rounded-full text-xs font-semibold text-[#E76F51]">
          <Code2 className="w-3.5 h-3.5" />
          <span>System Architecture & Engineering Overview</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
          About HelpDesk AI
        </h1>
        <p className="text-base text-[#6B6B6B] leading-relaxed">
          A full-stack, enterprise customer support chatbot engineered with hybrid intent detection, predefined commercial retrieval, and signature interactive Smart Action Cards.
        </p>
      </div>

      {/* Core Engineering Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-[#E8E3DE] rounded-lg shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FAF9F7] border border-[#E8E3DE] rounded">
              <Cpu className="w-5 h-5 text-[#E76F51]" />
            </div>
            <h3 className="text-base font-bold text-[#252525]">1. Hybrid Intent Engine</h3>
          </div>
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            Combines strict pattern normalization, punctuation stripping, and token cosine similarity with contextual fallback. It accurately resolves common customer questions regardless of phrasing variations or typos.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#E8E3DE] rounded-lg shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FAF9F7] border border-[#E8E3DE] rounded">
              <Zap className="w-5 h-5 text-[#E76F51]" />
            </div>
            <h3 className="text-base font-bold text-[#252525]">2. Smart Action Cards</h3>
          </div>
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            Rather than just returning passive text, HelpDesk AI renders signature actionable cards directly in the chat stream—triggering instant password resets, real-time courier order trackers, refund claims, and pricing calculators.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#E8E3DE] rounded-lg shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FAF9F7] border border-[#E8E3DE] rounded">
              <ShieldCheck className="w-5 h-5 text-[#3A7D44]" />
            </div>
            <h3 className="text-base font-bold text-[#252525]">3. Zero AI Hallucination Guardrails</h3>
          </div>
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            When queries fall outside exact patterns, the fallback model uses strict system prompts that ground answers in company facts without inventing unauthorized discount codes or non-existent warranties.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#E8E3DE] rounded-lg shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FAF9F7] border border-[#E8E3DE] rounded">
              <BarChart3 className="w-5 h-5 text-[#252525]" />
            </div>
            <h3 className="text-base font-bold text-[#252525]">4. Analytics & Quality Feedback</h3>
          </div>
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            Tracks total conversations, response speeds, positive/negative ratings, and escalated human support tickets. Allows support leaders to spot trending customer pain points in real time.
          </p>
        </div>
      </div>

      {/* System Quality Checklist */}
      <div className="p-6 sm:p-8 bg-white border border-[#E8E3DE] rounded-lg shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-[#252525] border-b border-[#E8E3DE] pb-3">
          Enterprise Customer Support Standards & Capabilities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            'Understands common commercial customer questions',
            'Gives instant, sub-second responses',
            'Uses predefined commercial knowledge (40+ items)',
            'Handles phrasing variations & typo-tolerant matching',
            'Provides structured, useful answers without generic filler',
            'Guides users with Smart Action Cards & navigation',
            'Gracefully handles unknown questions with human escalation',
            'Maintains conversational context across turn exchanges',
            'Offers contextual suggested follow-up chips',
            'Tracks conversation analytics, feedback, and SLA speed'
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#3A7D44] shrink-0 mt-0.5" />
              <span className="text-[#252525] font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-6 bg-[#FAF9F7] border border-[#E8E3DE] rounded-lg text-center space-y-4">
        <h3 className="text-lg font-bold text-[#252525]">Ready to test the live support experience?</h3>
        <p className="text-xs text-[#6B6B6B] max-w-md mx-auto">
          Start a live conversation and test everything from business hours to complex refund claims.
        </p>
        <button
          onClick={onStartChat}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#E76F51] hover:bg-[#C9573F] rounded shadow-xs transition-colors cursor-pointer"
        >
          <span>Open Chat Window</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
