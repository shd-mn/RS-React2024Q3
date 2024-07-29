import { Outlet, useSearchParams } from 'react-router-dom';
import Card from '../Card';
import Loading from '../Loading';

import { useGetCharactersQuery } from '../../redux/services/swapiApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Pagination from '../Pagination';
import { useEffect } from 'react';
import { setPages } from '../../redux/features/pageSlice';
import styles from './Content.module.css';
import { setPeople } from '../../redux/features/mainSlice';
import Flyout from '../UI/Flyout';

function Content() {
  const { name } = useSelector((state: RootState) => state.main);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const detailsParam = searchParams.get('details');
  const page = searchParams.get('page') ?? '1';

  const { data, error, isFetching } = useGetCharactersQuery({ name, page });

  useEffect(() => {
    if (data?.count) {
      dispatch(setPages(data.count));
      dispatch(setPeople(data.results));
    }
  }, [dispatch, data?.count, data?.results]);

  if (isFetching) {
    return <Loading />;
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

  if (data?.results.length !== 0) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.cards}>
            {data?.results.map((person) => <Card person={person} key={person.name} />)}
          </div>

          {detailsParam && <Outlet />}
        </div>
        <Flyout />
        <Pagination />
      </div>
    );
  } else {
    return <p className={styles['not-found']}>Sorry, we couldn&apos;t find any results</p>;
  }
}

export default Content;
