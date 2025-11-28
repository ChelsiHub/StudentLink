// client/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // The standard "LinkedIn-like" Blue
      light: '#4791db',
      dark: '#115293',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e', // A pinkish-red for emphasis (like "Apply Now")
    },
    background: {
      default: '#f4f6f8', // Light grey background (easy on eyes)
      paper: '#ffffff',   // White cards
    },
    text: {
      primary: '#2b3445', // Dark Navy/Grey for text (easier to read than black)
      secondary: '#6b778c',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Stops buttons from being ALL CAPS
          borderRadius: 8,       // Rounded corners
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;