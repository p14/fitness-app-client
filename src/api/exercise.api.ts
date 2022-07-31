import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const setupConfig = (method: string, url: string): AxiosRequestConfig => {
  const accessToken = String(localStorage.getItem('AccessToken'));
  return {
    method,
    url: process.env.REACT_APP_API_URL + url,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Authorization': accessToken,
    },
  }
};

export const fetchExercises = (): Promise<AxiosResponse> => {
  const config = setupConfig('GET', '/exercises');
  return axios.request(config);
};
