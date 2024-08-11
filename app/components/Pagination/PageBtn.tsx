import styles from './Pagination.module.css';
interface PropTypes {
  text: string | number;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

function PageBtn({ text, className, disabled, onClick }: PropTypes) {
  return (
    <button type="button" className={`${styles.btn} ${className}`} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}

export default PageBtn;
