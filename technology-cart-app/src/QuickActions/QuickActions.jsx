import { useState } from 'react';
import Modal from '../Modal/Modal';
import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies,
    };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `technologies-export-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportModal(true);
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="action-buttons">
        <button onClick={onMarkAllCompleted} className="btn success">✅ Отметить все как выполненные</button>
        <button onClick={onResetAll} className="btn warning">🔄 Сбросить все статусы</button>
        <button onClick={handleExport} className="btn info">📤 Экспорт данных</button>
      </div>

      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Экспорт данных">
        <p>Данные успешно подготовлены для экспорта и скачаны как файл.</p>
        <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
          <button onClick={() => setShowExportModal(false)} className="btn">Закрыть</button>
        </div>
      </Modal>
    </div>
  );
}

export default QuickActions;
