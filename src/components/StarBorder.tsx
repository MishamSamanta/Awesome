import React from 'react';
import './StarBorder.css';

interface StarBorderProps extends React.AllHTMLAttributes<any> {
  as?: any;
  color?: string;
  speed?: string;
  thickness?: number;
  borderRadius?: string;
  innerClassName?: string;
  children?: React.ReactNode;
}

export default function StarBorder({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  borderRadius = '20px',
  innerClassName = '',
  children,
  style,
  ...rest
}: StarBorderProps) {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px`,
        borderRadius,
        ...style
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div 
        className={`inner-content ${innerClassName}`}
        style={{ borderRadius: `calc(${borderRadius} - ${thickness}px)` }}
      >
        {children}
      </div>
    </Component>
  );
}

