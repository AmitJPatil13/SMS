import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ menuItems, isOpen, onClose, userRole }) => {
  const location = useLocation();

  const getIcon = (iconName) => {
    const icons = {
      Home: '🏠',
      Users: '👥',
      UserCheck: '👨‍🏫',
      BookOpen: '📚',
      Book: '📖',
      Calendar: '📅',
      ClipboardCheck: '✅',
      FileText: '📄',
      Bell: '🔔',
      BarChart3: '📊',
      Settings: '⚙️',
      MessageCircle: '💬',
      Award: '🏆',
      CreditCard: '💳'
    };
    return icons[iconName] || '📄';
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SMS</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">School Management</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-6 px-3 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
                    ${isActive 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-300' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                  onClick={onClose}
                >
                  <span className="mr-3 text-lg">{getIcon(item.icon)}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {userRole?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{userRole}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">User</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
