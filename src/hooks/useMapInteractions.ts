import { useState, useCallback } from "react";
import { LatLngBounds, latLngBounds } from "leaflet";

export const useMapInteractions = (initialPosition, initialZoomLevel) => {
  const [visibleLayer, setVisibleLayer] = useState("cm1"); // Couche par défaut
  const [activeZone, setActiveZone] = useState(null); // Zone active
  const [bounds, setBounds] = useState<LatLngBounds | null>(null); // Limites du zoom
  const [layerHistory, setLayerHistory] = useState(["cm1"]); // Historique des couches

  // Gestion du clic sur une zone
  const handleZoneClick = useCallback((feature, nextLayer) => {
    if (feature.geometry) {
      const coordinates = feature.geometry.coordinates;

      // Calculer les limites pour le zoom
      const newBounds = latLngBounds(
        coordinates[0].map((coord) => [coord[1], coord[0]])
      );
      setBounds(newBounds);
    }

    // Changer de couche si une couche suivante existe
    if (nextLayer) {
      setVisibleLayer(nextLayer);
      setLayerHistory((prev) => [...prev, nextLayer]);
    }

    setActiveZone(feature);
  }, []);

  const handleBackToPreviousView = useCallback(() => {
    if (layerHistory.length > 1) {
      const updatedHistory = [...layerHistory];
      updatedHistory.pop(); // Retirer la dernière couche de l'historique
      const previousLayer = updatedHistory[updatedHistory.length - 1]; // Obtenir la couche précédente
  
      setLayerHistory(updatedHistory); // Mettre à jour l'historique des couches
      setVisibleLayer(previousLayer); // Afficher la couche précédente
  
      // Réinitialiser la zone active et les limites
      setActiveZone(null); // Réinitialiser la zone active
      setBounds(null); // Réinitialiser les limites de zoom
    } else {
      // Si l'historique est vide ou qu'on est déjà à la couche initiale, revenir à la vue de départ
      setVisibleLayer("cm2"); // Réinitialiser à la couche initiale
      setBounds(latLngBounds(initialPosition, initialPosition)); // Réinitialiser les limites
      setActiveZone(null); // Aucune zone active
    }
  }, [layerHistory, initialPosition]);

  return {
    visibleLayer,
    bounds,
    activeZone,
    handleZoneClick,
    handleBackToPreviousView,
  };
};
