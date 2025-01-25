import { Wallet, ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
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
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);

  const formatAddress = (address: string | any[]) => {
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
      <div className="flex items-center px-2">
        <img className="w-18" src="/arcadia-logo.png" alt="logo" />
        <a
          href="/"
          className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Arcadia
        </a>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <a href="#" className="hover:text-pink-400 transition-colors">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-pink-400 transition-colors">
            Marketplace
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-pink-400 transition-colors">
            Contact
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
            <Wallet className="w-4 h-4" /> Install Wallet <ExternalLink className="w-4 h-4" />
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
              <div className="absolute right-0 mt-2 w-48 bg-black border border-pink-900/30 rounded-lg shadow-xl z-10">
                <div className="py-2 px-4">
                  <p className="text-xs text-pink-200/70">Connected to {walletProvider}</p>
                  <p className="text-xs text-pink-200/50 break-all">{walletAddress}</p>
                </div>
                <button
                  onClick={disconnect}
                  className="w-full px-4 py-2 text-left text-pink-200/70 hover:text-white hover:bg-pink-950/20 transition-colors"
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
          <div className="absolute right-0 mt-2 w-48 bg-black border border-pink-900/30 rounded-lg shadow-xl z-10">
            <div className="py-1">
              {window.aptos && (
                <button
                  className="w-full px-4 py-2 text-left text-pink-200/70 hover:text-white hover:bg-pink-950/20 transition-colors flex items-center gap-2"
                  onClick={() => handleWalletConnect("Petra")}
                >
                  <img
                    src="/petra-wallet.png"
                    alt="Petra Wallet"
                    className="w-4 h-4"
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
