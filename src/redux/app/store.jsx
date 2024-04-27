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
import orderReducer from "../features/orderSlice";
import authReducer from "../features/authSlice";
import Cookies from "js-cookie";
import productReducer from "../features/productSlice";
import payStackReducer from "../features/payStackSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducers = combineReducers({
  cart: cartReducer,
  wishList: wishListReducer,
  categories: categoryReducer,
  orders: orderReducer,
  auth: authReducer,
  product: productReducer,
  payStack: payStackReducer,
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
