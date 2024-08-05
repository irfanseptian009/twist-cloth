import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaCartArrowDown } from "react-icons/fa";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { fetchProducts } from "../../store/product-slice.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { fetchCarts } from "../../store/cart-slice";
import axios from "axios";

function BestSellerCard({ product }) {
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  async function handleAddToCart(id) {
    console.log("Add to cart clicked", id);
    console.log(carts, "<< carts semua");
    try {
      const cartFoundIndex = carts.findIndex((el) => {
        return el.productId == id;
      });
      console.log(cartFoundIndex, "< cart found index");
      const cartFound = carts[cartFoundIndex];
      if (cartFoundIndex === -1) {
        const response = await axios.post(
          import.meta.env.VITE_BASE_URL + "/carts/" + id,
          {
            quantity: 1,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        console.log(response.data, "<== response.data post");
      } else {
        const response = await axios.patch(
          import.meta.env.VITE_BASE_URL + "/carts/" + cartFound.id,

          {
            quantity: cartFound.quantity + 1,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        console.log(response.data, "<== response.data patch");
      }
    } catch (err) {
      if (err.response.data.message === "Unauthorized") {
        Swal.fire({
          title: "Error!",
          text: "Please login first to add product to cart!",
          icon: "error",
          confirmButtonText: "OK",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Sth went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } finally {
      Swal.fire({
        title: "Success!",
        text: "Product added to cart!",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  }

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="max-w-[400px] mb-7 mx-auto border-none shadow-md rounded-xl bg-white cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={product.imgUrl}
        alt={product.name}
        className="h-64 2xl:h-auto w-full object-cover rounded-xl "
      />

      <div className="text-center p-4">
        <h3 className="font-bold mb-1">Running Shoes</h3> {/* Or appropriate category */}
        <p className="text-sm text-gray-500 mb-2">{product.name}</p>
        <h4 className="font-bold text-black mb-3">Rp{product.price}</h4>
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className="text-yellow-400" />
          ))}
        </div>
        <button
          className="bg-gray-500 hover:bg-amber-800 text-white font-normal w-full py-2 rounded-md flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product.id);
          }}
        >
          <FaCartArrowDown className="mr-2" />
          Add To Card
        </button>
      </div>
    </div>
  );
}

export default BestSellerCard;
