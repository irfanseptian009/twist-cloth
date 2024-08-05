import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";

import LoginForm from "./../auth/LoginForm";
import Seller from "./../pages/Seller";
import NotFound from "./../pages/NotFound";
import RegisterForm from "./../auth/RegisterForm";
import Logout from "./../auth/Logout";
import LoginSeller from "./../auth/LoginSeller";
import User from "./../pages/User";
import ProductDetail from "./../pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/login-seller",
    element: <LoginSeller />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
  },

  {
    path: "/seller",
    element: <Seller />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          return null;
        } catch (err) {
          return redirect("/");
        }
      } else {
        return redirect("/");
      }
    },
  },
  {
    path: "/user",
    element: <User />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          return null;
        } catch (err) {
          return redirect("/");
        }
      } else {
        return redirect("/");
      }
    },
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
