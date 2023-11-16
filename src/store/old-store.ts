// import { makeAutoObservable } from "mobx";
// import { IUser, iUserDto } from "../models/IUser";
// import { ICity } from "../models/ICity";
// import AuthService from "../services/AuthService";
// import axios from "axios";
// import { AuthResponse } from "../models/response/AuthResponse";
// const API_URL = `http://localhost:18500/api`;

export default class Store {
  //   user = {} as iUserDto;
  //   isAuth = false;
  //   isLoading = false;
  //   isRemeberMe = false;
  //   locations: Array<ICity> = [];
  //   errors: string[] = [];
  //   constructor() {
  //     makeAutoObservable(this);
  //   }
  //   setAuth(bool: boolean) {
  //     this.isAuth = bool;
  //   }
  //   setisRemeberMe(bool: boolean) {
  //     this.isAuth = bool;
  //   }
  //   setLocations(user: IUser) {
  //     this.locations = [...user.bookmarks];
  //   }
  //   setUser(user: IUser) {
  //     const { email, isActivated, id, firstName, lastName } = user;
  //     this.user = { email, isActivated, id, firstName, lastName };
  //   }
  //   setLoading(bool: boolean) {
  //     this.isLoading = bool;
  //   }
  //   setErrors(error: string): void {
  //     this.errors.push(error);
  //   }
  //   clearErrors(): void {
  //     this.errors = [];
  //   }
  //   async login(email: string, password: string, isRemeberMe: boolean = false) {
  //     this.setLoading(true);
  //     this.clearErrors();
  //     try {
  //       const response = await AuthService.login(email, password);
  //       console.log("from sotre", response);
  //       isRemeberMe
  //         ? localStorage.setItem("token", response.data.accessToken)
  //         : sessionStorage.setItem("token", response.data.accessToken);
  //       this.setAuth(true);
  //       this.setUser(response.data.user);
  //       this.setLocations(response.data.user);
  //       this.setisRemeberMe(isRemeberMe);
  //       return response;
  //     } catch (e: any) {
  //       console.log(e.response?.data?.message);
  //       this.setErrors(e.response?.data?.message);
  //     } finally {
  //       this.setLoading(false);
  //     }
  //   }
  //   async registration(
  //     email: string,
  //     password: string,
  //     firstName: string,
  //     lastName: string
  //   ) {
  //     this.setLoading(true);
  //     this.clearErrors();
  //     try {
  //       const response = await AuthService.registration(
  //         email,
  //         password,
  //         firstName,
  //         lastName
  //       );
  //       localStorage.setItem("token", response.data.accessToken);
  //       this.setAuth(true);
  //       this.setUser(response.data.user);
  //     } catch (e: any) {
  //       console.log(e.response?.data?.message);
  //       this.setErrors(e.response?.data?.message);
  //     } finally {
  //       this.setLoading(false);
  //     }
  //   }
  //   async logout() {
  //     try {
  //       const response = await AuthService.logout();
  //       localStorage.removeItem("token");
  //       ;
  //       this.setAuth(false);
  //       this.setUser({} as IUser);
  //       this.clearErrors();
  //     } catch (e: any) {
  //       console.log(e.response?.data?.message);
  //       this.setErrors(e.response?.data?.message);
  //     }
  //   }
  //   async checkAuth() {
  //     this.setLoading(true);
  //     try {
  //       const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
  //         withCredentials: true,
  //       });
  //       console.log("from check auth", response);
  //       localStorage.setItem("token", response.data.accessToken);
  //       this.setAuth(true);
  //       this.setUser(response.data.user);
  //     } catch (e: any) {
  //       console.log(e.response?.data?.message);
  //       this.setErrors(e.response?.data?.message);
  //     } finally {
  //       this.setLoading(false);
  //     }
  //   }
}
