import $api from "../utils/http";
import { useState } from 'react';
import axios, { AxiosResponse } from "axios";
import  { RootState } from "../store";
import { getUserPending,  stopUserPending,  getUserSuccess,  getUserFail,  logout,  setAuthSuccess, setAuthFail } from "../store/slice/UserSlice";
import {  useSelector, useDispatch } from 'react-redux';
import AuthService from "./AuthService";
import { AuthResponse, IUser } from "common/interfaces/auth";

const API_URL = `http://localhost:18500/api`;


const UserService = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();


  const fetchUsers = async (): Promise<IUser[]> => {
    const response = await axios.get<IUser[]>('/users');
    return response.data;
  }

  const checkAuth = async (isRemeberme = false)  =>   {
        console.log('from checkAuth')
        dispatch(getUserPending());
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
              withCredentials: true,
            });
            console.log("from check auth", response);
    
            isRemeberme 
            ? localStorage.setItem("token", response.data.accessToken)
            :sessionStorage.setItem("token", response.data.accessToken);
    
            dispatch(setAuthSuccess());
            dispatch(getUserSuccess(response.data.user));
    
          } catch (e: any) {
            console.log(e.response?.data?.message);
            dispatch(setAuthFail())
            dispatch(getUserFail(e.response?.data?.message));
          } finally {
            dispatch(stopUserPending())
          }
  }
  
  const login = async (email: string, password: string, isRememberMe = false) => {
    dispatch(getUserPending());
    try {
      const response = await AuthService.login(email, password);
      console.log("res", response)

      isRememberMe
        ? localStorage.setItem('token', response.data.accessToken)
        : sessionStorage.setItem('token', response.data.accessToken);

        dispatch(setAuthSuccess());
        dispatch(getUserSuccess(response.data.user));
      // Dispatch ou toute autre action ici
      return response;
    } catch (error: any) {
      console.log(error);
      dispatch(getUserFail(error.response?.data?.message));
    } finally {
      dispatch(stopUserPending())
    }
  };

  return {
    isAuth,
    isLoading,
    isRememberMe,
    errors,
    user,
    fetchUsers,
    checkAuth,
    login,
  };
}
// export default class UserService {
  
//   isAuth = false;
//   isLoading = false;
//   isRememberMe = false;
//   errors: string[] = [];

//   user =  useSelector((state: RootState) => state.auth.user);
//   // dispatch = useDispatch();
//   //for admins
//   static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
//     return $api.get<IUser[]>("/users");
//   }

//   static async checkAuth (isRemeberme = false)  {
//     console.log('from checkAuth')
//     getUserPending();
//     try {
//         const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
//           withCredentials: true,
//         });
//         console.log("from check auth", response);

//         isRemeberme 
//         ? localStorage.setItem("token", response.data.accessToken)
//         :sessionStorage.setItem("token", response.data.accessToken);

//         setAuthSuccess();
//         getUserSuccess(response.data.user);

//       } catch (e: any) {
//         console.log(e.response?.data?.message);
//         setAuthFail()
//         getUserFail(e.response?.data?.message);
//       } finally {
//         stopUserPending()
//       }
//   }



//   static async login(email: string, password: string, isRemeberMe = false ) {
//     console.log("1from login service", email, password, isRemeberMe)

//     useDispatch(getUserPending());
//     try {
//       const response = await AuthService.login(email, password);
//       console.log("3from user service login", response);

//       isRemeberMe
//         ? localStorage.setItem("token", response.data.accessToken)
//         : sessionStorage.setItem("token", response.data.accessToken);
//       setAuthSuccess();
//       getUserSuccess(response.data.user);
      
//       // this.setLocations(response.data.user);
//       // this.setisRemeberMe(isRemeberMe);
//       return response;
//     } catch (e: any) {
//       console.log(e.response?.data?.message);
//       getUserFail(e.response?.data?.message);
//     } finally {
//       stopUserPending();
//     }
//   }
// }

export default UserService;
