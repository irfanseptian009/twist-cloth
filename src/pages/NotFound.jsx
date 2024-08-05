import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl text-gray-700 mb-6 text-center">Page Not Found</h2>

        <p className="text-gray-600 mb-8"></p>
        <Link
          to="/"
          className="bg-blue-900 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-sm mb-3 "
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
