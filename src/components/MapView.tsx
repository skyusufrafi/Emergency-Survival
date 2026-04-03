import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const userIcon = new L.DivIcon({
  html: '<div style="width:16px;height:16px;background:#3b82f6;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(59,130,246,0.5)"></div>',
  iconSize: [16, 16],
  className: '',
});

const helpIcons: Record<string, L.DivIcon> = {
  hospital: new L.DivIcon({ html: '<div style="font-size:24px">🏥</div>', iconSize: [24, 24], className: '' }),
  police: new L.DivIcon({ html: '<div style="font-size:24px">🚓</div>', iconSize: [24, 24], className: '' }),
  fire: new L.DivIcon({ html: '<div style="font-size:24px">🚒</div>', iconSize: [24, 24], className: '' }),
  relief: new L.DivIcon({ html: '<div style="font-size:24px">⛺</div>', iconSize: [24, 24], className: '' }),
};

const nearbyPlaces = [
  { name: 'City General Hospital', type: 'hospital', lat: 19.086, lng: 72.878 },
  { name: 'Central Police Station', type: 'police', lat: 19.082, lng: 72.884 },
  { name: 'Fire Station #4', type: 'fire', lat: 19.072, lng: 72.870 },
  { name: 'Red Cross Relief Camp', type: 'relief', lat: 19.090, lng: 72.865 },
];

function LocationUpdater({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
}

const MapView = () => {
  const [position, setPosition] = useState<[number, number]>([19.076, 72.8777]); // Mumbai default
  const [locationName, setLocationName] = useState('Mumbai, India');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setPosition(coords);
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`);
            const data = await res.json();
            const city = data.address?.city || data.address?.town || data.address?.village || '';
            const country = data.address?.country || '';
            setLocationName(city ? `${city}, ${country}` : country || 'Your Location');
          } catch {
            setLocationName('Your Location');
          }
          setLoading(false);
        },
        () => setLoading(false),
        { enableHighAccuracy: true }
      );
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card overflow-hidden relative"
      style={{ height: 400 }}
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      ) : (
        <MapContainer
          center={position}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationUpdater position={position} />
          <Marker position={position} icon={userIcon}>
            <Popup>📍 You are here</Popup>
          </Marker>
          {nearbyPlaces.map((place) => (
            <Marker
              key={place.name}
              position={[
                position[0] + (place.lat - 19.076),
                position[1] + (place.lng - 72.8777),
              ]}
              icon={helpIcons[place.type]}
            >
              <Popup>{place.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      <div className="absolute bottom-3 left-3 z-[1000] glass-card p-2 px-3 text-xs">
        <span className="text-blue-500 font-bold">●</span> {locationName} &nbsp;
        <span className="text-primary font-bold">●</span> Nearby Help
      </div>
    </motion.div>
  );
};

export default MapView;
