import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse } from '@/services/mockData';
import { Send, Mic } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'ai', content: getAIResponse('') },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const aiMsg: Message = { id: crypto.randomUUID(), role: 'ai', content: getAIResponse(text) };
      setMessages(prev => [...prev, aiMsg]);
      setTyping(false);
    }, 1200);
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    setListening(true);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setListening(false);
      sendMessage(text);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <div className="glass-card flex flex-col h-[500px]">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">🤖 AI Disaster Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-primary/20 border border-primary/30 rounded-br-sm'
                    : 'bg-muted rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1 p-3"
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-muted-foreground rounded-full"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t border-border flex gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleVoice}
          className={`p-3 rounded-xl ${listening ? 'bg-primary neon-glow-red' : 'bg-muted'} transition-all`}
        >
          <Mic className="w-4 h-4" />
        </motion.button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          placeholder="Describe your emergency..."
          className="flex-1 bg-muted rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary/50"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => sendMessage(input)}
          className="p-3 rounded-xl bg-primary"
        >
          <Send className="w-4 h-4 text-primary-foreground" />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatAssistant;
