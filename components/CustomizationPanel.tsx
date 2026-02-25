
import React from 'react';
import { CustomizationOptions, ImageFile } from '../types';
import { LIGHTING_STYLES, CAMERA_PERSPECTIVES } from '../constants';
import ImageUploader from './ImageUploader';

interface CustomizationPanelProps {
  options: CustomizationOptions;
  setOptions: React.Dispatch<React.SetStateAction<CustomizationOptions>>;
  styleImage: ImageFile | null;
  onStyleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isAnalyzingStyle: boolean;
}

const CustomSelect: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: { value: string; label: string }[] }> = ({ label, value, onChange, options }) => (
    <div className="group">
        <label className="block text-[10px] uppercase font-bold text-stone-500 mb-2 tracking-wide">{label}</label>
        <div className="relative">
            <select value={value} onChange={onChange} className="w-full bg-stone-800/50 text-stone-200 text-xs rounded-xl border border-white/5 focus:border-white/20 focus:ring-0 focus:outline-none py-3 pl-3 pr-10 appearance-none cursor-pointer hover:bg-stone-800 transition-all shadow-sm">
                {options.map(opt => <option key={opt.value} value={opt.value} className="bg-stone-900">{opt.label}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
        </div>
    </div>
);


const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ options, setOptions, styleImage, onStyleImageUpload, isAnalyzingStyle }) => {
  const handleChange = <K extends keyof CustomizationOptions,>(key: K, value: CustomizationOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      
      {options.stylePreset === 'Standard' && (
        <div className="grid grid-cols-1 gap-4">
            <CustomSelect 
                label="Studio Lighting"
                value={options.lightingStyle}
                onChange={(e) => handleChange('lightingStyle', e.target.value as CustomizationOptions['lightingStyle'])}
                options={LIGHTING_STYLES}
            />

            <CustomSelect 
                label="Camera Perspective"
                value={options.cameraPerspective}
                onChange={(e) => handleChange('cameraPerspective', e.target.value as CustomizationOptions['cameraPerspective'])}
                options={CAMERA_PERSPECTIVES}
            />
        </div>
      )}

      <div>
        <label className="block text-[10px] uppercase font-bold text-stone-500 mb-3 tracking-wide">Aesthetic Reference</label>
        <div className="relative group">
            <ImageUploader 
                id="style-uploader"
                title="Upload Style Reference"
                image={styleImage}
                onImageUpload={onStyleImageUpload}
            />
            {isAnalyzingStyle && (
                <div className="absolute inset-0 bg-stone-900/60 flex flex-col items-center justify-center rounded-2xl border border-white/10 backdrop-blur-sm z-10">
                    <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[10px] mt-2 font-bold text-white uppercase tracking-tighter">Analyzing Style</span>
                </div>
            )}
        </div>
        <p className="mt-2 text-[10px] text-stone-600 leading-tight">Optional: The AI will mirror the color palette and lighting of this image.</p>
      </div>
    </div>
  );
};

export default CustomizationPanel;
