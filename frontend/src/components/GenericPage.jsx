import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';

const GenericPage = ({ 
  title, 
  description, 
  icon, 
  iconBg = 'bg-blue-100', 
  children,
  menuItems = null 
}) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getDefaultMenuItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
      { name: 'Students', href: '/students', icon: 'Users', current: false },
      { name: 'Teachers', href: '/teachers', icon: 'UserCheck', current: false },
      { name: 'Classes', href: '/classes', icon: 'BookOpen', current: false },
      { name: 'Subjects', href: '/subjects', icon: 'Book', current: false },
      { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
      { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: false },
      { name: 'Exams', href: '/exams', icon: 'FileText', current: false },
      { name: 'Notifications', href: '/notifications', icon: 'Bell', current: false },
      { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false },
      { name: 'Settings', href: '/settings', icon: 'Settings', current: false }
    ];

    if (user?.role === 'teacher') {
      return [
        { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
        { name: 'My Classes', href: '/my-classes', icon: 'BookOpen', current: false },
        { name: 'Students', href: '/students', icon: 'Users', current: false },
        { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: false },
        { name: 'Exams', href: '/exams', icon: 'FileText', current: false },
        { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
        { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: false },
        { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false }
      ];
    }

    if (user?.role === 'student') {
      return [
        { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
        { name: 'My Classes', href: '/my-classes', icon: 'BookOpen', current: false },
        { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: false },
        { name: 'Exams', href: '/exams', icon: 'FileText', current: false },
        { name: 'Results', href: '/results', icon: 'Award', current: false },
        { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
        { name: 'Assignments', href: '/assignments', icon: 'FileText', current: false },
        { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: false }
      ];
    }

    if (user?.role === 'parent') {
      return [
        { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
        { name: 'My Children', href: '/children', icon: 'Users', current: false },
        { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: false },
        { name: 'Results', href: '/results', icon: 'Award', current: false },
        { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
        { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: false },
        { name: 'Fees', href: '/fees', icon: 'CreditCard', current: false },
        { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false }
      ];
    }

    return baseItems;
  };

  const finalMenuItems = menuItems || getDefaultMenuItems();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        menuItems={finalMenuItems} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        userRole={user?.role}
      />
      
      <div className="main-content flex-1">
        <Header 
          user={user} 
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={logout}
        />
        
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="mt-2 text-gray-600">{description}</p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              {children || (
                <div className="text-center py-12">
                  <div className={`mx-auto h-24 w-24 ${iconBg} rounded-full flex items-center justify-center mb-4`}>
                    <span className="text-4xl">{icon}</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500">
                    This page is under development. Content will be added soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GenericPage;
