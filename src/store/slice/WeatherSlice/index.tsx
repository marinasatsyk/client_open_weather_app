import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    isLoading: false,
    error: '',
};

const DataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        getDataPending: (state) => {
            state.isLoading = true;
        },
        stopDataPending: (state) => {
            state.isLoading = false;
        },
        getDataSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.data = payload;
            state.error = '';
        },
        getDataFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        logout: (state) => {
            state.data = [];
        },
    },
});

export const {
    getDataPending,
    stopDataPending,
    getDataSuccess,
    getDataFail,
    logout,
} = DataSlice.actions;


export default DataSlice.reducer;