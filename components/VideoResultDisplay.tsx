import React, { useState, useEffect } from 'react';
import { VideoConfig, VideoAspectRatio, VideoResolution } from '../types';

interface VideoResultDisplayProps {
    onGenerate: (prompt: string, config: VideoConfig) => void;
    generatedVideoUrl: string | null;
    isLoading: boolean;
    error: string | null;
    onRetryKeySelection: () => void;
    isApiKeyInvalid: boolean;
    onSuggestPrompts: () => void;
    suggestedPrompts: string[] | null;
    isSuggestingPrompts: boolean;
    suggestionError: string | null;
}

const loadingMessages = [
    "Warming up the video engine...",
    "Choreographing pixel performance...",
    "This can take a few minutes, great art needs time.",
    "Compositing scenes...",
    "Adding cinematic flair...",
    "Rendering final cut...",
];

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 11-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zM5 12a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

const VideoResultDisplay: React.FC<VideoResultDisplayProps> = ({ onGenerate, generatedVideoUrl, isLoading, error, onRetryKeySelection, isApiKeyInvalid, onSuggestPrompts, suggestedPrompts, isSuggestingPrompts, suggestionError }) => {
    const [prompt, setPrompt] = useState('A cinematic 4K video of the product with dynamic motion and professional lighting.');
    const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>('16:9');
    const [resolution, setResolution] = useState<VideoResolution>('720p');
    const [currentLoadingMessage, setCurrentLoadingMessage] = useState(loadingMessages[0]);

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setCurrentLoadingMessage(prev => {
                    const currentIndex = loadingMessages.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % loadingMessages.length;
                    return loadingMessages[nextIndex];
                });
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [isLoading]);


    const handleGenerateClick = () => {
        onGenerate(prompt, { aspectRatio, resolution });
    };

    return (
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white">3. Generate Product Video</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
                    <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as VideoAspectRatio)} className="w-full glass-input text-white rounded-md py-2 px-3 transition-all">
                        <option value="16:9" className="bg-gray-800">16:9 (Landscape)</option>
                        <option value="9:16" className="bg-gray-800">9:16 (Portrait)</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Resolution</label>
                    <select value={resolution} onChange={(e) => setResolution(e.target.value as VideoResolution)} className="w-full glass-input text-white rounded-md py-2 px-3 transition-all">
                        <option value="720p" className="bg-gray-800">720p</option>
                        <option value="1080p" className="bg-gray-800">1080p</option>
                    </select>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-300">Video Prompt</label>
                    <button
                        onClick={onSuggestPrompts}
                        disabled={isSuggestingPrompts || isLoading}
                        className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSuggestingPrompts ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-cyan-400 mr-2"></div>
                                Suggesting...
                            </>
                        ) : (
                            <>
                                <SparklesIcon />
                                Suggest Prompts
                            </>
                        )}
                    </button>
                </div>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={3}
                    className="w-full glass-input text-gray-200 rounded-md p-3 text-sm leading-relaxed transition-all"
                    placeholder="Describe the video you want to create..."
                />
            </div>

            {suggestionError && <p className="text-xs text-red-400 text-center -mt-2">{suggestionError}</p>}
            
            {suggestedPrompts && suggestedPrompts.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {suggestedPrompts.map((p, index) => (
                        <button
                            key={index}
                            onClick={() => setPrompt(p)}
                            className="bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium py-1.5 px-3 rounded-full transition-colors"
                        >
                            {p}
                        </button>
                    ))}
                </div>
            )}


            <button
                onClick={handleGenerateClick}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 disabled:shadow-none"
            >
                {isLoading ? 'Generating Video...' : 'Generate Video'}
            </button>
            
            <div className="w-full aspect-video bg-black/20 rounded-lg flex items-center justify-center p-2 border border-white/10">
                {isLoading && (
                     <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto"></div>
                        <p className="mt-4 text-gray-300">{currentLoadingMessage}</p>
                    </div>
                )}
                {error && !isLoading && (
                    <div className="text-center p-4">
                        <p className="font-bold text-red-300">Video Generation Failed</p>
                        <p className="text-sm mt-1 text-red-300" dangerouslySetInnerHTML={{ __html: error }}></p>
                         {isApiKeyInvalid && (
                            <button
                                onClick={onRetryKeySelection}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                            >
                                Select API Key
                            </button>
                        )}
                    </div>
                )}
                {generatedVideoUrl && !isLoading && !error && (
                    <video src={generatedVideoUrl} controls className="w-full h-full rounded-md" />
                )}
                {!isLoading && !error && !generatedVideoUrl && (
                     <p className="text-gray-500">Your video will appear here</p>
                )}
            </div>

             {generatedVideoUrl && !isLoading && !error && (
                 <a 
                    href={generatedVideoUrl}
                    download="product-video.mp4"
                    className="w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                >
                    Download Video
                </a>
            )}

        </div>
    );
};

export default VideoResultDisplay;