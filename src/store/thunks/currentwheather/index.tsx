import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWeatherReq } from "common/interfaces/auth";
import WeatherService from "services/Weather";

export const getCurrentWeather = createAsyncThunk(
  "weather/current",
  async (data: IWeatherReq, { rejectWithValue }) => {
    try {
      const currentWeather = await WeatherService.getCurrentWheather(
        data.lat,
        data.lon
      );
      return currentWeather.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error });
      }
    }
  }
);
