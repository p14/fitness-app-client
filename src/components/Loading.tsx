import React from 'react';
import { Box, Container, createTheme, CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';

const Loading: React.FC = () => {

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box sx={{ marginTop: 8 }}>
          <LinearProgress />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Loading;
