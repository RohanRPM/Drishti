// src/components/ui/DropdownMenu.jsx
import React from 'react';

export const DropdownMenu = ({ children }) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

export const DropdownMenuTrigger = ({ children }) => {
  return <div>{children}</div>;
};

export const DropdownMenuContent = ({ children, align }) => {
  const alignment = align === 'end' ? 'right-0' : 'left-0';
  return (
    <div className={`absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${alignment}`}>
      <div className="py-1">{children}</div>
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </button>
  );
};
