import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../constants';
import type { PersonType } from '../../types/peopleType';

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCharacter: builder.query<PersonType, { id: string }>({
      query: ({ id }) => `/people/${id}`,
    }),
  }),
});

export const { useGetCharacterQuery } = swapiApi;
