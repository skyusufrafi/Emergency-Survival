import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import logo from '@/assets/logo.png';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password || (isSignup && !name)) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    const success = isSignup ? await signup(name, email, password) : await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError(isSignup ? 'Email already in use' : 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 w-full max-w-md space-y-6"
      >
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={logo} alt="Emergency Survival" width={32} height={32} />
            <span className="text-2xl font-bold text-primary">Emergency Survival</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            {isSignup ? t('signup') : t('login')}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('name')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted outline-none text-sm focus:ring-2 focus:ring-primary/30 border border-border"
                />
              </div>
            </motion.div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('email')}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted outline-none text-sm focus:ring-2 focus:ring-primary/30 border border-border"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={t('password')}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted outline-none text-sm focus:ring-2 focus:ring-primary/30 border border-border"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold neon-glow-red disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : isSignup ? t('signup') : t('login')}
          </motion.button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <button onClick={() => { setIsSignup(!isSignup); setError(''); }} className="text-primary hover:underline">
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs text-muted-foreground"><span className="bg-card px-2">or</span></div>
        </div>

        <Link to="/admin-login" className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors">
          Admin Access →
        </Link>
      </motion.div>
    </div>
  );
};

export default LoginPage;
