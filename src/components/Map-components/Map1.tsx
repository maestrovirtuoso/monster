"use client";  // Indique que ce composant doit être rendu côté client

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { useMapInteractions } from "@/hooks/useMapInteractions";
import MapZoom from "./MapZoom";

// Import des données GeoJSON
import cm1 from "@/data/cm1.geojson.json";
import cm2 from "@/data/cm2.geojson.json";
import cm3 from "@/data/cm3.geojson.json";
import cm4 from "@/data/cm4.geojson.json";

const Map1 = () => {
  const position: LatLngExpression = [4.570868, 12.341234];
  const zoomLevel = 6;

  // Utilisation du hook personnalisé pour gérer les interactions de la carte
  const {
    visibleLayer,
    bounds,
    activeZone,
    handleZoneClick,
    handleBackToPreviousView,
  } = useMapInteractions(position, zoomLevel);

  const layers = {
    cm1: { data: cm1, color: "gray", nextLayer: "cm2" },
    cm2: { data: cm2, color: "green", nextLayer: "cm3" },
    cm3: { data: cm3, color: "blue", nextLayer: "cm4" },
    cm4: { data: cm4, color: "orange", nextLayer: null },
  };

  const getStyle = (color, type = "default") => {
    switch (type) {
      case "hover":
        return { color, weight: 3, fillOpacity: 0.7 };
      case "active":
        return { color: "yellow", weight: 3, fillOpacity: 0.8 };
      default:
        return { color, weight: 1, fillOpacity: 0.5 };
    }
  };

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={position}
        zoom={zoomLevel}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {Object.entries(layers).map(([key, { data, color, nextLayer }]) => (
          visibleLayer === key && (
            <GeoJSON
              key={key}
              data={data}
              style={(feature) =>
                activeZone && activeZone.properties.NAME_1 === feature.properties.NAME_1
                  ? getStyle("yellow", "active")
                  : getStyle(color)
              }
              onEachFeature={(feature, layer) => {
                layer.on({
                  mouseover: () => layer.setStyle(getStyle(color, "hover")),
                  mouseout: () => {
                    if (
                      activeZone &&
                      activeZone.properties.NAME_1 === feature.properties.NAME_1
                    ) {
                      layer.setStyle(getStyle("yellow", "active"));
                    } else {
                      layer.setStyle(getStyle(color));
                    }
                  },
                  click: () => handleZoneClick(feature, nextLayer),
                });

                if (feature.properties && feature.properties.NAME_1) {
                  layer.bindPopup(`<b>${feature.properties.NAME_1}</b>`);
                }
              }}
            />
          )
        ))}

        {/* Zoom dynamique lorsque les limites changent */}
        {bounds && <MapZoom bounds={bounds} />}
      </MapContainer>

      {/* Bouton pour revenir à la vue précédente */}
      <Button
        onClick={handleBackToPreviousView}
        className="absolute top-2 left-2 z-[1000]"
      >
        Return 
      </Button>
    </div>
  );
};

export default Map1;
