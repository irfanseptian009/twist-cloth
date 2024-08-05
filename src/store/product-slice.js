import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    loading: false,
    error: null,
    form: {
      name: "",
      price: "",
      categoryId: "",
      stock: "",
      description: "",
    },
    formAction: "add",
    editId: "",
  },

  reducers: {
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
    },
    fetch: (state, action) => {
      state.items = action.payload;
    },
    fetchLoading: (state, action) => {
      state.loading = action.payload;
    },
    productsDeleteSuccess: (state, action) => {
      state.items = state.items.filter((product) => product.id !== action.payload);
    },
    setForm: (state, action) => {
      const { name, value } = action.payload;
      state.form[name] = value;
    },
    setFormEdit: (state, action) => {
      state.form = {
        name: action.payload.name,
        price: action.payload.price,
        image: action.payload.image,
        categoryId: action.payload.categoryId,
        stock: action.payload.stock,
        description: action.payload.description,
      };
    },
    setFormReset: (state) => {
      state.form = {
        name: "",
        price: "",
        categoryId: "",
        stock: "",
        description: "",
      };
    },
    setFormActionValue: (state, action) => {
      state.formAction = action.payload;
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    getError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetch,
  fetchLoading,
  productsDeleteSuccess,
  getError,
  setForm,
  setFormReset,
  setFormEdit,
  setFormActionValue,
  setEditId,
} = productSlice.actions;

// Thunk untuk mengambil data produk
export function fetchProducts() {
  return async (dispatch) => {
    try {
      dispatch(fetchLoading(true));
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products?category=7`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      dispatch(fetch(response.data.rows));
    } catch (err) {
      dispatch(getError(err.message));
    } finally {
      dispatch(fetchLoading(false));
    }
  };
}

// Thunk untuk menghapus produk
export function deleteProducts(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchLoading(true));
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      dispatch(productsDeleteSuccess(id));
    } catch (err) {
      dispatch(getError(err.message));
    } finally {
      dispatch(fetchLoading(false));
    }
  };
}

// Thunk untuk mengedit produk
export function editProducts(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchLoading(true));
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "/products/" + id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      dispatch(setFormEdit(response.data));
    } catch (err) {
      dispatch(getError(err));
    } finally {
      dispatch(fetchLoading(false));
      dispatch(setFormActionValue("edit"));
    }
  };
}

export default productSlice.reducer;
