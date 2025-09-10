import React from 'react';
import GenericPage from '../components/GenericPage';

const AssignmentsPage = () => {
  return (
    <GenericPage
      title="Assignments"
      description="View and submit assignments, track deadlines and grades."
      icon="📝"
      iconBg="bg-purple-100"
      features={[
        { title: "📋 Assignment List", description: "View all assigned work" },
        { title: "⏰ Deadlines", description: "Track assignment due dates" },
        { title: "📤 Submit Work", description: "Upload completed assignments" },
        { title: "📊 Grades", description: "View assignment grades and feedback" }
      ]}
    />
  );
};

export default AssignmentsPage;
