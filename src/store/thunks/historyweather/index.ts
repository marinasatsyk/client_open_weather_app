import { createAsyncThunk } from "@reduxjs/toolkit";
import { IHistoricalWeatherReq, IWeatherReq } from "common/interfaces/auth";
import WeatherService from "services/Weather";

export const getHourlyHistoricalWeather = createAsyncThunk(
  "/weather/historical/hourly",
  async (data: IHistoricalWeatherReq, { rejectWithValue }) => {
    try {
      const hourlyHistoricalWeather =
        await WeatherService.getHourlyHistoricalWeather(
          data.cityId,
          data.startDate,
          data.endDate
        );
      return hourlyHistoricalWeather.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error });
      }
    }
  }
);
