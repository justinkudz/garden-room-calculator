import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedGradientText from './AnimatedGradientText';

export default function ImageGallery() {
  // List of garden room images - filter out screenshots
  const images = [
    '/images/garden room 1 - Copy (2).jpeg',
    '/images/garden room 2.jpg',
    '/images/garden room 3 - Copy (2).webp',
    '/images/gr.jpg',
    '/images/grr.webp',
    '/images/3.jpg',
    '/images/4 - Copy (3).jpg',
  ].filter(img => !img.includes('Screenshot')); // Filter out screenshot images

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (isPaused || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Subtitle - Separate from slideshow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <p className="text-xl md:text-2xl lg:text-3xl font-bold px-4">
          <AnimatedGradientText>Fill out the form to recieve a limited time only discount</AnimatedGradientText>
        </p>
      </motion.div>

      {/* Slideshow in a box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-2xl border-2 border-purple-600/30 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 px-4 md:px-0"
        style={{ boxShadow: '0 20px 60px rgba(107, 92, 231, 0.3)' }}
      >
        <div 
          className="relative w-full aspect-video bg-gray-800"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Garden room example ${index + 1}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentIndex ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                // Hide broken images
                e.target.style.display = 'none';
              }}
            />
          ))}
          
          {/* Navigation Arrows - Only show on desktop */}
          {images.length > 1 && !isMobile && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/90 hover:bg-gray-900 active:opacity-80 text-white p-2 rounded-full shadow-lg transition-opacity border border-gray-700 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/90 hover:bg-gray-900 active:opacity-80 text-white p-2 rounded-full shadow-lg transition-opacity border border-gray-700 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          {/* Dots Indicator - Only show on desktop */}
          {images.length > 1 && !isMobile && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-purple-400 w-8'
                      : 'bg-gray-600 hover:bg-gray-500 w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
