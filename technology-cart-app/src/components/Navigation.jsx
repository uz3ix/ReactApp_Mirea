import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/" end>Главная</NavLink>
      <NavLink to="/technologies">Технологии</NavLink>
      <NavLink to="/add">Добавить</NavLink>
      <NavLink to="/statistics">Статистика</NavLink>
      <NavLink to="/import-export">Импорт/Экспорт</NavLink>
      <NavLink to="/demo-form">Демо-форма</NavLink>
      <NavLink to="/settings">Настройки</NavLink>
    </nav>
  );
}
