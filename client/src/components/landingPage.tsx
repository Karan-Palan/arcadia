import { useState } from 'react';
import { Sparkles, Copy } from 'lucide-react';
import GenerateButton from './generateButton';

const LandingPage = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  interface HandleImageGenerated {
    (imageUrl: string): void;
  }

  const handleImageGenerated: HandleImageGenerated = (imageUrl) => {
    setGeneratedImage(imageUrl);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background GIF */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/8-bit-fighting.gif"
          alt="background gif"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome to Arcadia
          </h1>
          <p className="text-xl text-purple-200/70 mx-auto">
            Transform your creative vision into blockchain-ready digital art with cutting-edge AI generation
          </p>
        </header>

        {/* Generator Section */}
        <section className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-900/30 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Prompt Input */}
            <div className="flex-grow space-y-4">
              <div className="relative">     
              </div>

              {/* Generate Button */}
              <GenerateButton
                prompt={prompt}
                onImageGenerated={handleImageGenerated}
                onPromptChange={handlePromptChange}
              />
            </div>

            {/* Generated Image Preview */}
            <div className="w-full md:w-1/2 min-h-[400px] bg-purple-950/20 border border-purple-900/30 rounded-lg flex items-center justify-center">
              {generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated NFT"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center text-purple-200/50">
                  <Sparkles size={48} className="mx-auto mb-4" />
                  <p>Your AI-generated NFT appears here</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Example Prompts Section */}
        <section className="mt-16">
          <h2 className="text-center text-3xl mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Inspiration Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Cyber Kangaroo', prompt: 'Futuristic kangaroo in neon space' },
              { title: 'Digital Warrior', prompt: 'Cyberpunk samurai with glitch effects' },
              { title: 'Quantum Dreams', prompt: 'Abstract digital landscape with quantum elements' }
            ].map((example, index) => (
              <div
                key={index}
                className="bg-purple-950/20 border border-purple-900/30 rounded-lg p-6 hover:border-pink-500/50 transition-all group"
              >
                <h3 className="text-xl mb-4 text-white">{example.title}</h3>
                <p className="text-purple-200/70 mb-4">{example.prompt}</p>
                <button
                  onClick={() => setPrompt(example.prompt)}
                  className="flex items-center text-pink-400 hover:text-pink-300"
                >
                  <Copy size={16} className="mr-2" /> Use Prompt
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
