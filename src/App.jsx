import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "../src/router/router";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </Provider>
      ,
    </>
  );
}

export default App;
