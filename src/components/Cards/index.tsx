import { Component } from 'react';
import type { PeopleType } from '../../types/peopleType';
import Pagination from '../Pagination';
import PeopleCard from './PeopleCard';
import Loading from '../Loading';
import ErrorProneComponent from '../ErrorBoundary/ErrorProneComponent';
import styles from './Card.module.css';

interface CardProp {
  data: PeopleType;
  currentPage: number;
  isError: boolean;
  isLoading: boolean;
  handlePage: (page: number) => void;
  simulateError: () => void;
}

class Cards extends Component<CardProp> {
  render() {
    const {
      data: { count, results: people },
      isError,
      isLoading,
      simulateError,
    } = this.props;

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
        <Pagination currentPage={this.props.currentPage} totalItems={count} handlePage={this.props.handlePage} />
      </div>
    );
  }
}

export default Cards;
