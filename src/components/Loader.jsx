import React, { useEffect, useState } from 'react';

const Loading = ({ isLoading, onComplete,text='loading' }) => {
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    let timer;
    if (!isLoading) {
      // Add a delay for smooth exit animation
      timer = setTimeout(() => {
        setShow(false);
        if (onComplete) onComplete();
      }, 500); // Animation duration
    } else {
      setShow(true);
    }
    return () => clearTimeout(timer);
  }, [isLoading, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="loader relative w-16 h-16">
        <div className="absolute w-full h-full border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute w-10 h-10 border-t-4 border-green-500 rounded-full animate-spin-slow"></div>
        <span className="absolute text-white text-sm font-medium mt-20">{text}...</span>
      </div>
    </div>
  );
};

export default Loading;
