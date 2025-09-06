import React from 'react';

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType = 'positive',
  color = 'blue',
  className = '' 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    indigo: 'bg-indigo-500'
  };

  const changeColorClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className={`bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
              <span className="text-2xl">{icon}</span>
            </div>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-500 truncate">
              {title}
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {value}
            </p>
          </div>
        </div>
        {change && (
          <div className="mt-4">
            <div className="flex items-center">
              <span className={`text-sm font-medium ${changeColorClasses[changeType]}`}>
                {change}
              </span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
