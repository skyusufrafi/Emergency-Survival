import { motion } from 'framer-motion';
import { mockWeather } from '@/services/mockData';

const WeatherCard = () => {
  const w = mockWeather;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 space-y-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Weather Intel</h3>
        <span className="text-3xl">{w.icon}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-muted/50">
          <p className="text-xs text-muted-foreground">Temperature</p>
          <p className="text-xl font-bold">{w.temp}°C</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50">
          <p className="text-xs text-muted-foreground">Condition</p>
          <p className="text-sm font-semibold">{w.condition}</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50">
          <p className="text-xs text-muted-foreground">Humidity</p>
          <p className="text-xl font-bold">{w.humidity}%</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50">
          <p className="text-xs text-muted-foreground">Wind</p>
          <p className="text-xl font-bold">{w.windSpeed} km/h</p>
        </div>
      </div>
      <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
        <p className="text-sm font-semibold text-primary">⚠️ {w.alert}</p>
        <p className="text-xs text-muted-foreground mt-1">AI: Heavy rain detected — Move to higher ground</p>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
