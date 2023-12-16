import $api from "../utils/http";
import { IFullAdminUser } from "common/interfaces/auth";
import { AxiosResponse } from "axios";

export default class AdminService {
  static async getAllUsers(): Promise<AxiosResponse<Array<IFullAdminUser>>> {
    console.log("we call get user");
    return $api.get<Array<IFullAdminUser>>(`admin/users`, {
      responseType: "json",
    });
  }
}
