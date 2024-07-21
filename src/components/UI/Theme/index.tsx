import { useThemeContext } from '../../../context/ThemeContext';
import moon from '/icons/moon-solid.svg';
import sun from '/icons/sun-solid.svg';
function Theme() {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <button type="button" onClick={toggleTheme}>
      {theme === 'light' ? <img src={moon} alt="select" /> : <img src={sun} alt="unselect" />}
    </button>
  );
}

export default Theme;
