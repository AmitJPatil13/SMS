import React from 'react';
import GenericPage from '../components/GenericPage';

const ResultsPage = () => {
  return (
    <GenericPage
      title="Results & Grades"
      description="View exam results, grades, and academic performance."
      icon="🏆"
      iconBg="bg-yellow-100"
      features={[
        { title: "📊 Grade Reports", description: "View detailed grade reports" },
        { title: "📈 Performance Trends", description: "Track academic progress over time" },
        { title: "📋 Subject-wise Results", description: "View results by subject" },
        { title: "📄 Report Cards", description: "Download and view report cards" }
      ]}
    />
  );
};

export default ResultsPage;
