import styles from './Pagination.module.css';
import PageBtn from './PageBtn';

interface PropTypes {
  currentPage: number;
  totalItems: number;
  handlePage: (page: number) => void;
}

function Pagination({ currentPage, totalItems, handlePage }: PropTypes) {
  const totalPages = Math.ceil(totalItems / 10);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
