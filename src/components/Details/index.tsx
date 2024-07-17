import { useNavigate, useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { baseUrl } from '../../constants';
import Loading from '../Loading';
import CardInfo from '../Card/CardInfo';

import type { PersonType } from '../../types/peopleType';
import styles from './Details.module.css';

function Details() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const detailsParam = searchParams.get('details');
  const { data, isLoading, error } = useFetch<PersonType>(`${baseUrl}/people/${detailsParam}`);

  const handleCloseDetails = () => {
    navigate(`?page=${searchParams.get('page')}`);
  };

  if (isLoading) {
    return (
      <aside className={styles.details}>
        <Loading />
      </aside>
    );
  }

  if (error) {
    return (
      <aside className={styles.details}>
        <p className={styles.error}>{error}</p>;
      </aside>
    );
  }

  if (data) {
    const { name, height, mass, birth_year, gender, skin_color, eye_color, hair_color } = data;

    return (
      <aside className={styles.details}>
        <header className={styles.header}>
          <h3>Details</h3>
          <button className={styles.btn} onClick={handleCloseDetails}>
            close
          </button>
        </header>
        <ul className={styles.content}>
          <CardInfo infoText="name: " info={name} />
          <CardInfo infoText="height :" info={`${height} cm`} />
          <CardInfo infoText="mass :" info={`${mass} kg`} />
          <CardInfo infoText="gender :" info={gender} />
          <CardInfo infoText="birth year :" info={birth_year} />
          <CardInfo infoText="skin color :" info={skin_color} />
          <CardInfo infoText="eye color :" info={eye_color} />
          <CardInfo infoText="haircolor :" info={hair_color} />
        </ul>
      </aside>
    );
  }
}

export default Details;
