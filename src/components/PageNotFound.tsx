import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Error } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';

const PageNotFound: React.FC = () => {

  const theme = createTheme();

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <Error />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sorry, the page you were looking for does not exist!
          </Typography>
          <Button variant='contained' sx={{ marginBottom: 2, marginTop: 2 }} onClick={() => navigate('/dashboard')}>
            Return To Dashboard
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default PageNotFound;
