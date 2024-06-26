import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const createAProducts =
  "https://swift-cart-server.onrender.com/api/v1/products";
const getAllProduct = "https://swift-cart-server.onrender.com/api/v1/products";
const deleteAProduct = "https://swift-cart-server.onrender.com/api/v1/products";
const getAProduct = "https://swift-cart-server.onrender.com/api/v1/products";
const editAProduct = "https://swift-cart-server.onrender.com/api/v1/products";
// const search = "http://localhost:3000/api/v1/products/q/productName?name";

export const createProducts = createAsyncThunk(
  "products/createProduct",
  async ({ formData, token }) => {
    try {
      const { data } = await axios.post(createAProducts, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data) {
        toast.success("Product has been created successfully");
        window.location.href = "/admin/product-list";
        return data;
      } else {
        toast.error("Error creating product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating product");
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

      if (data) {
        toast.success("Product has been deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        return data;
      } else {
        toast.error("Error deleting product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
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
      if (data) {
        toast.success("Product has been edited successfully");
        // window.location.href = "/admin/product-list";
        setTimeout(() => {
          window.location.href = "/admin/product-list";
        }, 2000);
        return data;
      } else {
        toast.error("Error editing product");
      }
    } catch (error) {
      toast.error("Error editing product");
      console.log(error);
    }
  }
);

const initialState = {
  product: [],
  singleProduct: null,
  status: "idle",
  search: [],
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
        state.product = payload;
        // state.product.push(payload);
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
