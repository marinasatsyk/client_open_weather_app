import { createSlice } from "@reduxjs/toolkit";
import { IAdminUsersState } from "common/interfaces/auth";
import {
  createUser,
  getAllUsers,
  updateUserFromAdmin,
} from "store/thunks/admin";
import { deleteUser } from "store/thunks/user";

const initialState = {
  users: [],
  error: "",
  isLoading: false,
  adminUser: {
    _id: "",
    email: "",
    isActivated: false,
    activationLink: "",
    firstName: "",
    lastName: "",
    createdDateTime: "",
    role: "",
    preferences: {
      theme: "",
      language: "",
    },
    bookmarks: [],
  },
  stateResponse: {
    message: "",
    success: false,
  },
} as IAdminUsersState;

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = action.payload;
    },
    clearCreatedUser(state, action) {
      state.adminUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      console.log("from builder getAllUsers", action.payload);
      const users = action.payload;
      state.isLoading = false;
      state.users = users;
      state.error = "";
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });

    //create user from admin
    builder.addCase(createUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      console.log("from builder createUser", action.payload);
      const user = action.payload.user;
      state.isLoading = false;
      state.adminUser = user;
      state.error = "";
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });

    //update user from admin
    builder.addCase(updateUserFromAdmin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserFromAdmin.fulfilled, (state, action) => {
      console.log("from builder updateUserFromAdmin", action.payload);
      const user = action.payload;
      state.isLoading = false;
      state.adminUser = user;
      state.error = "";
    });
    builder.addCase(updateUserFromAdmin.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });

    //delete user from admin
    //delete User
    builder.addCase(deleteUser.pending, (state, action) => {
      state.error = "";
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      console.log("from builder deleteBookmark", action.payload);
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
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
