
import { configureStore, combineReducers  } from "@reduxjs/toolkit";
import GetUserReducer from './features/UserSlice';
import GetWheatherReducer from './features/WeatherSlice';
import { useDispatch } from 'react-redux'
import { deflateRaw } from "zlib";
// import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
        auth : GetUserReducer,
        weather: GetWheatherReducer
});



const store = configureStore({
    reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
export type RootState = ReturnType<typeof rootReducer>

export default store;





