import React from 'react';
import { Scissors } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="p-2 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-lg shadow-lg shadow-violet-500/20">
          <Scissors className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            AI 托尼老师 (AI Hair Stylist)
          </h1>
          <p className="text-xs text-zinc-500 font-medium tracking-wide">
            POWERED BY GEMINI 2.0 (AUTO-SWITCH)
          </p>
        </div>
      </div>
    </header>
  );
};