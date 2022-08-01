import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { isTokenExpired, refresh } from '../../api/auth.api';
import { BaseExerciseCategory } from '../../models/exercise.model';
import { User } from '../../models/user.model';
import { Workout, WorkoutCategory } from '../../models/workout.model';

export const setupConfig = async (method: string, url: string, data?: Workout | User): Promise<AxiosRequestConfig> => {
  let accessToken = String(localStorage.getItem('AccessToken'));
  if (isTokenExpired(accessToken)) {
    accessToken = await refresh();
  }

  return {
    method,
    url: process.env.REACT_APP_API_URL + url,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Authorization': accessToken,
    },
    data,
  }
};

export const updateWorkout = async (id: string, workout: Workout): Promise<AxiosResponse> => {
  const config = await setupConfig('PUT', `/workouts/${id}`, workout);
  return axios.request(config);
};

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

export const initialWorkoutData: Workout = {
  title: '',
  category: WorkoutCategory.CHEST,
  exercises: [] as string[],
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
