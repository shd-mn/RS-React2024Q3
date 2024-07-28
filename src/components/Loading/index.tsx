import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={styles.loading} data-testid="loader">
      <div className={styles.container}>
        <div className={styles.dot} />
      </div>
    </div>
  );
}

export default Loading;
