import { useThemeContext } from '../../../context/ThemeContext';
import moon from '/public/icons/moon-solid.svg';
import sun from '/public/icons/sun-solid.svg';
import Image from 'next/image';

function Theme() {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button type="button" data-testid="theme-btn" style={{ background: 'transparent' }} onClick={toggleTheme}>
      {theme === 'light' ? (
        <Image src={moon} alt="select" width={24} height={24} />
      ) : (
        <Image src={sun} alt="unselect" width={24} height={24} />
      )}
    </button>
  );
}

export default Theme;
