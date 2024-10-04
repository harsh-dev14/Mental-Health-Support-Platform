import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const getStyle = () => {
    switch (type) {
      case 'success':
        return { color: 'green' };
      case 'error':
        return { color: 'red' };
      case 'info':
        return { color: 'blue' };
      default:
        return {};
    }
  };

  return <p style={getStyle()}>{message}</p>;
};

export default Notification;
