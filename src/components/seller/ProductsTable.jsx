import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MdDeleteForever, MdOutlineEditCalendar } from "react-icons/md";
import EditProduct from "../modal/EditProduct";
import {
  deleteProducts,
  editProducts,
  fetchLoading,
  getError,
  setEditId,
  setFormActionValue,
  setFormEdit,
  fetchProducts,
} from "../../store/product-slice.js";

export default function ProductsTable({ product }) {
  const dispatch = useDispatch();

  const { items: products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  function handleDelete(id) {
    dispatch(deleteProducts(id));
  }
  function handleEdit(id) {
    dispatch(editProducts(id));
    dispatch(setEditId(id));
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="bg-neutral-200 rounded-xl">
              <th>Image</th>
              <th>Name</th>
              <th>Category Id</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 ">
                          <img src={product.imgUrl} alt={product.name} />
                        </div>
                      </div>
                    </td>

                    <td className="font-bold w-60 h-4 text-start">{product.name}</td>
                    <td className="w-24 h-4 text-start">{product.categoryId}</td>
                    <td className="w-24 h-4 text-start">{product.stock}</td>
                    <td className="w-32 h-4 text-start">{product.price}</td>
                    <td className="w-auto  h-4 text-start ">{product.description}</td>
                    <td>
                      <div className=" flex gap-2 ">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-600 border border-transparent text-sm  rounded-full  text-white p-4 font-medium active:bg-amber-800"
                        >
                          <MdDeleteForever className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="bg-slate-800 border border-transparent text-sm  rounded-full  text-white font-medium active:bg-amber-800"
                        >
                          <EditProduct />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
