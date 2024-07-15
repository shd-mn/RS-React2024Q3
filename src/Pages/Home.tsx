import { Outlet, useSearchParams } from 'react-router-dom';
import Cards from '../components/Cards';
import styles from './Home.module.css';
import useLocalStorage from '../hooks/useLocalStorage';
import SearchForm from '../components/Search/SearchForm';

function Home() {
  const [search, setSearch] = useLocalStorage('searchParam');
  const [searchParams] = useSearchParams();
  const detailsParam = searchParams.get('details');
  return (
    <>
      <header className={styles.header}>
        <SearchForm search={search} setSearch={setSearch} />
      </header>
      <main className={styles.main}>
        <Cards search={search} />
        {detailsParam && <Outlet />}
      </main>
    </>
  );
}

export default Home;
