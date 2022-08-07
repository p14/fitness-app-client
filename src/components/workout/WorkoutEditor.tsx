import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, createTheme, CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { useFeedbackContext } from '../../context/feedback.context';
import { useWorkoutContext } from '../../context/workout.context';
import { initialWorkoutRender, Workout } from '../../models/workout.model';
import WorkoutForm from './WorkoutForm';

const WorkoutEditor: React.FC = () => {

  const { id } = useParams();
  const workoutContext = useWorkoutContext();
  const feedbackContext = useFeedbackContext();
  const theme = createTheme();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState<Workout>(initialWorkoutRender);
  const [loading, setLoading] = useState<Boolean>(true);

  const handleSetWorkout = (updatedWorkout: Workout) => {
    const index = workoutContext.workouts.findIndex((workout) => workout._id === id);
    const updatedWorkouts = [...workoutContext.workouts];
    updatedWorkouts[index] = updatedWorkout;
    workoutContext.setWorkouts(updatedWorkouts);
    setWorkout(updatedWorkout);
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
        <WorkoutForm
          id={id}
          workout={workout}
          handleSetWorkout={handleSetWorkout}
        />
      }
    </>
  );
}

export default WorkoutEditor;
