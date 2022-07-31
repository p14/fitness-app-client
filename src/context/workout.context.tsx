import { createContext, useContext, useEffect, useState } from 'react';
import { fetchWorkout } from '../api/workout.api';
import { Workout } from '../models/workout.model';
import { useSessionContext } from './session.context';

export const WorkoutContext = createContext({ } as { workouts: Workout[], setWorkouts: (workouts: Workout[]) => void });

export const useWorkoutContext = () => useContext(WorkoutContext);

export function WorkoutProvider({ children }: { children: any }) {

  const sessionContext = useSessionContext();

  const [workoutState, setWorkoutState] = useState<Workout[]>([]);

  const setWorkouts = (workouts: Workout[]): void => {
    setWorkoutState(workouts);
  };

  const setupWorkouts = async () => {
    const userWorkoutPromises = sessionContext.user.workouts.map((workoutId) => {
      return fetchWorkout(workoutId)
        .then((response) => response.data)
        .catch((error) => console.error(error.response.data));
    });

    Promise.all(userWorkoutPromises)
      .then((userWorkouts) => {
        setWorkouts(userWorkouts);
      });
  };

  useEffect(() => {
    if (sessionContext.user.workouts.length) {
      // Wait to allow new AccessToken to be set if needed
      setTimeout(() => setupWorkouts(), 1000);
    } else {
      setWorkouts([]);
    }
  }, [sessionContext.user.workouts]);

  return (
    <WorkoutContext.Provider value={{ workouts: workoutState, setWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
};
