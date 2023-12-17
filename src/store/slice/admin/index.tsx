import { createSlice } from "@reduxjs/toolkit";
import { IAdminUsersState } from "common/interfaces/auth";
import { createUser, getAllUsers } from "store/thunks/admin";

const initialState = {
  users: [],
  error: "",
  isLoading: false,
  createdUser: {
    id: "",
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
} as IAdminUsersState;

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError(state, action) {
      state.error = action.payload;
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
      state.createdUser = user;
      state.error = "";
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.error = "";
      state.error = (action.payload as { error: string }).error;
      state.isLoading = false;
    });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
