import React from 'react';
import { StatCard } from '../ui';

const StatsCards = () => {
  const stats = [
    {
      name: 'Total Students',
      value: '1,234',
      change: '+12%',
      icon: '👥',
      color: 'blue'
    },
    {
      name: 'Total Teachers',
      value: '45',
      change: '+3%',
      icon: '👨‍🏫',
      color: 'green'
    },
    {
      name: 'Active Classes',
      value: '28',
      change: '+2',
      icon: '📚',
      color: 'purple'
    },
    {
      name: 'Attendance Today',
      value: '94%',
      change: '+5%',
      icon: '✅',
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in stagger-children">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.name}
          value={stat.value}
          icon={stat.icon}
          trend="up"
          trendValue={stat.change}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsCards;
