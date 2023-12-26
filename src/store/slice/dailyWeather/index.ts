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
    logoutDailyForecast(state) {
      state.data = {
        city: {
          id: 0,
          name: "",
          coord: {
            lon: 0,
            lat: 0,
          },
          country: "",
          population: 0,
          timezone: 0,
        },
        cod: "",
        message: 0,
        cnt: 0,
        list: {
          dt: 0,
          sunrise: 0,
          sunset: 0,
          temp: { day: 0, min: 0, max: 0, night: 0, eve: 0, morn: 0 },
          feels_like: {
            day: 0,
            night: 0,
            eve: 0,
            morn: 0,
          },
          pressure: 0,
          humidity: 0,
          weather: [
            {
              id: 0,
              main: "",
              description: "",
              icon: "",
            },
          ],
          speed: 0,
          deg: 0,
          gust: 0,
          clouds: 0,
          //@ts-ignore
          pop: 0,
          //@ts-ignore
          snow: 0,
          //@ts-ignore
          rain: 0,
        },
      };
      state.isLoading = false;
      state.error = "";
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

export const { clearError, logoutDailyForecast } = dailyForecastSlice.actions;
export default dailyForecastSlice.reducer;
