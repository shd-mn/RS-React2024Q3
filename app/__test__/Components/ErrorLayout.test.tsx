import { screen } from '@testing-library/react';
import ErrorLayout from '../../components/ErrorBoundary/ErrorLayout';
import { customRender } from '../test-utils';

const TestComponent = () => {
  throw new Error('Test Error');
};

describe('ErrorLayout Component', () => {
  it('renders the outlet without error', () => {
    customRender(<ErrorLayout />, {
      route: '/',
      children: [{ path: '/', element: <div>Test Outlet</div> }],
    });

    expect(screen.getByText('Test Outlet')).toBeInTheDocument();
  });

  it('displays fallback message when an error is thrown', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    customRender(<ErrorLayout />, {
      route: '/',
      children: [{ path: '/', element: <TestComponent /> }],
    });

    expect(screen.getByText('Error Layout. Something went wrong!')).toBeInTheDocument();
    spy.mockRestore();
  });
});
