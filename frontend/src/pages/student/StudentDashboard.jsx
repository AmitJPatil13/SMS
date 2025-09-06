import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const studentMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: true },
    { name: 'My Classes', href: '/my-classes', icon: 'BookOpen', current: false },
    { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: false },
    { name: 'Exams', href: '/exams', icon: 'FileText', current: false },
    { name: 'Results', href: '/results', icon: 'Award', current: false },
    { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
    { name: 'Assignments', href: '/assignments', icon: 'FileText', current: false },
    { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        menuItems={studentMenuItems} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        userRole="student"
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
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Welcome back, {user?.name}! Track your academic progress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">My Class</p>
                    <p className="text-2xl font-semibold text-gray-900">Grade 10A</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Attendance</p>
                    <p className="text-2xl font-semibold text-gray-900">95%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Upcoming Exams</p>
                    <p className="text-2xl font-semibold text-gray-900">2</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Average Grade</p>
                    <p className="text-2xl font-semibold text-gray-900">A-</p>
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

export default StudentDashboard;
