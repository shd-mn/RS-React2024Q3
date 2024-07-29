import { http, HttpResponse } from 'msw';
import { mockPeople, mockPerson } from './mockData';

export const handlers = [
  http.get('https://swapi.dev/api/people', () => {
    return HttpResponse.json(mockPeople);
  }),
  http.get('https://swapi.dev/api/people/1', () => {
    return HttpResponse.json(mockPerson);
  }),
  http.get('https://swapi.dev/api/people/null', () => {
    return HttpResponse.error();
  }),
];
