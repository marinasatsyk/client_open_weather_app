import React from "react";
import $api from "../http";
import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "../models/IUser";
import store, { RootState } from "../store";
import { getUserPending,  stopUserPending,  getUserSuccess,  getUserFail,  logout, setAuth } from "../store/features/UserSlice";
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';

const API_URL = `http://localhost:18500/api`;


export default class UserService {
  
  isAuth = false;
  isLoading = false;
  isRememberMe = false;
  errors: string[] = [];

  user =  useSelector((state: RootState) => state.auth.user);

  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/users");
  }

  static async checkAuth ()  {
    getUserPending();
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        console.log("from check auth", response);
  
        localStorage.setItem("token", response.data.accessToken);
        setAuth();
        getUserSuccess(response.data.user);

      } catch (e: any) {
        console.log(e.response?.data?.message);
        getUserFail(e.response?.data?.message);
      } finally {
        stopUserPending()
      }
  }

  
}
