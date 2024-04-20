import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
  status: false,
};

const wishList = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishList: (state, { payload }) => {
      state.wishList.push(payload);
      state.status = true;
    },
    removeWishList: (state, { payload }) => {
      state.wishList = state.wishList.filter((wish) => wish._id !== payload);
      state.status = false;
    },
    clearWishList: (state) => {
      state.wishList = [];
    },
  },
});

export const { addWishList, removeWishList, clearWishList } = wishList.actions;

export default wishList.reducer;
