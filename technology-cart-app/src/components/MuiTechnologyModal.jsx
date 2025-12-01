import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

function MuiTechnologyModal({ open, onClose, technology, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    difficulty: 'beginner',
    deadline: '',
    resources: ['']
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (technology) {
      setFormData({
        title: technology.title || '',
        description: technology.description || '',
        category: technology.category || 'frontend',
        difficulty: technology.difficulty || 'beginner',
        deadline: technology.deadline || '',
        resources: technology.resources || ['']
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'frontend',
        difficulty: 'beginner',
        deadline: '',
        resources: ['']
      });
    }
    setErrors({});
  }, [technology, open]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Минимум 2 символа';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Минимум 10 символов';
    }

    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (deadlineDate < today) {
        newErrors.deadline = 'Дата не может быть в прошлом';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources];
    newResources[index] = value;
    setFormData(prev => ({
      ...prev,
      resources: newResources
    }));
  };

  const addResourceField = () => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, '']
    }));
  };

  const removeResourceField = (index) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        resources: newResources
      }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const cleanedData = {
        ...formData,
        resources: formData.resources.filter(r => r.trim() !== '')
      };
      onSave(cleanedData);
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {technology ? 'Редактировать технологию' : 'Добавить технологию'}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="title"
            label="Название технологии"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            required
            fullWidth
          />

          <TextField
            name="description"
            label="Описание"
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            required
            multiline
            rows={4}
            fullWidth
          />

          <TextField
            name="category"
            label="Категория"
            value={formData.category}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
            <MenuItem value="mobile">Mobile</MenuItem>
            <MenuItem value="devops">DevOps</MenuItem>
            <MenuItem value="database">Базы данных</MenuItem>
            <MenuItem value="tools">Инструменты</MenuItem>
          </TextField>

          <TextField
            name="difficulty"
            label="Уровень сложности"
            value={formData.difficulty}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value="beginner">Начинающий</MenuItem>
            <MenuItem value="intermediate">Средний</MenuItem>
            <MenuItem value="advanced">Продвинутый</MenuItem>
          </TextField>

          <TextField
            name="deadline"
            label="Планируемая дата освоения"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            error={!!errors.deadline}
            helperText={errors.deadline}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <Box>
            <Box sx={{ mb: 1, fontWeight: 600 }}>Ресурсы для изучения</Box>
            {formData.resources.map((resource, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  value={resource}
                  onChange={(e) => handleResourceChange(index, e.target.value)}
                  placeholder="https://example.com"
                  size="small"
                  fullWidth
                />
                {formData.resources.length > 1 && (
                  <Button
                    onClick={() => removeResourceField(index)}
                    color="error"
                    variant="outlined"
                    size="small"
                  >
                    ×
                  </Button>
                )}
              </Box>
            ))}
            <Button
              onClick={addResourceField}
              variant="outlined"
              size="small"
            >
              + Добавить ресурс
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Отмена
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {technology ? 'Обновить' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MuiTechnologyModal;
