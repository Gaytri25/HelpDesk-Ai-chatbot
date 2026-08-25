import React from 'react';
import { Headphones, Heart, Shield, Terminal, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNav: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNav }) => {
  return (
    <footer className="border-t border-[#E8E3DE] bg-[#FFFFFF] py-8 text-xs text-[#6B6B6B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#252525] flex items-center justify-center text-white border border-[#3D3D3D]">
              <Headphones className="w-4 h-4 text-[#E76F51]" />
            </div>
            <div>
              <span className="font-bold text-[#252525]">HelpDesk<span className="text-[#E76F51]">.AI</span></span>
              <span className="ml-2 text-[11px] text-[#6B6B6B]">Intelligent Website Customer Support System</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button onClick={() => onNav('home')} className="hover:text-[#252525] cursor-pointer">Home</button>
            <button onClick={() => onNav('chat')} className="hover:text-[#252525] cursor-pointer">Live Chat</button>
            <button onClick={() => onNav('knowledge')} className="hover:text-[#252525] cursor-pointer">Knowledge Base</button>
            <button onClick={() => onNav('analytics')} className="hover:text-[#252525] cursor-pointer">Analytics</button>
            <button onClick={() => onNav('training')} className="hover:text-[#252525] cursor-pointer">Training</button>
            <button onClick={() => onNav('about')} className="hover:text-[#252525] cursor-pointer">About</button>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <Shield className="w-3.5 h-3.5 text-[#3A7D44]" />
            <span>Commercial Intent Guardrails Active</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E8E3DE] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <span>© {new Date().getFullYear()} HelpDesk AI Systems. Automated Customer Support Platform.</span>
          <span className="text-[#9E9E9E]">Hybrid Retrieval • Smart Action Cards • Sub-second Latency</span>
        </div>
      </div>
    </footer>
  );
};
