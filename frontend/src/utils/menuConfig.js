/**
 * Role-Based Menu Configuration
 * This file defines which menu items each role can access
 */

export const getMenuItemsByRole = (role, currentPath = '/') => {
  const menuConfigs = {
    admin: [
      { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: currentPath === '/dashboard' },
      { name: 'Students', href: '/students', icon: 'Users', current: currentPath === '/students' },
      { name: 'Teachers', href: '/teachers', icon: 'UserCheck', current: currentPath === '/teachers' },
      { name: 'Classes', href: '/classes', icon: 'BookOpen', current: currentPath === '/classes' },
      { name: 'Subjects', href: '/subjects', icon: 'Book', current: currentPath === '/subjects' },
      { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: currentPath === '/timetable' },
      { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: currentPath === '/attendance' },
      { name: 'Exams', href: '/exams', icon: 'FileText', current: currentPath === '/exams' },
      { name: 'Notifications', href: '/notifications', icon: 'Bell', current: currentPath === '/notifications' },
      { name: 'Reports', href: '/reports', icon: 'BarChart3', current: currentPath === '/reports' },
      { name: 'Settings', href: '/settings', icon: 'Settings', current: currentPath === '/settings' }
    ],
    teacher: [
      { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: currentPath === '/dashboard' },
      { name: 'My Classes', href: '/my-classes', icon: 'BookOpen', current: currentPath === '/my-classes' },
      { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: currentPath === '/attendance' },
      { name: 'Exams', href: '/exams', icon: 'FileText', current: currentPath === '/exams' },
      { name: 'Students', href: '/students', icon: 'Users', current: currentPath === '/students' },
      { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: currentPath === '/timetable' },
      { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: currentPath === '/messages' },
      { name: 'Reports', href: '/reports', icon: 'BarChart3', current: currentPath === '/reports' }
    ],
    student: [
      { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: currentPath === '/dashboard' },
      { name: 'My Classes', href: '/my-classes', icon: 'BookOpen', current: currentPath === '/my-classes' },
      { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: currentPath === '/attendance' },
      { name: 'Exams', href: '/exams', icon: 'FileText', current: currentPath === '/exams' },
      { name: 'Results', href: '/results', icon: 'Award', current: currentPath === '/results' },
      { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: currentPath === '/timetable' },
      { name: 'Assignments', href: '/assignments', icon: 'FileText', current: currentPath === '/assignments' },
      { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: currentPath === '/messages' }
    ],
    parent: [
      { name: 'Dashboard', href: '/dashboard', icon: 'Home', current: currentPath === '/dashboard' },
      { name: 'My Children', href: '/children', icon: 'Users', current: currentPath === '/children' },
      { name: 'Attendance', href: '/attendance', icon: 'ClipboardCheck', current: currentPath === '/attendance' },
      { name: 'Results', href: '/results', icon: 'Award', current: currentPath === '/results' },
      { name: 'Timetable', href: '/timetable', icon: 'Calendar', current: currentPath === '/timetable' },
      { name: 'Messages', href: '/messages', icon: 'MessageCircle', current: currentPath === '/messages' },
      { name: 'Fees', href: '/fees', icon: 'CreditCard', current: currentPath === '/fees' },
      { name: 'Reports', href: '/reports', icon: 'BarChart3', current: currentPath === '/reports' }
    ]
  };

  return menuConfigs[role] || menuConfigs.student; // Default to student if role not found
};

/**
 * Check if a user role has access to a specific route
 */
export const hasAccessToRoute = (role, route) => {
  const menuItems = getMenuItemsByRole(role);
  return menuItems.some(item => item.href === route);
};
