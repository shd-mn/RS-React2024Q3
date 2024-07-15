import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Details.module.css';
import useFetch from '../../hooks/useFetch';
import { baseUrl } from '../../constants';
import Loading from '../Loading';
import { PlanetType } from '../../types/planetType';
import CardItem from '../Cards/CardItem';
function Details() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const planetId = searchParams.get('details');
  const { data, isLoading } = useFetch<PlanetType>(`${baseUrl}/planets/${planetId}`);

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

  if (data) {
    const { name, diameter, gravity, climate, terrain, population } = data;

    return (
      <aside className={styles.details}>
        <header className={styles.header}>
          <h3>Homeworld</h3>
          <button className={styles.btn} onClick={handleCloseDetails}>
            close
          </button>
        </header>
        <ul className={styles.content}>
          <CardItem infoText="name: " info={name} />
          <CardItem infoText="population: " info={population} />
          <CardItem infoText="climate: " info={climate} />
          <CardItem infoText="terrain: " info={terrain} />
          <CardItem infoText="gravity: " info={gravity} />
          <CardItem infoText="diameter: " info={diameter} />
        </ul>
      </aside>
    );
  }
}

export default Details;
