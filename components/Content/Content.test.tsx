import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { customRender } from '../../__test__/test-utils';
import Content from '.';
import { vi } from 'vitest';
import { mockPeople } from '../../__test__/mocks/mockData';

const mockPush = vi.fn();

const mockSearchParams = new URLSearchParams('page=1&details=1');

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      return mockSearchParams.get(key);
    },
  }),
}));

describe('Content Component', () => {
  it('renders cards based on data', () => {
    customRender(<Content data={mockPeople} />);

    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/darth vader/i)).toBeInTheDocument();
  });

  it('renders Details component when details query parameter is present', async () => {
    customRender(<Content data={mockPeople} />);

    expect(await screen.findByRole('heading', { name: /details/i })).toBeInTheDocument();
  });

  it('renders Flyout and Pagination components', () => {
    customRender(<Content data={mockPeople} />);
    expect(screen.getByRole('button', { name: /unselect all/i })).toBeInTheDocument();
    expect(screen.getByText('next')).toBeInTheDocument();
  });
});
