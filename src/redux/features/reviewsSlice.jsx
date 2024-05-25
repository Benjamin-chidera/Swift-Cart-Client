import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const reviewUrl = "https://swift-cart-server.onrender.com/api/v1/reviews";

export const createReviews = createAsyncThunk(
  "reviews/createReview",
  async ({ productId, comment, rating, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `https://swift-cart-server.onrender.com/api/v1/reviews/${productId}/reviews`,
        {
          comment,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success("Review has been made 👍");
        return data;
      } else {
        toast.error("Unable to make review 😢");
        return rejectWithValue("Unable to make a review");
      }
    } catch (error) {
      // console.log(error?.response?.data?.error);
      toast.error(error?.response?.data?.error);
      return rejectWithValue("Unable to make a review");
    }
  }
);

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (token) => {
    const { data } = await axios(reviewUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
);

export const fetchReviewsProduct = createAsyncThunk(
  "reviews/fetchReviewsProduct",
  async ({ token, productId }) => {
    const { data } = await axios(
      `https://swift-cart-server.onrender.com/api/v1/reviews/${productId}`
      // {
      //   headers: { Authorization: `Bearer ${token}` },
      // }
    );
    return data;
  }
);

const initialState = {
  createdReview: {},
  reviews: [],
  reviewsProduct: [],
  status: "idle",
};

const reviewsSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReviews.fulfilled, (state, { payload }) => {
        (state.status = "idle"), (state.createdReview = payload);
      })
      .addCase(createReviews.rejected, (state) => {
        state.status = "rejected";
      })

      // fetch reviews
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, { payload }) => {
        (state.status = "idle"), (state.reviews = payload);
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = "rejected";
      })

      // fetch reviews for a product
      .addCase(fetchReviewsProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewsProduct.fulfilled, (state, { payload }) => {
        (state.status = "idle"), (state.reviewsProduct = payload);
      })
      .addCase(fetchReviewsProduct.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const {} = reviewsSlice.actions;

export default reviewsSlice.reducer;
