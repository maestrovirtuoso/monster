"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { LatLngExpression, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";

// Importation des fichiers GeoJSON
import cm1 from "../../data/cm1.geojson.json"; // Pays
import cm2 from "../../data/cm2.geojson.json"; // Régions
import cm3 from "../../data/cm3.geojson.json"; // Départements
import cm4 from "../../data/cm4.geojson.json"; // Arrondissements

const Map = () => {
  const position: LatLngExpression = [4.570868, 12.341234]; // Cameroun
  const zoomLevel = 6;

  // Etat pour la gestion de la couche visible
  const [visibleLayer, setVisibleLayer] = useState("cm2");
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [activeZone, setActiveZone] = useState(null);

  // Sauvegarder le niveau de zoom et la position de la carte avant le zoom
  const [prevPosition, setPrevPosition] = useState<LatLngExpression>(position);
  const [prevZoomLevel, setPrevZoomLevel] = useState<number>(zoomLevel);

  const layers = {
    cm1: { data: cm1, color: "gray", nextLayer: "cm2" },
    cm2: { data: cm2, color: "green", nextLayer: "cm3" },
    cm3: { data: cm3, color: "blue", nextLayer: "cm4" },
    cm4: { data: cm4, color: "orange", nextLayer: null },
  };

  const getDefaultStyle = (color: string) => ({
    color,
    weight: 1,
    fillOpacity: 0.5,
  });

  const getHoverStyle = (color: string) => ({
    color,
    weight: 3,
    fillOpacity: 0.7,
  });

  // Fonction pour gérer le clic sur une zone
  const handleZoneClick = (feature, nextLayer) => {
    if (feature.geometry) {
      const coordinates = feature.geometry.coordinates;
      const bounds = new LatLngBounds(
        coordinates[0].map((coord) => [coord[1], coord[0]])
      );
      setBounds(bounds);
    }

    // Sauvegarde de la position et du niveau de zoom actuels avant de zoomer sur la zone
    setPrevPosition([4.570868, 12.341234]);
    setPrevZoomLevel(zoomLevel);

    if (nextLayer) {
      setVisibleLayer(nextLayer);
    }

    setActiveZone(feature);
  };

  const MapZoom = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
      if (bounds) {
        map.fitBounds(bounds);
      }
    }, [bounds, map]);
    return null;
  };

  // Effect de clignotement basé sur la zone active
  useEffect(() => {
    if (!activeZone) return;

    const layer = activeZone.layer;
    let isYellow = false;
    const originalColor = activeZone.color;

    const interval = setInterval(() => {
      isYellow = !isYellow;
      layer.setStyle({
        color: isYellow ? "yellow" : originalColor,
      });
    }, 500);

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, [activeZone]);

  const handleLayerToggle = () => {
    const currentIndex = Object.keys(layers).indexOf(visibleLayer);
    const nextIndex = (currentIndex + 1) % Object.keys(layers).length; // Bascule à la couche suivante
    const nextLayer = Object.keys(layers)[nextIndex];
    setVisibleLayer(nextLayer);
  };

  const handleBackToPreviousView = () => {
    const map = useMap();
    map.setView(prevPosition, prevZoomLevel); // Revenir à la position et au niveau de zoom précédents
    setVisibleLayer("cm2"); // Réinitialise la couche visible si besoin
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={zoomLevel}
        style={{ height: "100%", width: "100%" }}
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
              style={getDefaultStyle(color)}
              onEachFeature={(feature, layer) => {
                layer.on({
                  mouseover: () => layer.setStyle(getHoverStyle(color)),
                  mouseout: () => layer.setStyle(getDefaultStyle(color)),
                  click: () => handleZoneClick(feature, nextLayer),
                });

                // Ajout de popup
                if (feature.properties && feature.properties.NAME_1) {
                  layer.bindPopup(`<b>${feature.properties.NAME_1}</b>`);
                }
                feature.layer = layer; // Garder une référence pour le clignotement
                feature.color = color; // Stocker la couleur pour le clignotement
              }}
            />
          )
        ))}

        {bounds && <MapZoom bounds={bounds} />}

        <button
          onClick={handleLayerToggle}
          style={{
            position: "absolute",
            top: "50px",
            left: "10px",
            zIndex: 1000,
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "5px",
            border: "1px solid black",
          }}
        >
          Basculer la couche
        </button>

        <button
          onClick={handleBackToPreviousView}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1000,
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "5px",
            border: "1px solid black",
          }}
        >
          Retour à la vue précédente
        </button>
      </MapContainer>
    </div>
  );
};

export default Map;