import { createSlice } from "@reduxjs/toolkit";
import { IWeatherStateFD, IWheatherState } from "common/interfaces/auth";
import { getDailyForecastWeather } from "store/thunks/dailyweather";
// import  {IWeatherDataRes}

const initialState = {
  data: {},
  isLoading: false,
  error: "",
} as IWeatherStateFD;

export const dailyForecastSlice = createSlice({
  name: "dailyForecastWeather",
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDailyForecastWeather.pending, (state, action) => {
      console.log("getDailyForecastWeather 1");
      state.isLoading = true;
    });
    builder.addCase(getDailyForecastWeather.fulfilled, (state, action) => {
      console.log(
        "getDailyForecastWeather fullfiled==============>",
        action.payload
      );
      const dailyForecastWeather = action.payload;
      state.data = dailyForecastWeather;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getDailyForecastWeather.rejected, (state, action) => {
      console.log("rejected wheather");
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError } = dailyForecastSlice.actions;
export default dailyForecastSlice.reducer;
