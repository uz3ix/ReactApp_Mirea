import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { lightTheme, darkTheme } from './styles/theme';
import { TechProvider } from './context/TechContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import DataImportExport from './components/DataImportExport';
import WorkingAccessibleForm from './components/WorkingAccessibleForm';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showNotification = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="sticky" elevation={2}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  🚀 Трекер изучения технологий
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                      icon={<LightModeIcon />}
                      checkedIcon={<DarkModeIcon />}
                    />
                  }
                  label={darkMode ? 'Тёмная' : 'Светлая'}
                  sx={{ mr: 2 }}
                />
              </Toolbar>
            </AppBar>

            <Navigation />

            <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/technologies" element={<TechnologyList />} />
                <Route path="/technology/:techId" element={<TechnologyDetail />} />
                <Route path="/add" element={<AddTechnology />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/import-export" element={<DataImportExport />} />
                <Route path="/demo-form" element={<WorkingAccessibleForm />} />
              </Routes>
            </Container>

            <Box
              component="footer"
              sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'background.paper',
                borderTop: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="body2" color="text.secondary" align="center">
                © 2025 Трекер технологий. Практическое занятие 26.
              </Typography>
            </Box>
          </Box>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
    </ThemeProvider>
  );
}

export default App;
