import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react'

const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={`fixed bottom-4 left-4 px-6 py-3 text-white rounded shadow-md transform transition-all duration-500 flex items-center ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'
        } ${bgColor}`}
    >
      {/* Icon Section */}
      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center mr-3 ${type === 'success' ? 'bg-green-700' : 'bg-red-700'
          }`}
      >
        {/* Icon */}
        {type === 'success' ? <span><Icon icon="icon-park-solid:correct" width="16" height="16" style={{ color: '#f4efef' }} /></span> : <span><Icon icon="icomoon-free:cross" width="16" height="16" style={{ color: '#f4efef' }} /></span>}
      </div>
      {/* Message Section */}
      <span>{message}</span>
    </div>
  );
};

export default Notification;
