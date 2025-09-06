import React from 'react';
import GenericPage from '../components/GenericPage';

const SettingsPage = () => {
  return (
    <GenericPage
      title="Settings"
      description="Configure system settings and preferences."
      icon="⚙️"
      iconBg="bg-gray-100"
    />
  );
};

export default SettingsPage;
