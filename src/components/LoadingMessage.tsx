import React from 'react';
import '@/styles/LoadingMessage.css'; // Import your CSS file

// Define the type for the props
interface LoadingMessageProps {
  text: string;  // Expecting a string for the `text` prop
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({ text }) => {
  return (
    <div className="loading-container">
      <p>{text}</p>
    </div>
  );
};

export default LoadingMessage;
