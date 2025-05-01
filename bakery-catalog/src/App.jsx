import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ProductCatalog from './components/ProductCatalog';

function App() {
  // Read mode from localStorage or default to 'light'
  const getInitialMode = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('themeMode') || 'light';
    }
    return 'light';
  };
  const [mode, setMode] = useState(getInitialMode);

  // Save mode to localStorage on change
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: '#FF6B6B',
        },
        secondary: {
          main: '#4ECDC4',
        },
        background: {
          default: mode === 'light' ? '#F7F7F7' : '#181A1B',
          paper: mode === 'light' ? '#fff' : '#23272A',
        },
        text: {
          primary: mode === 'light' ? '#222' : '#F7F7F7',
          secondary: mode === 'light' ? '#555' : '#B0B3B8',
        },
      },
      typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: mode === 'light' ? '#fff' : '#23272A',
              color: mode === 'light' ? '#222' : '#F7F7F7',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: mode === 'light' ? '#fff' : '#23272A',
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              backgroundColor: mode === 'light' ? undefined : '#23272A',
              color: mode === 'light' ? undefined : '#F7F7F7',
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: mode === 'light' ? '#fff' : '#181A1B',
              color: mode === 'light' ? '#222' : '#F7F7F7',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: mode === 'light' ? '#fff' : '#23272A',
              color: mode === 'light' ? '#222' : '#F7F7F7',
            },
          },
        },
      },
    }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<ProductCatalog mode={mode} toggleMode={toggleMode} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
