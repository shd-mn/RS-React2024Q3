import type { PeopleType } from '../../types/peopleType';
import Pagination from '../Pagination';
import PeopleCard from './PeopleCard';
import Loading from '../Loading';
import ErrorProneComponent from '../ErrorBoundary/ErrorProneComponent';
import styles from './Card.module.css';

interface CardProps {
  data: PeopleType;
  currentPage: number;
  isError: boolean;
  isLoading: boolean;
  handlePage: (page: number) => void;
  simulateError: () => void;
}

function Cards({ data, currentPage, isError, isLoading, handlePage, simulateError }: CardProps) {
  const { count, results: people } = data;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container">
      <button className={styles['error-btn']} onClick={simulateError}>
        Throw Error
      </button>
      <div className={styles.cards}>
        {people.length > 0 && people.map((person, idx) => <PeopleCard person={person} key={idx} />)}
      </div>
      {isError && <ErrorProneComponent />}
      <Pagination currentPage={currentPage} totalItems={count} handlePage={handlePage} />
    </div>
  );
}

export default Cards;
