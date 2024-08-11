import { screen, waitFor } from '@testing-library/react';
import PeoplePage, { getStaticPaths, getStaticProps } from './[page]';
import { mockPeople } from '../../__test__/mocks/mockData';
import { customRender } from '../../__test__/test-utils';
import * as ReactRedux from 'react-redux';
import { setCurrentPage, setPages } from '../../redux/features/pageSlice';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1' },
  }),
}));

vi.mock('react-redux', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof ReactRedux;
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('PeoplePage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the Content component with data', async () => {
    const dispatch = vi.fn();
    vi.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

    customRender(<PeoplePage peopleData={mockPeople} page="1" />);

    await waitFor(() => {
      expect(screen.queryByText(/Sorry, we couldn’t find any results/i)).not.toBeInTheDocument();
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });

  it('shows a message when no results are found', async () => {
    const dispatch = vi.fn();
    vi.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

    customRender(<PeoplePage peopleData={{ count: 0, results: [], next: null, previous: null }} page="1" />);

    await waitFor(() => {
      expect(screen.getByText(/Sorry/i)).toBeInTheDocument();
    });
  });

  it('getStaticPaths generates correct paths', async () => {
    const context = {};
    const paths = await getStaticPaths(context);

    expect(paths.paths).toEqual([
      { params: { page: '1' } },
      { params: { page: '2' } },
      { params: { page: '3' } },
      { params: { page: '4' } },
      { params: { page: '5' } },
      { params: { page: '6' } },
      { params: { page: '7' } },
      { params: { page: '8' } },
      { params: { page: '9' } },
    ]);
    expect(paths.fallback).toBe('blocking');
  });

  it('getStaticProps returns peopleData and page correctly', async () => {
    const context = { params: { page: '1' } };
    const props = await getStaticProps(context);

    expect(props).toEqual({
      props: {
        peopleData: mockPeople,
        page: '1',
      },
    });
  });

  it('dispatches the correct actions', async () => {
    const dispatch = vi.fn();
    vi.spyOn(ReactRedux, 'useDispatch').mockReturnValue(dispatch);

    customRender(<PeoplePage peopleData={mockPeople} page="2" />);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setCurrentPage(2));
      expect(dispatch).toHaveBeenCalledWith(setPages(82)); // Ensure this value is correct based on your mock data
    });
  });
});
