import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import DataImportExport from './components/DataImportExport';
import WorkingAccessibleForm from './components/WorkingAccessibleForm';
import { TechProvider } from './context/TechContext'; 
import './App.css';

function App() {
  return (
        <div className="App">
          <Navigation />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/technologies" element={<TechnologyList />} />
              <Route path="/technology/:techId" element={<TechnologyDetail />} />
              <Route path="/add" element={<AddTechnology />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/import-export" element={<DataImportExport />} />
              <Route path="/demo-form" element={<WorkingAccessibleForm />} />
            </Routes>
          </main>
        </div>
  );
}

export default App;
