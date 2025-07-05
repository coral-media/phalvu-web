import axios, { AxiosInstance } from 'axios';

export const api = (): AxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    timeout: 60000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  })

  if (axiosInstance === undefined) {
    throw new TypeError("Axios instance can't be created. Ensure it is properly provided.");
  }
  return axiosInstance
}

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

export default {
}
