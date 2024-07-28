import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { customRender } from '../../__test__/test-utils';
import Home from '../../Pages/Home';
import Details from '../../components/Details';

describe('Details Component', () => {
  it('displays loading while fetching data', async () => {
    customRender(<Details />, { route: '?search=&page=1&details=1' });
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('displays character details after successful fetch', async () => {
    customRender(<Details />, { route: '?search=&page=1&details=1' });
    await waitFor(() => {
      expect(screen.getByText(/details/i)).toBeInTheDocument();
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/172 cm/i)).toBeInTheDocument();
      expect(screen.getByText(/77 kg/i)).toBeInTheDocument();
    });
  });

  it('displays error message on failed fetch', async () => {
    customRender(<Details />, { route: '?search=&page=1&details=null' });
    await waitFor(() => {
      expect(screen.getByText(/an error has occurred:/i)).toBeInTheDocument();
    });
  });

  it('navigates back on close button click', async () => {
    const { user } = customRender(<Home />, {
      route: '?search=&page=1&details=1',
      children: [{ path: '/', element: <Details /> }],
    });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /details/i })).toBeInTheDocument();
      expect(screen.getByText(/blue/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.queryByText(/details/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/blue/i)).not.toBeInTheDocument();
  });
});
