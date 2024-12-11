import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ThirdSection() {
    const authStatus = useSelector(state => state.auth.authStatus)
    
    return  authStatus? (
        <section className="py-12 bg-gradient-to-r from-blue-900 to-blue-400 text-white min-h-screen">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
                Choose Field
            </h2>

            {/* Circle Grid */}
            <div className="flex flex-wrap justify-center gap-6 px-4">
                {/* Circle Item */}
                <Link to="/allprojects/AIML">
                <div className="group w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 flex flex-col items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                    <img src="/src/assets/glow-hand.png" alt="Python" className="w-3/4 h-3/4 object-contain rounded-full" />
                    <p className="mt-2 text-center font-bold text-gray-700 text-sm sm:text-base">AIML</p>
                </div>
                </Link>
                <Link to="/allprojects/Web">
                <div className="group w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 flex flex-col items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                    <img src="/src/assets/glow-hand.png" alt="Python" className="w-3/4 h-3/4 object-contain rounded-full" />
                    <p className="mt-2 text-center font-bold text-gray-700 text-sm sm:text-base">Web Developement</p>
                </div>
                </Link>
                <Link to="/allprojects/ECE">
                <div className="group w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 flex flex-col items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                    <img src="/src/assets/glow-hand.png" alt="Python" className="w-3/4 h-3/4 object-contain rounded-full" />
                    <p className="mt-2 text-center font-bold text-gray-700 text-sm sm:text-base">ECE</p>
                </div>
                </Link>
                <Link>
                <div className="group w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 flex flex-col items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                    <img src="/src/assets/glow-hand.png" alt="Python" className="w-3/4 h-3/4 object-contain rounded-full" />
                    <p className="mt-2 text-center font-bold text-gray-700 text-sm sm:text-base">Python</p>
                </div>
                </Link>
                <Link>
                <div className="group w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 flex flex-col items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                    <img src="/src/assets/glow-hand.png" alt="Python" className="w-3/4 h-3/4 object-contain rounded-full" />
                    <p className="mt-2 text-center font-bold text-gray-700 text-sm sm:text-base">Python</p>
                </div>
                </Link>
                <Link>
                <div className="group w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 flex flex-col items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                    <img src="/src/assets/glow-hand.png" alt="Python" className="w-3/4 h-3/4 object-contain rounded-full" />
                    <p className="mt-2 text-center font-bold text-gray-700 text-sm sm:text-base">Python</p>
                </div>
                </Link>
                <Link>
                <div className="group w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 flex flex-col items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                    <img src="/src/assets/glow-hand.png" alt="Python" className="w-3/4 h-3/4 object-contain rounded-full" />
                    <p className="mt-2 text-center font-bold text-gray-700 text-sm sm:text-base">Python</p>
                </div>
                </Link>
            </div>
        </section>
    ) : 
    (<div className="bg-blue-200 h-screen flex flex-col sm:flex-row items-center justify-between px-10 py-16 rounded-md">
        {/* Coins Image */}
        <div className="w-full sm:w-1/2 h-full flex justify-center animate-bounce">
          <img
            src="\src\assets\Coins.png" // Replace with your image path
            alt="Coins"
            className="w-3/4 sm:w-full h-auto"
          />
        </div>
      
        {/* Text Section */}
        <div className="w-full sm:w-1/2 mt-10 sm:mt-0 text-center sm:text-left">
          <h1 className="text-4xl font-bold text-blue-900 mb-6 animate-fadeIn">
            Earn Points
          </h1>
          <p className="text-blue-800 text-xl animate-slideIn">
            You can earn points by sharing new project ideas on the platform.
            These points can be used to unlock special ideas and exclusive
            content, giving you even more inspiration and opportunities to grow
            your projects.
          </p>
        </div>
      </div>
      
  )
}

export default ThirdSection;
