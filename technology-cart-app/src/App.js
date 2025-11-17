import TechnologyCards from "./technologyCard/technologyCards";
import { useState } from "react";
function App() {
  const [technologies, setTechnologies] = useState([
      { 
          id: 1, 
          title: 'React Components', 
          description: 'Изучение базовых компонентов', 
          status: 'not-started' 
      },
      { 
          id: 2, 
          title: 'JSX Syntax', 
          description: 'Освоение синтаксиса JSX', 
          status: 'not-started' 
      },
      {
          id: 3,
          title: 'Python',
          description: 'Написание бэкенда',
          status: 'completed'
      }
  ]);

  // изменение статусов
  const changeStatus = (id) => {
      setTechnologies(prevTechnologies => 
          prevTechnologies.map(tech => {
              if (tech.id === id) {
                  const statusOrder = ['not-started', 'in-progress', 'completed'];
                  const currentIndex = statusOrder.indexOf(tech.status);
                  const nextIndex = (currentIndex + 1) % statusOrder.length;
                  return {
                      ...tech,
                      status: statusOrder[nextIndex]
                  };
              }
              return tech;
          })
      );
  }

  const changeAllStatus = (newStatus) => {
    setTechnologies(prevTechnologies =>
      prevTechnologies.map(t => {
        return{
          ...t,
          status: newStatus
        };
      })
    )
  }

  // инициализация фильтров и функция по их изменению
  const [activeFilter, setFilter] = useState('all')

  const filteredTechnologies = technologies.filter(tech => {
    switch (activeFilter) {
      case 'not-started':
        return tech.status === 'not-started';
      case 'in-progress':
        return tech.status === 'in-progress';
      case 'completed':
        return tech.status === 'completed';
      default:
        return true; 
    }
  });

  return (
    <div className="App">
      <TechnologyCards 
        technologies = {filteredTechnologies}
        allTechnologies = {technologies}
        changeStatus = {changeStatus}
        changeAllStatus = {changeAllStatus}
        activeFilter = {activeFilter}
        setActiveFilter = {setFilter}
      />
    </div>
  );
}

export default App;
