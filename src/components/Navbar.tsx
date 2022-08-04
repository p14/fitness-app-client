import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useSessionContext } from '../context/session.context';

const Navbar: React.FC = () => {

  const sessionContext = useSessionContext();
  const navigate = useNavigate();

  return (
    <AppBar position='static'>
      <Toolbar sx={{ alignSelf: 'center', maxWidth: '1200px', width: '100%' }}>
        <Typography variant='h6' sx={{ cursor: 'pointer', flexGrow: 1, fontWeight: 600 }} onClick={() => navigate('/dashboard')}>
          EveryManJacked
        </Typography>
        {sessionContext.isLoggedIn &&
          <>
            <Button color='inherit' onClick={() => navigate('/generate')}>
              Generate
            </Button>
            <Button color='inherit' onClick={() => navigate('/workouts')}>
              Workouts
            </Button>
            <Button color='inherit' onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          </>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
