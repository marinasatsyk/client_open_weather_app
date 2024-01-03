import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateAdminUser, UserRoleDataKeys } from "common/interfaces/auth";
import AdminService from "services/AdminService";

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
      let users = await AdminService.getAllUsers();
      return users.data;
    } catch (error: any) {
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
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
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
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error });
      }
    }
  }
);

export const getUserAdmin = createAsyncThunk(
  "admin/user/get",
  async (data: IUserId, { rejectWithValue }) => {
    try {
      let user = await AdminService.getUserFromAdmin(data.userId);
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

export const deleteUserAdmin = createAsyncThunk(
  "admin/user/delete",
  async (data: IUserId, { rejectWithValue }) => {
    try {
      const responseDeletedUser = await AdminService.deleteUserFromAdmin(
        data.userId
      );
      return responseDeletedUser.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue({ error: error.response.data });
      } else {
        return rejectWithValue({ error: error });
      }
    }
  }
);
