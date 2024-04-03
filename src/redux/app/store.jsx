import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "../features/cartSlice";
import wishListReducer from "../features/wishListSlice";
import categoryReducer from "../features/categorySlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducers = combineReducers({
  cart: cartReducer,
  wishList: wishListReducer,
  categories: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
