import React, { useContext } from 'react';
import { TechContext } from '../context/TechContext';
import './Statistics.css';

export default function Statistics() {
  const { technologies } = useContext(TechContext);

  const byStatus = technologies.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const categories = technologies.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});

  const total = technologies.length || 1;

  return (
    <div className="page">
      <h1>Статистика</h1>

      <section className="stat-section">
        <h3>По статусу</h3>
        <div className="bars">
          {['not-started','in-progress','completed'].map(key => {
            const count = byStatus[key] || 0;
            const pct = Math.round((count / total) * 100);
            return (
              <div className="bar-row" key={key}>
                <div className="bar-label">{key} ({count})</div>
                <div className="bar-track"><div className={`bar-fill ${key}`} style={{ width: `${pct}%` }} /></div>
                <div className="bar-pct">{pct}%</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="stat-section">
        <h3>По категориям</h3>
        <div className="cat-list">
          {Object.entries(categories).map(([cat, cnt]) => (
            <div key={cat} className="cat-item">
              <strong>{cat}</strong> — {cnt}
            </div>
          ))}
          {Object.keys(categories).length === 0 && <p>Нет данных</p>}
        </div>
      </section>
    </div>
  );
}
