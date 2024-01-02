import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWeatherReq } from "common/interfaces/auth";
import WeatherService from "services/Weather";

export const getPollutionWeather = createAsyncThunk(
  "/weather/forecast/daily",
  async (data: IWeatherReq, { rejectWithValue }) => {
    try {
      const pollutionWeather = await WeatherService.getPollutionWeather(
        data.lat,
        data.lon
      );
      return pollutionWeather.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error });
      }
    }
  }
);
