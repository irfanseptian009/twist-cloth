import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddProduct from "../components/modal/AddProduct";
import { fetchProducts, fetchLoading } from "../store/product-slice.js";
import NavBarSeller from "../components/seller/NavBarSeller";
import ProductsTable from "./../components/seller/ProductsTable";

export default function Seller() {
  return (
    <>
      <NavBarSeller />
      <div className="container mx-auto p-4 mt-1 ">
        <div className=" flex flex-col ">
          <div className="bg-white p-4 rounded-lg shadow-xl text-gray-500 mb-8 text-right ">
            <h2 className="text-2xl font-bold mb-4 text-center">SELLER PAGE</h2>
            Add Product here
            <AddProduct />
          </div>
        </div>
        <div className="h-auto 2xl:h-auto text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer p-4">
          <h3 className="text-xl font-semibold mb-4">Your Products</h3>
          <ProductsTable />
        </div>
      </div>
    </>
  );
}
