import { useEffect, useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { baseUrl } from '../constants';
import SearchForm from '../components/Search/SearchForm';
import Cards from '../components/Cards';
import type { PeopleType } from '../types/peopleType';
import styles from './Home.module.css';
import Loading from '../components/Loading';

function Home() {
  const [query, setQuery] = useState(localStorage.getItem('query') ?? '');
  const [people, setPeople] = useState<PeopleType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setIsLoading(true);
      setError(null);
      try {
        const searchQuery = query ? `?search=${query}&page=${currentPage}` : `?page=${currentPage}`;
        const fetchUrl = `${baseUrl}${searchQuery}`;
        const response = await fetch(fetchUrl);

        if (!response.ok) {
          setIsError(true);
          throw new Error(`Unable to Fetch Data, Please check URL or Network connectivity!!`);
        }

        const data = (await response.json()) as PeopleType;

        if (data && data.results.length > 0) {
          setPeople(data);
        } else {
          setPeople(null);
        }
      } catch (err) {
        console.error(err);
        setError((err as Error).message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchData();
  }, [currentPage, query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();
    setCurrentPage(1);
    setQuery(value);
    localStorage.setItem('query', value);
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const simulateError = () => {
    setIsError(true);
  };

  return (
    <>
      <header className={styles.header}>
        <ErrorBoundary fallback="Something went wrong with the search.">
          <SearchForm query={query} handleSubmit={handleSubmit} />
        </ErrorBoundary>
      </header>

      <main className={styles.main}>
        <ErrorBoundary fallback="Something went wrong with the results.">
          {isError ? (
            <p style={{ color: 'red', textAlign: 'center' }}>An error occurred: {error}</p>
          ) : isLoading ? (
            <Loading />
          ) : people ? (
            <Cards
              data={people}
              currentPage={currentPage}
              isError={isError}
              isLoading={isLoading}
              handlePage={handlePage}
              simulateError={simulateError}
            />
          ) : (
            <p style={{ color: 'white', textAlign: 'center' }}>No results found</p>
          )}
        </ErrorBoundary>
      </main>
    </>
  );
}

export default Home;
