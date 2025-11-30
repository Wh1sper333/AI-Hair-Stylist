import React, { useState, useMemo } from 'react';
import { StylistOptions, Gender, BangStyle, HairVolume, RootLift, HairLength, HairTexture, HairQuality } from '../types';
import { HAIR_STYLES, PRESET_COLORS } from '../data/hairStyles';
import { Sparkles, Settings2, Check, Filter } from 'lucide-react';

interface ControlsProps {
  options: StylistOptions;
  setOptions: React.Dispatch<React.SetStateAction<StylistOptions>>;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  options,
  setOptions,
  onGenerate,
  isGenerating,
  disabled
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [maleCategory, setMaleCategory] = useState<'haircut' | 'perm'>('haircut');
  
  // New Filters
  const [lengthFilter, setLengthFilter] = useState<HairLength | 'All'>('All');
  const [textureFilter, setTextureFilter] = useState<HairTexture | 'All'>('All');

  const updateGender = (gender: Gender) => {
    // When switching gender, reset filters and default to the first style
    setLengthFilter('All');
    setTextureFilter('All');
    const defaultStyle = HAIR_STYLES[gender][0].id;
    setOptions(prev => ({ 
      ...prev, 
      gender, 
      styleId: defaultStyle 
    }));
  };

  const updateRefinement = <K extends keyof StylistOptions['refinements']>(
    key: K, 
    value: StylistOptions['refinements'][K]
  ) => {
    setOptions(prev => ({
      ...prev,
      refinements: {
        ...prev.refinements,
        [key]: value
      }
    }));
  };

  // Advanced Filter logic
  const availableStyles = useMemo(() => {
    let styles = HAIR_STYLES[options.gender];
    
    // 1. Filter by Male Category (Haircut vs Perm)
    if (options.gender === Gender.MALE) {
      styles = styles.filter(s => s.category === maleCategory);
    }

    // 2. Filter by Length
    if (lengthFilter !== 'All') {
      styles = styles.filter(s => s.length === lengthFilter);
    }

    // 3. Filter by Texture
    if (textureFilter !== 'All') {
      styles = styles.filter(s => s.texture === textureFilter);
    }

    return styles;
  }, [options.gender, maleCategory, lengthFilter, textureFilter]);

  return (
    <div className="flex flex-col gap-6 pb-24 lg:pb-0">
      
      {/* Gender Selection */}
      <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
        <button
          onClick={() => updateGender(Gender.MALE)}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${options.gender === Gender.MALE 
              ? 'bg-zinc-800 text-white shadow-sm' 
              : 'text-zinc-500 hover:text-zinc-300'}
          `}
        >
          男士 (Men)
        </button>
        <button
          onClick={() => updateGender(Gender.FEMALE)}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${options.gender === Gender.FEMALE 
              ? 'bg-zinc-800 text-white shadow-sm' 
              : 'text-zinc-500 hover:text-zinc-300'}
          `}
        >
          女士 (Women)
        </button>
      </div>

