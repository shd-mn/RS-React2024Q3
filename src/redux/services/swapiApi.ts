import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../constants';
import type { PeopleType, PersonType } from '../../types/peopleType';

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCharacters: builder.query<PeopleType, { name: string; page: string }>({
      query: ({ name, page }) => `/people?search=${name}&page=${page}`,
    }),
    getCharacter: builder.query<PersonType, { id: string }>({
      query: ({ id }) => `/people/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = swapiApi;
