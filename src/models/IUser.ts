import { ICity } from "./ICity";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  isActivated: boolean;
  id: string;
  bookmarks: Array<ICity>;
}

export interface iUserDto {
  firstName: string;
  lastName: string;
  email: string;
  isActivated: boolean;
  id: string;
}