      {/* Male Category Tabs */}
      {options.gender === Gender.MALE && (
         <div className="flex gap-4 border-b border-zinc-800">
          <button 
            onClick={() => setMaleCategory('haircut')}
            className={`pb-2 text-sm font-medium transition-colors relative
              ${maleCategory === 'haircut' ? 'text-violet-400' : 'text-zinc-500 hover:text-zinc-300'}
            `}
          >
            剪发 (Cut)
            {maleCategory === 'haircut' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500 rounded-full" />}
          </button>
          <button 
            onClick={() => setMaleCategory('perm')}
            className={`pb-2 text-sm font-medium transition-colors relative
              ${maleCategory === 'perm' ? 'text-violet-400' : 'text-zinc-500 hover:text-zinc-300'}
            `}
          >
            塑型烫 (Perm)
             {maleCategory === 'perm' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500 rounded-full" />}
          </button>
         </div>
      )}

      {/* Filters (Length & Texture) */}
      <div className="flex gap-3">
        <div className="flex-1 space-y-1">
          <label className="text-xs text-zinc-500 flex items-center gap-1">
            <Filter className="w-3 h-3" /> 长度 (Length)
          </label>
          <select 
            value={lengthFilter}
            onChange={(e) => setLengthFilter(e.target.value as HairLength | 'All')}
            className="w-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 rounded-lg px-2 py-2 focus:ring-1 focus:ring-violet-500 outline-none"
          >
            <option value="All">全部 (All)</option>
            <option value="Short">短发 (Short)</option>
            <option value="Medium">中发 (Medium)</option>
            <option value="Long">长发 (Long)</option>
          </select>
        </div>
        <div className="flex-1 space-y-1">
          <label className="text-xs text-zinc-500 flex items-center gap-1">
            <Filter className="w-3 h-3" /> 纹理 (Texture)
          </label>
           <select 
            value={textureFilter}
            onChange={(e) => setTextureFilter(e.target.value as HairTexture | 'All')}
            className="w-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 rounded-lg px-2 py-2 focus:ring-1 focus:ring-violet-500 outline-none"
          >
            <option value="All">全部 (All)</option>
            <option value="Straight">直发 (Straight)</option>
            <option value="Wavy">微卷 (Wavy)</option>
            <option value="Curly">卷发 (Curly)</option>
          </select>
        </div>
      </div>

      {/* Style Library Grid */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
           <label className="text-sm font-medium text-zinc-400">
            选择发型 ({availableStyles.length})
          </label>
        </div>
       
        <div className="grid grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar touch-pan-y">
          {availableStyles.length > 0 ? (
            availableStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setOptions(prev => ({ ...prev, styleId: style.id }))}
                className={`relative aspect-[3/4] rounded-lg overflow-hidden transition-all duration-200 group border-2
                  ${options.styleId === style.id 
                    ? 'border-violet-500 shadow-lg shadow-violet-500/20' 
                    : 'border-transparent hover:border-zinc-600'}
                `}
              >
                <img 
                  src={style.previewUrl} 
                  alt={style.label}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <span className="text-[10px] md:text-xs font-medium text-white block leading-tight">
                    {style.label}
                  </span>
                </div>

                {options.styleId === style.id && (
                  <div className="absolute top-2 right-2 bg-violet-500 rounded-full p-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))
          ) : (
             <div className="col-span-3 py-8 text-center text-zinc-600 text-sm border-2 border-dashed border-zinc-800 rounded-lg">
                没有符合条件的发型<br/>(No styles match filters)
             </div>
          )}
        </div>
      </div>

      {/* Color Picker */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-zinc-400 flex justify-between">
          <span>发色 (Color)</span>
          <span className="text-xs text-zinc-500">{options.color}</span>
        </label>
        
        <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto custom-scrollbar">
          {PRESET_COLORS.map((col) => (
            <button
              key={col.value}
              onClick={() => setOptions(prev => ({ ...prev, color: col.value }))}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex-shrink-0
                 ${options.color === col.value
                  ? 'border-white scale-110 shadow-lg shadow-white/20'
                  : 'border-transparent hover:border-zinc-500'}
              `}
              style={{ backgroundColor: col.value }}
              title={col.label}
            />
          ))}
          <div className="relative w-full md:w-auto md:flex-1 min-w-[100px]">
            <input 
               type="text" 
               value={options.color}
               onChange={(e) => setOptions(prev => ({...prev, color: e.target.value}))}
               placeholder="#HEX"
               className="w-full h-8 bg-zinc-900 border border-zinc-700 rounded-full px-3 text-xs text-zinc-300 focus:outline-none focus:border-violet-500 text-center uppercase"
            />
          </div>
        </div>
      </div>

      {/* Fine Tuning (Refinements) */}
      <div className="border-t border-zinc-800 pt-4">
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 mb-4 transition-colors w-full"
        >
          <Settings2 className="w-4 h-4" />
          细节微调 (Fine-tune)
          <span className="text-xs text-zinc-600 ml-auto">{showAdvanced ? '收起' : '展开'}</span>
        </button>
        
        {showAdvanced && (
          <div className="space-y-5 animate-in slide-in-from-top-2 duration-300 pb-2">
            {/* Bangs */}
            <div className="space-y-2">
              <label className="text-xs text-zinc-500">刘海长度 (Bangs)</label>
              <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800 overflow-x-auto">
                {[
                  { label: '无', val: 'None' }, 
                  { label: '八字', val: 'Curtain' }, 
                  { label: '空气', val: 'Wispy' },
                  { label: '齐刘海', val: 'Full' },
                   { label: '侧分', val: 'Side-swept' }
                ].map((opt) => (
                   <button
                    key={opt.val}
                    onClick={() => updateRefinement('bangs', opt.val as BangStyle)}
                    className={`flex-1 min-w-[50px] py-1.5 text-xs rounded-md transition-colors whitespace-nowrap
                      ${options.refinements.bangs === opt.val ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}
                    `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume */}
             <div className="space-y-2">
              <label className="text-xs text-zinc-500">发量 (Volume)</label>
              <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                {[
                  { label: '轻薄', val: 'Light/Thin' }, 
                  { label: '自然', val: 'Natural' }, 
                  { label: '浓密', val: 'Thick/Full' }
                ].map((opt) => (
                   <button
                    key={opt.val}
                    onClick={() => updateRefinement('volume', opt.val as HairVolume)}
                    className={`flex-1 py-1.5 text-xs rounded-md transition-colors
                      ${options.refinements.volume === opt.val ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}
                    `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Root Lift */}
             <div className="space-y-2">
              <label className="text-xs text-zinc-500">发根蓬松度 (Root Lift)</label>
              <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                 {[
                  { label: '服帖', val: 'Flat' }, 
                  { label: '自然', val: 'Natural' }, 
                  { label: '蓬松', val: 'Voluminous' }
                ].map((opt) => (
                   <button
                    key={opt.val}
                    onClick={() => updateRefinement('rootLift', opt.val as RootLift)}
                    className={`flex-1 py-1.5 text-xs rounded-md transition-colors
                      ${options.refinements.rootLift === opt.val ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}
                    `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Quality */}
             <div className="space-y-2">
              <label className="text-xs text-zinc-500">发质 (Hair Quality)</label>
              <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                 {[
                  { label: '细软', val: 'Soft/Fine' }, 
                  { label: '正常', val: 'Normal' }, 
                  { label: '粗硬', val: 'Coarse/Hard' }
                ].map((opt) => (
                   <button
                    key={opt.val}
                    onClick={() => updateRefinement('quality', opt.val as HairQuality)}
                    className={`flex-1 py-1.5 text-xs rounded-md transition-colors
                      ${options.refinements.quality === opt.val ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}
                    `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile, Static for Desktop */}
      <div className={`
        fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 z-50 pb-safe
        lg:static lg:bg-transparent lg:p-0 lg:border-none lg:backdrop-blur-none lg:z-auto
      `}>
        <button
          onClick={onGenerate}
          disabled={disabled || isGenerating}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg shadow-lg transition-all duration-300
            ${disabled 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-violet-500/25 hover:scale-[1.02] active:scale-[0.98]'}
          `}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>设计中... (Styling)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>生成新发型 (Generate)</span>
            </>
          )}
        </button>
        {disabled && !isGenerating && (
          <p className="text-center text-zinc-600 text-xs mt-2 lg:text-sm lg:mt-3">请先上传一张正面照片</p>
        )}
      </div>
    </div>
  );
};