import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet.markercluster';

// ✅ Fix broken marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ✅ Auto zoom to fit all valid markers
function FitBounds({ grounds }) {
  const map = useMap();

  useEffect(() => {
    const valid = grounds.filter(g =>
      g.lat &&
      g.lng &&
      !isNaN(g.lat) &&
      !isNaN(g.lng) &&
      Math.abs(g.lat) > 1 &&
      Math.abs(g.lng) > 1
    );

    if (!valid.length) return;

    const bounds = valid.map(g => [g.lat, g.lng]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [grounds, map]);

  return null;
}

// ✅ Cluster + filter invalid + remove duplicates
function ClusterMarkers({ grounds }) {
  const map = useMap();

  useEffect(() => {
    const markers = L.markerClusterGroup();

    // Remove duplicates
    const unique = new Map();

    grounds.forEach(g => {
      const key = `${g.lat}-${g.lng}`;
      if (!unique.has(key)) unique.set(key, g);
    });

    const cleanGrounds = Array.from(unique.values());

    cleanGrounds
      .filter(g =>
        g.lat &&
        g.lng &&
        !isNaN(g.lat) &&
        !isNaN(g.lng) &&
        Math.abs(g.lat) > 1 &&
        Math.abs(g.lng) > 1
      )
      .forEach(g => {
        const marker = L.marker([g.lat, g.lng]).bindPopup(`
          <div style="font-family: sans-serif;">
            <strong>${g.name}</strong><br/>
            <small>📍 ${g.address}</small>
          </div>
        `);

        markers.addLayer(marker);
      });

    map.addLayer(markers);

    return () => {
      map.removeLayer(markers);
    };
  }, [grounds, map]);

  return null;
}

export default function MapView({ grounds }) {
  if (!grounds || grounds.length === 0) {
    return <p>No fields to show on map</p>;
  }

  const center = [grounds[0].lat, grounds[0].lng];

  return (
    <MapContainer
      center={center}
      zoom={13}
      zoomControl={true}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", marginTop: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ✅ Smart zoom */}
      <FitBounds grounds={grounds} />

      {/* ✅ Clean clustered markers */}
      <ClusterMarkers grounds={grounds} />
    </MapContainer>
  );
}