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
  length: Bookmark | undefined;
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

/**FORECAST DAILY "FD"*/
interface CoordFD {
  lon: number;
  lat: number;
}

interface WeatherFD {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface TemperatureFD {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface FeelsLikeFD {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface DayForecastFD {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: TemperatureFD;
  feels_like: FeelsLikeFD;
  pressure: number;
  humidity: number;
  weather: WeatherFD[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  snow?: number;
  rain?: number;
}

interface CityFD {
  id: number;
  name: string;
  coord: CoordFD;
  country: string;
  population: number;
  timezone: number;
}

export interface WeatherDataFD {
  city: CityFD;
  cod: string;
  message: number;
  cnt: number;
  list: DayForecastFD[];
}

export interface IWeatherStateFD {
  data: WeatherDataFD;
  isLoading: boolean;
  error: any;
}

/**FORECAST HOURLY "FH"*/

interface MainFH {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WeatherFH {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface CloudsFH {
  all: number;
}

interface WindFH {
  speed: number;
  deg: number;
  gust: number;
}

interface SnowFH {
  "1h"?: number;
}

interface SysFH {
  pod: string;
}

interface ListFH {
  dt: number;
  main: MainFH;
  weather: WeatherFH[];
  clouds: CloudsFH;
  wind: WindFH;
  visibility: number;
  pop: number;
  snow: SnowFH;
  sys: SysFH;
  dt_txt: string;
}

export interface CityFH {
  id: number;
  name: string;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface WeatherDataFH {
  cod: string;
  message: number;
  cnt: number;
  list: ListFH[];
  city: CityFH;
}

export interface IWeatherStateFH {
  data: WeatherDataFH;
  isLoading: boolean;
  error: any;
}

/**WEATHER POLLUTION */
interface CoordPollution {
  lon: number;
  lat: number;
}

interface MainPollution {
  aqi: number;
}

interface ComponentsPollution {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

interface ListPollution {
  main: MainPollution;
  components: ComponentsPollution;
  dt: number;
}

export interface WeatherDataPollution {
  coord: CoordPollution;
  list: ListPollution[];
}

export interface IWeatherStatePollution {
  data: WeatherDataPollution;
  isLoading: boolean;
  error: any;
}

/**COMMON CURRENT WEATHER DASHBOARD */

export interface IWeatherReq {
  lat: string;
  lon: string;
}

export interface IWeatherDataRes {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  pollution: ListPollution;
}

export interface IWheatherState {
  data: IWeatherDataRes;
  isLoading: boolean;
  error: any;
}
