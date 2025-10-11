import axios from "axios";
import { API_URL } from "../constants";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${API_URL}/api/Auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );

        return apiClient(originalRequest);
      } catch (refreshError) {}
    }

    return Promise.reject(error);
  }
);
