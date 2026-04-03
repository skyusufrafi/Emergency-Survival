import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import MapView from '@/components/MapView';
import { mockAdminStats, mockChartData } from '@/services/mockData';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, AlertTriangle, FileWarning, Activity } from 'lucide-react';

const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const dur = 2000;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(interval); }
      else setCount(Math.floor(current));
    }, dur / steps);
    return () => clearInterval(interval);
  }, [target]);
  return <span>{count.toLocaleString()}</span>;
};

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const [alertMsg, setAlertMsg] = useState('');
  const [sent, setSent] = useState(false);

  if (!isAdmin) return <Navigate to="/admin-login" />;

  const stats = [
    { icon: <Users className="w-5 h-5" />, label: 'Total Users', value: mockAdminStats.totalUsers, color: 'text-blue-500' },
    { icon: <AlertTriangle className="w-5 h-5" />, label: 'Active Alerts', value: mockAdminStats.activeAlerts, color: 'text-primary' },
    { icon: <FileWarning className="w-5 h-5" />, label: 'Hazard Reports', value: mockAdminStats.hazardReports, color: 'text-orange-500' },
  ];

  const sendAlert = () => {
    if (!alertMsg.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setAlertMsg(''); }, 3000);
  };

  return (
    <div className="min-h-screen gradient-bg pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Emergency management control center</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
              <div className={`mb-2 ${s.color}`}>{s.icon}</div>
              <p className="text-2xl font-bold"><AnimatedCounter target={s.value} /></p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
            <div className="mb-2 text-primary"><Activity className="w-5 h-5" /></div>
            <p className="text-2xl font-bold text-primary">{mockAdminStats.riskLevel}</p>
            <p className="text-xs text-muted-foreground">Risk Level</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
            <h3 className="font-semibold mb-4">📊 Alerts & Reports Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
                <XAxis dataKey="name" stroke="hsl(220 9% 46%)" fontSize={12} />
                <YAxis stroke="hsl(220 9% 46%)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(220 13% 91%)', borderRadius: '12px' }} />
                <Bar dataKey="alerts" fill="hsl(0 84% 60%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reports" fill="hsl(142 71% 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-5">
            <h3 className="font-semibold mb-4">📈 Activity Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
                <XAxis dataKey="name" stroke="hsl(220 9% 46%)" fontSize={12} />
                <YAxis stroke="hsl(220 9% 46%)" fontSize={12} />
                <Tooltip contentStyle={{ background: 'hsl(0 0% 100%)', border: '1px solid hsl(220 13% 91%)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="reports" stroke="hsl(142 71% 45%)" fill="hsl(142 71% 45% / 0.2)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h3 className="font-semibold mb-3">🗺️ Hazard Zone Map</h3>
            <MapView />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-6 space-y-4">
            <h3 className="font-semibold">📢 Send Emergency Alert</h3>
            <textarea
              value={alertMsg}
              onChange={e => setAlertMsg(e.target.value)}
              placeholder="Type emergency alert message..."
              className="w-full bg-muted rounded-xl p-4 text-sm outline-none resize-none h-32 focus:ring-2 focus:ring-primary/30 border border-border"
            />
            {sent ? (
              <p className="text-sm text-secondary font-semibold">✅ Alert broadcasted to all users</p>
            ) : (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={sendAlert}
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold neon-glow-red">
                Broadcast Alert
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
