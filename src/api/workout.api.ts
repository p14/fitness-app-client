import axios, { AxiosResponse } from 'axios';
import { setupConfig } from '../utils/helpers';

export const fetchWorkout = async (id: string): Promise<AxiosResponse> => {
  const config = await setupConfig('GET', `/workouts/${id}`);
  return axios.request(config);
};
