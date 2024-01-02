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
    return $api.post<IWeatherDataRes>(`/weather/current`, { lat, lon });
  }

  //forecast daily
  static async getDailyForecastWeather(
    lat: string,
    lon: string
  ): Promise<AxiosResponse<WeatherDataFD>> {
    return $api.post<WeatherDataFD>(`/weather/forecast/daily`, { lat, lon });
  }

  //forecast hourly
  static async getHourlyForecastWeather(
    lat: string,
    lon: string
  ): Promise<AxiosResponse<WeatherDataFH>> {
    return $api.post<WeatherDataFH>(`/weather/forecast/hourly`, { lat, lon });
  }

  //pollution
  static async getPollutionWeather(
    lat: string,
    lon: string
  ): Promise<AxiosResponse<WeatherDataPollution>> {
    return $api.post<WeatherDataPollution>(`/weather/pollution`, { lat, lon });
  }

  //historical hourly
  static async getHourlyHistoricalWeather(
    cityId: string,
    startDate: number,
    endDate: number
  ): Promise<AxiosResponse<IHistoricalWeatherRes>> {
    return $api.post<IHistoricalWeatherRes>(`/weather/history`, {
      cityId,
      startDate,
      endDate,
    });
  }

  //available historical data
  static async getavailableHistoricalStartDate(
    cityId: string
  ): Promise<AxiosResponse> {
    return $api.post(`/weather/history/available`, {
      cityId,
    });
  }
}
