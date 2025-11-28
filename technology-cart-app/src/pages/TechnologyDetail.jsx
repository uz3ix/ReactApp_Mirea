import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TechContext } from '../context/TechContext';

export default function TechnologyDetail() {
  const { techId } = useParams();
  const { technologies, updateTechnology, removeTechnology } = useContext(TechContext);
  const navigate = useNavigate();

  const [technology, setTechnology] = useState(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('not-started');

  useEffect(() => {
    const t = technologies.find(x => x.id === Number(techId));
    if (t) {
      setTechnology(t);
      setNotes(t.notes || '');
      setStatus(t.status || 'not-started');
    } else {
      setTechnology(null);
    }
  }, [techId, technologies]);

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn">← Назад к списку</Link>
      </div>
    );
  }

const handleSave = () => {
  updateTechnology(technology.id, {
    status,
    notes
  });
  alert('Сохранено');
};


  const handleDelete = () => {
    if (window.confirm('Удалить технологию?')) {
      removeTechnology(technology.id);
      navigate('/technologies');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">← Назад к списку</Link>
        <h1>{technology.title}</h1>
      </div>

      <div className="technology-detail">
        <div style={{ marginBottom: 12 }}>
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h3>Статус</h3>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Выполнено</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h3>Мои заметки</h3>
          <textarea rows={6} value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width:'100%', padding:8 }} />
        </div>

        <div style={{ display:'flex', gap:8 }}>
          <button onClick={handleSave} className="btn btn-primary">Сохранить</button>
          <button onClick={handleDelete} className="btn">Удалить</button>
        </div>
      </div>
    </div>
  );
}
