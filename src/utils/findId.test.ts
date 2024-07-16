import { describe, it, expect } from 'vitest';
import { findId } from './findId';

describe('findId', () => {
  it('should return the correct ID from a valid URL', () => {
    const url = 'https://swapi.dev/api/people/1/';
    const result = findId(url);
    expect(result).toBe('1');
  });

  it('should handle URLs with additional query parameters', () => {
    const url = 'https://swapi.dev/api/people/1/?format=json';
    const result = findId(url);
    expect(result).toBe('1');
  });

  it('should return an empty string if the URL is empty', () => {
    const url = '';
    const result = findId(url);
    expect(result).toBe('');
  });
});
