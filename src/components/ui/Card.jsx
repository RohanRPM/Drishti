// src/components/ui/Card.jsx
import React from 'react';

export const Card = ({ children, className }) => {
  return <div className={`bg-white shadow-md rounded p-4 ${className}`}>{children}</div>;
};

export const CardHeader = ({ children }) => {
  return <div className="border-b pb-2 mb-4">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};
