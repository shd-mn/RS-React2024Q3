import { FormEvent, useState } from 'react';
import logo from '/logo.webp';
import styles from './SearchForm.module.css';

interface PropTypes {
  query: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>, value: string) => void;
}
function SearchForm({ query, handleSubmit }: PropTypes) {
  const [value, setValue] = useState(query);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="container">
      <div className={styles.hero}>
        <div className={styles['img-box']}>
          <img className={styles.img} src={logo} alt="Star Wars Logo" />
        </div>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e, value)}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search Star Wars character"
            onChange={handleSearch}
            value={value}
          />
          <button type="submit" className={styles.btn}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
