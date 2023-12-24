import $api from "../utils/http";
import {
  AuthResponse,
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

export default class AdminService {
  static async getAllUsers(): Promise<AxiosResponse<Array<IFullAdminUser>>> {
    console.log("we call get user");
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
    console.log("coucou ====> ", firstName, lastName, email, password);
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
}
