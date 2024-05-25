import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const orderUrl =
  "https://swift-cart-server.onrender.com/api/v1/orders/createOrder";
const order = "https://swift-cart-server.onrender.com/api/v1/orders";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (token) => {
    const { data } = await axios(order, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const createOrders = createAsyncThunk(
  "orders/createOrders",
  async ({ order, token }, { rejectWithValue }) => {
    try {
      // console.log(order, 'in the slice');
      const { data } = await axios.post(orderUrl, order, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        return data;
      } else {
        return rejectWithValue("Unable to create order");
      }
    } catch (error) {
      // console.log(error);

      return rejectWithValue("Unable to create order");
    }
  }
);

export const updateStatus = createAsyncThunk(
  "status/updateStatus",
  async ({ orderId, formData, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `https://swift-cart-server.onrender.com/api/v1/orders/singleOrder/${orderId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success("Order Status has been successfully updated");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        return data;
      } else {
        toast.error("Error updating status");
        return rejectWithValue("Couldn't update order status");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Error updating status");
      return rejectWithValue("Couldn't update order status");
    }
  }
);

export const fetchSingleOrders = createAsyncThunk(
  "orders/fetchSingleOrders",
  async ({ orderId, token }) => {
    const { data } = await axios(
      `https://swift-cart-server.onrender.com/api/v1/orders/singleOrder/${orderId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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
