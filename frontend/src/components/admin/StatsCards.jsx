import React from 'react';
import StatsCard from '../ui/StatsCard';

const StatsCards = () => {
  const stats = [
    {
      name: 'Total Students',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: '👥',
      color: 'blue'
    },
    {
      name: 'Total Teachers',
      value: '45',
      change: '+3%',
      changeType: 'positive',
      icon: '👨‍🏫',
      color: 'green'
    },
    {
      name: 'Active Classes',
      value: '28',
      change: '+2',
      changeType: 'positive',
      icon: '📚',
      color: 'purple'
    },
    {
      name: 'Attendance Today',
      value: '94%',
      change: '+5%',
      changeType: 'positive',
      icon: '✅',
      color: 'orange'
    }
  ];

  return (
    <div className="grid-responsive">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.name}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          changeType={stat.changeType}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsCards;
