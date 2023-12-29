import { createAsyncThunk } from "@reduxjs/toolkit";
import WeatherService from "../../../services/Weather";
import { IreqAvailable } from "common/interfaces/auth";

export const getAvailableHistoryStartDate = createAsyncThunk(
  "/weather/historical/available",
  async (data: IreqAvailable, { rejectWithValue }) => {
    try {
      console.log("Available  Thunk!!!", data);

      const availableHistoricalStartDate =
        await WeatherService.getavailableHistoricalStartDate(data.cityId);
      return availableHistoricalStartDate.data;
    } catch (error: any) {
      console.log("StartDate available data", error);
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
