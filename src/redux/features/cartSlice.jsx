import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecentFemale = createAsyncThunk(
  "products/fetchRecentFemale",
  async () => {
    const res = await axios(
    `  https://swift-cart-server.onrender.com/api/v1/products/recent/female`
    );
    const data = res.data;
    return data;
  }
);

export const fetchRecentMale = createAsyncThunk(
  "products/fetchRecentMale",
  async () => {
    const res = await axios(
    `  https://swift-cart-server.onrender.com/api/v1/products/recent/male`
    );
    const data = res.data;
    return data;
  }
);

const initialState = {
  products: [],
  cart: [],
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const item = state.cart?.find((s) => s?._id === payload?._id);
      if (item) {
        item.quantity++;
      } else {
        state.cart?.push({ ...payload, quantity: 1 });
      }
    },

    removeItem: (state, { payload }) => {
      state.cart = state.cart?.filter((c) => c._id !== payload);
    },

    incItem: (state, { payload }) => {
      const item = state.cart?.find((c) => c._id === payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.price;
    },

    decItem: (state, { payload }) => {
      const item = state.cart?.find((c) => c._id === payload);

      if (item.quantity === 1) {
        cartSlice.caseReducers.removeItem(state, { payload });
      } else {
        item.quantity--;
        item.totalPrice = item.quantity * item.price;
      }
    },

    clearCart: (state) => {
      state.cart = [];
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentFemale.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecentFemale.fulfilled, (state, payload) => {
        state.status = "idle";

        state.products = payload;
      })
      .addCase(fetchRecentFemale.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchRecentMale.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecentMale.fulfilled, (state, payload) => {
        state.status = "idle";

        state.products = payload;
      })
      .addCase(fetchRecentMale.rejected, (state) => {
        state.status = "rejected";
      })
  },
});

export const { addItem, removeItem, incItem, decItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalQtyItem = (state) => {
  return state.cart.cart?.reduce((sum, item) => sum + item.quantity, 0); // total quantity of items in cart
};

export const getTotalPrice = (state) => {
  return state.cart.cart?.reduce(
    // total price of items in cart
    (sum, item) => sum + item.quantity * item.price,
    0
  );
};

export const getCurrentQtyItem = (id) => (state) => {
  return state.cart.cart?.find((c) => c._id === id)?.quantity ?? 0;
};
