// ErrorBoundary.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
};

describe('ErrorBoundary Component', () => {
  it('should catch errors and display the fallback UI', () => {
    render(
      <ErrorBoundary fallback="Something went wrong!">
        <ProblemChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/something went wrong!/i)).toBeInTheDocument();
  });
});
