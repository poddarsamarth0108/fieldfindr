import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function MapView() {
  return (
    <MapContainer center={[25.5941, 85.1376]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[25.5941, 85.1376]}>
        <Popup>
          Gandhi Maidan
        </Popup>
      </Marker>
    </MapContainer>
  );
}