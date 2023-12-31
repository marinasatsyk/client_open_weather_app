import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserRoleDataKeys } from "common/interfaces/auth";
import { geoOptionType } from "common/types/geo";
import UserService from "services/UserSevice";

interface IBookmarksUpdate {
  city: geoOptionType;
  isHistory: boolean;
  isActive: boolean;
}
interface IBookmark {
  cityId: string;
  isHistory?: boolean;
}

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

export const updateUser = createAsyncThunk(
  "user/update",
  async (data: IUserUpdate, { rejectWithValue }) => {
    try {
      const updatedUser = await UserService.updateUser(
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

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (data: IUserId, { rejectWithValue }) => {
    try {
      const responseDeletedUser = await UserService.deleteUser(data.userId);
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

export const updateBookmarks = createAsyncThunk(
  "user/updateBookmarks",
  async (data: IBookmarksUpdate, { rejectWithValue }) => {
    try {
      const updatedUser = await UserService.updateBookmarks(
        data.city,
        data.isHistory,
        data.isActive
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

export const updateActiveBookmark = createAsyncThunk(
  "user/updateActiveBookmark",
  async (data: IBookmark, { rejectWithValue }) => {
    try {
      const updatedUser = await UserService.updateActiveBookmark(
        data.cityId,
        data.isHistory
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

export const deleteBookmark = createAsyncThunk(
  "user/deleteBookmark",
  async (data: IBookmark, { rejectWithValue }) => {
    try {
      const updatedUser = await UserService.deleteBookmark(data.cityId);
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
