import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RecentProjects } from './index';

function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const authStatus = useSelector((state) => state.auth.authStatus);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    const section = document.querySelector('#collab-spark-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return authStatus ? (
    <RecentProjects />
  ) : (
    <div
      id="collab-spark-section"
      className={`w-full min-h-screen flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-900 to-blue-400 text-white px-6 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } transition-all duration-1000 ease-in-out`}
    >
      {/* Left Side: Image */}
      <div className="hidden md:flex md:w-1/2 justify-center md:justify-start">
        <img
          src="\src\assets\man-searching.png" // Replace with your actual image path
          alt="Spark Icon"
          className="w-full h-auto max-w-lg"
        />
      </div>

      {/* Right Side: Text */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:items-start space-y-4 md:space-y-6 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">
          Why CollabSpark
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-center md:text-left">
          Users need this project because it makes it easy to find project ideas
          when they are stuck or looking for inspiration, and it provides a
          platform to share their own ideas with others, helping to create a
          community of creativity and collaboration.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
