import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // in milliseconds
  duration?: number; // in seconds
  ease?: string | number[];
  splitType?: 'chars' | 'words' | 'lines';
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | string;
  tag?: keyof React.JSX.IntrinsicElements;
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

const mapEase = (ease: any) => {
  if (typeof ease === 'string') {
    const lowerEase = ease.toLowerCase();
    if (lowerEase.includes('power4.out')) return [0.16, 1, 0.3, 1];
    if (lowerEase.includes('power3.out')) return [0.175, 0.885, 0.32, 1.275]; // slightly snappy
    if (lowerEase.includes('power2.out')) return [0.25, 1, 0.5, 1];
    if (lowerEase.includes('power1.out')) return [0.39, 0.575, 0.565, 1];
    if (lowerEase.includes('circ.out')) return [0.075, 0.82, 0.165, 1];
    if (lowerEase.includes('back.out')) return [0.175, 0.885, 0.32, 1.275];
    if (lowerEase.includes('out')) return [0.16, 1, 0.3, 1];
    if (lowerEase.includes('inout')) return "easeInOut";
    if (lowerEase.includes('in')) return "easeIn";
  }
  return ease || [0.16, 1, 0.3, 1];
};

export default function SplitText({
  text,
  className = '',
  delay = 50, // in ms
  duration = 1.25, // in s
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}: SplitTextProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  if (!text || !fontsLoaded) {
    return <span className={className}>{text}</span>;
  }

  const motionEase = mapEase(ease);
  const staggerDelaySeconds = delay / 1000;

  // Split logic
  const renderContent = () => {
    if (splitType === 'words') {
      const words = text.split(' ');
      return words.map((word, index) => {
        const isLast = index === words.length - 1;
        return (
          <span key={index} className="inline-block whitespace-nowrap">
            <motion.span
              initial={from}
              whileInView={to}
              viewport={{ once: true, margin: rootMargin, amount: threshold }}
              transition={{
                duration,
                ease: motionEase,
                delay: index * staggerDelaySeconds,
              }}
              onAnimationComplete={() => {
                if (isLast && onLetterAnimationComplete) {
                  onLetterAnimationComplete();
                }
              }}
              className="inline-block"
              style={{ willChange: 'transform, opacity' }}
            >
              {word}
            </motion.span>
            {/* Space after word */}
            {index < words.length - 1 && '\u00A0'}
          </span>
        );
      });
    }

    // Default to 'chars' (or fallback for lines as simple words layout)
    const words = text.split(' ');
    let globalCharIndex = 0;
    
    // Count total characters to find the last one
    const totalChars = text.replace(/\s/g, '').length;

    return words.map((word, wordIndex) => {
      const chars = word.split('');
      
      return (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {chars.map((char, charIndex) => {
            const currentGlobalIndex = globalCharIndex++;
            const isLast = currentGlobalIndex === totalChars - 1;
            
            return (
              <motion.span
                key={charIndex}
                initial={from}
                whileInView={to}
                viewport={{ once: true, margin: rootMargin, amount: threshold }}
                transition={{
                  duration,
                  ease: motionEase,
                  delay: currentGlobalIndex * staggerDelaySeconds,
                }}
                onAnimationComplete={() => {
                  if (isLast && onLetterAnimationComplete) {
                    onLetterAnimationComplete();
                  }
                }}
                className="inline-block"
                style={{ willChange: 'transform, opacity' }}
              >
                {char}
              </motion.span>
            );
          })}
          {/* Add non-breaking space between words */}
          {wordIndex < words.length - 1 && '\u00A0'}
        </span>
      );
    });
  };

  const Component = tag as any;

  return (
    <Component
      className={`split-parent ${className}`}
      style={{
        textAlign,
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      }}
    >
      {renderContent()}
    </Component>
  );
}
