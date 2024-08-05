import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./product-slice";
import publicProductSlice from "./public-product-slice";
import cartSlice from "./cart-slice";
export default configureStore({
  reducer: {
    product: productReducer,
    publicProduct: publicProductSlice,
    cart: cartSlice,
  },
});
