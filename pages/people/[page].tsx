import { GetStaticPaths, GetStaticProps } from 'next';
import Content from '../../components/Content';
import type { PeopleType } from '../../types/peopleType';
import { useThemeContext } from '../../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentPage, setPages } from '../../redux/features/pageSlice';

interface PeoplePageProps {
  peopleData: PeopleType;
  page: string;
}

export default function PeoplePage({ peopleData, page }: PeoplePageProps) {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPages(peopleData.count));
    dispatch(setCurrentPage(+page));
  }, [dispatch, peopleData.count, page]);

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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://swapi.dev/api/people/`);
  const data = await res.json();

  const count = data.count;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(count / itemsPerPage);

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const page = context.params?.page || '1';

  try {
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data: PeopleType = await res.json();

    return {
      props: {
        peopleData: data || {},
        page: page.toString(),
      },
    };
  } catch (error: unknown) {
    return {
      notFound: true,
    };
  }
};
