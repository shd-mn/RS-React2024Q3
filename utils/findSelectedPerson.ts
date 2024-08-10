import { PersonType } from '../types/peopleType';

export function findSelectedPerson(people: PersonType[], name: string): boolean {
  return Boolean(people.find((person) => person.name === name));
}
