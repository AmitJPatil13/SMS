import React from 'react';

const NotificationBadge = ({ 
  count, 
  max = 99,
  className = '',
  ...props 
}) => {
  if (!count || count === 0) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <span
      className={`
        absolute -top-2 -right-2 inline-flex items-center justify-center 
        px-2 py-1 text-xs font-bold leading-none text-white 
        bg-red-500 rounded-full min-w-[20px] h-5
        ${className}
      `}
      {...props}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;
