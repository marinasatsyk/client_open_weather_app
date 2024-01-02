import { createSlice } from "@reduxjs/toolkit";
import { IWheatherState } from "common/interfaces/auth";
import { getCurrentWeather } from "store/thunks/currentwheather";
// import  {IWeatherDataRes}

const initialState = {
  data: {},
  isLoading: false,
  error: "",
} as IWheatherState;

export const weatherSlice = createSlice({
  name: "currentWeather",
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = action.payload;
    },
    logoutWeather(state) {
      state.data = {
        coord: {
          lon: 0,
          lat: 0,
        },
        weather: [
          {
            id: 0,
            main: "",
            description: "",
            icon: "",
          },
        ],
        base: "",
        main: {
          temp: 0,
          feels_like: 0,
          temp_min: 0,
          temp_max: 0,
          pressure: 0,
          humidity: 0,
        },
        visibility: 0,
        wind: {
          speed: 0,
          deg: 0,
        },
        clouds: {
          all: 0,
        },
        dt: 0,
        sys: {
          type: 0,
          id: 0,
          country: "",
          sunrise: 0,
          sunset: 0,
        },
        timezone: 0,
        id: 0,
        name: "",
        cod: 0,
        pollution: {
          main: { aqi: 0 },
          components: {
            co: 0,
            no: 0,
            no2: 0,
            o3: 0,
            so2: 0,
            pm2_5: 0,
            pm10: 0,
            nh3: 0,
          },
          dt: 0,
        },
      };
      state.isLoading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentWeather.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      const currentWeather = action.payload;
      state.data = currentWeather;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getCurrentWeather.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError, logoutWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
