import SitePage from "./components/SitePage";
import './App.css'
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegionPage from "./components/RegionPage";
import { RegionsProvider } from "./context/RegionsContext";

export default function App() {

  return (
    <RegionsProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:siteId" element={<SitePage />} />
        <Route path="/regions/:regionId" element={<RegionPage />} />
      </Routes>
    </RegionsProvider>
  );
}
