import TechnologyCards from "./technologyCard/technologyCards";
import { useState, useEffect } from "react";

function App() {
    const [technologies, setTechnologies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Загружаем данные из localStorage только один раз при монтировании
    useEffect(() => {
      const saved = localStorage.getItem('techTrackerData');
      if (saved) {
        setTechnologies(JSON.parse(saved));
        console.log('Данные загружены из localStorage');
      } else {
        setTechnologies([
          { 
            id: 1, 
            title: 'React Components', 
            description: 'Изучение базовых компонентов', 
            status: 'not-started',
            notes: ''
          },
          { 
            id: 2, 
            title: 'JSX Syntax', 
            description: 'Освоение синтаксиса JSX', 
            status: 'not-started',
            notes: ''
          },
          {
            id: 3,
            title: 'Python',
            description: 'Написание бэкенда',
            status: 'completed',
            notes: ''
          }
        ]);
      }
      setIsLoaded(true);
    }, []);

    // Сохраняем технологии в localStorage при любом изменении
    useEffect(() => {
      if (isLoaded && technologies.length > 0) {
        localStorage.setItem('techTrackerData', JSON.stringify(technologies));
        console.log('Данные сохранены в localStorage:', technologies);
      }
    }, [technologies, isLoaded]);

    const updateTechnologyNotes = (techId, newNotes) => {
      setTechnologies(prevTech => 
        prevTech.map(tech => 
          tech.id === techId ? { ...tech, notes: newNotes } : tech
        )
      );
    };

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
        prevTechnologies.map(t => ({
          ...t,
          status: newStatus
        }))
      )
    }

    // фильтры по статусу
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

    // поиск
    const [searchQuery, setSearchQuery] = useState('')

    // применяем оба фильтра: сначала по статусу, потом поиск
    const filteredTechnologiesBySearch = filteredTechnologies.filter(tech => 
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Пока данные загружаются, можно показать заглушку
    if (!isLoaded) {
      return <div>Загрузка...</div>;
    }

    return (
      <div className="App">
          <TechnologyCards 
            technologies={filteredTechnologiesBySearch}
            allTechnologies={technologies}
            changeStatus={changeStatus}
            changeAllStatus={changeAllStatus}
            activeFilter={activeFilter}
            setActiveFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            updateTechnologyNotes={updateTechnologyNotes}
          />
      </div>
    );
}

export default App;