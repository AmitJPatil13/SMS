import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

const ParentDashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const parentMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: true },
    { name: 'My Children', href: '/children', icon: 'Users', current: false },
    { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: false },
    { name: 'Results', href: '/results', icon: 'Award', current: false },
    { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
    { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: false },
    { name: 'Fees', href: '/fees', icon: 'CreditCard', current: false },
    { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        menuItems={parentMenuItems} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        userRole="parent"
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
              <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Welcome back, {user?.name}! Monitor your child's progress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">👶</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">My Children</p>
                    <p className="text-2xl font-semibold text-gray-900">2</p>
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
                    <p className="text-2xl font-semibold text-gray-900">96%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">New Messages</p>
                    <p className="text-2xl font-semibold text-gray-900">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Fees Status</p>
                    <p className="text-2xl font-semibold text-gray-900">Paid</p>
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

export default ParentDashboard;
