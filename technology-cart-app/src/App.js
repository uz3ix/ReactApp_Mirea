import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import TechnologyList from "./pages/TechnologyList";
import TechnologyDetail from "./pages/TechnologyDetail";
import AddTechnology from "./pages/AddTechnology";

import RoadmapImporter from "./components/RoadmapImporter";
import TechSearch from "./components/TechSearch";
import { TechContext } from "./context/TechContext";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navigation />

      <div style={{ padding: 20 }}>
        <RoadmapImporter />

        <TechSearch onSearch={setSearch} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technologies" element={<TechnologyList search={search} />} />
          <Route path="/tech/:techId" element={<TechnologyDetail />} />
          <Route path="/add" element={<AddTechnology />} />
        </Routes>
      </div>
    </>
  );
}
