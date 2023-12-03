import { AuthResponse, IFullUser } from "common/interfaces/auth";
import $api from "../utils/http";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    console.log("coucou ====> ", firstName, lastName, email, password);
    return $api.post<AuthResponse>("/registration", {
      firstName,
      lastName,
      email,
      password,
    });
  }

  // static async userVerify(): Promise<AxiosResponse<IUser>> {
  //   console.log("===================>>>>userVerify");
  //   return $api.get(`/validateAuth`);
  // }

  static async getUser(): Promise<AxiosResponse<IFullUser>> {
    console.log("we call get user");
    return $api.get<IFullUser>(`/user`, { responseType: "json" });
  }
}
