import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateAdminUser, UserRoleDataKeys } from "common/interfaces/auth";
import AdminService from "services/AdminService";
import UserService from "services/UserSevice";

interface IUserUpdate {
  userId: string;
  dataUpdate: {
    email: string;
    firstName: string;
    lastName: string;
    role?: UserRoleDataKeys;
    isActivated?: boolean;
  };
}

interface IUserId {
  userId: string;
}
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

export const updateUserFromAdmin = createAsyncThunk(
  "admin/user/update",
  async (data: IUserUpdate, { rejectWithValue }) => {
    try {
      const updatedUser = await AdminService.updateUserFromAdmin(
        data.dataUpdate,
        data.userId
      );
      return updatedUser.data;
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

export const getUserAdmin = createAsyncThunk(
  "admin/user/get",
  async (data: IUserId, { rejectWithValue }) => {
    try {
      console.log("🔎, in thunk get  user");
      let user = await AdminService.getUserFromAdmin(data.userId);
      console.log("ASYNC THUNK user", user.data);
      return user.data;
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

export const deleteUserAdmin = createAsyncThunk(
  "admin/user/delete",
  async (data: IUserId, { rejectWithValue }) => {
    try {
      const responseDeletedUser = await AdminService.deleteUserFromAdmin(
        data.userId
      );
      return responseDeletedUser.data;
    } catch (error: any) {
      console.log("delete Bookmark", error);
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
