export interface IUser {
  id: string | null;
  email: string;
  isActivated: boolean;
  firstName: string;
  lastName: string;
  role: string;
}

//common user interface
export interface iUserDto {
  id: string | null;
  firstName: string;
  lastName: string;
  email: string;
  isActivated: boolean;
}
export interface IFullUser {
  id: string | null;
  firstName: string;
  lastName: string;
  email: string;
  isActivated: boolean;
  bookmarks: Array<ICity> | [];
}

//detailed user interface
export interface IUserChanged {
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

export interface IManageInputProps {
  id: string;
  type: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
  errorMessage: string;
  validateField: (value: string, confirmPassword?: string) => boolean;
  secondValue?: string;
}
