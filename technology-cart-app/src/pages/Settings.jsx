import React, { useContext } from 'react';
import { TechContext } from '../context/TechContext';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  DeleteForever as DeleteForeverIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

export default function Settings() {
  const { markAllCompleted, resetAll, resetToInitial } = useContext(TechContext);
  const [openDialog, setOpenDialog] = React.useState(null);

  const handleAction = (action) => {
    action();
    setOpenDialog(null);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        ⚙️ Настройки
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Управление данными
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Эти действия необратимы. Будьте осторожны!
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Button
              variant="outlined"
              color="success"
              startIcon={<CheckCircleIcon />}
              onClick={() => setOpenDialog('complete')}
              fullWidth
            >
              Отметить все как завершённые
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Все технологии будут отмечены как изученные
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<RefreshIcon />}
              onClick={() => setOpenDialog('reset')}
              fullWidth
            >
              Сбросить к начальным данным
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Восстановить технологии по умолчанию
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteForeverIcon />}
              onClick={() => setOpenDialog('delete')}
              fullWidth
            >
              Удалить все технологии
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Все данные будут безвозвратно удалены
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Диалог подтверждения для завершения всех */}
      <Dialog open={openDialog === 'complete'} onClose={() => setOpenDialog(null)}>
        <DialogTitle>Отметить все как завершённые?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Все технологии будут отмечены как изученные. Это действие можно отменить вручную.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)}>Отмена</Button>
          <Button onClick={() => handleAction(markAllCompleted)} color="success" variant="contained">
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог подтверждения для сброса */}
      <Dialog open={openDialog === 'reset'} onClose={() => setOpenDialog(null)}>
        <DialogTitle>Сбросить к начальным данным?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Все текущие данные будут заменены начальными технологиями. Это действие необратимо.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)}>Отмена</Button>
          <Button onClick={() => handleAction(resetToInitial)} color="warning" variant="contained">
            Сбросить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог подтверждения для удаления */}
      <Dialog open={openDialog === 'delete'} onClose={() => setOpenDialog(null)}>
        <DialogTitle>Удалить все технологии?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Все технологии будут безвозвратно удалены. Это действие нельзя отменить!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)}>Отмена</Button>
          <Button onClick={() => handleAction(resetAll)} color="error" variant="contained">
            Удалить всё
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
