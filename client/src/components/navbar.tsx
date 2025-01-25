const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center px-2">
        <img className="w-18" src="/arcadia-logo.png" alt="logo" />
        <a href="/" className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Arcadia</a>
      </div>
      <ul className="flex space-x-6">
        <li>
          <a href="#" className="hover:text-pink-400 transition-colors">Home</a>
        </li>
        <li>
          <a href="#" className="hover:text-pink-400 transition-colors">Marketplace</a>
        </li>
        <li>
          <a href="#" className="hover:text-pink-400 transition-colors">Contact</a>
        </li>
      </ul>
      <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
        Connect Wallet
      </button>
    </nav>
  );
};

export default Navbar;