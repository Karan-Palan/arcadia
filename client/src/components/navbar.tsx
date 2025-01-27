import { useState } from "react";
import { Wallet, ChevronDown, ExternalLink } from "lucide-react";
import { useWallet } from "./walletProvider";

const Navbar = () => {
  const {
    walletAddress,
    walletProvider,
    isConnecting,
    connectWallet,
    disconnect,
    error,
  } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleWalletConnect = async (provider: string) => {
    try {
      await connectWallet(provider);
      setShowWalletDropdown(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-pink-900/30">
      {/* Logo and Brand */}
      <div className="flex items-center">
        <img className="w-12 h-12" src="/arcadia-logo.png" alt="logo" />
        <a
          href="/"
          className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Arcadia
        </a>
      </div>

      {/* Hamburger Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-pink-400 transition-colors focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12" // Close Icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger Icon
              }
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <ul
        className={`lg:flex lg:items-center absolute lg:static top-16 left-0 w-full lg:w-auto bg-black lg:bg-transparent flex-col lg:flex-row items-center z-10 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <li className="py-2 lg:py-0">
          <a
            href="#"
            className="block lg:inline hover:text-pink-400 transition-colors px-4"
          >
            Home
          </a>
        </li>
        <li className="py-2 lg:py-0">
          <a
            href="https://arcadiapump.vercel.app/"
            className="block lg:inline hover:text-pink-400 transition-colors px-4"
          >
            Marketplace
          </a>
        </li>
      </ul>

      {/* Wallet Connection */}
      <div className="relative">
        {!window.aptos && !window.martian ? (
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
            onClick={() => window.open("https://petra.app/", "_blank")}
          >
            <Wallet className="w-4 h-4" /> Install Wallet{" "}
            <ExternalLink className="w-4 h-4" />
          </button>
        ) : walletAddress ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWalletDropdown(!showWalletDropdown)}
              className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              {formatAddress(walletAddress)}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showWalletDropdown && (
              <div className="absolute right-0 mt-50 w-full bg-black border border-pink-900/30 rounded-lg shadow-xl z-20">
                <div className="py-2 px-4">
                  <p className="text-xs text-pink-200/70">
                    Connected to {walletProvider}
                  </p>
                  <p className="text-xs text-pink-200/50 break-all">
                    {walletAddress}
                  </p>
                </div>
                <button
                  onClick={disconnect}
                  className="w-full px-4 py-2 text-left text-red-200 hover:text-white"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
            onClick={() => setShowWalletDropdown(!showWalletDropdown)}
            disabled={isConnecting}
          >
            <Wallet className="w-4 h-4" />
            {isConnecting ? "Connecting..." : "Connect Wallet"}
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
        {/* Wallet Dropdown for Selecting Provider */}
        {showWalletDropdown && !walletAddress && (
          <div className="absolute right-0 mt-10 w-48 bg-black border border-pink-900/30 rounded-lg shadow-xl z-10">
            <div className="py-1">
              {window.aptos && (
                <button
                  className="w-full px-4 py-2 text-left text-pink-200/70 hover:text-white hover:bg-pink-950/20 transition-colors flex items-center gap-2 "
                  onClick={() => handleWalletConnect("Petra")}
                >
                  <img
                    src="/petra-wallet.png"
                    alt="Petra Wallet"
                    className="w-10 h-10"
                  />
                  Petra Wallet
                </button>
              )}
              {window.martian && (
                <button
                  className="w-full px-4 py-2 text-left text-pink-200/70 hover:text-white hover:bg-pink-950/20 transition-colors flex items-center gap-2"
                  onClick={() => handleWalletConnect("Martian")}
                >
                  <img
                    src="/martian-wallet-icon.avif"
                    alt="Martian Wallet"
                    className="w-4 h-4"
                  />
                  Martian Wallet
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
