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

export interface Bookmark {
  city: ICity;
  isActive: boolean;
  isFollowHistory: boolean;
}

export interface IFullUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActivated: boolean;
  bookmarks: Array<Bookmark> | [];
  role: string;
}

//detailed user interface
export interface IUserChanged {
  user: IFullUser;
  isAuth: false;
}

export interface IAuthState {
  user: IFullUser;
  isAuth: boolean;
  isLoading: boolean;
  error: any;
  isRegistred: boolean;
  isRememberMe_r: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IFullUser;
}

export interface ICity {
  name: string | null;
  local_names: object;
  lat: number;
  lon: number;
  country: string;
  zip?: string;
  insee?: string;
  isHistory?: string;
  _id: string;
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

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IError {
  error: string | undefined | unknown;
}

export interface Token {
  value: string;
}
