import React, { createContext, useContext, useState, ReactNode } from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    tagline: 'AI that guides you when every second matters.',
    getStarted: 'Get Started',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    name: 'Full Name',
    sos: 'SOS Emergency',
    dashboard: 'Dashboard',
    chat: 'AI Assistant',
    alerts: 'Alerts',
    map: 'Live Map',
    weather: 'Weather',
    admin: 'Admin',
    logout: 'Logout',
    sosSuccess: 'SOS Alert Sent Successfully!',
    nearbyHelp: 'Nearby Help',
    riskLevel: 'Risk Level',
    sendAlert: 'Send Alert',
    totalUsers: 'Total Users',
    activeAlerts: 'Active Alerts',
    hazardReports: 'Hazard Reports',
    simulate: 'Simulate Disaster Scenario',
  },
  hi: {
    tagline: 'AI जो हर सेकंड में आपका मार्गदर्शन करता है।',
    getStarted: 'शुरू करें',
    login: 'लॉगिन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    name: 'पूरा नाम',
    sos: 'SOS आपातकाल',
    dashboard: 'डैशबोर्ड',
    chat: 'AI सहायक',
    alerts: 'अलर्ट',
    map: 'लाइव मैप',
    weather: 'मौसम',
    admin: 'एडमिन',
    logout: 'लॉगआउट',
    sosSuccess: 'SOS अलर्ट सफलतापूर्वक भेजा गया!',
    nearbyHelp: 'पास की मदद',
    riskLevel: 'जोखिम स्तर',
    sendAlert: 'अलर्ट भेजें',
    totalUsers: 'कुल उपयोगकर्ता',
    activeAlerts: 'सक्रिय अलर्ट',
    hazardReports: 'खतरे की रिपोर्ट',
    simulate: 'आपदा परिदृश्य सिमुलेट करें',
  },
};

interface LangContextType {
  lang: string;
  setLang: (l: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LangContextType | null>(null);

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be inside LanguageProvider');
  return ctx;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState('en');
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
