import { createAsyncThunk } from "@reduxjs/toolkit";
import { IHistoricalWeatherReq, IWeatherReq } from "common/interfaces/auth";
import WeatherService from "services/Weather";

export const getHourlyHistoricalWeather = createAsyncThunk(
  "/weather/historical/hourly",
  async (data: IHistoricalWeatherReq, { rejectWithValue }) => {
    try {
      console.log("HISTORICAL hourly  Thunk!!!", data);

      const hourlyHistoricalWeather =
        await WeatherService.getHourlyHistoricalWeather(
          data.cityId,
          data.startDate,
          data.endDate
        );
      return hourlyHistoricalWeather.data;
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
