import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
}

export default function HorizontalScrollContainer({ children }: HorizontalScrollContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [centerIndex, setCenterIndex] = useState<number>(0);

  const determineCenterElement = () => {
    const container = scrollRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    const childrenElements = Array.from(container.children).filter(
      (el) => el.tagName !== 'STYLE' && el.tagName !== 'style'
    ) as HTMLElement[];

    if (childrenElements.length === 0) return;

    let closestIndex = 0;
    let minDistance = Infinity;

    childrenElements.forEach((child, index) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(childCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setCenterIndex(closestIndex);
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      // Allow some tolerance for subpixel rendering
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      determineCenterElement();
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

  const clonedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const isActive = centerIndex === index;
      const element = child as React.ReactElement<any>;
      return React.cloneElement(element, {
        className: `${element.props.className || ''} transition-all duration-500 ease-out origin-center ${
          isActive 
            ? 'scale-[1.04] md:scale-[1.08] z-10 brightness-100 opacity-100 shadow-[0_12px_40px_rgba(210,255,0,0.15)]' 
            : 'scale-[0.92] md:scale-95 opacity-40 brightness-75'
        }`
      });
    }
    return child;
  });

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
        {clonedChildren}
      </div>
    </div>
  );
}
