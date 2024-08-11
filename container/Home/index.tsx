'use client';
import { useEffect } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { setCurrentPage, setPages } from '../../redux/features/pageSlice';
import Content from '../../components/Content';
import { PeopleType } from '../../types/peopleType';

interface HomePageProps {
  peopleData?: PeopleType;
  page: string;
  error?: string;
}

function HomeClientWrapper({ peopleData, page, error }: HomePageProps) {
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

export default HomeClientWrapper;
