import Navbar from "./components/navbar";
import LandingPage from "./components/landingPage";
import Footer from "./components/footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WalletProvider } from "./components/walletProvider";

function App() {
  return (
    <WalletProvider>
    <div className="press2start-regular">
    {/* <div> */}
      <Navbar />
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
    </WalletProvider>

  );
}

export default App;
