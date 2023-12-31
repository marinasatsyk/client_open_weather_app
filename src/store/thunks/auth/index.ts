import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin, IRegister } from "common/interfaces/auth";
import AuthService from "services/AuthService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: ILogin, { rejectWithValue }) => {
    // const { isRememberMe_r } = UseAppSelector((state) => state.auth);
    try {
      const user = await AuthService.login(data.email, data.password);
      // manageToken(isRememberMe_r, user.data.accessToken);
      return user.data;
    } catch (error: any) {
      console.log("4", error);
      if (error.response && error.response.data) {
        console.log("axios", error);

        return rejectWithValue({ error: error.response.data });
      } else {
        console.log("pas axios");
        return rejectWithValue({ error: error });
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: IRegister, { rejectWithValue }) => {
    try {
      const user = await AuthService.registration(
        data.firstName,
        data.lastName,
        data.email,
        data.password
      );
      return user.data;
    } catch (error: any) {
      console.log("4", error);
      if (error.response && error.response.data) {
        console.log("axios", error);
        return rejectWithValue({ error: error.response.data });
      } else {
        console.log("pas axios");
        return rejectWithValue({ error: error });
      }
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/user",
  async (data, { rejectWithValue }) => {
    try {
      console.log("🔎🔎🔎🔎🔎, in search user");
      let user = await AuthService.getUser();
      console.log("ASYNC THUNK USER", user.data);
      return user.data;
    } catch (error: any) {
      console.log("4 get user", error);
      if (error.response && error.response.data) {
        console.log("axios", error);
        return rejectWithValue({ error: error.response.data });
      } else {
        console.log("pas axios");
        return rejectWithValue({ error: error });
      }
    }
  }
);

interface IForgot {
  email: string;
}

export const forgotPassword = createAsyncThunk(
  "forgot",
  async (data: IForgot, { rejectWithValue }) => {
    try {
      console.log("FORGOT");
      const { email } = data;
      let result = await AuthService.forgotPassword(email);
      console.log("ASYNC THUNK FORGOT", result.data);
      return result.data;
    } catch (error: any) {
      console.log("4 get user", error);
      if (error.response && error.response.data) {
        console.log("axios", error);
        return rejectWithValue({ error: error.response.data });
      } else {
        console.log("pas axios");
        return rejectWithValue({ error: error });
      }
    }
  }
);

interface IReset {
  password: string;
  confirmPassword: string;
  passwordResetToken: string;
}

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (data: IReset, { rejectWithValue }) => {
    try {
      console.log("resetPassword start tunk");
      const { password, confirmPassword, passwordResetToken } = data;
      let result = await AuthService.resetPassword(
        password,
        confirmPassword,
        passwordResetToken
      );
      console.log("ASYNC THUNK resetPassword", result.data);
      return result.data;
    } catch (error: any) {
      console.log("4 get user", error);
      if (error.response && error.response.data) {
        console.log("axios", error);
        return rejectWithValue({ error: error.response.data });
      } else {
        console.log("pas axios");
        return rejectWithValue({ error: error });
      }
    }
  }
);
