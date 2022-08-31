import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, FitnessCenterRounded, KeyboardBackspace, Undo } from '@mui/icons-material';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Divider, Grid, IconButton, LinearProgress, List, ListItem, ListItemText, ThemeProvider, Typography } from '@mui/material';
import { useExerciseContext } from '../../context/exercise.context';
import { FeedbackType, useFeedbackContext } from '../../context/feedback.context';
import { useWorkoutContext } from '../../context/workout.context';
import { Exercise } from '../../models/exercise.model';
import { initialWorkoutRender, Workout } from '../../models/workout.model';
import FinishWorkoutModal from '../FinishWorkoutModal';
import { parseExerciseCategories } from './workout.service';

const WorkoutRender = () => {

  const { id } = useParams();
  const exerciseContext = useExerciseContext()
  const feedbackContext = useFeedbackContext();
  const workoutContext = useWorkoutContext();
  const theme = createTheme();
  const navigate = useNavigate();

  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [workout, setWorkout] = useState<Workout>(initialWorkoutRender);
  const [loading, setLoading] = useState<Boolean>(true);

  const handleCompleteToggle = (id: string) => {
    const updatedCompletedExercises = [...completedExercises];
    const index = updatedCompletedExercises.findIndex((exerciseId) => exerciseId === id);
    if (index >= 0) {
      updatedCompletedExercises.splice(index, 1);
    } else {
      updatedCompletedExercises.push(id);
    }
    setCompletedExercises(updatedCompletedExercises);
  };

  const readExerciseById = (id: string): Exercise => {
    const [exerciseData] = exerciseContext.exercises.filter((exercise) => exercise._id === id);
    return exerciseData;
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
          type: FeedbackType.ERROR,
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
            <Box sx={{ marginTop: 4 }}>
              <Button onClick={() => navigate('/workouts')}>
                <KeyboardBackspace />
                &nbsp;
                Back
              </Button>
            </Box>
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
              <Avatar sx={{ margin: 1, backgroundColor: 'secondary' }}>
                <FitnessCenterRounded />
              </Avatar>
              <Typography component='h1' variant='h5'>
                {workout.title}
              </Typography>
    
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <List>
                    {workout.exercises.map((exerciseId) => (
                      <Box key={exerciseId}>
                        <ListItem
                          secondaryAction={
                            <IconButton edge='end' onClick={() => handleCompleteToggle(exerciseId)}>
                              {completedExercises.includes(exerciseId) ? <Undo /> : <Check /> }
                            </IconButton>
                          }
                        >
                          <ListItemText
                            sx={{ textDecoration: completedExercises.includes(exerciseId) ? 'line-through' : 'none' }}
                            primary={readExerciseById(exerciseId).title}
                            secondary={parseExerciseCategories(readExerciseById(exerciseId).categories)}
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

export default WorkoutRender;
