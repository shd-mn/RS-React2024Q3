import styles from './Form.module.css';

type PropTypes = {
  children: React.ReactNode;
  label: string;
  error?: string;
};

function RadioWrapper({ children, label, error }: PropTypes) {
  return (
    <div className={styles['radio-wrapper']}>
      <span>{label}</span>
      {children}
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
}
export default RadioWrapper;
