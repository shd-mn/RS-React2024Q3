import { FormEvent, useEffect, useState } from 'react';
import { Form, useSearchParams } from '@remix-run/react';
import { useDispatch } from 'react-redux';
import { setSearch } from '~/redux/features/mainSlice';
import useLocalStorage from '~/hooks/useLocalStorage';
// import { useSearchParams } from 'react-router-dom';
import styles from './SearchForm.module.css';

function SearchForm() {
  const [query, setQuery] = useLocalStorage('searchQuery', '');
  const [value, setValue] = useState(query);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const details = searchParams.get('details');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = value.trim().toLowerCase();
    setQuery(name);
    // navigate(`/?name=${name}page='1'`);
    setSearchParams({ page: '1', query: name, ...(details && { details }) });
    // setSearchParams({ search: name, page: '1' });
    dispatch(setSearch(name));
  };

  useEffect(() => {
    dispatch(setSearch(query));
  }, [dispatch, query]);

  return (
    <Form noValidate method="get" className={styles.form} onSubmit={onSubmit}>
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
    </Form>
  );
}

export default SearchForm;
