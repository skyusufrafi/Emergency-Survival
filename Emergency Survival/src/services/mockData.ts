export const mockWeather = {
  temp: 28,
  condition: 'Heavy Rain',
  humidity: 89,
  windSpeed: 45,
  alert: 'Flood Warning Active',
  icon: '🌧️',
};

export const mockAlerts = [
  { id: '1', type: 'flood', title: 'Flood Warning', message: 'Heavy rainfall expected. Move to higher ground immediately.', severity: 'high', time: '2 min ago' },
  { id: '2', type: 'cyclone', title: 'Cyclone Alert', message: 'Cyclone approaching coastal areas. Evacuate low-lying zones.', severity: 'critical', time: '15 min ago' },
  { id: '3', type: 'earthquake', title: 'Earthquake Advisory', message: 'Tremors detected in northern region. Stay alert.', severity: 'medium', time: '1 hr ago' },
];

export const mockNearbyHelp = [
  { id: '1', name: 'City General Hospital', type: 'hospital', distance: '1.2 km', icon: '🏥', lat: 28.635, lng: 77.225 },
  { id: '2', name: 'Central Police Station', type: 'police', distance: '0.8 km', icon: '🚓', lat: 28.638, lng: 77.218 },
  { id: '3', name: 'Fire Station #4', type: 'fire', distance: '2.1 km', icon: '🚒', lat: 28.630, lng: 77.230 },
  { id: '4', name: 'Red Cross Relief Camp', type: 'relief', distance: '3.5 km', icon: '⛺', lat: 28.642, lng: 77.210 },
];

export const mockChatResponses: Record<string, string> = {
  flood: "🌊 **Flood Safety Steps:**\n1. Move to higher ground immediately\n2. Avoid walking through flowing water\n3. Stay away from power lines\n4. Call emergency services if trapped\n5. Keep emergency kit ready",
  earthquake: "🏚️ **Earthquake Safety:**\n1. DROP, COVER, and HOLD ON\n2. Stay away from windows\n3. If outdoors, move to open area\n4. After shaking stops, check for injuries\n5. Be prepared for aftershocks",
  fire: "🔥 **Fire Emergency:**\n1. Alert everyone and evacuate\n2. Stay low under smoke\n3. Feel doors before opening\n4. Use stairs, never elevators\n5. Call 911 from safe location",
  default: "🤖 I'm your AI Disaster Response Assistant. I can help you with:\n- **Flood** safety instructions\n- **Earthquake** preparedness\n- **Fire** emergency procedures\n- **Cyclone** evacuation guidance\n\nType a disaster type or describe your situation.",
};

export const getAIResponse = (message: string): string => {
  const lower = message.toLowerCase();
  if (lower.includes('flood') || lower.includes('water') || lower.includes('rain')) return mockChatResponses.flood;
  if (lower.includes('earthquake') || lower.includes('quake') || lower.includes('tremor')) return mockChatResponses.earthquake;
  if (lower.includes('fire') || lower.includes('burn')) return mockChatResponses.fire;
  return mockChatResponses.default;
};

export const mockAdminStats = {
  totalUsers: 12847,
  activeAlerts: 23,
  hazardReports: 156,
  riskLevel: 'High',
};

export const mockChartData = [
  { name: 'Mon', alerts: 4, reports: 12 },
  { name: 'Tue', alerts: 7, reports: 19 },
  { name: 'Wed', alerts: 12, reports: 28 },
  { name: 'Thu', alerts: 8, reports: 15 },
  { name: 'Fri', alerts: 15, reports: 32 },
  { name: 'Sat', alerts: 22, reports: 45 },
  { name: 'Sun', alerts: 18, reports: 38 },
];
