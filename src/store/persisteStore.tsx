
// import { configureStore, combineReducers  } from "@reduxjs/toolkit";
// // import userReducer from "./slices/userSlice";
// import GetUserReducer from '../features/UserSlice';
// import storage from 'redux-persist/lib/storage';
// // import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
// import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';



// const persistConfig = {
//     key: 'root',
//     storage
// }

// const persistedReducer = persistReducer(persistConfig, GetUserReducer)

// const rootReducer = combineReducers({});

// export const store = configureStore({
//     reducer: {
//         user : persistedReducer,
         
//     },
//     // eslint-disable-next-line no-undef
//     devTools: process.env.NODE_ENV !== 'production',
//     middleware: [thunk]
// });

// export type RootState = ReturnType<typeof store.getState>

// export const persistor = persistStore(store)


// // export const store = configureStore({
// //     reducer: {
// //         user: GetUserReducer,
// //     },
// // });



function persisteStore() {
  return (
    <div>persisteStore</div>
  )
}

export default persisteStore