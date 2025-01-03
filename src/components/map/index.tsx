import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Maps = () => {
  const icon = L.icon({
    iconUrl: '/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="w-full">
      <MapContainer
        className="h-[300px] w-full"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} icon={icon}>
          <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Maps;