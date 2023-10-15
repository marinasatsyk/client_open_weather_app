import axios from "axios";
import { error } from "console";
import { config } from "process";
import { AuthResponse } from "../models/response/AuthResponse";
const API_URL = `http://localhost:18500/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

//interceptor request
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

//refresh functionality
$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status == 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);

        console.log("from check auth", response);
        return $api.request(originalRequest);
      } catch (err) {
        console.log("not authorized");
      }
    }
    throw err;
  }
);
//we excport instance of axios
export default $api;
