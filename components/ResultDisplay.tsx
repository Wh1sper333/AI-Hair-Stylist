import React from 'react';
import { Download, RefreshCw, Wand2 } from 'lucide-react';

interface ResultDisplayProps {
  resultImage: string | null;
  textAnalysis: string | null;
  isGenerating: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  resultImage,
  textAnalysis,
  isGenerating
}) => {
  if (isGenerating) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-zinc-900/30 rounded-xl border border-zinc-800 animate-pulse">
        <Wand2 className="w-12 h-12 text-violet-500 mb-4 animate-bounce" />
        <h3 className="text-zinc-200 font-medium text-lg">AI 正在设计中...</h3>
        <p className="text-zinc-500 text-sm mt-2">正在分析脸型并生成发型</p>
      </div>
    );
  }

  if (!resultImage) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-zinc-900/30 rounded-xl border-2 border-dashed border-zinc-800 text-zinc-600">
        <p>你的新造型将在这里展示</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-zinc-700 bg-zinc-950 group">
        <img 
          src={resultImage} 
          alt="Generated Hairstyle" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a 
              href={resultImage} 
              download="new-hairstyle.png"
              className="bg-zinc-900/80 hover:bg-zinc-800 text-white p-2.5 rounded-full backdrop-blur-md shadow-lg border border-zinc-700"
              title="下载图片"
            >
              <Download className="w-5 h-5" />
            </a>
        </div>
        
        <div className="absolute bottom-3 left-3 bg-violet-600/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg font-medium">
          AI 生成效果 (AI Generated)
        </div>
      </div>

      {textAnalysis && (
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-4 h-4 text-violet-400" />
            <h4 className="text-sm font-semibold text-zinc-200">发型师建议 (Analysis)</h4>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {textAnalysis}
          </p>
        </div>
      )}
    </div>
  );
};