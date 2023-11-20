import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  iUserDto,
  IFullUser,
  ICity,
  IError,
  IAuthState,
} from "common/interfaces/auth";
import { error } from "console";
import { loginUser, registerUser } from "store/thunks/auth";

const initialState = {
  user: {},
  isAuth: false,
  error: "",
  isLoading: false,
  isRegistred: false,
} as IAuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login(state, action) {
    //   state.user = action.payload.user;
    //   state.isAuth = true;
    //   console.log("Action", action.payload);
    //   console.log("User from Slice", state.user);
    //   console.log("IsAuth", state.isAuth);
    // },
    clearError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isAuth = false;
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = "";
      state.isAuth = false;
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
    //registration
    builder.addCase(registerUser.pending, (state, action) => {
      state.isAuth = false;
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isRegistred = true;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = "";
      state.isAuth = false;
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
