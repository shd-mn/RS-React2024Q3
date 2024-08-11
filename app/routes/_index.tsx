import { LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
import { useThemeContext } from '~/context/ThemeContext';
import type { PeopleType, PersonType } from '~/types/peopleType';
import { findId } from '~/utils/findId';
import styles from '../components/Content/Content.module.css';
import Card from '~/components/Card';
// import Details from '~/components/Details';
import Flyout from '~/components/Flyout';
import Pagination from '~/components/Pagination';
import Details from '~/components/Details';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const name = searchParams.get('name') || '';
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details') || '';
  const response = await fetch(`https://swapi.dev/api/people/?search=${name}&page=${page}`);

  const characters: PeopleType = await response.json();
  let character: PersonType | null = null;

  if (details) {
    const id = findId(details);
    const responseDetails = await fetch(`https://swapi.dev/api/people/${id}`);
    character = await responseDetails.json();
  }

  return json({ characters, person: character, details, page });
}

export default function Index() {
  const { characters, person, details, page } = useLoaderData<typeof loader>();
  console.log(characters);
  const { theme } = useThemeContext();

  return (
    <main data-theme={theme}>
      {/* {characters.results.length !== 0 ? (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.cards}>
              {characters.results.map((person) => (
                <Card person={person} key={person.name} />
              ))}
            </div>

            {details && <Details />}
          </div>
          <Flyout />
          <Pagination />
        </div>
      ) : (
        <p>Sorry, we couldn&apos;t find any results</p>
      )} */}
    </main>
  );
}
