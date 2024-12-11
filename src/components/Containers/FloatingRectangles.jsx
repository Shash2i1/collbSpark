import React, { useEffect } from "react";

const FloatingRectangles = ({ children , className }) => {
  useEffect(() => {
    const createRectangles = () => {
      const container = document.getElementById("rectangles-layer"); // Separate container for rectangles
      const numRectangles = 15; // Number of rectangles to generate
      const screenWidth = window.innerWidth; // Get the current screen width

      for (let i = 0; i < numRectangles; i++) {
        const rectangle = document.createElement("div");

        // Generate distinct sizes for rectangles (small, medium, large)
        const sizeCategory = Math.random();
        let size;
        if (screenWidth <= 640) {
          if (sizeCategory < 0.3) {
            size = Math.random() * 10 + 10; // Small size (10px to 20px)
          } else if (sizeCategory < 0.7) {
            size = Math.random() * 20 + 30; // Medium size (30px to 50px)
          } else {
            size = Math.random() * 30 + 60; // Large size (60px to 90px)
          }
        } else if (screenWidth <= 1024) {
          if (sizeCategory < 0.3) {
            size = Math.random() * 15 + 15; // Small size (15px to 30px)
          } else if (sizeCategory < 0.7) {
            size = Math.random() * 25 + 40; // Medium size (40px to 65px)
          } else {
            size = Math.random() * 35 + 80; // Large size (80px to 115px)
          }
        } else {
          if (sizeCategory < 0.3) {
            size = Math.random() * 20 + 20; // Small size (20px to 40px)
          } else if (sizeCategory < 0.7) {
            size = Math.random() * 30 + 50; // Medium size (50px to 80px)
          } else {
            size = Math.random() * 40 + 90; // Large size (90px to 130px)
          }
        }

        rectangle.className =
          "absolute bottom-[-20%] bg-white/20 animate-floatAndTransform";
        rectangle.style.width = `${size}px`;
        rectangle.style.height = `${size}px`;
        rectangle.style.left = `${Math.random() * 100}%`; // Random horizontal position
        rectangle.style.animationDelay = `${Math.random() * 5}s`; // Random delay for smooth effect

        container.appendChild(rectangle);
      }
    };

    createRectangles();

    // Clean up the rectangles when the component is unmounted
    return () => {
      const container = document.getElementById("rectangles-layer");
      if (container) {
        container.innerHTML = ""; // Clear the container
      }
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
      {/* Floating rectangles layer */}
      <div id="rectangles-layer" className="absolute inset-0 pointer-events-none"></div>

      {/* Child content layer */}
      <div className={`relative z-10 flex justify-center items-center h-full ${className}`}>
        
        {children}
      </div>
    </div>
  );
};

export default FloatingRectangles;
