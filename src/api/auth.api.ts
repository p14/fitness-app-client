import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import { LoginData, RegisterData, TokenData } from '../models/auth.model';
import { User, PasswordUpdateData } from '../models/user.model';
import { setupConfig } from '../utils/helpers';

export const setupAuthConfig = (method: string, url: string, data: any): AxiosRequestConfig => {
  return {
    method,
    url: process.env.REACT_APP_API_URL + '/api' + url,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
    },
    data,
  }
};

export const setTokenStorage = (result: TokenData): void => {
  localStorage.setItem('AccessToken', result.AuthenticationResult.AccessToken);
  localStorage.setItem('RefreshToken', result.AuthenticationResult.RefreshToken);
};

export const checkTokenStorage = (): boolean => {
  const access = localStorage.getItem('AccessToken');
  const refresh = localStorage.getItem('RefreshToken');

  if (!access || !refresh) {
    return false;
  }

  return true;
};

export const clearTokenStorage = (): void => {
  localStorage.removeItem('AccessToken');
  localStorage.removeItem('RefreshToken');
};

export const statusCheck = (): Promise<AxiosResponse> => {
  return axios.request({
    method: 'GET',
    url: process.env.REACT_APP_API_URL + '/status-check',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const login = (loginData: LoginData): Promise<AxiosResponse> => {
  const config = setupAuthConfig('POST', '/account/login', loginData);
  return axios.request(config);
};

export const register = (registerData: RegisterData): Promise<AxiosResponse> => {
  const config = setupAuthConfig('POST', '/account/register', registerData);
  return axios.request(config);
};

export const updateUser = async (userData: User): Promise<AxiosResponse> => {
  const config = await setupConfig('PUT', `/users/${userData._id}`, userData);
  return axios.request(config);
}

export const updateUserPassword = async (id: string, passwordUpdateData: PasswordUpdateData): Promise<AxiosResponse> => {
  const config = await setupConfig('PUT', `/users/${id}/update-password`, passwordUpdateData);
  return axios.request(config);
}

export const logout = (): void => {
  clearTokenStorage();
  window.location.reload();
};

export const isExpired = (unixTime: number): boolean => {
  const expiration = unixTime * 1000;
  return expiration < Date.now();
};

export const isTokenExpired = (token: string): boolean => {
  const tokenDecoded = jwt_decode(token) as any;
  const tokenExpiration = parseInt(tokenDecoded.exp);
  if (!isExpired(tokenExpiration)) {
    return false;
  }
  return true;
};

export const refresh = async (): Promise<string> => {

  // Grab refresh token if available
  const refreshToken = localStorage.getItem('RefreshToken');
  if (!refreshToken) {
    throw new Error('No Refresh Token Found');
  }

  // Setup refresh request
  const config = setupAuthConfig('POST', '/account/refresh', { refreshToken });
  return axios.request(config)
    .then((response) => response.data)
    .then((data => {
      setTokenStorage(data);
      return data.AuthenticationResult.AccessToken;
    }))
    .catch((error) => console.error(error.response.data));
};
