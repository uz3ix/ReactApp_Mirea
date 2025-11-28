import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { TechProvider } from './context/TechContext';
import Navigation from './components/Navigation';

import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';

import './App.css';
import './pages/TechnologyList.css';
import './pages/Statistics.css';

function App() {
  return (
    <TechProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/technologies" element={<TechnologyList />} />
              <Route path="/technology/:techId" element={<TechnologyDetail />} />
              <Route path="/add-technology" element={<AddTechnology />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/settings" element={<Settings />} />
              {/* можно добавить 404 */}
            </Routes>
          </main>
        </div>
      </Router>
    </TechProvider>
  );
}

export default App;
