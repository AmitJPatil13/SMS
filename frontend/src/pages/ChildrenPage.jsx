import React from 'react';
import GenericPage from '../components/GenericPage';

const ChildrenPage = () => {
  return (
    <GenericPage
      title="My Children"
      description="View and manage information about your children enrolled in school."
      icon="👶"
      iconBg="bg-pink-100"
      features={[
        { title: "👥 Children List", description: "View all your enrolled children" },
        { title: "📊 Academic Progress", description: "Track each child's performance" },
        { title: "📅 Schedules", description: "View timetables and important dates" },
        { title: "💬 Communication", description: "Message teachers about your children" }
      ]}
    />
  );
};

export default ChildrenPage;
