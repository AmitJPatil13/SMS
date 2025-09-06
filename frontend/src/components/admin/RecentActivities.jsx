import React from 'react';

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: 'student',
      action: 'New student enrolled',
      student: 'Alice Johnson',
      class: 'Grade 10A',
      time: '2 hours ago',
      icon: '👤'
    },
    {
      id: 2,
      type: 'teacher',
      action: 'Teacher assigned to class',
      teacher: 'Mr. Smith',
      class: 'Grade 9B',
      time: '4 hours ago',
      icon: '👨‍🏫'
    },
    {
      id: 3,
      type: 'attendance',
      action: 'Attendance marked',
      class: 'Grade 11C',
      percentage: '95%',
      time: '6 hours ago',
      icon: '✅'
    },
    {
      id: 4,
      type: 'exam',
      action: 'Exam scheduled',
      exam: 'Mathematics Unit Test',
      class: 'Grade 12A',
      time: '1 day ago',
      icon: '📝'
    },
    {
      id: 5,
      type: 'notification',
      action: 'Announcement sent',
      title: 'Parent-Teacher Meeting',
      time: '2 days ago',
      icon: '📢'
    }
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
        <p className="text-sm text-gray-500">Latest updates from your school</p>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">{activity.icon}</span>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <div className="mt-1">
                  {activity.student && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{activity.student}</span> - {activity.class}
                    </p>
                  )}
                  {activity.teacher && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{activity.teacher}</span> - {activity.class}
                    </p>
                  )}
                  {activity.class && activity.percentage && (
                    <p className="text-sm text-gray-600">
                      {activity.class} - <span className="font-medium text-green-600">{activity.percentage}</span>
                    </p>
                  )}
                  {activity.exam && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{activity.exam}</span> - {activity.class}
                    </p>
                  )}
                  {activity.title && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{activity.title}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all activities →
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;
