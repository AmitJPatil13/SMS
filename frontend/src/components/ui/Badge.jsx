import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'sm',
  className = '',
  dot = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-semibold rounded-full transition-all duration-200';
  
  const variants = {
    default: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 dark:from-gray-700 dark:to-gray-800 dark:text-gray-100',
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm shadow-blue-500/50',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm shadow-green-500/50',
    warning: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-sm shadow-yellow-500/50',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-sm shadow-red-500/50',
    info: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-sm shadow-cyan-500/50',
    purple: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm shadow-purple-500/50',
    indigo: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm shadow-indigo-500/50'
  };
  
  const sizes = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };
  
  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>}
      {children}
    </span>
  );
};

export default Badge;
