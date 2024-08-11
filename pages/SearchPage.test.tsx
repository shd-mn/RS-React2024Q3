import { cleanup, screen, waitFor } from '@testing-library/react';
import SearchPage from './search';
import { customRender } from '../__test__/test-utils';
import { mockPeople } from '../__test__/mocks/mockData';
import * as ReactRedux from 'react-redux';
import { setCurrentPage, setPages } from '../redux/features/pageSlice';

const mockPush = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { name: 'luke', page: '1' },
    asPath: '/search?name=luke&page=1',
    push: mockPush,
  }),
}));

vi.mock('react-redux', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof ReactRedux;
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

vi.mock('node-fetch', () => ({
  default: vi.fn(),
}));

describe('SearchPage', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('renders the Content component with data', async () => {
    const dispatch = vi.fn();
    vi.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);
    customRender(<SearchPage peopleData={mockPeople} page="1" />);
    await waitFor(() => {
      expect(screen.queryByText(/Sorry, we couldn’t find any results/i)).not.toBeInTheDocument();
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('shows a message when no results are found', async () => {
    customRender(<SearchPage peopleData={{ count: 0, results: [], next: null, previous: null }} page="1" />);

    await waitFor(() => {
      expect(screen.queryByText(/Sorry, /i)).toBeInTheDocument();
    });
  });

  it('displays an error message when an error occurs', () => {
    customRender(<SearchPage error="Failed to fetch data" page="1" />);

    expect(screen.getByText(/Error: Failed to fetch data/i)).toBeInTheDocument();
  });

  it('dispatches the correct actions when peopleData is present', async () => {
    const dispatch = vi.fn();
    vi.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

    customRender(<SearchPage peopleData={mockPeople} page="2" />);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setCurrentPage(2));
      expect(dispatch).toHaveBeenCalledWith(setPages(mockPeople.count));
    });
  });

  it('dispatches the correct actions', async () => {
    const dispatch = vi.fn();
    vi.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

    customRender(<SearchPage peopleData={mockPeople} page="2" />);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setCurrentPage(2));
      expect(dispatch).toHaveBeenCalledWith(setPages(mockPeople.count));
    });
  });
});
