'use client';
import styles from './Spinner.module.css';

function Spinner() {
  return (
    <div className={styles.loading} data-testid="loader">
      <div className={styles.container}>
        <div className={styles.dot} />
      </div>
    </div>
  );
}

export default Spinner;
