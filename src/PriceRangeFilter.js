// 💰 PriceRangeFilter.js
import React, { useState } from 'react';
import './App.css';

// 🎯 Predefined price ranges with min and max values (used for filtering)
const predefinedRanges = [
  { label: 'Below ₹ 10L', min: 0, max: 1000000 },
  { label: '₹ 10L – ₹ 50L', min: 1000000, max: 5000000 },
  { label: '₹ 50L – ₹ 1Cr', min: 5000000, max: 10000000 },
  { label: '₹ 1Cr – ₹ 2Cr', min: 10000000, max: 20000000 },
  { label: '₹ 2Cr – ₹ 4Cr', min: 20000000, max: 40000000 },
  { label: '₹ 4Cr – ₹ 6Cr', min: 40000000, max: 60000000 },
  { label: '₹ 6Cr – ₹ 10Cr', min: 60000000, max: 100000000 },
  { label: '₹ 10Cr – ₹ 15Cr', min: 100000000, max: 150000000 },
  { label: '₹ 15Cr – ₹ 20Cr', min: 150000000, max: 200000000 },
  { label: 'Above ₹ 20Cr', min: 200000000, max: 999999999 }
];

function PriceRangeFilter({ setSelectedPriceRange }) {
  // UI state management
  const [open, setOpen] = useState(false);          // Dropdown open/close
  const [selected, setSelected] = useState(null);   // Predefined range selected
  const [min, setMin] = useState('');               // Custom min
  const [max, setMax] = useState('');               // Custom max

  // 🧭 Toggle dropdown menu
  const toggleDropdown = () => setOpen(!open);

  // 📌 Handle selecting a predefined range
  const handleSelect = (range) => {
    setSelected(range);
    setMin('');
    setMax('');
  };

  // 🔄 Reset all selections
  const handleReset = () => {
    setSelected(null);
    setMin('');
    setMax('');
    setSelectedPriceRange({ min: null, max: null });
  };

  // ✅ Apply selected or custom price range
  const handleApply = () => {
    if (selected) {
      setSelectedPriceRange({ min: selected.min, max: selected.max });
    } else if (min && max) {
      setSelectedPriceRange({ min: Number(min), max: Number(max) });
    }
    setOpen(false); // close dropdown after applying
  };

  return (
    <div className="dropdown-wrapper">
      {/* Button to toggle dropdown */}
      <button className={`dropdown-toggle-btn ${open ? 'open' : ''}`} onClick={toggleDropdown}>
        <span role="img" aria-label="money">💰</span> Price Range
        <span className="arrow">{open ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown content when open */}
      {open && (
        <div className="dropdown-menu price-menu">
          <strong>Price Ranges</strong>

          {/* Preset price range options */}
          <div className="price-options">
            {predefinedRanges.map((range) => (
              <label key={range.label} className="dropdown-option">
                <input
                  type="radio"
                  name="price-range"
                  checked={selected?.label === range.label}
                  onChange={() => handleSelect(range)}
                />
                {range.label}
              </label>
            ))}
          </div>

          <hr />

          {/* Custom price range inputs */}
          <strong>Custom Price Range</strong>
          <div className="price-custom-range">
            <input
              type="number"
              placeholder="₹ Min"
              value={min}
              onChange={(e) => {
                setMin(e.target.value);
                setSelected(null); // Deselect preset
              }}
            />
            <input
              type="number"
              placeholder="₹ Max"
              value={max}
              onChange={(e) => {
                setMax(e.target.value);
                setSelected(null); // Deselect preset
              }}
            />
          </div>

          {/* Apply and Reset buttons */}
          <div className="price-buttons">
            <button onClick={handleReset} className="reset-btn">RESET</button>
            <button onClick={handleApply} className="apply-btn">APPLY</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PriceRangeFilter;
