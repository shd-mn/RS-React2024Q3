import { Component } from 'react';
import type { PersonType } from '../../types/peopleType';

import CardItem from './CardItem';
import styles from './ProfileCard.module.css';

interface Props {
  person: PersonType;
}

export class PeopleCard extends Component<Props> {
  render() {
    const { name, height, mass, birth_year, gender } = this.props.person;

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
}

export default PeopleCard;
