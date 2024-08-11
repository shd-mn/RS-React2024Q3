import HomeClientWrapper from '../container/Home';

export async function fetchPeopleData(name: string, page: string) {
  try {
    const res = await fetch(`https://swapi.dev/api/people/?search=${name}&page=${page}`, { cache: 'no-cache' });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { error: errorMessage };
  }
}
async function HomePage({ searchParams }: { searchParams: { name: string; page: string } }) {
  const name = searchParams.name || '';
  const page = searchParams.page || '1';

  const peopleData = await fetchPeopleData(name, page);

  return <HomeClientWrapper peopleData={peopleData} page={page} error={peopleData?.error} />;
}

export default HomePage;
