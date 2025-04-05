
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { usePage } from "@inertiajs/react";
import { LatLngExpression } from "leaflet";

const LocationsIndex = () => {
  const { locations } = (usePage().props as unknown) as {
    locations: Array<{
      id: number;
      name: string;
      latitude: number;
      longitude: number;
    }>;
  };

  // Define the center using LatLngExpression
  const center: LatLngExpression = [51.505, -0.09];

  return (
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
  );
};

export default LocationsIndex;
