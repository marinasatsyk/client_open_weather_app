import { AuthResponse, IFullUser } from "common/interfaces/auth";
import $api from "../utils/http";
import { AxiosResponse } from "axios";

interface logoutRespose {
  message: string;
}
export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async logout(): Promise<AxiosResponse<logoutRespose>> {
    return $api.post<logoutRespose>("/logout");
  }

  static async registration(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", {
      firstName,
      lastName,
      email,
      password,
    });
  }

  static async getUser(): Promise<AxiosResponse<IFullUser>> {
    return $api.get(`/user`, { responseType: "json" });
  }

  static async forgotPassword(email: string): Promise<AxiosResponse> {
    return $api.post(`forgot/password`, { email });
  }
  static async resetPassword(
    password: string,
    confirmPassword: string,
    passwordResetToken: string
  ): Promise<AxiosResponse> {
    return $api.patch(`/reset/password/${passwordResetToken}`, {
      password,
      confirmPassword,
    });
  }
}
