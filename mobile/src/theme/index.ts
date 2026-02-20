export type ThemeColors = {
  primary: string;
  primaryDim: string;
  background: string;
  surface: string;
  institutionalGray: string;
  text: string;
  textDim: string;
  border: string;
  error: string;
  warning: string;
};

export const darkTheme: ThemeColors = {
  primary: '#13ec5b',
  primaryDim: '#0fa842',
  background: '#050505',
  surface: '#0A0A0A',
  institutionalGray: '#121212',
  text: '#FFFFFF',
  textDim: '#64748b',
  border: 'rgba(255, 255, 255, 0.08)',
  error: '#ef4444',
  warning: '#f59e0b',
};

export const lightTheme: ThemeColors = {
  primary: '#0e9e3d', // Slightly darker green for light mode contrast
  primaryDim: '#0a8031',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  institutionalGray: '#F1F5F9',
  text: '#1A202C',
  textDim: '#64748b',
  border: 'rgba(0, 0, 0, 0.05)',
  error: '#dc2626',
  warning: '#d97706',
};

export const theme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fonts: {
    display: 'System', 
    serif: 'System',
  }
};
