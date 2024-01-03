import $api from "../utils/http";
import {
  CreateResponse,
  IFullAdminUser,
  UserRoleDataKeys,
} from "common/interfaces/auth";
import { AxiosResponse } from "axios";

interface IUpdateUser {
  email: string;
  firstName: string;
  lastName: string;
  role?: UserRoleDataKeys;
  isActivated?: boolean;
}

interface IUserDeleteRes {
  success: boolean;
  message: string;
}
export default class AdminService {
  static async getAllUsers(): Promise<AxiosResponse<Array<IFullAdminUser>>> {
    return $api.get<Array<IFullAdminUser>>(`admin/users`, {
      responseType: "json",
    });
  }
  static async creation(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: UserRoleDataKeys
  ): Promise<AxiosResponse<CreateResponse>> {
    return $api.post<CreateResponse>("admin/user/create", {
      firstName,
      lastName,
      email,
      password,
      role,
    });
  }

  static async updateUserFromAdmin(
    dataForUpdate: IUpdateUser,
    userId: string
  ): Promise<AxiosResponse<IFullAdminUser>> {
    return $api.put<IFullAdminUser>(`/user/${userId}/update`, {
      dataForUpdate,
    });
  }

  static async getUserFromAdmin(
    userId: string
  ): Promise<AxiosResponse<IFullAdminUser>> {
    return $api.get<IFullAdminUser>(`/admin/user/${userId}/`);
  }

  static async deleteUserFromAdmin(
    userId: string
  ): Promise<AxiosResponse<IUserDeleteRes>> {
    return $api.delete(`/user/${userId}/delete`);
  }
}
