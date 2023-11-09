import { createSlice } from '@reduxjs/toolkit';
import { iUserDto } from '../../../models/IUser';

const initialState = {
    user : {} as iUserDto  ,
    isLoading: false,
    error: '',
    token: null,
    isAuth: false,
    isActivated: false
    // refreshToken:null
};

const UserSlice = createSlice({
    name: 'auth',
    initialState,
    
    reducers: {
        
        getUserPending: (state) => {
            state.isLoading = true;
        },
        stopUserPending: (state) => {
            state.isLoading = false;
        },
        getUserSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.user = payload.user;
            state.token = payload.accessToken;
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


        setAuth: (state) => {
            state.isAuth = true;
        }


        
    },
});


export const {
    getUserPending,
    stopUserPending,
    getUserSuccess,
    getUserFail,
    logout,
    setAuth
} = UserSlice.actions;


export default UserSlice.reducer;

// export const  selectCurrentUser  = (state) => state.auth.user;