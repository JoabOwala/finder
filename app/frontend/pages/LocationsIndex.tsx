// app/frontend/pages/LocationsIndex.tsx
import AuthLayout from "../Layouts/AuthLayout";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const LocationsIndex = () => {
  const { locations, auth } = usePage().props as unknown as {
    locations: Array<{
      id: number;
      name: string;
      latitude: number;
      longitude: number;
    }>;
    auth: { user: { id: number; email: string; role: string } };
  };

  const center: LatLngExpression = [51.505, -0.09];

  return (
    <AuthLayout>
      <h1>Your Locations</h1>
      {auth.user && auth.user.role === "admin" && (
        <div>
          <InertiaLink href="/admin/users">Go to Admin Dashboard</InertiaLink>
        </div>
      )}
      <MapContainer center={center} zoom={13} style={{ height: "500px" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude] as LatLngExpression}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </AuthLayout>
  );
};

export default LocationsIndex;
