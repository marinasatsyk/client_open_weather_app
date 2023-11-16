import { AuthResponse, IUser } from "common/interfaces/auth";
import $api from "../utils/http";
import { AxiosResponse } from "axios";
import { error } from "console";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<AxiosResponse<AuthResponse>> {
    console.log("coucou");
    return $api.post<AuthResponse>("/registration", {
      email,
      password,
      firstName,
      lastName,
    });
  }
  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/user/${id}`);
  }
}
