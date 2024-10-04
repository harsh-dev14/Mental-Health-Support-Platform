import React from 'react';
import EmotionInput from './EmotionInput';
import ProgressDashboard from './ProgressDashboard';
import ResourceLibrary from './ResourceLibrary';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Your Mental Health Dashboard</h1>
      <EmotionInput />
      <ProgressDashboard />
      <ResourceLibrary />
      {/* Add more components like Community Support, etc. */}
    </div>
  );
};

export default Dashboard;
