import { ReactNode, useState } from 'react';
import styles from './SimulateError.module.css';
interface PropTypes {
  children: ReactNode;
}

function SimulateError({ children }: PropTypes) {
  const [isError, setIsError] = useState(false);
  const simulateError = () => {
    setIsError(true);
  };

  return (
    <div className={styles.container}>
      <button className={styles['error-btn']} onClick={simulateError}>
        Throw Error
      </button>
      {isError && children}
    </div>
  );
}

export default SimulateError;
