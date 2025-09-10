import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, Input, Badge } from '../components/ui';

const MessagesPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockMessages = [
      { id: 1, sender: 'Dr. Sarah Johnson', recipient: 'Parent - John Smith', subject: 'Student Progress Update', message: 'Your child Alice is performing well in Mathematics...', timestamp: '2024-01-15 10:30', status: 'unread', type: 'incoming' },
      { id: 2, sender: 'Admin', recipient: 'All Teachers', subject: 'Staff Meeting Reminder', message: 'Please attend the staff meeting tomorrow at 3 PM...', timestamp: '2024-01-15 09:15', status: 'read', type: 'announcement' },
      { id: 3, sender: 'Mr. Michael Brown', recipient: 'Students - Grade 10A', subject: 'Physics Assignment Due', message: 'The physics assignment is due next Monday...', timestamp: '2024-01-14 16:45', status: 'read', type: 'assignment' },
      { id: 4, sender: 'Parent - Jane Wilson', recipient: 'Ms. Emily Davis', subject: 'Question about English Grade', message: 'Could you please explain my daughter\'s English grade...', timestamp: '2024-01-14 14:20', status: 'unread', type: 'incoming' }
    ];
    setMessages(mockMessages);
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
    { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: true },
    { name: 'Reports', href: '/reports', icon: 'BarChart3', current: false },
    { name: 'Settings', href: '/settings', icon: 'Settings', current: false }
  ];

  const filteredMessages = messages.filter(msg => 
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={getMenuItems()} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="main-content flex-1">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Communicate with teachers, parents, and students.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Messages</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{messages.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                    <span className="text-2xl">📨</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Unread</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{unreadCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <span className="text-2xl">📤</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sent Today</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">5</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Chats</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">3</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inbox</h3>
                    <Button className="bg-green-600 hover:bg-green-700 text-white text-sm">New Message</Button>
                  </div>
                  <Input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                  />
                  <div className="space-y-2">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => setSelectedMessage(message)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedMessage?.id === message.id
                            ? 'bg-blue-100 dark:bg-blue-900'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{message.subject}</h4>
                              {message.status === 'unread' && (
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{message.sender}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{message.timestamp}</p>
                          </div>
                          <Badge color={message.type === 'incoming' ? 'blue' : message.type === 'announcement' ? 'yellow' : 'green'}>
                            {message.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                  {selectedMessage ? (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedMessage.subject}</h3>
                        <div className="flex space-x-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">Reply</Button>
                          <Button className="bg-gray-600 hover:bg-gray-700 text-white text-sm">Forward</Button>
                        </div>
                      </div>
                      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>From: {selectedMessage.sender}</span>
                          <span>To: {selectedMessage.recipient}</span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                          {selectedMessage.timestamp}
                        </div>
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        <p>{selectedMessage.message}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">💬</div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a message</h3>
                      <p className="text-gray-500 dark:text-gray-400">Choose a message from the inbox to view its content</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MessagesPage;
