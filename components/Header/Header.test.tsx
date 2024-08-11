import { screen } from '@testing-library/react';
import Header from './';
import { customRender } from '../../__test__/test-utils';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      details: '1',
    },
    asPath: '/people/1',
  }),
}));

vi.mock('./public/logo.webp', () => ({
  default: 'logo.webp',
}));

describe('Header Component', () => {
  it('renders the logo image', () => {
    customRender(<Header />);
    const logo = screen.getByAltText('Star Wars Logo');
    expect(logo).toBeInTheDocument();
  });

  it('applies the correct theme from context', () => {
    customRender(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveAttribute('data-theme', 'dark');
  });

  it('renders the SearchForm component', () => {
    customRender(<Header />);
    const searchForm = screen.getByRole('button', { name: /search/i });
    expect(searchForm).toBeInTheDocument();
  });

  it('renders the Theme component', () => {
    customRender(<Header />);
    const themeButton = screen.getByTestId('theme-btn');
    expect(themeButton).toBeInTheDocument();
  });

  it('renders the SimulateError component', () => {
    customRender(<Header />);
    const simulateErrorButton = screen.getByText(/throw error/i);
    expect(simulateErrorButton).toBeInTheDocument();
  });
});
