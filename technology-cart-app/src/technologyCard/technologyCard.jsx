import { useState } from 'react';
import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange, onNotesChange, onOpenModal }) {
  const [localStatus, setLocalStatus] = useState(technology.status);

  const handleStatus = (e) => {
    const newStatus = e.target.value;
    setLocalStatus(newStatus);
    onStatusChange(technology.id, newStatus);
  };

  return (
    <div className="tech-card">
      <div className="tech-card-header">
        <h3>{technology.title}</h3>
        <span className={`tech-badge ${technology.status}`}>{technology.status}</span>
      </div>

      <p className="tech-desc">{technology.description}</p>

      <div className="tech-controls">
        <select value={localStatus} onChange={handleStatus}>
          <option value="not-started">Не начато</option>
          <option value="in-progress">В процессе</option>
          <option value="completed">Выполнено</option>
        </select>

        <div className="tech-buttons">
          <button onClick={() => onOpenModal(technology)} className="btn">Заметки</button>
        </div>
      </div>
    </div>
  );
}

export default TechnologyCard;
