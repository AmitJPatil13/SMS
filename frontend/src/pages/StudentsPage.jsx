import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const StudentsPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
      { name: 'Students', href: '/students', icon: 'Users', current: true },
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
        { name: 'Students', href: '/students', icon: 'Users', current: true },
        { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: false },
        { name: 'Exams', href: '/exams', icon: 'FileText', current: false },
        { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
        { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: false },
        { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false }
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        menuItems={menuItems} 
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
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
              <p className="mt-2 text-gray-600">
                Manage student information, enrollment, and academic records.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">👥</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Students Management</h3>
                <p className="text-gray-500 mb-6">
                  This page will contain student management features like:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-2">📝 Add Students</div>
                    <p>Enroll new students with complete information</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-2">🔍 Search & Filter</div>
                    <p>Find students by name, class, or roll number</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-2">📊 View Records</div>
                    <p>Access academic and attendance records</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentsPage;
