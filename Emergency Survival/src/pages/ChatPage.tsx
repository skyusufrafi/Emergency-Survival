import Navbar from '@/components/Navbar';
import ChatAssistant from '@/components/ChatAssistant';
import { motion } from 'framer-motion';

const ChatPage = () => (
  <div className="min-h-screen gradient-bg pt-16">
    <Navbar />
    <div className="max-w-2xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">AI Assistant</h1>
        <p className="text-sm text-muted-foreground mb-6">Get instant disaster survival guidance</p>
        <ChatAssistant />
      </motion.div>
    </div>
  </div>
);

export default ChatPage;
