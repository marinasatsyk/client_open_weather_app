import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateAdminUser } from "common/interfaces/auth";
import AdminService from "services/AdminService";

export const getAllUsers = createAsyncThunk(
  "admin/users",
  async (data, { rejectWithValue }) => {
    try {
      console.log("🔎🔎🔎🔎🔎, in thunk all users");
      let users = await AdminService.getAllUsers();
      console.log("ASYNC THUNK users", users.data);
      return users.data;
    } catch (error: any) {
      console.log("get all users", error);
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error });
      }
    }
  }
);

export const createUser = createAsyncThunk(
  "admin/create/user",
  async (data: ICreateAdminUser, { rejectWithValue }) => {
    try {
      const user = await AdminService.creation(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.role
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
