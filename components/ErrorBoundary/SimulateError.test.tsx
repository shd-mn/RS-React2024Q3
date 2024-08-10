import { render, screen } from '@testing-library/react';
import SimulateError from './SimulateError';

describe('SimulateError Component', () => {
  it('should render the button', () => {
    render(<SimulateError />);
    const button = screen.getByRole('button', { name: 'Throw Error' });
    expect(button).toBeInTheDocument();
  });
});
