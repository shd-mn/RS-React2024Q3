import { createContext, useContext } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: (value: string) => void;
};

const defaultContextValue = {
  theme: 'dark',
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const useThemeContext = () => useContext(ThemeContext);
