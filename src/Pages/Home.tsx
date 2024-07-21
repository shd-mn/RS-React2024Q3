import { useThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Content from '../components/Content';
import styles from './Home.module.css';

function Home() {
  const { theme } = useThemeContext();
  return (
    <>
      <Header />

      <main className={styles.main} data-theme={theme}>
        <Content />
      </main>
    </>
  );
}

export default Home;
