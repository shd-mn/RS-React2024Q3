import styles from './Pagination.module.css';
import PageBtn from './PageBtn';
import { useSearchParams } from 'react-router-dom';
import { createPageNums } from '../../utils/createPageNums';

interface PropTypes {
  totalItems: number;
}

function Pagination({ totalItems }: PropTypes) {
  const { totalPages, pages } = createPageNums(totalItems);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const currentPage = parseInt(page, 10);

  const handlePage = (num: number) => {
    setSearchParams({ page: `${num}` });
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
        disabled={currentPage === totalPages}
        onClick={() => handlePage(currentPage + 1)}
      />
    </div>
  );
}

export default Pagination;
