import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function useLocalStorage(key: string): [string, Dispatch<SetStateAction<string>>] {
  const [query, setQuery] = useState<string>(localStorage.getItem(key) ?? '');

  useEffect(() => {
    localStorage.setItem(key, query);
  }, [key, query]);

  return [query, setQuery];
}

export default useLocalStorage;
