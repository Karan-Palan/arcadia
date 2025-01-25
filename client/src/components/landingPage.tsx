import { useState } from 'react';
import { Sparkles, Zap, Copy, RefreshCw } from 'lucide-react';

const LandingPage = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const generateImage = () => {
    // Placeholder for image generation logic
    setGeneratedImage('/placeholder-image.jpg');
  };
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
       <div className="absolute inset-0 pointer-events-none animate-pulse">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full 
              animate-star-twinkle delay-${Math.floor(Math.random() * 5)}s`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
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
            NFT Nexus
          </h1>
          <p className="text-xl text-purple-200/70 max-w-2xl mx-auto">
            Transform your creative vision into blockchain-ready digital art with cutting-edge AI generation
          </p>
        </header>
        {/* Generator Section */}
        <section className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-900/30 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Prompt Input */}
            <div className="flex-grow space-y-4">
              <div className="relative">
                <input 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your NFT artwork..."
                  className="w-full h-16 rounded-lg bg-purple-950/30 border border-purple-900/30 px-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button 
                  onClick={generateImage}
                  className="absolute right-2 top-2 bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-md hover:opacity-80 transition-opacity"
                >
                  <Zap size={24} />
                </button>
              </div>
              
              {/* Model & Style Selectors */}
              <div className="flex space-x-4">
                <select className="w-1/2 bg-purple-950/30 border border-purple-900/30 rounded-lg px-3 py-2 text-white">
                  <option>Stable Diffusion</option>
                  <option>FLUX.1-dev</option>
                </select>
                <select className="w-1/2 bg-purple-950/30 border border-purple-900/30 rounded-lg px-3 py-2 text-white">
                  <option>Cyberpunk</option>
                  <option>Vaporwave</option>
                  <option>Anime</option>
                </select>
              </div>
            </div>
            {/* Generated Image Preview */}
            <div className="w-1/2 min-h-[400px] bg-purple-950/20 border border-purple-900/30 rounded-lg flex items-center justify-center">
              {generatedImage ? (
                <img 
                  src={generatedImage} 
                  alt="Generated NFT" 
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center text-purple-200/50">
                  <Sparkles size={64} className="mx-auto mb-4" />
                  <p>Your AI-generated NFT appears here</p>
                </div>
              )}
            </div>
          </div>
          {/* Action Buttons */}
          {generatedImage && (
            <div className="mt-8 flex justify-center space-x-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg hover:opacity-80">
                Mint NFT
              </button>
              <button className="border border-pink-500 text-pink-400 px-6 py-3 rounded-lg hover:bg-pink-500/10">
                <RefreshCw size={20} className="mr-2 inline" /> Regenerate
              </button>
            </div>
          )}
        </section>
        {/* Example Prompts Section */}
        <section className="mt-16">
          <h2 className="text-center text-3xl mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Inspiration Gallery
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
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