import styles from './ProfileCard.module.css';

interface PropTypes {
  infoText: string;
  info: string;
}

function CardItem({ infoText, info }: PropTypes) {
  return (
    <p className={styles['card-item']}>
      <span>{infoText}</span>
      {info}
    </p>
  );
}

export default CardItem;
