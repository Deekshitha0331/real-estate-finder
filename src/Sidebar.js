//  Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // External styles for sidebar

function Sidebar() {
  // Toggle state to show/hide sidebar menu
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ☰ Hamburger Icon */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        &#9776; {/* Unicode for hamburger icon */}
      </div>

      {/* Sidebar Menu (only shown when isOpen is true) */}
      {isOpen && (
        <div className="sidebar">
          {/* Home link - closes menu on click */}
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>

          {/* About/Search link - closes menu on click */}
          <Link to="/about" onClick={() => setIsOpen(false)}>Search</Link>
        </div>
      )}
    </>
  );
}

export default Sidebar;
