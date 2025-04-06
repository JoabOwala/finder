import { useState, useEffect, useRef } from "react";
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

interface Props {
  user: User;
  welcome_message: string;
  locations: Location[];
}

// Define your custom icon
const customIcon = new L.Icon({
  iconUrl: "/images/pin.png",
  iconSize: [25, 40],
  iconAnchor: [15, 45],
});

const UserHome: React.FC<Props> = ({ user, welcome_message, locations }) => {
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
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}`
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">{welcome_message}</h1>

      {/* Search and suggestion input */}
      <form onSubmit={handleSubmit} className="mb-4 space-y-2 relative">
        <input
          type="text"
          name="locationSearch"
          placeholder="Search for a location..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedLocation(null);
          }}
          className="border p-2 w-full"
          autoComplete="off"
          required
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto">
            {suggestions.map((loc, idx) => (
              <li
                key={idx}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(loc)}
              >
                {loc.name}
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Location
        </button>
      </form>

      {/* Map Display */}
      <div
        className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg mt-4"
        style={{ height: "400px", width: "100%" }}
      >
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
              <Tooltip
                direction="top"
                offset={[0, -10]}
                opacity={1}
                permanent={false}
              >
                <span>
                  {loc.name} <br />
                  (lat: {loc.latitude}, lng: {loc.longitude}) <br />
                  Added by: <strong>{loc.user?.username || "Unknown"}</strong>
                </span>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default UserHome;
