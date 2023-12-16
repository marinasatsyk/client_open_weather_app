import { createSlice } from "@reduxjs/toolkit";
import { IAdminUsersState } from "common/interfaces/auth";
import { getAllUsers } from "store/thunks/admin";

const initialState = {
  users: [],
  error: "",
  isLoading: false,
} as IAdminUsersState;

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      console.log("from builder getAllUsers", action.payload);
      const users = action.payload;
      state.isLoading = false;
      state.users = users;
      state.error = "";
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
