import { createSlice } from "@reduxjs/toolkit";
import { IWeatherStatePollution } from "common/interfaces/auth";
import { getPollutionWeather } from "store/thunks/pollutionweather";

const initialState = {
  data: {},
  isLoading: false,
  error: "",
} as IWeatherStatePollution;

export const pollutionWeatherSlice = createSlice({
  name: "pollutionWeather",
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPollutionWeather.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPollutionWeather.fulfilled, (state, action) => {
      const pollutionWeather = action.payload;
      state.data = pollutionWeather;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getPollutionWeather.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError } = pollutionWeatherSlice.actions;
export default pollutionWeatherSlice.reducer;
