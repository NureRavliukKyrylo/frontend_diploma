import axios from "axios";
import { API_URL } from "@shared/config/constants";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
