import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, StatCard, Badge } from '../components/ui';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMenuItemsByRole } from '../utils/menuConfig';

const ResultsPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('term1');

  const menuItems = getMenuItemsByRole(user?.role, '/results');

  const subjectResults = [
    { subject: 'Mathematics', midterm: 85, final: 88, total: 87, grade: 'A', status: 'Excellent' },
    { subject: 'Physics', midterm: 78, final: 82, total: 80, grade: 'A-', status: 'Good' },
    { subject: 'Chemistry', midterm: 82, final: 85, total: 84, grade: 'A', status: 'Excellent' },
    { subject: 'English', midterm: 90, final: 92, total: 91, grade: 'A+', status: 'Outstanding' },
    { subject: 'Biology', midterm: 75, final: 78, total: 77, grade: 'B+', status: 'Good' },
    { subject: 'History', midterm: 80, final: 83, total: 82, grade: 'A', status: 'Excellent' }
  ];

  const performanceTrend = [
    { term: 'Term 1', average: 82 },
    { term: 'Term 2', average: 85 },
    { term: 'Term 3', average: 84 }
  ];

  const chartData = subjectResults.map(r => ({
    subject: r.subject,
    score: r.total
  }));

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'green';
    if (grade.startsWith('B')) return 'blue';
    if (grade.startsWith('C')) return 'yellow';
    return 'red';
  };

  const overallAverage = Math.round(subjectResults.reduce((sum, r) => sum + r.total, 0) / subjectResults.length);
  const highestScore = Math.max(...subjectResults.map(r => r.total));
  const lowestScore = Math.min(...subjectResults.map(r => r.total));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="flex-1 lg:ml-64">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Results & Grades</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">View exam results, grades, and academic performance.</p>
            </div>

            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTerm('term1')}
                  className={`px-4 py-2 rounded-md transition-colors ${selectedTerm === 'term1' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                >
                  Term 1
                </button>
                <button
                  onClick={() => setSelectedTerm('term2')}
                  className={`px-4 py-2 rounded-md transition-colors ${selectedTerm === 'term2' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                >
                  Term 2
                </button>
                <button
                  onClick={() => setSelectedTerm('term3')}
                  className={`px-4 py-2 rounded-md transition-colors ${selectedTerm === 'term3' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                >
                  Term 3
                </button>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                📄 Download Report Card
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Average</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{overallAverage}%</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Highest Score</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{highestScore}%</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <span className="text-2xl">📉</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Lowest Score</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{lowestScore}%</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Subjects</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{subjectResults.length}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Subject-wise Performance</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Performance Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="term" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="average" stroke="#10b981" strokeWidth={3} name="Average Score" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Detailed Results</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Midterm</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Final</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {subjectResults.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{result.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{result.midterm}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{result.final}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{result.total}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Badge color={getGradeColor(result.grade)}>{result.grade}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            result.status === 'Outstanding' ? 'bg-purple-100 text-purple-800' :
                            result.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                            result.status === 'Good' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🎓 Teacher's Remarks</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Excellent performance overall! {user?.name} has shown consistent improvement across all subjects. 
                  Particularly strong in English and Mathematics. Keep up the great work!
                </p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResultsPage;
