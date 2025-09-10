import React from 'react';
import GenericPage from '../components/GenericPage';

const MyClassesPage = () => {
  return (
    <GenericPage
      title="My Classes"
      description="View and manage your assigned classes and students."
      icon="📚"
      iconBg="bg-blue-100"
      features={[
        { title: "📋 Class List", description: "View all your assigned classes" },
        { title: "👥 Student Roster", description: "See students in each class" },
        { title: "📊 Class Performance", description: "Track class progress and grades" },
        { title: "📝 Class Notes", description: "Add and manage class notes" }
      ]}
    />
  );
};

export default MyClassesPage;
