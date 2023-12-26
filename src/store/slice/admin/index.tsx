import { createSlice } from "@reduxjs/toolkit";
import { IAdminUsersState } from "common/interfaces/auth";
import {
  createUser,
  deleteUserAdmin,
  getAllUsers,
  getUserAdmin,
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
  stateRes: {
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
    logoutAdmin(state) {
      state.users = [];
      state.error = "";
      state.isLoading = false;
      state.adminUser = {
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
      };
      state.stateRes = {
        message: "",
        success: false,
      };
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
      const error = (action.payload as { error: string }).error;
      state.error += (state.error ? ", " : "") + error;
      // state.error = "";
      // state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });

    //get user from admin
    builder.addCase(getUserAdmin.pending, (state, action) => {
      state.error = "";
      state.isLoading = true;
    });
    builder.addCase(getUserAdmin.fulfilled, (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.adminUser = user;
      state.error = "";
    });
    builder.addCase(getUserAdmin.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });

    //delete user from admin
    builder.addCase(deleteUserAdmin.pending, (state, action) => {
      state.error = "";
      state.isLoading = true;
    });
    builder.addCase(deleteUserAdmin.fulfilled, (state, action) => {
      console.log("from builder delete user admin", action.payload);
      const response = action.payload;
      state.isLoading = false;
      //@TODO
      const { message, success } = response;
      state.stateRes.message = message;
      state.stateRes.success = success;
      state.error = "";
    });
    builder.addCase(deleteUserAdmin.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
