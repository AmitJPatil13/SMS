import React from 'react';
import Card from './Card';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  color = 'blue',
  className = '' 
}) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      icon: 'bg-blue-500/10 text-blue-600',
      text: 'text-blue-600',
    },
    green: {
      bg: 'from-green-500 to-emerald-600',
      icon: 'bg-green-500/10 text-green-600',
      text: 'text-green-600',
    },
    purple: {
      bg: 'from-purple-500 to-pink-600',
      icon: 'bg-purple-500/10 text-purple-600',
      text: 'text-purple-600',
    },
    orange: {
      bg: 'from-orange-500 to-red-500',
      icon: 'bg-orange-500/10 text-orange-600',
      text: 'text-orange-600',
    },
    indigo: {
      bg: 'from-indigo-500 to-purple-600',
      icon: 'bg-indigo-500/10 text-indigo-600',
      text: 'text-indigo-600',
    },
    pink: {
      bg: 'from-pink-500 to-rose-600',
      icon: 'bg-pink-500/10 text-pink-600',
      text: 'text-pink-600',
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <Card className={`group ${className}`} hover gradient>
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className={`p-3 rounded-xl ${colors.icon} group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-2xl">{icon}</span>
        </div>
        
        {/* Trend */}
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↗' : '↘'}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className={`text-3xl font-bold mt-1 bg-gradient-to-r ${colors.bg} bg-clip-text text-transparent`}>
          {value}
        </p>
      </div>

      {/* Progress Bar (optional) */}
      <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${colors.bg} transition-all duration-500 group-hover:w-full`} style={{ width: '70%' }}></div>
      </div>
    </Card>
  );
};

export default StatCard;
