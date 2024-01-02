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
    logoutHourlyForecast(state) {
      state.data = {
        cod: "",
        message: 0,
        cnt: 0,
        list: [
          {
            dt: 0,
            main: {
              temp: 0,
              feels_like: 0,
              temp_min: 0,
              temp_max: 0,
              pressure: 0,
              sea_level: 0,
              grnd_level: 0,
              humidity: 0,
              temp_kf: 0,
            },
            weather: [
              {
                id: 0,
                main: "",
                description: "",
                icon: "",
              },
            ],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 0,
              deg: 0,
              gust: 0,
            },
            visibility: 0,
            pop: 0,
            //@ts-ignore
            snow: { "1h": 0 },
            sys: { pod: "" },
            dt_txt: "",
          },
        ],
        city: {
          id: 0,
          name: "",
          country: "",
          population: 0,
          timezone: 0,
          sunrise: 0,
          sunset: 0,
          coord: {
            lat: 0,
            lon: 0,
          },
        },
      };
      state.isLoading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHourlyForecastWeather.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getHourlyForecastWeather.fulfilled, (state, action) => {
      const hourlyForecastWeather = action.payload;
      state.data = hourlyForecastWeather;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getHourlyForecastWeather.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError, logoutHourlyForecast } = hourlyForecastSlice.actions;
export default hourlyForecastSlice.reducer;
