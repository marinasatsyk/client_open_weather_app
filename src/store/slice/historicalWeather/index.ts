import { createSlice } from "@reduxjs/toolkit";
import { IWheatherHistoricalState } from "common/interfaces/auth";
import { getHourlyHistoricalWeather } from "store/thunks/historyweather";

const initialState = {
  data: {
    // _id: 0,
    //     dt: 0,
    //     main: {
    //       temp: 0,
    //       feels_like: 0,
    //       pressure: 0,
    //       humidity: 0,
    //       temp_min: 0,
    //       temp_max: 0,
    //     },
    //     wind: {
    //       speed: 0,
    //       deg: 0,
    //     },
    //     clouds: {
    //       all: 0,
    //     },
    //     weather: [
    //       {
    //         id: 0,
    //         main: "",
    //         description:  "",
    //         icon:  "",
    //         _id:  "",
    //       }
    //     ],
    //     city:  "",
    //     __v: 0
  },
  isLoading: false,
  error: "",
} as IWheatherHistoricalState;

export const hourlyHistoricalSlice = createSlice({
  name: "hourlyForecastWeather",
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = action.payload;
    },
    // logoutHourlyForecast(state) {
    //   state.data = {
    // _id: 0,
    //     dt: 0,
    //     main: {
    //       temp: 0,
    //       feels_like: 0,
    //       pressure: 0,
    //       humidity: 0,
    //       temp_min: 0,
    //       temp_max: 0,
    //     },
    //     wind: {
    //       speed: 0,
    //       deg: 0,
    //     },
    //     clouds: {
    //       all: 0,
    //     },
    //     weather: [
    //       {
    //         id: 0,
    //         main: "",
    //         description:  "",
    //         icon:  "",
    //         _id:  "",
    //       }
    //     ],
    //     city:  "",
    //     __v: 0
    //   };
    //   state.isLoading = false;
    //   state.error = "";
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getHourlyHistoricalWeather.pending, (state, action) => {
      console.log("Historical Weather 1");
      state.isLoading = true;
    });
    builder.addCase(getHourlyHistoricalWeather.fulfilled, (state, action) => {
      console.log("get Historical  fullfiled==============>", action.payload);
      const hourlyHisotricalWeather = action.payload;
      state.data = hourlyHisotricalWeather;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getHourlyHistoricalWeather.rejected, (state, action) => {
      console.log("rejected wheather");
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError } = hourlyHistoricalSlice.actions;
export default hourlyHistoricalSlice.reducer;
