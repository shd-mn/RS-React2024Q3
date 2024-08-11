import { ThemeContext } from './ThemeContext';
import useLocalStorage from '../../app/hooks/useLocalStorage';

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  const value = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
