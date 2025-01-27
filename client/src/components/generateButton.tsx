import { useState, useEffect } from "react";
import { AlertCircle, Loader2, ChevronDown, Sparkles } from "lucide-react";
import { useWallet } from "./walletProvider";

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
  apiKey = import.meta.env.VITE_OPENAI_API_KEY,
}) => {
  console.log("Loaded API Key:", apiKey);

  const { walletAddress, connectWallet } = useWallet();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const maxRequestsPerHour = 10;

  // Initialize rate limit data from localStorage
  useEffect(() => {
    if (!localStorage.getItem("imageGenRequestCount")) {
      localStorage.setItem(
        "imageGenRequestCount",
        JSON.stringify({ count: 0, lastReset: Date.now() })
      );
    }
  }, []);

  const canMakeRequest = () => {
    const rateLimitData = JSON.parse(
      localStorage.getItem("imageGenRequestCount") || "{}"
    );
    const { count, lastReset } = rateLimitData;

    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    const currentTime = Date.now();

    if (currentTime - lastReset > oneHour) {
      // Reset the counter if more than an hour has passed
      localStorage.setItem(
        "imageGenRequestCount",
        JSON.stringify({ count: 0, lastReset: currentTime })
      );
      return true;
    }

    return count < maxRequestsPerHour;
  };

  const incrementRequestCount = () => {
    const rateLimitData = JSON.parse(
      localStorage.getItem("imageGenRequestCount") || "{}"
    );
    const { count, lastReset } = rateLimitData;

    localStorage.setItem(
      "imageGenRequestCount",
      JSON.stringify({
        count: count + 1,
        lastReset: lastReset || Date.now(),
      })
    );
  };

  // Generate image using OpenAI's DALL-E API
  const generateImage = async () => {
    if (!walletAddress) {
      setError("Please connect your wallet to generate images.");
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    if (!canMakeRequest()) {
      setError("Rate limit exceeded. Try again after an hour.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt, // User-provided prompt
            n: 1, // Number of images to generate
            size: "1024x1024", // Image resolution
            response_format: "url", // Get image as a URL
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const imageUrl = data.data[0].url; // Extract the image URL
      onImageGenerated(imageUrl);

      // Increment the request count
      incrementRequestCount();
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
        Generate NFT Artwork
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
            ${
              isGenerating
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-pink-600 hover:to-purple-600"
            }
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
