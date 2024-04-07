import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const featchCategories = createAsyncThunk(
  "categories/featchCategories",
  async (category) => {
    const { data } = await axios(
      `https://fakestoreapi.com/products/category/${category}`
    );

    return data;
  }
);

export const featchCategoriesDetails = createAsyncThunk(
  "categories/featchCategoriesDetails",
  async (productId) => {
    const { data } = await axios(
      `https://fakestoreapi.com/products/${productId}`
    );

    return data;
  }
);

const initialState = {
  categories: [],
  categoriesDetails: {},
  status: "idle",
  minPrice: 0,
  maxPrice: Infinity,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(featchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchCategories.fulfilled, (state, payload) => {
        state.status = "idle";
        state.categories = payload;
      })
      .addCase(featchCategories.rejected, (state, ) => {
        state.status = "rejected";
      })
      .addCase(featchCategoriesDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchCategoriesDetails.fulfilled, (state, payload) => {
        state.status = "idle";
        state.categoriesDetails = payload;
      })
      .addCase(featchCategoriesDetails.rejected, (state, payload) => {
        state.status = "rejected";
      });
  },
});

export const { setMaxPrice, setMinPrice } = categorySlice.actions;

export default categorySlice.reducer;
