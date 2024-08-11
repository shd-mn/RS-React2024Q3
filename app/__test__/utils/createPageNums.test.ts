import { createPageNums } from '../../utils/createPageNums';

describe('createPageNums', () => {
  it('should return an array with one page number for totalItems less than 10', () => {
    expect(createPageNums(5)).toEqual([1]);
  });

  it('should return an array with two page numbers for totalItems between 11 and 20', () => {
    expect(createPageNums(15)).toEqual([1, 2]);
  });

  it('should return an array with three page numbers for totalItems between 21 and 30', () => {
    expect(createPageNums(25)).toEqual([1, 2, 3]);
  });

  it('should handle exactly 10 items', () => {
    expect(createPageNums(10)).toEqual([1]);
  });

  it('should handle exactly 20 items', () => {
    expect(createPageNums(20)).toEqual([1, 2]);
  });

  it('should handle exactly 21 items', () => {
    expect(createPageNums(21)).toEqual([1, 2, 3]);
  });

  it('should handle a large number of items', () => {
    expect(createPageNums(100)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
