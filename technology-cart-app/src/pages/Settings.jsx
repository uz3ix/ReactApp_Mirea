import React, { useContext } from 'react';
import { TechContext } from '../context/TechContext';

export default function Settings() {
  const { markAllCompleted, resetAll, resetToInitial } = useContext(TechContext);

  return (
    <div className="page">
      <h1>Настройки</h1>

      <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth:600 }}>
        <div>
          <button className="btn" onClick={() => {
            if (window.confirm('Отметить все как выполненные?')) markAllCompleted();
          }}>
            ✅ Отметить все как выполненные
          </button>
        </div>

        <div>
          <button className="btn" onClick={() => {
            if (window.confirm('Сбросить статусы и заметки для всех?')) resetAll();
          }}>
            🔄 Сбросить статусы
          </button>
        </div>

        <div>
          <button className="btn" onClick={() => {
            if (window.confirm('Вернуть первоначальные данные (заменит текущие)?')) resetToInitial();
          }}>
            ♻️ Сбросить до начальных данных
          </button>
        </div>
      </div>
    </div>
  );
}
