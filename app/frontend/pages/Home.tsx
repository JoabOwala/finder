// app/frontend/pages/Home.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface HomeProps {
  locations: Location[];
}

const Home: React.FC<HomeProps> = ({ locations }) => {
  const customIcon = new L.Icon({
    iconUrl: "/images/pin.png",
    iconSize: [25, 40],
    iconAnchor: [15, 45],
  });

  const currentYear = new Date().getFullYear();

  return (
    <div className="page-container">
      <style>{`
        .page-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f0f2f5;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
        }
        /* Header */
        .header {
          background-color: #2563eb;
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header-title {
          font-size: 24px;
          font-weight: bold;
        }
        .nav-links a {
          color: white;
          margin-left: 16px;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .nav-links a:hover {
          color: #93c5fd;
        }
        /* Main */
        .main-content {
          flex-grow: 1;
          padding: 32px 24px;
        }
        .main-content h1 {
          font-size: 36px;
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 16px;
          text-align: center;
        }
        .main-content p {
          font-size: 18px;
          color: #4a4a4a;
          margin-bottom: 32px;
          text-align: center;
        }
        .map-container {
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          height: 500px;
          width: 100%;
        }
        /* Footer */
        .footer {
          background-color: #2563eb;
          color: white;
          padding: 24px 0;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 24px;
        }
        .footer-links a {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-links a:hover {
          color: #93c5fd;
        }
        .footer-copy {
          margin-top: 12px;
          font-size: 14px;
          color: #d1d5db;
          text-align: center;
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <h1 className="header-title">Finder</h1>
          <div className="nav-links">
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main-content">
        <div className="container">
          <h1>Welcome to Finder!</h1>
          <p>
            Discover and create your locations. Join our community to start marking your favorite spots on the map!
          </p>
          <div className="map-container">
            <MapContainer
              center={[-1.286389, 36.817223]}
              zoom={6}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((loc) => (
                <Marker key={loc.id} position={[loc.latitude, loc.longitude]} icon={customIcon}>
                  <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                    <span>
                      {loc.name} <br />
                      (lat: {loc.latitude}, lng: {loc.longitude})
                    </span>
                  </Tooltip>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <p className="footer-copy">© {currentYear} Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
