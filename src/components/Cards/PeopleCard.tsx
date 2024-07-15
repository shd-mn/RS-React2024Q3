import { useSearchParams } from 'react-router-dom';
import type { PersonType } from '../../types/peopleType';

import CardItem from './CardItem';
import styles from './ProfileCard.module.css';
import { findPlanetId } from '../../utils/findPlanetId';

interface PropTyes {
  person: PersonType;
}

function PeopleCard({ person }: PropTyes) {
  const { name, height, mass, birth_year, gender, homeworld } = person;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const detail = findPlanetId(homeworld);

  const handlePage = () => {
    setSearchParams({ page: page, details: detail });
  };

  return (
    <button className={styles.card} onClick={handlePage}>
      <header className={styles.header}>
        <h3>{name}</h3>
      </header>
      <div className={styles['card-body']}>
        <CardItem infoText="height :" info={`${height} cm`} />
        <CardItem infoText="mass :" info={`${mass} kg`} />
        <CardItem infoText="gender :" info={gender} />
        <CardItem infoText="birth year :" info={birth_year} />
      </div>
    </button>
  );
}

export default PeopleCard;
