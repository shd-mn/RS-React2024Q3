import { FormEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/features/mainSlice';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchForm.module.css';

function SearchForm() {
  const [query, setQuery] = useLocalStorage('searchQuery');
  const [value, setValue] = useState(query);
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = value.trim().toLowerCase();
    setQuery(name);
    setSearchParams({ search: name, page: '1' });
    dispatch(setSearch(name));
  };

  useEffect(() => {
    dispatch(setSearch(query));
  }, [dispatch, query]);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search Star Wars character"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button type="submit" className={styles.btn}>
        Search
      </button>
    </form>
  );
}

export default SearchForm;
