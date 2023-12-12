import { createSlice } from "@reduxjs/toolkit";
import { IWeatherStateFH } from "common/interfaces/auth";
import { getHourlyForecastWeather } from "store/thunks/hourlyweather";
// import  {IWeatherDataRes}

const initialState = {
  data: {},
  isLoading: false,
  error: "",
} as IWeatherStateFH;

export const hourlyForecastSlice = createSlice({
  name: "hourlyForecastWeather",
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHourlyForecastWeather.pending, (state, action) => {
      console.log("getHourlyForecastWeather 1");
      state.isLoading = true;
    });
    builder.addCase(getHourlyForecastWeather.fulfilled, (state, action) => {
      console.log(
        "getHourlyForecastWeather fullfiled==============>",
        action.payload
      );
      const hourlyForecastWeather = action.payload;
      state.data = hourlyForecastWeather;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getHourlyForecastWeather.rejected, (state, action) => {
      console.log("rejected wheather");
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError } = hourlyForecastSlice.actions;
export default hourlyForecastSlice.reducer;
