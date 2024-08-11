import Image from 'next/image';
import SimulateError from '../ErrorBoundary/SimulateError';
import { useThemeContext } from '../../context/ThemeContext';
import SearchForm from '../Search/SearchForm';
import logo from '/public/logo.webp';
import Theme from '../UI/Theme';
import styles from './Header.module.css';

function Header() {
  const { theme } = useThemeContext();

  return (
    <header className={styles.header} data-theme={theme}>
      <div className="container">
        <div className={styles.hero}>
          <div className={styles['img-box']}>
            <Image className={styles.img} src={logo} alt="Star Wars Logo" width={800} height={400} priority />
          </div>
          <SearchForm />
          <div className={styles['header-action']}>
            <Theme />
            <SimulateError />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
