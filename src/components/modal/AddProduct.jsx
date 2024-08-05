import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

import {
  fetchProducts,
  setForm,
  setFormActionValue,
  setFormReset,
  fetchLoading,
} from "../../store/product-slice.js";

const AddProduct = () => {
  const dispatch = useDispatch();

  function handleCancel() {
    dispatch(setFormActionValue("add")); // Reset form action
    dispatch(setFormReset()); // Clear form fields
  }

  const {
    items: products,
    loading,
    error,
    form,
    formAction,
    editId,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("stock", form.stock);
    formData.append("categoryId", form.categoryId);
    formData.append("image", form.image);

    async function submitProduct() {
      try {
        dispatch(fetchLoading(true));
        if (formAction === "add") {
          const response = await axios.post(
            import.meta.env.VITE_BASE_URL +
              `/products?cloud_name=${import.meta.env.VITE_CLOUD_NAME}&api_key=${
                import.meta.env.VITE_API_KEY
              }&api_secret=${import.meta.env.VITE_API_SECRET}`,
            formData,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          const response = await axios.put(
            import.meta.env.VITE_BASE_URL +
              `/products/${editId}?cloud_name=${
                import.meta.env.VITE_CLOUD_NAME
              }&api_key=${import.meta.env.VITE_API_KEY}&api_secret=${
                import.meta.env.VITE_API_SECRET
              }`,
            formData,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
                "Content-Type": "multipart/form-data",
              },
            }
          );
          dispatch(setFormActionValue("add"));
        }
      } catch (err) {
        console.log(err, "< errr");
      } finally {
        dispatch(fetchLoading(false));
        dispatch(fetchProducts());
        dispatch(setFormReset());
        e.target?.reset();
      }
    }
    submitProduct();
  }

  function handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    if (e.target?.files) {
      value = e.target.files[0];
    }
    dispatch(
      setForm({
        name,
        value,
      })
    );
    console.log(form, "< form");
  }

  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my_modal_7" className="btn bg-white shadow-lg w-36  rounded-full">
        <IoIosAddCircleOutline className="w-8 h-8 text-black" />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h4 className="text-center ">Please add your product you want</h4>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <p className="py-4">
            <div className="bg-white py-1 px-5 rounded-xl font-thin shadow-xl border-2">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col xl:grid xl:grid-cols-2 md:grid md:grid-cols-2 gap-4 text-start"
              >
                <div>
                  <label className="block mb-2">
                    <span className="text-gray-700">Name</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="mt-1 border-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>

                  <label className="block mb-2">
                    <span className="text-gray-700">Price</span>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      className="mt-1 block border-2  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>

                  <label className="block mb-2">
                    <span className="text-gray-700">Stock</span>
                    <input
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      className="mt-1 block border-2  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>

                  <label className="block mb-2">
                    <span className="text-gray-700">CategoryId</span>
                    <input
                      type="text"
                      name="categoryId"
                      value={form.categoryId}
                      onChange={handleChange}
                      className="mt-1 block border-2  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>
                </div>

                <div>
                  <label className="block mb-2">
                    <span className="text-gray-700">Description</span>
                    <textarea
                      name="description"
                      onChange={handleChange}
                      value={form.description}
                      className="mt-1 block border-2  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>

                  <label className="block mb-2">
                    <span className="text-gray-700">Image</span>
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      className="mt-1 border-2  block w-full"
                    />
                  </label>
                </div>
                {/* Submit/Update and Cancel Buttons */}
                <div className="col-span-2 flex justify-end  space-x-4">
                  {formAction === "edit" && ( // Conditional rendering
                    <>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-warning">
                        Update
                      </button>
                    </>
                  )}

                  {formAction === "add" && (
                    <button type="submit" className="btn btn-accent">
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </p>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default AddProduct;
