import { getQueryParam } from './getQueryParam';

describe('getQueryParam', () => {
  it('returns the first element if query is an array', () => {
    const query = ['first', 'second'];
    const result = getQueryParam(query);
    expect(result).toBe('first');
  });

  it('returns the query if it is a string', () => {
    const query = 'singleQuery';
    const result = getQueryParam(query);
    expect(result).toBe(query);
  });

  it('returns an empty string if query is undefined', () => {
    const result = getQueryParam(undefined);
    expect(result).toBe('');
  });

  it('returns an empty string if query is an empty string', () => {
    const result = getQueryParam('');
    expect(result).toBe('');
  });
});
