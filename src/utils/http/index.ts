import axios from "axios";
import { AuthResponse } from "common/interfaces/auth";
import { error } from "console";
import { config } from "process";
const { REACT_APP_HOST, REACT_APP_PORT, REACT_APP_MAIN_API_ROUTE } =
  process.env;
const API_URL = `http://${REACT_APP_HOST}:${REACT_APP_PORT}${REACT_APP_MAIN_API_ROUTE}`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
console.log(API_URL);

//interceptor request
$api.interceptors.request.use((config) => {
  console.log("interceptor 1");
  //tokens
  const sessionClientTokenRaw = window.sessionStorage.getItem("token");

  console.log("interceptor 2");

  const localClientTokenRaw = window.localStorage.getItem("token");

  const sessionClientToken: string | null =
    sessionClientTokenRaw !== null ? JSON.parse(sessionClientTokenRaw) : null;
  console.log("interceptor 3");

  const localclientToken: string | null =
    localClientTokenRaw !== null ? JSON.parse(localClientTokenRaw) : null;
  console.log("interceptor 4");

  const clientToken = sessionClientToken
    ? sessionClientToken
    : localclientToken;

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

    if (err.response.status == 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        console.log("====>refresh", response);

        //we replace token exists
        const sessionClientTokenRaw = window.sessionStorage.getItem("token");

        const sessionClientToken: string | null =
          sessionClientTokenRaw !== null
            ? JSON.parse(sessionClientTokenRaw)
            : null;

        sessionClientToken
          ? sessionStorage.setItem("token", response.data.accessToken)
          : localStorage.setItem("token", response.data.accessToken);

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
