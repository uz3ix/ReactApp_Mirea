import './technologyCard.css';
import TechnologyCard from "./technologyCard";
import ProgressHeader from "../ProgressHeader/ProgressHeader";
function TechnologyCards() {   
    const technologies = [
        { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed' },
        { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress' },
        { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' }
        ];
    return (
        <div>
            <div className='header'>
                <ProgressHeader technologies={technologies} />
            </div>
            <div className="card-container">
                <TechnologyCard technologies={technologies} />
            </div>
        </div>
    );
}

export default TechnologyCards;