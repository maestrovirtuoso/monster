"use client"; // Forcer le composant à s'exécuter uniquement côté client

import { MapContainer, TileLayer, Marker, Popup,GeoJSON } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import wojewodztwaGeoJson from '../data/wojewodztwa-medium.geojson.json';
import countriesGeoJson from '../data/countries.geojson.json';
import cameroonGeoJson from '../data/cameoon.geojson.json';


const Map = () => {
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
        <GeoJSON data={wojewodztwaGeoJson} />
        <GeoJSON data={countriesGeoJson} />
        <GeoJSON data={cameroonGeoJson} />

      </MapContainer>
    </div>
  );
};

export default Map;
