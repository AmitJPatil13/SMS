import React from 'react';
import GenericPage from '../components/GenericPage';

const AttendancePage = () => {
  return (
    <GenericPage
      title="Attendance Management"
      description="Mark and track student attendance records."
      icon="✅"
      iconBg="bg-green-100"
    />
  );
};

export default AttendancePage;
