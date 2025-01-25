import Navbar from "./components/navbar";
import LandingPage from "./components/landingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="press2start-regular">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
