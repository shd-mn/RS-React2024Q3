import { Component } from 'react';
import styles from './Loading.module.css';
class Loading extends Component {
  render() {
    return (
      <div className={styles.loading}>
        <div className={styles.container}>
          <div className={styles.dot} />
        </div>
      </div>
    );
  }
}

export default Loading;
