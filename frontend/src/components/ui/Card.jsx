import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6',
  gradient = false,
  glass = false,
  ...props 
}) => {
  const baseClasses = glass 
    ? 'glass-card backdrop-blur-xl border border-white/20 dark:border-white/10' 
    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700';
  
  const shadowClasses = 'shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50';
  
  const hoverClasses = hover 
    ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-300/60 dark:hover:shadow-gray-900/80 transition-all duration-300 ease-out cursor-pointer' 
    : 'transition-all duration-200';
  
  const gradientOverlay = gradient && (
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-xl pointer-events-none" />
  );
  
  return (
    <div 
      className={`relative rounded-xl overflow-hidden ${baseClasses} ${shadowClasses} ${hoverClasses} ${padding} ${className}`}
      {...props}
    >
      {gradientOverlay}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;
