import axios, { AxiosResponse } from 'axios';
import { BaseExerciseCategory } from '../../models/exercise.model';
import { User } from '../../models/user.model';
import { Workout } from '../../models/workout.model';
import { setupConfig } from '../../utils/helpers';

export const createWorkout = async (workout: Workout): Promise<AxiosResponse> => {
  const config = await setupConfig('POST', '/workouts', workout);
  return axios.request(config);
};

export const saveWorkoutToUser = async (user: User, workoutId: string) => {
  const updatedUser = {
    ...user,
    workouts: [...user.workouts, workoutId],
  };

  const config = await setupConfig('PUT', `/users/${user._id}`, updatedUser);
  return axios.request(config);
};

export const updateWorkout = async (id: string, workout: Workout): Promise<AxiosResponse> => {
  const config = await setupConfig('PUT', `/workouts/${id}`, workout);
  return axios.request(config);
};

export const removeWorkoutFromUser = async (user: User, workoutId: string) => {
  const updatedUserWorkouts = [...user.workouts];
  const index = updatedUserWorkouts.findIndex((workout) => workout === workoutId);

  if (index >= 0) {
    updatedUserWorkouts.splice(index, 1);
  }

  const updatedUser = {
    ...user,
    workouts: updatedUserWorkouts,
  };

  const config = await setupConfig('PUT', `/users/${user._id}`, updatedUser);
  return axios.request(config);
};

export const parseWorkout = (data: Workout): Workout => {
  return {
    '_id': data._id,
    title: data.title,
    category: data.category,
    exercises: data.exercises,
  } as Workout;
};

export const parseExerciseCategories = (data: string[]): string => {
  const parsedCategory = data.find((category) => {
    return category in BaseExerciseCategory;
  });

  if (parsedCategory) {
    return parsedCategory;
  }

  return '';
};
