import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TechContext } from '../context/TechContext';
import {
  Box,
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import MuiTechnologyCard from '../components/MuiTechnologyCard';
import MuiTechnologyModal from '../components/MuiTechnologyModal';
import MuiDashboard from '../components/MuiDashboard';

export default function TechnologyList() {
  const { technologies, addTechnology, updateTechnology, removeTechnology } = useContext(TechContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSaveTechnology = (techData) => {
    if (editingTech) {
      updateTechnology(editingTech.id, techData);
    } else {
      addTechnology({
        ...techData,
        status: 'not-started',
        progress: 0,
        notes: '',
        createdAt: new Date().toISOString()
      });
    }
    setEditingTech(null);
  };

  const handleEdit = (technology) => {
    setEditingTech(technology);
    setIsModalOpen(true);
  };

  const handleDelete = (techId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      removeTechnology(techId);
    }
  };

  const handleStatusChange = (techId, newStatus) => {
    const tech = technologies.find(t => t.id === techId);
    if (tech) {
      updateTechnology(techId, { status: newStatus });
    }
  };

  const filteredTechnologies = technologies.filter(tech => {
    if (filterStatus === 'all') return true;
    return tech.status === filterStatus;
  });

  const statusCounts = {
    all: technologies.length,
    'not-started': technologies.filter(t => t.status === 'not-started').length,
    'in-progress': technologies.filter(t => t.status === 'in-progress').length,
    completed: technologies.filter(t => t.status === 'completed').length,
  };

  return (
    <Box>
      {/* Dashboard */}
      <MuiDashboard technologies={technologies} />

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Мои технологии
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingTech(null);
            setIsModalOpen(true);
          }}
        >
          Добавить
        </Button>
      </Box>

      {/* Фильтры */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={filterStatus} onChange={(e, newValue) => setFilterStatus(newValue)}>
          <Tab
            label={
              <Box display="flex" alignItems="center" gap={1}>
                Все
                <Chip label={statusCounts.all} size="small" />
              </Box>
            }
            value="all"
          />
          <Tab
            label={
              <Box display="flex" alignItems="center" gap={1}>
                Не начато
                <Chip label={statusCounts['not-started']} size="small" />
              </Box>
            }
            value="not-started"
          />
          <Tab
            label={
              <Box display="flex" alignItems="center" gap={1}>
                В процессе
                <Chip label={statusCounts['in-progress']} size="small" color="warning" />
              </Box>
            }
            value="in-progress"
          />
          <Tab
            label={
              <Box display="flex" alignItems="center" gap={1}>
                Завершено
                <Chip label={statusCounts.completed} size="small" color="success" />
              </Box>
            }
            value="completed"
          />
        </Tabs>
      </Box>

      {/* Сетка технологий */}
      {filteredTechnologies.length > 0 ? (
        <Grid container spacing={3}>
          {filteredTechnologies.map(technology => (
            <Grid item xs={12} sm={6} md={4} key={technology.id}>
              <Box onClick={() => navigate(`/technology/${technology.id}`)}>
                <MuiTechnologyCard
                  technology={technology}
                  onEdit={(e) => {
                    e.stopPropagation();
                    handleEdit(technology);
                  }}
                  onDelete={(e) => {
                    e.stopPropagation();
                    handleDelete(technology.id);
                  }}
                  onStatusChange={(id, status) => {
                    handleStatusChange(id, status);
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {filterStatus === 'all' 
              ? 'Технологий пока нет'
              : `Нет технологий со статусом "${filterStatus}"`
            }
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsModalOpen(true)}
            sx={{ mt: 2 }}
          >
            Добавить технологию
          </Button>
        </Box>
      )}

      {/* Модальное окно */}
      <MuiTechnologyModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTech(null);
        }}
        technology={editingTech}
        onSave={handleSaveTechnology}
      />
    </Box>
  );
}
