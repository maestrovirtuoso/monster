"use client"; // Indique que ce composant doit être rendu côté client

import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

// Import des données GeoJSON
import cm1 from "@/data/cm1.geojson.json";
import cm2 from "@/data/cm2.geojson.json";
import cm3 from "@/data/cm3.geojson.json";
import cm4 from "@/data/cm4.geojson.json";

const { BaseLayer, Overlay } = LayersControl;

const Map1 = () => {
  const position: LatLngExpression = [4.570868, 12.341234];
  const zoomLevel = 6;

  // État pour stocker la zone sélectionnée
  const [selectedZone, setSelectedZone] = useState(null);

  const layers = {
    cm1: { data: cm1, color: "gray" },
    cm2: { data: cm2, color: "green" },
    cm3: { data: cm3, color: "blue" },
    cm4: { data: cm4, color: "orange" },
  };

  const getStyle = (color, feature) => {
    if (selectedZone === feature) {
      return { color: "red", weight: 3, fillOpacity: 0.8 }; // Style actif
    }
    return { color, weight: 1, fillOpacity: 0.5 }; // Style par défaut
  };

  const handleClick = (feature) => {
    if (selectedZone === feature) {
      setSelectedZone(null); // Désélectionne la zone si elle est déjà sélectionnée
    } else {
      setSelectedZone(feature); // Sélectionne la nouvelle zone
    }
  };

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={position}
        zoom={zoomLevel}
        className="h-full w-full"
        zoomControl={true} // Bouton de zoom natif
      >
        <LayersControl position="topright">
          {/* Couche de base */}
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          {/* Couches GeoJSON ajoutées comme Overlays */}
          {Object.entries(layers).map(([key, { data, color }]) => (
            <Overlay key={key} name={`Layer ${key.toUpperCase()}`}>
              <GeoJSON
                data={data}
                style={(feature) => getStyle(color, feature)}
                onEachFeature={(feature, layer) => {
                  layer.on({
                    mouseover: () => {
                      if (selectedZone !== feature) {
                        layer.setStyle({ color, weight: 3, fillOpacity: 0.7 }); // Style au survol
                      }
                    },
                    mouseout: () => {
                      layer.setStyle(getStyle(color, feature)); // Rétablit le style
                    },
                    click: () => {
                      handleClick(feature); // Appelle la fonction pour gérer le clic
                    },
                  });

                  if (feature.properties && feature.properties.NAME_1) {
                    layer.bindPopup(`<b>${feature.properties.NAME_1}</b>`);
                  }
                }}
              />
            </Overlay>
          ))}
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default Map1;