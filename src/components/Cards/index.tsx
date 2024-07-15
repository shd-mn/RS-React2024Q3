import { useSearchParams } from 'react-router-dom';
import PeopleCard from './PeopleCard';
import Loading from '../Loading';
import Pagination from '../Pagination';

import type { PeopleType } from '../../types/peopleType';
import { baseUrl } from '../../constants';
import useFetch from '../../hooks/useFetch';
import styles from './Card.module.css';
import { useState } from 'react';
import ErrorProneComponent from '../ErrorBoundary/ErrorProneComponent';

interface PropTypes {
  search?: string;
}

function Cards({ search }: PropTypes) {
  const [searchParams] = useSearchParams();
  const [isError, setIsError] = useState(false);
  const page = searchParams.get('page') ?? '1';
  const searchQuery = search ? `?search=${search}&page=${page}` : `?page=${page}`;
  const { data, isLoading } = useFetch<PeopleType>(`${baseUrl}/people/${searchQuery}`);

  const simulateError = () => {
    setIsError(true);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (data) {
    return (
      <div className="container">
        <div className={styles.cards}>
          {data.results.map((person, idx) => (
            <PeopleCard person={person} key={idx} />
          ))}
        </div>

        <>
          <button className={styles['error-btn']} onClick={simulateError}>
            Throw Error
          </button>
          {isError && <ErrorProneComponent />}
        </>

        <Pagination totalItems={data.count} />
      </div>
    );
  }
}

export default Cards;
