import { screen } from '@testing-library/react';
import { customRender } from '../__test__/test-utils';
import NotFound from './not-found';

describe('NotFound Component', () => {
  it('displays the 404 message and back to home link', () => {
    customRender(<NotFound />);
    expect(screen.getByText(/404 Page Not Found/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Back to Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders a link to the home page', () => {
    customRender(<NotFound />);

    const linkElement = screen.getByRole('link', { name: /Back to Home/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
