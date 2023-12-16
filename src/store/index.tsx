import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import auth from './slice/UserSlice';
import auth from "./slice/auth";
import currentWeather from "./slice/weather";
import dailyForecast from "./slice/dailyWeather";
import hourlyForecast from "./slice/hourlyWeather";
// import pollutionWeather from './slice/pollutionWeather';
import admin from "./slice/admin";

import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

// import storage from 'redux-persist/lib/storage';

// const rootReducer = combineReducers({
//     auth ,
//     weather
// });

const store = configureStore({
  reducer: {
    auth,
    currentWeather,
    dailyForecast,
    hourlyForecast,
    admin,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["your/action/type"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});

// export type AppDispatch = typeof store.dispatch

//useStoreDispatch is for async call
export type AppDispatch = typeof store.dispatch;
// export const useStoreDispatch = () => useDispatch<typeof store.dispatch>
export type RootState = ReturnType<typeof store.getState>;

export default store;
