import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWeatherReq } from "common/interfaces/auth";
import WeatherService from "services/Weather";

export const getDailyForecastWeather = createAsyncThunk(
  "/weather/forecast/daily",
  async (data: IWeatherReq, { rejectWithValue }) => {
    try {
      const dailyForecastWeather = await WeatherService.getDailyForecastWeather(
        data.lat,
        data.lon
      );
      return dailyForecastWeather.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error });
      }
    }
  }
);
