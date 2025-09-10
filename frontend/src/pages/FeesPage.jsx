import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, Input, Badge } from '../components/ui';

const FeesPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fees, setFees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    const mockFees = [
      { id: 1, studentName: 'Alice Johnson', studentId: 'ST001', class: 'Grade 10A', amount: 500, dueDate: '2024-01-20', paidDate: '2024-01-15', status: 'Paid', paymentMethod: 'Online' },
      { id: 2, studentName: 'Bob Smith', studentId: 'ST002', class: 'Grade 10A', amount: 500, dueDate: '2024-01-20', paidDate: null, status: 'Pending', paymentMethod: null },
      { id: 3, studentName: 'Charlie Brown', studentId: 'ST003', class: 'Grade 10B', amount: 500, dueDate: '2024-01-20', paidDate: '2024-01-18', status: 'Paid', paymentMethod: 'Cash' },
      { id: 4, studentName: 'Diana Prince', studentId: 'ST004', class: 'Grade 11A', amount: 600, dueDate: '2024-01-25', paidDate: null, status: 'Overdue', paymentMethod: null },
      { id: 5, studentName: 'Eve Wilson', studentId: 'ST005', class: 'Grade 10A', amount: 500, dueDate: '2024-01-20', paidDate: '2024-01-19', status: 'Paid', paymentMethod: 'Bank Transfer' }
    ];
    setFees(mockFees);
  }, []);

  const getMenuItems = () => [
    { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: false },
    { name: 'Students', href: '/students', icon: 'Users', current: false },
    { name: 'Teachers', href: '/teachers', icon: 'UserCheck', current: false },
    { name: 'Classes', href: '/classes', icon: 'BookOpen', current: false },
    { name: 'Subjects', href: '/subjects', icon: 'Book', current: false },
    { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: false },
    { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: false },
    { name: 'Exams', href: '/exams', icon: 'FileText', current: false },
    { name: 'Fees', href: '/fees', icon: 'DollarSign', current: true },
    { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false },
    { name: 'Settings', href: '/settings', icon: 'Settings', current: false }
  ];

  const filteredFees = fees.filter(fee => 
    fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === 'all' || fee.status === selectedStatus)
  );

  const totalAmount = fees.reduce((acc, fee) => acc + fee.amount, 0);
  const paidAmount = fees.filter(fee => fee.status === 'Paid').reduce((acc, fee) => acc + fee.amount, 0);
  const pendingAmount = fees.filter(fee => fee.status === 'Pending').reduce((acc, fee) => acc + fee.amount, 0);
  const overdueAmount = fees.filter(fee => fee.status === 'Overdue').reduce((acc, fee) => acc + fee.amount, 0);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'green';
      case 'Pending': return 'yellow';
      case 'Overdue': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={getMenuItems()} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="main-content flex-1">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fees Management</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Manage student fees, payments, and financial records.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Amount</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">${totalAmount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Paid</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">${paidAmount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">${pendingAmount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">${overdueAmount}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <Input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                  />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">Add Fee</Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Paid Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredFees.map((fee) => (
                      <tr key={fee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{fee.studentName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{fee.studentId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{fee.class}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">${fee.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{new Date(fee.dueDate).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {fee.paidDate ? new Date(fee.paidDate).toLocaleDateString() : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge color={getStatusColor(fee.status)}>{fee.status}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{fee.paymentMethod || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">Edit</button>
                            <button className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300">Mark Paid</button>
                            <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FeesPage;
