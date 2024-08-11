import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './SearchForm.module.css';
import { setCurrentPage } from '../../redux/features/pageSlice';
import { setSearch } from '../../redux/features/mainSlice';

function SearchForm() {
  const [query, setQuery] = useLocalStorage('searchQuery', '');
  const [value, setValue] = useState(query);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = value.trim().toLowerCase();
    setQuery(name);
    dispatch(setSearch(name));
    dispatch(setCurrentPage(1));
    if (name) {
      router.push({
        pathname: '/search',
        query: { name, page: 1 },
      });
    } else {
      router.push(`/people/1`);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} role="form">
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
