import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const publicProductSlice = createSlice({
  name: "public-product",
  initialState: {
    items: [],
    item: {},
  },
  reducers: {
    fetchSuccess: (state, action) => {
      state.items = [...action.payload];
    },
    fetchSuccessDetail: (state, action) => {
      state.item = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchSuccess, fetchSuccessDetail } = publicProductSlice.actions;

export const fetchProducts =
  (obj = {}) =>
  async (dispatch) => {
    // dispatch(usersLoading());
    const { name, value } = obj;
    // const name = obj.name
    let url = "/pub/products?category=7";
    let isSortUsed = false;
    if (name === "sortByPrice") {
      url += "&sort[price]=" + value;
      isSortUsed = true;
    }
    if (name === "sortByDate") {
      url += "&sort[date]=" + value;
      isSortUsed = true;
    }

    if (isSortUsed === false) {
      url = "/pub/products?category=7&sort[price]=highest";
    }

    const response = await axios.get(import.meta.env.VITE_BASE_URL + url);
    const products = response.data?.rows;
    dispatch(fetchSuccess(products));
  };

export const fetchProductDetail = (id) => async (dispatch) => {
  const response = await axios.get(import.meta.env.VITE_BASE_URL + "/pub/products/" + id);
  const product = response.data;
  console.log(product, "<== fetchProductDetail");
  dispatch(fetchSuccessDetail(product));
};
export default publicProductSlice.reducer;
