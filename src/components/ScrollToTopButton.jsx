import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button only when the page is scrollable
  useEffect(() => {
    const handleScroll = () => {
      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight;
      setIsVisible(window.scrollY > 100 && isScrollable);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <Icon icon="line-md:arrow-up-circle-twotone" width="24" height="24"  style={{color: '#fff'}} />
      </button>
    )
  );
}

export default ScrollToTopButton;
