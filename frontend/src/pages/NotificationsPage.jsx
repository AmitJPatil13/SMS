import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Button, Card, StatCard, Badge, Input, Modal } from '../components/ui';
import { getMenuItemsByRole } from '../utils/menuConfig';

const NotificationsPage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'announcement',
    recipients: 'all',
    priority: 'normal'
  });

  const menuItems = getMenuItemsByRole(user?.role, '/notifications');

  useEffect(() => {
    const mockNotifications = [
      { id: 1, title: 'School Holiday Announcement', message: 'School will be closed on Friday for festival celebration.', type: 'announcement', date: '2024-10-20', time: '09:30 AM', priority: 'high', recipients: 'all', read: false },
      { id: 2, title: 'Parent-Teacher Meeting', message: 'PTM scheduled for next week. Please confirm your attendance.', type: 'event', date: '2024-10-19', time: '02:15 PM', priority: 'normal', recipients: 'parents', read: true },
      { id: 3, title: 'Fee Payment Reminder', message: 'Reminder: Monthly fees due date is approaching.', type: 'reminder', date: '2024-10-18', time: '11:00 AM', priority: 'normal', recipients: 'parents', read: false },
      { id: 4, title: 'Exam Schedule Released', message: 'Mid-term examination schedule has been published.', type: 'alert', date: '2024-10-17', time: '04:45 PM', priority: 'high', recipients: 'students', read: true },
      { id: 5, title: 'New Library Books', message: 'New collection of books added to school library.', type: 'announcement', date: '2024-10-16', time: '10:20 AM', priority: 'low', recipients: 'students', read: true },
      { id: 6, title: 'Staff Training Workshop', message: 'Mandatory training session for all teaching staff.', type: 'event', date: '2024-10-15', time: '03:00 PM', priority: 'normal', recipients: 'teachers', read: false }
    ];
    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    let filtered = notifications.filter(notif =>
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedType !== 'all') {
      filtered = filtered.filter(notif => notif.type === selectedType);
    }

    setFilteredNotifications(filtered);
  }, [searchTerm, selectedType, notifications]);

  const handleCreateNotification = () => {
    const notification = {
      id: notifications.length + 1,
      ...newNotification,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications([notification, ...notifications]);
    setIsCreateModalOpen(false);
    setNewNotification({
      title: '',
      message: '',
      type: 'announcement',
      recipients: 'all',
      priority: 'normal'
    });
  };

  const toggleRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: !notif.read } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getTypeIcon = (type) => {
    const icons = {
      announcement: '📢',
      event: '📅',
      reminder: '⏰',
      alert: '🚨'
    };
    return icons[type] || '📢';
  };

  const getTypeColor = (type) => {
    const colors = {
      announcement: 'blue',
      event: 'green',
      reminder: 'yellow',
      alert: 'red'
    };
    return colors[type] || 'gray';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'red',
      normal: 'blue',
      low: 'gray'
    };
    return colors[priority] || 'gray';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={user?.role} />
      <div className="flex-1 lg:ml-64">
        <Header user={user} onMenuClick={() => setSidebarOpen(true)} onLogout={logout} />
        <main className="py-6">
          <div className="max-w-7xl mx-auto content-wrapper">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Send and manage announcements and notifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <span className="text-2xl">📬</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{notifications.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                    <span className="text-2xl">🔔</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Unread</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{unreadCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <span className="text-2xl">📢</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Announcements</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{notifications.filter(n => n.type === 'announcement').length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <span className="text-2xl">🚨</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alerts</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{notifications.filter(n => n.type === 'alert').length}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64"
                  />
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="announcement">Announcements</option>
                    <option value="event">Events</option>
                    <option value="reminder">Reminders</option>
                    <option value="alert">Alerts</option>
                  </select>
                </div>
                {user?.role === 'admin' && (
                  <Button onClick={() => setIsCreateModalOpen(true)} className="bg-yellow-600 hover:bg-yellow-700 text-white w-full sm:w-auto">
                    Create Notification
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className={`p-6 hover:shadow-lg transition-shadow duration-300 ${!notification.read ? 'border-l-4 border-blue-500' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-3xl">{getTypeIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                          {!notification.read && (
                            <Badge color="blue">New</Badge>
                          )}
                          <Badge color={getTypeColor(notification.type)}>{notification.type}</Badge>
                          <Badge color={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{notification.message}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                          <span>📅 {notification.date}</span>
                          <span>🕐 {notification.time}</span>
                          <span>👥 {notification.recipients}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => toggleRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        title={notification.read ? 'Mark as unread' : 'Mark as read'}
                      >
                        {notification.read ? '📭' : '📬'}
                      </button>
                      {user?.role === 'admin' && (
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredNotifications.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Notifications Found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search term.</p>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* Create Notification Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Notification">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <Input
              type="text"
              value={newNotification.title}
              onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
              placeholder="Notification title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea
              value={newNotification.message}
              onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
              placeholder="Notification message"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
              <select
                value={newNotification.type}
                onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="announcement">Announcement</option>
                <option value="event">Event</option>
                <option value="reminder">Reminder</option>
                <option value="alert">Alert</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select
                value={newNotification.priority}
                onChange={(e) => setNewNotification({ ...newNotification, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recipients</label>
            <select
              value={newNotification.recipients}
              onChange={(e) => setNewNotification({ ...newNotification, recipients: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="students">Students</option>
              <option value="teachers">Teachers</option>
              <option value="parents">Parents</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button onClick={() => setIsCreateModalOpen(false)} className="bg-gray-500 hover:bg-gray-600 text-white">
              Cancel
            </Button>
            <Button onClick={handleCreateNotification} className="bg-yellow-600 hover:bg-yellow-700 text-white">
              Send Notification
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NotificationsPage;
