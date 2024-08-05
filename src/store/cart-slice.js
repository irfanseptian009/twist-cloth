import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchProducts } from "./public-product-slice";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    fetchSuccess: (state, action) => {
      state.items = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchSuccess } = cartSlice.actions;

export function fetchCarts() {
  return async (dispatch) => {
    try {
      dispatch(fetchProducts());

      const response = await axios.get(import.meta.env.VITE_BASE_URL + "/carts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      dispatch(fetchSuccess(response.data));
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Cart data fetched");
    }
  };
}

export function deleteCart(id) {
  return async (dispatch) => {
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL + "/carts/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      console.log("Cart deleted", id);
      dispatch(fetchCarts());
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Cart deleted finished", id);
    }
  };
}

export default cartSlice.reducer;
