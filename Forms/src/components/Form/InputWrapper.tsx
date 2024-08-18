import styles from './Form.module.css';

type PropTypes = {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
  error?: string;
};

function InputWrapper({ children, label, htmlFor, error }: PropTypes) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
}
export default InputWrapper;
