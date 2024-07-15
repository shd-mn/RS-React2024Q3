import { Outlet, useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Card from '../Card';
import Loading from '../Loading';
import Pagination from '../Pagination';

import type { PeopleType } from '../../types/peopleType';
import { baseUrl } from '../../constants';
import styles from './Content.module.css';

interface PropTypes {
  search?: string;
}

function Content({ search }: PropTypes) {
  const [searchParams] = useSearchParams();
  const detailsParam = searchParams.get('details');
  const page = searchParams.get('page') ?? '1';
  const searchQuery = search ? `?search=${search}&page=${page}` : `?page=${page}`;
  const { data, isLoading } = useFetch<PeopleType>(`${baseUrl}/people/${searchQuery}`);

  if (isLoading) {
    return <Loading />;
  }
  if (data && data.results.length > 0) {
    return (
      <>
        <div className={styles.content}>
          <div className={styles.cards}>
            {data.results.map((person, idx) => (
              <Card person={person} key={idx} />
            ))}
          </div>
          {detailsParam && <Outlet />}
        </div>

        <Pagination totalItems={data.count} />
      </>
    );
  } else {
    return <p className={styles['not-found']}>Sorry, we couldn&apos;t find any results</p>;
  }
}

export default Content;
