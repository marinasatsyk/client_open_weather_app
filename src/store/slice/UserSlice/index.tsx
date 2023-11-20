import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/AuthService';
import { iUserDto } from 'common/interfaces/auth';

const initialState = {
    user : {} as iUserDto,
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

