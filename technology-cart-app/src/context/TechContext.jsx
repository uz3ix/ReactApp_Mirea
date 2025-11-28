import React, { createContext } from 'react';
import useLocalStorage from '../useLocalStorage/useLocalStorage';

const INITIAL_TECHS = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'not-started', notes: '', category: 'frontend' },
  { id: 2, title: 'Node.js Basics', description: 'Основы серверного JavaScript', status: 'not-started', notes: '', category: 'backend' },
  { id: 3, title: 'CSS Layouts', description: 'Flexbox и Grid', status: 'in-progress', notes: '', category: 'frontend' },
  { id: 4, title: 'Databases', description: 'Основы работы с БД', status: 'not-started', notes: '', category: 'backend' },
];

export const TechContext = createContext(null);

export function TechProvider({ children }) {
  const [technologies, setTechnologies] = useLocalStorage('technologies', INITIAL_TECHS);

  const addTechnology = (payload) => {
    setTechnologies(prev => {
      const nextId = prev.length ? Math.max(...prev.map(p => p.id)) + 1 : 1;
      return [...prev, { id: nextId, notes: '', status: 'not-started', ...payload }];
    });
  };

    const updateTechnology = (techId, data) => {
    setTechnologies(prev =>
        prev.map(t =>
        t.id === techId ? { ...t, ...data } : t
        )
    );
};
  const removeTechnology = (techId) => {
    setTechnologies(prev => prev.filter(t => t.id !== techId));
  };

  const markAllCompleted = () => {
    setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
  };

  const resetAll = () => {
    setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started', notes: '' })));
  };

  const resetToInitial = () => {
    setTechnologies(INITIAL_TECHS);
  };

  const calculateProgress = () => {
    if (!technologies || technologies.length === 0) return 0;
    const completed = technologies.filter(t => t.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  return (
    <TechContext.Provider value={{
      technologies,
      addTechnology,
      updateTechnology,
      removeTechnology,
      markAllCompleted,
      resetAll,
      resetToInitial,
      progress: calculateProgress()
    }}>
      {children}
    </TechContext.Provider>
  );
}
