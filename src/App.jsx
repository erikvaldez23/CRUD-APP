// src/App.jsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import UserGraph from './components/UserGraph/UserGraph';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1 style={{ textAlign: 'center' }}>CRUD Operations Project</h1>
        <UserGraph />
      </div>
    </ThemeProvider>
  );
};

export default App;
