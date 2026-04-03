import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, MapPin, Radio, Shield } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import logo from '@/assets/logo.png';

const LandingPage = () => {
  const { t } = useLang();

  const features = [
    { icon: <Zap className="w-6 h-6" />, title: 'AI Intelligence', desc: 'Real-time survival guidance powered by AI' },
    { icon: <MapPin className="w-6 h-6" />, title: 'Live Tracking', desc: 'GPS location & smart navigation to safety' },
    { icon: <Radio className="w-6 h-6" />, title: 'SOS System', desc: 'Instant emergency alerts to all services' },
    { icon: <Shield className="w-6 h-6" />, title: 'Risk Prediction', desc: 'AI-powered hazard assessment & heatmaps' },
  ];

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-2xl"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            Disaster Response Intelligence Platform
          </motion.div>

          <div className="flex justify-center">
            <img src={logo} alt="Emergency Survival" width={80} height={80} />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-primary">Emergency Survival</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            {t('tagline')}
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold neon-glow-red"
              >
                {t('getStarted')}
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-2xl glass-card text-foreground font-semibold"
              >
                {t('simulate')}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="px-6 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="glass-card-hover p-5 text-center space-y-3"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
