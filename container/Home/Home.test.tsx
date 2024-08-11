import { screen, waitFor } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import { setCurrentPage, setPages } from '../../redux/features/pageSlice';
import { mockPeople } from '../../__test__/mocks/mockData';
import { customRender } from '../../__test__/test-utils';
import HomeClientWrapper from '.';

const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams('page=1&details=1');

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      return mockSearchParams.get(key);
    },
  }),
}));

vi.mock('react-redux', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof ReactRedux;
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('HomeClientWrapper Component', () => {
  test('renders Content component with data', async () => {
    const dispatch = vi.fn();
    vi.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);
    customRender(<HomeClientWrapper peopleData={mockPeople} page="1" />);
    await waitFor(() => {
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    });

    expect(dispatch).toHaveBeenCalledWith(setCurrentPage(1));
    expect(dispatch).toHaveBeenCalledWith(setPages(mockPeople.count));
  });

  test('shows error message when an error is present', () => {
    customRender(<HomeClientWrapper error="Failed to fetch data" page="1" />);

    expect(screen.getByText(/Error: Failed to fetch data/i)).toBeInTheDocument();
  });

  test('shows no results message when there are no results', () => {
    customRender(<HomeClientWrapper peopleData={{ results: [], count: 0, next: null, previous: null }} page="1" />);

    expect(screen.getByText(/Sorry/i)).toBeInTheDocument();
  });

  it('dispatches the correct actions', async () => {
    const dispatch = vi.fn();
    vi.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

    customRender(<HomeClientWrapper peopleData={mockPeople} page="2" />);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setCurrentPage(2));
      expect(dispatch).toHaveBeenCalledWith(setPages(mockPeople.count));
    });
  });
});
