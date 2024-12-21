"use client";

import { useState } from "react";
import Map1 from "./Map1";
import Map2 from "./MapZoom";
import Map3 from "./Map3";
import Map4 from "./Map4";

const MapSwitcher = () => {
  // State pour suivre la carte actuellement affichée
  const [currentMap, setCurrentMap] = useState("Map1");

  // Gestionnaire de clics
  const handleMapClick = (mapName) => {
    setCurrentMap(mapName); // Mettre à jour la carte affichée
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {currentMap === "Map1" && <Map1 onClick={handleMapClick} />}
      {currentMap === "Map2" && <Map2 onClick={handleMapClick} />}
      {currentMap === "Map3" && <Map3 onClick={handleMapClick} />}
      {currentMap === "Map4" && <Map4 onClick={handleMapClick} />}
    </div>
  );
};

export default MapSwitcher;
