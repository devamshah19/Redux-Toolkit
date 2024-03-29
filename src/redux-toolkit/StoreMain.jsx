import { configureStore } from "@reduxjs/toolkit";
import { EmpReducer } from "./ReducerMain";
import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, EmpReducer.reducer)

export const store = configureStore({
    // reducer: persistedReducer
    reducer: EmpReducer.reducer
})

// export const persistor = persistStore(store)
