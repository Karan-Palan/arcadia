const LandingPage = () => {
  return (
    <div className="bg-black text-white font-sans"> 

      {/* Hero Section */}
      <header className="text-center py-20 bg-gradient-to-r from-purple-900 via-pink-700 to-red-600">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          Welcome to Arcadia
        </h1>
        <p className="text-lg mb-8">
          The ultimate platform to create, trade, and explore NFTs in a high-stakes, gamified digital arena.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-r from-purple-800 to-pink-600 p-6 rounded-md shadow-lg text-center transform transition-transform hover:-translate-y-2">
          <h2 className="text-xl font-semibold mb-4">Create NFTs Easily</h2>
          <p>Generate unique NFTs in just a few clicks with our intuitive interface.</p>
        </div>
        <div className="bg-gradient-to-r from-purple-800 to-pink-600 p-6 rounded-md shadow-lg text-center transform transition-transform hover:-translate-y-2">
          <h2 className="text-xl font-semibold mb-4">High Security</h2>
          <p>Leverage the Aptos blockchain for a secure and transparent experience.</p>
        </div>
        <div className="bg-gradient-to-r from-purple-800 to-pink-600 p-6 rounded-md shadow-lg text-center transform transition-transform hover:-translate-y-2">
          <h2 className="text-xl font-semibold mb-4">Zero Gas Fees</h2>
          <p>Enjoy seamless transactions without worrying about extra costs.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-purple-900">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
        <p className="mb-6">Sign up now and start your NFT journey in Arcadia.</p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          Join Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;