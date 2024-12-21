import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";

interface MapZoomProps {
  bounds: LatLngBounds;
}

const MapZoom: React.FC<MapZoomProps> = ({ bounds }) => {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);
  
  return null;
};

export default MapZoom;

