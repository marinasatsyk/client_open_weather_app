import $api from "../utils/http";
import {
  ICity,
  IFullAdminUser,
  IFullUser,
  UserRoleDataKeys,
} from "common/interfaces/auth";
import { AxiosResponse } from "axios";
import { geoOptionType } from "common/types/geo";

interface IupdateUser {
  email: string;
  firstName: string;
  lastName: string;
}

interface IUserDeleteRes {
  success: boolean;
  message: string;
}

export default class UserService {
  static async updateBookmarks(
    city: geoOptionType,
    isHistory: boolean,
    isActive: boolean
  ): Promise<AxiosResponse<IFullUser>> {
    return $api.post<IFullUser>(`/user/bookmarks`, {
      city,
      isHistory,
      isActive,
    });
  }

  static async updateActiveBookmark(
    cityId: string
  ): Promise<AxiosResponse<IFullUser>> {
    return $api.put<IFullUser>(`/user/bookmarks`, { cityId });
  }

  static async deleteBookmark(
    cityId: string
  ): Promise<AxiosResponse<IFullUser>> {
    return $api.delete(`/user/bookmarks`, { data: { cityId } });
  }

  static async updateUser(
    dataForUpdate: IupdateUser,
    userId: string
  ): Promise<AxiosResponse<IFullUser>> {
    return $api.put<IFullUser>(`/user/${userId}/update`, {
      dataForUpdate,
    });
  }

  static async deleteUser(
    userId: string
  ): Promise<AxiosResponse<IUserDeleteRes>> {
    return $api.delete(`/user/${userId}/delete`);
  }
}
