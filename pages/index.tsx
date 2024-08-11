import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function HomePage() {
  const [query] = useLocalStorage('searchQuery', '');
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      router.push(`/people/1`);
    } else if (query) {
      router.push(`/search/?name=${query}&page=1`);
    }
  }, [query, router]);

  return null;
}
