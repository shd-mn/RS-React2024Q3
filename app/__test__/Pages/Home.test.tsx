import { screen } from '@testing-library/react';
import Home from '../../Pages/Home';
import { customRender } from '../test-utils';

describe('Home Component', () => {
  it('renders the Header component', () => {
    customRender(<Home />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the Content component', () => {
    customRender(<Home />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('applies the correct theme from context', () => {
    customRender(<Home />);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('data-theme', 'dark');
  });
});
