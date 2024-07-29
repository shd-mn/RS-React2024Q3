import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../Loading';
import CardInfo from '../Card/CardInfo';

import styles from './Details.module.css';
import { useGetCharacterQuery } from '../../redux/services/swapiApi';

function Details() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const detailsParam = searchParams.get('details') || '';

  const { data, error, isFetching } = useGetCharacterQuery({ id: detailsParam });

  const handleCloseDetails = () => {
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    navigate(`?search=${search}&page=${page}`);
  };

  if (isFetching) {
    return (
      <aside className={styles.details}>
        <Loading />
      </aside>
    );
  }

  if (error) {
    if ('status' in error) {
      return (
        <div className={styles['not-found']}>
          An error has occurred: <span>{error.status}</span>
        </div>
      );
    }
    return <div className={styles['not-found']}>{error.message}</div>;
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
