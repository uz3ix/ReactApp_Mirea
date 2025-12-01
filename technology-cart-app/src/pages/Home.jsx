import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TechContext } from '../context/TechContext';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

export default function Home() {
  const { technologies, progress } = useContext(TechContext);
  const navigate = useNavigate();

  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;

  return (
    <Box>
      {/* Hero секция */}
      <Paper
        sx={{
          p: 6,
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          🚀 Трекер изучения технологий
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Отслеживай прогресс, добавляй новые технологии и веди заметки
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate('/add')}
          sx={{
            backgroundColor: 'white',
            color: '#667eea',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)',
            },
          }}
        >
          Добавить технологию
        </Button>
      </Paper>

      {/* Статистика */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <SchoolIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h4" color="primary">
                    {total}
                  </Typography>
                  <Typography color="text.secondary">
                    Всего технологий
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <TrendingUpIcon sx={{ fontSize: 48, color: 'success.main' }} />
                <Box>
                  <Typography variant="h4" color="success.main">
                    {completed}
                  </Typography>
                  <Typography color="text.secondary">
                    Завершено
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: 'warning.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                  }}
                >
                  🔄
                </Box>
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {inProgress}
                  </Typography>
                  <Typography color="text.secondary">
                    В процессе
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Прогресс */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📈 Общий прогресс изучения
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Box flex={1}>
              <LinearProgress
                variant="determinate"
                value={progress || 0}
                sx={{ height: 12, borderRadius: 6 }}
              />
            </Box>
            <Typography variant="h6" color="primary" sx={{ minWidth: 60 }}>
              {progress || 0}%
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {completed} из {total} технологий освоено
          </Typography>
        </CardContent>
      </Card>

      {/* Быстрые действия */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Быстрые действия
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/technologies')}
            >
              Все технологии
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/statistics')}
            >
              Статистика
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/import-export')}
            >
              Импорт/Экспорт
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
