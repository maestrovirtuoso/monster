"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import cm4 from '../../data/cm4.geojson.json';

const Map4 = () => {
  const position: LatLngExpression = [3.848, 11.5021]; // Coordonnées initiales

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={3}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Un exemple de popup avec React Leaflet et Next.js !
          </Popup>
        </Marker>
        <GeoJSON data={cm4} />
      </MapContainer>
    </div>
  );
};

export default Map4;
