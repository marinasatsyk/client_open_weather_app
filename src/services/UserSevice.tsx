import $api from "../utils/http";
import { ICity, IFullUser } from "common/interfaces/auth";
import { AxiosResponse } from "axios";
import { geoOptionType } from "common/types/geo";


export default class UserService  {
  static async updateBookmarks(city: geoOptionType, isHistory: boolean, isActive: boolean): Promise<AxiosResponse<IFullUser>> {
    return $api.post<IFullUser>(`/user/bookmarks`, {city, isHistory, isActive });
  };

  static async updateActiveBookmark(cityId: string): Promise<AxiosResponse<IFullUser>> {
    return $api.put<IFullUser>(`/user/bookmarks`, {cityId});
  };
  
  static async deleteBookmark(cityId: string): Promise<AxiosResponse<IFullUser>> {
     return $api.delete(`/user/bookmarks`, { data: { cityId } });
  }
}



