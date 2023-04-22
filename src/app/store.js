import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice"
import ProductReducer from "../features/products/productSlice"
import contactReducer from "../features/contact/contactSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: ProductReducer,
    contact: contactReducer,
  },
});