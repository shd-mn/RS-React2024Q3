import { useState, useEffect } from 'react';

function useLocalStorage(key: string): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [query, setQuery] = useState<string>(localStorage.getItem(key) ?? '');

  useEffect(() => {
    localStorage.setItem(key, query);
  }, [key, query]);

  return [query, setQuery];
}

export default useLocalStorage;
