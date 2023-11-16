
import { configureStore, combineReducers  } from "@reduxjs/toolkit";
// import auth from './slice/UserSlice';
import auth from './slice/auth';
import weather from './slice/WeatherSlice';
import { useDispatch } from 'react-redux'
import { deflateRaw } from "zlib";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
// import storage from 'redux-persist/lib/storage';


// const rootReducer = combineReducers({
//     auth ,
//     weather
// });



const store = configureStore({
    reducer: {
        auth ,
        weather
    },
    devTools: true
});

// export type AppDispatch = typeof store.dispatch

//useStoreDispatch is for async call 
export type AppDispatch = typeof store.dispatch;
// export const useStoreDispatch = () => useDispatch<typeof store.dispatch> 
export type RootState = ReturnType<typeof store.getState>

export default store;





