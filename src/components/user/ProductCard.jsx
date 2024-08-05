import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { Card, CardContent, Typography } from "@mui/material";
import { fetchProducts } from "../../store/product-slice.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { fetchCarts } from "../../store/cart-slice";
import axios from "axios";
import { FaCartArrowDown } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";

function ProductCard({ product }) {
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
    <div className=" mx-7  xl:mx-0 lg:-mx-1 rounded-t-3xl   text-black shadow-2xl rounded-xl transition-transform duration-300 hover:scale-105 ">
      <img
        onClick={handleCardClick}
        src={product.imgUrl}
        alt={product.name}
        className="h-64 2xl:h-auto rounded-t-3xl w-full object-cover cursor-pointer -mb-5"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="flex flex-col justify-center  items-center"
        ></Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="flex bg flex-row  items-center h-7 justify-between "
        >
          {" "}
          <h1 className="font-semibold text-xl w-auto truncate">{product.name}</h1>
          <h2 className="font-mono">stock: {product.stock}</h2>
        </Typography>{" "}
        <h2 className="font-medium text-md mb-2">Rp.{product.price}</h2>
        <div className="flex gap-1 justify-between">
          <button
            className="bg-gray-500 text-white p-2 font-normal active:bg-amber-800 rounded-md flex -mb-2"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product.id);
            }}
          >
            <FaCartArrowDown className="h-5 w-5" /> Add to cart
          </button>
          <div className="flex gap-1 items-center">
            <h2>5.0</h2>
            <FaStar className="text-yellow-300" />
          </div>
        </div>
      </CardContent>
    </div>
  );
}

export default ProductCard;
