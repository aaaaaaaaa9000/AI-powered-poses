import React from 'react';

const ApiKeyInfo: React.FC = () => {
    return (
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-3">
            <h2 className="text-xl font-bold text-white">Using Your API Key</h2>
            <p className="text-sm text-gray-300">
                This application is designed for security and automatically uses the API key from the environment.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
                <li>
                    <strong>For Image Generation:</strong> The key associated with this project is used automatically. To use your paid plan, please ensure this app is running within your billing-enabled Google AI project.
                </li>
                <li>
                    <strong>For Video Generation:</strong> When you click "Generate Video", a dialog will appear. Please select the API key from your paid project in that list.
                </li>
            </ul>
             <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-cyan-400 hover:underline mt-2 inline-block"
            >
                Learn more about API keys and billing &rarr;
            </a>
        </div>
    );
};

export default ApiKeyInfo;
