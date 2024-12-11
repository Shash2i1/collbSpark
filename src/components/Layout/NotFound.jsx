import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
      {/* Animated Icon */}
      <div className="relative w-40 h-40 mb-6">
        <div className="absolute inset-0 animate-spin-slow border-4 border-dashed rounded-full border-white opacity-30"></div>
        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold text-indigo-600">404</span>
        </div>
      </div>

      {/* Text Content */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">
        Page Not Found
      </h1>
      <p className="text-center text-lg md:text-xl mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <a
        href="/"
        className="bg-white text-indigo-600 font-medium py-3 px-6 rounded-full shadow-md hover:bg-indigo-100 transition duration-300"
      >
        Back to Home
      </a>
    </div>
  );
};

export default NotFound;
