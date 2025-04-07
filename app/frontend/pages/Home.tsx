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
  const customIcon = new L.Icon({
    iconUrl: "/images/pin.png",
    iconSize: [25, 40],
    iconAnchor: [15, 45],
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Finder</h1>
            <div className="flex space-x-4">
              <a href="/login" className="hover:text-blue-200 transition-colors">
                Login
              </a>
              <a href="/signup" className="hover:text-blue-200 transition-colors">
                Sign Up
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Finder!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover and create your locations. Join our community to start
            marking your favorite spots on the map!
          </p>
          
          <div
            className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-xl"
            style={{ height: "500px", width: "100%" }}
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
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="/about" className="hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="/contact" className="hover:text-blue-400 transition-colors">
              Contact
            </a>
            <a href="/privacy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Finder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;