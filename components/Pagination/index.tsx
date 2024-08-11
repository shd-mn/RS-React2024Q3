import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import PageBtn from './PageBtn';
import { RootState } from '../../redux/store';
import { setCurrentPage } from '../../redux/features/pageSlice';
import styles from './Pagination.module.css';

function Pagination() {
  const { currentPage, pages } = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const handlePage = (num: number) => {
    if (name) {
      router.push(`/?name=${name}&page=${num}`);
    } else {
      router.push(`/?page=${num}`);
    }
    dispatch(setCurrentPage(num));
  };

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
