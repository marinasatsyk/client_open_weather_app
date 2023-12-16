import { createAsyncThunk } from "@reduxjs/toolkit";
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
