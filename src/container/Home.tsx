import { Component } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { baseUrl } from '../constants';
import SearchForm from '../components/Search/SearchForm';
import Cards from '../components/Cards';
import { PeopleType } from '../types/peopleType';
import styles from './Home.module.css';
interface HomeState {
  query: string;
  data: PeopleType | null;
  currentPage: number;
  isLoading: boolean;
  error: null | Error;
  isError: boolean;
}
class Home extends Component<object, HomeState> {
  state = {
    query: localStorage.getItem('query') ?? '',
    data: null,
    currentPage: 1,
    isLoading: true,
    error: null,
    isError: false,
  };

  fetchData = (page?: number) => {
    this.setState({ isLoading: true });
    const { query, currentPage } = this.state;
    const searchQuery = query ? `?search=${query}&page=${page ?? currentPage}` : `?page=${page ?? currentPage}`;
    const fetchUrl = `${baseUrl}${searchQuery}`;
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data: PeopleType) => {
        if (data && data.results.length > 0) {
          this.setState({
            data,
            currentPage: page ?? currentPage,
            isLoading: false,
          });
          localStorage.setItem('query', this.state.query);
        } else {
          this.setState({
            data: null,
            currentPage: 1,
            isLoading: false,
          });
        }
      })
      .catch((error: Error) => {
        console.error(error);
        this.setState({ error, isLoading: false });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(_: object, prevState: HomeState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchData();
    }
  }

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value.trim() });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.fetchData(1);
  };

  handlePage = (page: number) => {
    this.setState({ currentPage: page });
  };

  simulateError = () => {
    this.setState({ isError: true });
  };

  render() {
    const { query, data, currentPage, isLoading, isError } = this.state;
    return (
      <>
        <header className={styles.header}>
          <ErrorBoundary fallback="Something went wrong with the search.">
            <SearchForm query={query} handleSearch={this.handleSearch} handleSubmit={this.handleSubmit} />
          </ErrorBoundary>
        </header>

        <main className={styles.main}>
          <ErrorBoundary fallback="Something went wrong with the results.">
            {data ? (
              <Cards
                data={data}
                currentPage={currentPage}
                isError={isError}
                isLoading={isLoading}
                handlePage={this.handlePage}
                simulateError={this.simulateError}
              />
            ) : (
              !isLoading && <p style={{ color: 'white', textAlign: 'center' }}>No results found</p>
            )}
          </ErrorBoundary>
        </main>
      </>
    );
  }
}

export default Home;
