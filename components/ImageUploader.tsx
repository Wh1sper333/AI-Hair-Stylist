import React, { useRef, useState } from 'react';
import { Upload, Camera, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  selectedImage,
  onClear,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelected(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  if (selectedImage) {
    return (
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 group">
        <img 
          src={selectedImage} 
          alt="Original" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={onClear}
            className="bg-red-500/80 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-sm transition-transform hover:scale-105"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-zinc-300 backdrop-blur-md">
          原图 (Original)
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-[4/5] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-6 transition-all duration-200 cursor-pointer
        ${dragActive ? 'border-violet-500 bg-violet-500/10' : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 hover:bg-zinc-900'}
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      
      <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 shadow-inner">
        <Camera className="w-8 h-8 text-zinc-400" />
      </div>
      
      <h3 className="text-lg font-medium text-zinc-200 mb-1 text-center">
        上传你的照片
      </h3>
      <p className="text-sm text-zinc-500 text-center max-w-[200px]">
        点击或拖拽上传<br/>请确保正脸清晰可见
      </p>
      
      <div className="mt-6 flex gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-zinc-400">
           <Upload className="w-3 h-3" /> JPG, PNG
        </div>
      </div>
    </div>
  );
};