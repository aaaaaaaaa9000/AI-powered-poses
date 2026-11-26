import React from 'react';

const ApiKeyInfo: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-3">
      <h2 className="text-xl font-bold text-white">Using Your API Key</h2>
      <p className="text-sm text-gray-300">
        This application uses server-side processing with your attached Gemini API key.
      </p>
      <p className="text-sm text-gray-400">
        You can see your app's attached API key in the <strong>Settings &gt; Secrets</strong> panel.
      </p>
    </div>
  );
};

export default ApiKeyInfo;
