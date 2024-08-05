import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../store/product-slice.js";
import { Box, Typography, CircularProgress, Rating } from "@mui/material";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import bg from "../assets/5563808.jpg";
import Navbar from "./../components/user/NavBar";
import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const product = items.find((item) => item.id === parseInt(productId, 10));

  const handleBackClick = () => {
    navigate(-1); // Navigasi kembali satu langkah
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  if (!product) {
    return <Typography variant="h6">Produk tidak ditemukan</Typography>;
  }

  return (
    <>
      <Navbar />
      <Box
        className="bg-gradient-to-r  min-h-screen flex flex-col  justify-center p-8"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
        }}
      >
        {" "}
        <button
          onClick={handleBackClick}
          className=" text-gray-600  font-bold -mt-5 mb-2  flex text-start justify-start  rounded"
        >
          <IoChevronBackCircleOutline className="h-6 w-6" />
          Back to shop
        </button>{" "}
        <div className="bg-gray-100 border-l border-gray-300 rounded-2xl shadow-2xl p-10 flex flex-col md:flex-row relative ">
          {/* Top Icons */}{" "}
          <div className="absolute top-7 xl:top-10 right-10 flex space-x-10">
            {" "}
            <FaHeart className="text-gray-400 hover:text-red-500 text-2xl cursor-pointer" />
            <FaShareAlt className="text-gray-400 hover:text-blue-500 text-2xl cursor-pointer" />
          </div>
          {/* Image Section */}
          <Box className="md:w-1/2 flex flex-col items-center mb-8 md:mb-0">
            <div className="relative">
              <img
                src={product.imgUrl}
                alt={product.name}
                className="w-96 h-96 object-contain rounded-lg"
              />
              <FiRefreshCcw className="absolute bottom-4 right-4 text-3xl text-gray-400 hover:text-gray-600 cursor-pointer" />{" "}
              {/* Rotate icon */}
            </div>
            {/* Image thumbnails */}
            <div className="flex  mt-4 justify-center gap-2">
              {[product.imgUrl, product.imgUrl, product.imgUrl, product.imgUrl].map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md border border-gray-200"
                  />
                )
              )}
            </div>
          </Box>
          {/* Product Details */}
          <Box className="md:w-1/2 md:pl-8 -ml-5 -mr-5 flex flex-col justify-between ">
            {/* Product Title, Rating, and Description */}
            <div>
              <Typography variant="h4" className="text-2xl w-64 font-bold mb-2">
                {product.name}
              </Typography>
              <Rating name="read-only" value={5} readOnly size="small" />
              <Typography variant="body1" className="mt-2 text-gray-600">
                {product.description}
              </Typography>
            </div>

            {/* Size and Color Options */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <Typography variant="body1" className="font-semibold mb-2">
                  Size:
                </Typography>
                <div className="flex space-x-2">
                  {[7, 8, 9, 10].map((size) => (
                    <button
                      key={size}
                      className="border border-gray-300 rounded-md px-3 py-1 text-gray-700"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Typography variant="body1" className="font-semibold mb-2">
                  Color:
                </Typography>
                <div className="flex space-x-2">
                  {["blue", "yellow", "red", "orange", "black"].map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full bg-${color}-600 bg-${color}-300 bg-${color}-500 bg-${color}-400   focus:outline-none`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price and Buy Button */}
            <div className="flex items-center gap-8 justify-between">
              <div className="flex flex-col">
                <Typography variant="h5" className="text-2xl font-bold">
                  Rp.{product.price.toLocaleString()}
                </Typography>
                <Typography variant="body1" className="text-gray-500 line-through">
                  Rp.{(product.price + 150).toLocaleString()} {/* Dummy discount */}
                </Typography>
              </div>
              <button
                variant="contained"
                className="bg-black hover:bg-gray-800 text-white rounded-md px-6 py-2"
                style={{ width: "150px" }}
              >
                Buy Now
              </button>
            </div>
          </Box>
        </div>
      </Box>
    </>
  );
}

export default ProductDetail;
