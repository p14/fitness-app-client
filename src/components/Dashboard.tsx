import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { logout } from '../api/auth.api';
import { useSessionContext } from '../context/session.context';

const Dashboard: React.FC = () => {

  const sessionContext = useSessionContext();
  const theme = createTheme();

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <PersonRounded />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {sessionContext.user.firstName} {sessionContext.user.lastName}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2, marginTop: 2 }}>
            <Button variant='contained' onClick={() => logout()}>
              Log Out
            </Button>
            &nbsp;
            <Button variant='contained' onClick={() => navigate('/generate')}>
              Generate
            </Button>
            &nbsp;
            <Button variant='contained' onClick={() => navigate('/customize')}>
              Customize
            </Button>
            &nbsp;
            <Button variant='contained' onClick={() => navigate('/workouts')}>
              Workouts
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
