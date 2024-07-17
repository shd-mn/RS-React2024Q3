import { useSearchParams } from 'react-router-dom';
import type { PersonType } from '../../types/peopleType';

import CardInfo from './CardInfo';
import styles from './Card.module.css';
import { findId } from '../../utils/findId';

interface PropTyes {
  person: PersonType;
}

function Card({ person }: PropTyes) {
  const { name, birth_year, gender, url } = person;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const detail = findId(url);

  const handlePage = () => {
    setSearchParams({ page: page, details: detail });
  };

  return (
    <button className={styles.card} onClick={handlePage}>
      <header className={styles.header}>
        <h3>{name}</h3>
      </header>
      <div className={styles['card-body']}>
        <CardInfo infoText="gender :" info={gender} />
        <CardInfo infoText="birth year :" info={birth_year} />
      </div>
    </button>
  );
}

export default Card;
