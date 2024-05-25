import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

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
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(registerAUser, formData);

      // console.log(data);
      if (data) {
        Cookies.set("userToken", data.registerUser.token);

        const decode = jwtDecode(data.registerUser.token);

        if (decode.role === "user") {
          toast.success("Registration Successful");
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          toast.success("Registration Successful");
          setTimeout(() => {
            window.location.href = "/admin";
          }, 3000);
        }

        return data;
      } else {
        return rejectWithValue("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Registration failed");
    }
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
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(loginAUser, formData);

      if (data) {
        Cookies.set("userToken", data.user.token);

        const decode = jwtDecode(data.user.token);

        if (decode.role === "user") {
          toast.success("Login Successful");

          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          toast.success("Login Successful");

          setTimeout(() => {
            window.location.href = "/admin";
          }, 3000);
        }

        return data;
      } else {
        toast.error("Invalid credentials");
        return rejectWithValue("Invalid credentials");
      }
    } catch (error) {
      toast.error("Invalid credentials");
      console.log(error);
      return rejectWithValue("Login failed");
    }
  }
);

// forgotten user
export const forgottenUser = createAsyncThunk(
  "user/forgottenUser",
  async (formData) => {
    try {
      const { data } = await axios.post(forgottenAUser, formData);

      if (data) {
        toast.success("An Email Has Been Sent To You");
        return data;
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials");
    }
  }
);

// reset user
export const resetUser = createAsyncThunk(
  "user/resetUser",
  async ({ formData, token }) => {
   try {
     const { data } = await axios.patch(`${resetAUser}/${token}`, formData);

      if (data) {
        toast.success("Password Successfully Changed");

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } 
     return data;
   } catch (error) {
    console.log(error);
    toast.error("Error Resetting Password");
   }
  }
);

const initialState = {
  user: null,
  status: "idle",
  getAllUsers: [],
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
        state.getAllUsers = payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
