import { useState } from "react";
import { AlertCircle, Loader2, ChevronDown, Sparkles } from "lucide-react";
import { useWallet } from "./walletProvider";

// Define model interface
interface Model {
  id: string;
  name: string;
  provider: string;
  endpoint: string;
  description: string;
  maxTokens: number;
}

// Define supported models
const SUPPORTED_MODELS: Model[] = [
  {
    id: "flux-1",
    name: "FLUX-1.dev",
    provider: "Black Forest Labs",
    endpoint:
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
    description: "Optimized for artistic and creative generations.",
    maxTokens: 77,
  },
  {
    id: "sd-2-1",
    name: "Stable Diffusion 2.1",
    provider: "Stability AI",
    endpoint:
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
    description: "Versatile image generation model.",
    maxTokens: 77,
  },
];

// Define predefined prompt templates
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
  apiKey?: string;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  prompt,
  onImageGenerated,
  onPromptChange,
  apiKey = import.meta.env.VITE_HUGGING_FACE_API_KEY,
}) => {
  const { walletAddress, connectWallet } = useWallet();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string>("flux-1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedModel = SUPPORTED_MODELS.find(
    (model) => model.id === selectedModelId
  )!;

  // Generate image
  const generateImage = async () => {
    if (!walletAddress) {
      setError("Please connect your wallet to generate images.");
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(selectedModel.endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          options: { wait_for_model: true },
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      onImageGenerated(imageUrl);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Select a random prompt
  const generateRandomPrompt = () => {
    const randomPrompt =
      PROMPT_TEMPLATES[Math.floor(Math.random() * PROMPT_TEMPLATES.length)];
    onPromptChange(randomPrompt);
  };

  return (
    <div className="relative space-y-4">
      {/* Header */}
      <h2 className="text-center text-pink-400 text-xl font-semibold">
        Choose a Model & Generate
      </h2>

      {/* Prompt Input */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Describe your NFT artwork..."
        className="w-full px-4 py-2 bg-purple-900/30 border border-purple-600 
          text-white rounded-lg focus:outline-none focus:ring focus:ring-pink-500/50"
      />

      {/* Buttons */}
      <div className="flex gap-4">
        {/* Generate Button */}
        <button
          onClick={generateImage}
          disabled={isGenerating}
          className={`flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 
            text-white font-semibold rounded-lg shadow-sm transition-all
            ${isGenerating ? "opacity-50 cursor-not-allowed" : "hover:from-pink-600 hover:to-purple-600"}
          `}
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "Generate"
          )}
        </button>

        {/* Surprise Me Button */}
        <button
          onClick={generateRandomPrompt}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 
            text-white font-semibold rounded-lg shadow-sm hover:from-blue-600 hover:to-teal-600"
        >
          <Sparkles className="w-5 h-5 inline" /> Surprise Me
        </button>
      </div>

      {/* Model Selector */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full px-4 py-2 bg-purple-800/30 text-white border border-purple-600 rounded-lg 
            flex justify-between items-center hover:bg-purple-900/50 transition-all"
        >
          {selectedModel.name}
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full bg-purple-900/70 border border-purple-600 rounded-lg mt-2">
            {SUPPORTED_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  setSelectedModelId(model.id);
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-white hover:bg-purple-800/50 transition-all ${
                  selectedModelId === model.id ? "bg-purple-700" : ""
                }`}
              >
                {model.name} <span className="text-sm text-pink-300">({model.provider})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Display */}
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
