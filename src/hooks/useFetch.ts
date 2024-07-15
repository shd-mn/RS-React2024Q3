import { useEffect, useState } from 'react';

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): UseFetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Unable to Fetch Data, Please check URL or Network connectivity!!`);
        }
        const data: T = (await response.json()) as T;
        console.log('data', data);
        setData(data);
      } catch (err) {
        console.error(err);
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchData();
  }, [url]);
  return { data, isLoading, error };
}

export default useFetch;
