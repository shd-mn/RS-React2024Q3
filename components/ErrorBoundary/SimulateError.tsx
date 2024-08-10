import { useState } from 'react';
import styles from './SimulateError.module.css';

function SimulateError() {
  const [isError, setIsError] = useState(false);
  const simulateError = () => {
    setIsError(true);
    throw new Error('Simulated error');
  };

  if (isError) {
    throw new Error('Simulate Error');
  }

  return (
    <div className={styles.container}>
      <button className={styles['error-btn']} onClick={simulateError}>
        Throw Error
      </button>
    </div>
  );
}

export default SimulateError;
