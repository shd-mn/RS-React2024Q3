import { waitFor } from '@testing-library/react';
import HomePage from '../pages/index';
import { customRender } from '../__test__/test-utils';

type mockRoutertype = {
  query: {
    name: string;
    page: string;
  };
  push: (path: string, factory?: (importOriginal: () => unknown) => unknown) => void;
};

let mockRouter: mockRoutertype;
const mockPush = vi.fn();

beforeEach(() => {
  mockRouter = {
    query: {
      name: 'luke',
      page: '1',
    },
    push: mockPush,
  };
});

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

vi.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => ['', vi.fn()],
}));

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('HomePage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    mockPush.mockReset();
  });

  it('redirects to /people/1 if query is empty', () => {
    mockRouter.query.name = '';

    customRender(<HomePage />);
    waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/1?name=luke&page=1');
    });
  });

  it('redirects to /search/?name=query&page=1 if query is present', () => {
    customRender(<HomePage />);
    waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?name=query&page=1');
    });
  });
});
