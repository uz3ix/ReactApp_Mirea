import './technologyCard.css';
import TechnologyCard from "./technologyCard";
import ProgressHeader from "../ProgressHeader/ProgressHeader";

function TechnologyCards({ 
  technologies, 
  allTechnologies, 
  changeStatus, 
  changeAllStatus, 
  activeFilter, 
  setActiveFilter, 
  updateTechnologyNotes,
  searchQuery, 
  setSearchQuery
}) {   
    const filterButtons = [
        { key: 'all', label: 'Все технологии', count: allTechnologies.length },
        { key: 'not-started', label: 'Не начатые', count: allTechnologies.filter(t => t.status === 'not-started').length },
        { key: 'in-progress', label: 'В процессе', count: allTechnologies.filter(t => t.status === 'in-progress').length },
        { key: 'completed', label: 'Выполненные', count: allTechnologies.filter(t => t.status === 'completed').length }
    ];

    return (
        <div className='main-page-container'>
            <div className='header'>
                <ProgressHeader technologies={allTechnologies} />
            </div>
            
            {/* Блок поиска */}
            <div className="search-box" style={{ 
                textAlign: 'center', 
                padding: '1rem', 
                backgroundColor: '#f0f8ff' 
            }}>
                <input
                    type="text"
                    placeholder="Поиск технологий..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '0.5rem',
                        width: '300px',
                        fontSize: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginRight: '1rem'
                    }}
                />
                <span>Найдено: {technologies.length}</span>
            </div>

            <div className="filters-panel">
                <h3 className='filter-title'>Фильтры:</h3>
                <div className="filter-buttons">
                    {filterButtons.map(button => (
                        <button
                        key={button.key}
                        className={`filter-btn ${activeFilter === button.key ? 'active' : ''}`}
                        onClick={() => setActiveFilter(button.key)}
                        >
                        {button.label} ({button.count})
                        </button>
                ))}
                </div>
                <div className="active-filter-info">
                Показано: {technologies.length} из {allTechnologies.length}
                </div>
            </div>

            <div className="card-container">
                <TechnologyCard 
                technologies={technologies} 
                changeStatus={changeStatus} 
                changeAllStatus={changeAllStatus}
                updateTechnologyNotes={updateTechnologyNotes}
                />
            </div>
        </div>
    );
}

export default TechnologyCards;