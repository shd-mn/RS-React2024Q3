import { screen, cleanup } from '@testing-library/react';
import SearchForm from './SearchForm';
import { customRender } from '../../__test__/test-utils';
import * as ReactRedux from 'react-redux';

vi.mock('react-redux', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof ReactRedux;
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => ['', vi.fn()],
}));

describe('SearchForm Component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('renders the input and button', () => {
    customRender(<SearchForm />);
    expect(screen.getByPlaceholderText('Search Star Wars character')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates the input value on change', async () => {
    const { user } = customRender(<SearchForm />);
    const input = screen.getByPlaceholderText('Search Star Wars character');
    await user.type(input, 'Luke Skywalker');
    expect(input).toHaveValue('Luke Skywalker');
  });
});
