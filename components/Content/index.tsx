import Card from '../Card';
import Pagination from '../Pagination';
import styles from './Content.module.css';
import { useSearchParams } from 'next/navigation';
import type { PeopleType } from '../../types/peopleType';
import Details from '../Details';
import Flyout from '../UI/Flyout';

type PropTyes = {
  data: PeopleType;
};

function Content({ data }: PropTyes) {
  const searchParams = useSearchParams();
  const details = searchParams.get('details');

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
