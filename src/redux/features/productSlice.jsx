import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createAProducts = "http://localhost:3000/api/v1/products";
const getAllProduct = "http://localhost:3000/api/v1/products";
const deleteAProduct = "http://localhost:3000/api/v1/products";
const getAProduct = "http://localhost:3000/api/v1/products";
const editAProduct = "http://localhost:3000/api/v1/products";

export const createProducts = createAsyncThunk(
  "products/createProduct",
  async ({ formData, token }) => {
    try {
      const { data } = await axios.post(createAProducts, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProduct = createAsyncThunk("products/getProduct", async () => {
  try {
    const { data } = await axios(getAllProduct);
   
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ _id, token }) => {
    try {
      const { data } = await axios.delete(`${deleteAProduct}/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (productId) => {
    try {
      const { data } = await axios(`${getAProduct}/${productId}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editAProducts = createAsyncThunk(
  "products/editAProducts",
  async ({ formData, productId, token }) => {
    try {
      const { data } = await axios.patch(
        `${editAProduct}/${productId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  product: [],
  singleProduct: null,
  status: "idle",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleted: (state, { payload }) => {
      state.product = state.product.filter((p) => p._id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProducts.fulfilled, (state, { payload }) => {
        state.status = "idle";
        // state.product = payload;
        state.product.push(payload);
      })
      .addCase(createProducts.rejected, (state) => {
        state.status = "error";
      })

      // getting All products
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.product = payload;
        // state.product.push(payload);
      })
      .addCase(getProduct.rejected, (state) => {
        state.status = "error";
      })

      // Delete A products
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (Array.isArray(state.product)) {
          state.product = state.product.filter((p) => p._id !== payload._id);
        }
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.status = "error";
      })

      // Get A products
      .addCase(getSingleProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.singleProduct = payload;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        state.status = "error";
      })

      // edit A products
      .addCase(editAProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editAProducts.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.product = payload;
      })
      .addCase(editAProducts.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { deleted } = productSlice.actions;

export default productSlice.reducer;