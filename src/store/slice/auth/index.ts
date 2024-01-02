import { createSlice } from "@reduxjs/toolkit";
import { IAuthState, IFullUser } from "common/interfaces/auth";
import {
  forgotPassword,
  getUser,
  loginUser,
  registerUser,
  resetPassword,
} from "store/thunks/auth";
import {
  deleteBookmark,
  updateActiveBookmark,
  updateBookmarks,
  updateUser,
  deleteUser,
} from "store/thunks/user";

import { manageToken } from "utils/helpers";

const initialState = {
  user: {},
  isAuth: false,
  error: "",
  isLoading: false,
  isRegistred: false,
  isRememberMe_r: false,
  stateResponse: {
    message: "",
    success: false,
    status: "",
  },
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
    logoutUser(state) {
      state.isAuth = false;
      state.user = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        isActivated: false,
        bookmarks: [],
        role: "",
      };
      state.isLoading = false;
      state.isRegistred = false;
      state.isRememberMe_r = false;
      state.stateResponse = {
        message: "",
        success: false,
        status: "",
      };
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

    //user
    builder.addCase(getUser.pending, (state, action) => {
      state.isAuth = false;
      state.isLoading = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      const user = action.payload;

      state.user = user;
      state.isAuth = true;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getUser.rejected, (state, action) => {
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

    //bookmarks==adding
    builder.addCase(updateBookmarks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateBookmarks.fulfilled, (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.user = user;
      state.error = "";
    });
    builder.addCase(updateBookmarks.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });

    //bookmarks==updating cityes
    builder.addCase(updateActiveBookmark.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateActiveBookmark.fulfilled, (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.user = user;
      state.error = "";
    });
    builder.addCase(updateActiveBookmark.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });

    //bookmarks==deleting cities
    builder.addCase(deleteBookmark.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBookmark.fulfilled, (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.user = user;
      state.error = "";
    });
    builder.addCase(deleteBookmark.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });

    //update User
    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.user = user;
      state.error = "";
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });

    //delete User
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const response = action.payload;
      state.isLoading = false;
      //@TODO
      const { message, success } = response;
      state.stateResponse.message = message;
      state.stateResponse.success = success;
      state.error = "";
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });

    //FORGOT
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      const response = action.payload;
      state.isLoading = false;
      const { message, status } = response;
      state.stateResponse.message = message;
      state.stateResponse.status = status;
      state.error = "";
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });

    //RESET
    builder.addCase(resetPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      const response = action.payload;
      state.isLoading = false;
      const { message, status } = response;
      state.stateResponse.message = message;
      state.stateResponse.status = status;
      state.error = "";
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError, rememberMe, logoutUser } = authSlice.actions;
export default authSlice.reducer;
