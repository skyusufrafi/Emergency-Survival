import { motion } from 'framer-motion';
import { mockAlerts } from '@/services/mockData';

const severityColors: Record<string, string> = {
  critical: 'bg-primary/20 border-primary/40 text-primary',
  high: 'bg-orange-500/20 border-orange-500/40 text-orange-400',
  medium: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400',
};

const AlertsPanel = () => (
  <div className="space-y-3">
    <h3 className="font-semibold text-lg">🔔 Real-Time Alerts</h3>
    {mockAlerts.map((alert, i) => (
      <motion.div
        key={alert.id}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.15 }}
        className={`glass-card p-4 border ${severityColors[alert.severity] || ''}`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-sm">{alert.title}</span>
          <span className="text-xs text-muted-foreground">{alert.time}</span>
        </div>
        <p className="text-xs text-muted-foreground">{alert.message}</p>
      </motion.div>
    ))}
  </div>
);

export default AlertsPanel;
