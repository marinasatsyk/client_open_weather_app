export interface ICity {
  name: string;
  local_names: string;
  lat: number;
  lon: number;
  country: string;
  zip: string;
  insee: string;
  isHistory: string;
}

export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
  firsName: string;
  lastName: string;
  role: string;
}

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

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
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
