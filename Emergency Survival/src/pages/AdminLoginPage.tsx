import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { User, Lock, AlertCircle } from 'lucide-react';
import logo from '@/assets/logo.png';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (adminLogin(username, code)) {
      navigate('/admin');
    } else {
      setError('Invalid admin credentials');
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
          <img src={logo} alt="Emergency Survival" width={40} height={40} className="mx-auto" />
          <h2 className="text-xl font-bold">Admin Access</h2>
          <p className="text-sm text-muted-foreground">Restricted area — authorized personnel only</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive">
              <AlertCircle className="w-4 h-4" />{error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted outline-none text-sm focus:ring-2 focus:ring-primary/30 border border-border" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input type="password" value={code} onChange={e => setCode(e.target.value)} placeholder="Secret Code"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted outline-none text-sm focus:ring-2 focus:ring-primary/30 border border-border" />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold neon-glow-red">
            Access Dashboard
          </motion.button>
        </form>

        <Link to="/login" className="block text-center text-xs text-muted-foreground hover:text-primary">
          ← Back to User Login
        </Link>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
