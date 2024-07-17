import useLocalStorage from '../hooks/useLocalStorage';
import SearchForm from '../components/Search/SearchForm';
import ErrorProneComponent from '../components/ErrorBoundary/ErrorProneComponent';
import SimulateError from '../components/ErrorBoundary/SimulateError';
import Content from '../components/Content';
import styles from './Home.module.css';

function Home() {
  const [search, setSearch] = useLocalStorage('searchParam');

  return (
    <>
      <header className={styles.header}>
        <SearchForm search={search} setSearch={setSearch} />
        <SimulateError>
          <ErrorProneComponent />
        </SimulateError>
      </header>

      <main className={styles.main}>
        <Content search={search} />
      </main>
    </>
  );
}

export default Home;
