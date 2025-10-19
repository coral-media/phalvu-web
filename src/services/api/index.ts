// src/services/api/index.ts
import axios, { AxiosInstance } from 'axios'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const params = (url: string): Record<string, any> => {
  const queryString = url.split('?')[1];
  if (!queryString) {
    return {};
  }

  const params: Record<string, any> = Object.fromEntries(new URLSearchParams(queryString).entries());

  for (const key in params) {
    const value = params[key];
    if (!isNaN(Number(value))) {
      params[key] = Number(value); // Assign number if the value is numeric
    }
  }

  return params;
};
