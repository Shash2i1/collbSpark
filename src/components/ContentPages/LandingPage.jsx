import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LandingPage() {
    const userData = useSelector(state => state.auth.userData);
    const authStatus = useSelector(state => state.auth.authStatus);

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const words = ["Explore", "Share", "Inspire"];
    const delay = 3000;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, delay);
        return () => clearInterval(interval);
    }, [delay]);

    return !authStatus ? (
        <div className="relative w-screen h-screen overflow-x-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://ideogram.ai/assets/image/lossless/response/epSkAqSPQV2Xqs7TfCvn3A')",
                }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center px-4">
                <h1 className="text-3xl sm:text-4xl md:text-6xl text-white font-bold text-center mb-4">
                    <span
                        className="relative inline-block text-[#CD0691] animate-fadeInOut"
                        style={{
                            minWidth: "6ch", // Fixed width based on longest word
                            display: "inline-block",
                            textAlign: "center",
                        }}
                    >
                        {words[currentWordIndex]}
                    </span>{" "}
                    with innovative ideas
                </h1>
                <p className="text-white text-sm sm:text-lg md:text-xl italic text-center max-w-xl">
                    "Empowering users to effortlessly explore, share, and inspire with
                    innovative project ideas."
                </p>
                <Link to='/auth/login'>
                    <button className="mt-6 px-4 py-2 sm:px-6 sm:py-3 bg-purple-500 text-sm sm:text-base text-white rounded-lg hover:bg-purple-700 transition">
                        Explore now
                    </button>
                </Link>
            </div>
        </div>
    ) : (
        // else (when authenticated)
        <div className="relative w-screen h-screen overflow-x-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://ideogram.ai/assets/image/lossless/response/epSkAqSPQV2Xqs7TfCvn3A')",
                }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center px-4">
                <h1 className="text-3xl sm:text-4xl md:text-6xl text-white font-bold text-center mb-4">
                    Welcome{" "}
                    <span className="relative inline-block text-[#CD0691]">
                        {userData.userData.name}
                    </span>
                </h1>
                <p className="text-white text-sm sm:text-lg md:text-xl italic text-center max-w-xl">
                    "Empowering users to effortlessly explore, share, and inspire with
                    innovative project ideas."
                </p>
            </div>
        </div>
    );
}

export default LandingPage;
