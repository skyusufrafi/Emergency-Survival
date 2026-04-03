import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';

const SOSButton = () => {
  const [activated, setActivated] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { t } = useLang();

  const handleSOS = () => {
    setActivated(true);
    setTimeout(() => {
      setShowResult(true);
    }, 2000);
  };

  const reset = () => {
    setActivated(false);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {!activated ? (
          <motion.button
            key="sos"
            onClick={handleSOS}
            className="relative w-32 h-32 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl animate-pulse-glow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <span className="relative z-10">SOS</span>
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          </motion.button>
        ) : !showResult ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-32 h-32 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-muted-foreground animate-pulse">Sending SOS Alert...</p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 max-w-sm w-full text-center space-y-4"
          >
            <div className="text-4xl">✅</div>
            <h3 className="text-xl font-bold neon-text-green text-secondary">{t('sosSuccess')}</h3>
            <div className="space-y-3 text-left">
              {[
                { icon: '🚑', name: 'City General Hospital', eta: '~8 min' },
                { icon: '🚒', name: 'Fire Station #4', eta: '~12 min' },
                { icon: '🚓', name: 'Central Police Station', eta: '~6 min' },
              ].map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                >
                  <span>{s.icon} {s.name}</span>
                  <span className="text-secondary text-sm font-semibold">{s.eta}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Your location has been shared with emergency services</p>
            <button onClick={reset} className="mt-2 text-sm text-primary underline">Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SOSButton;
