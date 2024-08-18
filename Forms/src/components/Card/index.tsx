import { userType } from '../../types/userType';
import styles from './Card.module.css';

function Card({ data, index }: { data: userType; index: number }) {
  return (
    <article className={styles.card}>
      <div className={`${styles['card-body']} ${index === 0 && styles.last}`}>
        <div className={styles.left}>
          <img src={data.image!} alt={data.name} />
          <h4>{data.name}</h4>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <h3>{data.formTitle}</h3>
          </div>
          <div>
            <h5>Email</h5>
            <p>{data.email}</p>
          </div>
          <div>
            <h5>Age</h5>
            <p>{data.age}</p>
          </div>
          <div>
            <h5>Gender</h5>
            <p>{data.gender}</p>
          </div>
          <div>
            <h5>Country</h5>
            <p>{data.country}</p>
          </div>
          <div>
            <h5>Password</h5>
            <p>{data.password}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
export default Card;
