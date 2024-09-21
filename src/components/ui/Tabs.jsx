// src/components/ui/Tabs.jsx
import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { activeTab, setActiveTab })
  );

  return <div>{childrenWithProps}</div>;
};

export const TabsList = ({ children }) => {
  return <div className="flex space-x-4 border-b">{children}</div>;
};

export const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => {
  const isActive = activeTab === value;
  return (
    <button
      className={`py-2 px-4 focus:outline-none ${
        isActive ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-blue-500'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, activeTab }) => {
  return activeTab === value ? <div className="mt-4">{children}</div> : null;
};
