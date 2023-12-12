import $api from "../utils/http";
import {  IWeatherDataRes, IWeatherReq, IWheatherState, WeatherDataFD, WeatherDataFH, WeatherDataPollution } from "common/interfaces/auth";
import { AxiosResponse } from "axios";


export default class WeatherService  {
  
    static async getCurrentWheather(lat: string,  lon: string): Promise<AxiosResponse<IWeatherDataRes>> {
       console.log("WeatherService  getCurrentWheather", lat, lon)
        return $api.post<IWeatherDataRes>(`/weather/current`, {lat, lon});
    };

    static async getDailyForecastWeather(lat: string,  lon: string): Promise<AxiosResponse<WeatherDataFD>> {
       console.log("WeatherService  getCurrentWheather", lat, lon)
        return $api.post<WeatherDataFD>(`/weather/forecast/daily`, {lat, lon});
    };
    
    static async getHourlyForecastWeather(lat: string,  lon: string): Promise<AxiosResponse<WeatherDataFH>> {
       console.log("WeatherService  getCurrentWheather", lat, lon)
        return $api.post<WeatherDataFH>(`/weather/forecast/hourly`, {lat, lon});
    };

    static async getPollutionWeather(lat: string,  lon: string): Promise<AxiosResponse<WeatherDataPollution>> {
       console.log("WeatherService  getCurrentWheather", lat, lon)
        return $api.post<WeatherDataPollution>(`/weather/pollution`, {lat, lon});
    };
  
}

