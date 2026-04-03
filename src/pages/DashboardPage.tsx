import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import WeatherCard from '@/components/WeatherCard';
import MapView from '@/components/MapView';
import SOSButton from '@/components/SOSButton';
import AlertsPanel from '@/components/AlertsPanel';
import NearbyHelp from '@/components/NearbyHelp';

const DashboardPage = () => {
  return (
    <div className="min-h-screen gradient-bg pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-2xl font-bold mb-1">Command Center</h1>
          <p className="text-sm text-muted-foreground">Real-time disaster intelligence dashboard</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Map + Weather */}
          <div className="lg:col-span-2 space-y-6">
            <MapView />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WeatherCard />
              <NearbyHelp />
            </div>
          </div>

          {/* Right: SOS + Alerts */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="font-semibold mb-4 text-center">🆘 Emergency SOS</h3>
              <SOSButton />
            </motion.div>
            <AlertsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
