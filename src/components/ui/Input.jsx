// src/components/ui/Input.jsx
import React from 'react';

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};
