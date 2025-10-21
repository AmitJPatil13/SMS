import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, StatCard } from '../components/ui';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMenuItemsByRole } from '../utils/menuConfig';

const ReportsPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState('attendance');
  const [dateRange, setDateRange] = useState('month');

  const menuItems = getMenuItemsByRole(user?.role, '/reports');

  // Mock data for various reports
  const attendanceData = [
    { month: 'Jan', present: 92, absent: 8 },
    { month: 'Feb', present: 89, absent: 11 },
    { month: 'Mar', present: 95, absent: 5 },
    { month: 'Apr', present: 91, absent: 9 },
    { month: 'May', present: 94, absent: 6 },
    { month: 'Jun', present: 88, absent: 12 }
  ];

  const performanceData = [
    { subject: 'Math', average: 85 },
    { subject: 'Physics', average: 78 },
    { subject: 'Chemistry', average: 82 },
    { subject: 'English', average: 88 },
    { subject: 'Biology', average: 80 },
    { subject: 'History', average: 75 }
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 45, percentage: 15 },
    { grade: 'A', count: 75, percentage: 25 },
    { grade: 'B+', count: 90, percentage: 30 },
    { grade: 'B', count: 60, percentage: 20 },
    { grade: 'C', count: 30, percentage: 10 }
  ];

  const financialData = [
    { month: 'Jan', income: 50000, expenses: 35000 },
    { month: 'Feb', income: 52000, expenses: 36000 },
    { month: 'Mar', income: 55000, expenses: 38000 },
    { month: 'Apr', income: 53000, expenses: 37000 },
    { month: 'May', income: 58000, expenses: 39000 },
    { month: 'Jun', income: 60000, expenses: 40000 }
  ];

  const enrollmentTrends = [
    { year: '2020', students: 850 },
    { year: '2021', students: 920 },
    { year: '2022', students: 1050 },
    { year: '2023', students: 1180 },
    { year: '2024', students: 1250 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const handleExport = (format) => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  const reportTypes = [
    { id: 'attendance', name: 'Attendance Report', icon: '✅' },
    { id: 'performance', name: 'Performance Report', icon: '📊' },
    { id: 'grades', name: 'Grade Distribution', icon: '🎓' },
    { id: 'financial', name: 'Financial Report', icon: '💰' },
    { id: 'enrollment', name: 'Enrollment Trends', icon: '📈' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="flex-1 lg:ml-64">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Generate and view comprehensive reports and analytics.</p>
            </div>

            {/* Report Type Selector */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`p-4 rounded-lg text-center transition-all duration-200 ${
                    selectedReport === type.id
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="text-sm font-medium">{type.name}</div>
                </button>
              ))}
            </div>

            {/* Controls */}
            <Card className="p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range:</label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="quarter">Last Quarter</option>
                    <option value="year">Last Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => handleExport('pdf')} className="bg-red-600 hover:bg-red-700 text-white">
                    📄 Export PDF
                  </Button>
                  <Button onClick={() => handleExport('excel')} className="bg-green-600 hover:bg-green-700 text-white">
                    📊 Export Excel
                  </Button>
                </div>
              </div>
            </Card>

            {/* Attendance Report */}
            {selectedReport === 'attendance' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Attendance Trends</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2} name="Present (%)" />
                      <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} name="Absent (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">✅</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Average Attendance</p>
                      <p className="text-3xl font-bold text-green-600">91.5%</p>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📅</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Classes</p>
                      <p className="text-3xl font-bold text-blue-600">180</p>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">👥</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Students</p>
                      <p className="text-3xl font-bold text-purple-600">1,250</p>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Performance Report */}
            {selectedReport === 'performance' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Subject-wise Performance</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="average" fill="#3b82f6" name="Average Score (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performers</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white">English</span>
                        <span className="text-green-600 font-bold">88%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white">Mathematics</span>
                        <span className="text-blue-600 font-bold">85%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white">Chemistry</span>
                        <span className="text-purple-600 font-bold">82%</span>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Needs Improvement</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white">History</span>
                        <span className="text-red-600 font-bold">75%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white">Physics</span>
                        <span className="text-orange-600 font-bold">78%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white">Biology</span>
                        <span className="text-yellow-600 font-bold">80%</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Grade Distribution */}
            {selectedReport === 'grades' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Grade Distribution</h2>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={gradeDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {gradeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Grade Breakdown</h2>
                    <div className="space-y-4">
                      {gradeDistribution.map((item, index) => (
                        <div key={item.grade}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">Grade {item.grade}</span>
                            <span className="text-gray-600 dark:text-gray-400">{item.count} students ({item.percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-500"
                              style={{ width: `${item.percentage * 3.33}%`, backgroundColor: COLORS[index] }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Financial Report */}
            {selectedReport === 'financial' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Financial Overview</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" fill="#10b981" name="Income" />
                      <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">💵</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
                      <p className="text-2xl font-bold text-green-600">$328,000</p>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">💸</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
                      <p className="text-2xl font-bold text-red-600">$225,000</p>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">💰</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Net Profit</p>
                      <p className="text-2xl font-bold text-blue-600">$103,000</p>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📊</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Profit Margin</p>
                      <p className="text-2xl font-bold text-purple-600">31.4%</p>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Enrollment Trends */}
            {selectedReport === 'enrollment' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Enrollment Growth Over Years</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={enrollmentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="students" stroke="#8b5cf6" strokeWidth={3} name="Total Students" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📈</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Growth Rate</p>
                      <p className="text-3xl font-bold text-green-600">+5.9%</p>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎯</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Current Enrollment</p>
                      <p className="text-3xl font-bold text-blue-600">1,250</p>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔮</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Projected (2025)</p>
                      <p className="text-3xl font-bold text-purple-600">1,325</p>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
