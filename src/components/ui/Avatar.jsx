// src/components/ui/Avatar.jsx
import React from 'react';

export const Avatar = ({ children, className }) => {
  return <div className={`relative overflow-hidden rounded-full ${className}`}>{children}</div>;
};

export const AvatarImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="object-cover w-full h-full" />;
};

export const AvatarFallback = ({ children }) => {
  return <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">{children}</div>;
};
