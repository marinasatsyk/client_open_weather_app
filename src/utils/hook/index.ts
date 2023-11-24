import axios from "axios";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { useEffect } from "react";
import { error } from "console";

export const UseAppDispatch: () => AppDispatch = useDispatch;
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//verification if is user logged
export const useAuth = () => {
  let clientToken = null;
  const localStorageToken = localStorage.getItem("token");
  const sessionStorageToken = sessionStorage.getItem("token");

  if (localStorageToken) {
    clientToken = localStorageToken;
  } else if (sessionStorageToken) {
    clientToken = sessionStorageToken;
  }
  return clientToken != null ? true : false;
};

export const useUserId = () => {
  const { id } = UseAppSelector((state) => state.auth.user);
  if (id) {
    return id;
  }
};

//============= private axios

// export const useRefreshToken = () => {
//   const { setAuth } = useAuth;

//   const refresh = async () => {
//     const response = await axios.get("/refresh", {
//       withCredentials: true,
//     });
//     setAuth((prev) => {
//       console.log(JSON.stringify(prev));
//       console.log(response.data.accessToken);
//       return { ...prev, accessToken: response.data.acessToken };
//     });
//     return response.data.accessToken;
//   };

//   return refresh;
// };

// export const useAxiosPrivate = () => {
//   const refresh = useRefreshToken();

//   const auth = useAuth();

//   useEffect(() => {
//     const requestIntercept = axiosPrivate.interceptor.request.use(
//       (config) => {
//         if (!config.headers["Authorization"]) {
//           config.headers["Autorization"] = `Bearer ${auth?.accessToken}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );
//     const responseIntercept = axiosPrivate.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const prevRequest = error?.config;
//         if (error?.response?.status === 401 && !prevRequest?.sent) {
//           prevRequest.sent = true;
//           const newAccessToken = await refresh();
//           revRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//           return useAxiosPrivate(prevRequest);
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axios.interceptors.request.eject(responseIntercept);
//       axios.interceptors.response.eject(responseIntercept);
//     };
//   }, [auth, refresh]);

//   return useAxiosPrivate;
// };
