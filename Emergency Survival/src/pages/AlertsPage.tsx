import Navbar from '@/components/Navbar';
import AlertsPanel from '@/components/AlertsPanel';
import { motion } from 'framer-motion';
import { useState } from 'react';

const AlertsPage = () => {
  const [report, setReport] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReport = () => {
    if (!report.trim()) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setReport(''); }, 3000);
  };

  return (
    <div className="min-h-screen gradient-bg pt-16">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold mb-1">Alert Center</h1>
          <p className="text-sm text-muted-foreground mb-6">Live alerts & crowd-sourced hazard reports</p>
        </motion.div>

        <AlertsPanel />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 space-y-4"
        >
          <h3 className="font-semibold">🤝 Report a Hazard</h3>
          <textarea
            value={report}
            onChange={e => setReport(e.target.value)}
            placeholder="Describe the hazard you've spotted..."
            className="w-full bg-muted rounded-xl p-4 text-sm outline-none resize-none h-24 focus:ring-1 focus:ring-primary/50"
          />
          {submitted ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-secondary font-semibold">
              ✅ Report submitted — thank you for helping your community!
            </motion.p>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReport}
              className="px-6 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
            >
              Submit Report
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AlertsPage;
