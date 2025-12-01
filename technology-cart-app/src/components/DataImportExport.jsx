import { useState, useContext } from 'react';
import { TechContext } from '../context/TechContext';
import './DataImportExport.css';

function DataImportExport() {
  const { technologies, setTechnologies } = useContext(TechContext);
  const [status, setStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Экспорт данных в JSON файл
  const handleExport = () => {
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      technologies: technologies,
      stats: {
        total: technologies.length,
        completed: technologies.filter(t => t.status === 'completed').length,
        inProgress: technologies.filter(t => t.status === 'in-progress').length
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `tech-tracker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setStatus(`Экспортировано ${technologies.length} технологий`);
    setTimeout(() => setStatus(''), 3000);
  };

  // Валидация импортируемых данных
  const validateImportData = (data) => {
    if (!data.technologies || !Array.isArray(data.technologies)) {
      throw new Error('Неверный формат файла: отсутствует массив technologies');
    }

    data.technologies.forEach((tech, index) => {
      if (!tech.title || !tech.description) {
        throw new Error(`Технология #${index + 1}: отсутствует название или описание`);
      }

      if (tech.title.length > 50) {
        throw new Error(`Технология "${tech.title}": название слишком длинное`);
      }
    });

    return true;
  };

  // Обработка загруженного файла
  const handleFileUpload = (file) => {
    setStatus('');
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        const importedData = JSON.parse(fileContent);
        
        validateImportData(importedData);

        // Валидация каждой технологии
        const validTechnologies = importedData.technologies.filter(tech => 
          tech && tech.title && tech.description
        );

        if (validTechnologies.length === 0) {
          throw new Error('В файле нет валидных технологий');
        }

        // Добавляем импортированные технологии
        setTechnologies(prev => {
          const newTech = validTechnologies.map(t => ({
            ...t,
            id: t.id || Date.now() + Math.random()
          })).filter(newTech => 
            !prev.some(existingTech => existingTech.id === newTech.id)
          );
          return [...prev, ...newTech];
        });

        setStatus(`Импортировано ${validTechnologies.length} технологий`);
        setTimeout(() => setStatus(''), 3000);
        
      } catch (error) {
        setStatus(`Ошибка импорта: ${error.message}`);
      }
    };

    reader.onerror = () => {
      setStatus('Ошибка чтения файла');
    };

    reader.readAsText(file);
  };

  // Обработчик выбора файла
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        handleFileUpload(file);
      } else {
        setStatus('Поддерживаются только JSON файлы');
      }
    }
    e.target.value = '';
  };

  // Обработчики drag & drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="data-import-export">
      <h2>Импорт/Экспорт данных</h2>
      
      {/* Статус */}
      {status && (
        <div 
          className={`status-message ${status.includes('Ошибка') ? 'error' : 'success'}`}
          role="alert"
        >
          {status}
        </div>
      )}

      {/* Экспорт */}
      <div className="export-section">
        <h3>Экспорт данных</h3>
        <p className="section-description">
          Сохраните все ваши технологии в JSON файл для резервного копирования или переноса.
        </p>
        <button
          onClick={handleExport}
          disabled={technologies.length === 0}
          className="btn-export"
        >
          📥 Экспортировать ({technologies.length})
        </button>
      </div>

      {/* Импорт */}
      <div className="import-section">
        <h3>Импорт данных</h3>
        <p className="section-description">
          Загрузите ранее экспортированный JSON файл с технологиями.
        </p>
        
        <div
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="drop-zone-content">
            <p>📁 Перетащите JSON файл сюда или</p>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileSelect}
              id="file-input"
              className="file-input"
            />
            <label htmlFor="file-input" className="btn-select-file">
              Выберите файл
            </label>
          </div>
        </div>

        <div className="import-help">
          <h4>Требования к файлу:</h4>
          <ul>
            <li>Формат: JSON</li>
            <li>Обязательные поля: title, description</li>
            <li>Максимальная длина названия: 50 символов</li>
          </ul>
        </div>
      </div>

      {/* Статистика */}
      {technologies.length > 0 && (
        <div className="stats-section">
          <h3>Текущая статистика</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{technologies.length}</span>
              <span className="stat-label">Всего</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{technologies.filter(t => t.status === 'completed').length}</span>
              <span className="stat-label">Завершено</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{technologies.filter(t => t.status === 'in-progress').length}</span>
              <span className="stat-label">В процессе</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{technologies.filter(t => t.status === 'not-started').length}</span>
              <span className="stat-label">Не начато</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataImportExport;
