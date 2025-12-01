import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

function MuiTechnologyCard({ technology, onEdit, onDelete, onStatusChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      default: return 'Не начато';
    }
  };

  const getCategoryLabel = (category) => {
    const labels = {
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile',
      devops: 'DevOps',
      database: 'Базы данных',
      tools: 'Инструменты',
    };
    return labels[category] || category;
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" component="h3" gutterBottom>
            {technology.title}
          </Typography>
          <IconButton
            size="small"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => {
              onEdit(technology);
              handleClose();
            }}>
              <EditIcon fontSize="small" sx={{ mr: 1 }} />
              Редактировать
            </MenuItem>
            <MenuItem onClick={() => {
              onDelete(technology.id);
              handleClose();
            }}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Удалить
            </MenuItem>
          </Menu>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
          {technology.description}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={getCategoryLabel(technology.category)} 
            variant="outlined" 
            size="small" 
          />
          <Chip 
            label={getStatusText(technology.status)}
            color={getStatusColor(technology.status)}
            size="small"
          />
        </Box>
      </CardContent>
      
      <CardActions>
        {technology.status !== 'completed' && (
          <Button 
            size="small" 
            variant="contained"
            onClick={() => onStatusChange(technology.id, 'completed')}
          >
            Завершить
          </Button>
        )}
        
        <Button 
          size="small" 
          variant="outlined"
          onClick={() => onStatusChange(technology.id, 
            technology.status === 'in-progress' ? 'not-started' : 'in-progress')}
        >
          {technology.status === 'in-progress' ? 'Приостановить' : 'Начать'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default MuiTechnologyCard;
