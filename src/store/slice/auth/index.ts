import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "common/interfaces/auth";
import { loginUser, registerUser } from "store/thunks/auth";
import { manageToken } from "utils/helpers";

const initialState = {
  user: {},
  isAuth: false,
  error: "",
  isLoading: false,
  isRegistred: false,
  isRememberMe_r: false,
} as IAuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = action.payload;
    },
    rememberMe(state, action) {
      state.isRememberMe_r = action.payload;
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
      manageToken(state.isRememberMe_r, action.payload.accessToken);
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

export const { clearError, rememberMe } = authSlice.actions;
export default authSlice.reducer;
