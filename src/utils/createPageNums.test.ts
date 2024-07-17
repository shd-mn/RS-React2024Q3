import { describe, it, expect } from 'vitest';
import { createPageNums } from './createPageNums';

describe('createPageNums', () => {
  it('should return correct page numbers and total pages for totalItems divisible by 10', () => {
    const totalItems = 30;
    const { totalPages, pages } = createPageNums(totalItems);

    expect(totalPages).toBe(3);
    expect(pages).toEqual([1, 2, 3]);
  });

  it('should return correct page numbers and total pages for totalItems not divisible by 10', () => {
    const totalItems = 25;
    const { totalPages, pages } = createPageNums(totalItems);

    expect(totalPages).toBe(3);
    expect(pages).toEqual([1, 2, 3]);
  });

  it('should return an empty array for zero totalItems', () => {
    const totalItems = 0;
    const { totalPages, pages } = createPageNums(totalItems);

    expect(totalPages).toBe(0);
    expect(pages).toEqual([]);
  });

  it('should return correct page numbers and total pages for large totalItems', () => {
    const totalItems = 105;
    const { totalPages, pages } = createPageNums(totalItems);

    expect(totalPages).toBe(11);
    expect(pages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });
});
