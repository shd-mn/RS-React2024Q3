import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../constants';
import { PeopleType } from '../../types/peopleType';

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCharacter: builder.query<PeopleType, { name: string; page: string }>({
      query: ({ name, page }) => `/people?search=${name}&page=${page}`,
    }),
  }),
});

export const { useGetCharacterQuery } = swapiApi;
