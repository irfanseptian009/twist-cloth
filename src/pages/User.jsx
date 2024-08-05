import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchSuccess } from "../store/public-product-slice.js";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { fetchCarts } from "../store/cart-slice";
import Navbar from "./../components/user/NavBar";
import ProductCard from "./../components/user/ProductCard";
import { FaSortAmountUp, FaSortAmountDown, FaCalendarAlt } from "react-icons/fa";
import Carousel from "./../components/user/Carousel";
import Shop from "./../components/user/Shop";
import Collections from "./../components/user/Colection";
import Home from "./../components/user/Home";
import ReviewCard from "./ReviewCard";
import Footer from "./../components/user/Footer";
import toast, { Toaster } from "react-hot-toast";

export default function User() {
  const navigate = useNavigate();
  const products = useSelector((state) => state.publicProduct.items);
  const carts = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCarts());
  }, []);

  function handleChangeSorting(e) {
    const value = e.target.value;
    const name = e.target.name;
    dispatch(fetchProducts({ name, value }));
  }

  return (
    <div className="bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div id="home">
        <Home />
      </div>
      <div className="container mx-auto mt-8 p-4">
        {/* Product Grid */}
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
        <div className="flex -mb-5 justify-end">
          {/* Sort by Price */}
          <div className="relative flex flex-row p-4">
            {" "}
            {/* Tambahkan relative untuk positioning ikon */}
            <label htmlFor="sort-by-price" className=" text-gray-700 ">
              <FaSortAmountUp className="w-5 h-6 " />
            </label>
            <select
              id="sort-by-price"
              name="sortByPrice"
              onChange={handleChangeSorting}
              className=" -mt-1 block w-full ml-1 rounded-lg text-center bg-white border-gray-300 shadow-md focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50   
   appearance"
            >
              <option value="">None</option>
              <option value="highest">Highest</option>
              <option value="lowest">Lowest</option>
            </select>
          </div>

          {/* Sort by Date */}
          <div className="relative flex flex-row p-4">
            {" "}
            {/* Tambahkan relative untuk positioning ikon */}
            <label htmlFor="sort-by-date" className="block text-gray-700">
              <FaCalendarAlt className="w-5 h-6" />
            </label>
            <select
              id="sort-by-date"
              name="sortByDate"
              onChange={handleChangeSorting}
              className="-mt-1 block w-full ml-2 rounded-lg text-center bg-white border-gray-300 shadow-md focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50   
   appearance"
            >
              <option value="">None</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 font-serif gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((product, idx) => <ProductCard key={idx} product={product} />)}
        </div>{" "}
        <div id="bestseller">
          <Shop />
        </div>
        <div id="collections">
          <Collections />
        </div>
        <div id="review">
          <ReviewCard />
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
}
