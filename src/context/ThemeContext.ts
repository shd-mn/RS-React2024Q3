import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const defaultContextValue = {
  theme: 'light',
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const useThemeContext = () => useContext(ThemeContext);
