import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const featchCategories = createAsyncThunk(
  "categories/featchCategories",
  async ({ category, tags }) => {
    try {
      const { data } = await axios(
        `https://swift-cart-server.onrender.com/api/v1/products/category/${category}/tags/${tags}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const featchCategoriesAndGender = createAsyncThunk(
  "categoriesGender/featchCategoriesAndGender",
  async ({ category, gender }) => {
    try {
      const { data } = await axios(
        `https://swift-cart-server.onrender.com/api/v1/products/category/${category}/gender/${gender}`
      );

      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
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
  categoriesGender: [],
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

      //categories
      .addCase(featchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchCategories.fulfilled, (state, payload) => {
        state.status = "idle";
        state.categories = payload;
      })
      .addCase(featchCategories.rejected, (state) => {
        state.status = "rejected";
      })

      //category by gender
      .addCase(featchCategoriesAndGender.pending, (state) => {
        state.status = "loading";
      })
      .addCase(featchCategoriesAndGender.fulfilled, (state, payload) => {
        state.status = "idle";
        state.categoriesGender = payload;
      })
      .addCase(featchCategoriesAndGender.rejected, (state) => {
        state.status = "rejected";
      })

      //cat details
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
