import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import localStorage from "redux-persist/es/storage";

const registerAUser =
  "https://swift-cart-server.onrender.com/api/v1/auth/register";
const loginAUser = "https://swift-cart-server.onrender.com/api/v1/auth/login";
const forgottenAUser =
  "https://swift-cart-server.onrender.com/api/v1/auth/forgot-Password";
const resetAUser =
  "https://swift-cart-server.onrender.com/api/v1/auth/reset-Password";
const allUsers = "https://swift-cart-server.onrender.com/api/v1/auth";

// register a user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData) => {
    const { data } = await axios.post(registerAUser, formData);

    return data;
  }
);

// get all user
export const getUser = createAsyncThunk("user/getUser", async () => {
  const { data } = await axios(allUsers);

  return data;
});

// login a user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData) => {
    const { data } = await axios.post(loginAUser, formData);

    return data;
  }
);

// forgotten user
export const forgottenUser = createAsyncThunk(
  "user/forgottenUser",
  async (formData) => {
    const { data } = await axios.post(forgottenAUser, formData);

    return data;
  }
);

// reset user
export const resetUser = createAsyncThunk(
  "user/resetUser",
  async ({ formData, token }) => {
    const { data } = await axios.patch(`${resetAUser}/${token}`, formData);

    return data;
  }
);

const initialState = {
  user: {},

  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = "failed";
      })

      // login user
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.user = payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed";
      })

      //forgotten user
      .addCase(forgottenUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgottenUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.user = payload;
      })
      .addCase(forgottenUser.rejected, (state) => {
        state.status = "failed";
      })

      //reset user
      .addCase(resetUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.user = payload;
      })
      .addCase(resetUser.rejected, (state) => {
        state.status = "failed";
      })

      //get all user
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.user = payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
