import $api from "../utils/http";
import {
  IHistoricalWeatherRes,
  IWeatherDataRes,
  WeatherDataFD,
  WeatherDataFH,
  WeatherDataPollution,
} from "common/interfaces/auth";
import { AxiosResponse } from "axios";

//current weather
export default class WeatherService {
  static async getCurrentWheather(
    lat: string,
    lon: string
  ): Promise<AxiosResponse<IWeatherDataRes>> {
    console.log("WeatherService  getCurrentWheather", lat, lon);
    return $api.post<IWeatherDataRes>(`/weather/current`, { lat, lon });
  }

  //forecast daily
  static async getDailyForecastWeather(
    lat: string,
    lon: string
  ): Promise<AxiosResponse<WeatherDataFD>> {
    console.log("WeatherService   forecast Wheather", lat, lon);
    return $api.post<WeatherDataFD>(`/weather/forecast/daily`, { lat, lon });
  }

  //forecast hourly
  static async getHourlyForecastWeather(
    lat: string,
    lon: string
  ): Promise<AxiosResponse<WeatherDataFH>> {
    console.log("WeatherService  forecast hourly", lat, lon);
    return $api.post<WeatherDataFH>(`/weather/forecast/hourly`, { lat, lon });
  }

  //pollution
  static async getPollutionWeather(
    lat: string,
    lon: string
  ): Promise<AxiosResponse<WeatherDataPollution>> {
    console.log("WeatherService  pollution ", lat, lon);
    return $api.post<WeatherDataPollution>(`/weather/pollution`, { lat, lon });
  }

  //historical hourly
  static async getHourlyHistoricalWeather(
    cityId: string,
    startDate: number,
    endDate: number
  ): Promise<AxiosResponse<IHistoricalWeatherRes>> {
    console.log(
      "WeatherService  getCurrentWheather",
      cityId,
      startDate,
      endDate
    );

    return $api.post<IHistoricalWeatherRes>(`/weather/history`, {
      cityId,
      startDate,
      endDate,
    });
  }
}
