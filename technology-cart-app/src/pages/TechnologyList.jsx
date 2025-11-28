import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TechContext } from '../context/TechContext';
import './TechnologyList.css';

export default function TechnologyList() {
  const { technologies } = useContext(TechContext);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">+ Добавить</Link>
      </div>

      <div className="technologies-grid">
        {technologies.map(tech => (
          <div key={tech.id} className="technology-item">
            <h3>{tech.title}</h3>
            <p className="muted">{tech.description}</p>
            <div className="meta-row">
              <span className={`status status-${tech.status}`}>{tech.status}</span>
              <Link to={`/technology/${tech.id}`} className="btn-link">Подробнее →</Link>
            </div>
          </div>
        ))}
      </div>

      {technologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий пока нет.</p>
          <Link to="/add-technology" className="btn btn-primary">Добавить первую технологию</Link>
        </div>
      )}
    </div>
  );
}
