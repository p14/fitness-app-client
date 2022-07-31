import React from 'react';
import { FitnessCenterRounded } from '@mui/icons-material';
import { Avatar, Box, Container, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import WorkoutDataTable from './WorkoutDataTable';

const WorkoutDashboard: React.FC = () => {

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='lg'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <FitnessCenterRounded />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Workout Dashboard
          </Typography>
          <WorkoutDataTable />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default WorkoutDashboard;
