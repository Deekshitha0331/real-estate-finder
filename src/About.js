import React, { useEffect, useState } from 'react';
import './App.css';
import PropertyTypeFilter from './PropertyTypeFilter';
import PriceRangeFilter from './PriceRangeFilter';
import MapComponent from './MapComponent';

function About() {
  const [query, setQuery] = useState('');
  const [position, setPosition] = useState([17.385, 78.4867]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: null, max: null });
  const [properties, setProperties] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/properties.json')
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error("Failed to load properties:", err));
  }, []);

  const handleSearch = () => {
    const filtered = properties.filter((p) => {
      const matchesQuery = query ? p.location.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesType = selectedType ? selectedType.includes(p.type) : true;
      const matchesPrice =
        selectedPriceRange.min !== null &&
        selectedPriceRange.max !== null
          ? p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
          : true;

      return matchesQuery && matchesType && matchesPrice;
    });

    setResults(filtered);

    if (filtered.length > 0) {
      const first = filtered[0];
      setPosition([first.latitude, first.longitude]);
    } else {
      alert("No matching properties found");
    }
  };

  return (
    <div className="about-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="search-row">
          <div className="hamburger-container">
            <div className="hamburger-menu"></div>
          </div>

          <div className="search-section">
            <div className="search-bar-container">
              <input
                type="text"
                className="search-bar-input"
                placeholder="Search localities, properties..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={handleSearch} className="search-icon-btn">🔍</button>
            </div>

            <div className="dropdown-wrapper select-type-margin">
              <PropertyTypeFilter setSelectedType={setSelectedType} />
            </div>

            <div className="dropdown-wrapper">
              <PriceRangeFilter setSelectedPriceRange={setSelectedPriceRange} />
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{ marginTop: '20px' }}>
          <h3>Available Properties:</h3>
          <div className="results-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
            {results.map((property) => (
              <div
                key={property.id}
                className="property-card"
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + property.image}
                  alt={property.title}
                  style={{
                    width: '100%',
                    height: '160px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ padding: '12px' }}>
                  <h4 style={{ margin: '0 0 8px' }}>{property.title}</h4>
                  <p style={{ margin: '4px 0' }}><strong>Location:</strong> {property.location}</p>
                  <p style={{ margin: '4px 0' }}><strong>Type:</strong> {property.type}</p>
                  <p style={{ margin: '4px 0' }}><strong>Price:</strong> ₹ {property.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="map-panel">
        <MapComponent position={position} markers={results} />
      </div>
    </div>
  );
}

export default About;
