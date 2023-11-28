import { createSlice } from "@reduxjs/toolkit";
import { IAuthState, IFullUser } from "common/interfaces/auth";
import { getUser, loginUser, registerUser } from "store/thunks/auth";
import { updateActiveBookmark, updateBookmarks } from "store/thunks/user";
import { manageToken } from "utils/helpers";

const initialState = {
  user: {},
  isAuth: false,
  error: "",
  isLoading: false,
  isRegistred: false,
  isRememberMe_r: false,
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
      console.log("is here??1");

      state.isAuth = false;
      state.isLoading = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log("FULLFILLED");
      const user = action.payload;

      console.log("is here??====>", `${user} an type ${typeof user}`);
      state.user = user;
      state.isAuth = true;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log("is here??2");

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
      console.log("from builder updateBookmarks.fulfilled", action.payload);
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
      console.log("from builder updateBookmark", action.payload);
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
  },
});

export const { clearError, rememberMe } = authSlice.actions;
export default authSlice.reducer;
