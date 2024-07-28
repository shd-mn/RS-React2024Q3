import { describe, it, expect } from 'vitest';
import { findId } from '../../utils/findId';

describe('findId function', () => {
  it('should return the ID from a URL with an ID at the end', () => {
    const url = 'https://example.com/api/items/123/';
    const result = findId(url);
    expect(result).toBe('123');
  });

  it('should return the ID from a URL with an ID at the second-to-last position', () => {
    const url = 'https://example.com/api/items/123/details';
    const result = findId(url);
    expect(result).toBe('123');
  });

  it('should handle URLs that end with a trailing slash', () => {
    const url = 'https://example.com/api/items/123/';
    const result = findId(url);
    expect(result).toBe('123');
  });

  it('should return an empty string for an empty URL', () => {
    const url = '';
    const result = findId(url);
    expect(result).toBe('');
  });
});
