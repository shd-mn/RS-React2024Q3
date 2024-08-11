import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner Component', () => {
  it('renders the spinner', () => {
    render(<Spinner />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
