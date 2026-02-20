import { CONFIG } from './config';

export const fetchMarketPulse = async () => {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/market/pulse`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching market pulse:', error);
    return null;
  }
};

export const fetchArchitectStrategy = async (capital: number, risk: string, horizon: string) => {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/ai/architect?capital=${capital}&risk=${risk}&horizon=${horizon}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching architect strategy:', error);
    return null;
  }
};
