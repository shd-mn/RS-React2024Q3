import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App Component', () => {
  it('renders the Header component at the root path', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Throw Error/i })).toBeInTheDocument();
  });
});
