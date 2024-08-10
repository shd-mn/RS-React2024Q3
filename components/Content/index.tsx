import Card from '../Card';
import Pagination from '../Pagination';
import styles from './Content.module.css';
import { useRouter } from 'next/router';
import type { PeopleType } from '../../types/peopleType';
import Details from '../Details';
import Flyout from '../UI/Flyout';

type PropTyes = {
  data: PeopleType;
};

function Content({ data }: PropTyes) {
  const router = useRouter();
  const { details } = router.query;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.cards}>
          {data.results.map((person) => (
            <Card person={person} key={person.name} />
          ))}
        </div>

        {details && <Details />}
      </div>
      <Flyout />
      <Pagination />
    </div>
  );
}

export default Content;
