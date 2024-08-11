import SimulateError from '../ErrorBoundary/SimulateError';
import { useThemeContext } from '~/context/ThemeContext';
import Theme from '../Theme';
import SearchForm from '../Search/SearchForm';
import logo from '/logo.webp';
import styles from './Header.module.css';

function Header() {
  const { theme } = useThemeContext();

  return (
    <header className={styles.header} data-theme={theme}>
      <div className="container">
        <div className={styles.hero}>
          <div className={styles['img-box']}>
            <img className={styles.img} src={logo} alt="Star Wars Logo" />
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
