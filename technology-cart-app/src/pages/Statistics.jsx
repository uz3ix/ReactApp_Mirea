import React, { useContext } from 'react';
import { TechContext } from '../context/TechContext';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';

export default function Statistics() {
  const { technologies } = useContext(TechContext);

  const byStatus = technologies.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const categories = technologies.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});

  const total = technologies.length || 1;

  const statusLabels = {
    'not-started': 'Не начато',
    'in-progress': 'В процессе',
    'completed': 'Завершено'
  };

  const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    mobile: 'Mobile',
    devops: 'DevOps',
    database: 'Базы данных',
    tools: 'Инструменты',
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        📊 Статистика изучения
      </Typography>

      {technologies.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Нет данных для отображения
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Добавьте технологии, чтобы увидеть статистику
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Статистика по статусам */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <PieChartIcon color="primary" />
              <Typography variant="h6">По статусу изучения</Typography>
            </Box>
            
            <Grid container spacing={3}>
              {Object.entries(byStatus).map(([status, count]) => (
                <Grid item xs={12} key={status}>
                  <Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography>{statusLabels[status] || status}</Typography>
                      <Typography fontWeight="bold">
                        {count} ({Math.round((count / total) * 100)}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(count / total) * 100}
                      color={
                        status === 'completed' ? 'success' :
                        status === 'in-progress' ? 'warning' : 'inherit'
                      }
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Статистика по категориям */}
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <BarChartIcon color="primary" />
              <Typography variant="h6">По категориям</Typography>
            </Box>

            <List>
              {Object.entries(categories)
                .sort(([, a], [, b]) => b - a)
                .map(([category, count]) => (
                  <ListItem
                    key={category}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      backgroundColor: 'action.hover',
                    }}
                  >
                    <ListItemText
                      primary={categoryLabels[category] || category}
                      secondary={
                        <LinearProgress
                          variant="determinate"
                          value={(count / total) * 100}
                          sx={{ mt: 1, height: 6, borderRadius: 3 }}
                        />
                      }
                    />
                    <Chip
                      label={`${count} (${Math.round((count / total) * 100)}%)`}
                      color="primary"
                      variant="outlined"
                    />
                  </ListItem>
                ))}
            </List>
          </Paper>
        </>
      )}
    </Box>
  );
}
