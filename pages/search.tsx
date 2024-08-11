import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { setCurrentPage, setPages } from '../redux/features/pageSlice';
import { useThemeContext } from '../context/ThemeContext';
import Content from '../components/Content';

import type { PeopleType } from '../types/peopleType';

interface SearchPageProps {
  peopleData?: PeopleType;
  page: string;
  error?: string;
}

export default function SearchPage({ peopleData, page, error }: SearchPageProps) {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();

  useEffect(() => {
    if (peopleData?.count) {
      dispatch(setCurrentPage(+page));
      dispatch(setPages(peopleData.count));
    }
  }, [dispatch, peopleData?.count, page]);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <main className="main" data-theme={theme}>
      {peopleData?.results.length !== 0 ? (
        <Content data={peopleData!} />
      ) : (
        <p className="not-found">Sorry, we couldn&apos;t find any results</p>
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.query.name || '';
  const page = context.query.page || '1';

  try {
    const res = await fetch(`https://swapi.dev/api/people/?search=${name}&page=${page}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return {
      props: {
        peopleData: data || {},
        page: page || '1',
      },
    };
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      props: {
        error: errorMessage,
        page: page || '1',
      },
    };
  }
};
