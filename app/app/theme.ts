'use client';
import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100%;
        box-sizing: border-box;
        background: #F5F5F5;
        }
      `,
    },
  },
});

export default theme;
