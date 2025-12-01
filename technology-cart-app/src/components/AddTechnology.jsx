import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TechContext } from '../contex/TechContext';
import TechnologyForm from './TechnologyForm';

export default function AddTechnology() {
  const { addTechnology } = useContext(TechContext);
  const navigate = useNavigate();

  const handleSave = (techData) => {
    addTechnology({
      ...techData,
      status: 'not-started',
      progress: 0,
      notes: '',
      createdAt: new Date().toISOString()
    });
    navigate('/technologies');
  };

  const handleCancel = () => {
    navigate('/technologies');
  };

  return (
    <div>
      <TechnologyForm 
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
