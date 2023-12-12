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
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentWeather.pending, (state, action) => {
      console.log("getCurrentWeather 1");
      state.isLoading = true;
    });
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      console.log("getCurrentWeather fullfiled==============>", action.payload);
      const currentWeather = action.payload;
      state.data = currentWeather;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getCurrentWeather.rejected, (state, action) => {
      console.log("rejected wheather");
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError } = weatherSlice.actions;
export default weatherSlice.reducer;
