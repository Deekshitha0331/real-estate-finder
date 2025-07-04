// 📍 MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Required Leaflet styles
import L from 'leaflet'; // Leaflet for custom icon

// 📌 Custom red marker icon using Google Maps red pin
const redIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32], // Size of the marker icon
});

// 🗺️ Main MapComponent
function MapComponent({ position, markers = [] }) {
  return (
    // Map container centered at 'position' with zoom level 13
    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
      
      {/* OpenStreetMap tile source */}
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🔴 Marker for center position */}
      <Marker position={position} icon={redIcon}>
        <Popup>Center</Popup>
      </Marker>

      {/* 🏘️ Markers for each property in filtered results */}
      {markers.map((prop) => (
        <Marker
          key={prop.id}
          position={[prop.latitude, prop.longitude]}
          icon={redIcon}
        >
          <Popup>
            <strong>{prop.title}</strong><br />
            ₹ {prop.price.toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
