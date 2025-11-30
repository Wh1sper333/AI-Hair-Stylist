import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { Controls } from './components/Controls';
import { ResultDisplay } from './components/ResultDisplay';
import { StylistOptions, Gender } from './types';
import { generateHairstyle } from './services/geminiService';
import { HAIR_STYLES } from './data/hairStyles';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [textAnalysis, setTextAnalysis] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Default to Female, first style in list
  const [options, setOptions] = useState<StylistOptions>({
    gender: Gender.FEMALE,
    styleId: HAIR_STYLES[Gender.FEMALE][0].id,
    color: '#3b2417', // Dark Brown default
    refinements: {
      bangs: 'None',
      volume: 'Natural',
      rootLift: 'Natural',
      quality: 'Normal'
    }
  });

  const handleImageSelected = (base64: string) => {
    setSelectedImage(base64);
    setResultImage(null);
    setTextAnalysis(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setResultImage(null);
    setTextAnalysis(null);
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    // Check if API key is present (simple check)
    if (!process.env.API_KEY) {
      alert("配置错误：未找到 API Key。请在 Vercel 环境变量中设置 API_KEY。\n(Configuration Error: API_KEY not found)");
      return;
    }

    setIsGenerating(true);
    setResultImage(null);
    setTextAnalysis(null);

    try {
      const result = await generateHairstyle(selectedImage, options);
      setResultImage(result.imageUrl);
      setTextAnalysis(result.textAnalysis);
    } catch (error: any) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "未知错误 (Unknown error)";
      const errorString = String(error);
      
      // Improve user experience for common errors
      if (errorMessage.includes("API key not valid")) {
         alert("API Key 无效，请检查 Vercel 设置。\n(Invalid API Key)");
      } else if (errorMessage.includes("SAFETY")) {
         alert("图片因安全策略被拦截，请尝试更换照片。\n(Image blocked by safety filters)");
      } else if (errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("Quota")) {
         alert("API 配额已耗尽。Gemini 免费版每分钟有请求限制，请稍后再试。\n(API Quota Exceeded. Please try again later.)");
      } else {
         alert(`生成失败 (Failed): ${errorMessage}`);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-violet-500/30 pb-safe">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Upload & Controls */}
          <div className="lg:col-span-5 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-zinc-200 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 text-xs font-bold text-zinc-400">1</span>
                上传照片 (Upload)
              </h2>
              <ImageUploader 
                selectedImage={selectedImage}
                onImageSelected={handleImageSelected}
                onClear={handleClearImage}
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-zinc-200 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 text-xs font-bold text-zinc-400">2</span>
                定制发型 (Customize)
              </h2>
              <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
                <Controls 
                  options={options} 
                  setOptions={setOptions}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  disabled={!selectedImage}
                />
              </div>
            </section>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
             <h2 className="text-xl font-semibold mb-4 text-zinc-200 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 text-xs font-bold text-zinc-400">3</span>
                效果预览 (Preview)
              </h2>
            <ResultDisplay 
              resultImage={resultImage}
              textAnalysis={textAnalysis}
              isGenerating={isGenerating}
            />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;