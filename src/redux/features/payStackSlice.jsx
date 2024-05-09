import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const payMent = createAsyncThunk("payment/fetchPayment", async () => {
  const { data } = await axios(
    "https://swift-cart-server.onrender.com/api/v1/payStack"
  );

  return data;
});

export const handlePayMent = createAsyncThunk(
  "handlePayMent/PostPayment",
  async (formData) => {
    try {
      const { data } = await axios.post(
        "https://swift-cart-server.onrender.com/api/v1/payStack",
        formData
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  payStack: [],
  payment: null,
  status: "idle",
};

const payStackSlice = createSlice({
  name: "payStack",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // PayStack PayMent
      .addCase(handlePayMent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handlePayMent.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.payment = payload;
      })
      .addCase(handlePayMent.rejected, (state) => {
        state.status = "rejected";
      })

      // fetch payMents
      .addCase(payMent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(payMent.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.payStack = payload;
      })
      .addCase(payMent.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const {} = payStackSlice.actions;

export default payStackSlice.reducer;
