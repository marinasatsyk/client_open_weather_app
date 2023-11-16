// export interface IUser {
//   email: string;
//   isActivated: boolean;
//   id: string;
//   firsName: string;
//   lastName: string;
//   role: string;
// }

//common user interface
export interface iUserDto {
  firstName: string;
  lastName: string;
  email: string;
  isActivated: boolean;
  id: string | null;
}
export interface IFullUser {
  firstName: string;
  lastName: string;
  email: string;
  isActivated: boolean;
  id: string | null;
  bookmarks: Array<ICity> | [];
}

//detailed user interface
export interface IUser {
  user: IFullUser;
  isAuth: false;
}

export interface IAuthState {
  user: iUserDto;
  isAuth: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ICity {
  name: string | null;
  local_names: string;
  lat: number;
  lon: number;
  country: string;
  zip: string;
  insee: string;
  isHistory: string;
}

export interface IpropsFunc {
  setSomething: (value: string) => void;
}

/**
 * ex component
 * const Component: React.FC<IpropsFunc> = (props:IpropsFunc ): JSX.Element =>{
 * const {setPassword, setEmail} = props;
 * <input onChange = ((e) => setEmail(e.target.value))/>
 * }
 */

export interface IerrorRes {
  statusCode?: number;
  data?: {
    message?: string;
  };
  statusText?: string;
}

export interface IRootProps {
  path: string;
  children: JSX.Element;
}
