import styles from './Pagination.module.css';
import PageBtn from './PageBtn';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { setCurrentPage } from '../../redux/features/pageSlice';

function Pagination() {
  const { name } = useSelector((state: RootState) => state.main);
  const { currentPage, pages } = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePage = (num: number) => {
    setSearchParams({ search: name, page: `${num}` });
  };

  useEffect(() => {
    const page = searchParams.get('page') ?? 1;
    dispatch(setCurrentPage(+page));
  }, [searchParams, dispatch]);

  return (
    <div className={styles.pagination}>
      <PageBtn
        text="prev"
        className={styles.prev}
        disabled={currentPage === 1}
        onClick={() => handlePage(currentPage - 1)}
      />

      {pages.map((page) => (
        <PageBtn
          key={page}
          text={page}
          className={`${styles.btn} ${page === currentPage && styles.active}`}
          disabled={currentPage === page}
          onClick={() => handlePage(page)}
        />
      ))}

      <PageBtn
        text="next"
        className={styles.next}
        disabled={currentPage === pages.length}
        onClick={() => handlePage(currentPage + 1)}
      />
    </div>
  );
}

export default Pagination;
