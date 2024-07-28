import reducer, { setCurrentPage, setPages, PageState } from '../../redux/features/pageSlice';

describe('mainSlice', () => {
  let initialState: PageState;

  beforeEach(() => {
    initialState = {
      currentPage: 1,
      pages: [],
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({ currentPage: 1, pages: [] });
  });

  it('should update the currentPage in the state when setCurrentPage action is dispatched', () => {
    expect(reducer(initialState, setCurrentPage(2))).toEqual({ currentPage: 2, pages: [] });
  });

  it('should generate a list of page numbers based on the total item count when setPages action is dispatched', () => {
    expect(reducer(initialState, setPages(54))).toEqual({ currentPage: 1, pages: [1, 2, 3, 4, 5, 6] });
  });

  it('should create a single page number in the state when setPages action is dispatched with a total of 1 item', () => {
    expect(reducer(initialState, setPages(1))).toEqual({ currentPage: 1, pages: [1] });
  });
});
