// app/frontend/pages/Home.tsx
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
  // Define your custom icon for the markers
  const customIcon = new L.Icon({
    iconUrl: "/images/pin.png", // Ensure this image exists in public/images
    iconSize: [25, 40],
    iconAnchor: [15, 45],
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome!</h1>
      <p>
        <a href="/login" className="text-blue-500 underline">Login</a> or{" "}
        <a href="/signup" className="text-blue-500 underline">Signup</a> to add your location.
      </p>
      <div
        className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-lg mt-4"
        style={{ height: "400px", width: "100%" }}
      >
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
  );
};

export default Home;
