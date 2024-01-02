import { createAsyncThunk } from "@reduxjs/toolkit";
import WeatherService from "../../../services/Weather";
import { IreqAvailable } from "common/interfaces/auth";

export const getAvailableHistoryStartDate = createAsyncThunk(
  "/weather/historical/available",
  async (data: IreqAvailable, { rejectWithValue }) => {
    try {
      const availableHistoricalStartDate =
        await WeatherService.getavailableHistoricalStartDate(data.cityId);
      return availableHistoricalStartDate.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error });
      }
    }
  }
);
