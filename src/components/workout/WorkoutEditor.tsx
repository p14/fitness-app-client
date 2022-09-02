import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FeedbackType, useFeedbackContext } from '../../context/feedback.context';
import { useWorkoutContext } from '../../context/workout.context';
import { initialWorkoutRender, Workout } from '../../models/workout.model';
import Loading from '../Loading';
import WorkoutForm from './UpdateForm';

const WorkoutEditor: React.FC = () => {

  const { id } = useParams();
  const workoutContext = useWorkoutContext();
  const feedbackContext = useFeedbackContext();
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
      { !id || loading
        ?
        <Loading />
        :
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
