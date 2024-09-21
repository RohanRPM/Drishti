// src/components/ui/Dialog.jsx
import React from 'react';

export const Dialog = ({ children, open, onOpenChange }) => {
  return (
    <>
      {children}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {children}
        </div>
      )}
    </>
  );
};

export const DialogContent = ({ children, className }) => {
  return <div className={`bg-white rounded-lg p-6 ${className}`}>{children}</div>;
};

export const DialogHeader = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const DialogTitle = ({ children }) => {
  return <h3 className="text-lg font-medium">{children}</h3>;
};

export const DialogTrigger = ({ children }) => {
  return <>{children}</>;
};
