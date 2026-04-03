import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { LogOut, Globe } from 'lucide-react';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const { lang, setLang, t } = useLang();
  const location = useLocation();

  const links = [
    { to: '/dashboard', label: t('dashboard') },
    { to: '/chat', label: t('chat') },
    { to: '/alerts', label: t('alerts') },
  ];

  if (isAdmin) links.push({ to: '/admin', label: t('admin') });

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border px-6 py-3 flex items-center justify-between"
    >
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Emergency Survival" width={28} height={28} />
        <span className="font-bold text-lg text-primary">Emergency Survival</span>
      </Link>

      <div className="flex items-center gap-1">
        {user && links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              location.pathname === l.to ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          className="p-2 rounded-lg bg-muted text-xs font-medium flex items-center gap-1"
        >
          <Globe className="w-3 h-3" />
          {lang.toUpperCase()}
        </button>
        {user && (
          <button onClick={logout} className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
