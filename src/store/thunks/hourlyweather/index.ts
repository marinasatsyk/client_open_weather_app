import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWeatherReq } from "common/interfaces/auth";
import WeatherService from "services/Weather";

export const getHourlyForecastWeather = createAsyncThunk(
  "/weather/forecast/hourly",
  async (data: IWeatherReq, { rejectWithValue }) => {
    try {
      const hourlyForecastWeather =
        await WeatherService.getHourlyForecastWeather(data.lat, data.lon);
      return hourlyForecastWeather.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error });
      }
    }
  }
);
