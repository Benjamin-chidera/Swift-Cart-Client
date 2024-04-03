import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const { data } = await axios(
    "https://fakestoreapi.com/products/category/jewelery?limit=4"
  );
  return data;
});

const initialState = {
  orders: [],
  status: "idle",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        (state.status = "idle"), (state.orders = payload);
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
