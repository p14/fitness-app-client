import axios, { AxiosResponse } from 'axios';
import { setupConfig } from '../utils/helpers';

export const fetchExercises = async (): Promise<AxiosResponse> => {
  const config = await setupConfig('GET', '/exercises');
  return axios.request(config);
};
