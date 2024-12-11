/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        righteous: ['Righteous', 'sans-serif'], // Add the font here
      },
      keyframes: {
        floatAndTransform: {
          "0%": {
            transform: "translateY(0) rotate(0deg)",
            borderRadius: "0%",
            opacity: "1",
          },
          "50%": {
            borderRadius: "20%",
          },
          "100%": {
            transform: "translateY(-120vh) rotate(360deg)",
            borderRadius: "50%",
            opacity: "0",
          },
        },
        fadeInOut: {
          "0%, 100%": { transform: "translateY(20px)", opacity: "0" },
          "50%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(50%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        floatAndTransform: "floatAndTransform 10s linear infinite",
        'spin-slow': 'spin 8s linear infinite',
        fadeInOut: "fadeInOut 3s ease-in-out infinite",
        bounce: "bounce 4s infinite", // Added bounce animation
        fadeIn: "fadeIn 2s ease-in-out", // Added fadeIn animation
        slideIn: "slideIn 2s ease-out", // Added slideIn animation
      },
    },
  },
  plugins: [],
};
