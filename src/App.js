import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Routing setup
import About from './About';        // Importing the About page (search + map)
import Sidebar from './Sidebar';    // Importing the Sidebar component

// ✅ Home component (Landing screen)
function Home() {
  return (
    <div className="card">
      <h1>Hello!</h1>
      <p>Welcome to your world search.</p>
      <button onClick={() => alert('You clicked me!')}>
        Thank you, excited!
      </button>
    </div>
  );
}

// ✅ Main App Component
function App() {
  return (
    <div className="app-container">
      <Router>
        {/* Sidebar menu visible on all pages */}
        <Sidebar />

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<Home />} />     {/* Default route = Home */}
          <Route path="/about" element={<About />} /> {/* /about route = Search + Map */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
