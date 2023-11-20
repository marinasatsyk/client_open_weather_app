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
  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/user/${id}`);
  }
}
