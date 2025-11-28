import React, { useState } from 'react';
import useTechnologies from './useLocalStorage/useTechnologies';
import ProgressBar from './ProgressBar/ProgressBar';
import TechnologyCard from './TechnologyCard/TechnologyCard';
import TechnologyModal from './TechnologyModal';
import QuickActions from './QuickActions/QuickActions';
import './App.css';

function App() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    progress,
  } = useTechnologies();

  const [activeTech, setActiveTech] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (tech) => {
    setActiveTech(tech);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveTech(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Трекер изучения технологий</h1>
        <div style={{ maxWidth: 600, width: '100%' }}>
          <ProgressBar progress={progress} label="Общий прогресс" color="#4CAF50" animated={true} height={18} />
        </div>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <QuickActions
            onMarkAllCompleted={markAllCompleted}
            onResetAll={resetAll}
            technologies={technologies}
          />
        </aside>

        <section className="content">
          <div className="technologies-grid">
            {technologies.map(tech => (
              <TechnologyCard
                key={tech.id}
                technology={tech}
                onStatusChange={updateStatus}
                onNotesChange={updateNotes}
                onOpenModal={openModal}
              />
            ))}
          </div>
        </section>
      </main>

      <TechnologyModal
        tech={activeTech}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSaveNotes={updateNotes}
        onStatusChange={updateStatus}
      />
    </div>
  );
}

export default App;
