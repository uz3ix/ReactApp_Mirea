import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Paper,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from '@mui/icons-material';

function MuiDashboard({ technologies }) {
  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length,
    progress: technologies.length > 0 ? 
      Math.round((technologies.filter(t => t.status === 'completed').length / technologies.length) * 100) : 0
  };

  const StatCard = ({ title, value, color, icon: Icon }) => (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ color }}>
              {value}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: 48, color, opacity: 0.3 }} />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        📊 Панель управления
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Всего технологий"
            value={stats.total}
            color="primary.main"
            icon={RadioButtonUncheckedIcon}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Завершено"
            value={stats.completed}
            color="success.main"
            icon={CheckCircleIcon}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="В процессе"
            value={stats.inProgress}
            color="warning.main"
            icon={ScheduleIcon}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Не начато"
            value={stats.notStarted}
            color="text.secondary"
            icon={RadioButtonUncheckedIcon}
          />
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Общий прогресс
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box flex={1}>
            <LinearProgress 
              variant="determinate" 
              value={stats.progress} 
              sx={{ height: 12, borderRadius: 6 }}
            />
          </Box>
          <Typography variant="h6" color="primary" sx={{ minWidth: 60 }}>
            {stats.progress}%
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default MuiDashboard;
