import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICity } from "common/interfaces/auth";
import { geoOptionType } from "common/types/geo";
import UserService from "services/UserSevice";

interface IBookmarksUpdate {
  city: geoOptionType;
  isHistory: boolean;
  isActive: boolean;
}
interface IBookmark {
  cityId: string;
}

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

export const updateActiveBookmark = createAsyncThunk(
  "user/updateActiveBookmark",
  async (data: IBookmark, { rejectWithValue }) => {
    try {
      const updatedUser = await UserService.updateActiveBookmark(data.cityId);
      return updatedUser.data;
    } catch (error: any) {
      console.log("activeBookmark", error);
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

export const deleteBookmark = createAsyncThunk(
  "user/deleteBookmark",
  async (data: IBookmark, { rejectWithValue }) => {
    try {
      const updatedUser = await UserService.deleteBookmark(data.cityId);
      return updatedUser.data;
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
