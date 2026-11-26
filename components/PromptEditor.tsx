
import React from 'react';

interface PromptEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ prompt, setPrompt }) => {
  return (
    <div className="flex flex-col gap-1">
       <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        dir="ltr"
        className="w-full bg-stone-800/50 text-stone-300 text-[11px] rounded-2xl border border-white/5 focus:border-white/20 focus:ring-0 focus:outline-none p-4 leading-relaxed resize-none custom-scrollbar placeholder-stone-700 transition-all shadow-inner"
        placeholder="الوصف هيظهر هنا بعد ما ترفع الصورة..."
      />
      <span className="text-xs text-stone-500 mt-2 px-2">الوصف ده بيتكتب تلقائي حسب اختيارك، وتقدر تعدّل فيه.</span>
    </div>
  );
};

export default PromptEditor;
