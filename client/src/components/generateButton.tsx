import { useState } from "react";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";
import { useWallet } from "./walletProvider";

const PROMPT_TEMPLATES = [
  "A futuristic city with neon lights and flying cars",
  "A mystical forest with glowing trees and magical creatures",
  "A cyberpunk character with a robotic arm and neon highlights",
  "An alien landscape with crystalline formations under two suns",
  "A surreal scene of a floating island with waterfalls in space",
  "A kaleidoscopic explosion of geometric patterns in vibrant colors",
];

interface GenerateButtonProps {
  prompt: string;
  onImageGenerated: (imageUrl: string) => void;
  onPromptChange: (newPrompt: string) => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  prompt,
  onImageGenerated,
  onPromptChange,
}) => {
  const { walletAddress } = useWallet();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load RapidAPI key from environment variables
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

  const generateImage = async () => {
    if (!walletAddress) {
      setError("Please connect your wallet to generate images.");
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    if (!apiKey) {
      setError("API key not found. Check your .env file.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const url =
        "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic";
      const options = {
        method: "POST",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "ai-text-to-image-generator-api.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const imageUrl = data.url;
      onImageGenerated(imageUrl);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      console.error("Error generating image:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateRandomPrompt = () => {
    const randomPrompt =
      PROMPT_TEMPLATES[Math.floor(Math.random() * PROMPT_TEMPLATES.length)];
    onPromptChange(randomPrompt);
  };

  return (
    <div className="relative space-y-4">
      <h2 className="text-center text-pink-400 text-xl font-semibold">
        Generate NFT Artwork
      </h2>

      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Describe your NFT artwork..."
        className="w-full px-4 py-2 bg-purple-900/30 border border-purple-600 text-white rounded-lg focus:outline-none focus:ring focus:ring-pink-500/50"
      />

      <div className="flex gap-4">
        <button
          onClick={generateImage}
          disabled={isGenerating}
          className={`flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-sm transition-all ${
            isGenerating
              ? "opacity-50 cursor-not-allowed"
              : "hover:from-pink-600 hover:to-purple-600"
          }`}
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "Generate"
          )}
        </button>

        <button
          onClick={generateRandomPrompt}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-sm hover:from-blue-600 hover:to-teal-600"
        >
          <Sparkles className="w-5 h-5 inline" /> Surprise Me
        </button>
      </div>

      {error && (
        <div className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg text-center">
          <AlertCircle className="inline-block w-5 h-5 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
};

export default GenerateButton;
