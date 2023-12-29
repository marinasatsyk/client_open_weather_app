import { createSlice } from "@reduxjs/toolkit";
import { getDateFromUnixTime } from "components/charts/ChartHourly/chartHelpers";
import { getAvailableHistoryStartDate } from "store/thunks/availableDataHistory";

const initialState = {
  data: {},
  isLoading: false,
  error: "",
};

export const availableHistoryStartDateSlice = createSlice({
  name: "availableStartHistory",
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = action.payload;
    },
    // logoutAvailableStartDate(state) {
    //   state.data = { dt: 0  };
    //   state.isLoading = false;
    //   state.error = "";
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAvailableHistoryStartDate.pending, (state, action) => {
      console.log("Historical Weather 1");
      state.isLoading = true;
    });
    builder.addCase(getAvailableHistoryStartDate.fulfilled, (state, action) => {
      console.log("get Historical  fullfiled==============>", action.payload);
      const availableDate = action.payload;

      state.data = availableDate;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getAvailableHistoryStartDate.rejected, (state, action) => {
      console.log("rejected availableDate");
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError } = availableHistoryStartDateSlice.actions;
export default availableHistoryStartDateSlice.reducer;
