// app/frontend/pages/AdminHome.tsx
import React, { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

interface User {
  id: number;
  email: string;
  username: string;
}

interface Location {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  user: {
    username: string;
  };
}

interface AdminHomeProps {
  user: User;
  welcome_message: string;
  locations: Location[];
}

const customIcon = new L.Icon({
  iconUrl: "/images/pin.png",
  iconSize: [25, 40],
  iconAnchor: [15, 45],
});

const AdminHome: React.FC<AdminHomeProps> = ({
  user,
  welcome_message,
  locations,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        const results = data.map((item: any) => ({
          name: item.display_name,
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
        }));
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
    fetchSuggestions();
  }, [query]);

  const handleSuggestionClick = (loc: Location) => {
    setSelectedLocation(loc);
    setQuery(loc.name);
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) return;
    router.post("/locations", {
      name: selectedLocation.name,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
  };

  const handleLogout = () => {
    router.delete("/logout");
  };

  const handleManageUsers = () => {
    router.get("/admin/users");
  };

  return (
    <div className="page-wrapper">
      <style>{`
        .page-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f9fafb;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 32px 24px;
          flex: 1;
        }
        header {
          background: linear-gradient(to right, #3b82f6, #6366f1);
          padding: 16px 24px;
          color: white;
        }
        .header-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-title {
          font-size: 24px;
          font-weight: bold;
        }
        .logout-button {
          background-color: white;
          color: #dc2626;
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          margin-right: 12px;
        }
        .logout-button:hover {
          background-color: #f3f4f6;
        }
        .manage-button {
          background-color: #10b981;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }
        .manage-button:hover {
          background-color: #059669;
        }
        .form-section {
          margin-top: 24px;
          margin-bottom: 32px;
          position: relative;
        }
        .form-section input[type="text"] {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
        }
        .suggestions {
          position: absolute;
          background: white;
          border: 1px solid #e5e7eb;
          max-height: 240px;
          overflow-y: auto;
          width: 100%;
          z-index: 10;
        }
        .suggestions li {
          padding: 10px;
          cursor: pointer;
        }
        .suggestions li:hover {
          background-color: #f3f4f6;
        }
        .add-button {
          background-color: #2563eb;
          color: white;
          padding: 10px 20px;
          margin-top: 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
        }
        .add-button:hover {
          background-color: #1d4ed8;
        }
        .map-box {
          width: 100%;
          max-width: 1000px;
          height: 500px;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
          margin: 0 auto 40px;
        }
        footer {
          background: linear-gradient(to right, #3b82f6, #6366f1);
          color: white;
          text-align: center;
          padding: 16px 24px;
          font-size: 14px;
        }
      `}</style>

      {/* Header */}
      <header>
        <div className="header-inner">
          <div className="header-title">Finder</div>
          <div>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <button onClick={handleManageUsers} className="manage-button">Manage Users</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <h1 className="text-xl font-bold mb-2">{welcome_message}</h1>

        <section className="form-section">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="locationSearch"
              placeholder="Search for a location..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedLocation(null);
              }}
              autoComplete="off"
              required
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((loc, idx) => (
                  <li key={idx} onClick={() => handleSuggestionClick(loc)}>
                    {loc.name}
                  </li>
                ))}
              </ul>
            )}
            <button type="submit" className="add-button">Add Location</button>
          </form>
        </section>

        <section className="map-box">
          <MapContainer
            center={[-1.286389, 36.817223]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
            whenReady={(e) => {
              const map = (e as L.LeafletEvent).target as L.Map;
              mapRef.current = map;
              setTimeout(() => {
                map.invalidateSize();
              }, 100);
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc) => (
              <Marker
                key={loc.id}
                position={[loc.latitude, loc.longitude]}
                icon={customIcon}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <span>
                    {loc.name} <br />
                    (lat: {loc.latitude}, lng: {loc.longitude}) <br />
                    Added by: <strong>{loc.user?.username || "Unknown"}</strong>
                  </span>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </section>
      </div>

      {/* Footer */}
      <footer>
        &copy; {new Date().getFullYear()} Finder. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminHome;
