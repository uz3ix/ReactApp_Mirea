import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TechContext } from '../context/TechContext';

export default function AddTechnology() {
  const { addTechnology } = useContext(TechContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('frontend');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Укажите название технологии');
      return;
    }
    addTechnology({ title: title.trim(), description: description.trim(), category });
    navigate('/technologies');
  };

  return (
    <div className="page">
      <h1>Добавить технологию</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth:700 }}>
        <div className="form-group">
          <label>Название</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Описание</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        </div>

        <div className="form-group">
          <label>Категория</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="frontend">frontend</option>
            <option value="backend">backend</option>
            <option value="devops">devops</option>
            <option value="other">other</option>
          </select>
        </div>

        <div style={{ marginTop:12 }}>
          <button className="btn btn-primary" type="submit">Добавить</button>
        </div>
      </form>
    </div>
  );
}
