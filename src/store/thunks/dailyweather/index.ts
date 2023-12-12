import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWeatherReq } from "common/interfaces/auth";
import WeatherService from "services/Weather";

export const getDailyForecastWeather = createAsyncThunk(
  "/weather/forecast/daily",
  async (data: IWeatherReq, { rejectWithValue }) => {
    try {
      console.log("dataget daily forecast  Thunk!!!", data);
      const dailyForecastWeather = await WeatherService.getDailyForecastWeather(
        data.lat,
        data.lon
      );
      // const currentWeather = await AuthService.login(data.email, data.password);
      // manageToken(isRememberMe_r, user.data.accessToken);
      return dailyForecastWeather.data;
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
