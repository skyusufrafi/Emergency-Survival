import { motion } from 'framer-motion';
import { mockNearbyHelp } from '@/services/mockData';

const NearbyHelp = () => (
  <div className="space-y-3">
    <h3 className="font-semibold text-lg">🏥 Nearby Help</h3>
    {mockNearbyHelp.map((place, i) => (
      <motion.div
        key={place.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className="glass-card-hover p-4 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{place.icon}</span>
          <div>
            <p className="font-medium text-sm">{place.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{place.type}</p>
          </div>
        </div>
        <span className="text-sm text-secondary font-semibold">{place.distance}</span>
      </motion.div>
    ))}
  </div>
);

export default NearbyHelp;
