import { findSelectedPerson } from '../../utils/findSelectedPerson';
import { mockPeople } from '../../../app/__test__/mocks/mockData';

describe('findSelectedPerson', () => {
  it('should return true if the person is found in the list', () => {
    expect(findSelectedPerson(mockPeople.results, 'Luke Skywalker')).toBe(true);
  });

  it('should return false if the person is not found in the list', () => {
    expect(findSelectedPerson(mockPeople.results, 'Han Solo')).toBe(false);
  });

  it('should handle an empty list and return false', () => {
    expect(findSelectedPerson([], 'Luke Skywalker')).toBe(false);
  });

  it('should be case-sensitive and return false if case does not match', () => {
    expect(findSelectedPerson(mockPeople.results, 'luke skywalker')).toBe(false);
  });

  it('should return false if the name is an empty string', () => {
    expect(findSelectedPerson(mockPeople.results, '')).toBe(false);
  });
});
