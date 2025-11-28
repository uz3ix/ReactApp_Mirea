import { useState, useEffect} from 'react';
import Modal from './Modal/Modal';

function TechnologyModal({ tech, isOpen, onClose, onSaveNotes, onStatusChange }) {
  const [notes, setNotes] = useState(tech?.notes || '');
  const [status, setStatus] = useState(tech?.status || 'not-started');

  useEffect(() => {
    setNotes(tech?.notes || '');
    setStatus(tech?.status || 'not-started');
  }, [tech]);

  if (!tech) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={tech.title}>
      <p style={{ marginTop: 0 }}>{tech.description}</p>

      <div style={{ margin: '12px 0' }}>
        <label style={{ display:'block', marginBottom:6 }}>Статус</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="not-started">Не начато</option>
          <option value="in-progress">В процессе</option>
          <option value="completed">Выполнено</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display:'block', marginBottom:6 }}>Заметки</label>
        <textarea
          rows={6}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius:6, border:'1px solid #ddd' }}
        />
      </div>

      <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
        <button onClick={onClose} className="btn">Отменить</button>
        <button
          onClick={() => {
            onStatusChange(tech.id, status);
            onSaveNotes(tech.id, notes);
            onClose();
          }}
          className="btn btn-primary"
        >
          Сохранить
        </button>
      </div>
    </Modal>
  );
}

export default TechnologyModal;
