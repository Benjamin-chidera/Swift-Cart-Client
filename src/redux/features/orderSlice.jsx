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

      if (data.success) {
        return data;
      } else {
        return rejectWithValue("Unable to create order");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Unable to create order");
    }
  }
);

export const updateStatus = createAsyncThunk(
  "status/updateStatus",
  async ({ orderId, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/api/v1/orders/singleOrder/${orderId}`,
        formData
      );
      if (data.success) {
        return data;
      } else {
        return rejectWithValue("Couldn't update order status");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Couldn't update order status");
    }
  }
);

export const fetchSingleOrders = createAsyncThunk(
  "orders/fetchSingleOrders",
  async (orderId) => {
    const { data } = await axios(
      `http://localhost:3000/api/v1/orders/singleOrder/${orderId}`
    );
    return data;
  }
);

const initialState = {
  orders: {},
  singleOrder: {},
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
      })

      // Update order status
      .addCase(updateStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStatus.fulfilled, (state, { payload }) => {
        (state.status = "idle"), (state.orders = payload);
      })
      .addCase(updateStatus.rejected, (state) => {
        state.status = "rejected";
      })

      // single order
      .addCase(fetchSingleOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleOrders.fulfilled, (state, { payload }) => {
        (state.status = "idle"), (state.singleOrder = payload);
      })
      .addCase(fetchSingleOrders.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
