import React from 'react';
import GenericPage from '../components/GenericPage';

const ExamsPage = () => {
  return (
    <GenericPage
      title="Exams Management"
      description="Create exams, manage schedules, and enter marks."
      icon="📝"
      iconBg="bg-red-100"
    />
  );
};

export default ExamsPage;
