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
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
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
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error });
      }
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/user",
  async (data, { rejectWithValue }) => {
    try {
      let user = await AuthService.getUser();
      return user.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
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
      const { email } = data;
      let result = await AuthService.forgotPassword(email);
      return result.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
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
      const { password, confirmPassword, passwordResetToken } = data;
      let result = await AuthService.resetPassword(
        password,
        confirmPassword,
        passwordResetToken
      );
      return result.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error });
      }
    }
  }
);
