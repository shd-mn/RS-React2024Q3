import { cleanup, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { customRender } from '../../__test__/test-utils';
import Details from '.';

type mockRoutertype = {
  query: {
    details: string;
  };
  asPath: string;
  push: (path: string, factory?: (importOriginal: () => unknown) => unknown) => void;
};

let mockRouter: mockRoutertype;
const mockPush = vi.fn();

beforeEach(() => {
  mockRouter = {
    query: {
      details: '1',
    },
    asPath: '/people/1',
    push: mockPush,
  };
});

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

describe('Details Component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
    mockPush.mockReset();
  });

  it('displays loading while fetching data', async () => {
    customRender(<Details />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('displays character details after successful fetch', async () => {
    customRender(<Details />);
    await waitFor(() => {
      expect(screen.getByText(/details/i)).toBeInTheDocument();
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/172 cm/i)).toBeInTheDocument();
      expect(screen.getByText(/77 kg/i)).toBeInTheDocument();
    });
  });

  it('displays error message on failed fetch', async () => {
    mockRouter.query.details = 'null';
    customRender(<Details />);

    expect(await screen.findByText(/an error has occurred:/i)).toBeInTheDocument();
  });

  it('removes details query parameter when close button is clicked', async () => {
    const { user } = customRender(<Details />);

    await waitFor(() => {
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/people/1');
  });
});
