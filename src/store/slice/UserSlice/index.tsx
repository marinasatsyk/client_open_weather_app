import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import AuthService from '../../../services/AuthService';
import { iUserDto } from 'common/interfaces/auth';

const initialState = {
    user : {} as iUserDto  ,
    isLoading: false,
    error: '',
    isAuth: false,
    isActivated: false
};

export const getUser = createAsyncThunk(
    'getUser',
    async(userId: string) => {
        const response = await AuthService.getUser(userId);
        return  response;
    }
)

const UserSlice = createSlice({
    name: 'auth',
    initialState,
    
    reducers: {
        getUserPending: (state) => {
            console.log('==========in pending user slice')
            state.error = '';
            state.isLoading = true;
        },
        stopUserPending: (state) => {
            state.isLoading = false;
        },
        getUserSuccess: (state, { payload }) => {
            console.log("payload", payload)
            state.isLoading = false;
            state.user = payload;
            state.isAuth = true;
            state.isActivated = payload.isActivated;
            // state.token = payload.accessToken;
            // state.refreshToken = payload.refreshToken
            state.error = '';
        },
        getUserFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        logout: (state ) => {
            state.user = {} as iUserDto;
        },

        setAuthSuccess: (state) => {
            state.isAuth = true;
        },
        setAuthFail: (state) => {
            state.isAuth = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                // Assuming your user data is in action.payload.data
                const userPayload = action.payload.data;
        
                // Update state.user with the extracted user data
                state.user = {
                    firstName: userPayload.firstName,
                    lastName: userPayload.lastName,
                    email: userPayload.email,
                    isActivated: userPayload.isActivated,
                    id: userPayload.id,
                };
            }
            // state.user = action.payload
        })
    }
});


export const {
    getUserPending,
    stopUserPending,
    getUserSuccess,
    getUserFail,
    logout,
    setAuthSuccess,
    setAuthFail
} = UserSlice.actions;


export default UserSlice.reducer;

// export const  selectCurrentUser  = (state) => state.auth.user;