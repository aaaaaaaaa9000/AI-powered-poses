
import React from 'react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  image: ImageFile | null;
  title: string;
  id: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, image, title, id }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="cursor-pointer group block">
        <div className={`relative border border-dashed rounded-2xl transition-all duration-300 aspect-square lg:aspect-video flex flex-col justify-center items-center overflow-hidden
            ${image ? 'border-white/20 bg-stone-800' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30'}
        `}>
          {image ? (
            <>
                <img src={`data:${image.mimeType};base64,${image.base64}`} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-all duration-500 group-hover:scale-105" />
                <div className="relative z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all lg:translate-y-2 lg:group-hover:translate-y-0 ">غيّر الصورة</div>
            </>
          ) : (
            <div className="flex flex-col items-center p-6 text-center">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/5 group-hover:ring-white/20">
                  <svg className="w-5 h-5 text-stone-500 group-hover:text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
               </div>
              <p className="text-xs text-stone-500 group-hover:text-stone-300 font-bold">{title}</p>
            </div>
          )}
        </div>
      </label>
      <input id={id} type="file" className="hidden" accept="image/*" onChange={onImageUpload} />
    </div>
  );
};

export default ImageUploader;
