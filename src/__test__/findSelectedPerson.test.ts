import { describe, it, expect } from 'vitest';

import { findSelectedPerson } from '../utils/findSelectedPerson';
import { mockPeople } from './__mocks__/test-mock-data';

describe('findSelectedPerson', () => {
  it('should return true if the person is found in the list', () => {
    expect(findSelectedPerson(mockPeople, 'Luke Skywalker')).toBe(true);
  });

  it('should return false if the person is not found in the list', () => {
    expect(findSelectedPerson(mockPeople, 'Han Solo')).toBe(false);
  });

  it('should handle an empty list and return false', () => {
    expect(findSelectedPerson([], 'Luke Skywalker')).toBe(false);
  });

  it('should be case-sensitive and return false if case does not match', () => {
    expect(findSelectedPerson(mockPeople, 'luke skywalker')).toBe(false);
  });

  it('should return false if the name is an empty string', () => {
    expect(findSelectedPerson(mockPeople, '')).toBe(false);
  });
});
