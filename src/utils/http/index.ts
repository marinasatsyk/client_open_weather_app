import axios from "axios";
import { AuthResponse } from "common/interfaces/auth";
import { useNavigate } from "react-router-dom";
const { REACT_APP_HOST, REACT_APP_PORT, REACT_APP_MAIN_API_ROUTE } =
  process.env;
const API_URL = `http://${REACT_APP_HOST}:${REACT_APP_PORT}${REACT_APP_MAIN_API_ROUTE}`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

//interceptor request
$api.interceptors.request.use((config) => {
  console.log("interceptor 1");
  let clientToken = null;
  const localStorageToken = localStorage.getItem("token");
  const sessionStorageToken = sessionStorage.getItem("token");

  if (localStorageToken) {
    clientToken = localStorageToken;
  } else if (sessionStorageToken) {
    clientToken = sessionStorageToken;
  }
  console.log("clientToken", clientToken);
  config.headers.Authorization = `Bearer ${clientToken}`;
  return config;
});

//refresh functionality
$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err?.response?.status === 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        console.log("we refresh token");
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });

        console.log("after REFRESH", response);
        //we replace token exists???
        const sessionClientToken = sessionStorage.getItem("token");

        sessionClientToken
          ? sessionStorage.setItem("token", response.data.accessToken)
          : localStorage.setItem("token", response.data.accessToken);

        console.log("from check auth", response);
        console.log("from check auth LOCAL", localStorage.getItem("token"));
        console.log("from check auth SISSION", sessionStorage.getItem("token"));

        return $api.request(originalRequest);
      } catch (err) {
        console.log("not authorized we clear all storages");
        //if not authorized we must re-login!
        // sessionStorage.clear();
        // localStorage.clear();
        // window.location.href = "/";
      }
    }
    throw err;
  }
);
//we excport instance of axios
export default $api;
