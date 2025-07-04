// 🏠 PropertyTypeFilter.js
import React, { useState, useEffect } from 'react';
import './App.css';

function PropertyTypeFilter({ setSelectedType }) {
  // State for managing dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Array of selected property types
  const [selected, setSelected] = useState([]);

  // List of property type options shown in the dropdown
  const options = [
    "Apartments", "Plots", "Villas", "Independent House",
    "Commercial", "Lands", "PG", "Office", "Farm Lands"
  ];

  // Handle selecting or deselecting an option
  const toggleOption = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)  // Remove if already selected
        : [...prev, option]                 // Add if not selected
    );
  };

  // Whenever the selection changes, update the parent
  useEffect(() => {
    if (setSelectedType) {
      // You can choose to send all selected options as a comma-separated string
      // or just send the array: `setSelectedType(selected);`
      setSelectedType(selected.join(', '));
    }
  }, [selected, setSelectedType]);

  return (
    <div className="dropdown-wrapper">
      {/* Toggle Button */}
      <button
        className={`dropdown-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown-icon-text">
          <span role="img" aria-label="home">🏠</span> Select Type
        </span>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <label key={option} className="dropdown-option">
              <input
                type="checkbox"
                checked={selected.includes(option)} // Check if selected
                onChange={() => toggleOption(option)} // Toggle selection
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyTypeFilter;
