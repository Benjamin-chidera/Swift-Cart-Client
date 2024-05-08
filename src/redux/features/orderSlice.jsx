import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const orderUrl = "http://localhost:3000/api/v1/orders/createOrder";
const order = "http://localhost:3000/api/v1/orders";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const { data } = await axios(order);
  return data;
});

export const createOrders = createAsyncThunk(
  "orders/createOrders",
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(orderUrl, order);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  orders: {},
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
      })

      // create Order
      .addCase(createOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrders.fulfilled, (state, { payload }) => {
        (state.status = "idle"), (state.orders = payload);
      })
      .addCase(createOrders.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
