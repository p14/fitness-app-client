import { useState } from 'react';
import { Check, FitnessCenterRounded, Undo } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Divider, Grid, IconButton, List, ListItem, ListItemText, ThemeProvider, Typography } from '@mui/material';
import { Exercise } from '../../models/exercise.model';
import { capitalize } from '../../utils/helpers';
import { parseExerciseCategories } from '../workout/workout.service';

interface GenerateWorkoutRenderProps {
  workout: Exercise[]
  category: string
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const GenerateWorkoutRender = ({ workout, category, setOpenModal }: GenerateWorkoutRenderProps) => {

  const theme = createTheme();

  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const handleCompleteToggle = (exerciseId: string) => {
    const updatedCompletedExercises = [...completedExercises];
    const index = updatedCompletedExercises.findIndex((exercises) => exercises === exerciseId);
    if (index >= 0) {
      updatedCompletedExercises.splice(index, 1);
    } else {
      updatedCompletedExercises.push(exerciseId);
    }
    setCompletedExercises(updatedCompletedExercises);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
            <FitnessCenterRounded />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {capitalize(category.toLowerCase().replace('_', ' '))} Generated Workout
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List>
                {workout.map((exercise) => (
                  <Box key={exercise._id}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge='end' onClick={() => handleCompleteToggle(exercise._id)}>
                          {completedExercises.includes(exercise._id) ? <Undo /> : <Check /> }
                        </IconButton>
                      }
                    >
                      <ListItemText
                        sx={{ textDecoration: completedExercises.includes(exercise._id) ? 'line-through' : 'none' }}
                        primary={exercise.title}
                        secondary={parseExerciseCategories(exercise.categories)}
                      />
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </Grid>
          </Grid>

          <Button variant='contained' sx={{ marginTop: 4 }} onClick={() => setOpenModal(true)}>
            Complete Workout
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default GenerateWorkoutRender;
