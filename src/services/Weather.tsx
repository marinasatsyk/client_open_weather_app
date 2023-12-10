import $api from "../utils/http";
import {  IWeatherDataRes, IWeatherReq, IWheatherState } from "common/interfaces/auth";
import { AxiosResponse } from "axios";


export default class WeatherService  {
  
    static async getCurrentWheather(lat: string,  lon: string): Promise<AxiosResponse<IWeatherDataRes>> {
       console.log("WeatherService  getCurrentWheather", lat, lon)
        return $api.post<IWeatherDataRes>(`/weather/current`, {lat, lon});
    };
  
}

