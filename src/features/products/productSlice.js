import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";
import { applyAcoupon } from "../user/userSlice";


export const getAllProducts = createAsyncThunk("product/get", async (data, thunkAPI) => {
  try {
    return await productService.getProducts(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
});
export const getAProduct = createAsyncThunk("product/getAProduct", async (id, thunkAPI) => {
  try {
    return await productService.getSingleProduct(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
});
export const addToWishlist = createAsyncThunk(
  "product/wishlist",
  async ({ id, config }, thunkAPI) => {
    try {
      return await productService.addToWishlist(id, config);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addReview = createAsyncThunk("product/review",
  async ({ id, values, config }, thunkAPI) => {
    try {
      return await productService.addaReview({ id, values, config })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  })

export const getTotalReviews = createAsyncThunk("product/total-reviews", async (thunkAPI) => {
  try {
    return await productService.getReviews()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})




const productState = {
  product: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}
export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      }).addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      }).addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      }).addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToWishlist = action.payload;
        if (state.isSuccess === true) {
          toast.success("Wishlist Updated")
        }
      }).addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.message = "Please Login Again") {
          toast.error("Please Login Again")
        }
        else {
          if (state.isError === true) {
            toast.error("Something Went Wrong!")
          }
        }
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      }).addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleproduct = action.payload;
        state.message = "Product Fetched Successfully";
      }).addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      }).addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productreview = action.payload;
        toast.success("Review Added")
      }).addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(getTotalReviews.pending, (state) => {
        state.isLoading = true;
      }).addCase(getTotalReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.totalreviews = action.payload;
      }).addCase(getTotalReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  }
})

export default productSlice.reducer