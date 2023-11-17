import { createSlice } from "@reduxjs/toolkit";
import { iUserDto, IFullUser } from "common/interfaces/auth";

const initialState = {
  user: {} as IFullUser,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isAuth = true;
      console.log("Action", action.payload);
      console.log("User from Slice", state.user);
      console.log("IsAuth", state.isAuth);
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
