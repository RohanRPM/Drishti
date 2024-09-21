// src/components/ui/Select.jsx
import React, { useState } from 'react';

export const Select = ({ children, onValueChange }) => {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onValueChange) onValueChange(e.target.value);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>Select an option</option>
      {children}
    </select>
  );
};

export const SelectContent = ({ children }) => {
  return <>{children}</>;
};

export const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export const SelectTrigger = ({ children, className }) => {
  return <div className={`relative ${className}`}>{children}</div>;
};

export const SelectValue = ({ placeholder }) => {
  return <option value="" disabled>{placeholder}</option>;
};
