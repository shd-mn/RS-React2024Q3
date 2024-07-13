import type { PersonType } from '../../types/peopleType';

import CardItem from './CardItem';
import styles from './ProfileCard.module.css';

interface PropTyes {
  person: PersonType;
}

function PeopleCard({ person }: PropTyes) {
  const { name, height, mass, birth_year, gender } = person;
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3>{name}</h3>
      </header>
      <div className={styles['card-body']}>
        <CardItem infoText="height :" info={`${height} cm`} />
        <CardItem infoText="mass :" info={`${mass} kg`} />
        <CardItem infoText="gender :" info={gender} />
        <CardItem infoText="birth year :" info={birth_year} />
      </div>
    </article>
  );
}

export default PeopleCard;
