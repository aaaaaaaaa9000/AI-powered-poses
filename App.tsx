
import React, { useState, useEffect, useCallback } from 'react';
import { CustomizationOptions, ImageFile } from './types';
import { generateImage, analyzeStyleImage, upscaleImage } from './services/geminiService';
import CustomizationPanel from './components/CustomizationPanel';
import ImageWorkspace from './components/ImageWorkspace';
import PromptEditor from './components/PromptEditor';
import { LIGHTING_STYLES, CAMERA_PERSPECTIVES, STYLE_PRESETS } from './constants';

function App() {
  const [productImage, setProductImage] = useState<ImageFile | null>(null);
  const [styleImage, setStyleImage] = useState<ImageFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<ImageFile | null>(null);
  
  const [styleDescription, setStyleDescription] = useState<string | null>(null);
  const [isAnalyzingStyle, setIsAnalyzingStyle] = useState<boolean>(false);

  const [options, setOptions] = useState<CustomizationOptions>({
    stylePreset: STYLE_PRESETS[0].value,
    lightingStyle: LIGHTING_STYLES[0].value,
    cameraPerspective: CAMERA_PERSPECTIVES[0].value,
  });

  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [retrySeconds, setRetrySeconds] = useState<number>(0);
  
  const [isUpscaling, setIsUpscaling] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'refine'>('presets');

  useEffect(() => {
    if (retrySeconds > 0) {
        const timerId = setTimeout(() => setRetrySeconds(retrySeconds - 1), 1000);
        return () => clearTimeout(timerId);
    }
  }, [retrySeconds]);

  useEffect(() => {
    if (styleImage) {
      const getStyleDescription = async () => {
        setIsAnalyzingStyle(true);
        setError(null);
        try {
          const description = await analyzeStyleImage(styleImage);
          setStyleDescription(description);
        } catch (err) {
          console.error(err);
          setError(err instanceof Error ? err.message : "Could not analyze the style image.");
          setStyleDescription(null);
        } finally {
          setIsAnalyzingStyle(false);
        }
      };
      getStyleDescription();
    } else {
      setStyleDescription(null);
    }
  }, [styleImage]);


  useEffect(() => {
    const generateNewPrompt = () => {
      if (!productImage) return '';
      
      let newPrompt = '';

      if (options.stylePreset === 'Cinematic 3D Ad') {
        newPrompt = `Cinematic 3D action-packed advertisement of the subject in the provided image, captured in a dramatic mid-motion scene that embodies its core energy. Use bold studio lighting with intense highlights and deep shadows, dynamic particles, and slow-motion effects to amplify impact. The environment should feel surreal yet hyperrealistic, designed to reflect the product’s personality (crunchy, energetic, fast, luxurious, refreshing, etc.). Integrate the brand logo crafted from product elements if possible, and place a sleek creative slogan beneath it that matches the mood. Composition in 1:1 aspect ratio, hyper-detailed, sharp, bold, and designed to go viral.`;
      } else if (options.stylePreset === 'Valentine 3D Ad') {
        newPrompt = `Cinematic 3D romantic advertisement of the subject in the provided image, captured in a dreamy mid-motion scene that embodies love and passion. Use soft, warm studio lighting with rose-gold highlights and deep shadows, dynamic floating rose petals or heart-shaped particles, and slow-motion effects to amplify the romantic impact. The environment should feel surreal yet hyperrealistic, designed to reflect the product’s personality suitable for Valentine's Day (romantic, luxurious, sweet, passionate). Integrate the brand logo crafted from product elements if possible, and place a sleek creative slogan beneath it that matches the mood. Composition in 1:1 aspect ratio, hyper-detailed, sharp, bold, and designed to go viral.`;
      } else if (options.stylePreset === 'Relaxation 3D Ad') {
        newPrompt = `Cinematic 3D serene advertisement of the subject in the provided image, captured in a peaceful scene that embodies ultimate comfort and relaxation. Use soft, warm lighting with gentle highlights and cozy shadows, subtle floating feathers or soft clouds to amplify the soothing atmosphere. The environment should feel surreal yet hyperrealistic, designed to reflect the product’s personality (soft, plush, calm, soothing, tranquil). Integrate the brand logo crafted from product elements if possible, and place a sleek creative slogan beneath it that matches the mood. Composition in 1:1 aspect ratio, hyper-detailed, sharp, elegant, and designed to go viral.`;
      } else if (options.stylePreset === 'Winter 3D Ad') {
        newPrompt = `Cinematic cozy winter advertisement of the subject in the provided image, captured in a serene and inviting scene that embodies the warmth and comfort of the season. Use soft, warm lighting that contrasts gently with a cool, snowy background, creating a cozy and luxurious atmosphere. The environment should feel premium and hyperrealistic, designed to reflect the product’s personality suitable for winter (warm, comforting, soft, elegant). Integrate the brand logo subtly if possible, and place a sleek creative slogan beneath it that matches the mood. Composition in 1:1 aspect ratio, hyper-detailed, sharp, elegant, and designed to evoke a sense of winter comfort.`;
      } else if (options.stylePreset === 'Summer 3D Ad') {
        newPrompt = `Cinematic 3D summer advertisement of the subject in the provided image, captured in a vibrant and energetic mid-motion scene that embodies the refreshing spirit of the season. Use bright, intense sunlight with sharp contrasts, dynamic elements like water splashes, heat waves, or tropical particles, and slow-motion effects to amplify the refreshing impact. The environment should feel surreal yet hyperrealistic, designed to reflect the product’s personality suitable for summer (refreshing, cool, bright, energetic). Integrate the brand logo crafted from product elements if possible, and place a sleek creative slogan beneath it that matches the mood. Composition in 1:1 aspect ratio, hyper-detailed, sharp, bold, and designed to go viral.`;
      } else if (options.stylePreset === 'Summer Relaxed Ad') {
        newPrompt = `Cinematic serene summer advertisement of the subject in the provided image, captured in a peaceful and relaxing indoor scene that embodies the quiet luxury of the season. Use soft, natural sunlight streaming through windows with gentle highlights and calming shadows, avoiding dynamic motion. The environment should feel hyperrealistic and tranquil, perhaps a stylish interior with light linen textures, indoor tropical plants, or a sunroom, designed to reflect the product’s personality suitable for a relaxed summer (calm, refreshing, luxurious, peaceful). Integrate the brand logo subtly if possible, and place a sleek creative slogan beneath it that matches the mood. Composition in 1:1 aspect ratio, hyper-detailed, sharp, elegant, and designed to go viral.`;
      } else if (options.stylePreset === 'Summer Relaxed Outdoor Ad') {
        newPrompt = `Cinematic serene summer advertisement of the subject in the provided image, captured in a peaceful and relaxing scene that embodies the quiet luxury of the season. Use soft, natural sunlight with gentle highlights and calming shadows, avoiding dynamic motion. The environment should feel hyperrealistic and tranquil, perhaps a quiet beach at sunset or a serene poolside, designed to reflect the product’s personality suitable for a relaxed summer (calm, refreshing, luxurious, peaceful). Integrate the brand logo subtly if possible, and place a sleek creative slogan beneath it that matches the mood. Composition in 1:1 aspect ratio, hyper-detailed, sharp, elegant, and designed to go viral.`;
      } else if (options.stylePreset === 'Outdoor Portrait') {
        newPrompt = `A realistic outdoor portrait of the subject in the provided image, depicted as a young woman standing at a slight side angle, body turned 45 degrees away from the camera, head gently facing the lens, soft natural expression, one hand lightly touching her hair, casual stylish outfit, natural daylight, shallow depth of field, blurred background, high detail, photorealistic.`;
      } else if (options.stylePreset === 'Editorial Portrait') {
        newPrompt = `A stylish outdoor portrait of the subject in the provided image, depicted as a young woman leaning gently against a wall or tree, one leg slightly bent, relaxed body language, looking away from the camera with a thoughtful expression, natural environment, warm daylight, editorial photography style, photorealistic.`;
      } else if (options.stylePreset === 'Instagram Reels Style') {
        newPrompt = `A trendy Instagram Reels style outdoor shot of the subject in the provided image, depicted as a young woman with a modern BMW car, confident and natural pose, cinematic vertical framing (9:16), stylish casual outfit, clean luxury lifestyle vibe, smooth camera motion feel, shallow depth of field, soft natural daylight, modern color grading, high realism.`;
      } else if (options.stylePreset === 'Instagram Reels Lifestyle') {
        newPrompt = `A fashionable Instagram Reels lifestyle shot of the subject in the provided image, depicted as a young woman sitting casually on the hood of a BMW, confident youthful energy, clean luxury aesthetic, golden hour lighting, shallow depth of field, vertical video look, high realism.`;
      } else if (options.stylePreset === 'Instagram Reels Confidence') {
        newPrompt = `A confident young woman leaning casually on a modern BMW, relaxed posture, effortless Instagram Reels vibe, luxury lifestyle mood, urban background, cinematic lighting, vertical composition, realistic photography, reference image guided.`;
      } else if (options.stylePreset === 'Outdoor Photoshoot Style') {
        newPrompt = `A stylish outdoor photoshoot of the subject in the provided image, depicted as a young woman leaning casually against a modern car, one leg slightly bent, arms relaxed, confident expression, contemporary fashion style, soft natural light, cinematic composition, photorealistic details.`;
      } else if (options.stylePreset === 'Natural Outdoor Lifestyle') {
        newPrompt = `A natural outdoor portrait of the subject in the provided image, depicted as a young woman sitting casually on stairs or a bench, leaning slightly forward, relaxed shoulders, hands resting naturally, calm and confident expression, soft sunlight, lifestyle photography, realistic proportions, shallow depth of field.`;
      } else if (options.stylePreset === 'Natural Close-up Portrait') {
        newPrompt = `A close-up outdoor portrait of the subject in the provided image, depicted as a young woman interacting naturally with her hair or accessories, soft candid expression, minimal makeup, elegant casual outfit, golden hour lighting, dreamy background blur, high realism, lifestyle portrait photography.`;
      } else if (options.stylePreset === 'Instagram Reels Luxury') {
        newPrompt = `A luxury Instagram Reels style outdoor shot of the subject in the provided image, depicted as a young woman with a modern BMW, confident elegant pose, clean high-end lifestyle aesthetic, tailored fashionable outfit, premium look, cinematic vertical framing (9:16), sharp focus on subject, soft natural daylight, refined color grading, glossy highlights, photorealistic, high detail, minimal background, luxury tones, deep shadows, crisp highlights, premium vibe.`;
      } else if (options.stylePreset === 'Instagram Reels Soft Luxury') {
        newPrompt = `A high-quality Instagram Reels style outdoor shot of the subject in the provided image, depicted as a young woman with a modern BMW, soft feminine luxury aesthetic, gentle confident pose, relaxed body language, natural elegant smile, flowing stylish outfit in pastel or neutral tones, clean luxury lifestyle vibe, cinematic vertical framing (9:16), soft natural daylight, shallow depth of field, smooth realistic skin texture, refined facial details, dreamy atmosphere, warm tones, subtle glow, airy feeling, romantic softness, minimal contrast, modern instagram color grading, photorealistic, high detail.`;
      } else if (options.stylePreset === 'Instagram Reels Soft Feminine') {
        newPrompt = `A soft feminine Instagram Reels style outdoor shot of the subject in the provided image, depicted as a young woman with a modern BMW, gentle relaxed pose, natural smile, flowing outfit, pastel or neutral colors, dreamy lifestyle mood, cinematic vertical framing (9:16), soft natural light, shallow depth of field, smooth skin texture, delicate color grading, photorealistic, warm tones, pastel highlights, airy feeling, subtle glow, romantic softness, minimal contrast.`;
      } else if (options.stylePreset === 'Instagram Reels Birthday') {
        newPrompt = `A joyful Instagram Reels style outdoor birthday celebration shot of the subject in the provided image, depicted as a young woman turning 21, soft feminine aesthetic, elegant yet playful mood, holding balloons or a small birthday cake, gentle confident smile, flowing stylish outfit in pastel or light tones, celebratory details like candles or confetti, cinematic vertical framing (9:16), soft natural daylight, shallow depth of field, dreamy atmosphere, warm tones, subtle glow, airy feeling, romantic softness, clean instagram color grading, photorealistic, high detail, birthday balloons, soft confetti, glowing candles.`;
      } else if (options.stylePreset === 'Instagram Reels Birthday Celebration') {
        newPrompt = `A joyful Instagram Reels style outdoor birthday celebration shot of the subject in the provided image, depicted as a young woman turning 21, soft feminine aesthetic, elegant yet playful mood, holding balloons or a small birthday cake, gentle confident smile, flowing stylish outfit in pastel or light tones, celebratory details like candles or confetti, cinematic vertical framing (9:16), soft natural daylight, shallow depth of field, dreamy atmosphere, warm tones, subtle glow, airy feeling, romantic softness, clean instagram color grading, photorealistic, high detail, floral accents, pastel decorations, gentle motion feel.`;
      } else if (options.stylePreset === 'Instagram Reels Birthday Walk') {
        newPrompt = `A soft feminine Instagram Reels style outdoor birthday shot of the subject in the provided image, depicted as a young woman turning 21, walking naturally while holding pastel balloons, joyful relaxed expression, gentle confident posture, flowing elegant outfit in light neutral tones, candid lifestyle feel, cinematic vertical framing (9:16), soft natural daylight, shallow depth of field, dreamy background blur, warm tones, subtle glow, airy feeling, romantic softness, minimal contrast, modern instagram color grading, photorealistic, high detail.`;
      } else if (options.stylePreset === 'Instagram Reels Café Birthday') {
        newPrompt = `A soft feminine Instagram Reels style café portrait of the subject in the provided image, depicted as a young woman celebrating her 21st birthday, seated or standing casually at a cozy café, gentle natural smile, relaxed elegant pose, flowing stylish outfit in pastel or neutral colors, warm café atmosphere, cinematic vertical framing (9:16), soft window light, shallow depth of field, dreamy lifestyle mood, warm tones, subtle glow, airy feeling, romantic softness, clean instagram color grading, photorealistic, high detail.`;
      } else if (options.stylePreset === 'Instagram Reels Birthday Close-up') {
        newPrompt = `A soft feminine Instagram Reels style close-up birthday portrait of the subject in the provided image, depicted as a young woman holding a small birthday cake with a glowing candle shaped as number 21, gentle joyful smile, delicate facial expression, minimal makeup, intimate celebratory mood, cinematic vertical framing (9:16), soft natural light, shallow depth of field, creamy background blur, warm tones, subtle glow, airy feeling, romantic softness, minimal contrast, modern instagram color grading, photorealistic, high detail.`;
      } else {
        newPrompt = `Professional photo of subject, ${options.lightingStyle}, ${options.cameraPerspective}, premium studio quality.`;
      }

      newPrompt += `\n\n- CRITICAL: Preserve exact facial features and likeness of the model.`;

      if (styleImage && styleDescription) {
        newPrompt += `\n\n- Match the style/mood of the reference: ${styleDescription}`;
      }

      setPrompt(newPrompt);
    };
    generateNewPrompt();
  }, [options, productImage, styleImage, styleDescription]);
  
  const handleGenerate = useCallback(async () => {
    if (!productImage || !prompt) {
      setError('Upload a subject image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateImage(productImage, prompt, styleImage);
      setGeneratedImage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed.');
    } finally {
      setIsLoading(false);
    }
  }, [productImage, prompt, styleImage]);
  
  const handleUpscale = useCallback(async () => {
    if (!generatedImage) return;
    setIsUpscaling(true);
    try {
      const upscaled = await upscaleImage(generatedImage);
      setGeneratedImage(upscaled);
    } catch (err) {
      setError("Upscale failed.");
    } finally {
      setIsUpscaling(false);
    }
  }, [generatedImage]);

  const handleDownload = useCallback(() => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = `data:${generatedImage.mimeType};base64,${generatedImage.base64}`;
    link.download = generatedImage.name;
    link.click();
  }, [generatedImage]);

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<ImageFile | null>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGeneratedImage(null);
        setter({
          base64: (reader.result as string).split(',')[1],
          mimeType: file.type,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <header className="h-14 bg-stone-950/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
             <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
           </div>
           <h1 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400">
             STUDIO<span className="font-light">AI</span>
           </h1>
        </div>

        <div className="flex items-center gap-2">
           <button 
              onClick={handleGenerate}
              disabled={isLoading || !productImage || retrySeconds > 0}
              className="bg-white text-black h-9 px-5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-20 disabled:scale-100 flex items-center gap-2 shadow-xl shadow-white/10"
           >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"/>
              ) : retrySeconds > 0 ? (
                `Retry in ${retrySeconds}s`
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <span>RENDER</span>
                </>
              )}
           </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Main Viewport - Top on mobile, Center on Desktop */}
        <section className="flex-1 relative flex flex-col min-h-[50vh] lg:min-h-0 bg-[#080707]">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
           
           <div className="flex-1 flex items-center justify-center p-4 lg:p-12 relative overflow-hidden">
              {generatedImage ? (
                <div className="relative group max-w-full max-h-full">
                  <img 
                    src={`data:${generatedImage.mimeType};base64,${generatedImage.base64}`} 
                    alt="Generated" 
                    className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl shadow-black ring-1 ring-white/10"
                  />
                  {/* Result Controls */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={handleUpscale} disabled={isUpscaling} className="glass-panel px-4 py-2 rounded-full text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
                       {isUpscaling ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"/> : '2X Upscale'}
                    </button>
                    <button onClick={handleDownload} className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-stone-200 transition-colors flex items-center gap-2">
                       Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6 text-center max-w-sm px-8">
                  <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                    <svg className="w-10 h-10 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Ready to Render</h2>
                    <p className="text-sm text-stone-500 leading-relaxed">Upload a subject and select a style profile below to get started.</p>
                  </div>
                </div>
              )}
           </div>

           {error && (
             <div className="absolute bottom-6 left-4 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-stone-900/95 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex items-start gap-3">
                   <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                     <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                     </svg>
                   </div>
                   <div className="flex-1 min-w-0">
                     <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                       {error.toLowerCase().includes('quota') || error.toLowerCase().includes('billing') ? 'Quota & Billing Notice' : 'Notice'}
                     </h4>
                     <p className="text-xs text-stone-300 leading-relaxed">{error}</p>
                   </div>
                   <button onClick={() => setError(null)} className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">✕</button>
                </div>
             </div>
           )}
        </section>

        {/* Controls Panel - Bottom on mobile, Right on Desktop */}
        <aside className="w-full lg:w-[420px] bg-stone-900 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col shrink-0 lg:h-full z-40 lg:sticky lg:top-14">
          
          {/* Tabs for Presets vs Advanced/Prompt */}
          <div className="flex border-b border-white/5 h-12 shrink-0">
            <button 
              onClick={() => setActiveTab('presets')} 
              className={`flex-1 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'presets' ? 'text-white border-b-2 border-white' : 'text-stone-500'}`}
            >
              Style Presets
            </button>
            <button 
              onClick={() => setActiveTab('refine')} 
              className={`flex-1 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === 'refine' ? 'text-white border-b-2 border-white' : 'text-stone-500'}`}
            >
              Refine & Source
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
            {activeTab === 'presets' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Select Portrait Style</h3>
                  <span className="text-[10px] text-stone-600">{STYLE_PRESETS.length} Profiles</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {STYLE_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setOptions(prev => ({ ...prev, stylePreset: preset.value }))}
                      className={`preset-card p-4 rounded-xl text-left border transition-all relative overflow-hidden group ${
                        options.stylePreset === preset.value 
                        ? 'bg-white border-white text-black shadow-lg shadow-white/5' 
                        : 'bg-stone-800/50 border-white/5 text-stone-400 hover:border-white/20 hover:bg-stone-800'
                      }`}
                    >
                      <span className="text-xs font-semibold leading-tight block relative z-10">{preset.label}</span>
                      {options.stylePreset === preset.value && (
                        <div className="absolute top-1 right-1">
                          <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <section>
                   <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Subject Source</h3>
                   <ImageWorkspace 
                      productImage={productImage} 
                      onProductImageUpload={handleFileChange(setProductImage)}
                   />
                </section>

                <div className="h-px bg-white/5 w-full"></div>

                <section>
                   <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Refinement Options</h3>
                   <CustomizationPanel 
                      options={options}
                      setOptions={setOptions}
                      styleImage={styleImage}
                      onStyleImageUpload={handleFileChange(setStyleImage)}
                      isAnalyzingStyle={isAnalyzingStyle}
                  />
                </section>

                <div className="h-px bg-white/5 w-full"></div>

                <section>
                   <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Prompt Strategy</h3>
                   <PromptEditor 
                        prompt={prompt}
                        setPrompt={setPrompt}
                    />
                </section>
              </div>
            )}
          </div>
          
          {/* Mobile Floating Render Button (conditionally visible if needed) */}
          <div className="lg:hidden p-4 bg-stone-900 border-t border-white/5">
             <button 
                onClick={handleGenerate}
                disabled={isLoading || !productImage}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white h-12 rounded-xl font-bold transition-all shadow-xl shadow-cyan-900/20 flex items-center justify-center gap-3 disabled:opacity-20"
             >
                {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/> : 'GENERATE NOW'}
             </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
