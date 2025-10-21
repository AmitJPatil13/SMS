import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, StatCard, Badge } from '../components/ui';
import { getMenuItemsByRole } from '../utils/menuConfig';

const TimetablePage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timetable, setTimetable] = useState([]);
  const [selectedClass, setSelectedClass] = useState('Grade 10A');

  useEffect(() => {
    const mockTimetable = [
      { id: 1, class: 'Grade 10A', day: 'Monday', time: '08:00-09:00', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 101' },
      { id: 2, class: 'Grade 10A', day: 'Monday', time: '09:00-10:00', subject: 'Physics', teacher: 'Mr. Michael Brown', room: 'Room 102' },
      { id: 3, class: 'Grade 10A', day: 'Monday', time: '10:00-11:00', subject: 'Chemistry', teacher: 'Prof. James Wilson', room: 'Room 103' },
      { id: 4, class: 'Grade 10A', day: 'Monday', time: '11:00-12:00', subject: 'English', teacher: 'Ms. Emily Davis', room: 'Room 104' },
      { id: 5, class: 'Grade 10A', day: 'Tuesday', time: '08:00-09:00', subject: 'Mathematics', teacher: 'Dr. Sarah Johnson', room: 'Room 101' },
      { id: 6, class: 'Grade 10A', day: 'Tuesday', time: '09:00-10:00', subject: 'Biology', teacher: 'Dr. Lisa Smith', room: 'Room 105' },
      { id: 7, class: 'Grade 10A', day: 'Tuesday', time: '10:00-11:00', subject: 'History', teacher: 'Mr. John Doe', room: 'Room 106' },
      { id: 8, class: 'Grade 10A', day: 'Tuesday', time: '11:00-12:00', subject: 'Physical Education', teacher: 'Coach Mike', room: 'Gym' }
    ];
    setTimetable(mockTimetable);
  }, []);

  const menuItems = getMenuItemsByRole(user?.role, '/timetable');

  const filteredTimetable = timetable.filter(slot => slot.class === selectedClass);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00'];

  const getSubjectForSlot = (day, time) => {
    const slot = filteredTimetable.find(s => s.day === day && s.time === time);
    return slot || null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="flex-1 lg:ml-64">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Timetable Management</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Create and manage class schedules and timetables.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Class:</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Grade 10A">Grade 10A</option>
                    <option value="Grade 10B">Grade 10B</option>
                    <option value="Grade 11A">Grade 11A</option>
                    <option value="Grade 11B">Grade 11B</option>
                  </select>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">Create Timetable</Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                      {days.map(day => (
                        <th key={day} className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {timeSlots.map(time => (
                      <tr key={time} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{time}</td>
                        {days.map(day => {
                          const slot = getSubjectForSlot(day, time);
                          return (
                            <td key={day} className="px-4 py-4 text-center">
                              {slot ? (
                                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                                  <div className="text-sm font-medium text-blue-900 dark:text-blue-100">{slot.subject}</div>
                                  <div className="text-xs text-blue-700 dark:text-blue-300">{slot.teacher}</div>
                                  <div className="text-xs text-blue-600 dark:text-blue-400">{slot.room}</div>
                                </div>
                              ) : (
                                <div className="text-gray-400 dark:text-gray-500 text-sm">-</div>
                              )}
                            </td>
                          );
                        })}
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

export default TimetablePage;
