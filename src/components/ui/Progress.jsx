// src/components/ui/Progress.jsx
import React from 'react';

export const Progress = ({ value, className }) => {
  // Determine the color based on progress value
  const getColor = (progress) => {
    if (progress < 50) {
      return 'bg-red-500'; // Red for low progress
    } else if (progress < 80) {
      return 'bg-yellow-500'; // Yellow for medium progress
    } else {
      return 'bg-green-500'; // Green for high progress
    }
  };

  return (
    <div className={`relative w-full h-2 bg-gray-200 rounded ${className}`}>
      <div
        className={`absolute top-0 left-0 h-full ${getColor(value)} rounded`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
