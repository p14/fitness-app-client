import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useSessionContext } from '../context/session.context';

const Navbar: React.FC = () => {

  const sessionContext = useSessionContext();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleClick = (route: string) => {
    handleClose();
    navigate(route);
  };

  return (
    <AppBar position='static'>
      <Toolbar sx={{ alignSelf: 'center', maxWidth: '1200px', width: '100%' }}>
        <Typography variant='h6' sx={{ cursor: 'pointer', flexGrow: 1, fontWeight: 600 }} onClick={() => navigate('/dashboard')}>
          EveryManJacked
        </Typography>
        {sessionContext.isLoggedIn &&
          <>
            <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
              <Button color='inherit' onClick={() => navigate('/generate')}>
                Generate
              </Button>
              <Button color='inherit' onClick={() => navigate('/workouts')}>
                Workouts
              </Button>
              <Button color='inherit' onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton color='inherit' onClick={handleOpen}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => handleClick('/generate')}>Generate</MenuItem>
                <MenuItem onClick={() => handleClick('/workouts')}>Workouts</MenuItem>
                <MenuItem onClick={() => handleClick('/dashboard')}>Dashboard</MenuItem>
              </Menu>
            </Box>
          </>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
