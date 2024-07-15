import { Dispatch, SetStateAction, useState } from 'react';
import logo from '/logo.webp';
import styles from './SearchForm.module.css';
import { useSearchParams } from 'react-router-dom';

interface PropTypes {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

function SearchForm({ search, setSearch }: PropTypes) {
  const [value, setValue] = useState(search);
  const [, setSearchParams] = useSearchParams();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value.trim());
    setSearchParams({ page: '1' });
  };

  return (
    <div className="container">
      <div className={styles.hero}>
        <div className={styles['img-box']}>
          <img className={styles.img} src={logo} alt="Star Wars Logo" />
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search Star Wars character"
            onChange={onChange}
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
