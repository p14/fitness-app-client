import { useNavigate, useParams } from 'react-router-dom';
import { Check, FitnessCenterRounded, KeyboardBackspace } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Divider, Grid, IconButton, LinearProgress, List, ListItem, ListItemText, ThemeProvider, Typography } from '@mui/material';
import { Workout } from '../../models/workout.model';
import { initialWorkoutData, parseExerciseCategories } from './workout.service';
import { useExerciseContext } from '../../context/exercise.context';
import { Exercise } from '../../models/exercise.model';
import { useEffect, useState } from 'react';
import { useWorkoutContext } from '../../context/workout.context';
import { useFeedbackContext } from '../../context/feedback.context';
import FinishWorkoutModal from '../FinishWorkoutModal';

const WorkoutForm = () => {

  const { id } = useParams();
  const exerciseContext = useExerciseContext()
  const feedbackContext = useFeedbackContext();
  const workoutContext = useWorkoutContext();
  const theme = createTheme();

  const navigate = useNavigate();

  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [workout, setWorkout] = useState<Workout>(initialWorkoutData);
  const [loading, setLoading] = useState<Boolean>(true);

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

  const readExerciseById = (exerciseId: string): Exercise => {
    const exerciseData = exerciseContext.exercises.find((exercise) => exercise._id === exerciseId);
    if (exerciseData) {
      return exerciseData;
    }

    return {
      title: '',
      categories: [],
    } as Exercise;
  };

  useEffect(() => {
    if (id && workoutContext.workouts.length) {
      const workoutData = workoutContext.workouts.find((workout) => workout._id === id);
      if (workoutData) {
        setWorkout(workoutData);
        setLoading(false);
      } else {
        feedbackContext.setFeedback({
          message: 'Workout Not Found', 
          error: true,
          open: true,
        });
        setLoading(false);
        navigate('/workouts');
      }
    }
  }, [workoutContext]);

  return (
    <>
      { loading &&
        <ThemeProvider theme={theme}>
          <Container component='main' maxWidth='md'>
            <CssBaseline />
            <Box sx={{ marginTop: 8 }}>
              <LinearProgress />
            </Box>
          </Container>
        </ThemeProvider>
      }
      { id && !loading &&
        <ThemeProvider theme={theme}>
          <Container component='main' maxWidth='md'>
            <CssBaseline />
            <Button onClick={() => navigate('/workouts')} sx={{ display: 'flex', position: 'absolute', marginTop: -4 }}>
              <KeyboardBackspace />
              &nbsp;
              Back to Workouts
            </Button>
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 8 }}>
              <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
                <FitnessCenterRounded />
              </Avatar>
              <Typography component='h1' variant='h5'>
                {workout.title}
              </Typography>
    
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <List>
                    {workout.exercises.map((exercise) => (
                      <Box key={exercise.id}>
                        <ListItem
                          secondaryAction={
                            <IconButton edge='end' onClick={() => handleCompleteToggle(exercise.id)}>
                              <Check />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            sx={{ textDecoration: completedExercises.includes(exercise.id) ? 'line-through' : 'none' }}
                            primary={readExerciseById(exercise.id).title}
                            secondary={parseExerciseCategories(readExerciseById(exercise.id).categories)}
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
      }
      { openModal &&
        <FinishWorkoutModal handleClose={() => setOpenModal(false)} />
      }
    </>
  );
}

export default WorkoutForm;
