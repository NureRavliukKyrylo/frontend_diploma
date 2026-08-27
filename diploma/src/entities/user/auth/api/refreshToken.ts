import axios from "axios";
import { API_URL } from "@shared/config/constants";
import { apiClient } from "@shared/api";
import { useUserStore } from "../../profile";

export const refreshToken = async () => {
  try {
    await axios.post(
      `${API_URL}/api/Auth/refresh`,
      {},
      { withCredentials: true },
    );
  } catch {
    useUserStore.getState().clearUserInfo();
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  },
);
