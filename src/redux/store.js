import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import { combineReducers } from "redux";

// 1. Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

// 2. Configure persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // only auth and cart will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 4. Create persistor
export const persistor = persistStore(store);
