import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      name: 'Add Student',
      description: 'Enroll a new student',
      href: '/students/add',
      icon: '👤',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Add Teacher',
      description: 'Register a new teacher',
      href: '/teachers/add',
      icon: '👨‍🏫',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Create Class',
      description: 'Set up a new class',
      href: '/classes/add',
      icon: '📚',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      name: 'Mark Attendance',
      description: 'Take today\'s attendance',
      href: '/attendance/mark',
      icon: '✅',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      name: 'Schedule Exam',
      description: 'Create a new exam',
      href: '/exams/add',
      icon: '📝',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      name: 'Send Notification',
      description: 'Send announcement',
      href: '/notifications/send',
      icon: '📢',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        <p className="text-sm text-gray-500">Common administrative tasks</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {actions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className="group flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-200`}>
                <span className="text-lg">{action.icon}</span>
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  {action.name}
                </h4>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
