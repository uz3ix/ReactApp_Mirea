import React, { useContext } from 'react';
import { TechContext } from '../context/TechContext';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Home() {
  const { technologies, progress } = useContext(TechContext);

  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;

  return (
    <div className="page">
      <h1>Добро пожаловать!</h1>
      <p>Это твой трекер изучения технологий. Отслеживай прогресс, добавляй новые технологии и веди заметки.</p>

      <section style={{ marginTop: 18 }}>
        <h2>Краткая статистика</h2>
        <div style={{ maxWidth: 700 }}>
          <ProgressBar progress={progress} label="Общий прогресс" animated={true} height={18} />
          <div style={{ marginTop: 10 }}>
            <strong>Всего технологий:</strong> {total} &nbsp; • &nbsp;
            <strong>Выполнено:</strong> {completed}
          </div>
        </div>
      </section>
    </div>
  );
}
