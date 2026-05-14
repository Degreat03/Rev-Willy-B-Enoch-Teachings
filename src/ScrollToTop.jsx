import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorched down 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the window to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-[10px]  rounded-full bg-[#a52a2a] text-white shadow-2xl hover:bg-[#db3838] 
          transition-all duration-300 animate-bounce w-[3rem] h-[3rem]"
          aria-label="Scroll to top"
        >
            <i className="bi bi-arrow-up text-[20px] font-[700]"></i>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;