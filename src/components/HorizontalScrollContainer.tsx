import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
}

export default function HorizontalScrollContainer({ children }: HorizontalScrollContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      // Allow some tolerance for subpixel rendering
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      
      // Also check on window resize
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [children]);

  // Clean trigger when children change/mount to recalculate arrows
  useEffect(() => {
    const timer = setTimeout(() => {
      checkScroll();
    }, 100);
    return () => clearTimeout(timer);
  }, [children]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75; // Scroll 75% of container width
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative group/carousel w-full">
      {/* Left scroll button */}
      {showLeftArrow && (
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-accent text-[#0a0a0c] shadow-[0_8px_24px_rgba(210,255,0,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-[#d2ff00]/30"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
      )}

      {/* Right scroll button */}
      {showRightArrow && (
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-accent text-[#0a0a0c] shadow-[0_8px_24px_rgba(210,255,0,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-[#d2ff00]/30"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 pt-2 px-1 scrollbar-hide"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none !important;
          }
        `}} />
        {children}
      </div>
    </div>
  );
}
