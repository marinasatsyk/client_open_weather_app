import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWeatherReq } from "common/interfaces/auth";
import WeatherService from "services/Weather";

export const getPollutionWeather = createAsyncThunk(
  "/weather/forecast/daily",
  async (data: IWeatherReq, { rejectWithValue }) => {
    try {
      console.log("dataget hourly forecast  Thunk!!!", data);
      const pollutionWeather = await WeatherService.getPollutionWeather(
        data.lat,
        data.lon
      );
      // const currentWeather = await AuthService.login(data.email, data.password);
      // manageToken(isRememberMe_r, user.data.accessToken);
      return pollutionWeather.data;
    } catch (error: any) {
      console.log("forecast hourly data", error);
      if (error.response && error.response.data) {
        console.log("axios", error);

        return rejectWithValue({ error: error.response.data });
      } else {
        console.log("pas axios");
        return rejectWithValue({ error: error });
      }
    }
  }
);
