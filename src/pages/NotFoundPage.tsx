import React from 'react';
import { Bot, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="w-16 h-16 rounded-2xl bg-[#FAF9F7] border border-[#E8E3DE] flex items-center justify-center mb-4">
        <Bot className="w-8 h-8 text-[#E76F51]" />
      </div>
      <span className="text-xs font-mono font-bold text-[#E76F51] bg-[#FDF2EE] px-2.5 py-1 rounded-md mb-2">
        Error 404
      </span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#252525] mt-1">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2 max-w-sm">
        The page or section you are looking for has moved or is not part of this helpdesk system.
      </p>
      <button
        onClick={onGoHome}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#252525] hover:bg-[#3D3D3D] rounded-xl transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </button>
    </div>
  );
};
